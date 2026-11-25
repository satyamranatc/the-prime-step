import type { Metadata } from "next";
import { FAQS, SITE } from "@/lib/content";
import { ALL_CATALOG_COURSES, buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import CourseGrid from "@/components/home/CourseGrid";
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
      <section className="mx-auto max-w-[1320px] pt-6 pb-12 md:pt-10 md:pb-16">
        <p className="eyebrow text-brand">
          {ALL_CATALOG_COURSES.length} Industry-Aligned Programs · Indore
        </p>
        <h1 className="display mt-4 max-w-3xl text-[clamp(2.25rem,4.8vw,3.85rem)] font-bold leading-[1.06] text-ink">
          Every course we teach.{" "}
          <span className="bg-gradient-to-r from-[#0a5654] via-brand to-light bg-clip-text text-transparent">
            Taught by building.
          </span>
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
          Explore all {ALL_CATALOG_COURSES.length} practical programs across coding, data, cloud, and business. Open any syllabus for full module breakdowns or launch its interactive <strong>3D Roadmap</strong>.
        </p>
      </section>

      {/* 2. Interactive Searchable Course Catalog (Matches Homepage Wireframe Cards) */}
      <section id="catalog" className="-mx-4 border-t border-hairline bg-canvas px-4 py-14 sm:-mx-6 sm:px-6 md:py-20 lg:-mx-10 lg:px-10">
        <div className="mx-auto max-w-[1320px]">
          <CourseGrid courses={ALL_CATALOG_COURSES} />
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
