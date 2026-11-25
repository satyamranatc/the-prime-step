"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { buildVerificationUrl } from "@/lib/certificates/validation";
import BulkCsvImportModal from "./BulkCsvImportModal";
import type { AdminCertificateItem, AuditLogItem } from "@/lib/certificates/types";

interface DashboardResponse {
  ok: boolean;
  stats: {
    total: number;
    valid: number;
    revoked: number;
    issuedThisYear: number;
    currentYear: number;
  };
  filters: {
    courses: string[];
    years: number[];
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  items: AdminCertificateItem[];
  error?: string;
}

function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}

export default function AdminCertificatesDashboard({
  adminId,
  dbConfigured,
}: {
  adminId: string;
  dbConfigured: boolean;
}) {
  const router = useRouter();

  // Table & filter state
  const [activeTab, setActiveTab] = useState<"certificates" | "audit">("certificates");
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "valid" | "revoked">("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardResponse | null>(null);

  // Audit logs state
  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>([]);
  const [loadingAudit, setLoadingAudit] = useState(false);

  // Toast feedback
  const [toast, setToast] = useState<string | null>(null);

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [viewingCert, setViewingCert] = useState<AdminCertificateItem | null>(null);
  const [viewingAudit, setViewingAudit] = useState<AuditLogItem[]>([]);
  const [editingCert, setEditingCert] = useState<AdminCertificateItem | null>(null);
  const [revokingCert, setRevokingCert] = useState<AdminCertificateItem | null>(null);
  const [createdCert, setCreatedCert] = useState<AdminCertificateItem | null>(null);

  // Add/Edit form fields
  const [formCertId, setFormCertId] = useState("");
  const [formStudentName, setFormStudentName] = useState("");
  const [formCourse, setFormCourse] = useState("");
  const [formDuration, setFormDuration] = useState("");
  const [formIssueDate, setFormIssueDate] = useState(todayIso());
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  // Revoke / Reinstate form
  const [revokeReason, setRevokeReason] = useState("");
  const [revokeSubmitting, setRevokeSubmitting] = useState(false);
  const [revokeError, setRevokeError] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3500);
  }, []);

  // Debounce search input
  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 280);
    return () => window.clearTimeout(t);
  }, [search]);

  const fetchCertificates = useCallback(async () => {
    if (!dbConfigured) {
      setLoading(false);
      setLoadError("MONGODB_URI is not configured in environment variables.");
      return;
    }

    setLoading(true);
    setLoadError(null);

    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "25",
        status: statusFilter,
      });
      if (debouncedSearch) params.set("q", debouncedSearch);
      if (yearFilter !== "all") params.set("year", yearFilter);
      if (courseFilter !== "all") params.set("course", courseFilter);

      const res = await fetch(`/api/admin/certificates?${params.toString()}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json: DashboardResponse = await res.json();
      if (!res.ok || !json.ok) {
        setLoadError(json.error || "Could not load certificates.");
      } else {
        setData(json);
      }
    } catch {
      setLoadError("Network error while loading certificates.");
    } finally {
      setLoading(false);
    }
  }, [dbConfigured, page, statusFilter, debouncedSearch, yearFilter, courseFilter, router]);

  useEffect(() => {
    const id = window.setTimeout(() => {
      void fetchCertificates();
    }, 0);
    return () => window.clearTimeout(id);
  }, [fetchCertificates]);

  const fetchAuditLogs = useCallback(async () => {
    setLoadingAudit(true);
    try {
      const res = await fetch("/api/admin/certificates/audit?limit=50", { cache: "no-store" });
      const json = await res.json();
      if (res.ok && json.ok) {
        setAuditLogs(json.logs || []);
      }
    } catch {
      // ignore transient error
    } finally {
      setLoadingAudit(false);
    }
  }, []);

  useEffect(() => {
    if (activeTab !== "audit") return;
    const id = window.setTimeout(() => {
      void fetchAuditLogs();
    }, 0);
    return () => window.clearTimeout(id);
  }, [activeTab, fetchAuditLogs]);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" });
    router.refresh();
  };

  const handleCopyUrl = async (certId: string) => {
    const url = buildVerificationUrl(certId, window.location.origin);
    try {
      await navigator.clipboard.writeText(url);
      showToast(`Copied verification link for ${certId}`);
    } catch {
      showToast(url);
    }
  };

  const generateNextId = async () => {
    const year = formIssueDate.slice(0, 4) || String(new Date().getFullYear());
    try {
      const res = await fetch(`/api/admin/certificates/next-id?year=${encodeURIComponent(year)}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (res.ok && json.ok && json.certificateId) {
        setFormCertId(json.certificateId);
      }
    } catch {
      // ignore
    }
  };

  const openAddModal = () => {
    setCreatedCert(null);
    setFormError(null);
    setFormCertId("");
    setFormStudentName("");
    setFormCourse("");
    setFormDuration("");
    setFormIssueDate(todayIso());
    setShowAddModal(true);
    void generateNextId();
  };

  const handleCreateCertificate = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setFormSubmitting(true);

    try {
      const res = await fetch("/api/admin/certificates", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          certificateId: formCertId,
          studentName: formStudentName,
          course: formCourse,
          courseDuration: formDuration,
          issueDate: formIssueDate,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setFormError(json.error || "Could not create certificate.");
        setFormSubmitting(false);
        return;
      }

      setCreatedCert(json.certificate);
      showToast(`Certificate ${json.certificate.certificateId} created.`);
      void fetchCertificates();
    } catch {
      setFormError("Network error while saving certificate.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const openViewModal = async (cert: AdminCertificateItem) => {
    setViewingCert(cert);
    setViewingAudit([]);
    try {
      const res = await fetch(`/api/admin/certificates/${encodeURIComponent(cert.id)}`, {
        cache: "no-store",
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        setViewingCert(json.certificate);
        setViewingAudit(json.auditLogs || []);
      }
    } catch {
      // fallback to table row data
    }
  };

  const openEditModal = (cert: AdminCertificateItem) => {
    setEditingCert(cert);
    setFormError(null);
    setFormStudentName(cert.studentName);
    setFormCourse(cert.course);
    setFormDuration(cert.courseDuration);
    setFormIssueDate(cert.issueDate);
  };

  const handleUpdateCertificate = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    setFormError(null);
    setFormSubmitting(true);

    try {
      const res = await fetch(`/api/admin/certificates/${encodeURIComponent(editingCert.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentName: formStudentName,
          course: formCourse,
          courseDuration: formDuration,
          issueDate: formIssueDate,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setFormError(json.error || "Could not update certificate.");
        setFormSubmitting(false);
        return;
      }

      showToast(`Updated ${editingCert.certificateId}`);
      setEditingCert(null);
      void fetchCertificates();
    } catch {
      setFormError("Network error while saving changes.");
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleRevokeOrReinstate = async (e: FormEvent) => {
    e.preventDefault();
    if (!revokingCert) return;
    setRevokeError(null);
    setRevokeSubmitting(true);

    const isReinstating = revokingCert.status === "revoked";

    try {
      const res = await fetch(
        `/api/admin/certificates/${encodeURIComponent(revokingCert.id)}/revoke`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: isReinstating ? "reinstate" : "revoke",
            reason: revokeReason,
          }),
        },
      );
      const json = await res.json();
      if (!res.ok || !json.ok) {
        setRevokeError(json.error || "Status update failed.");
        setRevokeSubmitting(false);
        return;
      }

      showToast(
        isReinstating
          ? `Reinstated ${revokingCert.certificateId}`
          : `Revoked ${revokingCert.certificateId}`,
      );
      setRevokingCert(null);
      setRevokeReason("");
      void fetchCertificates();
    } catch {
      setRevokeError("Network error while updating status.");
    } finally {
      setRevokeSubmitting(false);
    }
  };

  const exportUrl = (() => {
    const p = new URLSearchParams();
    if (statusFilter !== "all") p.set("status", statusFilter);
    if (yearFilter !== "all") p.set("year", yearFilter);
    if (courseFilter !== "all") p.set("course", courseFilter);
    return `/api/admin/certificates/export?${p.toString()}`;
  })();

  return (
    <div className="min-h-screen bg-canvas text-ink">
      {/* Admin Top Bar */}
      <header className="sticky top-0 z-40 border-b border-hairline bg-surface">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Link href="/" aria-label="The Prime Step Home">
              <Logo height={38} variant="color" />
            </Link>
            <span className="hidden h-5 w-px bg-hairline sm:inline-block" aria-hidden="true" />
            <span className="hidden text-sm font-semibold text-ink sm:inline-block">
              Certificate Registry
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <Link
              href="/verify-certificate"
              target="_blank"
              className="hidden rounded-[8px] border border-hairline bg-canvas px-3 py-1.5 text-xs font-semibold text-ink hover:border-ink md:inline-flex"
            >
              Public Portal ↗
            </Link>
            <span className="hidden text-xs text-ink-muted sm:inline">
              Signed in as <strong className="text-ink">{adminId}</strong>
            </span>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-[8px] border border-hairline bg-surface px-3 py-1.5 text-xs font-semibold text-ink hover:border-status-danger hover:text-status-danger"
            >
              Sign out
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="mx-auto max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8">
        {/* Page Heading + Primary Actions */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="display text-2xl text-ink sm:text-3xl">
              Certificate Management
            </h1>
            <p className="mt-1 text-sm text-ink-muted">
              Issue, import via CSV, edit, download QR codes, and revoke official institute certificates.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href={exportUrl}
              className="inline-flex min-h-[42px] items-center rounded-[8px] border border-hairline bg-surface px-4 text-xs font-semibold text-ink hover:border-ink"
            >
              Export CSV ↓
            </a>
            <button
              type="button"
              onClick={() => setShowBulkModal(true)}
              className="press-scale inline-flex min-h-[42px] items-center rounded-[8px] border border-accent bg-accent-soft px-4 text-xs font-semibold text-accent hover:bg-accent hover:text-white"
            >
              Bulk CSV Import
            </button>
            <button
              type="button"
              onClick={openAddModal}
              className="press-scale inline-flex min-h-[42px] items-center rounded-full bg-accent px-5 text-xs font-semibold text-accent-ink hover:bg-accent-hover"
            >
              + Add Certificate
            </button>
          </div>
        </div>

        {/* Summary Metrics Strip */}
        <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <div className="rounded-[8px] border border-hairline bg-surface p-4">
            <p className="text-xs font-medium text-ink-muted">Total Certificates</p>
            <p className="tabular-nums mt-1 text-2xl font-bold text-ink">
              {data ? data.stats.total.toLocaleString("en-IN") : "—"}
            </p>
          </div>
          <div className="rounded-[8px] border border-hairline bg-surface p-4">
            <p className="text-xs font-medium text-ink-muted">Valid Certificates</p>
            <p className="tabular-nums mt-1 text-2xl font-bold text-status-success">
              {data ? data.stats.valid.toLocaleString("en-IN") : "—"}
            </p>
          </div>
          <div className="rounded-[8px] border border-hairline bg-surface p-4">
            <p className="text-xs font-medium text-ink-muted">Revoked</p>
            <p className="tabular-nums mt-1 text-2xl font-bold text-status-danger">
              {data ? data.stats.revoked.toLocaleString("en-IN") : "—"}
            </p>
          </div>
          <div className="rounded-[8px] border border-hairline bg-surface p-4">
            <p className="text-xs font-medium text-ink-muted">
              Issued in {data?.stats.currentYear ?? new Date().getFullYear()}
            </p>
            <p className="tabular-nums mt-1 text-2xl font-bold text-accent">
              {data ? data.stats.issuedThisYear.toLocaleString("en-IN") : "—"}
            </p>
          </div>
        </div>

        {/* Tabs: Certificates Table vs Audit Log */}
        <div className="mt-6 flex items-center gap-2 border-b border-hairline">
          <button
            type="button"
            onClick={() => setActiveTab("certificates")}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "certificates"
                ? "border-accent text-accent"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Certificates
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("audit")}
            className={`border-b-2 px-4 py-2.5 text-sm font-semibold transition-colors ${
              activeTab === "audit"
                ? "border-accent text-accent"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Audit History
          </button>
        </div>

        {/* CERTIFICATES VIEW */}
        {activeTab === "certificates" && (
          <div className="mt-5">
            {/* Search & Filters Bar */}
            <div className="grid gap-3 rounded-[8px] border border-hairline bg-surface p-4 md:grid-cols-[1.6fr_auto_auto_auto]">
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by Certificate ID, student name, or course..."
                aria-label="Search certificates"
                className="min-h-[40px] rounded-[8px] border border-hairline bg-canvas px-3.5 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
              />

              <select
                aria-label="Filter by status"
                value={statusFilter}
                onChange={(e) => {
                  setStatusFilter(e.target.value as "all" | "valid" | "revoked");
                  setPage(1);
                }}
                className="min-h-[40px] rounded-[8px] border border-hairline bg-canvas px-3 text-xs font-semibold text-ink focus:border-accent focus:outline-none"
              >
                <option value="all">Status: All</option>
                <option value="valid">Valid only</option>
                <option value="revoked">Revoked only</option>
              </select>

              <select
                aria-label="Filter by issue year"
                value={yearFilter}
                onChange={(e) => {
                  setYearFilter(e.target.value);
                  setPage(1);
                }}
                className="min-h-[40px] rounded-[8px] border border-hairline bg-canvas px-3 text-xs font-semibold text-ink focus:border-accent focus:outline-none"
              >
                <option value="all">Year: All</option>
                {data?.filters.years.map((y) => (
                  <option key={y} value={String(y)}>
                    {y}
                  </option>
                ))}
              </select>

              <select
                aria-label="Filter by course"
                value={courseFilter}
                onChange={(e) => {
                  setCourseFilter(e.target.value);
                  setPage(1);
                }}
                className="min-h-[40px] max-w-[240px] rounded-[8px] border border-hairline bg-canvas px-3 text-xs font-semibold text-ink focus:border-accent focus:outline-none"
              >
                <option value="all">Course: All</option>
                {data?.filters.courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {loadError && (
              <div
                role="alert"
                className="mt-4 rounded-[8px] border border-status-danger/35 bg-status-danger/[0.06] p-4 text-sm text-status-danger"
              >
                {loadError}
              </div>
            )}

            {/* Paginated Certificate Table */}
            <div className="mt-4 overflow-x-auto rounded-[8px] border border-hairline bg-surface">
              <table className="w-full min-w-[820px] border-collapse text-left text-sm">
                <thead className="border-b border-hairline bg-canvas text-xs font-semibold uppercase tracking-[0.05em] text-ink-muted">
                  <tr>
                    <th className="px-4 py-3">Certificate ID</th>
                    <th className="px-4 py-3">Student Name</th>
                    <th className="px-4 py-3">Course</th>
                    <th className="px-4 py-3">Issue Date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  {loading ? (
                    Array.from({ length: 6 }).map((_, idx) => (
                      <tr key={idx}>
                        <td colSpan={6} className="px-4 py-3.5">
                          <div className="h-5 animate-pulse rounded bg-canvas" />
                        </td>
                      </tr>
                    ))
                  ) : !data || data.items.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="px-4 py-12 text-center text-sm text-ink-muted">
                        No certificates match your current search or filter. Use{" "}
                        <strong className="text-ink">Bulk CSV Import</strong> or{" "}
                        <strong className="text-ink">+ Add Certificate</strong> to add records.
                      </td>
                    </tr>
                  ) : (
                    data.items.map((item) => (
                      <tr key={item.id} className="hover:bg-canvas/50">
                        <td className="font-mono px-4 py-3 text-xs font-semibold text-ink">
                          {item.certificateId}
                        </td>
                        <td className="px-4 py-3 font-medium text-ink">{item.studentName}</td>
                        <td className="px-4 py-3 text-ink-muted">
                          <span className="block text-ink">{item.course}</span>
                          <span className="text-xs text-ink-muted">{item.courseDuration}</span>
                        </td>
                        <td className="tabular-nums px-4 py-3 text-xs text-ink-muted">
                          {item.issueDate}
                        </td>
                        <td className="px-4 py-3">
                          {item.status === "valid" ? (
                            <span className="inline-flex items-center rounded-full bg-status-success/10 px-2.5 py-0.5 text-xs font-semibold text-status-success">
                              Valid
                            </span>
                          ) : (
                            <span className="inline-flex items-center rounded-full bg-status-danger/10 px-2.5 py-0.5 text-xs font-semibold text-status-danger">
                              Revoked
                            </span>
                          )}
                        </td>
                        <td className="px-4 py-3 text-right">
                          <div className="inline-flex flex-wrap justify-end gap-1.5 text-xs">
                            <button
                              type="button"
                              onClick={() => void openViewModal(item)}
                              className="rounded-[4px] border border-hairline px-2.5 py-1 font-medium text-ink hover:border-ink"
                            >
                              View
                            </button>
                            <button
                              type="button"
                              onClick={() => openEditModal(item)}
                              className="rounded-[4px] border border-hairline px-2.5 py-1 font-medium text-ink hover:border-ink"
                            >
                              Edit
                            </button>
                            <a
                              href={`/api/admin/certificates/${encodeURIComponent(item.id)}/qr?format=png`}
                              className="rounded-[4px] border border-hairline px-2.5 py-1 font-medium text-accent hover:border-accent"
                            >
                              QR
                            </a>
                            <button
                              type="button"
                              onClick={() => void handleCopyUrl(item.certificateId)}
                              className="rounded-[4px] border border-hairline px-2.5 py-1 font-medium text-ink-muted hover:border-ink hover:text-ink"
                            >
                              Copy link
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setRevokingCert(item);
                                setRevokeReason("");
                                setRevokeError(null);
                              }}
                              className={`rounded-[4px] border px-2.5 py-1 font-medium ${
                                item.status === "valid"
                                  ? "border-status-danger/35 text-status-danger hover:bg-status-danger hover:text-white"
                                  : "border-status-success/35 text-status-success hover:bg-status-success hover:text-white"
                              }`}
                            >
                              {item.status === "valid" ? "Revoke" : "Reinstate"}
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>

            {/* Server-side Pagination */}
            {data && data.pagination.total > 0 && (
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-ink-muted">
                <p className="tabular-nums">
                  Showing page <strong className="text-ink">{data.pagination.page}</strong> of{" "}
                  <strong className="text-ink">{data.pagination.totalPages}</strong> (
                  {data.pagination.total.toLocaleString("en-IN")} matching records)
                </p>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    disabled={page <= 1}
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="min-h-[36px] rounded-[8px] border border-hairline bg-surface px-3 font-semibold text-ink hover:border-ink disabled:opacity-40"
                  >
                    ← Previous
                  </button>
                  <button
                    type="button"
                    disabled={page >= data.pagination.totalPages}
                    onClick={() => setPage((p) => p + 1)}
                    className="min-h-[36px] rounded-[8px] border border-hairline bg-surface px-3 font-semibold text-ink hover:border-ink disabled:opacity-40"
                  >
                    Next →
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* AUDIT LOGS VIEW */}
        {activeTab === "audit" && (
          <div className="mt-5 overflow-x-auto rounded-[8px] border border-hairline bg-surface">
            <table className="w-full min-w-[700px] border-collapse text-left text-xs">
              <thead className="border-b border-hairline bg-canvas uppercase tracking-[0.05em] text-ink-muted">
                <tr>
                  <th className="px-4 py-3">Timestamp</th>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Certificate / Batch</th>
                  <th className="px-4 py-3">Admin</th>
                  <th className="px-4 py-3">Summary</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {loadingAudit ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                      Loading audit logs...
                    </td>
                  </tr>
                ) : auditLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-8 text-center text-ink-muted">
                      No administrative actions logged yet.
                    </td>
                  </tr>
                ) : (
                  auditLogs.map((log) => (
                    <tr key={log.id}>
                      <td className="tabular-nums whitespace-nowrap px-4 py-3 text-ink-muted">
                        {new Date(log.timestamp).toLocaleString("en-IN")}
                      </td>
                      <td className="font-mono px-4 py-3 font-semibold text-accent">
                        {log.action}
                      </td>
                      <td className="font-mono px-4 py-3 text-ink">
                        {log.certificateId || log.batchId || "—"}
                      </td>
                      <td className="px-4 py-3 font-medium text-ink">{log.adminId}</td>
                      <td className="px-4 py-3 text-ink-muted">{log.summary}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        )}
      </main>

      {/* ADD CERTIFICATE MODAL */}
      {showAddModal && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="add-cert-title"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-[16px] border border-hairline bg-surface p-6 shadow-[var(--elevation-2)]">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <h2 id="add-cert-title" className="text-lg font-bold text-ink">
                {createdCert ? "Certificate Created" : "Add Certificate"}
              </h2>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            {createdCert ? (
              <div className="mt-5 space-y-4">
                <div className="rounded-[8px] border border-status-success/35 bg-status-success/[0.07] p-4 text-sm text-ink">
                  <strong className="font-semibold text-status-success">Saved to MongoDB:</strong>{" "}
                  <span className="font-mono font-bold">{createdCert.certificateId}</span> for{" "}
                  <strong>{createdCert.studentName}</strong>.
                </div>

                <div className="rounded-[8px] border border-hairline bg-canvas p-3.5 text-xs">
                  <p className="font-semibold text-ink-muted">Permanent Verification URL</p>
                  <p className="font-mono mt-1 break-all text-ink">
                    {buildVerificationUrl(createdCert.certificateId, window.location.origin)}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => void handleCopyUrl(createdCert.certificateId)}
                    className="min-h-[40px] rounded-[8px] border border-hairline bg-surface px-4 text-xs font-semibold text-ink hover:border-ink"
                  >
                    Copy Verification Link
                  </button>
                  <a
                    href={`/api/admin/certificates/${encodeURIComponent(createdCert.id)}/qr?format=png`}
                    className="inline-flex min-h-[40px] items-center rounded-[8px] bg-accent px-4 text-xs font-semibold text-white hover:bg-accent-hover"
                  >
                    Download QR (PNG) ↓
                  </a>
                  <a
                    href={`/api/admin/certificates/${encodeURIComponent(createdCert.id)}/qr?format=svg`}
                    className="inline-flex min-h-[40px] items-center rounded-[8px] border border-hairline bg-surface px-4 text-xs font-semibold text-accent hover:border-accent"
                  >
                    Download QR (SVG) ↓
                  </a>
                </div>

                <div className="flex justify-end gap-2 border-t border-hairline pt-4">
                  <button
                    type="button"
                    onClick={openAddModal}
                    className="min-h-[40px] rounded-[8px] border border-hairline px-4 text-xs font-semibold text-ink"
                  >
                    + Add Another
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="min-h-[40px] rounded-full bg-ink px-5 text-xs font-semibold text-white"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleCreateCertificate} className="mt-5 space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="add-cert-id" className="text-xs font-semibold text-ink-muted">
                      Certificate ID *
                    </label>
                    <button
                      type="button"
                      onClick={() => void generateNextId()}
                      className="text-xs font-semibold text-accent hover:underline"
                    >
                      Auto-generate ID
                    </button>
                  </div>
                  <input
                    id="add-cert-id"
                    type="text"
                    required
                    value={formCertId}
                    onChange={(e) => setFormCertId(e.target.value.toUpperCase())}
                    placeholder="TPS-2026-000123"
                    className="font-mono mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm uppercase text-ink focus:border-accent focus:bg-surface focus:outline-none"
                  />
                </div>

                <div>
                  <label htmlFor="add-student" className="text-xs font-semibold text-ink-muted">
                    Student Name *
                  </label>
                  <input
                    id="add-student"
                    type="text"
                    required
                    value={formStudentName}
                    onChange={(e) => setFormStudentName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                  />
                </div>

                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <label htmlFor="add-course" className="text-xs font-semibold text-ink-muted">
                      Course *
                    </label>
                    <input
                      id="add-course"
                      type="text"
                      required
                      value={formCourse}
                      onChange={(e) => setFormCourse(e.target.value)}
                      placeholder="e.g. Python Programming"
                      className="mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="add-duration" className="text-xs font-semibold text-ink-muted">
                      Course Duration *
                    </label>
                    <input
                      id="add-duration"
                      type="text"
                      required
                      value={formDuration}
                      onChange={(e) => setFormDuration(e.target.value)}
                      placeholder="e.g. 3 Months"
                      className="mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="add-date" className="text-xs font-semibold text-ink-muted">
                    Issue Date *
                  </label>
                  <input
                    id="add-date"
                    type="date"
                    required
                    value={formIssueDate}
                    onChange={(e) => setFormIssueDate(e.target.value)}
                    className="tabular-nums mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                  />
                </div>

                {formError && (
                  <p className="rounded-[8px] bg-status-danger/10 px-3 py-2 text-xs font-medium text-status-danger">
                    {formError}
                  </p>
                )}

                <div className="flex justify-end gap-2 border-t border-hairline pt-4">
                  <button
                    type="button"
                    onClick={() => setShowAddModal(false)}
                    className="min-h-[42px] rounded-[8px] border border-hairline px-4 text-xs font-semibold text-ink"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={formSubmitting}
                    className="min-h-[42px] rounded-full bg-accent px-6 text-xs font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
                  >
                    {formSubmitting ? "Saving..." : "Save Certificate"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* VIEW & QR MODAL */}
      {viewingCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-xs"
        >
          <div className="max-h-[90vh] w-full max-w-xl overflow-y-auto rounded-[16px] border border-hairline bg-surface p-6 shadow-[var(--elevation-2)]">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div>
                <h2 className="font-mono text-lg font-bold text-ink">{viewingCert.certificateId}</h2>
                <p className="text-xs text-ink-muted">{viewingCert.studentName}</p>
              </div>
              <button
                type="button"
                onClick={() => setViewingCert(null)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 grid gap-5 sm:grid-cols-[1fr_140px]">
              <dl className="space-y-3 text-sm">
                <div>
                  <dt className="text-xs text-ink-muted">Status</dt>
                  <dd className="mt-0.5 font-semibold">
                    {viewingCert.status === "valid" ? (
                      <span className="text-status-success">Valid</span>
                    ) : (
                      <span className="text-status-danger">
                        Revoked ({viewingCert.revocationReason || "No reason"})
                      </span>
                    )}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">Course</dt>
                  <dd className="font-semibold text-ink">
                    {viewingCert.course} ({viewingCert.courseDuration})
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">Issue Date</dt>
                  <dd className="tabular-nums font-medium text-ink">{viewingCert.issueDate}</dd>
                </div>
                <div>
                  <dt className="text-xs text-ink-muted">Public Verification URL</dt>
                  <dd className="font-mono mt-0.5 break-all text-xs text-accent">
                    <Link
                      href={`/verify-certificate?id=${encodeURIComponent(viewingCert.certificateId)}`}
                      target="_blank"
                      className="hover:underline"
                    >
                      {buildVerificationUrl(viewingCert.certificateId, window.location.origin)}
                    </Link>
                  </dd>
                </div>
              </dl>

              <div className="flex flex-col items-center gap-2 rounded-[8px] border border-hairline bg-canvas p-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={`/api/admin/certificates/${encodeURIComponent(viewingCert.id)}/qr?format=svg`}
                  alt={`QR code for ${viewingCert.certificateId}`}
                  className="size-28 rounded bg-white p-1"
                />
                <a
                  href={`/api/admin/certificates/${encodeURIComponent(viewingCert.id)}/qr?format=png`}
                  className="text-xs font-semibold text-accent hover:underline"
                >
                  Download PNG ↓
                </a>
              </div>
            </div>

            {viewingAudit.length > 0 && (
              <div className="mt-6 border-t border-hairline pt-4">
                <p className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                  Change History
                </p>
                <ul className="mt-2 space-y-2 text-xs">
                  {viewingAudit.map((l) => (
                    <li key={l.id} className="rounded-[6px] bg-canvas p-2.5">
                      <span className="font-mono font-semibold text-accent">{l.action}</span>{" "}
                      <span className="text-ink-muted">
                        by {l.adminId} · {new Date(l.timestamp).toLocaleString("en-IN")}
                      </span>
                      <p className="mt-0.5 text-ink">{l.summary}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* EDIT CERTIFICATE MODAL */}
      {editingCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-lg rounded-[16px] border border-hairline bg-surface p-6 shadow-[var(--elevation-2)]">
            <div className="flex items-center justify-between border-b border-hairline pb-3">
              <div>
                <h2 className="text-lg font-bold text-ink">Edit Certificate</h2>
                <p className="font-mono text-xs text-ink-muted">{editingCert.certificateId} (locked)</p>
              </div>
              <button
                type="button"
                onClick={() => setEditingCert(null)}
                className="text-sm text-ink-muted hover:text-ink"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleUpdateCertificate} className="mt-5 space-y-4">
              <div>
                <label htmlFor="edit-student" className="text-xs font-semibold text-ink-muted">
                  Student Name *
                </label>
                <input
                  id="edit-student"
                  type="text"
                  required
                  value={formStudentName}
                  onChange={(e) => setFormStudentName(e.target.value)}
                  className="mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <label htmlFor="edit-course" className="text-xs font-semibold text-ink-muted">
                    Course *
                  </label>
                  <input
                    id="edit-course"
                    type="text"
                    required
                    value={formCourse}
                    onChange={(e) => setFormCourse(e.target.value)}
                    className="mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="edit-duration" className="text-xs font-semibold text-ink-muted">
                    Course Duration *
                  </label>
                  <input
                    id="edit-duration"
                    type="text"
                    required
                    value={formDuration}
                    onChange={(e) => setFormDuration(e.target.value)}
                    className="mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="edit-date" className="text-xs font-semibold text-ink-muted">
                  Issue Date *
                </label>
                <input
                  id="edit-date"
                  type="date"
                  required
                  value={formIssueDate}
                  onChange={(e) => setFormIssueDate(e.target.value)}
                  className="tabular-nums mt-1 min-h-[42px] w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                />
              </div>

              {formError && (
                <p className="rounded-[8px] bg-status-danger/10 px-3 py-2 text-xs font-medium text-status-danger">
                  {formError}
                </p>
              )}

              <div className="flex justify-end gap-2 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
                  className="min-h-[42px] rounded-[8px] border border-hairline px-4 text-xs font-semibold text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="min-h-[42px] rounded-full bg-accent px-6 text-xs font-semibold text-white hover:bg-accent-hover disabled:opacity-50"
                >
                  {formSubmitting ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* REVOKE / REINSTATE MODAL */}
      {revokingCert && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/55 p-4 backdrop-blur-xs"
        >
          <div className="w-full max-w-md rounded-[16px] border border-hairline bg-surface p-6 shadow-[var(--elevation-2)]">
            <h2 className="text-lg font-bold text-ink">
              {revokingCert.status === "valid" ? "Revoke Certificate" : "Reinstate Certificate"}
            </h2>
            <p className="mt-1.5 text-sm text-ink-muted">
              {revokingCert.status === "valid"
                ? `Public verification for ${revokingCert.certificateId} (${revokingCert.studentName}) will immediately display "Certificate Revoked". The record is preserved for audit history.`
                : `Reinstating ${revokingCert.certificateId} will restore its public status to "Verified" and record this action in the audit log.`}
            </p>

            <form onSubmit={handleRevokeOrReinstate} className="mt-5 space-y-4">
              <div>
                <label htmlFor="revoke-reason" className="text-xs font-semibold text-ink-muted">
                  {revokingCert.status === "valid"
                    ? "Revocation Reason *"
                    : "Reinstatement Note (optional)"}
                </label>
                <textarea
                  id="revoke-reason"
                  rows={3}
                  required={revokingCert.status === "valid"}
                  value={revokeReason}
                  onChange={(e) => setRevokeReason(e.target.value)}
                  placeholder={
                    revokingCert.status === "valid"
                      ? "e.g. Issued in error / duplicate record"
                      : "e.g. Verified and cleared by academic head"
                  }
                  className="mt-1 w-full rounded-[8px] border border-hairline bg-canvas p-3 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
                />
              </div>

              {revokeError && (
                <p className="rounded-[8px] bg-status-danger/10 px-3 py-2 text-xs font-medium text-status-danger">
                  {revokeError}
                </p>
              )}

              <div className="flex justify-end gap-2 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() => setRevokingCert(null)}
                  className="min-h-[40px] rounded-[8px] border border-hairline px-4 text-xs font-semibold text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={revokeSubmitting}
                  className={`min-h-[40px] rounded-full px-5 text-xs font-semibold text-white disabled:opacity-50 ${
                    revokingCert.status === "valid"
                      ? "bg-status-danger hover:opacity-90"
                      : "bg-status-success hover:opacity-90"
                  }`}
                >
                  {revokeSubmitting
                    ? "Updating..."
                    : revokingCert.status === "valid"
                      ? "Confirm Revocation"
                      : "Confirm Reinstatement"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BULK CSV IMPORT MODAL */}
      {showBulkModal && (
        <BulkCsvImportModal
          onClose={() => setShowBulkModal(false)}
          onImported={() => {
            showToast("Bulk CSV import completed.");
            void fetchCertificates();
          }}
        />
      )}

      {/* Floating Toast */}
      {toast && (
        <div
          role="status"
          className="fixed right-5 bottom-5 z-[250] rounded-[8px] bg-ink px-4 py-3 text-xs font-semibold text-white shadow-[var(--elevation-2)]"
        >
          {toast}
        </div>
      )}
    </div>
  );
}
