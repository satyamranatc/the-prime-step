import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getBlogPostsCollection } from "@/lib/admin/collections";
import {
  estimateReadingTime,
  STATIC_BLOG_SLUGS,
  updateBlogPostSchema,
} from "@/lib/admin/validation";
import { serializeBlogPost } from "@/lib/blog";

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
    return NextResponse.json({ ok: false, error: "Invalid post ID." }, { status: 400 });
  }

  try {
    const body = await request.json();
    const parsed = updateBlogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid update payload." },
        { status: 400 },
      );
    }

    const col = await getBlogPostsCollection();
    const current = await col.findOne({ _id: new ObjectId(id) });
    if (!current) {
      return NextResponse.json({ ok: false, error: "Blog post not found." }, { status: 404 });
    }

    const nextSlug = parsed.data.slug ? parsed.data.slug.toLowerCase() : current.slug;
    if (nextSlug !== current.slug) {
      if (STATIC_BLOG_SLUGS.has(nextSlug)) {
        return NextResponse.json(
          { ok: false, error: `The slug "/blog/${nextSlug}" is reserved for a built-in SEO article.` },
          { status: 409 },
        );
      }
      const conflict = await col.findOne({ slug: nextSlug, _id: { $ne: current._id } });
      if (conflict) {
        return NextResponse.json(
          { ok: false, error: `Another blog post already uses slug "${nextSlug}".` },
          { status: 409 },
        );
      }
    }

    const now = new Date();
    const update: Record<string, unknown> = {
      ...parsed.data,
      slug: nextSlug,
      updatedAt: now,
    };

    if (parsed.data.content && !parsed.data.readingTime) {
      update.readingTime = estimateReadingTime(parsed.data.content);
    }
    if (parsed.data.published === true && !current.publishedAt) {
      update.publishedAt = now;
    }

    const updated = await col.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: update },
      { returnDocument: "after" },
    );

    if (!updated) {
      return NextResponse.json({ ok: false, error: "Blog post not found." }, { status: 404 });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${current.slug}`);
    revalidatePath(`/blog/${updated.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ ok: true, item: serializeBlogPost(updated) });
  } catch (err) {
    console.error("[ADMIN_BLOG_PATCH_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not update blog post." },
      { status: 500 },
    );
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
    return NextResponse.json({ ok: false, error: "Invalid post ID." }, { status: 400 });
  }

  try {
    const col = await getBlogPostsCollection();
    const deleted = await col.findOneAndDelete({ _id: new ObjectId(id) });
    if (!deleted) {
      return NextResponse.json({ ok: false, error: "Blog post not found." }, { status: 404 });
    }

    revalidatePath("/blog");
    revalidatePath(`/blog/${deleted.slug}`);
    revalidatePath("/sitemap.xml");

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ADMIN_BLOG_DELETE_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not delete blog post." },
      { status: 500 },
    );
  }
}
