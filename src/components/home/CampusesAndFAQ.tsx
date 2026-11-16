"use client";

import { useState } from "react";
import Link from "next/link";
import { BRANCHES, FAQS, SITE, mapsLink } from "@/lib/content";
import { GOOGLE_RATING, TESTIMONIALS } from "@/lib/homepage";
import CTA from "@/components/ui/CTA";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "./SectionHeading";

const BRANCH_SLUGS: Record<string, string> = {
  "Vijay Nagar": "/vijay-nagar",
  Bhawarkua: "/bhawarkua",
  Annapurna: "/annapurna",
};

/** Google Rating card, optional verified testimonials, 3 Indore campuses, and FAQ accordion. */
export default function CampusesAndFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="trust-faq"
      aria-labelledby="campuses-title"
      className="relative border-t border-pale/60 bg-soft/40 py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-12">
        {/* 1. Google Reviews Verification Banner */}
        <div
          data-fade
          className="rounded-3xl border border-pale/90 bg-paper p-6 shadow-2xs sm:p-8 md:p-10"
        >
          <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <p className="eyebrow text-brand">Verified student rating on Google</p>
              <div className="mt-2 flex flex-wrap items-baseline gap-3">
                <span className="display text-4xl text-deep sm:text-5xl">
                  {GOOGLE_RATING.rating} ★
                </span>
                <span className="text-base font-semibold text-deep sm:text-lg">
                  from {GOOGLE_RATING.countLabel}
                </span>
              </div>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-deep/80 sm:text-base">
                Read genuine feedback directly on Google Maps from students who attended classes across our Vijay Nagar, Bhawarkua and Annapurna campuses.
              </p>
            </div>

            <a
              href={GOOGLE_RATING.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-deep px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-brand"
            >
              <span>Read reviews on Google</span>
              <span aria-hidden="true">↗</span>
            </a>
          </div>

          {TESTIMONIALS.length > 0 && (
            <div className="mt-8 grid gap-4 border-t border-pale/70 pt-8 md:grid-cols-2">
              {TESTIMONIALS.map((t) => (
                <blockquote
                  key={t.name}
                  className="flex flex-col justify-between rounded-2xl border border-pale/80 bg-soft/50 p-6"
                >
                  <p className="text-sm leading-relaxed text-deep/90">&ldquo;{t.quote}&rdquo;</p>
                  <footer className="mt-4 flex items-center justify-between border-t border-pale/60 pt-3 text-xs">
                    <strong className="font-semibold text-deep">{t.name}</strong>
                    <span className="text-deep/70">
                      {t.course} · {t.source}
                    </span>
                  </footer>
                </blockquote>
              ))}
            </div>
          )}
        </div>

        {/* 2. Three Indore Campuses */}
        <div id="campuses" className="mt-16 scroll-mt-24 md:mt-24">
          <SectionHeading
            id="campuses-title"
            eyebrow="3 Centres in Indore"
            title={
              <>
                Visit our classrooms <span className="text-brand">in Indore.</span>
              </>
            }
            lead="Practical computer labs, small-group mentorship and free 2-day demo classes at all three branches."
          />

          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-3">
            {BRANCHES.map((b) => {
              const branchHref = BRANCH_SLUGS[b.name];
              return (
                <article
                  key={b.name}
                  data-fade
                  className="spotlight-card group flex flex-col justify-between rounded-3xl border border-pale/90 bg-paper p-6 shadow-2xs transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1.5 hover:border-brand/50 hover:shadow-[0_22px_44px_-22px_rgba(15,82,80,0.34)] sm:p-8"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="eyebrow text-brand">{b.tag}</span>
                      <span className="rounded-full bg-soft px-2.5 py-1 font-mono text-[11px] font-semibold text-deep">
                        Open Mon–Sat
                      </span>
                    </div>
                    <h3 className="display mt-3 text-2xl font-bold text-deep">
                      {branchHref ? (
                        <Link href={branchHref} className="hover:text-brand">
                          {b.name} Campus
                        </Link>
                      ) : (
                        `${b.name} Campus`
                      )}
                    </h3>
                    <p className="mt-1.5 text-xs font-semibold text-brand">{b.landmark}</p>
                    <p className="mt-3 text-sm leading-relaxed text-deep/80">{b.address}</p>
                    <p className="mt-3 font-mono text-xs text-deep/70">{b.hours}</p>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-pale/70 pt-5">
                    <div className="flex items-center gap-3">
                      <a
                        href={mapsLink(b.address)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand hover:underline"
                      >
                        <span>Google Maps</span>
                        <span aria-hidden="true">↗</span>
                      </a>
                      {branchHref && (
                        <Link
                          href={branchHref}
                          className="text-xs font-semibold text-deep/80 hover:text-brand"
                        >
                          Branch details →
                        </Link>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={SITE.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`WhatsApp ${b.name} campus`}
                        className="grid size-8 place-items-center rounded-full border border-deep/15 bg-soft text-brand transition-colors hover:border-brand hover:bg-brand hover:text-paper"
                      >
                        <WhatsAppIcon className="size-3.5 fill-current" />
                      </a>
                      <a
                        href={b.phoneHref}
                        className="rounded-full border border-deep/15 bg-soft px-3 py-1.5 text-xs font-semibold text-deep transition-colors hover:border-brand"
                      >
                        Call
                      </a>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>

        {/* 3. Frequently Asked Questions */}
        <div className="mt-20 md:mt-28">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="faq-title"
              eyebrow="Common questions"
              title={
                <>
                  Everything you <span className="text-brand">need to know.</span>
                </>
              }
              lead="Clear answers about eligibility, demo classes, installment options, doubt clearing and placement assistance."
            />
            <Link
              href="/faq"
              className="group hidden shrink-0 items-center gap-2 text-sm font-semibold text-brand hover:text-deep md:inline-flex"
            >
              View all FAQs
              <span aria-hidden="true" className="transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </Link>
          </div>

          <div className="mt-10 max-w-4xl space-y-3">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className={`rounded-2xl border bg-paper transition-all duration-300 ${
                    isOpen ? "border-brand/50 shadow-xs" : "border-pale/90 hover:border-brand/40"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="group flex w-full items-center justify-between gap-4 p-5 text-left sm:p-6"
                    aria-expanded={isOpen}
                  >
                    <span className="text-sm font-semibold text-deep transition-colors duration-300 group-hover:text-brand sm:text-base md:text-lg">
                      {faq.q}
                    </span>
                    <span
                      aria-hidden="true"
                      className={`grid size-8 shrink-0 place-items-center rounded-full border border-deep/15 font-mono text-sm text-brand transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 border-brand bg-brand text-paper"
                          : "bg-soft group-hover:scale-105 group-hover:border-brand"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  <div
                    className={`grid transition-[grid-template-rows] duration-300 ease-out ${
                      isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-pale/60 px-5 pt-4 pb-6 text-sm leading-relaxed text-deep/85 sm:px-6 sm:text-base">
                        {faq.a}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
            <CTA href={SITE.phoneHref} label={`Call ${SITE.phoneDisplay}`} className="w-full sm:w-auto justify-center" />
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-brand/30 bg-paper px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:border-brand hover:bg-brand hover:text-paper sm:w-auto"
            >
              <WhatsAppIcon className="size-4 fill-current" />
              <span>WhatsApp Counsellor</span>
            </a>
            <CTA href="#admission" label="Book Free 2-Day Demo" variant="ghost" className="w-full sm:w-auto justify-center" />
          </div>
        </div>
      </div>
    </section>
  );
}
