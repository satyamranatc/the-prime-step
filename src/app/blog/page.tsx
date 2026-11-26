import type { Metadata } from "next";
import Image from "next/image";
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

function EditorialBlogCard({
  href,
  category,
  date,
  readingTime,
  title,
  excerpt,
  author,
  featured = false,
}: {
  href: string;
  category: string;
  date: string;
  readingTime: string;
  title: string;
  excerpt: string;
  author: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`group flex flex-col justify-between rounded-3xl border border-hairline bg-paper transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:shadow-[0_20px_50px_-24px_rgba(14,110,107,0.22)] ${
        featured ? "p-6 sm:p-9 md:col-span-2" : "p-6 sm:p-7"
      }`}
    >
      <div>
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-ink-subtle">
          <span className="rounded-full border border-brand/20 bg-accent-soft px-3 py-0.5 text-[11px] font-semibold text-brand">
            {category}
          </span>
          <span aria-hidden="true">·</span>
          <span>{date}</span>
          <span aria-hidden="true">·</span>
          <span>{readingTime}</span>
        </div>

        <h2
          className={`display mt-4 font-bold tracking-tight text-ink transition-colors group-hover:text-brand ${
            featured
              ? "text-2xl sm:text-3xl md:text-[2rem]"
              : "text-xl sm:text-[1.35rem]"
          }`}
        >
          <Link href={href}>{title}</Link>
        </h2>

        <p
          className={`mt-3 leading-relaxed text-ink-muted ${
            featured ? "max-w-3xl text-sm sm:text-base" : "text-sm"
          }`}
        >
          {excerpt}
        </p>
      </div>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-hairline pt-4">
        <div className="flex items-center gap-2">
          <span className="grid size-7 place-items-center rounded-full bg-brand/10 text-[10px] font-bold text-brand">
            TPS
          </span>
          <span className="text-xs font-medium text-ink-subtle">{author}</span>
        </div>
        <Link
          href={href}
          className="inline-flex items-center gap-1 text-xs font-semibold text-brand transition-transform group-hover:translate-x-0.5"
        >
          <span>Read article</span>
          <span aria-hidden="true">→</span>
        </Link>
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
        <EditorialBlogCard
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
  const [leadPost, ...restStaticPosts] = STATIC_BLOG_POSTS;

  return (
    <PageShell>
      {/* Centered Aceternity-style Editorial Masthead */}
      <section className="mx-auto max-w-5xl pt-[calc(5.25rem+env(safe-area-inset-top))] sm:pt-32">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-brand/20 bg-accent-soft px-3.5 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-brand">
            The Prime Step Editorial
          </span>
          <h1 className="display mt-4 text-[clamp(2.1rem,5vw,3.5rem)] font-bold text-ink">
            Technology &amp; Career Insights
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
            Practical roadmaps, programming guides, salary benchmarks, and hands-on tutorials written by senior faculty across our Indore campuses.
          </p>
        </div>

        {/* Centered Editorial Cover Strip */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-hairline bg-[#071618] shadow-[0_24px_60px_-28px_rgba(11,18,21,0.3)]">
          <div className="relative aspect-[21/9] min-h-[200px] w-full">
            <Image
              src="/brand/tps-mentor-classroom.jpg"
              alt="The Prime Step Indore faculty mentoring students on real tech projects"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover opacity-55"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061315] via-[#061315]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex flex-col justify-between gap-3 p-5 text-white sm:flex-row sm:items-end sm:p-8">
              <div>
                <span className="font-mono text-[10.5px] font-semibold uppercase tracking-widest text-[#5eead4]">
                  Indore Tech Career Guides · 2026
                </span>
                <p className="mt-1 max-w-xl text-sm font-medium text-white/90 sm:text-base">
                  Written by practitioners teaching Java Full Stack, MERN, Python AI, Data Analytics, and Power BI daily.
                </p>
              </div>
              <Link
                href="/courses"
                className="inline-flex min-h-[40px] shrink-0 items-center justify-center rounded-full bg-white px-5 text-xs font-semibold text-ink transition-colors hover:bg-[#edf7f6] hover:text-brand"
              >
                Explore 15 Courses →
              </Link>
            </div>
          </div>
        </div>

        {/* Editorial Grid (CMS Published Posts + Featured & Static SEO Posts) */}
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <Suspense fallback={null}>
            <CmsPublishedBlogCards />
          </Suspense>

          {leadPost && (
            <EditorialBlogCard
              href={leadPost.href}
              category={leadPost.category}
              date={leadPost.date}
              readingTime={leadPost.readingTime}
              title={leadPost.title}
              excerpt={leadPost.excerpt}
              author="The Prime Step Faculty"
              featured
            />
          )}

          {restStaticPosts.map((post) => (
            <EditorialBlogCard
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
        <div className="mt-14 rounded-3xl border border-brand/20 bg-canvas p-6 text-center sm:p-10">
          <h2 className="display text-2xl font-bold text-ink sm:text-3xl">
            Ready to turn these roadmaps into a job offer?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm text-ink-muted sm:text-base">
            Book a free 2-day hands-on lab demo across our Vijay Nagar, Bhawarkua, or Annapurna campuses in Indore.
          </p>
          <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
            <Link
              href="/courses"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-ink px-7 text-xs font-semibold text-white transition-colors hover:bg-brand sm:text-sm"
            >
              Explore Job-Oriented Courses
            </Link>
            <Link
              href="/contact-us"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full border border-hairline bg-paper px-7 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand sm:text-sm"
            >
              Book Free Counseling
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
