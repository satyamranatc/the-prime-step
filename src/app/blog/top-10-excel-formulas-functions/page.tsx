import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Excel's Top 10 Power Formulas Every Student & Analyst Must Master | The Prime Step",
  description:
    "Master the most powerful Microsoft Excel formulas: XLOOKUP, INDEX/MATCH, Dynamic Arrays, Nested IF, SUMIFS, and Pivot Tables. Step-by-step practical guide from The Prime Step Indore.",
  alternates: {
    canonical: `${SITE.url}/blog/top-10-excel-formulas-functions`,
  },
  openGraph: {
    title: "Excel's Top 10 Power Formulas You Need to Master | The Prime Step",
    description: "Practical guide to essential Excel formulas for workplace reporting and MIS analytics.",
    url: `${SITE.url}/blog/top-10-excel-formulas-functions`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "article",
  },
};

export default function Top10ExcelFormulasPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Excel's Top 10 Power Formulas Every Student & Analyst Must Master",
    description: "In-depth guide to modern Excel formulas: XLOOKUP, INDEX/MATCH, SUMIFS, and dynamic arrays.",
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
    datePublished: "2024-01-17T00:00:00+05:30",
    dateModified: "2026-01-10T00:00:00+05:30",
    mainEntityOfPage: `${SITE.url}/blog/top-10-excel-formulas-functions`,
  };

  const FORMULAS = [
    {
      name: "1. XLOOKUP (The Modern King of Lookups)",
      syntax: "=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found], [match_mode])",
      usage: "Replaces legacy VLOOKUP and HLOOKUP. Allows you to search both left and right, defaults to exact match, and doesn't break when columns are inserted.",
    },
    {
      name: "2. INDEX & MATCH (The Bulletproof Classic Duo)",
      syntax: "=INDEX(return_range, MATCH(lookup_val, lookup_range, 0))",
      usage: "Essential for working in older Excel versions and large enterprise databases with 500,000+ rows where performance and dynamic two-way lookups matter.",
    },
    {
      name: "3. SUMIFS (Multi-Condition Financial Aggregation)",
      syntax: "=SUMIFS(sum_range, criteria_range1, criteria1, criteria_range2, criteria2)",
      usage: "Calculate total sales for a specific branch (e.g. 'Vijay Nagar') within a specific month and product category simultaneously.",
    },
    {
      name: "4. COUNTIFS (Multi-Criteria Transaction Counting)",
      syntax: "=COUNTIFS(criteria_range1, criteria1, criteria_range2, criteria2)",
      usage: "Count how many transactions met specific criteria, such as overdue accounts exceeding 30 days.",
    },
    {
      name: "5. Nested IF & IFS (Logical Workflow Branching)",
      syntax: "=IFS(score>=90, 'A', score>=75, 'B', score>=60, 'C', TRUE, 'D')",
      usage: "Assign grading, sales commissions, or tax slabs without writing convoluted nested IF statements.",
    },
    {
      name: "6. UNIQUE & FILTER (Dynamic Array Revolution)",
      syntax: "=FILTER(A2:D100, B2:B100='Indore') and =UNIQUE(A2:A100)",
      usage: "Instantly extracts unique customer lists or live-filtered records without needing manual copy-pasting.",
    },
    {
      name: "7. TEXTSPLIT & TEXTJOIN (Modern String Wrangling)",
      syntax: "=TEXTSPLIT(A2, ' ') and =TEXTJOIN(', ', TRUE, range)",
      usage: "Splits full names into First and Last names, or merges multiple address rows into a single standardized string.",
    },
    {
      name: "8. IFERROR (Clean Executive Reporting)",
      syntax: "=IFERROR(formula, 'Not Available')",
      usage: "Suppresses ugly #N/A or #DIV/0! errors across reports, replacing them with clean fallback messages.",
    },
    {
      name: "9. DATEDIF (HR & Tenure Calculations)",
      syntax: "=DATEDIF(start_date, end_date, 'Y') & ' Years, ' & DATEDIF(start_date, end_date, 'YM') & ' Months'",
      usage: "Computes employee service tenure, age, or billing duration in exact years, months, and days.",
    },
    {
      name: "10. PMT (Financial & Loan EMI Modeling)",
      syntax: "=PMT(rate/12, nper, -pv)",
      usage: "Calculates the exact monthly installment payment on loans and capital equipment financing.",
    },
  ];

  return (
    <PageShell
      title="Excel's Top 10 Power Formulas Every Student & Analyst Must Master"
      eyebrow="Spreadsheet Mastery · MIS Tutorials"
      lead="Mastering these 10 indispensable Microsoft Excel functions will save you hundreds of hours of manual work and make your corporate reports look executive-ready."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-3xl space-y-10 text-deep">
        <div className="flex items-center gap-4 text-xs font-semibold text-deep/60 border-b border-pale pb-4">
          <span>By Advanced Excel Mentors, The Prime Step</span>
          <span>•</span>
          <span>Updated for 2026</span>
          <span>•</span>
          <span>7 min read</span>
        </div>

        <section className="space-y-4 text-base md:text-lg leading-relaxed text-deep/80">
          <p>
            Whether you work in banking, marketing, supply chain, accounting, or IT software engineering, Excel remains the universal calculation engine of global business.
          </p>
          <p>
            While most people use Excel as a glorified grid paper, true power users leverage dynamic formulas to automate entire workflows. Here are the 10 most critical formulas taught in our practical labs across Indore.
          </p>
        </section>

        <section className="space-y-8">
          {FORMULAS.map((item, idx) => (
            <div key={idx} className="rounded-2xl border border-pale/80 bg-paper p-6 space-y-3">
              <h2 className="text-xl font-bold text-deep">{item.name}</h2>
              <div className="rounded-lg bg-soft px-4 py-2 font-mono text-xs text-brand break-all">
                {item.syntax}
              </div>
              <p className="text-sm text-deep/80 leading-relaxed">{item.usage}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <div className="rounded-3xl border border-brand/30 bg-soft p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-deep">Want to master Advanced Excel & MIS Dashboards?</h3>
          <p className="text-sm text-deep/70 max-w-lg mx-auto">
            Join our 100% hands-on MS Office & Advanced Excel training at Vijay Nagar, Bhawarkua, or Annapurna campuses in Indore.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/ms-office-and-excel-course-in-indore"
              className="rounded-full bg-deep px-8 py-3 text-sm font-semibold text-paper transition-all hover:bg-brand"
            >
              Explore MS Office & Advanced Excel Course →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

