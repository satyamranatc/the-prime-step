import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { SITE } from "@/lib/content";
import { getPublishedCmsBlogPostBySlug } from "@/lib/blog";
import PageShell from "@/components/pages/PageShell";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedCmsBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: { index: false, follow: false },
    };
  }

  const canonical = `${SITE.url}/blog/${post.slug}`;
  const title = post.metaTitle || post.title;
  const description = post.metaDescription || post.excerpt;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: canonical,
      siteName: SITE.name,
      locale: "en_IN",
      type: "article",
      publishedTime: post.publishedAt || post.createdAt,
      modifiedTime: post.updatedAt,
    },
  };
}

function renderArticleBlocks(content: string) {
  const blocks = content
    .split(/\n{2,}/)
    .map((b) => b.trim())
    .filter(Boolean);

  return blocks.map((block, idx) => {
    if (block.startsWith("### ")) {
      return (
        <h3
          key={idx}
          className="display mt-8 text-xl font-bold tracking-tight text-ink sm:text-2xl"
        >
          {block.slice(4).trim()}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2
          key={idx}
          className="display mt-12 border-t border-hairline pt-8 text-2xl font-bold tracking-tight text-ink sm:text-[1.75rem]"
        >
          {block.slice(3).trim()}
        </h2>
      );
    }
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
      return (
        <ul
          key={idx}
          className="my-5 space-y-2.5 rounded-2xl border border-hairline bg-canvas p-5 text-[15px] leading-[1.75] text-ink-muted sm:p-6 sm:text-base"
        >
          {lines.map((line, i) => (
            <li key={i} className="flex items-start gap-2.5">
              <span
                aria-hidden="true"
                className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand"
              />
              <span>{line.slice(2).trim()}</span>
            </li>
          ))}
        </ul>
      );
    }
    return (
      <p
        key={idx}
        className="my-5 text-[15.5px] leading-[1.82] text-ink-muted sm:text-[17px]"
      >
        {block}
      </p>
    );
  });
}

async function CmsBlogArticleBody({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedCmsBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const canonical = `${SITE.url}/blog/${post.slug}`;
  const publishedDate = new Date(
    post.publishedAt || post.createdAt,
  ).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription || post.excerpt,
    author: {
      "@type": "Organization",
      name: post.author || SITE.name,
    },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: SITE.url,
    },
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt,
    mainEntityOfPage: canonical,
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: SITE.url },
      { "@type": "ListItem", position: 2, name: "Blog", item: `${SITE.url}/blog` },
      { "@type": "ListItem", position: 3, name: post.title, item: canonical },
    ],
  };

  return (
    <PageShell>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleLd).replace(/</g, "\\u003c"),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbLd).replace(/</g, "\\u003c"),
        }}
      />

      {/* Aceternity-inspired Blog Content Centered Layout */}
      <article className="mx-auto max-w-4xl pt-[calc(5.25rem+env(safe-area-inset-top))] sm:pt-32">
        {/* Centered Header */}
        <header className="mx-auto max-w-3xl text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-ink-subtle transition-colors hover:text-brand"
          >
            <span aria-hidden="true">←</span>
            <span>Back to all articles</span>
          </Link>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-2 text-xs font-medium text-ink-subtle">
            <span className="rounded-full border border-brand/20 bg-accent-soft px-3 py-0.5 text-[11px] font-semibold text-brand">
              {post.category}
            </span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt || post.createdAt}>{publishedDate}</time>
          </div>

          <h1 className="display mt-4 text-[clamp(1.9rem,4.6vw,3.15rem)] font-bold leading-[1.12] text-ink">
            {post.title}
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-muted sm:text-lg">
            {post.excerpt}
          </p>

          {/* Author Pill */}
          <div className="mt-6 inline-flex items-center gap-2.5 rounded-full border border-hairline bg-canvas px-3.5 py-1.5">
            <span className="grid size-7 place-items-center rounded-full bg-brand text-[10px] font-bold text-white">
              TPS
            </span>
            <div className="text-left">
              <div className="text-xs font-semibold text-ink">{post.author}</div>
              <div className="text-[10.5px] text-ink-subtle">The Prime Step · Indore</div>
            </div>
          </div>
        </header>

        {/* Centered Editorial Cover Banner */}
        <div className="relative mt-10 overflow-hidden rounded-3xl border border-hairline bg-[#071618] shadow-[0_24px_60px_-28px_rgba(11,18,21,0.28)]">
          <div className="relative aspect-[16/9] w-full">
            <Image
              src="/brand/tps-practical-lab.jpg"
              alt={post.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#061315]/55 via-transparent to-transparent" />
          </div>
        </div>

        {/* Centered Reading Prose Column */}
        <div className="mx-auto mt-10 max-w-2xl">
          {renderArticleBlocks(post.content)}

          {/* Bottom Conversion Card */}
          <div className="mt-14 rounded-3xl border border-brand/20 bg-canvas p-6 text-center sm:p-8">
            <span className="eyebrow text-brand">Free 2-Day Lab Demo</span>
            <h2 className="display mt-2 text-2xl font-bold text-ink">
              Want hands-on lab training in Indore?
            </h2>
            <p className="mx-auto mt-2 max-w-lg text-sm text-ink-muted">
              Experience live coding sessions with senior mentors at our Vijay Nagar, Bhawarkua, or Annapurna campus.
            </p>
            <div className="mt-6 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center">
              <Link
                href="/courses"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full bg-ink px-6 text-xs font-semibold text-white transition-colors hover:bg-brand"
              >
                Explore All 15 Courses
              </Link>
              <Link
                href="/contact-us"
                className="inline-flex min-h-[44px] items-center justify-center rounded-full border border-hairline bg-paper px-6 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                Book Free Demo
              </Link>
            </div>
          </div>
        </div>
      </article>
    </PageShell>
  );
}

export default function DynamicBlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-3xl px-4 py-28">
          <div className="mx-auto h-8 w-2/3 animate-pulse rounded bg-hairline/60" />
          <div className="mt-6 aspect-[16/9] animate-pulse rounded-3xl bg-hairline/40" />
        </div>
      }
    >
      <CmsBlogArticleBody params={params} />
    </Suspense>
  );
}
