import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { COURSE_PAGES } from "@/lib/seoPages";
import CourseDetailTemplate from "@/components/pages/CourseDetailTemplate";

const course = COURSE_PAGES["english-courses"];

export const metadata: Metadata = {
  title: course.metaTitle,
  description: course.metaDescription,
  keywords: course.keywords,
  alternates: {
    canonical: `${SITE.url}/${course.slug}`,
  },
  openGraph: {
    title: course.metaTitle,
    description: course.metaDescription,
    url: `${SITE.url}/${course.slug}`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: course.metaTitle,
    description: course.metaDescription,
  },
};

export default function EnglishCoursesPage() {
  return <CourseDetailTemplate course={course} />;
}

