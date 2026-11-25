import type { Metadata } from "next";
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
  const blocks = content.split(/\n{2,}/).map((b) => b.trim()).filter(Boolean);

  return blocks.map((block, idx) => {
    if (block.startsWith("### ")) {
      return (
        <h3 key={idx} className="mt-7 text-xl font-bold tracking-tight text-deep">
          {block.slice(4).trim()}
        </h3>
      );
    }
    if (block.startsWith("## ")) {
      return (
        <h2 key={idx} className="mt-10 text-2xl font-bold tracking-tight text-deep">
          {block.slice(3).trim()}
        </h2>
      );
    }
    const lines = block.split("\n").map((l) => l.trim()).filter(Boolean);
    if (lines.every((l) => l.startsWith("- ") || l.startsWith("* "))) {
      return (
        <ul key={idx} className="my-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-deep/80">
          {lines.map((line, i) => (
            <li key={i}>{line.slice(2).trim()}</li>
          ))}
        </ul>
      );
    }
    return (
      <p key={idx} className="my-4 text-base leading-relaxed text-deep/80">
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
  const publishedDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString(
    "en-IN",
    { day: "numeric", month: "long", year: "numeric" },
  );

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
    <PageShell
      title={post.title}
      eyebrow={`${post.category} · ${post.readingTime}`}
      lead={post.excerpt}
    >
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

      <article className="mx-auto max-w-3xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-2 border-b border-pale pb-4 text-xs font-medium text-deep/60">
          <span>By {post.author}</span>
          <span>Published {publishedDate}</span>
        </div>

        <div className="prose-prime">{renderArticleBlocks(post.content)}</div>

        <div className="mt-12 rounded-3xl border border-brand/20 bg-soft p-6 text-center sm:p-8">
          <h2 className="text-xl font-bold text-deep">
            Want hands-on lab training in Indore?
          </h2>
          <p className="mt-2 text-sm text-deep/75">
            Attend a free 2-day demo class at our Vijay Nagar, Bhawarkua, or Annapurna campus.
          </p>
          <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/courses"
              className="rounded-full bg-deep px-6 py-2.5 text-xs font-semibold text-paper transition-colors hover:bg-brand"
            >
              Explore All 15 Courses
            </Link>
            <Link
              href="/contact-us"
              className="rounded-full border border-deep/20 bg-paper px-6 py-2.5 text-xs font-semibold text-deep transition-colors hover:border-brand"
            >
              Book Free Demo
            </Link>
            <Link
              href="/blog"
              className="text-xs font-semibold text-brand hover:underline"
            >
              ← Back to Blog
            </Link>
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
        <div className="mx-auto max-w-3xl px-4 py-24">
          <div className="h-8 w-2/3 animate-pulse rounded bg-pale/60" />
          <div className="mt-6 h-48 animate-pulse rounded-2xl bg-pale/40" />
        </div>
      }
    >
      <CmsBlogArticleBody params={params} />
    </Suspense>
  );
}
