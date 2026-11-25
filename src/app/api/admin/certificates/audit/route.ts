import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getAuditLogsCollection } from "@/lib/certificates/mongodb";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const { searchParams } = new URL(request.url);
    const limit = Math.min(100, Math.max(10, Number(searchParams.get("limit") || "30") || 30));

    const col = await getAuditLogsCollection();
    const docs = await col.find({}).sort({ timestamp: -1 }).limit(limit).toArray();

    return NextResponse.json({
      ok: true,
      logs: docs.map((d) => ({
        id: d._id ? d._id.toString() : `${d.timestamp.toISOString()}-${d.action}`,
        action: d.action,
        certificateId: d.certificateId,
        batchId: d.batchId,
        adminId: d.adminId,
        timestamp: new Date(d.timestamp).toISOString(),
        summary: d.summary,
      })),
    });
  } catch (err) {
    console.error("[TPS_ADMIN_AUDIT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json({ ok: false, error: "Could not load audit logs." }, { status: 500 });
  }
}
