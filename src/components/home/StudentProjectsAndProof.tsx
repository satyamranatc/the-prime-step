import Link from "next/link";
import { COURSE_PAGES } from "@/lib/seoPages";
import { GOOGLE_RATING } from "@/lib/homepage";
import Chapter from "@/components/ui/Chapter";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/ui/Motion";

const FEATURED_CAPSTONES = [
  { slug: "java-full-stack-developer", courseLabel: "Java Full Stack" },
  { slug: "mern-stack-developer-course", courseLabel: "MERN Stack" },
  { slug: "data-analytics-course-in-indore", courseLabel: "Data Analytics" },
  { slug: "python-programming-classes", courseLabel: "Python & AI" },
] as const;

/**
 * Genuine student feedback published across The Prime Step's three Indore campus pages
 * (Vijay Nagar, Bhawarkua, Annapurna).
 */
const CAMPUS_VOICES = [
  {
    author: "Aman Sharma",
    campus: "Vijay Nagar Campus",
    role: "Java Full Stack Developer",
    quote:
      "The practical labs at Shagun Tower Vijay Nagar are top notch. Mentors don't just teach theory; they sit with you and review every line of code.",
  },
  {
    author: "Sneha Patidar",
    campus: "Bhawarkua Campus",
    role: "Full Stack Developer",
    quote:
      "The mentors in Bhawarkua are extremely supportive. They treat you like junior engineers in an office rather than regular classroom students.",
  },
  {
    author: "Deepak Soni",
    campus: "Annapurna Campus",
    role: "Tally Prime & Advanced Excel",
    quote:
      "I completed Tally Prime and Advanced Excel here. The faculty explained GST returns and e-invoicing using live company books.",
  },
] as const;

export default function StudentProjectsAndProof() {
  const capstones = FEATURED_CAPSTONES.map((item) => {
    const course = COURSE_PAGES[item.slug];
    const proj = course?.projects[0];
    return proj ? { ...proj, slug: item.slug, courseLabel: item.courseLabel } : null;
  }).filter((x): x is NonNullable<typeof x> => Boolean(x));

  return (
    <section
      id="student-work"
      aria-labelledby="student-work-title"
      className="border-t border-hairline bg-canvas py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-10">
        {/* Part 1: Real Capstone Projects Built in Indore Labs */}
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div className="max-w-2xl">
            <Chapter n="04" title="Student Capstones & Proof" />
            <h2
              id="student-work-title"
              className="display mt-4 text-[clamp(2rem,4vw,3.15rem)] text-ink"
            >
              Real systems built in our labs — not toy assignments.
            </h2>
            <p className="mt-3 text-base leading-relaxed text-ink-muted">
              Every student ships working software, dashboards, or production APIs reviewed one-on-one by faculty before sitting technical interviews.
            </p>
          </div>

          <Link
            href="/courses"
            className="inline-flex items-center gap-2 self-start text-sm font-semibold text-brand underline-offset-4 hover:underline md:self-auto"
          >
            <span>Explore all project syllabi</span>
            <span aria-hidden="true">→</span>
          </Link>
        </Reveal>

        <StaggerGroup className="mt-10 grid gap-5 sm:grid-cols-2">
          {capstones.map((proj, idx) => (
            <StaggerItem key={proj.title}>
              <article className="group flex h-full flex-col justify-between rounded-2xl border border-hairline bg-paper p-6 transition-all duration-200 hover:border-brand/50 hover:shadow-[0_14px_34px_-16px_rgba(14,110,107,0.16)] md:p-7">
                <div>
                  <div className="flex items-center justify-between gap-2 text-xs">
                    <span className="font-semibold text-brand">
                      Capstone 0{idx + 1} · {proj.courseLabel}
                    </span>
                    <span className="rounded-full border border-hairline bg-canvas px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                      GitHub Deliverable
                    </span>
                  </div>

                  <h3 className="mt-3 text-xl font-semibold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
                    <Link href={`/${proj.slug}`}>{proj.title}</Link>
                  </h3>

                  <p className="mt-1.5 text-xs font-medium text-brand/90">
                    {proj.stack}
                  </p>

                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                    {proj.description}
                  </p>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-hairline pt-4">
                  <div className="flex flex-wrap gap-1.5">
                    {proj.outcomes.slice(0, 2).map((o) => (
                      <span
                        key={o}
                        className="rounded-md border border-hairline bg-canvas px-2.5 py-1 text-[11px] font-medium text-ink-muted"
                      >
                        {o}
                      </span>
                    ))}
                  </div>

                  <Link
                    href={`/${proj.slug}`}
                    className="text-xs font-semibold text-ink transition-colors hover:text-brand"
                  >
                    Track Details →
                  </Link>
                </div>
              </article>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Part 2: Verified Google Reputation & Campus Student Voices */}
        <div className="mt-20 border-t border-hairline pt-16">
          <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <span className="eyebrow text-brand">Verified Reputation</span>
              <h3 className="display mt-3 text-[clamp(1.75rem,3.4vw,2.65rem)] text-ink">
                Trusted by learners across Indore since 2019.
              </h3>
            </div>

            <a
              href={GOOGLE_RATING.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="press-scale inline-flex items-center gap-2.5 self-start rounded-full border border-hairline bg-paper px-5 py-2.5 text-sm font-semibold text-ink shadow-2xs transition-colors hover:border-brand hover:text-brand md:self-auto"
            >
              <span className="text-amber-500">★ {GOOGLE_RATING.rating}</span>
              <span className="text-hairline">|</span>
              <span>Read {GOOGLE_RATING.countLabel} ↗</span>
            </a>
          </Reveal>

          <StaggerGroup className="mt-8 grid gap-5 md:grid-cols-3">
            {CAMPUS_VOICES.map((voice) => (
              <StaggerItem key={voice.author}>
                <figure className="flex h-full flex-col justify-between rounded-2xl border border-hairline bg-paper p-6">
                  <div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-amber-500" aria-label="5 out of 5 stars">
                        ★★★★★
                      </span>
                      <span className="text-[11px] font-medium text-brand">
                        {voice.campus}
                      </span>
                    </div>
                    <blockquote className="mt-4 text-sm leading-relaxed text-ink-muted">
                      &ldquo;{voice.quote}&rdquo;
                    </blockquote>
                  </div>

                  <figcaption className="mt-6 border-t border-hairline pt-4">
                    <p className="text-sm font-semibold text-ink">{voice.author}</p>
                    <p className="mt-0.5 text-xs text-ink-subtle">{voice.role}</p>
                  </figcaption>
                </figure>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
