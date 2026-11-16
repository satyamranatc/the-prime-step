import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import { COURSE_PAGES } from "@/lib/seoPages";

const STATIC_SEO_ROUTES = [
  { path: "", priority: 1.0 },
  { path: "/about-us", priority: 0.9 },
  { path: "/career-courses", priority: 0.95 },
  { path: "/contact-us", priority: 0.9 },
  { path: "/corporate-training", priority: 0.9 },
  { path: "/courses", priority: 0.95 },
  { path: "/faq", priority: 0.9 },
  { path: "/blog", priority: 0.85 },
  { path: "/blog/best-computer-courses-in-indore-in-2026", priority: 0.85 },
  { path: "/blog/data-analytics-roadmap-for-beginners-2026", priority: 0.85 },
  { path: "/blog/top-digital-marketing-careers", priority: 0.8 },
  { path: "/blog/best-programming-languages-to-learn", priority: 0.8 },
  { path: "/blog/top-10-excel-formulas-functions", priority: 0.8 },
  { path: "/vijay-nagar", priority: 0.95 },
  { path: "/bhawarkua", priority: 0.95 },
  { path: "/annapurna", priority: 0.9 },
] as const;

const normalizePath = (path: string) => {
  const clean = path.replace(/^\/+|\/+$/g, "");
  return clean ? `/${clean}` : "";
};

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url.replace(/\/+$/, "");

  const entries = [
    ...STATIC_SEO_ROUTES.map((route) => ({
      path: normalizePath(route.path),
      priority: route.priority,
    })),

    ...Object.keys(COURSE_PAGES).map((slug) => ({
      path: normalizePath(slug),
      priority: 0.95,
    })),

    ...Object.keys(ROADMAP_COURSES).map((courseId) => ({
      path: normalizePath(`/roadmap/${courseId}`),
      priority: 0.85,
    })),
  ];

  // Prevent duplicate URLs in sitemap.xml
  const uniqueEntries = new Map(
    entries.map((entry) => [entry.path, entry])
  );

  return [...uniqueEntries.values()].map((entry) => ({
    url: `${baseUrl}${entry.path}`,
    changeFrequency: "weekly",
    priority: entry.priority,
  }));
}
