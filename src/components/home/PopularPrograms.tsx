import Link from "next/link";
import { COURSE_PAGES } from "@/lib/seoPages";
import { FLAGSHIP_PROGRAMS } from "@/lib/homepage";
import Chapter from "@/components/ui/Chapter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Motion";

export default function PopularPrograms() {
  const programs = FLAGSHIP_PROGRAMS.map((item) => COURSE_PAGES[item.slug]).filter(
    Boolean,
  );

  return (
    <section
      id="flagship"
      aria-labelledby="flagship-title"
      className="border-t border-hairline bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Chapter n="03" title="Flagship Career Tracks" />
            <h2
              id="flagship-title"
              className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink"
            >
              Deep-dive engineering programs built for hiring interviews.
            </h2>
          </div>

          <Link
            href="/career-courses"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-brand underline-offset-4 hover:underline md:self-auto"
          >
            <span>Explore Career Courses</span>
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2">
          {programs.map((course, idx) => {
            const topTools = course.techCategories
              .flatMap((c) => c.items)
              .slice(0, 6);

            return (
              <StaggerItem key={course.slug}>
                <article className="spotlight-card group flex h-full flex-col justify-between rounded-2xl border border-hairline bg-canvas p-7 transition-all duration-200 hover:border-brand/50 hover:bg-paper hover:shadow-[0_18px_40px_-22px_rgba(11,18,21,0.14)] md:p-9">
                  <div>
                    <div className="flex items-center justify-between gap-3 font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
                      <span className="font-semibold text-brand">
                        Track 0{idx + 1} · {course.duration}
                      </span>
                      <span>{course.projectsCount}</span>
                    </div>

                    <h3 className="display mt-4 text-2xl text-ink transition-colors group-hover:text-brand md:text-3xl">
                      <Link href={`/${course.slug}`}>{course.title}</Link>
                    </h3>

                    <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-[15px]">
                      {course.heroSubtitle}
                    </p>

                    <div className="mt-6 flex flex-wrap gap-1.5">
                      {topTools.map((tool) => (
                        <span
                          key={tool}
                          className="rounded-md border border-hairline bg-paper px-2.5 py-1 font-mono text-[11px] font-medium text-ink-muted"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-hairline pt-5">
                    <Link
                      href={`/${course.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-ink transition-colors hover:text-brand"
                    >
                      <span>View Complete Syllabus</span>
                      <span
                        aria-hidden="true"
                        className="transition-transform duration-200 group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>

                    {course.roadmapId && (
                      <Link
                        href={`/roadmap/${course.roadmapId}`}
                        className="rounded-full border border-hairline bg-paper px-3.5 py-1.5 font-mono text-[11px] font-semibold text-ink-muted transition-colors hover:border-brand hover:text-brand"
                      >
                        Launch 3D Roadmap ↗
                      </Link>
                    )}
                  </div>
                </article>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
