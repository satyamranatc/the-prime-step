import { NextResponse } from "next/server";
import type { Filter } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getLeadsCollection } from "@/lib/admin/collections";
import { createLeadSchema, normalizeCampusLabel } from "@/lib/admin/validation";
import { LEAD_STATUSES, type AdminLeadItem, type LeadDoc, type LeadStatus } from "@/lib/admin/types";

function serializeLead(doc: LeadDoc): AdminLeadItem {
  return {
    id: String(doc._id),
    leadId: doc.leadId,
    name: doc.name,
    phone: doc.phone,
    email: doc.email || "",
    course: doc.course || "",
    campus: doc.campus || "Vijay Nagar",
    background: doc.background || "",
    message: doc.message || "",
    page: doc.page || "",
    utm: doc.utm || {},
    status: doc.status || "new",
    notes: doc.notes || "",
    assignedTo: doc.assignedTo || "",
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

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
    const q = (url.searchParams.get("q") || "").trim();
    const campus = (url.searchParams.get("campus") || "all").trim();
    const status = (url.searchParams.get("status") || "all").trim();
    const page = Math.max(1, Number.parseInt(url.searchParams.get("page") || "1", 10) || 1);
    const limit = Math.min(100, Math.max(10, Number.parseInt(url.searchParams.get("limit") || "25", 10) || 25));

    const filter: Filter<LeadDoc> = {};
    if (campus !== "all") {
      filter.campus = campus;
    }
    if (status !== "all" && (LEAD_STATUSES as readonly string[]).includes(status)) {
      filter.status = status as LeadStatus;
    }
    if (q) {
      const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const rx = new RegExp(escaped, "i");
      filter.$or = [
        { name: rx },
        { phone: rx },
        { email: rx },
        { course: rx },
        { notes: rx },
        { leadId: rx },
      ];
    }

    const col = await getLeadsCollection();
    const [total, items, totalAll, newCount, demoCount, enrolledCount] = await Promise.all([
      col.countDocuments(filter),
      col
        .find(filter)
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      col.countDocuments(),
      col.countDocuments({ status: "new" }),
      col.countDocuments({ status: "demo_attended" }),
      col.countDocuments({ status: "enrolled" }),
    ]);

    return NextResponse.json({
      ok: true,
      stats: {
        total: totalAll,
        new: newCount,
        demoAttended: demoCount,
        enrolled: enrolledCount,
      },
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.max(1, Math.ceil(total / limit)),
      },
      items: items.map(serializeLead),
    });
  } catch (err) {
    console.error("[ADMIN_LEADS_GET_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not load leads." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { ok: false, error: "MONGODB_URI is not configured." },
      { status: 503 },
    );
  }

  try {
    const body = await request.json();
    const parsed = createLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid lead data." },
        { status: 400 },
      );
    }

    const now = new Date();
    const doc: LeadDoc = {
      leadId: `lead_${Date.now()}`,
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      course: parsed.data.course,
      campus: normalizeCampusLabel(parsed.data.campus),
      background: parsed.data.background,
      message: parsed.data.message,
      page: parsed.data.page || "/admin/leads (manual)",
      utm: { utm_source: "walkin_or_phone" },
      status: parsed.data.status,
      notes: parsed.data.notes,
      assignedTo: parsed.data.assignedTo || auth.session.adminId,
      createdAt: now,
      updatedAt: now,
    };

    const col = await getLeadsCollection();
    const result = await col.insertOne(doc);
    return NextResponse.json(
      { ok: true, item: serializeLead({ ...doc, _id: result.insertedId }) },
      { status: 201 },
    );
  } catch (err) {
    console.error("[ADMIN_LEADS_POST_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not create lead." },
      { status: 500 },
    );
  }
}
