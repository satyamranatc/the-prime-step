import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { SITE } from "@/lib/content";
import { getPublishedCmsBlogPosts, STATIC_BLOG_POSTS } from "@/lib/blog";
import PageShell from "@/components/pages/PageShell";

export const metadata: Metadata = {
  title: "Tech Career & Skills Blog",
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

function BlogCard({
  href,
  category,
  date,
  readingTime,
  title,
  excerpt,
  author,
}: {
  href: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
}) {
  return (
    <article className="group flex flex-col justify-between rounded-3xl border border-pale/80 bg-paper p-5 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg sm:p-8">
      <div className="space-y-4">
        <div className="flex flex-wrap items-center gap-2 text-xs font-semibold sm:gap-3">
          <span className="rounded-full bg-soft px-3 py-1 text-brand">
            {category}
          </span>
          <span className="text-deep/50">•</span>
          <span className="text-deep/60">{date}</span>
          <span className="text-deep/50">•</span>
          <span className="text-deep/60">{readingTime}</span>
        </div>

        <h2 className="break-words text-xl font-bold tracking-tight text-deep transition-colors group-hover:text-brand sm:text-2xl md:text-3xl">
          <Link href={href}>{title}</Link>
        </h2>

        <p className="text-sm leading-relaxed text-deep/75 sm:text-base">
          {excerpt}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-2 border-t border-pale pt-4">
        <Link
          href={href}
          className="flex items-center gap-1 text-sm font-semibold text-brand group-hover:underline"
        >
          Read Full Article <span>→</span>
        </Link>
        <span className="text-xs font-medium text-deep/50">By {author}</span>
      </div>
    </article>
  );
}

async function CmsPublishedBlogCards() {
  await connection();
  const cmsPosts = await getPublishedCmsBlogPosts();
  if (cmsPosts.length === 0) return null;

  return (
    <>
      {cmsPosts.map((post) => (
        <BlogCard
          key={post.id}
          href={`/blog/${post.slug}`}
          category={post.category}
          date={new Date(post.publishedAt || post.createdAt).toLocaleDateString(
            "en-IN",
            { day: "numeric", month: "short", year: "numeric" },
          )}
          readingTime={post.readingTime}
          title={post.title}
          excerpt={post.excerpt}
          author={post.author}
        />
      ))}
    </>
  );
}

export default function BlogListingPage() {
  return (
    <PageShell
      title="Technology & Career Insights"
      eyebrow="The Prime Step Editorial"
      lead="Practical guides, programming tutorials, industry trends, and career roadmaps designed to help students and professionals build high-growth tech careers in Indore and beyond."
    >
      <section className="mx-auto max-w-4xl space-y-8 sm:space-y-10">
        <div className="grid gap-6 sm:gap-8">
          <Suspense fallback={null}>
            <CmsPublishedBlogCards />
          </Suspense>

          {STATIC_BLOG_POSTS.map((post) => (
            <BlogCard
              key={post.slug}
              href={post.href}
              category={post.category}
              date={post.date}
              readingTime={post.readingTime}
              title={post.title}
              excerpt={post.excerpt}
              author="The Prime Step Faculty"
            />
          ))}
        </div>

        {/* Career Counseling CTA */}
        <div className="rounded-3xl border border-brand/20 bg-soft p-5 text-center sm:p-8 md:p-12">
          <h3 className="text-xl font-bold text-deep sm:text-2xl">
            Ready to launch your tech career?
          </h3>
          <p className="mx-auto mt-3 max-w-xl text-sm text-deep/70 sm:text-base">
            Book a free 1-on-1 counseling session with our senior mentors across our Vijay Nagar, Bhawarkua, or Annapurna campuses.
          </p>
          <div className="mt-6 flex w-full flex-col flex-wrap items-stretch justify-center gap-2.5 sm:w-auto sm:flex-row sm:items-center sm:gap-4">
            <Link
              href="/courses"
              className="w-full rounded-full bg-deep px-7 py-3 text-center text-xs font-semibold text-paper transition-all hover:bg-brand sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Explore Job-Oriented Courses
            </Link>
            <Link
              href="/contact-us"
              className="w-full rounded-full border border-deep/20 bg-paper px-7 py-3 text-center text-xs font-semibold text-deep transition-all hover:border-brand sm:w-auto sm:px-8 sm:py-3.5 sm:text-sm"
            >
              Contact Counselors
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
