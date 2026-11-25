import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getReviewsCollection } from "@/lib/admin/collections";
import { reviewSchema } from "@/lib/admin/validation";
import type { AdminReviewItem, ReviewDoc } from "@/lib/admin/types";

function serializeReview(doc: ReviewDoc): AdminReviewItem {
  return {
    id: String(doc._id),
    studentName: doc.studentName,
    campus: doc.campus,
    course: doc.course,
    role: doc.role || "",
    company: doc.company || "",
    rating: doc.rating,
    quote: doc.quote,
    approved: doc.approved,
    featured: doc.featured,
    createdAt: doc.createdAt.toISOString(),
    updatedAt: doc.updatedAt.toISOString(),
  };
}

function revalidateReviewPaths() {
  revalidatePath("/");
  revalidatePath("/vijay-nagar");
  revalidatePath("/bhawarkua");
  revalidatePath("/annapurna");
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
    const col = await getReviewsCollection();
    const docs = await col.find({}).sort({ createdAt: -1 }).toArray();
    return NextResponse.json({
      ok: true,
      items: docs.map(serializeReview),
    });
  } catch (err) {
    console.error("[ADMIN_REVIEWS_GET_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Could not load reviews." }, { status: 500 });
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
    const parsed = reviewSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid review details." },
        { status: 400 },
      );
    }

    const now = new Date();
    const doc: ReviewDoc = {
      ...parsed.data,
      createdAt: now,
      updatedAt: now,
    };

    const col = await getReviewsCollection();
    const res = await col.insertOne(doc);
    revalidateReviewPaths();

    return NextResponse.json(
      { ok: true, item: serializeReview({ ...doc, _id: res.insertedId }) },
      { status: 201 },
    );
  } catch (err) {
    console.error("[ADMIN_REVIEWS_POST_ERROR]", err);
    return NextResponse.json({ ok: false, error: "Could not create review." }, { status: 500 });
  }
}
