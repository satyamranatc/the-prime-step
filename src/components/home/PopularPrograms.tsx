import Link from "next/link";
import { ALL_CATALOG_COURSES } from "@/lib/seoPages";
import { Reveal } from "@/components/ui/Motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

function GlowCardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl border border-brand/20 p-1 ${className}`}>
      <GlowingEffect
        spread={44}
        glow
        disabled={false}
        proximity={72}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative h-full w-full overflow-hidden rounded-[13px]">
        {children}
      </div>
    </div>
  );
}

export default function PopularPrograms() {
  return (
    <section
      id="flagship"
      aria-labelledby="flagship-title"
      className="relative overflow-hidden border-t border-hairline bg-paper py-20 md:py-28"
    >
      {/* Soft ambient teal/warm bloom behind the mosaic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 35% 50%, rgba(34,166,159,0.14), transparent 60%), radial-gradient(ellipse at 70% 55%, rgba(255,158,82,0.11), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-xl">
          <h2
            id="flagship-title"
            className="display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold text-ink"
          >
            The Prime Step
            <br />
            Curriculum Engine
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Every career track connects core fundamentals, real lab builds, and interview preparation into one structured pathway.
          </p>
        </Reveal>

        {/* Asymmetric Dark Obsidian Mosaic powered by official Aceternity GlowingEffect */}
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <GlowCardShell className="md:col-span-4">
            <Link
              href="/java-full-stack-developer"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  Enterprise Backend
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  Java Full Stack
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Core Java, Spring Boot, Microservices, Hibernate &amp; React.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Explore Syllabus</span>
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-3">
            <Link
              href="/mern-stack-developer-course"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  Web Engineering
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  MERN Stack
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  MongoDB, Express, React, Node.js &amp; Next.js production apps.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Syllabus →</span>
              </span>
            </Link>
          </GlowCardShell>

          {/* Signature Circular Obsidian Disc */}
          <Link
            href="/courses"
            className="group relative flex min-h-[200px] items-center justify-center md:col-span-2"
            aria-label={`View all ${ALL_CATALOG_COURSES.length} career courses`}
          >
            <div className="huly-dark-card relative flex size-44 flex-col items-center justify-center rounded-full text-center text-white transition-transform duration-300 group-hover:scale-[1.03]">
              <span className="display text-5xl font-extrabold tracking-tight text-white">
                {ALL_CATALOG_COURSES.length}
              </span>
              <span className="mt-1 font-mono text-[11px] uppercase tracking-widest text-white/70">
                Programs
              </span>
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full border border-white/25 bg-[#071618] text-sm font-bold text-white transition-colors group-hover:border-[#5eead4] group-hover:text-[#5eead4]"
              >
                +
              </span>
            </div>
          </Link>

          <GlowCardShell className="md:col-span-3">
            <Link
              href="/python-programming-classes"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  Automation &amp; AI
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  Python &amp; Applied AI
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Python, Django, FastAPI, Machine Learning &amp; GenAI tools.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Syllabus →</span>
              </span>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-3">
            <Link
              href="/data-analytics-course-in-indore"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  BI &amp; Insights
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  Data Analytics &amp; Power BI
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  SQL, Power BI DAX dashboards, Advanced Excel &amp; Python EDA.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Syllabus →</span>
              </span>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-5">
            <Link
              href="/roadmap/java"
              className="huly-dark-card group relative flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-6 text-white"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 75% at 50% 100%, rgba(20,184,166,0.45), transparent 75%)",
                }}
              />
              <div className="relative z-10">
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  Interactive 3D Experience
                </span>
                <h3 className="display mt-2 text-2xl text-white group-hover:text-[#5eead4]">
                  Drive through any syllabus in 3D.
                </h3>
                <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/70">
                  Explore week-by-week milestones, projects, and tools across 14 interactive 3D course roadmaps.
                </p>
              </div>
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/12 pt-3.5 font-mono text-xs font-semibold text-[#5eead4]">
                <span>Launch 3D Career Roadmap</span>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-4">
            <Link
              href="/devops-and-cloud-computing-course"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  Cloud &amp; Operations
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  DevOps, AWS &amp; Career Skills
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Linux, Docker, Kubernetes, CI/CD pipelines — plus Tally + GST, Digital Marketing &amp; Spoken English tracks.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Explore Cloud Track →</span>
              </span>
            </Link>
          </GlowCardShell>
        </div>
      </div>
    </section>
  );
}
