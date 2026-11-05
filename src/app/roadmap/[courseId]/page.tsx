import { Suspense } from "react";
import type { Metadata } from "next";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import RoadmapClient from "@/components/roadmap/RoadmapClient";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ courseId: string }>;
}): Promise<Metadata> {
  const { courseId } = await params;
  const course = ROADMAP_COURSES[courseId] || ROADMAP_COURSES["mern"];

  return {
    title: `${course.title} 3D Roadmap | The Prime Step Institute`,
    description: `Drive through the ${course.title} syllabus roadmap step by step. Learn by building with The Prime Step Indore.`,
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
  return (
    <Suspense fallback={<div className="h-screen w-screen bg-paper" />}>
      <RoadmapClient courseId={courseId} />
    </Suspense>
  );
}
