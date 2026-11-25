import { z } from "zod";
import { CAMPUS_OPTIONS, LEAD_STATUSES } from "./types";

export const createLeadSchema = z.object({
  name: z.string().trim().min(2, "Name is required").max(120),
  phone: z.string().trim().min(7, "Valid phone number is required").max(30),
  email: z.string().trim().max(160).optional().default(""),
  course: z.string().trim().max(120).optional().default(""),
  campus: z.string().trim().max(120).optional().default("Vijay Nagar"),
  background: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1500).optional().default(""),
  page: z.string().trim().max(300).optional().default(""),
  status: z.enum(LEAD_STATUSES).optional().default("new"),
  notes: z.string().trim().max(2000).optional().default(""),
  assignedTo: z.string().trim().max(80).optional().default(""),
});

export const updateLeadSchema = z.object({
  status: z.enum(LEAD_STATUSES).optional(),
  notes: z.string().trim().max(2000).optional(),
  assignedTo: z.string().trim().max(80).optional(),
  campus: z.string().trim().max(120).optional(),
  course: z.string().trim().max(120).optional(),
});

export const reviewSchema = z.object({
  studentName: z.string().trim().min(2, "Student name is required").max(120),
  campus: z.enum(CAMPUS_OPTIONS),
  course: z.string().trim().min(2, "Course is required").max(120),
  role: z.string().trim().max(120).optional().default(""),
  company: z.string().trim().max(120).optional().default(""),
  rating: z.coerce.number().int().min(1).max(5).default(5),
  quote: z.string().trim().min(10, "Review quote must be at least 10 characters").max(1200),
  approved: z.boolean().optional().default(false),
  featured: z.boolean().optional().default(false),
});

export const updateReviewSchema = reviewSchema.partial();

/** Existing static SEO blog slugs that must never be shadowed or overwritten. */
export const STATIC_BLOG_SLUGS = new Set([
  "best-computer-courses-in-indore-in-2026",
  "data-analytics-roadmap-for-beginners-2026",
  "top-digital-marketing-careers",
  "best-programming-languages-to-learn",
  "top-10-excel-formulas-functions",
]);

export function slugifyBlogTitle(raw: string): string {
  return raw
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 90);
}

export function estimateReadingTime(content: string): string {
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  const mins = Math.max(2, Math.ceil(words / 200));
  return `${mins} min read`;
}

export const blogPostSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(3, "URL slug must be at least 3 characters")
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug may only contain lowercase letters, numbers, and hyphens"),
  title: z.string().trim().min(5, "Article title is required").max(160),
  metaTitle: z.string().trim().max(160).optional().default(""),
  metaDescription: z.string().trim().max(320).optional().default(""),
  category: z.string().trim().min(2).max(60).default("Career Guide"),
  author: z.string().trim().max(80).optional().default("The Prime Step Faculty"),
  readingTime: z.string().trim().max(30).optional().default(""),
  excerpt: z.string().trim().min(20, "Excerpt must be at least 20 characters").max(400),
  content: z.string().trim().min(60, "Article body must be at least 60 characters").max(50000),
  published: z.boolean().optional().default(false),
});

export const updateBlogPostSchema = blogPostSchema.partial();

/** Neutralizes Excel/Sheets CSV formula injection and escapes quotes cleanly. */
export function escapeCsvCell(value: unknown): string {
  const raw = String(value ?? "");
  const safe = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}

/** Normalizes a campus string (e.g. "Vijay Nagar (Shagun Tower)") to canonical branch name. */
export function normalizeCampusLabel(raw: string): string {
  const lower = raw.toLowerCase();
  if (lower.includes("bhawar")) return "Bhawarkua";
  if (lower.includes("anna")) return "Annapurna";
  if (lower.includes("vijay")) return "Vijay Nagar";
  return raw.trim() || "Vijay Nagar";
}

/** Builds a safe wa.me link with a pre-filled counselor follow-up message. */
export function buildWhatsAppFollowUpUrl(
  phone: string,
  studentName: string,
  course: string,
  campus: string,
): string {
  const digits = phone.replace(/\D/g, "");
  const normalized =
    digits.length === 10 ? `91${digits}` : digits.startsWith("91") ? digits : digits;
  const text = `Hi ${studentName}, this is the Admissions Counselor from The Prime Step (${campus || "Indore"}). Thank you for inquiring about ${course || "our IT courses"}. When would be a good time for your free lab demo session?`;
  return `https://wa.me/${normalized}?text=${encodeURIComponent(text)}`;
}
