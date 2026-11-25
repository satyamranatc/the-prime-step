import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";
import {
  MAX_CSV_BYTES,
  MAX_CSV_ROWS,
  REQUIRED_CSV_HEADERS,
  isValidCertificateId,
  normalizeCertificateId,
  parseCsvText,
  parseIssueDate,
} from "@/lib/certificates/validation";
import type { CsvImportPreview, CsvRejectedRow, CsvValidatedRow } from "@/lib/certificates/types";

const CHUNK_SIZE = 500;

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const contentType = request.headers.get("content-type") || "";
    let csvText = "";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file");
      if (!(file instanceof File)) {
        return NextResponse.json(
          { ok: false, error: "Please upload a CSV file." },
          { status: 400 },
        );
      }

      if (file.size === 0) {
        return NextResponse.json({ ok: false, error: "The uploaded CSV file is empty." }, { status: 400 });
      }

      if (file.size > MAX_CSV_BYTES) {
        return NextResponse.json(
          { ok: false, error: "File exceeds the 5 MB limit. Split large exports into batches." },
          { status: 400 },
        );
      }

      csvText = await file.text();
    } else {
      const body = await request.json();
      csvText = typeof body?.csvText === "string" ? body.csvText : "";
      if (Buffer.byteLength(csvText, "utf8") > MAX_CSV_BYTES) {
        return NextResponse.json(
          { ok: false, error: "CSV content exceeds the 5 MB limit." },
          { status: 400 },
        );
      }
    }

    const parsedRows = parseCsvText(csvText);
    if (parsedRows.length < 2) {
      return NextResponse.json(
        { ok: false, error: "CSV must contain a header row and at least one student record." },
        { status: 400 },
      );
    }

    const dataRowCount = parsedRows.length - 1;
    if (dataRowCount > MAX_CSV_ROWS) {
      return NextResponse.json(
        {
          ok: false,
          error: `CSV contains ${dataRowCount} rows. Maximum allowed per upload is ${MAX_CSV_ROWS} rows.`,
        },
        { status: 400 },
      );
    }

    // Map header names case-insensitively
    const rawHeaders = parsedRows[0].map((h) => h.trim().toLowerCase());
    const colIndex: Record<string, number> = {};
    for (const reqHeader of REQUIRED_CSV_HEADERS) {
      const idx = rawHeaders.indexOf(reqHeader.toLowerCase());
      if (idx === -1) {
        return NextResponse.json(
          {
            ok: false,
            error: `Missing required CSV column "${reqHeader}". Expected headers: ${REQUIRED_CSV_HEADERS.join(", ")}`,
          },
          { status: 400 },
        );
      }
      colIndex[reqHeader] = idx;
    }

    const candidates: CsvValidatedRow[] = [];
    const rejected: CsvRejectedRow[] = [];
    const seenInFile = new Set<string>();

    for (let i = 1; i < parsedRows.length; i++) {
      const cols = parsedRows[i];
      const rowNumber = i + 1; // 1-based spreadsheet line number

      const rawCertId = (cols[colIndex.certificateId] ?? "").trim();
      const studentName = (cols[colIndex.studentName] ?? "").trim();
      const course = (cols[colIndex.course] ?? "").trim();
      const courseDuration = (cols[colIndex.courseDuration] ?? "").trim();
      const rawIssueDate = (cols[colIndex.issueDate] ?? "").trim();

      const certificateId = normalizeCertificateId(rawCertId);
      const reasons: string[] = [];

      if (!certificateId) {
        reasons.push("Missing certificateId");
      } else if (!isValidCertificateId(certificateId)) {
        reasons.push("Invalid certificateId format (use 4–40 letters, numbers, hyphens)");
      }
      if (studentName.length < 2) reasons.push("Missing studentName");
      if (course.length < 2) reasons.push("Missing course");
      if (courseDuration.length < 1) reasons.push("Missing courseDuration");

      const parsedDate = parseIssueDate(rawIssueDate);
      if (!parsedDate) {
        reasons.push("Invalid issueDate (use YYYY-MM-DD)");
      }

      if (reasons.length > 0) {
        rejected.push({
          rowNumber,
          certificateId: certificateId || rawCertId,
          studentName,
          course,
          courseDuration,
          issueDate: rawIssueDate,
          category: "invalid",
          reason: reasons.join("; "),
        });
        continue;
      }

      if (seenInFile.has(certificateId)) {
        rejected.push({
          rowNumber,
          certificateId,
          studentName,
          course,
          courseDuration,
          issueDate: parsedDate!.iso,
          category: "duplicate_in_file",
          reason: "Duplicate certificateId within uploaded CSV file",
        });
        continue;
      }

      seenInFile.add(certificateId);
      candidates.push({
        rowNumber,
        certificateId,
        studentName,
        course,
        courseDuration,
        issueDate: parsedDate!.iso,
      });
    }

    // Check existing certificate IDs in MongoDB in chunks of 500
    const existingIds = new Set<string>();
    if (candidates.length > 0) {
      const col = await getCertificatesCollection();
      for (let offset = 0; offset < candidates.length; offset += CHUNK_SIZE) {
        const batchIds = candidates.slice(offset, offset + CHUNK_SIZE).map((c) => c.certificateId);
        const found = await col
          .find({ certificateId: { $in: batchIds } }, { projection: { certificateId: 1 } })
          .toArray();
        for (const f of found) existingIds.add(f.certificateId);
      }
    }

    const validRecords: CsvValidatedRow[] = [];
    for (const c of candidates) {
      if (existingIds.has(c.certificateId)) {
        rejected.push({
          rowNumber: c.rowNumber,
          certificateId: c.certificateId,
          studentName: c.studentName,
          course: c.course,
          courseDuration: c.courseDuration,
          issueDate: c.issueDate,
          category: "duplicate_in_db",
          reason: "Certificate ID already exists in database",
        });
      } else {
        validRecords.push(c);
      }
    }

    rejected.sort((a, b) => a.rowNumber - b.rowNumber);

    const duplicateCount = rejected.filter(
      (r) => r.category === "duplicate_in_file" || r.category === "duplicate_in_db",
    ).length;
    const invalidCount = rejected.filter((r) => r.category === "invalid").length;

    const preview: CsvImportPreview = {
      totalRows: dataRowCount,
      validCount: validRecords.length,
      duplicateCount,
      invalidCount,
      validRecords,
      rejectedRecords: rejected,
    };

    return NextResponse.json({ ok: true, preview });
  } catch (err) {
    console.error("[TPS_CSV_PREVIEW_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "Failed to parse and validate CSV file." },
      { status: 500 },
    );
  }
}
