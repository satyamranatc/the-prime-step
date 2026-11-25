"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "./AdminShell";
import {
  CAMPUS_OPTIONS,
  COURSE_CATALOG_OPTIONS,
  type AdminReviewItem,
  type CampusName,
} from "@/lib/admin/types";

export default function AdminReviewsClient({
  adminId,
  dbConfigured,
}: {
  adminId: string;
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [items, setItems] = useState<AdminReviewItem[]>([]);
  const [statusFilter, setStatusFilter] = useState<"all" | "approved" | "pending">("all");
  const [loading, setLoading] = useState(dbConfigured);
  const [error, setError] = useState<string | null>(
    dbConfigured ? null : "MONGODB_URI is not configured in environment variables.",
  );
  const [toast, setToast] = useState<string | null>(null);

  // Modal state
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminReviewItem | null>(null);
  const [studentName, setStudentName] = useState("");
  const [campus, setCampus] = useState<CampusName>("Vijay Nagar");
  const [course, setCourse] = useState<string>(COURSE_CATALOG_OPTIONS[0].title);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState("");
  const [approved, setApproved] = useState(true);
  const [featured, setFeatured] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast((prev) => (prev === msg ? null : prev)), 3200);
  }, []);

  const fetchReviews = useCallback(async () => {
    if (!dbConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/reviews", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not load reviews.");
      } else {
        setItems(json.items || []);
      }
    } catch {
      setError("Network error while loading reviews.");
    } finally {
      setLoading(false);
    }
  }, [dbConfigured, router]);

  useEffect(() => {
    if (!dbConfigured) return;
    const t = window.setTimeout(() => {
      void fetchReviews();
    }, 0);
    return () => window.clearTimeout(t);
  }, [dbConfigured, fetchReviews]);

  const openCreate = () => {
    setEditing(null);
    setStudentName("");
    setCampus("Vijay Nagar");
    setCourse(COURSE_CATALOG_OPTIONS[0].title);
    setRole("");
    setCompany("");
    setRating(5);
    setQuote("");
    setApproved(true);
    setFeatured(false);
    setModalOpen(true);
  };

  const openEdit = (r: AdminReviewItem) => {
    setEditing(r);
    setStudentName(r.studentName);
    setCampus(r.campus);
    setCourse(r.course);
    setRole(r.role);
    setCompany(r.company);
    setRating(r.rating);
    setQuote(r.quote);
    setApproved(r.approved);
    setFeatured(r.featured);
    setModalOpen(true);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    const payload = {
      studentName,
      campus,
      course,
      role,
      company,
      rating: Number(rating),
      quote,
      approved,
      featured,
    };

    try {
      const url = editing
        ? `/api/admin/reviews/${encodeURIComponent(editing.id)}`
        : "/api/admin/reviews";
      const res = await fetch(url, {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        showToast(editing ? "Review updated" : "Verified review added");
        setModalOpen(false);
        void fetchReviews();
      } else {
        showToast(json.error || "Could not save review");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggle = async (
    r: AdminReviewItem,
    field: "approved" | "featured",
  ) => {
    const res = await fetch(`/api/admin/reviews/${encodeURIComponent(r.id)}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !r[field] }),
    });
    if (res.ok) {
      showToast(
        field === "approved"
          ? r.approved
            ? "Review hidden"
            : "Review approved & published"
          : r.featured
            ? "Removed from featured"
            : "Marked as featured",
      );
      void fetchReviews();
    }
  };

  const handleDelete = async (r: AdminReviewItem) => {
    if (!window.confirm(`Delete review by ${r.studentName}?`)) return;
    const res = await fetch(`/api/admin/reviews/${encodeURIComponent(r.id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showToast("Review deleted");
      void fetchReviews();
    }
  };

  const visible = items.filter((r) => {
    if (statusFilter === "approved") return r.approved;
    if (statusFilter === "pending") return !r.approved;
    return true;
  });

  return (
    <AdminShell
      adminId={adminId}
      headerTitle="Verified Reviews & Placements"
      headerAction={
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex h-9 items-center rounded-full bg-[#0B1215] px-4 text-xs font-semibold text-white hover:opacity-90"
        >
          + Add Review
        </button>
      }
    >
      {toast && (
        <div className="fixed bottom-5 right-5 z-50 rounded-[10px] bg-ink px-4 py-2.5 text-xs font-semibold text-white shadow-lg">
          {toast}
        </div>
      )}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="display text-2xl text-ink sm:text-3xl">
            Verified Reviews &amp; Placements
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Publish real student testimonials and placement stories with one-click approve/hide controls.
          </p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex min-h-[40px] items-center rounded-[8px] bg-brand-primary px-4 text-xs font-semibold text-white hover:opacity-95"
        >
          + Add Verified Review
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="mt-5 flex flex-wrap gap-2">
        {(
          [
            { key: "all", label: `All (${items.length})` },
            {
              key: "approved",
              label: `Approved (${items.filter((i) => i.approved).length})`,
            },
            {
              key: "pending",
              label: `Hidden / Pending (${items.filter((i) => !i.approved).length})`,
            },
          ] as const
        ).map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setStatusFilter(tab.key)}
            className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
              statusFilter === tab.key
                ? "bg-ink text-white"
                : "border border-hairline bg-surface text-ink-muted hover:text-ink"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {error && (
        <div className="mt-4 rounded-[12px] border border-status-warning/40 bg-status-warning/[0.08] p-4 text-sm text-ink">
          {error}
        </div>
      )}

      {/* Review Cards */}
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {loading ? (
          <div className="col-span-full rounded-[12px] border border-hairline bg-surface p-8 text-center text-sm text-ink-muted">
            Loading reviews...
          </div>
        ) : visible.length === 0 ? (
          <div className="col-span-full rounded-[12px] border border-hairline bg-surface p-10 text-center text-sm text-ink-muted">
            No reviews found. Add real student testimonials or placement stories to manage them here.
          </div>
        ) : (
          visible.map((r) => (
            <article
              key={r.id}
              className="flex flex-col justify-between rounded-[14px] border border-hairline bg-surface p-5"
            >
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <h2 className="text-base font-semibold text-ink">{r.studentName}</h2>
                    <p className="text-xs text-ink-muted">
                      {r.course} · {r.campus}
                      {r.role || r.company
                        ? ` · ${[r.role, r.company].filter(Boolean).join(" @ ")}`
                        : ""}
                    </p>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-amber-600">
                      {"★".repeat(r.rating)}
                    </span>
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] font-semibold ${
                        r.approved
                          ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-700"
                          : "border-hairline bg-ink/5 text-ink-muted"
                      }`}
                    >
                      {r.approved ? "Approved" : "Hidden"}
                    </span>
                    {r.featured && (
                      <span className="rounded-full border border-brand-primary/25 bg-brand-primary/10 px-2 py-0.5 text-[11px] font-semibold text-brand-primary">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  &ldquo;{r.quote}&rdquo;
                </p>
              </div>

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-hairline pt-3">
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => void handleToggle(r, "approved")}
                    className="text-xs font-semibold text-brand-primary hover:underline"
                  >
                    {r.approved ? "Hide" : "Approve"}
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleToggle(r, "featured")}
                    className="text-xs font-semibold text-ink-muted hover:text-ink"
                  >
                    {r.featured ? "Unfeature" : "Feature"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => openEdit(r)}
                    className="rounded-[6px] border border-hairline px-2.5 py-1 text-xs font-semibold text-ink hover:border-ink"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => void handleDelete(r)}
                    className="rounded-[6px] border border-hairline px-2.5 py-1 text-xs font-semibold text-ink-muted hover:border-status-danger hover:text-status-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Add / Edit Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="w-full max-w-lg rounded-[16px] border border-hairline bg-surface p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-ink">
              {editing ? "Edit Student Review" : "Add Verified Student Review"}
            </h2>
            <form onSubmit={handleSubmit} className="mt-4 space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted">
                    Student Name *
                  </label>
                  <input
                    required
                    value={studentName}
                    onChange={(e) => setStudentName(e.target.value)}
                    className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted">Campus</label>
                  <select
                    value={campus}
                    onChange={(e) => setCampus(e.target.value as CampusName)}
                    className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                  >
                    {CAMPUS_OPTIONS.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted">Course</label>
                  <select
                    value={course}
                    onChange={(e) => setCourse(e.target.value)}
                    className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                  >
                    {COURSE_CATALOG_OPTIONS.map((c) => (
                      <option key={c.slug} value={c.title}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted">Rating</label>
                  <select
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                    className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                  >
                    {[5, 4, 3, 2, 1].map((n) => (
                      <option key={n} value={n}>
                        {n} Stars
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-ink-muted">
                    Placed Role (optional)
                  </label>
                  <input
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    placeholder="e.g. Junior Java Developer"
                    className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-ink-muted">
                    Company (optional)
                  </label>
                  <input
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    placeholder="e.g. TCS / Yash Tech"
                    className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-muted">
                  Student Testimonial *
                </label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Enter the verified student review or placement experience..."
                  className="mt-1 w-full rounded-[8px] border border-hairline bg-canvas p-3 text-sm text-ink"
                />
              </div>

              <div className="flex flex-wrap gap-5 pt-1 text-xs font-semibold text-ink">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={approved}
                    onChange={(e) => setApproved(e.target.checked)}
                  />
                  Approved (visible on site)
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={featured}
                    onChange={(e) => setFeatured(e.target.checked)}
                  />
                  Featured testimonial
                </label>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-[8px] border border-hairline px-4 py-2 text-xs font-semibold text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="rounded-[8px] bg-brand-primary px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {submitting ? "Saving..." : "Save Review"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
