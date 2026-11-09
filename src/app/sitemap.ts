import type { MetadataRoute } from "next";
import { SITE } from "@/lib/content";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE.url; // "https://www.theprimestep.com"
  const now = new Date();

  // Root Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/roadmap`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  // Dynamic Course Roadmap Pages
  Object.keys(ROADMAP_COURSES).forEach((courseId) => {
    routes.push({
      url: `${baseUrl}/roadmap/${courseId}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    });
  });

  return routes;
}
