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
  { path: "/roadmap", priority: 0.85 },
  { path: "/faq", priority: 0.9 },
  { path: "/blog", priority: 0.85 },
  { path: "/blog/top-digital-marketing-careers", priority: 0.8 },
  { path: "/blog/best-programming-languages-to-learn", priority: 0.8 },
  { path: "/blog/top-10-excel-formulas-functions", priority: 0.8 },
  { path: "/vijay-nagar", priority: 0.95 },
  { path: "/bhawarkua", priority: 0.95 },
  { path: "/annapurna", priority: 0.9 },
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url; // "https://www.theprimestep.com"
  const now = new Date();

  const routes: MetadataRoute.Sitemap = STATIC_SEO_ROUTES.map((r) => ({
    url: `${baseUrl}${r.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: r.priority,
  }));

  // All 14 Dedicated Course Pages
  Object.keys(COURSE_PAGES).forEach((slug) => {
    routes.push({
      url: `${baseUrl}/${slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    });
  });

  // Dynamic Course Roadmap Pages
  Object.keys(ROADMAP_COURSES).forEach((courseId) => {
    routes.push({
      url: `${baseUrl}/roadmap/${courseId}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    });
  });

  return routes;
}
