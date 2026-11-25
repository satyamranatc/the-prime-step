import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";
import { recordAuditLog } from "@/lib/certificates/audit";
import {
  formatDateIso,
  normalizeCertificateId,
  reinstateCertificateSchema,
  revokeCertificateSchema,
} from "@/lib/certificates/validation";
import type { CertificateDoc } from "@/lib/certificates/types";

async function findCert(idParam: string): Promise<CertificateDoc | null> {
  const col = await getCertificatesCollection();
  if (ObjectId.isValid(idParam)) {
    const byObjId = await col.findOne({ _id: new ObjectId(idParam) });
    if (byObjId) return byObjId;
  }
  return col.findOne({ certificateId: normalizeCertificateId(idParam) });
}

export async function POST(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const { id } = await context.params;
    const existing = await findCert(id);
    if (!existing || !existing._id) {
      return NextResponse.json({ ok: false, error: "Certificate not found." }, { status: 404 });
    }

    const body = await request.json();
    const action = body?.action === "reinstate" ? "reinstate" : "revoke";
    const col = await getCertificatesCollection();
    const now = new Date();

    if (action === "reinstate") {
      const parsed = reinstateCertificateSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { ok: false, error: parsed.error.issues[0]?.message || "Invalid reinstatement note." },
          { status: 400 },
        );
      }

      if (existing.status === "valid") {
        return NextResponse.json(
          { ok: false, error: "This certificate is already valid." },
          { status: 400 },
        );
      }

      await col.updateOne(
        { _id: existing._id },
        {
          $set: {
            status: "valid",
            revokedAt: null,
            revocationReason: null,
            revokedBy: null,
            updatedAt: now,
          },
        },
      );

      await recordAuditLog({
        action: "certificate.reinstated",
        certificateId: existing.certificateId,
        adminId: auth.session.adminId,
        summary: parsed.data.reason
          ? `Reinstated certificate. Note: ${parsed.data.reason}`
          : "Reinstated previously revoked certificate.",
      });
    } else {
      const parsed = revokeCertificateSchema.safeParse(body);
      if (!parsed.success) {
        return NextResponse.json(
          { ok: false, error: parsed.error.issues[0]?.message || "Revocation reason is required." },
          { status: 400 },
        );
      }

      if (existing.status === "revoked") {
        return NextResponse.json(
          { ok: false, error: "This certificate is already revoked." },
          { status: 400 },
        );
      }

      await col.updateOne(
        { _id: existing._id },
        {
          $set: {
            status: "revoked",
            revokedAt: now,
            revocationReason: parsed.data.reason,
            revokedBy: auth.session.adminId,
            updatedAt: now,
          },
        },
      );

      await recordAuditLog({
        action: "certificate.revoked",
        certificateId: existing.certificateId,
        adminId: auth.session.adminId,
        summary: `Revoked certificate. Reason: ${parsed.data.reason}`,
      });
    }

    const updated = await col.findOne({ _id: existing._id });
    if (!updated) {
      return NextResponse.json({ ok: false, error: "Certificate not found." }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      certificate: {
        id: updated._id?.toString() ?? updated.certificateId,
        certificateId: updated.certificateId,
        studentName: updated.studentName,
        course: updated.course,
        courseDuration: updated.courseDuration,
        issueDate: formatDateIso(new Date(updated.issueDate)),
        status: updated.status,
        createdAt: new Date(updated.createdAt).toISOString(),
        updatedAt: new Date(updated.updatedAt).toISOString(),
        revokedAt: updated.revokedAt ? new Date(updated.revokedAt).toISOString() : null,
        revocationReason: updated.revocationReason ?? null,
        revokedBy: updated.revokedBy ?? null,
      },
    });
  } catch (err) {
    console.error("[TPS_ADMIN_REVOKE_CERT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "Failed to update certificate status." }, { status: 500 });
  }
}
