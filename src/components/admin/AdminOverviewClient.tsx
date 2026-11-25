"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import AdminShell from "./AdminShell";
import { LEAD_STATUS_META, type LeadStatus } from "@/lib/admin/types";
import { buildWhatsAppFollowUpUrl } from "@/lib/admin/validation";

interface OverviewResponse {
  ok: boolean;
  stats: {
    leads: { total: number; new: number; enrolled: number };
    reviews: { total: number; approved: number; pending: number };
    certificates: { total: number; valid: number };
  };
  weeklyLeads: Array<{ day: string; count: number }>;
  campusBreakdown: Array<{
    campus: string;
    subtitle: string;
    leads: number;
    phone: string;
  }>;
  recentLeads: Array<{
    id: string;
    leadId: string;
    name: string;
    phone: string;
    course: string;
    campus: string;
    status: LeadStatus;
    createdAt: string;
  }>;
  error?: string;
}

const FALLBACK_DAYS = [
  { day: "Mon", count: 0 },
  { day: "Tue", count: 0 },
  { day: "Wed", count: 0 },
  { day: "Thu", count: 0 },
  { day: "Fri", count: 0 },
  { day: "Sat", count: 0 },
  { day: "Sun", count: 0 },
];

export default function AdminOverviewClient({
  adminId,
  dbConfigured,
}: {
  adminId: string;
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [data, setData] = useState<OverviewResponse | null>(null);
  const [loading, setLoading] = useState(dbConfigured);
  const [error, setError] = useState<string | null>(
    dbConfigured ? null : "MONGODB_URI is not configured in environment variables.",
  );

  const loadOverview = useCallback(async () => {
    if (!dbConfigured) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/overview", { cache: "no-store" });
      if (res.status === 401) {
        router.refresh();
        return;
      }
      const json: OverviewResponse = await res.json();
      if (!res.ok || !json.ok) {
        setError(json.error || "Could not load overview metrics.");
      } else {
        setData(json);
      }
    } catch {
      setError("Network error while loading overview metrics.");
    } finally {
      setLoading(false);
    }
  }, [dbConfigured, router]);

  useEffect(() => {
    if (!dbConfigured) return;
    const t = window.setTimeout(() => {
      void loadOverview();
    }, 0);
    return () => window.clearTimeout(t);
  }, [dbConfigured, loadOverview]);

  const weekly = data?.weeklyLeads?.length ? data.weeklyLeads : FALLBACK_DAYS;
  const maxDayCount = Math.max(1, ...weekly.map((w) => w.count));
  const totalWeekLeads = weekly.reduce((acc, w) => acc + w.count, 0);

  const campuses = data?.campusBreakdown || [
    { campus: "Vijay Nagar", subtitle: "Shagun Tower · Main Hub", leads: 0, phone: "+91 94796 11441" },
    { campus: "Bhawarkua", subtitle: "Indrapuri · Student Hub", leads: 0, phone: "+91 91091 83932" },
    { campus: "Annapurna", subtitle: "Annapurna Main Road", leads: 0, phone: "+91 94796 11441" },
  ];

  return (
    <AdminShell
      adminId={adminId}
      headerTitle={`Welcome, ${adminId}!`}
      headerAction={
        <button
          type="button"
          onClick={() => void loadOverview()}
          disabled={loading}
          className="inline-flex h-9 items-center rounded-full bg-[#0B1215] px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? "Refreshing..." : "Refresh Data"}
        </button>
      }
    >
      {error && (
        <div className="mb-5 rounded-[16px] border border-amber-200 bg-amber-50/80 px-4 py-3 text-xs font-medium text-amber-900">
          {error}
        </div>
      )}

      {/* Top 3 Pastel-Gradient KPI Cards (Inspired by calm SaaS reference) */}
      <section className="grid gap-4 md:grid-cols-3">
        <Link
          href="/admin/leads"
          className="group flex items-center gap-4 rounded-[18px] bg-gradient-to-r from-[#E6F7F5] via-[#EEF9F8] to-[#F4FBFA] p-4 transition-all hover:shadow-[0_6px_20px_-10px_rgba(14,110,107,0.35)]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#0E6E6B] shadow-xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
              <circle cx="9" cy="7" r="4" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-[#475569]">Admissions Leads</div>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0B1215]">
                {loading ? "—" : `${data?.stats.leads.new ?? 0}/${data?.stats.leads.total ?? 0}`}
              </span>
              <span className="text-xs font-medium text-[#64748B]">new / total</span>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/reviews"
          className="group flex items-center gap-4 rounded-[18px] bg-gradient-to-r from-[#EEF2FF] via-[#F2F4FF] to-[#F7F8FF] p-4 transition-all hover:shadow-[0_6px_20px_-10px_rgba(79,70,229,0.28)]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#4338CA] shadow-xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-[#475569]">Verified Reviews</div>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0B1215]">
                {loading ? "—" : data?.stats.reviews.approved ?? 0}
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                live · {data?.stats.reviews.pending ?? 0} pending
              </span>
            </div>
          </div>
        </Link>

        <Link
          href="/admin/certificates"
          className="group flex items-center gap-4 rounded-[18px] bg-gradient-to-r from-[#FCEFF4] via-[#FDF4F7] to-[#FFF8FA] p-4 transition-all hover:shadow-[0_6px_20px_-10px_rgba(190,24,93,0.22)]"
        >
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-[#BE185D] shadow-xs">
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9">
              <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
              <path d="M9 15l2 2 4-4" />
            </svg>
          </div>
          <div className="min-w-0">
            <div className="text-xs font-medium text-[#475569]">Certificates Registry</div>
            <div className="mt-0.5 flex items-baseline gap-1.5">
              <span className="text-2xl font-bold tracking-tight text-[#0B1215]">
                {loading ? "—" : data?.stats.certificates.valid ?? 0}
              </span>
              <span className="text-xs font-medium text-[#64748B]">
                valid of {data?.stats.certificates.total ?? 0}
              </span>
            </div>
          </div>
        </Link>
      </section>

      {/* Middle 2-Column Grid: Weekly Activity Bar Chart + Indore Campuses Panel */}
      <section className="mt-5 grid gap-5 lg:grid-cols-12">
        {/* Left: Weekly Admissions Inquiries Chart */}
        <div className="rounded-[20px] border border-[#EAEDF2] bg-white p-5 sm:p-6 lg:col-span-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-3">
              <h2 className="text-base font-semibold text-[#0B1215]">Admissions Inquiries</h2>
              <span className="rounded-full bg-[#F3F5F8] px-2.5 py-0.5 text-[11px] font-medium text-[#64748B]">
                Last 7 days
              </span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-[#0B1215]">{totalWeekLeads}</span>
              <span className="text-xs text-[#64748B]">leads this week</span>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="relative mt-8 flex h-[200px] items-end justify-between gap-2.5 pt-6 sm:gap-4">
            {/* Subtle dashed peak reference line */}
            <div className="pointer-events-none absolute inset-x-0 top-6 flex items-center gap-2">
              <span className="rounded-full bg-[#0E6E6B] px-2 py-0.5 text-[10px] font-semibold text-white">
                peak
              </span>
              <div className="h-px flex-1 border-t border-dashed border-[#0E6E6B]/35" />
            </div>

            {weekly.map((item) => {
              const isPeak = item.count === maxDayCount && item.count > 0;
              const pct = item.count > 0 ? Math.max(18, Math.round((item.count / maxDayCount) * 100)) : 12;
              return (
                <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <div className="relative flex w-full flex-1 items-end justify-center">
                    <div
                      style={{ height: `${pct}%` }}
                      className={`relative flex w-full max-w-[64px] flex-col items-center rounded-t-[14px] rounded-b-[8px] transition-all ${
                        isPeak
                          ? "bg-gradient-to-b from-[#0E6E6B] to-[#67C7C1]"
                          : "bg-[#F1F5F9]"
                      }`}
                    >
                      <span
                        className={`-mt-3 rounded-full px-2 py-0.5 text-[10.5px] font-semibold shadow-2xs ${
                          isPeak
                            ? "bg-[#0E6E6B] text-white"
                            : "border border-[#E2E8F0] bg-white text-[#334155]"
                        }`}
                      >
                        {item.count}
                      </span>
                    </div>
                  </div>
                  <span className="text-xs font-medium text-[#64748B]">{item.day}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Indore Campuses Panel (matches "Care team" card) */}
        <div className="flex flex-col justify-between rounded-[20px] border border-[#EAEDF2] bg-white p-5 sm:p-6 lg:col-span-4">
          <div>
            <div className="flex items-center justify-between">
              <h2 className="text-base font-semibold text-[#0B1215]">Indore Campuses</h2>
              <Link href="/admin/leads" className="text-xs font-semibold text-[#0E6E6B] hover:underline">
                See all
              </Link>
            </div>

            <div className="mt-4 space-y-3">
              {campuses.map((c) => (
                <Link
                  key={c.campus}
                  href="/admin/leads"
                  className="flex items-center justify-between gap-3 rounded-[14px] p-2 transition-colors hover:bg-[#F7F8FB]"
                >
                  <div className="flex min-w-0 items-center gap-3">
                    <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#E6F7F5] text-xs font-bold text-[#0E6E6B]">
                      {c.campus.slice(0, 2).toUpperCase()}
                      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500" />
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-sm font-semibold text-[#0B1215]">
                        {c.campus}
                      </div>
                      <div className="truncate text-[11.5px] text-[#64748B]">{c.subtitle}</div>
                    </div>
                  </div>
                  <span className="shrink-0 rounded-full border border-[#E6E9F0] bg-[#F8FAFC] px-2.5 py-1 text-[11px] font-semibold text-[#0B1215]">
                    {c.leads} leads
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/admin/reviews"
            className="mt-5 flex h-10 w-full items-center justify-center rounded-full border border-[#DCE1EA] bg-white text-xs font-semibold text-[#0B1215] transition-colors hover:border-[#0B1215]"
          >
            + Add Verified Review
          </Link>
        </div>
      </section>

      {/* Bottom Table Card: Recent Leads Tracker */}
      <section className="mt-5 rounded-[20px] border border-[#EAEDF2] bg-white">
        <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-4">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-[#0B1215]">Recent Admissions Tracker</h2>
            <span className="rounded-full bg-[#F1F5F9] px-2.5 py-0.5 text-[11px] font-semibold text-[#334155]">
              +{data?.stats.leads.new ?? 0} new
            </span>
          </div>
          <Link
            href="/admin/leads"
            className="text-xs font-semibold text-[#0E6E6B] hover:underline"
          >
            Manage all leads →
          </Link>
        </div>

        <div className="overflow-x-auto border-t border-[#F1F5F9]">
          {loading ? (
            <div className="p-6 text-sm text-[#64748B]">Loading recent inquiries...</div>
          ) : !data || data.recentLeads.length === 0 ? (
            <div className="p-8 text-center text-sm text-[#64748B]">
              No inquiries recorded in MongoDB yet. Submissions from your website forms will appear here automatically.
            </div>
          ) : (
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead>
                <tr className="border-b border-[#F1F5F9] text-[11px] font-semibold text-[#8B95A5]">
                  <th className="px-6 py-3">Student</th>
                  <th className="px-4 py-3">Course</th>
                  <th className="px-4 py-3">Campus</th>
                  <th className="px-4 py-3">Received</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-6 py-3 text-right">Follow-up</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#F1F5F9]">
                {data.recentLeads.map((lead) => {
                  const meta = LEAD_STATUS_META[lead.status] || LEAD_STATUS_META.new;
                  return (
                    <tr key={lead.id} className="transition-colors hover:bg-[#FAFBFC]">
                      <td className="px-6 py-3.5">
                        <div className="font-semibold text-[#0B1215]">{lead.name}</div>
                        <div className="text-xs text-[#64748B]">{lead.phone}</div>
                      </td>
                      <td className="px-4 py-3.5 text-xs font-medium text-[#334155]">
                        {lead.course || "General Counseling"}
                      </td>
                      <td className="px-4 py-3.5 text-xs text-[#64748B]">{lead.campus}</td>
                      <td className="px-4 py-3.5 text-xs text-[#64748B]">
                        {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                          day: "2-digit",
                          month: "short",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </td>
                      <td className="px-4 py-3.5">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-semibold ${meta.badgeClass}`}
                        >
                          {meta.label}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-right">
                        <a
                          href={buildWhatsAppFollowUpUrl(
                            lead.phone,
                            lead.name,
                            lead.course,
                            lead.campus,
                          )}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center rounded-full bg-[#0E6E6B] px-3 py-1 text-xs font-semibold text-white hover:opacity-90"
                        >
                          WhatsApp ↗
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </section>
    </AdminShell>
  );
}
