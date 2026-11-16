import Link from "next/link";
import { COURSE_PAGES } from "@/lib/seoPages";
import { FLAGSHIP_PROGRAMS } from "@/lib/homepage";
import Glyph from "@/components/ui/Glyph";
import SectionHeading from "./SectionHeading";

/** Flagship career tracks — deep-dive cards with modules, projects and target roles. */
export default function PopularPrograms() {
  const tracks = FLAGSHIP_PROGRAMS.map((f) => {
    const data = COURSE_PAGES[f.slug];
    return data ? { ...data, glyph: f.glyph } : null;
  }).filter((t): t is NonNullable<typeof t> => Boolean(t));

  return (
    <section
      id="popular-programs"
      aria-labelledby="popular-programs-title"
      className="relative border-t border-pale/60 bg-soft/60 py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="popular-programs-title"
            eyebrow="Flagship career tracks"
            title={
              <>
                Popular programs <span className="text-brand">in detail.</span>
              </>
            }
            lead="A closer look at our most-requested job tracks — what you cover week by week, the projects you build, and the roles they prepare you for."
          />
          <Link
            href="/career-courses"
            className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-brand hover:text-deep md:inline-flex"
          >
            Compare all career tracks
            <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>

        <div className="mt-10 grid gap-6 md:mt-14 lg:grid-cols-2">
          {tracks.map((track, idx) => (
            <article
              key={track.slug}
              data-fade
              className="spotlight-card group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-pale/90 bg-paper p-6 transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_26px_52px_-24px_rgba(15,82,80,0.36)] sm:p-8"
            >
              <div>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="eyebrow text-brand">
                      Track 0{idx + 1} · {track.duration}
                    </span>
                    <h3 className="display mt-2 text-2xl text-deep sm:text-3xl">
                      <Link
                        href={`/${track.slug}`}
                        className="transition-colors duration-300 group-hover:text-brand hover:text-brand"
                      >
                        {track.title}
                      </Link>
                    </h3>
                  </div>
                  <div
                    aria-hidden="true"
                    className="hidden size-16 shrink-0 rounded-2xl border border-pale/70 bg-soft/70 p-2 transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:scale-105 group-hover:-rotate-3 sm:block"
                  >
                    <Glyph id={track.glyph} />
                  </div>
                </div>

                <p className="mt-3 text-sm leading-relaxed text-deep/80 sm:text-base">
                  {track.heroSubtitle}
                </p>

                {/* Modules snapshot */}
                <div className="mt-6 rounded-2xl border border-pale/70 bg-soft/50 p-4 sm:p-5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow text-deep/75">Syllabus modules</span>
                    <span className="font-mono text-xs font-semibold text-brand">
                      {track.projectsCount}
                    </span>
                  </div>
                  <ol className="mt-3 grid gap-2 sm:grid-cols-2">
                    {track.modules.slice(0, 4).map((m) => (
                      <li key={m.number} className="flex items-baseline gap-2 text-xs text-deep sm:text-[13px]">
                        <span className="font-mono text-[11px] font-semibold text-brand">
                          {m.number}
                        </span>
                        <span className="line-clamp-1 font-medium">{m.title}</span>
                      </li>
                    ))}
                  </ol>
                </div>

                {/* Career roles */}
                <div className="mt-5 flex flex-wrap items-center gap-1.5">
                  <span className="mr-1 text-xs font-semibold text-deep/70">Prepares for:</span>
                  {track.careerRoles.slice(0, 3).map((r) => (
                    <span
                      key={r.role}
                      className="rounded-full border border-deep/15 bg-paper px-3 py-1 text-xs font-medium text-deep"
                    >
                      {r.role}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-pale/80 pt-5">
                <Link
                  href={`/${track.slug}`}
                  className="group/btn press-scale inline-flex items-center gap-2 rounded-full bg-deep px-5 py-2.5 text-xs font-semibold text-paper hover:bg-brand sm:text-sm"
                >
                  <span>Full syllabus &amp; projects</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1"
                  >
                    →
                  </span>
                </Link>
                <Link
                  href={`/roadmap/${track.roadmapId}`}
                  className="group/rm press-scale inline-flex items-center gap-1.5 rounded-full border border-deep/20 px-4 py-2.5 text-xs font-semibold text-deep hover:border-brand hover:bg-soft hover:text-brand sm:text-sm"
                >
                  <span>Explore 3D roadmap</span>
                  <span
                    aria-hidden="true"
                    className="inline-block transition-transform duration-300 group-hover/rm:translate-x-0.5 group-hover/rm:-translate-y-0.5"
                  >
                    ↗
                  </span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
