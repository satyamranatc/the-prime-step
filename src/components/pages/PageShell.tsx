"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import Nav from "@/components/features/Nav";
import NextStep from "@/components/features/NextStep";
import Footer from "@/components/features/Footer";
import StickyLeadBar from "@/components/ui/StickyLeadBar";

export default function PageShell({
  children,
  breadcrumbs,
  title,
  eyebrow,
  lead,
  hideNextStep = false,
}: {
  children: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  title?: string;
  eyebrow?: string;
  lead?: string;
  hideNextStep?: boolean;
}) {
  return (
    <div id="top" className="min-h-screen bg-paper text-ink">
      <Nav />

      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1380px] px-4 pt-24 sm:px-6 md:pt-28 lg:px-10"
        >
          <ol className="flex flex-wrap items-center gap-2 font-mono text-[11.5px] uppercase tracking-wider text-ink-subtle">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-2">
                  {idx > 0 && (
                    <span aria-hidden="true" className="text-hairline">
                      /
                    </span>
                  )}
                  {isLast ? (
                    <span className="font-semibold text-brand" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link
                      href={item.path}
                      className="transition-colors hover:text-ink"
                    >
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}

      {title && (
        <header
          className={`mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10 ${
            breadcrumbs && breadcrumbs.length > 0 ? "pt-6 pb-10 md:pt-8 md:pb-14" : "pt-28 pb-10 md:pt-36 md:pb-14"
          }`}
        >
          <div className="max-w-3xl border-b border-hairline pb-8 md:pb-10">
            {eyebrow && <span className="eyebrow mb-3 block text-brand">{eyebrow}</span>}
            <h1 className="display text-[clamp(2rem,4.4vw,3.5rem)] text-ink break-words">
              {title}
            </h1>
            {lead && (
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-ink-muted md:text-lg">
                {lead}
              </p>
            )}
          </div>
        </header>
      )}

      <main className="px-4 pb-20 sm:px-6 md:pb-28 lg:px-10">{children}</main>
      {!hideNextStep && <NextStep />}
      <Footer />
      <StickyLeadBar />
    </div>
  );
}
