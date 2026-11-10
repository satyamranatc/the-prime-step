import type { Metadata } from "next";
import Link from "next/link";
import {
  BRANCHES,
  BUILD_STEPS,
  INSTITUTE_STATS,
  SITE,
  mapsLink,
} from "@/lib/content";
import { buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import PageShell from "@/components/pages/PageShell";

const pageTitle = "About Us — Indore's Premier Practical IT Training Institute | The Prime Step";
const pageDescription =
  "Learn about The Prime Step — Indore's trusted IT & computer training academy established in 2019. Rated 4.9★ across 2,390+ Google reviews with 3 campuses in Vijay Nagar, Bhawarkua, and Annapurna Road.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "About The Prime Step Indore",
    "Best IT training institute in Indore",
    "Computer coaching in Vijay Nagar Bhawarkua Annapurna",
    "Practical coding academy Indore",
    "The Prime Step reviews and campuses",
  ],
  alternates: {
    canonical: `${SITE.url}/about-us`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE.url}/about-us`,
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

const PILLARS = [
  {
    number: "01",
    title: "Code Written in Lab, Not Just on Slides",
    description:
      "We believe software engineering cannot be learned by passively watching presentations. Every concept at The Prime Step is immediately practiced on a computer workstation in our guided labs.",
  },
  {
    number: "02",
    title: "Mentors Who Sit Beside You for Every Bug",
    description:
      "Getting stuck on an error is where real learning happens. Our faculty stay inside the computer lab to debug logic one-to-one so no student is ever left behind.",
  },
  {
    number: "03",
    title: "Accessible to Both IT & Non-IT Learners",
    description:
      "Whether you hold a B.Tech/BCA degree or come from Commerce, Arts, or 12th pass, we explain every technical concept in plain, human language first before scaling to enterprise depth.",
  },
  {
    number: "04",
    title: "Three Accessible Campuses Across Indore",
    description:
      "With fully equipped learning centers at Vijay Nagar (Shagun Tower), Bhawarkua (Indrapuri), and Annapurna Road, high-quality tech education is always close to where you live or study.",
  },
] as const;

export default function AboutUsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "/about-us" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd(breadcrumbs),
      {
        "@type": "AboutPage",
        "@id": `${SITE.url}/about-us#about`,
        url: `${SITE.url}/about-us`,
        name: pageTitle,
        description: pageDescription,
        mainEntity: {
          "@id": `${SITE.url}/#organization`,
        },
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
        <p className="eyebrow text-brand">Est. {SITE.established} · {SITE.city}</p>
        <h1 className="display mt-4 max-w-4xl text-[11.5vw] text-deep sm:text-[7.5vw] md:text-[5.4vw] leading-[0.95]">
          A classroom isn&apos;t a place you sit. It&apos;s a place you build.
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-deep/85">
          Founded in {SITE.established} in Indore, The Prime Step was built on a single conviction: bridge the gap between academic theory and what software companies actually expect on day one of the job.
        </p>

        {/* Verified Stats Grid */}
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {INSTITUTE_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-pale/85 bg-soft p-6 md:p-8"
            >
              <div className="display text-3xl md:text-5xl font-bold text-brand">
                {s.value}
              </div>
              <div className="mt-2 text-sm md:text-base font-semibold text-deep">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-deep/70">{s.note}</div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Teaching Philosophy & Pillars */}
      <section className="border-t border-pale/60 bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Our Pedagogy & Values" />
          <div className="mt-6 max-w-2xl">
            <h2 className="display text-4xl md:text-6xl text-deep">
              Why thousands of Indore students trust The Prime Step.
            </h2>
            <p className="mt-4 text-base md:text-lg text-deep/80">
              Across 2,390+ verified Google reviews, students consistently highlight the same four things about their time in our classrooms.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {PILLARS.map((p) => (
              <div
                key={p.number}
                className="rounded-3xl border border-pale/90 bg-paper p-7 md:p-9"
              >
                <span className="eyebrow text-brand">Principle {p.number}</span>
                <h3 className="display mt-3 text-2xl md:text-4xl text-deep">
                  {p.title}
                </h3>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. How Every Student Learns (4 Steps) */}
      <section className="bg-deep py-20 text-paper md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="The 4-Stage Learning Loop" dark />
          <h2 className="display mt-6 max-w-3xl text-4xl md:text-6xl text-paper">
            From your first line of code to a live portfolio.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {BUILD_STEPS.map((s) => (
              <div
                key={s.n}
                className="flex flex-col justify-between rounded-3xl border border-pale/25 bg-paper/5 p-7"
              >
                <div>
                  <span className="eyebrow text-pale">Step {s.n}</span>
                  <h3 className="display mt-3 text-2xl md:text-3xl text-paper">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-pale/85">
                    {s.text}
                  </p>
                </div>
                <div className="mt-6 rounded-xl bg-obsidian/70 p-3.5 font-mono text-xs text-pale">
                  {s.code.map((ln, idx) => (
                    <div key={idx} className="truncate">
                      {ln}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Our 3 Indore Campuses */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="03" title="Our Indore Campuses" />
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <h2 className="display text-4xl md:text-6xl text-deep">
                Three campuses across Indore.
              </h2>
              <p className="mt-4 text-base md:text-lg text-deep/80">
                Walk into our Vijay Nagar Head Office, Bhawarkua Student Hub, or Annapurna Campus Monday through Saturday for a personal tour and free demo class.
              </p>
            </div>
            <CTA href="/contact-us" label="Contact & Directions" />
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BRANCHES.map((b) => (
              <div
                key={b.name}
                className="flex flex-col justify-between rounded-3xl border border-pale bg-soft/75 p-7 md:p-8"
              >
                <div>
                  <span className="eyebrow text-brand">{b.tag}</span>
                  <h3 className="display mt-3 text-3xl text-deep">{b.name} Campus</h3>
                  <p className="mt-1.5 text-xs font-semibold text-brand">{b.landmark}</p>
                  <p className="mt-4 text-sm leading-relaxed text-deep/80">{b.address}</p>
                  <p className="mt-3 text-xs font-mono text-deep/70">{b.hours}</p>
                </div>

                <div className="mt-6 flex items-center justify-between border-t border-pale/70 pt-4">
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand hover:underline"
                  >
                    Open in Google Maps ↗
                  </a>
                  <a
                    href={b.phoneHref}
                    className="rounded-full bg-paper px-3.5 py-1.5 text-xs font-semibold text-deep border border-pale"
                  >
                    {b.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-14 flex flex-wrap items-center justify-between gap-6 rounded-3xl border border-pale bg-soft p-8 md:p-10">
            <div>
              <p className="eyebrow text-brand">Ready to begin?</p>
              <h3 className="display mt-2 text-2xl md:text-4xl text-deep">
                Explore our flagship career programs.
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/java-full-stack-developer"
                className="rounded-full bg-deep px-5 py-3 text-xs md:text-sm font-semibold text-paper hover:bg-brand transition-colors"
              >
                Java Full Stack →
              </Link>
              <Link
                href="/mern-stack-developer-course"
                className="rounded-full bg-deep px-5 py-3 text-xs md:text-sm font-semibold text-paper hover:bg-brand transition-colors"
              >
                MERN Stack →
              </Link>
              <Link
                href="/python-programming-classes"
                className="rounded-full bg-deep px-5 py-3 text-xs md:text-sm font-semibold text-paper hover:bg-brand transition-colors"
              >
                Python Classes →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

