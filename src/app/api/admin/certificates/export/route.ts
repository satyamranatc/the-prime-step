import { NextResponse } from "next/server";
import type { Filter } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";
import {
  buildVerificationUrl,
  escapeCsvCell,
  formatDateIso,
} from "@/lib/certificates/validation";
import type { CertificateDoc } from "@/lib/certificates/types";

const MAX_EXPORT_ROWS = 25000;

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const col = await getCertificatesCollection();
    const { searchParams } = new URL(request.url);
    const status = (searchParams.get("status") || "all").trim();
    const yearStr = (searchParams.get("year") || "").trim();
    const course = (searchParams.get("course") || "").trim();

    const filter: Filter<CertificateDoc> = {};
    if (status === "valid" || status === "revoked") filter.status = status;
    if (course && course !== "all") filter.course = course;
    if (yearStr && /^\d{4}$/.test(yearStr)) {
      const y = Number(yearStr);
      filter.issueDate = {
        $gte: new Date(Date.UTC(y, 0, 1)),
        $lt: new Date(Date.UTC(y + 1, 0, 1)),
      };
    }

    const docs = await col
      .find(filter)
      .sort({ issueDate: -1, certificateId: 1 })
      .limit(MAX_EXPORT_ROWS)
      .toArray();

    const header = [
      "certificateId",
      "studentName",
      "course",
      "courseDuration",
      "issueDate",
      "status",
      "verificationUrl",
      "revokedAt",
      "revocationReason",
    ].join(",");

    const lines = docs.map((d) =>
      [
        d.certificateId,
        d.studentName,
        d.course,
        d.courseDuration,
        formatDateIso(new Date(d.issueDate)),
        d.status,
        buildVerificationUrl(d.certificateId),
        d.revokedAt ? formatDateIso(new Date(d.revokedAt)) : "",
        d.revocationReason || "",
      ]
        .map(escapeCsvCell)
        .join(","),
    );

    const csv = [header, ...lines].join("\r\n");
    const filename = `the-prime-step-certificates-${new Date().toISOString().slice(0, 10)}.csv`;

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[TPS_ADMIN_EXPORT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "Could not export certificates." }, { status: 500 });
  }
}
