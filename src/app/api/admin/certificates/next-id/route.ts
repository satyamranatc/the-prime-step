import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";

/** Generates the next sequential TPS-YYYY-XXXXXX certificate ID. */
export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const yearParam = searchParams.get("year");
    const year =
      yearParam && /^\d{4}$/.test(yearParam)
        ? Number(yearParam)
        : new Date().getUTCFullYear();

    const prefix = `TPS-${year}-`;
    const col = await getCertificatesCollection();

    const latest = await col
      .find(
        { certificateId: { $regex: `^TPS-${year}-\\d{6}$` } },
        { projection: { certificateId: 1 } },
      )
      .sort({ certificateId: -1 })
      .limit(1)
      .toArray();

    let nextSeq = 1;
    if (latest[0]?.certificateId) {
      const seqPart = latest[0].certificateId.slice(prefix.length);
      const parsed = Number.parseInt(seqPart, 10);
      if (Number.isFinite(parsed) && parsed >= 1) {
        nextSeq = parsed + 1;
      }
    }

    const certificateId = `${prefix}${String(nextSeq).padStart(6, "0")}`;
    return NextResponse.json({ ok: true, certificateId });
  } catch (err) {
    console.error("[TPS_ADMIN_NEXT_ID_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "Could not generate next certificate ID." },
      { status: 500 },
    );
  }
}
