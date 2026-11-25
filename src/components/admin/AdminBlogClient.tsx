"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "./AdminShell";
import { BLOG_CATEGORIES, type AdminBlogPostItem } from "@/lib/admin/types";
import { slugifyBlogTitle } from "@/lib/admin/validation";
import { STATIC_BLOG_POSTS } from "@/lib/blogStatic";

export default function AdminBlogClient({
  adminId,
  dbConfigured,
}: {
  adminId: string;
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState<AdminBlogPostItem[]>([]);
  const [filter, setFilter] = useState<"all" | "published" | "draft">("all");
  const [loading, setLoading] = useState(dbConfigured);
  const [error, setError] = useState<string | null>(
    dbConfigured ? null : "MONGODB_URI is not configured in environment variables.",
  );
  const [toast, setToast] = useState<string | null>(null);

  // Editor modal state
  const [editorOpen, setEditorOpen] = useState(false);
  const [editing, setEditing] = useState<AdminBlogPostItem | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [slugTouched, setSlugTouched] = useState(false);
  const [category, setCategory] = useState<string>(BLOG_CATEGORIES[0]);
  const [author, setAuthor] = useState("The Prime Step Faculty");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [published, setPublished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((prev) => (prev === msg ? null : prev)), 3200);
  }, []);

  const fetchPosts = useCallback(async () => {
    if (!dbConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/blog", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not load blog posts.");
      } else {
        setItems(json.items || []);
      }
    } catch {
      setError("Network error while loading blog posts.");
    } finally {
      setLoading(false);
    }
  }, [dbConfigured, router]);

  useEffect(() => {
    if (!dbConfigured) return;
    const t = window.setTimeout(() => {
      void fetchPosts();
    }, 0);
    return () => window.clearTimeout(t);
  }, [dbConfigured, fetchPosts]);

  const openCreate = () => {
    setEditing(null);
    setTitle("");
    setSlug("");
    setSlugTouched(false);
    setCategory(BLOG_CATEGORIES[0]);
    setAuthor("The Prime Step Faculty");
    setMetaTitle("");
    setMetaDescription("");
    setExcerpt("");
    setContent("## Introduction\n\nWrite your article here...\n\n## Key Takeaways\n\n- Practical point 1\n- Practical point 2");
    setPublished(false);
    setFormError(null);
    setEditorOpen(true);
  };

  const openEdit = (post: AdminBlogPostItem) => {
    setEditing(post);
    setTitle(post.title);
    setSlug(post.slug);
    setSlugTouched(true);
    setCategory(post.category);
    setAuthor(post.author);
    setMetaTitle(post.metaTitle);
    setMetaDescription(post.metaDescription);
    setExcerpt(post.excerpt);
    setContent(post.content);
    setPublished(post.published);
    setFormError(null);
    setEditorOpen(true);
  };

  const handleTitleChange = (nextTitle: string) => {
    setTitle(nextTitle);
    if (!slugTouched) {
      setSlug(slugifyBlogTitle(nextTitle));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);

    const payload = {
      title,
      slug: slug || slugifyBlogTitle(title),
      category,
      author,
      metaTitle: metaTitle || title,
      metaDescription: metaDescription || excerpt,
      excerpt,
      content,
      published,
    };

    try {
      const url = editing
        ? `/api/admin/blog/${encodeURIComponent(editing.id)}`
        : "/api/admin/blog";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        showToast(
          published
            ? "Article published & sitemap updated"
            : "Draft saved safely",
        );
        setEditorOpen(false);
        void fetchPosts();
      } else {
        setFormError(json.error || "Could not save blog post.");
      }
    } catch {
      setFormError("Network error while saving article.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleTogglePublish = async (post: AdminBlogPostItem) => {
    const res = await fetch(`/api/admin/blog/${encodeURIComponent(post.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ published: !post.published }),
    });
    if (res.ok) {
      showToast(post.published ? "Moved to Draft" : "Published live to /blog & sitemap.xml");
      void fetchPosts();
    }
  };

  const handleDelete = async (post: AdminBlogPostItem) => {
    if (!window.confirm(`Delete "${post.title}" permanently?`)) return;
    const res = await fetch(`/api/admin/blog/${encodeURIComponent(post.id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showToast("Article deleted");
      void fetchPosts();
    }
  };

  const visible = items.filter((p) => {
    if (filter === "published") return p.published;
    if (filter === "draft") return !p.published;
    return true;
  });

  const previewTitle = (metaTitle || title || "Your SEO Article Title").slice(0, 65);
  const previewDesc = (metaDescription || excerpt || "Your meta description preview for Google search results...").slice(0, 165);

  return (
    <AdminShell
      adminId={adminId}
      headerTitle="Blog CMS"
      headerAction={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-9 items-center rounded-full bg-[#0B1215] px-4 text-xs font-semibold text-white hover:opacity-90"
        >
          + New Article
        </button>
      }
    >
      {toast && (
        <div className="fixed right-5 bottom-5 z-50 rounded-[10px] bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-[#52606D]">
            Publish new SEO articles directly to <code className="font-mono text-xs">/blog</code> &amp; <code className="font-mono text-xs">/sitemap.xml</code> with full canonicals and Article JSON-LD. Your 5 existing static SEO posts remain 100% protected.
          </p>
        </div>
        <Link
          href="/blog"
          target="_blank"
          className="shrink-0 text-xs font-semibold text-[#0E6E6B] hover:underline"
        >
          View Public Blog ↗
        </Link>
      </div>

      {/* Filter Pills */}
      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            { key: "all", label: `CMS Articles (${items.length})` },
            { key: "published", label: `Published (${items.filter((i) => i.published).length})` },
            { key: "draft", label: `Drafts (${items.filter((i) => !i.published).length})` },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setFilter(tab.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              filter === tab.key
                ? "bg-[#0B1215] text-white"
                : "border border-[#E4E7EC] bg-white text-[#52606D] hover:text-[#0B1215]"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-[14px] border border-amber-200 bg-amber-50 p-4 text-xs font-medium text-amber-900">
          {error}
        </div>
      )}

      {/* CMS Articles List */}
      <div className="mt-5 overflow-hidden rounded-[20px] border border-[#EAEDF2] bg-white">
        {loading ? (
          <div className="p-8 text-center text-sm text-[#64748B]">Loading articles...</div>
        ) : visible.length === 0 ? (
          <div className="p-10 text-center">
            <p className="text-sm font-medium text-[#334155]">No CMS articles yet.</p>
            <p className="mt-1 text-xs text-[#64748B]">
              Click <strong>+ New Article</strong> to write and publish your first MongoDB-backed SEO blog post.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-[#F1F5F9]">
            {visible.map((post) => (
              <div
                key={post.id}
                className="flex flex-col justify-between gap-4 p-5 sm:flex-row sm:items-center"
              >
                <div className="min-w-0">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${
                        post.published
                          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700"
                          : "border-[#E4E7EC] bg-[#F8FAFC] text-[#64748B]"
                      }`}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                    <span className="text-xs font-medium text-[#0E6E6B]">{post.category}</span>
                    <span className="text-xs text-[#94A3B8]">·</span>
                    <span className="text-xs text-[#64748B]">{post.readingTime}</span>
                  </div>
                  <h2 className="mt-1.5 truncate text-base font-semibold text-[#0B1215]">
                    {post.title}
                  </h2>
                  <div className="mt-0.5 font-mono text-[11.5px] text-[#64748B]">
                    /blog/{post.slug}
                  </div>
                </div>

                <div className="flex shrink-0 flex-wrap items-center gap-2">
                  {post.published && (
                    <Link
                      href={`/blog/${post.slug}`}
                      target="_blank"
                      className="rounded-full border border-[#E4E7EC] bg-[#F8FAFC] px-3 py-1.5 text-xs font-semibold text-[#0B1215] hover:border-[#0B1215]"
                    >
                      View ↗
                    </Link>
                  )}
                  <button
                    type="button"
                    onClick={() => void handleTogglePublish(post)}
                    className="rounded-full border border-[#E4E7EC] px-3 py-1.5 text-xs font-semibold text-[#0E6E6B] hover:border-[#0E6E6B]"
                  >
                    {post.published ? "Unpublish" : "Publish"}
                  </button>
                  <button
                    type="button"
                    onClick={() => openEdit(post)}
                    className="rounded-full border border-[#E4E7EC] px-3 py-1.5 text-xs font-semibold text-[#0B1215] hover:border-[#0B1215]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(post)}
                    className="rounded-full border border-[#E4E7EC] px-3 py-1.5 text-xs font-semibold text-[#64748B] hover:border-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Existing Built-in Static SEO Articles (Protected Reference) */}
      <section className="mt-7 rounded-[20px] border border-[#EAEDF2] bg-white p-5 sm:p-6">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h2 className="text-sm font-semibold text-[#0B1215]">
              Built-in Static SEO Articles (5 Protected)
            </h2>
            <p className="text-xs text-[#64748B]">
              These existing ranked articles stay statically pre-rendered at their exact URLs and cannot be overwritten.
            </p>
          </div>
        </div>
        <div className="mt-4 divide-y divide-[#F1F5F9]">
          {STATIC_BLOG_POSTS.map((p) => (
            <div key={p.slug} className="flex items-center justify-between gap-3 py-2.5 text-xs">
              <div className="min-w-0">
                <div className="truncate font-semibold text-[#0B1215]">{p.title}</div>
                <div className="font-mono text-[11px] text-[#64748B]">{p.href}</div>
              </div>
              <Link
                href={p.href}
                target="_blank"
                className="shrink-0 font-semibold text-[#0E6E6B] hover:underline"
              >
                Live ↗
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* Create / Edit Modal */}
      {editorOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0B1215]/50 p-4 backdrop-blur-[2px]">
          <div className="max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-[22px] border border-[#E4E7EC] bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-[#0B1215]">
                {editing ? "Edit Blog Article" : "Write New SEO Blog Article"}
              </h2>
              <button
                type="button"
                onClick={() => setEditorOpen(false)}
                className="rounded-full px-2.5 py-1 text-xs font-semibold text-[#64748B] hover:bg-[#F1F5F9]"
              >
                Close ✕
              </button>
            </div>

            {formError && (
              <div className="mt-3 rounded-[10px] border border-red-200 bg-red-50 px-3.5 py-2.5 text-xs font-medium text-red-700">
                {formError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#475569]">
                  Article Title (H1) *
                </label>
                <input
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Best Java Full Stack Interview Questions for Freshers in Indore"
                  className="mt-1 h-10 w-full rounded-[10px] border border-[#DCE1EA] bg-[#FAFBFC] px-3 text-sm text-[#0B1215] outline-none focus:border-[#0E6E6B]"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label className="block text-xs font-semibold text-[#475569]">
                    URL Slug *
                  </label>
                  <div className="mt-1 flex items-center rounded-[10px] border border-[#DCE1EA] bg-[#FAFBFC] px-3">
                    <span className="font-mono text-xs text-[#94A3B8]">/blog/</span>
                    <input
                      required
                      value={slug}
                      onChange={(e) => {
                        setSlugTouched(true);
                        setSlug(slugifyBlogTitle(e.target.value));
                      }}
                      placeholder="java-interview-questions-indore"
                      className="h-10 w-full bg-transparent font-mono text-xs text-[#0B1215] outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#475569]">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="mt-1 h-10 w-full rounded-[10px] border border-[#DCE1EA] bg-[#FAFBFC] px-3 text-sm text-[#0B1215]"
                  >
                    {BLOG_CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#475569]">
                  Short Excerpt (shown on /blog cards) *
                </label>
                <textarea
                  required
                  rows={2}
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="A 1–2 sentence summary of what students will learn..."
                  className="mt-1 w-full rounded-[10px] border border-[#DCE1EA] bg-[#FAFBFC] p-3 text-sm text-[#0B1215] outline-none focus:border-[#0E6E6B]"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-[#475569]">
                    Article Body *
                  </label>
                  <span className="text-[11px] text-[#64748B]">
                    Supports <code className="font-mono">## Heading</code>,{" "}
                    <code className="font-mono">### Subheading</code>, and{" "}
                    <code className="font-mono">- Bullet lists</code>
                  </span>
                </div>
                <textarea
                  required
                  rows={10}
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-1 w-full rounded-[10px] border border-[#DCE1EA] bg-[#FAFBFC] p-3 font-mono text-xs leading-relaxed text-[#0B1215] outline-none focus:border-[#0E6E6B]"
                />
              </div>

              {/* SEO Metadata & Live Google Preview */}
              <div className="rounded-[14px] border border-[#E4E7EC] bg-[#F8FAFC] p-4 space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0E6E6B]">
                  SEO Meta Settings &amp; Google Preview
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label className="flex justify-between text-[11px] font-semibold text-[#475569]">
                      <span>SEO Title (optional)</span>
                      <span>{(metaTitle || title).length}/60</span>
                    </label>
                    <input
                      value={metaTitle}
                      onChange={(e) => setMetaTitle(e.target.value)}
                      placeholder="Defaults to article title"
                      className="mt-1 h-9 w-full rounded-[8px] border border-[#DCE1EA] bg-white px-2.5 text-xs text-[#0B1215]"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-[#475569]">
                      Author
                    </label>
                    <input
                      value={author}
                      onChange={(e) => setAuthor(e.target.value)}
                      className="mt-1 h-9 w-full rounded-[8px] border border-[#DCE1EA] bg-white px-2.5 text-xs text-[#0B1215]"
                    />
                  </div>
                </div>
                <div>
                  <label className="flex justify-between text-[11px] font-semibold text-[#475569]">
                    <span>Meta Description (optional)</span>
                    <span>{(metaDescription || excerpt).length}/160</span>
                  </label>
                  <input
                    value={metaDescription}
                    onChange={(e) => setMetaDescription(e.target.value)}
                    placeholder="Defaults to excerpt"
                    className="mt-1 h-9 w-full rounded-[8px] border border-[#DCE1EA] bg-white px-2.5 text-xs text-[#0B1215]"
                  />
                </div>

                {/* Live SERP Preview */}
                <div className="rounded-[10px] border border-[#E4E7EC] bg-white p-3">
                  <div className="text-[11px] text-[#0E6E6B]">
                    https://www.theprimestep.com/blog/{slug || "your-article-slug"}
                  </div>
                  <div className="mt-0.5 text-sm font-semibold text-[#1A0DAB]">
                    {previewTitle}
                  </div>
                  <div className="mt-0.5 text-xs leading-snug text-[#4D5156]">
                    {previewDesc}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-[#0B1215]">
                  <input
                    type="checkbox"
                    checked={published}
                    onChange={(e) => setPublished(e.target.checked)}
                  />
                  Publish live to /blog &amp; /sitemap.xml
                </label>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setEditorOpen(false)}
                    className="rounded-full border border-[#DCE1EA] px-4 py-2 text-xs font-semibold text-[#0B1215]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="rounded-full bg-[#0E6E6B] px-5 py-2 text-xs font-semibold text-white hover:opacity-95 disabled:opacity-60"
                  >
                    {submitting
                      ? "Saving..."
                      : published
                        ? "Publish Article"
                        : "Save Draft"}
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
