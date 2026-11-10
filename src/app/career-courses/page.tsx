import type { Metadata } from "next";
import Link from "next/link";
import { CAREER_STAGES, ROLES, SITE } from "@/lib/content";
import { ALL_CATALOG_COURSES, buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import Split from "@/components/ui/Split";
import PageShell from "@/components/pages/PageShell";

const pageTitle = "Career Courses & Job-Oriented IT Programs in Indore | The Prime Step";
const pageDescription =
  "Launch your software, data, or digital career with job-oriented Career Courses at The Prime Step Indore. Practical training in Java Full Stack, MERN Stack, Python, Data Analytics & AI with portfolio building, mock interviews, and placement support.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Career courses in Indore",
    "Job oriented IT courses Indore",
    "Placement guaranteed computer courses Indore",
    "Software developer career track Indore",
    "Career switch to IT non-tech Indore",
    "The Prime Step placement courses",
  ],
  alternates: {
    canonical: `${SITE.url}/career-courses`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE.url}/career-courses`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

const ROLE_ROADMAP_LINKS: Record<string, { roadmap: string; page: string }> = {
  "Web Developer": { roadmap: "/roadmap/mern", page: "/mern-stack-developer-course" },
  "Software Developer": { roadmap: "/roadmap/java", page: "/java-full-stack-developer" },
  "Data Analyst": { roadmap: "/roadmap/data-analytics", page: "/data-analytics-course-in-indore" },
  "AI / ML Engineer": { roadmap: "/roadmap/ai-ml", page: "/artificial-intelligence-and-machine-learning-course" },
  "Mobile App Developer": { roadmap: "/roadmap/flutter-android", page: "/android-app-development" },
};

export default function CareerCoursesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Career Courses", path: "/career-courses" },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const flagshipTracks = ALL_CATALOG_COURSES.filter((c) => c.featured);

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Focused Hero */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <p className="eyebrow text-brand" data-fade>
          Placement-Focused Career Tracks · Indore
        </p>
        <h1 className="display mt-4 max-w-4xl text-[11vw] text-deep sm:text-[7.2vw] md:text-[5.2vw] leading-[0.95]">
          <Split text="Built around real|*hiring* *roles.*" as="span" />
        </h1>
        <p
          className="mt-6 max-w-2xl text-base md:text-xl leading-relaxed text-deep/80"
          data-fade
        >
          Companies hire people who can build working systems and explain their logic clearly. Every Career Course combines practical lab projects, 1-on-1 personal training, and dedicated placement preparation.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4" data-fade>
          <CTA href="#career-tracks" label="Explore Flagship Tracks" />
          <CTA
            href={`${SITE.whatsappHref}?text=${encodeURIComponent("Hi The Prime Step! I want to talk to a career counselor about your placement-focused Career Courses.")}`}
            label="Talk to a Career Counselor"
            variant="ghost"
          />
        </div>
      </section>

      {/* 2. Flagship Career Tracks */}
      <section id="career-tracks" className="border-t border-pale/60 bg-soft/60 py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Flagship Career Programs" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display max-w-2xl text-4xl md:text-6xl text-deep">
              Seven high-growth <span className="text-brand">career tracks.</span>
            </h2>
            <Link
              href="/courses"
              className="eyebrow text-brand hover:underline"
            >
              View All 14 Courses →
            </Link>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {flagshipTracks.map((c) => {
              const roadmapUrl = `/roadmap/${c.roadmapId}`;
              return (
                <article
                  key={c.title}
                  data-fade
                  className="group flex flex-col justify-between rounded-3xl border border-pale/90 bg-paper p-7 md:p-8 transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:border-brand hover:shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="eyebrow text-brand">{c.duration}</span>
                      <span className="rounded-full bg-soft px-3 py-1 font-mono text-[11px] text-deep/75">
                        {c.level}
                      </span>
                    </div>

                    <h3 className="display mt-4 text-2xl md:text-3xl text-deep transition-colors group-hover:text-brand">
                      <Link href={c.href}>{c.title}</Link>
                    </h3>

                    <p className="mt-3 text-sm md:text-base leading-relaxed text-deep/80">
                      {c.description}
                    </p>
                  </div>

                  <div className="mt-7 pt-5 border-t border-pale/60">
                    <ul className="flex flex-wrap gap-1.5 mb-6">
                      {c.tags.slice(0, 4).map((t) => (
                        <li
                          key={t}
                          className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-deep/85"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>

                    <div className="flex items-center justify-between gap-3">
                      <Link
                        href={c.href}
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-deep px-5 py-2.5 text-xs md:text-sm font-semibold text-paper transition-colors duration-300 group-hover:bg-brand"
                      >
                        <span>View Syllabus &amp; Details</span>
                        <span className="transition-transform duration-300 group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                      <Link
                        href={roadmapUrl}
                        className="inline-flex items-center gap-1 rounded-full border border-deep/20 px-4 py-2.5 text-xs font-semibold text-deep transition-colors hover:border-brand hover:text-brand"
                      >
                        <span>Explore in 3D</span>
                        <span>↗</span>
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Target Roles — Minimal Editorial List (Matches Homepage Chapter 05) */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Target Job Roles" />
          <h2 className="display mt-6 max-w-3xl text-4xl md:text-6xl text-deep">
            What role are you <span className="text-brand">preparing for?</span>
          </h2>

          <div className="mt-12 divide-y divide-deep/20 border-y border-deep/20">
            {ROLES.map((r, i) => {
              const links = ROLE_ROADMAP_LINKS[r.role] ?? {
                roadmap: "/roadmap/java",
                page: "/courses",
              };
              return (
                <div
                  key={r.role}
                  data-fade
                  className="grid items-center gap-4 py-7 md:grid-cols-[70px_1fr_1.2fr_auto] md:gap-8"
                >
                  <span className="eyebrow text-brand">0{i + 1}</span>
                  <div>
                    <h3 className="display text-2xl md:text-4xl text-deep">{r.role}</h3>
                    <p className="eyebrow mt-1 text-deep/60">{r.from}</p>
                  </div>
                  <p className="text-sm md:text-base leading-relaxed text-deep/80">
                    {r.what} <span className="text-deep/60">{r.day}</span>
                  </p>
                  <div className="flex items-center gap-2.5">
                    <Link
                      href={links.roadmap}
                      className="rounded-full bg-soft px-4 py-2 text-xs font-semibold text-deep transition-colors hover:bg-brand hover:text-white"
                    >
                      3D Roadmap →
                    </Link>
                    <Link
                      href={links.page}
                      className="rounded-full border border-deep/20 px-3.5 py-2 text-xs font-semibold text-deep transition-colors hover:border-brand hover:text-brand"
                    >
                      Details ↗
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. 4-Stage Placement Readiness */}
      <section className="bg-soft/60 py-20 md:py-28 border-t border-pale/60">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="03" title="Placement Cell & Readiness" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="display text-4xl md:text-6xl text-deep">
                From classroom lab to <span className="text-brand">offer letter.</span>
              </h2>
              <ol className="mt-10 divide-y divide-deep/20 border-y border-deep/20">
                {CAREER_STAGES.map((s) => (
                  <li key={s.n} className="flex items-baseline gap-6 py-5">
                    <span className="eyebrow text-brand">{s.n}</span>
                    <span className="display text-2xl md:text-4xl text-deep">{s.t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-pale bg-paper p-8 md:p-10 shadow-xs">
              <p className="eyebrow text-brand">2-Day Free Demo · 0% EMI</p>
              <h3 className="display mt-3 text-3xl text-deep">
                Experience a live lab class first.
              </h3>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                Visit our Vijay Nagar, Bhawarkua, or Annapurna campus, sit with our mentors, and test our practical teaching style before enrolling.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTA
                  href={`${SITE.whatsappHref}?text=${encodeURIComponent("Hi The Prime Step! I want to book a free 2-day demo class.")}`}
                  label="WhatsApp Counselor"
                />
                <CTA href={SITE.phoneHref} label={`Call ${SITE.phoneDisplay}`} variant="ghost" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
