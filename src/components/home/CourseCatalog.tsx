import Link from "next/link";
import { ALL_CATALOG_COURSES } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Motion";
import CourseGrid from "./CourseGrid";

export default function CourseCatalog() {
  return (
    <section
      id="courses"
      aria-labelledby="courses-title"
      className="bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-6 border-b border-hairline pb-8 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Chapter n="01" title="Academic Programs" />
            <h2
              id="courses-title"
              className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink"
            >
              Structured courses for every stage of your tech career.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Filter by track or search by technology. Every course is taught hands-on in our Indore computer labs with project milestones.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 self-start rounded-full border border-hairline bg-canvas px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand md:self-auto"
          >
            <span>Full Course Directory</span>
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <CourseGrid courses={ALL_CATALOG_COURSES} />
      </div>
    </section>
  );
}
