import crypto from "crypto";
import { NextResponse } from "next/server";
import type { AnyBulkWriteOperation } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";
import { recordAuditLog } from "@/lib/certificates/audit";
import {
  MAX_CSV_ROWS,
  isValidCertificateId,
  normalizeCertificateId,
  parseIssueDate,
} from "@/lib/certificates/validation";
import type {
  CertificateDoc,
  CsvImportCommitResult,
  CsvRejectedRow,
  CsvValidatedRow,
} from "@/lib/certificates/types";

const BATCH_SIZE = 500;

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const incoming: unknown = body?.records;
    const priorRejected: CsvRejectedRow[] = Array.isArray(body?.rejectedRecords)
      ? body.rejectedRecords
      : [];

    if (!Array.isArray(incoming) || incoming.length === 0) {
      return NextResponse.json(
        { ok: false, error: "No valid records supplied to import." },
        { status: 400 },
      );
    }

    if (incoming.length > MAX_CSV_ROWS) {
      return NextResponse.json(
        { ok: false, error: `Maximum ${MAX_CSV_ROWS} records allowed per import batch.` },
        { status: 400 },
      );
    }

    // Independent server-side re-validation (never trust client preview payload)
    const sanitized: Array<{ row: CsvValidatedRow; dateObj: Date }> = [];
    const runtimeRejected: CsvRejectedRow[] = [...priorRejected];
    const seen = new Set<string>();

    for (let i = 0; i < incoming.length; i++) {
      const raw = incoming[i] as Partial<CsvValidatedRow>;
      const rowNumber = typeof raw?.rowNumber === "number" ? raw.rowNumber : i + 2;
      const certificateId = normalizeCertificateId(String(raw?.certificateId ?? ""));
      const studentName = String(raw?.studentName ?? "").trim();
      const course = String(raw?.course ?? "").trim();
      const courseDuration = String(raw?.courseDuration ?? "").trim();
      const rawDate = String(raw?.issueDate ?? "").trim();
      const parsedDate = parseIssueDate(rawDate);

      if (
        !certificateId ||
        !isValidCertificateId(certificateId) ||
        studentName.length < 2 ||
        course.length < 2 ||
        courseDuration.length < 1 ||
        !parsedDate
      ) {
        runtimeRejected.push({
          rowNumber,
          certificateId,
          studentName,
          course,
          courseDuration,
          issueDate: rawDate,
          category: "invalid",
          reason: "Failed server validation on commit",
        });
        continue;
      }

      if (seen.has(certificateId)) {
        runtimeRejected.push({
          rowNumber,
          certificateId,
          studentName,
          course,
          courseDuration,
          issueDate: parsedDate.iso,
          category: "duplicate_in_file",
          reason: "Duplicate certificateId in import payload",
        });
        continue;
      }

      seen.add(certificateId);
      sanitized.push({
        row: {
          rowNumber,
          certificateId,
          studentName,
          course,
          courseDuration,
          issueDate: parsedDate.iso,
        },
        dateObj: parsedDate.date,
      });
    }

    const col = await getCertificatesCollection();
    const batchId = `BATCH-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${crypto.randomBytes(3).toString("hex").toUpperCase()}`;
    const now = new Date();
    let importedCount = 0;

    // Insert in bounded batches of 500 using bulkWrite (ordered: false) so duplicates never overwrite
    for (let offset = 0; offset < sanitized.length; offset += BATCH_SIZE) {
      const slice = sanitized.slice(offset, offset + BATCH_SIZE);

      // Pre-check existing IDs in this chunk for clean duplicate reporting
      const existingDocs = await col
        .find(
          { certificateId: { $in: slice.map((s) => s.row.certificateId) } },
          { projection: { certificateId: 1 } },
        )
        .toArray();
      const existingSet = new Set(existingDocs.map((d) => d.certificateId));

      const toInsert: Array<{ row: CsvValidatedRow; dateObj: Date }> = [];
      for (const item of slice) {
        if (existingSet.has(item.row.certificateId)) {
          runtimeRejected.push({
            ...item.row,
            category: "duplicate_in_db",
            reason: "Certificate ID already exists in database",
          });
        } else {
          toInsert.push(item);
        }
      }

      if (toInsert.length === 0) continue;

      const ops: AnyBulkWriteOperation<CertificateDoc>[] = toInsert.map(({ row, dateObj }) => ({
        insertOne: {
          document: {
            certificateId: row.certificateId,
            studentName: row.studentName,
            course: row.course,
            courseDuration: row.courseDuration,
            issueDate: dateObj,
            status: "valid",
            createdAt: now,
            updatedAt: now,
            revokedAt: null,
            revocationReason: null,
            revokedBy: null,
          },
        },
      }));

      try {
        const res = await col.bulkWrite(ops, { ordered: false });
        importedCount += res.insertedCount;
      } catch (bulkErr: unknown) {
        // Handle partial write failures (e.g., concurrent duplicate insert race)
        const bErr = bulkErr as {
          result?: { insertedCount?: number };
          writeErrors?: Array<{ index: number; code?: number }>;
        };
        if (typeof bErr?.result?.insertedCount === "number") {
          importedCount += bErr.result.insertedCount;
        }
        if (Array.isArray(bErr?.writeErrors)) {
          for (const we of bErr.writeErrors) {
            const failedItem = toInsert[we.index];
            if (failedItem) {
              runtimeRejected.push({
                ...failedItem.row,
                category: we.code === 11000 ? "duplicate_in_db" : "invalid",
                reason:
                  we.code === 11000
                    ? "Certificate ID already exists in database"
                    : "Database write rejected this row",
              });
            }
          }
        } else {
          throw bulkErr;
        }
      }
    }

    runtimeRejected.sort((a, b) => a.rowNumber - b.rowNumber);
    const duplicatesSkipped = runtimeRejected.filter(
      (r) => r.category === "duplicate_in_file" || r.category === "duplicate_in_db",
    ).length;
    const invalidCount = runtimeRejected.filter((r) => r.category === "invalid").length;

    await recordAuditLog({
      action: "certificate.bulk_imported",
      batchId,
      adminId: auth.session.adminId,
      summary: `Bulk CSV import (${batchId}): ${importedCount} imported, ${duplicatesSkipped} duplicates skipped, ${invalidCount} invalid.`,
    });

    const result: CsvImportCommitResult = {
      batchId,
      importedCount,
      duplicatesSkipped,
      invalidCount,
      rejectedRecords: runtimeRejected,
    };

    return NextResponse.json({ ok: true, result }, { status: 201 });
  } catch (err) {
    console.error("[TPS_CSV_COMMIT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "Bulk import failed due to a server error." },
      { status: 500 },
    );
  }
}
