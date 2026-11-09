import { Suspense } from "react";
import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import RoadmapClient from "@/components/roadmap/RoadmapClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = ROADMAP_COURSES[courseId] || ROADMAP_COURSES["mern"];
  const pageUrl = `${SITE.url}/roadmap/${courseId}`;
  const pageTitle = `${course.title} 3D Syllabus Roadmap | The Prime Step`;
  const pageDesc = `Drive through the interactive 3D ${course.title} curriculum step by step. Master real-world architecture with hands-on projects at The Prime Step Indore.`;

  return {
    title: pageTitle,
    description: pageDesc,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: pageTitle,
      description: pageDesc,
      url: pageUrl,
      siteName: SITE.name,
      locale: "en_IN",
      type: "article",
      images: [
        {
          url: `${SITE.url}/brand/logo.png`,
          width: 1200,
          height: 630,
          alt: `${course.title} 3D Syllabus Roadmap — The Prime Step`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDesc,
      site: "@theprimestep",
      creator: "@theprimestep",
      images: [`${SITE.url}/brand/logo.png`],
    },
  };
}

export function generateStaticParams() {
  return Object.keys(ROADMAP_COURSES).map((id) => ({
    courseId: id,
  }));
}

export default async function RoadmapPage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = ROADMAP_COURSES[courseId] || ROADMAP_COURSES["mern"];

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Roadmaps",
        item: `${SITE.url}/roadmap`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `${course.title} Roadmap`,
        item: `${SITE.url}/roadmap/${courseId}`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <Suspense fallback={<div className="h-screen w-screen bg-paper" />}>
        <RoadmapClient courseId={courseId} />
      </Suspense>
    </>
  );
}
