import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Tech Career & Skills Blog | The Prime Step Indore",
  description:
    "Expert tech career guides, programming language comparisons, Excel productivity tutorials, and digital marketing insights from senior mentors at The Prime Step Indore.",
  alternates: {
    canonical: `${SITE.url}/blog`,
  },
  openGraph: {
    title: "Tech Career & Skills Blog | The Prime Step Indore",
    description:
      "Expert career roadmaps and practical coding guides from The Prime Step Indore.",
    url: `${SITE.url}/blog`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

const BLOG_POSTS = [
  {
    slug: "top-digital-marketing-careers",
    title: "Top Digital Marketing Careers & Salaries You Need to Know (2026 Guide)",
    date: "Updated for 2026",
    readingTime: "6 min read",
    category: "Career Guidance",
    excerpt:
      "Explore the highest-paying digital marketing roles in 2026—from Performance Marketers and SEO Strategists to AI Content Specialists—and discover how practical training unlocks top opportunities.",
    href: "/blog/top-digital-marketing-careers",
  },
  {
    slug: "best-programming-languages-to-learn",
    title: "Which Programming Language to Learn First in 2026? (Python vs Java vs JavaScript)",
    date: "Updated for 2026",
    readingTime: "8 min read",
    category: "Programming & Code",
    excerpt:
      "A complete roadmap for beginners in Indore. Compare Python, Java, C++, and JavaScript by job demand, starting salaries, and learning curve to pick your ideal first coding language.",
    href: "/blog/best-programming-languages-to-learn",
  },
  {
    slug: "top-10-excel-formulas-functions",
    title: "Excel's Top 10 Power Formulas Every Student & Analyst Must Master",
    date: "Updated for 2026",
    readingTime: "7 min read",
    category: "Office & Analytics",
    excerpt:
      "Master the indispensable spreadsheet functions—XLOOKUP, INDEX/MATCH, Dynamic Arrays, Nested IF, and SUMIFS—with practical business examples to 10x your workplace productivity.",
    href: "/blog/top-10-excel-formulas-functions",
  },
];

export default function BlogListingPage() {
  return (
    <PageShell
      title="Technology & Career Insights"
      eyebrow="The Prime Step Editorial"
      lead="Practical guides, programming tutorials, industry trends, and career roadmaps designed to help students and professionals build high-growth tech careers in Indore and beyond."
    >
      <section className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
        <div className="grid gap-6 sm:gap-8">
          {BLOG_POSTS.map((post) => (
            <article
              key={post.slug}
              className="group rounded-3xl border border-pale/80 bg-paper p-5 sm:p-8 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2 sm:gap-3 text-xs font-semibold">
                  <span className="rounded-full bg-soft px-3 py-1 text-brand">
                    {post.category}
                  </span>
                  <span className="text-deep/50">•</span>
                  <span className="text-deep/60">{post.date}</span>
                  <span className="text-deep/50">•</span>
                  <span className="text-deep/60">{post.readingTime}</span>
                </div>

                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-deep group-hover:text-brand transition-colors break-words">
                  <Link href={post.href}>{post.title}</Link>
                </h2>

                <p className="text-sm sm:text-base text-deep/75 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-pale flex flex-wrap items-center justify-between gap-2">
                <Link
                  href={post.href}
                  className="text-sm font-semibold text-brand group-hover:underline flex items-center gap-1"
                >
                  Read Full Article <span>→</span>
                </Link>
                <span className="text-xs text-deep/50 font-medium">
                  By The Prime Step Faculty
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Career Counseling CTA */}
        <div className="rounded-3xl border border-brand/20 bg-soft p-5 sm:p-8 md:p-12 text-center">
          <h3 className="text-xl sm:text-2xl font-bold text-deep">Ready to launch your tech career?</h3>
          <p className="mt-3 text-sm sm:text-base text-deep/70 max-w-xl mx-auto">
            Book a free 1-on-1 counseling session with our senior mentors across our Vijay Nagar, Bhawarkua, or Annapurna campuses.
          </p>
          <div className="mt-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center justify-center gap-2.5 sm:gap-4 w-full sm:w-auto">
            <Link
              href="/courses"
              className="rounded-full bg-deep px-7 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-paper text-center transition-all hover:bg-brand w-full sm:w-auto"
            >
              Explore Job-Oriented Courses
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-deep/20 bg-paper px-7 py-3 sm:px-8 sm:py-3.5 text-xs sm:text-sm font-semibold text-deep text-center transition-all hover:border-brand w-full sm:w-auto"
            >
              Contact Counselors
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

