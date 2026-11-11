import type { Metadata } from "next";
import Link from "next/link";
import { SITE } from "@/lib/content";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Which Programming Language to Learn First in 2026? | The Prime Step",
  description:
    "Confused between Python, Java, C++, and JavaScript? Compare learning difficulty, job demand, and starting salary in Indore to pick your ideal first coding language.",
  alternates: {
    canonical: `${SITE.url}/blog/best-programming-languages-to-learn`,
  },
  openGraph: {
    title: "Which Programming Language to Learn First in 2026? | The Prime Step",
    description: "Honest comparison of Python, Java, JavaScript, and C++ for beginner coders.",
    url: `${SITE.url}/blog/best-programming-languages-to-learn`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "article",
  },
};

export default function BestProgrammingLanguagesToLearnPage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: "Which Programming Language to Learn First in 2026? (Python vs Java vs JavaScript)",
    description: "Beginner programming language comparison by difficulty, enterprise hiring, and salaries in 2026.",
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
    datePublished: "2024-01-10T00:00:00+05:30",
    dateModified: "2026-01-10T00:00:00+05:30",
    mainEntityOfPage: `${SITE.url}/blog/best-programming-languages-to-learn`,
  };

  return (
    <PageShell
      title="Which Programming Language to Learn First in 2026?"
      eyebrow="Programming Foundations · Career Guide"
      lead="Choosing your first coding language is one of the most critical decisions of your engineering journey. Here is an honest, data-backed comparison to help you choose the right path."
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <article className="mx-auto max-w-3xl space-y-10 text-deep">
        <div className="flex items-center gap-4 text-xs font-semibold text-deep/60 border-b border-pale pb-4">
          <span>By The Prime Step Academic Council</span>
          <span>•</span>
          <span>Updated for 2026</span>
          <span>•</span>
          <span>8 min read</span>
        </div>

        <section className="space-y-4 text-base md:text-lg leading-relaxed text-deep/80">
          <p>
            Every week at our Vijay Nagar and Bhawarkua campuses in Indore, college freshmen and career-switchers ask our counselors: <em>&ldquo;Sir, should I start with Python or Java? Is C++ still relevant in 2026? What about JavaScript?&rdquo;</em>
          </p>
          <p>
            The truth is that every major language serves a unique purpose in the technology ecosystem. The best language for you depends entirely on what kind of software you want to build and where you want to work.
          </p>
        </section>

        {/* 1. Python */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            1. Python: The King of AI, Data Science & Clean Syntax
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            Python reads almost like plain English. Because you don&apos;t have to worry about complex curly braces or memory pointers right away, you can focus purely on developing computational logic and problem-solving habits.
          </p>
          <div className="rounded-2xl border border-pale bg-soft p-5 space-y-2">
            <p className="text-xs font-bold text-brand uppercase tracking-wider">Best Suited For:</p>
            <p className="text-sm font-semibold text-deep">Artificial Intelligence, Machine Learning, Data Analytics, Backend APIs (FastAPI/Django), and Automation.</p>
            <p className="text-xs text-deep/60">Recommendation: Perfect if you want to enter AI or Data Science, or if you get intimidated by heavy syntax.</p>
          </div>
        </section>

        {/* 2. Java */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            2. Java: The Backbone of Enterprise & High-Paying Banking IT
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            Java is strictly typed and teaches deep Object-Oriented Programming (OOP) discipline. Virtually every major bank (HDFC, ICICI, SBI), IT services giant (TCS, Infosys, Wipro, Cognizant), and fintech enterprise runs on Spring Boot microservices.
          </p>
          <div className="rounded-2xl border border-pale bg-soft p-5 space-y-2">
            <p className="text-xs font-bold text-brand uppercase tracking-wider">Best Suited For:</p>
            <p className="text-sm font-semibold text-deep">Enterprise Backend Engineering, Spring Boot Microservices, Large Distributed Cloud Architectures.</p>
            <p className="text-xs text-deep/60">Recommendation: Choose Java if your dream is a high-stability, long-term engineering career with top MNCs and fintech firms.</p>
          </div>
        </section>

        {/* 3. JavaScript / TypeScript */}
        <section className="space-y-4">
          <h2 className="text-2xl md:text-3xl font-bold text-deep">
            3. JavaScript & TypeScript: The Language of the Web
          </h2>
          <p className="text-base text-deep/80 leading-relaxed">
            If you want to build websites, mobile apps, SaaS startups, or full-stack products, JavaScript (with React and Node.js) is non-negotiable. It is the only language that runs natively in every web browser in the world.
          </p>
        </section>

        {/* Comparison Summary Table */}
        <section className="space-y-4">
          <h2 className="text-2xl font-bold text-deep">Summary Comparison Matrix</h2>
          <div className="overflow-x-auto rounded-2xl border border-pale">
            <table className="w-full text-left text-sm">
              <thead className="bg-soft text-xs uppercase tracking-wider text-deep/60 border-b border-pale">
                <tr>
                  <th className="p-3">Language</th>
                  <th className="p-3">Learning Curve</th>
                  <th className="p-3">Primary Job Roles</th>
                  <th className="p-3">Indore Fresher Package</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-pale text-deep/80">
                <tr>
                  <td className="p-3 font-bold text-deep">Python</td>
                  <td className="p-3 text-emerald-600 font-semibold">Easy / Gentle</td>
                  <td className="p-3">Data Analyst, AI Engineer, Backend Dev</td>
                  <td className="p-3">₹3.5 – ₹6.0 LPA</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-deep">Java</td>
                  <td className="p-3 text-amber-600 font-semibold">Moderate / Rigorous</td>
                  <td className="p-3">Enterprise Java Dev, Backend Microservices</td>
                  <td className="p-3">₹4.0 – ₹7.5 LPA</td>
                </tr>
                <tr>
                  <td className="p-3 font-bold text-deep">JavaScript</td>
                  <td className="p-3 text-blue-600 font-semibold">Moderate</td>
                  <td className="p-3">MERN Full Stack, Frontend React Dev</td>
                  <td className="p-3">₹3.6 – ₹6.5 LPA</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* Explore Links */}
        <div className="rounded-3xl border border-brand/30 bg-soft p-8 text-center space-y-4">
          <h3 className="text-2xl font-bold text-deep">Ready to start coding?</h3>
          <p className="text-sm text-deep/70 max-w-lg mx-auto">
            Attend a free 2-day hands-on programming demo class in Python, Java, or MERN Stack at The Prime Step.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Link
              href="/python-programming-classes"
              className="rounded-full bg-deep px-6 py-3 text-sm font-semibold text-paper transition-all hover:bg-brand"
            >
              Python Classes in Indore →
            </Link>
            <Link
              href="/java-full-stack-developer"
              className="rounded-full border border-deep/20 bg-paper px-6 py-3 text-sm font-semibold text-deep transition-all hover:border-brand"
            >
              Java Full Stack Course →
            </Link>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

