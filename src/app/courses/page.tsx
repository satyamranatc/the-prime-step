import type { Metadata } from "next";
import Link from "next/link";
import { DISCIPLINES, FAQS, SITE } from "@/lib/content";
import { ALL_CATALOG_COURSES, buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import Glyph from "@/components/ui/Glyph";
import PageShell from "@/components/pages/PageShell";

const pageTitle = "IT & Computer Courses in Indore — Java, Python, MERN, Data Science & AI";
const pageDescription =
  "Explore all practical IT, programming, data science, and business skill courses at The Prime Step Indore. 100% hands-on lab training in Java Full Stack, MERN Stack, Python, Data Analytics, AI/ML, Spoken English & Tally GST across Vijay Nagar, Bhawarkua & Annapurna.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "IT courses in Indore",
    "Computer courses in Vijay Nagar Indore",
    "Best coding classes in Indore",
    "Full stack developer courses Indore",
    "Data Analytics and Python courses Indore",
    "The Prime Step courses list",
  ],
  alternates: {
    canonical: `${SITE.url}/courses`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE.url}/courses`,
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

const DISCIPLINE_LINKS: Record<string, string> = {
  python: "/python-programming-classes",
  java: "/java-full-stack-developer",
  fullstack: "/mern-stack-developer-course",
  data: "/data-analytics-course-in-indore",
  ai: "/artificial-intelligence-and-machine-learning-course",
  mobile: "/android-app-development",
  foundations: "/c-and-cpp-programming-classes",
  office: "/tally-gst-mastery-course",
};

export default function CoursesPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd(breadcrumbs),
      {
        "@type": "ItemList",
        name: "Courses at The Prime Step Indore",
        itemListElement: ALL_CATALOG_COURSES.map((c, idx) => ({
          "@type": "ListItem",
          position: idx + 1,
          name: c.title,
          description: c.description,
          url: `${SITE.url}${c.href}`,
        })),
      },
    ],
  };

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <p className="eyebrow text-brand">Complete Course Directory · Indore</p>
        <h1 className="display mt-4 max-w-4xl text-[11.5vw] text-deep sm:text-[7.5vw] md:text-[5.4vw] leading-[0.95]">
          Eight technology worlds. Taught by building.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-deep/85">
          Whether you are writing your very first line of code after 12th, preparing for campus placements, or switching into a high-growth IT career, every program at The Prime Step is taught hands-on in our Indore computer labs.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CTA href="#catalog" label="Browse All Courses" />
          <CTA href="/career-courses" label="Explore Career Tracks" variant="ghost" />
        </div>
      </section>

      {/* Flagship Course Spotlights */}
      <section id="catalog" className="border-t border-pale/60 bg-soft py-20 md:py-28 scroll-mt-24">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Flagship Programs & Catalog" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="display text-4xl md:text-6xl text-deep">
                Industry-aligned courses in Indore.
              </h2>
              <p className="mt-4 text-base md:text-lg text-deep/80">
                Choose a specialized program below to view module-by-module syllabi, live projects, and career outcomes.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {ALL_CATALOG_COURSES.map((course) => (
              <article
                key={course.title}
                className={`flex flex-col justify-between rounded-3xl border p-7 md:p-8 transition-all duration-300 hover:-translate-y-1 ${
                  course.featured
                    ? "border-brand/45 bg-paper shadow-sm"
                    : "border-pale/90 bg-paper/80"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="eyebrow text-brand">{course.category}</span>
                    <span className="rounded-full bg-soft px-3 py-1 font-mono text-[11px] text-deep/80">
                      {course.duration}
                    </span>
                  </div>
                  <h3 className="display mt-4 text-2xl md:text-3xl text-deep">
                    <Link href={course.href} className="hover:text-brand transition-colors">
                      {course.title}
                    </Link>
                  </h3>
                  <p className="mt-1 text-xs font-mono text-deep/65">{course.level}</p>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                    {course.description}
                  </p>
                </div>

                <div className="mt-6 pt-5 border-t border-pale/60">
                  <ul className="flex flex-wrap gap-1.5 mb-5">
                    {course.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-pale bg-soft px-3 py-1 text-xs text-deep/85"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href={course.href}
                    className="group inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-deep transition-colors"
                  >
                    <span>View Curriculum &amp; Projects</span>
                    <span className="transition-transform group-hover:translate-x-1">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 8 Core Disciplines */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Eight Core Disciplines" />
          <h2 className="display mt-6 max-w-3xl text-4xl md:text-6xl text-deep">
            Plain-language foundations to enterprise mastery.
          </h2>

          <div className="mt-12 grid gap-8 md:grid-cols-2">
            {DISCIPLINES.map((d, i) => (
              <div
                key={d.id}
                className="grid items-center gap-6 rounded-3xl border border-pale/80 bg-soft p-7 md:grid-cols-[1fr_140px] md:p-9"
              >
                <div>
                  <span className="eyebrow text-brand">
                    0{i + 1} · {d.title}
                  </span>
                  <h3 className="display mt-2 text-2xl md:text-3xl text-deep">
                    {d.plain}
                  </h3>
                  <p className="mt-2 text-sm text-deep/80">{d.line}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {d.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-deep/20 bg-paper px-3 py-1 text-xs text-deep"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5">
                    <Link
                      href={DISCIPLINE_LINKS[d.id] || "/contact-us"}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
                    >
                      <span>Explore {d.title} Track</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
                <div className="mx-auto hidden aspect-square w-32 md:block">
                  <Glyph id={d.id} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive 3D Roadmaps Banner */}
      <section className="bg-deep py-20 text-paper md:py-24">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="03" title="Interactive 3D Syllabus Roadmaps" dark />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="display text-4xl md:text-6xl text-paper">
                Drive through your syllabus in 3D.
              </h2>
              <p className="mt-4 max-w-xl text-base md:text-lg text-pale leading-relaxed">
                Explore every milestone, technology stack, and capstone deliverable inside our interactive 3D roadmap experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/roadmap/mern"
                className="rounded-full bg-brand px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-paper hover:text-deep"
              >
                MERN Stack 3D Roadmap →
              </Link>
              <Link
                href="/roadmap/java"
                className="rounded-full border border-pale/40 bg-paper/10 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-deep"
              >
                Java Full Stack 3D Roadmap →
              </Link>
              <Link
                href="/roadmap/python"
                className="rounded-full border border-pale/40 bg-paper/10 px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-paper hover:text-deep"
              >
                Python &amp; AI 3D Roadmap →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="04" title="Course & Admission FAQs" />
          <h2 className="display mt-4 text-3xl md:text-5xl text-deep">
            Questions before choosing a course.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-pale bg-soft/60 p-6 md:p-7">
                <h3 className="text-base md:text-lg font-semibold text-deep">{faq.q}</h3>
                <p className="mt-2.5 text-sm md:text-base leading-relaxed text-deep/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

