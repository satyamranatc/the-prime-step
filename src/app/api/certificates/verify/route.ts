import { NextResponse } from "next/server";
import { getCertificatesCollection, isMongoConfigured } from "@/lib/certificates/mongodb";
import { checkRateLimit, getClientIp } from "@/lib/certificates/rateLimit";
import {
  formatDateIso,
  isValidCertificateId,
  normalizeCertificateId,
} from "@/lib/certificates/validation";
import type { PublicCertificatePayload } from "@/lib/certificates/types";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store, max-age=0" };

  // Rate limit: 60 lookups per minute per IP
  const ip = getClientIp(request);
  const rl = checkRateLimit(`verify:${ip}`, 60, 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        state: "rate_limited",
        error: "Too many verification requests. Please wait a moment and try again.",
      },
      { status: 429, headers: { ...headers, "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  const { searchParams } = new URL(request.url);
  const rawId = searchParams.get("id") ?? "";
  const certificateId = normalizeCertificateId(rawId);

  if (!certificateId) {
    return NextResponse.json(
      {
        ok: false,
        state: "invalid",
        error: "Please enter a certificate ID (for example: TPS-2026-000123).",
      },
      { status: 400, headers },
    );
  }

  if (!isValidCertificateId(certificateId)) {
    return NextResponse.json(
      {
        ok: false,
        state: "invalid",
        error: "Invalid certificate ID format. Use letters, numbers, and hyphens (e.g. TPS-2026-000123).",
      },
      { status: 400, headers },
    );
  }

  if (!isMongoConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        state: "error",
        error: "Certificate verification service is temporarily unavailable. Please try again shortly.",
      },
      { status: 503, headers },
    );
  }

  try {
    const col = await getCertificatesCollection();
    const doc = await col.findOne(
      { certificateId },
      {
        projection: {
          certificateId: 1,
          studentName: 1,
          course: 1,
          courseDuration: 1,
          issueDate: 1,
          status: 1,
          revokedAt: 1,
        },
      },
    );

    if (!doc) {
      return NextResponse.json(
        {
          ok: false,
          state: "not_found",
          error: `No certificate matching "${certificateId}" was found in The Prime Step records.`,
        },
        { status: 404, headers },
      );
    }

    const certificate: PublicCertificatePayload = {
      certificateId: doc.certificateId,
      studentName: doc.studentName,
      course: doc.course,
      courseDuration: doc.courseDuration,
      issueDate: formatDateIso(new Date(doc.issueDate)),
      status: doc.status === "revoked" ? "revoked" : "valid",
      revokedAt: doc.revokedAt ? formatDateIso(new Date(doc.revokedAt)) : null,
      instituteName: "The Prime Step",
      instituteLocation: "Indore, Madhya Pradesh, India",
    };

    return NextResponse.json(
      {
        ok: true,
        state: certificate.status === "revoked" ? "revoked" : "verified",
        certificate,
      },
      { status: 200, headers },
    );
  } catch (err) {
    console.error("[TPS_CERT_VERIFY_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      {
        ok: false,
        state: "error",
        error: "We could not verify this certificate right now due to a temporary server error. Please try again.",
      },
      { status: 500, headers },
    );
  }
}
