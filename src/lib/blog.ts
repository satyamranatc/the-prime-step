import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { getBlogPostsCollection } from "@/lib/admin/collections";
import type { AdminBlogPostItem, BlogPostDoc } from "@/lib/admin/types";
export { STATIC_BLOG_POSTS } from "./blogStatic";

function toIso(val: unknown): string {
  if (val instanceof Date) return val.toISOString();
  if (typeof val === "string" && val) return val;
  return new Date().toISOString();
}

export function serializeBlogPost(doc: BlogPostDoc): AdminBlogPostItem {
  return {
    id: String(doc._id),
    slug: doc.slug,
    title: doc.title,
    metaTitle: doc.metaTitle || doc.title,
    metaDescription: doc.metaDescription || doc.excerpt,
    category: doc.category || "Career Guide",
    author: doc.author || "The Prime Step Faculty",
    readingTime: doc.readingTime || "5 min read",
    excerpt: doc.excerpt,
    content: doc.content,
    published: Boolean(doc.published),
    publishedAt: doc.publishedAt ? toIso(doc.publishedAt) : null,
    createdAt: toIso(doc.createdAt),
    updatedAt: toIso(doc.updatedAt),
  };
}

/**
 * Fetches published CMS blog posts for public rendering & sitemap generation.
 * Fails gracefully to [] if MongoDB is unavailable so public SEO pages never error.
 */
export async function getPublishedCmsBlogPosts(): Promise<AdminBlogPostItem[]> {
  if (!isMongoConfigured()) return [];
  try {
    const col = await getBlogPostsCollection();
    const docs = await col
      .find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(200)
      .toArray();
    return docs.map(serializeBlogPost);
  } catch (err) {
    console.error("[PUBLIC_BLOG_LIST_ERROR]", err);
    return [];
  }
}

export async function getPublishedCmsBlogPostBySlug(
  slug: string,
): Promise<AdminBlogPostItem | null> {
  if (!isMongoConfigured()) return null;
  try {
    const col = await getBlogPostsCollection();
    const doc = await col.findOne({ slug: slug.trim().toLowerCase(), published: true });
    return doc ? serializeBlogPost(doc) : null;
  } catch (err) {
    console.error("[PUBLIC_BLOG_SLUG_ERROR]", err);
    return null;
  }
}
