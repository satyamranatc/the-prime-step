import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getReviewsCollection } from "@/lib/admin/collections";
import { updateReviewSchema } from "@/lib/admin/validation";

function revalidateReviewPaths() {
  revalidatePath("/");
  revalidatePath("/vijay-nagar");
  revalidatePath("/bhawarkua");
  revalidatePath("/annapurna");
}

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
    return NextResponse.json({ ok: false, error: "Invalid review ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = updateReviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid review update." },
        { status: 400 },
      );
    }

    const col = await getReviewsCollection();
    const updated = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...parsed.data, updatedAt: new Date() } },
      { returnDocument: "after" },
    );

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Review not found." }, { status: 404 });
    }

    revalidateReviewPaths();

    return NextResponse.json({
      ok: true,
      item: {
        id: String(updated._id),
        studentName: updated.studentName,
        campus: updated.campus,
        course: updated.course,
        role: updated.role || "",
        company: updated.company || "",
        rating: updated.rating,
        quote: updated.quote,
        approved: updated.approved,
        featured: updated.featured,
        createdAt: updated.createdAt.toISOString(),
        updatedAt: updated.updatedAt.toISOString(),
      },
    });
  } catch (err) {
    console.error("[ADMIN_REVIEW_PATCH_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Could not update review." }, { status: 500 });
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
    return NextResponse.json({ ok: false, error: "Invalid review ID." }, { status: 400 });
  }

  try {
    const col = await getReviewsCollection();
    const res = await col.deleteOne({ _id: new ObjectId(id) });
    if (res.deletedCount === 0) {
      return NextResponse.json({ ok: false, error: "Review not found." }, { status: 404 });
    }

    revalidateReviewPaths();
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ADMIN_REVIEW_DELETE_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Could not delete review." }, { status: 500 });
  }
}
