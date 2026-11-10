import type { Metadata } from "next";
import Link from "next/link";
import { FAQS, SITE } from "@/lib/content";
import { ALL_CATALOG_COURSES, buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import Split from "@/components/ui/Split";
import PageShell from "@/components/pages/PageShell";

const pageTitle = "IT & Computer Courses in Indore — Interactive 3D Car Roadmaps & Full Catalog";
const pageDescription =
  "Explore all 14 practical IT, programming, data science, AI, and business skill courses at The Prime Step Indore. Click any course card to drive through its 3D Car Roadmap covering syllabus overview, 1-on-1 personal lab training, and placement support.";

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

const CATEGORIES = [
  { id: "Full Stack & Web", label: "01 · Full Stack, Web & Cloud" },
  { id: "Data & AI", label: "02 · Data Science, Analytics & AI" },
  { id: "Programming & Core", label: "03 · Core Programming & DSA" },
  { id: "Mobile & Business", label: "04 · Mobile Apps, Business & Communication" },
] as const;

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

      {/* 1. Editorial Hero */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <p className="eyebrow text-brand" data-fade>
          14 Industry-Aligned Programs · Indore
        </p>
        <h1 className="display mt-4 max-w-4xl text-[11vw] text-deep sm:text-[7.2vw] md:text-[5.2vw] leading-[0.95]">
          <Split text="Every course we teach.|*Taught* *by* *building.*" as="span" />
        </h1>
        <p
          className="mt-6 max-w-2xl text-base md:text-xl leading-relaxed text-deep/80"
          data-fade
        >
          Select any program below to launch its interactive <strong>3D Car Roadmap</strong> — a clear visual walkthrough of the syllabus, live projects, 1-on-1 lab training, and placement support.
        </p>

        {/* Quick Category Jump Pills */}
        <div className="mt-10 flex flex-wrap items-center gap-2.5" data-fade>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
              className="rounded-full border border-deep/15 bg-soft/70 px-4 py-2 text-xs font-semibold text-deep transition-all duration-300 hover:border-brand hover:bg-paper hover:text-brand"
            >
              {cat.label}
            </a>
          ))}
        </div>
      </section>

      {/* 2. Structured Course Directory by Track */}
      <section id="catalog" className="border-t border-pale/60 bg-soft/60 py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10 space-y-24">
          {CATEGORIES.map((cat) => {
            const items = ALL_CATALOG_COURSES.filter((c) => c.category === cat.id);
            const sectionId = cat.id.toLowerCase().replace(/[^a-z0-9]+/g, "-");
            return (
              <div key={cat.id} id={sectionId} className="scroll-mt-28">
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-deep/15 pb-5">
                  <h2 className="display text-3xl md:text-5xl text-deep">{cat.label}</h2>
                  <span className="eyebrow text-brand">{items.length} Programs</span>
                </div>

                <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {items.map((course) => {
                    const roadmapUrl = `/roadmap/${course.roadmapId}`;
                    return (
                      <article
                        key={course.title}
                        data-fade
                        className="group flex flex-col justify-between rounded-3xl border border-pale/90 bg-paper p-7 md:p-8 transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:border-brand hover:shadow-lg"
                      >
                        <div>
                          <div className="flex items-center justify-between gap-2">
                            <span className="eyebrow text-brand">{course.duration}</span>
                            <span className="rounded-full bg-soft px-3 py-1 font-mono text-[11px] text-deep/75">
                              {course.level}
                            </span>
                          </div>

                          <h3 className="display mt-4 text-2xl md:text-3xl text-deep transition-colors group-hover:text-brand">
                            <Link href={course.href}>{course.title}</Link>
                          </h3>

                          <p className="mt-3 text-sm md:text-base leading-relaxed text-deep/80">
                            {course.description}
                          </p>
                        </div>

                        <div className="mt-7 pt-5 border-t border-pale/60">
                          <ul className="flex flex-wrap gap-1.5 mb-6">
                            {course.tags.slice(0, 4).map((t) => (
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
                              href={course.href}
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
            );
          })}
        </div>
      </section>

      {/* 3. Concise Admission FAQs */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Admission Essentials" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2 className="display max-w-2xl text-4xl md:text-6xl text-deep">
              Common <span className="text-brand">questions.</span>
            </h2>
            <CTA
              href={`${SITE.whatsappHref}?text=${encodeURIComponent("Hi The Prime Step! I would like to talk to a career counselor about your courses.")}`}
              label="Talk to a Career Counselor"
              variant="ghost"
            />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {FAQS.slice(0, 4).map((faq) => (
              <div
                key={faq.q}
                data-fade
                className="rounded-2xl border border-pale/80 bg-soft/45 p-7"
              >
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
