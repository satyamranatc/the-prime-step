import type { Metadata } from "next";
import Link from "next/link";
import { CAREER_STAGES, PERSONAS, ROLES, SITE } from "@/lib/content";
import { ALL_CATALOG_COURSES, buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
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

const ROLE_COURSE_LINKS: Record<string, string> = {
  "Web Developer": "/mern-stack-developer-course",
  "Software Developer": "/java-full-stack-developer",
  "Data Analyst": "/data-analytics-course-in-indore",
  "AI / ML Engineer": "/artificial-intelligence-and-machine-learning-course",
  "Mobile App Developer": "/android-app-development",
};

export default function CareerCoursesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Career Courses", path: "/career-courses" },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);
  const featuredCareerTracks = ALL_CATALOG_COURSES;

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <p className="eyebrow text-brand">Job-Oriented Career Transformation</p>
        <h1 className="display mt-4 max-w-4xl text-[11.5vw] text-deep sm:text-[7.5vw] md:text-[5.4vw] leading-[0.95]">
          Career Courses built around real hiring roles.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-deep/85">
          Companies don&apos;t hire certificates — they hire people who can write clean code, solve real problems, and explain their work clearly. Every Career Course at The Prime Step is reverse-engineered from real software and data roles.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CTA href="#career-tracks" label="Explore Career Tracks" />
          <CTA href="/contact-us" label="Book Free Career Counseling" variant="ghost" />
        </div>
      </section>

      {/* 2. Target Industry Roles */}
      <section className="border-t border-pale/60 bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Target Job Roles" />
          <div className="mt-6 max-w-2xl">
            <h2 className="display text-4xl md:text-6xl text-deep">
              What role are you preparing for?
            </h2>
            <p className="mt-4 text-base md:text-lg text-deep/80">
              Understand what each tech role actually does day-to-day, and which curriculum path takes you there.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ROLES.map((r) => (
              <div
                key={r.role}
                className="flex flex-col justify-between rounded-3xl border border-pale/90 bg-paper p-7 md:p-8"
              >
                <div>
                  <span className="eyebrow text-brand">{r.from}</span>
                  <h3 className="display mt-3 text-3xl text-deep">{r.role}</h3>
                  <p className="mt-3 text-base font-medium text-deep/90">{r.what}</p>
                  <div className="mt-5 border-t border-pale/70 pt-4">
                    <span className="text-xs font-mono uppercase tracking-wider text-deep/60">
                      On the job:
                    </span>
                    <p className="mt-1 text-sm leading-relaxed text-deep/80">{r.day}</p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-pale/50">
                  <Link
                    href={ROLE_COURSE_LINKS[r.role] || "/courses"}
                    className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                  >
                    <span>Explore {r.role} Track</span>
                    <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Flagship Career Courses */}
      <section id="career-tracks" className="bg-paper py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Flagship Career Tracks" />
          <h2 className="display mt-6 max-w-3xl text-4xl md:text-6xl text-deep">
            Dedicated placement-focused programs.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredCareerTracks.map((c) => (
              <article
                key={c.title}
                className="flex flex-col justify-between rounded-3xl border border-pale bg-soft/75 p-7 md:p-8 transition-colors hover:border-brand"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-brand">{c.duration}</span>
                    <span className="text-xs font-mono text-deep/70">{c.level}</span>
                  </div>
                  <h3 className="display mt-3 text-2xl md:text-3xl text-deep">
                    <Link href={c.href} className="hover:text-brand transition-colors">
                      {c.title}
                    </Link>
                  </h3>
                  <p className="mt-3 text-sm md:text-base leading-relaxed text-deep/80">
                    {c.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-pale/70">
                  <ul className="flex flex-wrap gap-1.5 mb-4">
                    {c.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full bg-paper px-3 py-1 text-xs text-deep border border-pale/70"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link
                    href={c.href}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-deep"
                  >
                    <span>Explore Full Syllabus</span>
                    <span>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Pathways by Background (Personas) */}
      <section className="bg-deep py-20 text-paper md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="03" title="Who Can Join" dark />
          <h2 className="display mt-6 max-w-3xl text-4xl md:text-6xl text-paper">
            Tailored for your current stage.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PERSONAS.map((p) => (
              <div
                key={p.id}
                className="rounded-3xl border border-pale/25 bg-paper/5 p-7 md:p-9"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="eyebrow text-pale">{p.label}</span>
                  <span className="rounded-full bg-brand/30 px-3 py-1 text-xs text-pale">
                    {p.hindi}
                  </span>
                </div>
                <h3 className="display mt-4 text-2xl md:text-4xl text-paper">
                  {p.headline}
                </h3>
                <p className="mt-3 text-sm md:text-base leading-relaxed text-pale/85">
                  {p.sub}
                </p>
                <div className="mt-6 pt-5 border-t border-pale/20">
                  <p className="eyebrow text-pale/70 mb-2.5">Recommended Career Tracks:</p>
                  <ul className="flex flex-wrap gap-2">
                    {p.recommended.map((rec) => (
                      <li
                        key={rec}
                        className="rounded-full border border-pale/30 bg-paper/10 px-3.5 py-1 text-xs font-medium text-paper"
                      >
                        {rec}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. 4-Stage Placement Readiness */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="04" title="Placement Cell & Readiness" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="display text-4xl md:text-6xl text-deep">
                How we prepare you for interviews.
              </h2>
              <ol className="mt-10 divide-y divide-pale">
                {CAREER_STAGES.map((s) => (
                  <li key={s.n} className="flex items-baseline gap-6 py-6">
                    <span className="eyebrow text-brand">{s.n}</span>
                    <span className="display text-2xl md:text-4xl text-deep">{s.t}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="rounded-3xl border border-pale bg-soft p-8 md:p-10">
              <p className="eyebrow text-brand">0% Interest Installments</p>
              <h3 className="display mt-3 text-3xl text-deep">
                Start with a Free 2-Day Demo Class.
              </h3>
              <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                Sit in our Vijay Nagar, Bhawarkua, or Annapurna labs, meet your faculty, and experience how we teach before making a commitment.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <CTA href="/contact-us" label="Schedule Free Demo" />
                <CTA href={SITE.phoneHref} label={`Call ${SITE.phoneDisplay}`} variant="ghost" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

