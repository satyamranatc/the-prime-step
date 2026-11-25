"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "./AdminShell";
import {
  CAMPUS_OPTIONS,
  COURSE_CATALOG_OPTIONS,
  LEAD_STATUS_META,
  LEAD_STATUSES,
  type AdminLeadItem,
  type LeadStatus,
} from "@/lib/admin/types";
import { buildWhatsAppFollowUpUrl } from "@/lib/admin/validation";

interface LeadsResponse {
  ok: boolean;
  stats: {
    total: number;
    new: number;
    demoAttended: number;
    enrolled: number;
  };
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  items: AdminLeadItem[];
  error?: string;
}

export default function AdminLeadsClient({
  adminId,
  dbConfigured,
}: {
  adminId: string;
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [campusFilter, setCampusFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [page, setPage] = useState(1);

  const [loading, setLoading] = useState(dbConfigured);
  const [error, setError] = useState<string | null>(
    dbConfigured ? null : "MONGODB_URI is not configured in environment variables.",
  );
  const [data, setData] = useState<LeadsResponse | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  // Notes / edit modal
  const [editingLead, setEditingLead] = useState<AdminLeadItem | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [editStatus, setEditStatus] = useState<LeadStatus>("new");
  const [savingEdit, setSavingEdit] = useState(false);

  // Manual walk-in lead modal
  const [showAddModal, setShowAddModal] = useState(false);
  const [newName, setNewName] = useState("");
  const [newPhone, setNewPhone] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newCampus, setNewCampus] = useState<string>(CAMPUS_OPTIONS[0]);
  const [newCourse, setNewCourse] = useState<string>(COURSE_CATALOG_OPTIONS[0].title);
  const [newNotes, setNewNotes] = useState("");
  const [creating, setCreating] = useState(false);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => {
      setToast((prev) => (prev === msg ? null : prev));
    }, 3200);
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 260);
    return () => window.clearTimeout(t);
  }, [search]);

  const fetchLeads = useCallback(async () => {
    if (!dbConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: "25",
        campus: campusFilter,
        status: statusFilter,
      });
      if (debouncedSearch) params.set("q", debouncedSearch);

      const res = await fetch(`/api/admin/leads?${params.toString()}`, {
        cache: "no-store",
      });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json: LeadsResponse = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not load leads.");
      } else {
        setData(json);
      }
    } catch {
      setError("Network error while loading leads.");
    } finally {
      setLoading(false);
    }
  }, [campusFilter, dbConfigured, debouncedSearch, page, router, statusFilter]);

  useEffect(() => {
    if (!dbConfigured) return;
    const t = window.setTimeout(() => {
      void fetchLeads();
    }, 0);
    return () => window.clearTimeout(t);
  }, [dbConfigured, fetchLeads]);

  const handleQuickStatus = async (leadId: string, status: LeadStatus) => {
    try {
      const res = await fetch(`/api/admin/leads/${encodeURIComponent(leadId)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        showToast(`Status updated to ${LEAD_STATUS_META[status].label}`);
        void fetchLeads();
      }
    } catch {
      showToast("Failed to update status.");
    }
  };

  const handleSaveNotes = async (e: FormEvent) => {
    e.preventDefault();
    if (!editingLead) return;
    setSavingEdit(true);
    try {
      const res = await fetch(`/api/admin/leads/${encodeURIComponent(editingLead.id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: editStatus, notes: editNotes }),
      });
      if (res.ok) {
        showToast("Counselor notes saved");
        setEditingLead(null);
        void fetchLeads();
      }
    } finally {
      setSavingEdit(false);
    }
  };

  const handleCreateLead = async (e: FormEvent) => {
    e.preventDefault();
    setCreating(true);
    try {
      const res = await fetch("/api/admin/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: newName,
          phone: newPhone,
          email: newEmail,
          campus: newCampus,
          course: newCourse,
          notes: newNotes,
        }),
      });
      const json = await res.json();
      if (res.ok && json.ok) {
        showToast("Walk-in lead added");
        setShowAddModal(false);
        setNewName("");
        setNewPhone("");
        setNewEmail("");
        setNewNotes("");
        void fetchLeads();
      } else {
        showToast(json.error || "Could not create lead");
      }
    } finally {
      setCreating(false);
    }
  };

  const handleDeleteLead = async (lead: AdminLeadItem) => {
    if (!window.confirm(`Delete lead for ${lead.name}?`)) return;
    const res = await fetch(`/api/admin/leads/${encodeURIComponent(lead.id)}`, {
      method: "DELETE",
    });
    if (res.ok) {
      showToast("Lead removed");
      void fetchLeads();
    }
  };

  const exportUrl = (() => {
    const p = new URLSearchParams();
    if (campusFilter !== "all") p.set("campus", campusFilter);
    if (statusFilter !== "all") p.set("status", statusFilter);
    return `/api/admin/leads/export?${p.toString()}`;
  })();

  return (
    <AdminShell
      adminId={adminId}
      headerTitle="Admissions & Demo Leads"
      headerAction={
        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="inline-flex h-9 items-center rounded-full bg-[#0B1215] px-4 text-xs font-semibold text-white hover:opacity-90"
        >
          + Add Lead
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
            Admissions &amp; Demo Leads CRM
          </h1>
          <p className="mt-1 text-sm text-ink-muted">
            Every inquiry from your website forms is captured here with campus routing, UTM source, and 1-click WhatsApp follow-up.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2.5">
          <a
            href={exportUrl}
            className="inline-flex min-h-[40px] items-center rounded-[8px] border border-hairline bg-surface px-4 text-xs font-semibold text-ink hover:border-ink"
          >
            Export CSV ↓
          </a>
          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="inline-flex min-h-[40px] items-center rounded-[8px] bg-brand-primary px-4 text-xs font-semibold text-white hover:opacity-95"
          >
            + Add Walk-in Lead
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: "Total Leads", value: data?.stats.total ?? 0 },
          { label: "New / Uncalled", value: data?.stats.new ?? 0 },
          { label: "Demo Attended", value: data?.stats.demoAttended ?? 0 },
          { label: "Enrolled", value: data?.stats.enrolled ?? 0 },
        ].map((kpi) => (
          <div
            key={kpi.label}
            className="rounded-[12px] border border-hairline bg-surface p-4"
          >
            <div className="text-xs font-medium text-ink-muted">{kpi.label}</div>
            <div className="mt-1 text-2xl font-bold text-ink">
              {loading ? "..." : kpi.value}
            </div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="mt-5 flex flex-col gap-3 rounded-[12px] border border-hairline bg-surface p-4 sm:flex-row sm:items-center">
        <input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search name, phone, course, or notes..."
          className="h-10 flex-1 rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink outline-none focus:border-brand-primary"
        />
        <select
          value={campusFilter}
          onChange={(e) => {
            setCampusFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-[8px] border border-hairline bg-canvas px-3 text-xs font-semibold text-ink outline-none focus:border-brand-primary"
        >
          <option value="all">All Campuses</option>
          {CAMPUS_OPTIONS.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
          className="h-10 rounded-[8px] border border-hairline bg-canvas px-3 text-xs font-semibold text-ink outline-none focus:border-brand-primary"
        >
          <option value="all">All Statuses</option>
          {LEAD_STATUSES.map((s) => (
            <option key={s} value={s}>
              {LEAD_STATUS_META[s].label}
            </option>
          ))}
        </select>
      </div>

      {error && (
        <div className="mt-4 rounded-[12px] border border-status-warning/40 bg-status-warning/[0.08] p-4 text-sm text-ink">
          {error}
        </div>
      )}

      {/* Leads Table */}
      <div className="mt-5 overflow-hidden rounded-[12px] border border-hairline bg-surface">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px] text-left text-sm">
            <thead>
              <tr className="border-b border-hairline bg-canvas/70 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink-muted">
                <th className="px-4 py-3">Student</th>
                <th className="px-4 py-3">Course &amp; Campus</th>
                <th className="px-4 py-3">Source / Page</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Notes</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-sm text-ink-muted">
                    Loading leads...
                  </td>
                </tr>
              ) : !data || data.items.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-10 text-center text-sm text-ink-muted">
                    No leads match your current filters.
                  </td>
                </tr>
              ) : (
                data.items.map((lead) => (
                  <tr key={lead.id} className="hover:bg-canvas/40">
                    <td className="px-4 py-3.5 align-top">
                      <div className="font-semibold text-ink">{lead.name}</div>
                      <div className="text-xs text-ink-muted">{lead.phone}</div>
                      {lead.email && (
                        <div className="text-[11px] text-ink-muted">{lead.email}</div>
                      )}
                      <div className="mt-1 text-[11px] text-ink-muted">
                        {new Date(lead.createdAt).toLocaleString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </div>
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <div className="text-xs font-semibold text-ink">
                        {lead.course || "General Counseling"}
                      </div>
                      <div className="mt-0.5 text-xs text-ink-muted">{lead.campus}</div>
                      {lead.background && (
                        <div className="mt-0.5 text-[11px] text-ink-muted">
                          {lead.background}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-top text-xs text-ink-muted">
                      <div>{lead.utm?.utm_source || "Direct / Organic"}</div>
                      {lead.utm?.utm_campaign && (
                        <div className="text-[11px]">Camp: {lead.utm.utm_campaign}</div>
                      )}
                      {lead.page && (
                        <div className="mt-0.5 max-w-[180px] truncate text-[11px]">
                          {lead.page}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <select
                        aria-label={`Status for ${lead.name}`}
                        value={lead.status}
                        onChange={(e) =>
                          void handleQuickStatus(lead.id, e.target.value as LeadStatus)
                        }
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold outline-none ${
                          LEAD_STATUS_META[lead.status]?.badgeClass || ""
                        }`}
                      >
                        {LEAD_STATUSES.map((s) => (
                          <option key={s} value={s}>
                            {LEAD_STATUS_META[s].label}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td className="px-4 py-3.5 align-top">
                      <p className="max-w-[220px] truncate text-xs text-ink-muted">
                        {lead.notes || lead.message || "—"}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingLead(lead);
                          setEditNotes(lead.notes || "");
                          setEditStatus(lead.status);
                        }}
                        className="mt-1 text-[11px] font-semibold text-brand-primary hover:underline"
                      >
                        {lead.notes ? "Edit notes" : "+ Add note"}
                      </button>
                    </td>
                    <td className="px-4 py-3.5 align-top text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <a
                          href={buildWhatsAppFollowUpUrl(
                            lead.phone,
                            lead.name,
                            lead.course,
                            lead.campus,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="rounded-[8px] bg-brand-primary px-2.5 py-1.5 text-xs font-semibold text-white hover:opacity-90"
                        >
                          WhatsApp ↗
                        </a>
                        <button
                          type="button"
                          onClick={() => void handleDeleteLead(lead)}
                          className="rounded-[8px] border border-hairline px-2.5 py-1.5 text-xs font-semibold text-ink-muted hover:border-status-danger hover:text-status-danger"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {data && data.pagination.totalPages > 1 && (
          <div className="flex items-center justify-between border-t border-hairline px-4 py-3 text-xs text-ink-muted">
            <span>
              Page {data.pagination.page} of {data.pagination.totalPages} ({data.pagination.total} leads)
            </span>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-[6px] border border-hairline px-3 py-1 font-semibold text-ink disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page >= data.pagination.totalPages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-[6px] border border-hairline px-3 py-1 font-semibold text-ink disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Edit Notes Modal */}
      {editingLead && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="w-full max-w-md rounded-[16px] border border-hairline bg-surface p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-ink">
              Counselor Notes — {editingLead.name}
            </h2>
            <p className="mt-0.5 text-xs text-ink-muted">
              {editingLead.phone} · {editingLead.campus}
            </p>
            <form onSubmit={handleSaveNotes} className="mt-4 space-y-4">
              <div>
                <label className="block text-xs font-semibold text-ink-muted">Status</label>
                <select
                  value={editStatus}
                  onChange={(e) => setEditStatus(e.target.value as LeadStatus)}
                  className="mt-1 h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
                >
                  {LEAD_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {LEAD_STATUS_META[s].label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-ink-muted">
                  Follow-up Notes
                </label>
                <textarea
                  rows={4}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Demo slot scheduled, fee discussion, batch preference..."
                  className="mt-1 w-full rounded-[8px] border border-hairline bg-canvas p-3 text-sm text-ink outline-none focus:border-brand-primary"
                />
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setEditingLead(null)}
                  className="rounded-[8px] border border-hairline px-4 py-2 text-xs font-semibold text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={savingEdit}
                  className="rounded-[8px] bg-brand-primary px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {savingEdit ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Walk-in Lead Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/50 p-4">
          <div className="w-full max-w-md rounded-[16px] border border-hairline bg-surface p-6 shadow-xl">
            <h2 className="text-lg font-semibold text-ink">Add Walk-in / Phone Lead</h2>
            <form onSubmit={handleCreateLead} className="mt-4 space-y-3">
              <input
                required
                placeholder="Student Name *"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
              />
              <input
                required
                placeholder="Phone Number *"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
              />
              <input
                type="email"
                placeholder="Email (optional)"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="h-10 w-full rounded-[8px] border border-hairline bg-canvas px-3 text-sm text-ink"
              />
              <div className="grid grid-cols-2 gap-2">
                <select
                  value={newCampus}
                  onChange={(e) => setNewCampus(e.target.value)}
                  className="h-10 rounded-[8px] border border-hairline bg-canvas px-2.5 text-xs font-semibold text-ink"
                >
                  {CAMPUS_OPTIONS.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
                <select
                  value={newCourse}
                  onChange={(e) => setNewCourse(e.target.value)}
                  className="h-10 rounded-[8px] border border-hairline bg-canvas px-2.5 text-xs font-semibold text-ink"
                >
                  {COURSE_CATALOG_OPTIONS.map((c) => (
                    <option key={c.slug} value={c.title}>
                      {c.title}
                    </option>
                  ))}
                </select>
              </div>
              <textarea
                rows={3}
                placeholder="Counselor notes..."
                value={newNotes}
                onChange={(e) => setNewNotes(e.target.value)}
                className="w-full rounded-[8px] border border-hairline bg-canvas p-3 text-sm text-ink"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="rounded-[8px] border border-hairline px-4 py-2 text-xs font-semibold text-ink"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="rounded-[8px] bg-brand-primary px-4 py-2 text-xs font-semibold text-white disabled:opacity-60"
                >
                  {creating ? "Saving..." : "Save Lead"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
