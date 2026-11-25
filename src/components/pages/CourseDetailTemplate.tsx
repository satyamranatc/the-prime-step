import Link from "next/link";
import { BRANCHES, SITE, mapsLink } from "@/lib/content";
import {
  COURSE_PAGES,
  buildBreadcrumbJsonLd,
  type CoursePageData,
} from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Motion";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import PageShell from "./PageShell";

export default function CourseDetailTemplate({ course }: { course: CoursePageData }) {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Courses", path: "/courses" },
    { name: course.title, path: `/${course.slug}` },
  ];

  const relatedCourses = Object.values(COURSE_PAGES)
    .filter((c) => c.slug !== course.slug)
    .slice(0, 6);

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd(breadcrumbs),
      {
        "@type": "Course",
        "@id": `${SITE.url}/${course.slug}#course`,
        name: course.title,
        description: course.metaDescription,
        url: `${SITE.url}/${course.slug}`,
        provider: {
          "@type": "EducationalOrganization",
          name: SITE.name,
          sameAs: SITE.url,
        },
        hasCourseInstance: BRANCHES.map((b) => ({
          "@type": "CourseInstance",
          courseMode: "Onsite",
          location: {
            "@type": "Place",
            name: `${SITE.name} — ${b.name} Campus`,
            address: {
              "@type": "PostalAddress",
              streetAddress: b.address,
              addressLocality: "Indore",
              addressRegion: "Madhya Pradesh",
              addressCountry: "IN",
            },
          },
        })),
      },
      {
        "@type": "FAQPage",
        "@id": `${SITE.url}/${course.slug}#faq`,
        mainEntity: course.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.a,
          },
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

      {/* 1. Architectural Course Hero */}
      <section className="mx-auto max-w-[1380px] pt-6 pb-14 md:pt-10 md:pb-20">
        <div className="max-w-4xl">
          <p className="eyebrow text-brand">{course.eyebrow}</p>
          <h1 className="display mt-4 text-[clamp(2.15rem,4.8vw,3.9rem)] font-extrabold text-ink break-words">
            {course.heroTitle}
          </h1>
          <p className="prose-measure mt-5 text-base leading-relaxed text-ink-muted md:text-lg">
            {course.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CTA
              href="#admission"
              label="Book Free 2-Day Demo"
              className="w-full sm:w-auto"
            />
            {course.roadmapId && (
              <CTA
                href={`/roadmap/${course.roadmapId}`}
                label="Interactive 3D Syllabus"
                variant="ghost"
                className="w-full sm:w-auto"
              />
            )}
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="press-scale inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-hairline bg-canvas px-5 text-sm font-semibold text-ink transition-colors hover:border-brand hover:text-brand sm:w-auto"
            >
              <WhatsAppIcon className="size-4 fill-current text-brand" />
              <span>WhatsApp Syllabus PDF</span>
            </a>
          </div>
        </div>

        {/* Hairline 4-Column Specification Ledger */}
        <dl className="mt-12 grid grid-cols-2 divide-y divide-hairline overflow-hidden rounded-2xl border border-hairline bg-canvas md:grid-cols-4 md:divide-x md:divide-y-0">
          <div className="p-5 md:p-7">
            <dt className="eyebrow text-ink-subtle">Duration</dt>
            <dd className="display mt-2 text-xl text-ink md:text-2xl">{course.duration}</dd>
            <p className="mt-1 text-xs text-ink-muted">Weekday &amp; Weekend Batches</p>
          </div>
          <div className="p-5 md:p-7">
            <dt className="eyebrow text-ink-subtle">Eligibility</dt>
            <dd className="display mt-2 text-xl text-ink md:text-2xl">{course.level}</dd>
            <p className="mt-1 text-xs text-ink-muted">IT &amp; Non-IT Students</p>
          </div>
          <div className="p-5 md:p-7">
            <dt className="eyebrow text-ink-subtle">Training Mode</dt>
            <dd className="display mt-2 text-xl text-ink md:text-2xl">{course.format}</dd>
            <p className="mt-1 text-xs text-ink-muted">3 Indore Campuses</p>
          </div>
          <div className="p-5 md:p-7">
            <dt className="eyebrow text-ink-subtle">Portfolio Output</dt>
            <dd className="display mt-2 text-xl text-ink md:text-2xl">{course.projectsCount}</dd>
            <p className="mt-1 text-xs text-ink-muted">With 1-on-1 Code Reviews</p>
          </div>
        </dl>
      </section>

      {/* 2. Program Architecture & Highlights */}
      <section className="-mx-4 border-y border-hairline bg-canvas px-4 py-16 sm:-mx-6 sm:px-6 md:py-24 lg:-mx-10 lg:px-10">
        <div className="mx-auto max-w-[1380px]">
          <Chapter n="01" title="Program Architecture" />
          <div className="mt-8 grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start lg:gap-14">
            <Reveal>
              <h2 className="display text-[clamp(1.75rem,3.4vw,2.75rem)] text-ink">
                {course.overviewHeadline}
              </h2>
              <div className="prose-measure mt-5 space-y-4 text-base leading-relaxed text-ink-muted">
                {course.overviewBody.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>

            <div className="grid gap-4 sm:grid-cols-2">
              {course.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-hairline bg-paper p-5 sm:p-6"
                >
                  <span className="eyebrow text-brand">{h.label}</span>
                  <h3 className="display mt-2 text-xl text-ink">{h.value}</h3>
                  <p className="mt-2 text-xs leading-relaxed text-ink-muted md:text-sm">
                    {h.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Step-by-Step Syllabus Modules */}
      <section className="mx-auto max-w-[1380px] py-16 md:py-24">
        <Chapter n="02" title="Step-by-Step Syllabus" />
        <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-2xl">
            <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] text-ink">
              What you will learn, module by module.
            </h2>
            <p className="mt-3 text-base text-ink-muted">
              Every module concludes with a working lab deliverable reviewed by senior faculty in Indore.
            </p>
          </div>
          {course.roadmapId && (
            <Link
              href={`/roadmap/${course.roadmapId}`}
              className="press-scale inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-xs font-semibold text-white hover:bg-brand md:text-sm"
            >
              <span>Open Interactive 3D Roadmap</span>
              <span aria-hidden="true">→</span>
            </Link>
          )}
        </div>

        <div className="mt-10 space-y-4">
          {course.modules.map((mod) => (
            <article
              key={mod.number}
              className="rounded-2xl border border-hairline bg-paper p-6 transition-colors hover:border-brand/40 md:p-8"
            >
              <div className="flex flex-col justify-between gap-3 border-b border-hairline pb-4 sm:flex-row sm:items-baseline">
                <div className="flex flex-wrap items-baseline gap-3">
                  <span className="font-mono text-xs font-semibold uppercase tracking-wider text-brand">
                    Module {mod.number}
                  </span>
                  <h3 className="display text-xl text-ink md:text-2xl">{mod.title}</h3>
                </div>
                <span className="self-start rounded-full border border-hairline bg-canvas px-3 py-1 font-mono text-[11px] font-medium text-ink-muted sm:self-auto">
                  {mod.duration}
                </span>
              </div>

              <p className="mt-4 text-sm font-medium text-ink md:text-base">{mod.summary}</p>

              <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                {mod.topics.map((topic) => (
                  <li
                    key={topic}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-ink-muted"
                  >
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                    <span>{topic}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 flex flex-wrap items-center gap-2 rounded-xl border border-hairline bg-canvas px-4 py-3 text-xs md:text-sm">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Lab Deliverable:
                </span>
                <span className="font-semibold text-ink">{mod.deliverable}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* 4. Tools & Technology Stack (Obsidian Band) */}
      <section className="-mx-4 bg-obsidian px-4 py-16 text-white sm:-mx-6 sm:px-6 md:py-24 lg:-mx-10 lg:px-10">
        <div className="mx-auto max-w-[1380px]">
          <Chapter n="03" title="Tools & Technologies" dark />
          <h2 className="display mt-4 text-[clamp(1.85rem,3.6vw,3rem)] text-white">
            Industry-standard stack you will use daily.
          </h2>
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {course.techCategories.map((cat) => (
              <div
                key={cat.category}
                className="rounded-2xl border border-white/12 bg-white/[0.03] p-6"
              >
                <h3 className="eyebrow text-light">{cat.category}</h3>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-md border border-white/15 bg-white/[0.06] px-3 py-1 font-mono text-xs text-white/90"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Capstone Projects & Career Roles */}
      <section className="mx-auto max-w-[1380px] py-16 md:py-24">
        <Chapter n="04" title="Projects & Career Outcomes" />
        <div className="mt-4 max-w-2xl">
          <h2 className="display text-[clamp(1.85rem,3.6vw,3rem)] text-ink">
            Build projects employers actually test.
          </h2>
          <p className="mt-3 text-base text-ink-muted">
            Complete systems you can demonstrate live during technical interviews.
          </p>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {course.projects.map((proj, idx) => (
            <div
              key={proj.title}
              className="flex flex-col justify-between rounded-2xl border border-hairline bg-canvas p-6 md:p-7"
            >
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Capstone 0{idx + 1}
                </span>
                <h3 className="display mt-2.5 text-xl text-ink md:text-2xl">
                  {proj.title}
                </h3>
                <p className="mt-2 font-mono text-xs text-brand">{proj.stack}</p>
                <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                  {proj.description}
                </p>
              </div>
              <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-hairline pt-4">
                {proj.outcomes.map((o) => (
                  <li
                    key={o}
                    className="rounded-md border border-hairline bg-paper px-2.5 py-1 text-xs font-medium text-ink-muted"
                  >
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-2xl border border-hairline bg-canvas p-7 md:p-10">
          <p className="eyebrow text-brand">Target Career Roles</p>
          <h3 className="display mt-2 text-2xl text-ink md:text-3xl">
            Roles this program prepares you for
          </h3>
          <div className="mt-7 grid gap-5 md:grid-cols-3">
            {course.careerRoles.map((r) => (
              <div
                key={r.role}
                className="rounded-xl border border-hairline bg-paper p-5"
              >
                <p className="font-mono text-[11px] text-brand">{r.skills}</p>
                <h4 className="mt-2 text-lg font-bold text-ink">{r.role}</h4>
                <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                  {r.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. FAQs & Indore Campuses Sidebar */}
      <section className="-mx-4 border-t border-hairline bg-canvas px-4 py-16 sm:-mx-6 sm:px-6 md:py-24 lg:-mx-10 lg:px-10">
        <div className="mx-auto max-w-[1380px]">
          <div className="grid gap-12 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Chapter n="05" title="Frequently Asked Questions" />
              <h2 className="display mt-4 text-[clamp(1.75rem,3vw,2.5rem)] text-ink">
                Common questions about {course.title}.
              </h2>
              <div className="mt-8 divide-y divide-hairline rounded-2xl border border-hairline bg-paper px-6">
                {course.faqs.map((faq) => (
                  <div key={faq.q} className="py-5">
                    <h3 className="text-base font-semibold text-ink">{faq.q}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">{faq.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="rounded-2xl border border-hairline bg-paper p-6 md:p-7">
                <p className="eyebrow text-brand">Attend In-Person in Indore</p>
                <h3 className="display mt-2 text-2xl text-ink">3 Indore Campuses</h3>
                <p className="mt-2 text-sm text-ink-muted">
                  Walk in for career counseling or a free 2-day practical lab demo class.
                </p>
                <ul className="mt-5 divide-y divide-hairline">
                  {BRANCHES.map((b) => (
                    <li key={b.name} className="py-3.5 first:pt-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-ink">{b.name} Campus</span>
                        <a
                          href={mapsLink(b.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-brand hover:underline"
                        >
                          Map ↗
                        </a>
                      </div>
                      <p className="mt-1 text-xs text-ink-muted">{b.address}</p>
                      <p className="mt-1 font-mono text-[11px] text-ink-subtle">{b.hours}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-2xl border border-hairline bg-paper p-6 md:p-7">
                <p className="eyebrow text-brand">Explore Other Tracks</p>
                <h3 className="display mt-2 text-xl text-ink">Related Programs</h3>
                <ul className="mt-4 space-y-2">
                  {relatedCourses.map((rc) => (
                    <li key={rc.slug}>
                      <Link
                        href={`/${rc.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:bg-paper"
                      >
                        <span>{rc.title}</span>
                        <span className="text-brand transition-transform group-hover:translate-x-0.5">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/career-courses"
                      className="group flex items-center justify-between rounded-xl border border-hairline bg-canvas px-4 py-3 text-sm font-medium text-ink transition-colors hover:border-brand hover:bg-paper"
                    >
                      <span>View All Career Courses</span>
                      <span className="text-brand transition-transform group-hover:translate-x-0.5">
                        →
                      </span>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
