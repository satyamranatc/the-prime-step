import { NextResponse } from "next/server";
import type { Filter } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getLeadsCollection } from "@/lib/admin/collections";
import { escapeCsvCell } from "@/lib/admin/validation";
import { LEAD_STATUSES, type LeadDoc, type LeadStatus } from "@/lib/admin/types";

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { ok: false, error: "MONGODB_URI is not configured." },
      { status: 503 },
    );
  }

  try {
    const url = new URL(request.url);
    const campus = (url.searchParams.get("campus") || "all").trim();
    const status = (url.searchParams.get("status") || "all").trim();

    const filter: Filter<LeadDoc> = {};
    if (campus !== "all") filter.campus = campus;
    if (status !== "all" && (LEAD_STATUSES as readonly string[]).includes(status)) {
      filter.status = status as LeadStatus;
    }

    const col = await getLeadsCollection();
    const docs = await col.find(filter).sort({ createdAt: -1 }).limit(10000).toArray();

    const headers = [
      "Lead ID",
      "Date",
      "Name",
      "Phone",
      "Email",
      "Campus",
      "Course",
      "Status",
      "UTM Source",
      "UTM Campaign",
      "Page",
      "Notes",
    ];

    const lines = [
      headers.map(escapeCsvCell).join(","),
      ...docs.map((d) =>
        [
          d.leadId,
          d.createdAt.toISOString(),
          d.name,
          d.phone,
          d.email || "",
          d.campus || "",
          d.course || "",
          d.status || "new",
          d.utm?.utm_source || "",
          d.utm?.utm_campaign || "",
          d.page || "",
          d.notes || "",
        ]
          .map(escapeCsvCell)
          .join(","),
      ),
    ];

    const csv = lines.join("\r\n");
    const stamp = new Date().toISOString().slice(0, 10);

    return new NextResponse(csv, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="the-prime-step-leads-${stamp}.csv"`,
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error("[ADMIN_LEADS_EXPORT_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not export leads." },
      { status: 500 },
    );
  }
}
