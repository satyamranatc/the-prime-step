import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getAuditLogsCollection, getCertificatesCollection } from "@/lib/certificates/mongodb";
import { recordAuditLog } from "@/lib/certificates/audit";
import {
  formatDateIso,
  normalizeCertificateId,
  parseIssueDate,
  updateCertificateSchema,
} from "@/lib/certificates/validation";
import type { CertificateDoc } from "@/lib/certificates/types";

async function findCertByIdOrCode(idParam: string): Promise<CertificateDoc | null> {
  const col = await getCertificatesCollection();
  if (ObjectId.isValid(idParam)) {
    const byObjId = await col.findOne({ _id: new ObjectId(idParam) });
    if (byObjId) return byObjId;
  }
  return col.findOne({ certificateId: normalizeCertificateId(idParam) });
}

function serialize(doc: CertificateDoc) {
  return {
    id: doc._id ? doc._id.toString() : doc.certificateId,
    certificateId: doc.certificateId,
    studentName: doc.studentName,
    course: doc.course,
    courseDuration: doc.courseDuration,
    issueDate: formatDateIso(new Date(doc.issueDate)),
    status: doc.status === "revoked" ? "revoked" : "valid",
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
    revokedAt: doc.revokedAt ? new Date(doc.revokedAt).toISOString() : null,
    revocationReason: doc.revocationReason ?? null,
    revokedBy: doc.revokedBy ?? null,
  };
}

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const doc = await findCertByIdOrCode(id);
    if (!doc) {
      return NextResponse.json({ ok: false, error: "Certificate not found." }, { status: 404 });
    }

    const auditCol = await getAuditLogsCollection();
    const logs = await auditCol
      .find({ certificateId: doc.certificateId })
      .sort({ timestamp: -1 })
      .limit(20)
      .toArray();

    return NextResponse.json({
      ok: true,
      certificate: serialize(doc),
      auditLogs: logs.map((l) => ({
        id: l._id ? l._id.toString() : `${l.timestamp.toISOString()}-${l.action}`,
        action: l.action,
        certificateId: l.certificateId,
        batchId: l.batchId,
        adminId: l.adminId,
        timestamp: new Date(l.timestamp).toISOString(),
        summary: l.summary,
      })),
    });
  } catch (err) {
    console.error("[TPS_ADMIN_GET_CERT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "Failed to load certificate." }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const existing = await findCertByIdOrCode(id);
    if (!existing || !existing._id) {
      return NextResponse.json({ ok: false, error: "Certificate not found." }, { status: 404 });
    }

    const body = await request.json();
    const parsed = updateCertificateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid update fields." },
        { status: 400 },
      );
    }

    const parsedDate = parseIssueDate(parsed.data.issueDate);
    if (!parsedDate) {
      return NextResponse.json({ ok: false, error: "Invalid issue date." }, { status: 400 });
    }

    const changes: string[] = [];
    if (existing.studentName !== parsed.data.studentName) {
      changes.push(`studentName: "${existing.studentName}" -> "${parsed.data.studentName}"`);
    }
    if (existing.course !== parsed.data.course) {
      changes.push(`course: "${existing.course}" -> "${parsed.data.course}"`);
    }
    if (existing.courseDuration !== parsed.data.courseDuration) {
      changes.push(`duration: "${existing.courseDuration}" -> "${parsed.data.courseDuration}"`);
    }
    const oldIso = formatDateIso(new Date(existing.issueDate));
    if (oldIso !== parsedDate.iso) {
      changes.push(`issueDate: ${oldIso} -> ${parsedDate.iso}`);
    }

    const col = await getCertificatesCollection();
    const now = new Date();
    await col.updateOne(
      { _id: existing._id },
      {
        $set: {
          studentName: parsed.data.studentName,
          course: parsed.data.course,
          courseDuration: parsed.data.courseDuration,
          issueDate: parsedDate.date,
          updatedAt: now,
        },
      },
    );

    const updated = await col.findOne({ _id: existing._id });
    if (changes.length > 0) {
      await recordAuditLog({
        action: "certificate.edited",
        certificateId: existing.certificateId,
        adminId: auth.session.adminId,
        summary: `Updated ${changes.join("; ")}`,
      });
    }

    return NextResponse.json({
      ok: true,
      certificate: updated ? serialize(updated) : serialize(existing),
    });
  } catch (err) {
    console.error("[TPS_ADMIN_PATCH_CERT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "Failed to update certificate." }, { status: 500 });
  }
}
