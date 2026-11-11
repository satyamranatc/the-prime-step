import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Top Digital Marketing Careers & Roles You Need to Know (2026 Guide) | The Prime Step",
  description:
    "Explore the most lucrative digital marketing careers in 2026. From Performance Marketing to SEO and AI-driven growth strategies, discover skills and salaries in Indore.",
  alternates: {
    canonical: `${SITE.url}/blog/top-digital-marketing-careers`,
  },
  openGraph: {
    title: "Top Digital Marketing Careers in 2026 | The Prime Step Indore",
    description: "Guide to high-demand digital marketing roles, salaries, and practical skills.",
    url: `${SITE.url}/blog/top-digital-marketing-careers`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "article",
  },
};

export default function TopDigitalMarketingCareersPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Top Digital Marketing Careers & Roles You Need to Know (2026 Guide)",
    description: "Comprehensive guide to high-demand digital marketing careers and salaries in 2026.",
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
    datePublished: "2024-01-15T00:00:00+05:30",
    dateModified: "2026-01-10T00:00:00+05:30",
    mainEntityOfPage: `${SITE.url}/blog/top-digital-marketing-careers`,
  };

  return (
    <PageShell
      title="Top Digital Marketing Careers & Roles You Need to Know (2026 Guide)"
      eyebrow="Career Roadmaps · Digital Marketing"
      lead="The digital marketing landscape has transformed dramatically with AI, programmatic advertising, and data analytics. Here is your roadmap to the highest-demand marketing roles in 2026."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-3xl space-y-10 text-deep">
        <div className="flex items-center gap-4 text-xs font-semibold text-deep/60 border-b border-pale pb-4">
          <span>Published by The Prime Step Faculty</span>
          <span>•</span>
          <span>Updated for 2026</span>
          <span>•</span>
          <span>6 min read</span>
        </div>

        <section className="space-y-4 text-base md:text-lg leading-relaxed text-deep/80">
          <p>
            Businesses across India spent over ₹50,000 crores on digital advertising last year, surpassing traditional television and print media. In Indore alone, over 400+ tech agencies, e-commerce brands, real estate conglomerates, and direct-to-consumer (D2C) startups are constantly looking for trained digital marketing specialists.
          </p>
          <p>
            However, digital marketing in 2026 is no longer just about posting a picture on social media. Modern marketing requires data analytics, conversion rate optimization (CRO), search engine algorithms, and AI workflow integration.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            1. Performance Marketing & Paid Ads Specialist (Meta & Google Ads)
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            Performance marketers manage large ad budgets across Google Search, YouTube, Meta (Instagram/Facebook), and LinkedIn. Their focus is return on ad spend (ROAS) and customer acquisition cost (CAC).
          </p>
          <div className="rounded-2xl border border-pale bg-soft p-5 space-y-2">
            <p className="text-sm font-bold text-deep">Key Competencies:</p>
            <p className="text-xs text-deep/70">Google Ads bidding strategies, Meta Pixel conversion tracking, A/B creative testing, Google Analytics 4 (GA4), funnel optimization.</p>
            <p className="text-xs font-semibold text-brand">Starting Salary in Indore: ₹3.5 LPA – ₹6.5 LPA</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            2. Technical SEO & AI Search Specialist
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            With Google deploying Search Generative Experience (SGE) and AI Overviews, technical SEO specialists ensure that websites rank #1 for high-intent transactional search queries.
          </p>
          <div className="rounded-2xl border border-pale bg-soft p-5 space-y-2">
            <p className="text-sm font-bold text-deep">Key Competencies:</p>
            <p className="text-xs text-deep/70">Core Web Vitals optimization, Schema.org structured data, programmatic SEO, backlink authority architecture, Google Search Console deep audits.</p>
            <p className="text-xs font-semibold text-brand">Starting Salary in Indore: ₹3.0 LPA – ₹5.5 LPA</p>
          </div>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            3. Social Media Strategist & Brand Storyteller
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            Brand perception is driven by short-form video (Reels, Shorts) and community engagement. Social media strategists translate company missions into viral, engaging visual stories.
          </p>
        </section>

        <section className="space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            How The Prime Step Prepares You for Real-World Marketing Roles
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            Unlike theoretical coaching institutes, students at The Prime Step run real ad campaigns with actual budgets, set up live Google Analytics tracking, audit active websites, and learn directly from marketing heads.
          </p>
        </section>

        {/* Course Link CTA */}
        <div className="rounded-3xl border border-brand/30 bg-soft p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-deep">Ready to become a certified digital marketer?</h3>
          <p className="text-sm text-deep/70 max-w-lg mx-auto">
            Explore our job-ready Digital Marketing Course in Indore with 100% placement assistance and live campaign budgets.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/digital-marketing-course-in-indore"
              className="rounded-full bg-deep px-8 py-3 text-sm font-semibold text-paper transition-all hover:bg-brand"
            >
              View Digital Marketing Course Syllabus →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

