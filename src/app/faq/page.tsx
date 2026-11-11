import type { Metadata } from "next";
import Link from "next/link";
import { SITE, BRANCHES } from "@/lib/content";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Frequently Asked Questions (FAQ) | The Prime Step Indore",
  description:
    "Find clear answers regarding IT courses, admission eligibility, 100% placement assistance, fee EMI options, and lab timings across Vijay Nagar, Bhawarkua & Annapurna campuses.",
  alternates: {
    canonical: `${SITE.url}/faq`,
  },
  openGraph: {
    title: "Frequently Asked Questions (FAQ) | The Prime Step Indore",
    description:
      "Find clear answers regarding IT courses, admission eligibility, 100% placement assistance, fee EMI options, and lab timings across Vijay Nagar, Bhawarkua & Annapurna campuses.",
    url: `${SITE.url}/faq`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
};

const CATEGORIZED_FAQS = [
  {
    category: "Admissions & Eligibility",
    questions: [
      {
        q: "Do I need a prior computer science or engineering background to join?",
        a: "No prior technical or coding experience is required. All foundation courses start from absolute bedrock fundamentals (typing your first line of code, understanding logic step by step). Many of our most successful alumni transitioned from non-IT backgrounds like B.Com, B.Sc, BA, or 12th standard.",
      },
      {
        q: "Can I attend a free demo class before enrolling?",
        a: "Yes! The Prime Step offers 2-day free demo sessions at our Vijay Nagar (Shagun Tower), Bhawarkua (Indrapuri), and Annapurna campuses. You can sit with the mentors, experience the practical lab teaching method, and evaluate our teaching standards before making any payment.",
      },
      {
        q: "What is the minimum qualification required to enroll?",
        a: "Anyone from school students (10th/12th), college undergraduates (BCA, B.Tech, B.Com, B.Sc), postgraduates, working professionals, and job seekers can join our skill development programs.",
      },
    ],
  },
  {
    category: "Courses & Lab Training",
    questions: [
      {
        q: "What is the daily schedule and how much time is spent on practical coding?",
        a: "A standard batch consists of 1 hour of interactive concept lecture followed by 2 hours of mandatory hands-on practical lab work under dedicated faculty supervision. Labs remain accessible for extended practice.",
      },
      {
        q: "How does 1-on-1 doubt clearing work during lab sessions?",
        a: "Our computer labs have dedicated teaching assistants and senior mentors present continuously. The moment you encounter a syntax error, bug, or conceptual confusion, an instructor assists you directly at your workstation.",
      },
      {
        q: "Are the courses aligned with the latest 2026 industry requirements?",
        a: "Yes. Our curricula are reviewed quarterly with senior tech leads in Indore and Pune. We train on modern stacks including React 19, Next.js, Spring Boot 3, Python 3.12, and Microsoft 365 / Excel 2021.",
      },
    ],
  },
  {
    category: "Fees, Installments & Scholarships",
    questions: [
      {
        q: "Are interest-free monthly installment (EMI) options available?",
        a: "Yes. We offer zero-interest flexible monthly installment options so students and families can comfortably manage course fees throughout the training duration without financial stress.",
      },
      {
        q: "Are there any hidden costs for lab usage, study materials, or exams?",
        a: "None. All software licenses, lab access, physical workstations, notes, interview question banks, and certificate examination fees are fully inclusive in the course fee.",
      },
    ],
  },
  {
    category: "Placements & Career Support",
    questions: [
      {
        q: "What does your 100% Placement Assistance include?",
        a: "Our dedicated Career Placement Cell provides comprehensive support: GitHub portfolio curation, professional resume writing, regular technical mock interviews, behavioral HR prep, and direct interview drives with our network of 120+ IT companies and recruiting partners across Indore, Bhopal, Pune, and remote teams.",
      },
      {
        q: "What happens if I miss a lecture due to exams or illness?",
        a: "You are given complete backup sessions! Mentors provide 1-on-1 revision in the computer labs, ensuring you never lag behind your syllabus.",
      },
      {
        q: "Do I receive a verifiable certificate after course completion?",
        a: "Yes. Upon completing your course and submitting your capstone project, you receive an ISO-aligned certificate of completion with a verifiable unique credential ID for your LinkedIn profile and resume.",
      },
    ],
  },
];

export default function FAQPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: CATEGORIZED_FAQS.flatMap((cat) =>
      cat.questions.map((item) => ({
        "@type": "Question",
        name: item.q,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.a,
        },
      }))
    ),
  };

  return (
    <PageShell
      title="Frequently Asked Questions"
      eyebrow="Help & Admissions Center"
      lead="Everything you need to know about course admissions, practical lab schedules, fee installments, certifications, and placement assistance across our Indore campuses."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="mx-auto max-w-4xl space-y-16">
        {CATEGORIZED_FAQS.map((category) => (
          <div key={category.category} className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight text-deep border-b border-pale pb-3">
              {category.category}
            </h2>

            <div className="space-y-4">
              {category.questions.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-2xl border border-pale/70 bg-paper p-6 transition-all open:border-brand/40 open:shadow-sm"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between text-base md:text-lg font-semibold text-deep group-open:text-brand">
                    <span>{faq.q}</span>
                    <span className="ml-4 transition-transform group-open:rotate-180 text-brand">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/75">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        ))}

        {/* Instant Assistance Card */}
        <div className="rounded-3xl border border-brand/20 bg-soft p-8 md:p-12 text-center">
          <h3 className="text-2xl font-bold text-deep">Have a specific question not listed here?</h3>
          <p className="mt-3 text-base text-deep/70 max-w-xl mx-auto">
            Our student academic counselors are available daily from 8:00 AM to 8:00 PM across all three Indore campuses.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={SITE.phoneHref}
              className="rounded-full bg-deep px-8 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand"
            >
              Call {SITE.phoneDisplay}
            </a>
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-deep/20 bg-paper px-8 py-3.5 text-sm font-semibold text-deep transition-all hover:border-brand hover:text-brand"
            >
              Chat on WhatsApp
            </a>
            <Link
              href="/contact-us"
              className="rounded-full border border-pale bg-paper px-8 py-3.5 text-sm font-semibold text-deep/80 transition-all hover:border-brand"
            >
              Visit a Campus
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

