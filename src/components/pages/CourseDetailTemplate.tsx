import Link from "next/link";
import { BRANCHES, SITE, mapsLink } from "@/lib/content";
import {
  COURSE_PAGES,
  buildBreadcrumbJsonLd,
  type CoursePageData,
} from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
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

      {/* 1. Editorial Hero */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <div className="max-w-4xl">
          <p className="eyebrow text-brand">{course.eyebrow}</p>
          <h1 className="display mt-4 text-[11.5vw] text-deep sm:text-[7.5vw] md:text-[5.4vw] leading-[0.95]">
            {course.heroTitle}
          </h1>
          <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-deep/85">
            {course.heroSubtitle}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <CTA href="#admission" label="Book Free 2-Day Demo" />
            {course.roadmapId && (
              <CTA
                href={`/roadmap/${course.roadmapId}`}
                label="Drive 3D Syllabus Roadmap"
                variant="ghost"
              />
            )}
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-deep/20 bg-soft px-6 py-3 text-sm font-medium text-deep transition-colors hover:border-brand hover:text-brand"
            >
              <WhatsAppIcon className="size-4 fill-current text-brand" />
              <span>WhatsApp Syllabus PDF</span>
            </a>
          </div>
        </div>

        {/* Key Course Metadata Strip */}
        <div className="mt-14 grid grid-cols-2 gap-4 rounded-3xl border border-pale/80 bg-soft p-6 md:grid-cols-4 md:gap-8 md:p-9">
          <div>
            <span className="eyebrow text-brand">Duration</span>
            <p className="display mt-2 text-2xl md:text-3xl text-deep">{course.duration}</p>
            <p className="mt-1 text-xs text-deep/70">Weekday &amp; Weekend Batches</p>
          </div>
          <div>
            <span className="eyebrow text-brand">Eligibility</span>
            <p className="display mt-2 text-2xl md:text-3xl text-deep">{course.level}</p>
            <p className="mt-1 text-xs text-deep/70">IT &amp; Non-IT Students Welcome</p>
          </div>
          <div>
            <span className="eyebrow text-brand">Training Mode</span>
            <p className="display mt-2 text-2xl md:text-3xl text-deep">{course.format}</p>
            <p className="mt-1 text-xs text-deep/70">Vijay Nagar · Bhawarkua · Annapurna</p>
          </div>
          <div>
            <span className="eyebrow text-brand">Portfolio Output</span>
            <p className="display mt-2 text-2xl md:text-3xl text-deep">{course.projectsCount}</p>
            <p className="mt-1 text-xs text-deep/70">With 1-on-1 Code Reviews</p>
          </div>
        </div>
      </section>

      {/* 2. Program Overview & Highlights */}
      <section className="border-t border-pale/60 bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Program Architecture" />
          <div className="mt-8 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-start">
            <div>
              <h2 className="display text-3xl md:text-5xl text-deep leading-[1.02]">
                {course.overviewHeadline}
              </h2>
              <div className="mt-6 space-y-4 text-base md:text-lg leading-relaxed text-deep/85">
                {course.overviewBody.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {course.highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-2xl border border-pale/90 bg-paper p-6 shadow-2xs"
                >
                  <span className="eyebrow text-brand">{h.label}</span>
                  <h3 className="display mt-2 text-2xl text-deep">{h.value}</h3>
                  <p className="mt-2 text-xs md:text-sm leading-relaxed text-deep/75">
                    {h.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Step-by-Step Curriculum Modules */}
      <section className="border-t border-pale/60 bg-paper py-20 md:py-32">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Step-by-Step Syllabus" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="display text-4xl md:text-6xl text-deep">
                What you will learn, module by module.
              </h2>
              <p className="mt-4 text-base md:text-lg text-deep/80">
                Every module concludes with a working project reviewed by senior faculty in our Indore computer labs.
              </p>
            </div>
            {course.roadmapId && (
              <Link
                href={`/roadmap/${course.roadmapId}`}
                className="inline-flex items-center gap-2 rounded-full bg-deep px-6 py-3 text-xs md:text-sm font-semibold text-paper transition-colors hover:bg-brand"
              >
                <span>Open Interactive 3D Roadmap</span>
                <span>→</span>
              </Link>
            )}
          </div>

          <div className="mt-12 space-y-6">
            {course.modules.map((mod) => (
              <article
                key={mod.number}
                className="rounded-3xl border border-pale/85 bg-soft/65 p-7 md:p-10 transition-colors hover:border-brand/50"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-4 border-b border-pale/70 pb-5">
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow text-brand">Module {mod.number}</span>
                    <h3 className="display text-2xl md:text-4xl text-deep">{mod.title}</h3>
                  </div>
                  <span className="rounded-full border border-deep/20 bg-paper px-4 py-1 text-xs font-mono text-deep">
                    {mod.duration}
                  </span>
                </div>

                <p className="mt-5 text-base md:text-lg font-medium text-deep/90">
                  {mod.summary}
                </p>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {mod.topics.map((topic) => (
                    <li
                      key={topic}
                      className="flex items-start gap-2.5 text-sm md:text-base text-deep/80 leading-relaxed"
                    >
                      <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand" />
                      <span>{topic}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap items-center gap-3 rounded-2xl border border-pale bg-paper px-5 py-3.5 text-xs md:text-sm">
                  <span className="eyebrow text-brand">Lab Deliverable:</span>
                  <span className="font-semibold text-deep">{mod.deliverable}</span>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Tools & Technology Stack */}
      <section className="bg-deep py-20 text-paper md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="03" title="Tools & Technologies" dark />
          <h2 className="display mt-6 text-4xl md:text-6xl text-paper">
            Industry-standard tools you will use daily.
          </h2>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {course.techCategories.map((cat) => (
              <div
                key={cat.category}
                className="rounded-3xl border border-pale/25 bg-paper/5 p-7"
              >
                <h3 className="eyebrow text-pale">{cat.category}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-full border border-pale/30 bg-paper/10 px-3.5 py-1.5 text-xs font-medium text-paper"
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

      {/* 5. Real-World Projects & Career Pathways */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="04" title="Projects & Career Outcomes" />
          <div className="mt-6 max-w-2xl">
            <h2 className="display text-4xl md:text-6xl text-deep">
              Build projects employers can actually test.
            </h2>
            <p className="mt-4 text-base md:text-lg text-deep/80">
              Instead of toy examples, you build complete systems that prove your engineering capability in technical interviews.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {course.projects.map((proj, idx) => (
              <div
                key={proj.title}
                className="flex flex-col justify-between rounded-3xl border border-pale/90 bg-soft p-7 md:p-8"
              >
                <div>
                  <span className="eyebrow text-brand">Capstone 0{idx + 1}</span>
                  <h3 className="display mt-3 text-2xl md:text-3xl text-deep">
                    {proj.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-brand">{proj.stack}</p>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                    {proj.description}
                  </p>
                </div>
                <ul className="mt-6 flex flex-wrap gap-2 border-t border-pale/70 pt-4">
                  {proj.outcomes.map((o) => (
                    <li
                      key={o}
                      className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-deep border border-pale/70"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Target Roles */}
          <div className="mt-20 rounded-3xl border border-pale bg-soft/60 p-8 md:p-12">
            <p className="eyebrow text-brand">Career Roles &amp; Placement Support</p>
            <h3 className="display mt-3 text-3xl md:text-4xl text-deep">
              Roles this program prepares you for
            </h3>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {course.careerRoles.map((r) => (
                <div key={r.role} className="rounded-2xl border border-pale/80 bg-paper p-6">
                  <p className="font-mono text-xs text-brand">{r.skills}</p>
                  <h4 className="display mt-2 text-2xl text-deep">{r.role}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-deep/80">{r.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Course FAQs & Indore Campuses */}
      <section className="border-t border-pale/60 bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr]">
            <div>
              <Chapter n="05" title="Frequently Asked Questions" />
              <h2 className="display mt-4 text-3xl md:text-5xl text-deep">
                Common questions about {course.title}.
              </h2>
              <div className="mt-8 space-y-4">
                {course.faqs.map((faq) => (
                  <div
                    key={faq.q}
                    className="rounded-2xl border border-pale bg-paper p-6"
                  >
                    <h3 className="text-base md:text-lg font-semibold text-deep">
                      {faq.q}
                    </h3>
                    <p className="mt-2 text-sm md:text-base leading-relaxed text-deep/80">
                      {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Campus Box & Related Programs */}
            <div className="space-y-8">
              <div className="rounded-3xl border border-pale bg-paper p-7 md:p-9">
                <p className="eyebrow text-brand">Attend In-Person in Indore</p>
                <h3 className="display mt-2 text-2xl md:text-3xl text-deep">
                  3 Campuses Across Indore
                </h3>
                <p className="mt-2 text-sm text-deep/75">
                  Walk in for a free career counseling session or 2-day practical lab demo class.
                </p>
                <ul className="mt-6 space-y-4">
                  {BRANCHES.map((b) => (
                    <li key={b.name} className="border-b border-pale/60 pb-4 last:border-b-0 last:pb-0">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-deep">{b.name} Campus</span>
                        <a
                          href={mapsLink(b.address)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-semibold text-brand hover:underline"
                        >
                          Map ↗
                        </a>
                      </div>
                      <p className="mt-1 text-xs text-deep/75">{b.address}</p>
                      <p className="mt-1 text-xs font-mono text-deep/65">{b.hours}</p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-3xl border border-pale bg-paper p-7 md:p-9">
                <p className="eyebrow text-brand">Explore Other Tracks</p>
                <h3 className="display mt-2 text-2xl text-deep">Related Programs</h3>
                <ul className="mt-4 space-y-2.5">
                  {relatedCourses.map((rc) => (
                    <li key={rc.slug}>
                      <Link
                        href={`/${rc.slug}`}
                        className="group flex items-center justify-between rounded-xl border border-pale/60 bg-soft/60 px-4 py-3 text-sm font-medium text-deep transition-colors hover:border-brand hover:bg-soft"
                      >
                        <span>{rc.title}</span>
                        <span className="text-brand transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </Link>
                    </li>
                  ))}
                  <li>
                    <Link
                      href="/career-courses"
                      className="group flex items-center justify-between rounded-xl border border-pale/60 bg-soft/60 px-4 py-3 text-sm font-medium text-deep transition-colors hover:border-brand hover:bg-soft"
                    >
                      <span>View All Career Courses</span>
                      <span className="text-brand transition-transform group-hover:translate-x-1">
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

