/**
 * Homepage-only content (everything below the hero).
 * Edit copy here — components read from this file, so no JSX changes are needed.
 *
 * RULE: Only publish facts the institute can prove. If a number is not verified,
 * leave it out (or leave the array empty) — the UI hides empty blocks automatically.
 */
import { ALL_CATALOG_COURSES, type CatalogCourseItem } from "./seoPages";
import type { GlyphId } from "./content";

/* ------------------------------------------------------------------ */
/* Google rating                                                      */
/* ------------------------------------------------------------------ */

/**
 * Source: Google knowledge panel for "The Prime Step" (4.9★, 1,081 reviews, seen Nov 2026).
 * "1,000+" is a safe lower bound. Update if the owner confirms a combined multi-branch count.
 */
export const GOOGLE_RATING = {
  rating: "4.9",
  countLabel: "1,000+ Google reviews",
  reviewsUrl: "https://www.google.com/search?q=The+Prime+Step+Indore+reviews",
} as const;

/* ------------------------------------------------------------------ */
/* Trust strip (directly below hero)                                  */
/* ------------------------------------------------------------------ */

export const TRUST_ITEMS = [
  { value: "4.9★", label: "Rated on Google", note: GOOGLE_RATING.countLabel },
  { value: "2019", label: "Teaching since", note: "Practical IT training in Indore" },
  { value: "3", label: "Campuses in Indore", note: "Vijay Nagar · Bhawarkua · Annapurna" },
  { value: String(ALL_CATALOG_COURSES.length), label: "Career courses", note: "Coding, data, office & English" },
  // TODO(owner): add "Students trained" ONLY with a verified figure, e.g.
  // { value: "5,000+", label: "Students trained", note: "Since 2019" },
] as const;

/* ------------------------------------------------------------------ */
/* Course catalogue                                                   */
/* ------------------------------------------------------------------ */

export type CourseFilterId = "all" | CatalogCourseItem["category"];

export const COURSE_FILTERS: { id: CourseFilterId; label: string }[] = [
  { id: "all", label: "All courses" },
  { id: "Full Stack & Web", label: "Web & Full Stack" },
  { id: "Data & AI", label: "Data & AI" },
  { id: "Programming & Core", label: "Programming" },
  { id: "Mobile & Business", label: "Apps, Office & English" },
];

/** Friendly category names shown on each card. */
export const CATEGORY_LABEL: Record<CatalogCourseItem["category"], string> = {
  "Full Stack & Web": "Web & Full Stack",
  "Data & AI": "Data & AI",
  "Programming & Core": "Programming",
  "Mobile & Business": "Apps, Office & English",
};

/* ------------------------------------------------------------------ */
/* Flagship programs (deep-dive cards)                                */
/* ------------------------------------------------------------------ */

/** Slugs from COURSE_PAGES. Order = display order. */
export const FLAGSHIP_PROGRAMS: { slug: string; glyph: GlyphId }[] = [
  { slug: "java-full-stack-developer", glyph: "java" },
  { slug: "mern-stack-developer-course", glyph: "fullstack" },
  { slug: "python-programming-classes", glyph: "python" },
  { slug: "data-analytics-course-in-indore", glyph: "data" },
];

/* ------------------------------------------------------------------ */
/* Why choose us                                                      */
/* ------------------------------------------------------------------ */

export const WHY_US = [
  {
    title: "Learn by doing, every class",
    text: "Each topic is practised on a computer in our labs — not just explained on a board.",
  },
  {
    title: "Mentors who clear every doubt",
    text: "Trainers sit beside you to fix errors and explain why they happened, one-to-one.",
  },
  {
    title: "Real projects in every course",
    text: "You finish with working projects you can show in interviews, not only notes.",
  },
  {
    title: "Course content built for jobs",
    text: "Syllabus follows the tools companies actually ask for — from Excel to React and Spring Boot.",
  },
  {
    title: "Placement assistance",
    text: "Resume, LinkedIn, mock technical and HR interviews, and help connecting with recruiters.",
  },
  {
    title: "Flexible batches, 3 campuses",
    text: "Batches from 8 AM to 8 PM at Vijay Nagar, Bhawarkua and Annapurna, with a free demo class.",
  },
] as const;

/* ------------------------------------------------------------------ */
/* Training & placement                                               */
/* ------------------------------------------------------------------ */

export const PLACEMENT_STEPS = [
  {
    n: "01",
    title: "Resume & LinkedIn",
    text: "We help you write a clear resume and a LinkedIn profile recruiters can find.",
  },
  {
    n: "02",
    title: "Portfolio of projects",
    text: "Your course projects go on GitHub so employers can see your actual work.",
  },
  {
    n: "03",
    title: "Mock interviews",
    text: "Practice technical and HR rounds with trainers before the real interview.",
  },
  {
    n: "04",
    title: "Placement assistance",
    text: "Guidance on openings and help connecting with hiring companies.",
  },
] as const;

/**
 * Real placement proof (company names, logos, placed-student records).
 * TODO(owner): add verified entries. Section stays hidden while empty.
 */
export const HIRING_PARTNERS: { name: string; logo?: string }[] = [];

/* ------------------------------------------------------------------ */
/* Student testimonials                                               */
/* ------------------------------------------------------------------ */

/**
 * TODO(owner): add ONLY real testimonials with the student's written permission
 * (ideally copied from Google reviews). Section stays hidden while empty.
 */
export const TESTIMONIALS: {
  name: string;
  course: string;
  quote: string;
  source: "Google review" | "Written feedback";
}[] = [];
