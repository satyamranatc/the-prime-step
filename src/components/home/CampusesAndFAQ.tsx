"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { BRANCHES, FAQS, mapsLink } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import { EASE_OUT, Reveal } from "@/components/ui/Motion";

const BRANCH_ROUTES: Record<string, string> = {
  "Vijay Nagar": "/vijay-nagar",
  Bhawarkua: "/bhawarkua",
  Annapurna: "/annapurna",
};

export default function CampusesAndFAQ() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section
      id="campuses"
      aria-labelledby="campuses-title"
      className="border-t border-hairline bg-canvas py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          {/* Left: 3 Indore Campuses */}
          <Reveal>
            <Chapter n="06" title="Indore Campuses" />
            <h2
              id="campuses-title"
              className="display mt-4 text-[clamp(1.85rem,3.4vw,2.75rem)] text-ink"
            >
              Three accessible campuses across Indore.
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-muted md:text-base">
              Walk into your nearest center for a free career counseling session or attend a live 2-day practical demo class.
            </p>

            <div className="mt-8 divide-y divide-hairline border-y border-hairline">
              {BRANCHES.map((branch) => (
                <div key={branch.name} className="py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link
                      href={BRANCH_ROUTES[branch.name] ?? "/contact-us"}
                      className="text-lg font-bold text-ink transition-colors hover:text-brand"
                    >
                      {branch.name} Campus
                    </Link>
                    <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
                      {branch.tag}
                    </span>
                  </div>

                  <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                    {branch.address}
                  </p>
                  <p className="mt-1 font-mono text-xs text-ink-subtle">
                    {branch.hours}
                  </p>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-semibold">
                    <a
                      href={branch.phoneHref}
                      className="text-ink transition-colors hover:text-brand"
                    >
                      Call {branch.phone}
                    </a>
                    <span aria-hidden="true" className="text-hairline">
                      |
                    </span>
                    <a
                      href={mapsLink(branch.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand hover:underline"
                    >
                      Google Maps ↗
                    </a>
                    <span aria-hidden="true" className="text-hairline">
                      |
                    </span>
                    <Link
                      href={BRANCH_ROUTES[branch.name] ?? "/contact-us"}
                      className="text-ink-muted transition-colors hover:text-ink"
                    >
                      Campus details →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Right: Animated FAQ Accordion */}
          <Reveal delay={0.08}>
            <div className="flex items-end justify-between gap-4">
              <div>
                <span className="eyebrow text-brand">Questions Answered</span>
                <h2 className="display mt-3 text-[clamp(1.85rem,3.4vw,2.75rem)] text-ink">
                  Frequently asked questions.
                </h2>
              </div>
              <Link
                href="/faq"
                className="shrink-0 text-xs font-semibold text-brand hover:underline"
              >
                All FAQs →
              </Link>
            </div>

            <div className="mt-8 divide-y divide-hairline rounded-2xl border border-hairline bg-paper px-6">
              {FAQS.map((faq, idx) => {
                const isOpen = openIdx === idx;
                return (
                  <div key={faq.q} className="py-5">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIdx(isOpen ? null : idx)}
                      className="flex w-full items-center justify-between gap-4 text-left"
                    >
                      <span className="text-[15px] font-semibold text-ink">
                        {faq.q}
                      </span>
                      <span
                        aria-hidden="true"
                        className={`grid size-7 shrink-0 place-items-center rounded-full border border-hairline font-mono text-sm text-ink-muted transition-transform duration-200 ${
                          isOpen ? "rotate-45 border-brand text-brand" : ""
                        }`}
                      >
                        +
                      </span>
                    </button>

                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: EASE_OUT }}
                          className="overflow-hidden"
                        >
                          <p className="pt-3 pr-8 text-sm leading-relaxed text-ink-muted">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
