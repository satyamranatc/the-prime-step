"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

interface AdminNavItem {
  href: string;
  label: string;
  icon: "dashboard" | "leads" | "blog" | "reviews" | "certificates";
}

const PRIMARY_NAV: AdminNavItem[] = [
  { href: "/admin", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/leads", label: "Leads CRM", icon: "leads" },
  { href: "/admin/blog", label: "Blog CMS", icon: "blog" },
  { href: "/admin/reviews", label: "Verified Reviews", icon: "reviews" },
];

const SECONDARY_NAV: AdminNavItem[] = [
  { href: "/admin/certificates", label: "Certificates", icon: "certificates" },
];

function NavIcon({ name, active }: { name: AdminNavItem["icon"]; active: boolean }) {
  const cls = `h-[18px] w-[18px] shrink-0 ${active ? "text-[#0E6E6B]" : "text-[#6B7280]"}`;
  switch (name) {
    case "dashboard":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 10.5L12 3l9 7.5" />
          <path d="M5 9.5V20a1 1 0 001 1h12a1 1 0 001-1V9.5" />
        </svg>
      );
    case "leads":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M22 21v-2a4 4 0 00-3-3.87" />
          <path d="M16 3.13a4 4 0 010 7.75" />
        </svg>
      );
    case "blog":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 20h9" />
          <path d="M16.5 3.5a2.121 2.121 0 113 3L7 19l-4 1 1-4L16.5 3.5z" />
        </svg>
      );
    case "reviews":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
        </svg>
      );
    case "certificates":
      return (
        <svg className={cls} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
          <path d="M14 2v6h6M9 15l2 2 4-4" />
        </svg>
      );
  }
}

export default function AdminShell({
  adminId,
  headerTitle,
  headerAction,
  children,
}: {
  adminId: string;
  headerTitle?: string;
  headerAction?: ReactNode;
  children: ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/admin/auth/logout", { method: "POST" }).catch(() => null);
    router.refresh();
  };

  const initials = adminId
    .split(/[\s._-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() || "")
    .join("") || "AD";

  const isRouteActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  const sidebarContent = (
    <div className="flex h-full flex-col justify-between bg-[#F7F8FB] px-4 py-5">
      <div>
        {/* Brand Row */}
        <div className="flex items-center justify-between px-2 pb-5">
          <Link href="/admin" className="flex items-center gap-2.5">
            <Logo height={30} variant="color" />
          </Link>
          <span className="rounded-full border border-[#0E6E6B]/20 bg-[#0E6E6B]/[0.07] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.06em] text-[#0E6E6B]">
            Private
          </span>
        </div>

        {/* Primary Navigation */}
        <nav aria-label="Admin primary navigation" className="space-y-1">
          {PRIMARY_NAV.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[13.5px] transition-all ${
                  active
                    ? "bg-white font-semibold text-[#0B1215] shadow-[0_1px_4px_rgba(15,23,42,0.06)]"
                    : "font-medium text-[#52606D] hover:bg-white/60 hover:text-[#0B1215]"
                }`}
              >
                <NavIcon name={item.icon} active={active} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="my-4 h-px bg-[#E6E9F0]" />

        {/* Secondary Navigation */}
        <div className="px-3 pb-1.5 text-[10.5px] font-semibold uppercase tracking-[0.08em] text-[#8B95A5]">
          Credentials &amp; Portal
        </div>
        <nav aria-label="Admin secondary navigation" className="space-y-1">
          {SECONDARY_NAV.map((item) => {
            const active = isRouteActive(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 text-[13.5px] transition-all ${
                  active
                    ? "bg-white font-semibold text-[#0B1215] shadow-[0_1px_4px_rgba(15,23,42,0.06)]"
                    : "font-medium text-[#52606D] hover:bg-white/60 hover:text-[#0B1215]"
                }`}
              >
                <NavIcon name={item.icon} active={active} />
                <span>{item.label}</span>
              </Link>
            );
          })}

          <Link
            href="/verify-certificate"
            target="_blank"
            className="flex items-center justify-between rounded-[12px] px-3 py-2 text-[12.5px] font-medium text-[#6B7280] transition-colors hover:bg-white/60 hover:text-[#0B1215]"
          >
            <span>Verify Portal</span>
            <span className="text-[11px]">↗</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="flex items-center justify-between rounded-[12px] px-3 py-2 text-[12.5px] font-medium text-[#6B7280] transition-colors hover:bg-white/60 hover:text-[#0B1215]"
          >
            <span>Public Website</span>
            <span className="text-[11px]">↗</span>
          </Link>
        </nav>
      </div>

      {/* Bottom Profile Card */}
      <div className="mt-6 border-t border-[#E6E9F0] pt-4">
        <div className="flex items-center justify-between gap-2 rounded-[14px] bg-white p-2.5 shadow-[0_1px_3px_rgba(15,23,42,0.04)]">
          <div className="flex min-w-0 items-center gap-2.5">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-[#0E6E6B] to-[#1D9A95] text-xs font-bold text-white">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="truncate text-xs font-semibold text-[#0B1215]">{adminId}</div>
              <div className="text-[11px] text-[#6B7280]">Admin · Secured</div>
            </div>
          </div>
          <button
            type="button"
            onClick={handleLogout}
            title="Sign out"
            className="rounded-[8px] px-2 py-1 text-[11px] font-semibold text-[#6B7280] transition-colors hover:bg-red-50 hover:text-red-600"
          >
            Exit
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#EEF1F6] p-0 lg:p-4">
      <div className="mx-auto flex min-h-screen max-w-[1460px] overflow-hidden bg-[#FAFBFC] lg:min-h-[calc(100vh-2rem)] lg:rounded-[24px] lg:border lg:border-[#E4E8F0] lg:shadow-[0_18px_50px_-24px_rgba(15,23,42,0.16)]">
        {/* Desktop Sidebar */}
        <aside className="hidden w-[248px] shrink-0 border-r border-[#EAEDF2] lg:block">
          {sidebarContent}
        </aside>

        {/* Mobile Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 flex lg:hidden">
            <div className="w-[260px] max-w-[82vw] border-r border-[#EAEDF2] shadow-2xl">
              {sidebarContent}
            </div>
            <button
              type="button"
              aria-label="Close menu"
              className="flex-1 bg-[#0B1215]/40 backdrop-blur-[2px]"
              onClick={() => setMobileMenuOpen(false)}
            />
          </div>
        )}

        {/* Main Workspace */}
        <div className="flex min-w-0 flex-1 flex-col">
          {/* Calm Top Utility Header */}
          <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-[#EEF0F4] bg-[#FAFBFC]/90 px-4 backdrop-blur-md sm:px-7">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open navigation"
                className="inline-flex h-9 w-9 items-center justify-center rounded-[10px] border border-[#E4E7EC] bg-white text-[#0B1215] lg:hidden"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <div className="truncate text-lg font-semibold tracking-tight text-[#0B1215] sm:text-xl">
                {headerTitle || `Welcome, ${adminId}!`}
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              <span className="hidden items-center gap-1.5 rounded-full border border-[#E6E9F0] bg-white px-3 py-1.5 text-xs font-medium text-[#52606D] sm:inline-flex">
                <span className="h-2 w-2 rounded-full bg-[#0E6E6B]" />
                Indore · 3 Campuses
              </span>
              <span className="hidden items-center gap-1 rounded-full border border-emerald-200 bg-emerald-50/80 px-2.5 py-1 text-[11px] font-semibold text-emerald-700 md:inline-flex">
                noindex · Private
              </span>
              {headerAction || (
                <Link
                  href="/admin/leads"
                  className="inline-flex h-9 items-center rounded-full bg-[#0B1215] px-4 text-xs font-semibold text-white transition-opacity hover:opacity-90"
                >
                  Open Leads →
                </Link>
              )}
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 px-4 py-6 sm:px-7 sm:py-7">{children}</main>
        </div>
      </div>
    </div>
  );
}
