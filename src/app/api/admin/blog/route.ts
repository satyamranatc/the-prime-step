import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { requireAdminApi } from "@/lib/certificates/auth";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getBlogPostsCollection } from "@/lib/admin/collections";
import {
  blogPostSchema,
  estimateReadingTime,
  STATIC_BLOG_SLUGS,
} from "@/lib/admin/validation";
import { serializeBlogPost } from "@/lib/blog";
import type { BlogPostDoc } from "@/lib/admin/types";

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
    const col = await getBlogPostsCollection();
    const docs = await col.find({}).sort({ updatedAt: -1 }).toArray();
    return NextResponse.json({
      ok: true,
      items: docs.map(serializeBlogPost),
    });
  } catch (err) {
    console.error("[ADMIN_BLOG_GET_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not load blog posts." },
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
    const parsed = blogPostSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid blog post data." },
        { status: 400 },
      );
    }

    const slug = parsed.data.slug.toLowerCase();
    if (STATIC_BLOG_SLUGS.has(slug)) {
      return NextResponse.json(
        {
          ok: false,
          error: `The slug "/blog/${slug}" belongs to an existing built-in SEO article. Please choose a unique URL slug.`,
        },
        { status: 409 },
      );
    }

    const col = await getBlogPostsCollection();
    const existing = await col.findOne({ slug });
    if (existing) {
      return NextResponse.json(
        { ok: false, error: `A blog post with slug "${slug}" already exists.` },
        { status: 409 },
      );
    }

    const now = new Date();
    const doc: BlogPostDoc = {
      slug,
      title: parsed.data.title,
      metaTitle: parsed.data.metaTitle || parsed.data.title,
      metaDescription: parsed.data.metaDescription || parsed.data.excerpt,
      category: parsed.data.category,
      author: parsed.data.author || "The Prime Step Faculty",
      readingTime: parsed.data.readingTime || estimateReadingTime(parsed.data.content),
      excerpt: parsed.data.excerpt,
      content: parsed.data.content,
      published: parsed.data.published,
      publishedAt: parsed.data.published ? now : null,
      createdAt: now,
      updatedAt: now,
    };

    const res = await col.insertOne(doc);

    try {
      revalidatePath("/blog");
      revalidatePath(`/blog/${slug}`);
      revalidatePath("/sitemap.xml");
    } catch {
      // Non-fatal in dev mode
    }

    return NextResponse.json(
      { ok: true, item: serializeBlogPost({ ...doc, _id: res.insertedId }) },
      { status: 201 },
    );
  } catch (err) {
    console.error("[ADMIN_BLOG_POST_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not create blog post." },
      { status: 500 },
    );
  }
}
