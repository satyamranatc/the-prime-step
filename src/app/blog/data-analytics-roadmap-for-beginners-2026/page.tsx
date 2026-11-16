import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Data Analytics Roadmap for Beginners (2026): Step-by-Step Guide",
  description:
    "Complete 2026 Data Analytics Roadmap for beginners. Learn the essential step-by-step tools: Excel, SQL, Power BI, Python, Statistics, and portfolio projects to secure your first Data Analyst job.",
  alternates: {
    canonical: `${SITE.url}/blog/data-analytics-roadmap-for-beginners-2026`,
  },
  openGraph: {
    title: "Data Analytics Roadmap for Beginners (2026) | The Prime Step",
    description:
      "A complete practical guide to becoming a hired Data Analyst in 2026 from The Prime Step Indore.",
    url: `${SITE.url}/blog/data-analytics-roadmap-for-beginners-2026`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "article",
  },
};

export default function DataAnalyticsRoadmap2026Page() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Data Analytics Roadmap for Beginners (2026): A Step-by-Step Guide",
    description:
      "Step-by-step guide for college graduates and career switchers to transition into Data Analytics in 2026.",
    author: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE.url}/brand/logo.png`,
      },
    },
    datePublished: "2026-07-22T10:42:31+05:30",
    dateModified: "2026-11-16T12:00:00+05:30",
    mainEntityOfPage: `${SITE.url}/blog/data-analytics-roadmap-for-beginners-2026`,
  };

  const ROADMAP_STEPS = [
    {
      step: "Step 01",
      duration: "Weeks 1 – 4",
      title: "Advanced Microsoft Excel & Business Math",
      courseLink: "/ms-office-and-excel-course-in-indore",
      courseName: "MS Office & Excel Course",
      description:
        "Excel is not just a spreadsheet—it is where 80% of business reporting begins. Learn to clean dirty data, combine datasets with XLOOKUP and INDEX/MATCH, summarize millions of data points using dynamic Pivot Tables, and build automated executive MIS reports.",
      keyTopics: [
        "XLOOKUP & Nested IFs",
        "Pivot Tables & Pivot Charts",
        "Conditional Formatting",
        "Data Validation & Cleaning",
        "Basic Descriptive Statistics (Mean, Median, Standard Deviation)",
      ],
    },
    {
      step: "Step 02",
      duration: "Weeks 5 – 8",
      title: "SQL & Relational Database Mastery",
      courseLink: "/data-science-and-analytics-courses-in-indore",
      courseName: "SQL & Analytics Track",
      description:
        "Every tech company stores its transactional data in relational databases like PostgreSQL, MySQL, or SQL Server. You must master querying databases to extract exact business answers without depending on backend engineers.",
      keyTopics: [
        "SELECT, WHERE, GROUP BY, HAVING",
        "INNER, LEFT, RIGHT, FULL OUTER JOINs",
        "Subqueries & Common Table Expressions (CTEs)",
        "Window Functions (ROW_NUMBER, RANK, DENSE_RANK, LAG, LEAD)",
        "Query Optimization & Indexing",
      ],
    },
    {
      step: "Step 03",
      duration: "Weeks 9 – 13",
      title: "Business Intelligence & Power BI Dashboards",
      courseLink: "/power-bi-course-in-indore",
      courseName: "Power BI Course",
      description:
        "Transform raw SQL extracts into interactive executive dashboards. Power BI is currently the most requested data visualization tool in corporate job descriptions.",
      keyTopics: [
        "Power Query ETL (Extract, Transform, Load)",
        "Data Modeling (Star Schema & Snowflake Schema)",
        "DAX Calculations (CALCULATE, FILTER, ALL, Time Intelligence)",
        "Interactive Filtering & Drill-Through Reports",
        "Power BI Service & Workspace Management",
      ],
    },
    {
      step: "Step 04",
      duration: "Weeks 14 – 18",
      title: "Python for Data Analysis & Exploratory Data Analysis (EDA)",
      courseLink: "/python-programming-classes",
      courseName: "Python Classes",
      description:
        "When datasets grow beyond Excel's row limits, Python provides high-performance data manipulation and statistical visualization.",
      keyTopics: [
        "NumPy for fast vectorized numerical computation",
        "Pandas DataFrames for filtering, grouping, and handling null values",
        "Matplotlib & Seaborn for statistical visual storytelling",
        "Automating repetitive CSV/Excel processing scripts",
        "Basic Predictive Modeling with Scikit-Learn",
      ],
    },
    {
      step: "Step 05",
      duration: "Weeks 19 – 22",
      title: "Capstone Projects, GitHub Portfolio & Interview Preparation",
      courseLink: "/data-analytics-course-in-indore",
      courseName: "Data Analytics Training in Indore",
      description:
        "Certificates alone do not get you hired; demonstrable projects do. Build 3 distinct end-to-end case studies addressing real-world sales, customer churn, and financial risk.",
      keyTopics: [
        "Publishing interactive Power BI reports to the web",
        "Documenting clean SQL scripts and business findings on GitHub",
        "Resume optimization with ATS-friendly quantifiable metrics",
        "Mock technical interview rounds and business case studies",
        "Direct hiring partner placement drives in Indore",
      ],
    },
  ];

  const COMMON_MISTAKES = [
    {
      mistake: "Jumping directly into Machine Learning without SQL & Excel",
      fix: "Over 80% of actual data analyst jobs require strong SQL and dashboarding, not neural networks. Master data extraction first.",
    },
    {
      mistake: "Learning too many tools superficially",
      fix: "Depth beats breadth. Being an expert in SQL + Power BI + Excel will get you hired faster than knowing 10% of ten different tools.",
    },
    {
      mistake: "Building generic Titanic or Iris dataset projects",
      fix: "Recruiters see Titanic datasets daily. Instead, analyze real-world datasets like Indian e-commerce logistics, municipal electric vehicle growth, or Spotify streaming habits.",
    },
    {
      mistake: "Ignoring business communication & storytelling",
      fix: "A data analyst must explain what the numbers mean to non-technical stakeholders. Learn to communicate insights clearly.",
    },
  ];

  return (
    <PageShell
      title="Data Analytics Roadmap for Beginners (2026): A Step-by-Step Guide"
      eyebrow="Career Roadmap & Curriculum"
      lead="A comprehensive step-by-step roadmap to transition into Data Analytics in 2026. Discover the exact progression from basic Excel and SQL databases to interactive Power BI dashboards and Python analytics."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-4xl space-y-12 sm:space-y-16">
        {/* Article Meta */}
        <header className="rounded-3xl border border-pale/80 bg-paper p-6 sm:p-8">
          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold text-deep/60">
            <span className="rounded-full bg-soft px-3 py-1 text-brand">Career Roadmap</span>
            <span>•</span>
            <span>Published July 2026</span>
            <span>•</span>
            <span>10 min read</span>
            <span>•</span>
            <span>By The Prime Step Data Mentors</span>
          </div>
          <p className="mt-4 text-base sm:text-lg text-deep/80 leading-relaxed">
            Data Analytics has emerged as one of the most accessible and rewarding entry points into the IT sector. Whether you come from a commerce background, engineering, science, or are looking to switch careers, companies in Indore and across India are actively seeking professionals who can turn chaotic business numbers into structured visual answers.
          </p>
        </header>

        {/* Step by Step Roadmap */}
        <section className="space-y-8">
          <div className="border-b border-pale pb-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-deep">
              The 5-Stage Data Analytics Learning Roadmap
            </h2>
            <p className="mt-2 text-sm sm:text-base text-deep/70">
              Follow this structured sequence to build job-ready competencies without feeling overwhelmed.
            </p>
          </div>

          <div className="space-y-6">
            {ROADMAP_STEPS.map((stage) => (
              <div
                key={stage.step}
                className="rounded-3xl border border-pale/80 bg-paper p-6 sm:p-8 transition-all hover:border-brand/40 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-pale pb-4">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-bold text-brand rounded-full bg-soft px-3 py-1">
                      {stage.step}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold text-deep">
                      {stage.title}
                    </h3>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-deep/60 self-start sm:self-auto">
                    {stage.duration}
                  </span>
                </div>

                <p className="mt-4 text-sm sm:text-base text-deep/75 leading-relaxed">
                  {stage.description}
                </p>

                <div className="mt-5 space-y-2">
                  <p className="text-xs font-bold uppercase tracking-wider text-brand">
                    Core Skills Covered:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-xs sm:text-sm text-deep/80">
                    {stage.keyTopics.map((topic) => (
                      <li key={topic} className="flex items-start gap-2">
                        <span className="text-brand font-bold">•</span>
                        <span>{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-pale/60 flex items-center justify-between">
                  <span className="text-xs text-deep/60">Recommended Course:</span>
                  <Link
                    href={stage.courseLink}
                    className="text-xs sm:text-sm font-semibold text-brand hover:underline flex items-center gap-1"
                  >
                    {stage.courseName} <span>→</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Common Mistakes */}
        <section className="rounded-3xl border border-pale/80 bg-paper p-6 sm:p-10 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-deep">
            4 Common Mistakes Beginners Make (And How to Avoid Them)
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {COMMON_MISTAKES.map((item, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-pale bg-soft/40 p-5 space-y-2"
              >
                <p className="text-xs font-bold uppercase tracking-wider text-rose-600">
                  Mistake: {item.mistake}
                </p>
                <p className="text-xs sm:text-sm text-deep/75">
                  <strong className="text-deep font-semibold">Solution: </strong>
                  {item.fix}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Practical Training CTA */}
        <section className="rounded-3xl border border-brand/20 bg-soft p-6 sm:p-10 text-center space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-deep">
            Learn Data Analytics with Hands-on Mentorship in Indore
          </h3>
          <p className="text-sm sm:text-base text-deep/75 max-w-2xl mx-auto">
            At The Prime Step, our Data Analytics program is built around live corporate case studies, dedicated lab workstations, and 1-on-1 resume reviews across our Vijay Nagar, Bhawarkua, and Annapurna centers.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/data-analytics-course-in-indore"
              className="rounded-full bg-deep px-8 py-3.5 text-sm font-semibold text-paper hover:bg-brand transition-all w-full sm:w-auto"
            >
              Explore Data Analytics Course Syllabus
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-deep/20 bg-paper px-8 py-3.5 text-sm font-semibold text-deep hover:border-brand transition-all w-full sm:w-auto"
            >
              Schedule Free Demo Class
            </Link>
          </div>
        </section>
      </article>
    </PageShell>
  );
}
