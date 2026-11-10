import type { Metadata } from "next";
import { SITE } from "@/lib/content";
import { buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import PageShell from "@/components/pages/PageShell";

const pageTitle = "Corporate Training & Workforce Upskilling in Indore | The Prime Step";
const pageDescription =
  "Customized Corporate IT Training, Institutional Bootcamps & Workforce Upskilling in Indore by The Prime Step. Practical enterprise training in Java Spring Boot, MERN Stack, Python, Data Analytics, Power BI, Advanced Excel & Business Communication.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Corporate IT training in Indore",
    "Employee upskilling programs Indore",
    "Corporate Power BI and Advanced Excel training Indore",
    "Java and Python corporate workshops Indore",
    "College campus CRT and technical training MP",
    "The Prime Step corporate training",
  ],
  alternates: {
    canonical: `${SITE.url}/corporate-training`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE.url}/corporate-training`,
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

const CORPORATE_TRACKS = [
  {
    code: "01",
    title: "Enterprise Full Stack & Microservices",
    focus: "Java Spring Boot · React · Node.js · Next.js · TypeScript",
    description:
      "Transition engineering teams from legacy monoliths to modern microservice backends and reactive web frontends with production code reviews and architectural sprints.",
    outcomes: ["REST & Microservice Design", "Modern React/Next.js Patterns", "Automated Testing & CI/CD", "Security & JWT Standards"],
  },
  {
    code: "02",
    title: "Business Intelligence, Power BI & SQL Analytics",
    focus: "Power BI · Tableau · Advanced Excel · SQL Query Tuning",
    description:
      "Empower operations, finance, and management teams to automate manual spreadsheet workflows and build real-time executive KPI dashboards.",
    outcomes: ["DAX & Data Modeling", "Automated MIS Reporting", "SQL Joins & Pipelines", "Interactive Executive Dashboards"],
  },
  {
    code: "03",
    title: "Python Automation, Data Science & Applied AI",
    focus: "Python · FastAPI · Pandas · Machine Learning · GenAI Workflows",
    description:
      "Equip technical and analytical teams with Python scripting for process automation, predictive data modeling, and integrating AI APIs into internal tools.",
    outcomes: ["Workflow Automation", "Data Wrangling with Pandas", "Predictive ML Models", "FastAPI Microservices"],
  },
  {
    code: "04",
    title: "Corporate Communication & Executive Presence",
    focus: "Business English · Client Communication · Presentation Delivery",
    description:
      "Strengthen client-facing communication, agile standup articulation, email etiquette, and leadership presentation skills for technical and operations teams.",
    outcomes: ["Client Call Fluency", "Executive Presentations", "Crisp Written Etiquette", "Cross-Functional Collaboration"],
  },
] as const;

const DELIVERY_MODES = [
  {
    title: "On-Premise Corporate Workshops",
    subtitle: "At Your Office (Indore SEZ / Crystal IT Park / Super Corridor)",
    description:
      "Our senior architects and trainers conduct intensive hands-on sessions directly at your company premises, customized around your internal tech stack and business datasets.",
  },
  {
    title: "Dedicated Lab Bootcamps",
    subtitle: "At Our Vijay Nagar, Bhawarkua & Annapurna Campuses",
    description:
      "Send newly hired graduate engineer trainees (GETs) or lateral cohorts to our fully equipped Indore computer labs for structured pre-deployment onboarding.",
  },
  {
    title: "University & College CRT Partnerships",
    subtitle: "Campus Recruitment & Technical Readiness Across MP",
    description:
      "Partner with The Prime Step for semester-long technical workshops, hackathon mentorship, DSA bootcamps, and GD/PI communication training for engineering & management colleges.",
  },
] as const;

export default function CorporateTrainingPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Corporate Training", path: "/corporate-training" },
  ];

  const jsonLd = buildBreadcrumbJsonLd(breadcrumbs);

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <p className="eyebrow text-brand">Enterprise &amp; Institutional Upskilling</p>
        <h1 className="display mt-4 max-w-4xl text-[11.5vw] text-deep sm:text-[7.5vw] md:text-[5.4vw] leading-[0.95]">
          Corporate Training engineered for <span className="italic text-brand">measurable impact.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-lg md:text-xl leading-relaxed text-deep/85">
          We partner with IT companies, growing enterprises, and colleges across Indore and Central India to upskill teams through customized, project-driven workshops in Full Stack Engineering, Data Analytics, Python AI, and Business Communication.
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <CTA href="/contact-us" label="Request Custom Proposal" />
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-deep/25 bg-soft px-6 py-3 text-sm font-medium text-deep transition-colors hover:border-brand hover:text-brand"
          >
            <WhatsAppIcon className="size-4 fill-current text-brand" />
            <span>Speak with Training Director</span>
          </a>
        </div>
      </section>

      {/* 2. Corporate Upskilling Domains */}
      <section className="border-t border-pale/60 bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Enterprise Training Tracks" />
          <div className="mt-6 max-w-2xl">
            <h2 className="display text-4xl md:text-6xl text-deep">
              Custom curricula aligned to your production stack.
            </h2>
            <p className="mt-4 text-base md:text-lg text-deep/80">
              Every engagement begins with a technical skill-gap audit so your team practices on real company scenarios rather than generic slides.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CORPORATE_TRACKS.map((track) => (
              <article
                key={track.code}
                className="flex flex-col justify-between rounded-3xl border border-pale/90 bg-paper p-7 md:p-9"
              >
                <div>
                  <span className="eyebrow text-brand">Track {track.code}</span>
                  <h3 className="display mt-3 text-2xl md:text-4xl text-deep">
                    {track.title}
                  </h3>
                  <p className="mt-2 font-mono text-xs text-brand">{track.focus}</p>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                    {track.description}
                  </p>
                </div>

                <ul className="mt-6 flex flex-wrap gap-2 border-t border-pale/70 pt-5">
                  {track.outcomes.map((o) => (
                    <li
                      key={o}
                      className="rounded-full border border-pale bg-soft px-3.5 py-1 text-xs font-medium text-deep"
                    >
                      {o}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Delivery Formats */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Flexible Delivery Formats" />
          <h2 className="display mt-6 max-w-3xl text-4xl md:text-6xl text-deep">
            Built around your team&apos;s schedule.
          </h2>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {DELIVERY_MODES.map((m, i) => (
              <div
                key={m.title}
                className="rounded-3xl border border-pale bg-soft/75 p-7 md:p-8"
              >
                <span className="eyebrow text-brand">0{i + 1}</span>
                <h3 className="display mt-3 text-2xl md:text-3xl text-deep">
                  {m.title}
                </h3>
                <p className="mt-1.5 text-xs font-semibold text-brand">{m.subtitle}</p>
                <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                  {m.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Hire From The Prime Step */}
      <section className="bg-deep py-20 text-paper md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="03" title="Zero-Cost Campus Hiring" dark />
          <div className="mt-6 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div>
              <h2 className="display text-4xl md:text-6xl text-paper">
                Hire pre-trained developers in Indore at zero recruitment fee.
              </h2>
              <p className="mt-4 max-w-xl text-base md:text-lg leading-relaxed text-pale">
                Looking to expand your engineering or analytics team? Connect with our placement cell to interview candidates who have already built and deployed 3–5 production projects in Java, MERN, Python, and Data Analytics.
              </p>
            </div>
            <div className="rounded-3xl border border-pale/25 bg-paper/5 p-8">
              <p className="eyebrow text-pale">Corporate &amp; HR Desk</p>
              <p className="display mt-2 text-2xl text-paper">{SITE.phoneDisplay}</p>
              <p className="mt-1 text-sm text-pale/80">{SITE.email}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <CTA href={SITE.phoneHref} label="Call Corporate Desk" variant="light" />
                <CTA href={`mailto:${SITE.email}`} label="Email Requirements" variant="ghost-light" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

