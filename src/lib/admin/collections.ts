import type { Collection, Db } from "mongodb";
import { getDatabase } from "@/lib/certificates/mongodb";
import type { BlogPostDoc, LeadDoc, ReviewDoc } from "./types";

declare global {
  var __tpsAdminIndexesReady: boolean | undefined;
}

async function ensureAdminIndexes(db: Db) {
  if (globalThis.__tpsAdminIndexesReady) return;

  const leads = db.collection<LeadDoc>("leads");
  const reviews = db.collection<ReviewDoc>("reviews");
  const blogPosts = db.collection<BlogPostDoc>("blog_posts");

  await Promise.all([
    leads.createIndex({ createdAt: -1 }, { name: "idx_leads_createdAt_desc" }),
    leads.createIndex({ status: 1, createdAt: -1 }, { name: "idx_leads_status_createdAt" }),
    leads.createIndex({ campus: 1, createdAt: -1 }, { name: "idx_leads_campus_createdAt" }),
    leads.createIndex({ phone: 1 }, { name: "idx_leads_phone" }),
    reviews.createIndex({ approved: 1, featured: -1, createdAt: -1 }, { name: "idx_reviews_approved_featured" }),
    reviews.createIndex({ campus: 1 }, { name: "idx_reviews_campus" }),
    blogPosts.createIndex({ slug: 1 }, { unique: true, name: "uniq_blog_slug" }),
    blogPosts.createIndex({ published: 1, publishedAt: -1 }, { name: "idx_blog_published_desc" }),
  ]);

  globalThis.__tpsAdminIndexesReady = true;
}

export async function getLeadsCollection(): Promise<Collection<LeadDoc>> {
  const db = await getDatabase();
  await ensureAdminIndexes(db);
  return db.collection<LeadDoc>("leads");
}

export async function getReviewsCollection(): Promise<Collection<ReviewDoc>> {
  const db = await getDatabase();
  await ensureAdminIndexes(db);
  return db.collection<ReviewDoc>("reviews");
}

export async function getBlogPostsCollection(): Promise<Collection<BlogPostDoc>> {
  const db = await getDatabase();
  await ensureAdminIndexes(db);
  return db.collection<BlogPostDoc>("blog_posts");
}
