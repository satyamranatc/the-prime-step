import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getLeadsCollection } from "@/lib/admin/collections";
import { normalizeCampusLabel, updateLeadSchema } from "@/lib/admin/validation";

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { ok: false, error: "MONGODB_URI is not configured." },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid lead ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = updateLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid update payload." },
        { status: 400 },
      );
    }

    const update: Record<string, unknown> = { updatedAt: new Date() };
    if (parsed.data.status !== undefined) update.status = parsed.data.status;
    if (parsed.data.notes !== undefined) update.notes = parsed.data.notes;
    if (parsed.data.assignedTo !== undefined) update.assignedTo = parsed.data.assignedTo;
    if (parsed.data.course !== undefined) update.course = parsed.data.course;
    if (parsed.data.campus !== undefined) {
      update.campus = normalizeCampusLabel(parsed.data.campus);
    }

    const col = await getLeadsCollection();
    const updated = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      item: {
        id: String(updated._id),
        leadId: updated.leadId,
        name: updated.name,
        phone: updated.phone,
        email: updated.email || "",
        course: updated.course || "",
        campus: updated.campus || "Vijay Nagar",
        background: updated.background || "",
        message: updated.message || "",
        page: updated.page || "",
        utm: updated.utm || {},
        status: updated.status,
        notes: updated.notes || "",
        assignedTo: updated.assignedTo || "",
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("[ADMIN_LEAD_PATCH_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Could not update lead." }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { ok: false, error: "MONGODB_URI is not configured." },
      { status: 503 },
    );
  }

  const { id } = await context.params;
  if (!ObjectId.isValid(id)) {
    return NextResponse.json({ ok: false, error: "Invalid lead ID." }, { status: 400 });
  }

  try {
    const col = await getLeadsCollection();
    const res = await col.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "Lead not found." }, { status: 404 });
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ADMIN_LEAD_DELETE_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Could not delete lead." }, { status: 500 });
  }
}
