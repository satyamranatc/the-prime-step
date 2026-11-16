import Link from "next/link";
import { ALL_CATALOG_COURSES } from "@/lib/seoPages";
import { ROADMAP_COURSES } from "@/lib/roadmapCourses";
import { SITE } from "@/lib/content";
import { CATEGORY_LABEL } from "@/lib/homepage";
import SectionHeading from "./SectionHeading";
import CourseGrid, { type HomeCourse } from "./CourseGrid";

/** Chapter: every course the institute teaches, visible and crawlable on first paint. */
export default function CourseCatalog() {
  const courses: HomeCourse[] = ALL_CATALOG_COURSES.map((c) => ({
    title: c.title,
    category: c.category,
    categoryLabel: CATEGORY_LABEL[c.category],
    duration: c.duration,
    level: c.level,
    description: c.description,
    tags: c.tags.slice(0, 3),
    href: c.href,
    roadmapHref: c.roadmapId in ROADMAP_COURSES ? `/roadmap/${c.roadmapId}` : null,
    whatsappHref: `${SITE.whatsappHref}?text=${encodeURIComponent(
      `Hi The Prime Step! I'd like details about the ${c.title} (fees, batch timings and demo class).`,
    )}`,
  }));

  return (
    <section
      id="programs"
      aria-labelledby="programs-title"
      className="relative scroll-mt-20 bg-paper py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="programs-title"
            eyebrow={`Courses · ${courses.length} programs`}
            title={
              <>
                Computer courses in Indore, <span className="text-brand">built around real jobs.</span>
              </>
            }
            lead="Pick a course to see the full syllabus, duration and projects. Every program starts from the basics — no prior coding needed."
          />
          <Link
            href="/courses"
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-brand hover:text-deep md:inline-flex"
          >
            Full course catalogue
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <CourseGrid courses={courses} />
      </div>
    </section>
  );
}
