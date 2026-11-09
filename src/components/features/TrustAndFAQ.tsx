"use client";

import { useState } from "react";
import { BRANCHES, FAQS, INSTITUTE_STATS, SITE, mapsLink } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function TrustAndFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="trust-faq" className="relative bg-paper py-24 md:py-36 border-t border-pale/60">
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <Chapter n="06" title="Indore Campus & Student Trust" />

        {/* 1. Verified Institute Trust Metrics */}
        <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-8">
          {INSTITUTE_STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-3xl border border-pale/80 bg-soft p-6 md:p-8 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="display text-3xl md:text-5xl font-bold text-brand">
                {s.value}
              </div>
              <div className="mt-2 text-sm md:text-base font-semibold text-deep">
                {s.label}
              </div>
              <div className="mt-1 text-xs text-deep/70">
                {s.note}
              </div>
            </div>
          ))}
        </div>

        {/* 2. Comprehensive Indore Campuses */}
        <div id="campuses" className="mt-16 md:mt-24 scroll-mt-28">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Central India Learning Infrastructure</p>
            <h2 className="display mt-2 text-3xl md:text-5xl font-bold text-deep">
              Visit our classrooms in Indore.
            </h2>
            <p className="mt-4 text-sm md:text-base text-deep/80 leading-relaxed">
              Equipped with high-performance development workstations, dedicated lab faculty, and air-conditioned discussion rooms. Drop by for a free counseling session or 2-day demo class.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {BRANCHES.map((b) => (
              <div
                key={b.name}
                className="flex flex-col justify-between rounded-3xl border border-pale/90 bg-soft/70 p-7 md:p-8 shadow-xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-brand">{b.tag}</span>
                    <span className="text-[11px] font-mono text-deep/70">Open Mon–Sat</span>
                  </div>
                  <h3 className="display mt-3 text-2xl font-bold text-deep">
                    {b.name} Campus
                  </h3>
                  <p className="mt-1.5 text-xs font-semibold text-brand">
                    {b.landmark}
                  </p>
                  <p className="mt-3 text-xs md:text-sm leading-relaxed text-deep/80">
                    {b.address}
                  </p>
                  <p className="mt-3 text-xs font-mono text-deep/70">
                    {b.hours}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-pale/60 flex flex-wrap items-center justify-between gap-3">
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-brand hover:underline inline-flex items-center gap-1.5"
                  >
                    <span>View on Google Maps</span>
                    <span>↗</span>
                  </a>
                  <div className="flex items-center gap-2">
                    <a
                      href={SITE.whatsappHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Chat on WhatsApp"
                      className="rounded-full bg-paper p-1.5 text-brand border border-deep/15 hover:border-brand hover:bg-brand hover:text-paper transition-colors"
                    >
                      <WhatsAppIcon className="size-3.5 fill-current" />
                    </a>
                    <a
                      href={b.phoneHref}
                      className="rounded-full bg-paper px-3 py-1.5 text-xs font-medium text-deep border border-deep/15 hover:border-brand transition-colors"
                    >
                      Call {b.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Frequently Asked Questions Accordion */}
        <div className="mt-20 md:mt-32">
          <div className="max-w-2xl">
            <p className="eyebrow text-brand">Common Queries &amp; Guidance</p>
            <h2 className="display mt-2 text-3xl md:text-5xl font-bold text-deep">
              Everything you need to know.
            </h2>
            <p className="mt-4 text-sm md:text-base text-deep/80 leading-relaxed">
              Clear, transparent answers about eligibility, zero-interest installment options, mentorship, and career assistance.
            </p>
          </div>

          <div className="mt-10 max-w-4xl space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openIndex === idx;
              return (
                <div
                  key={faq.q}
                  className="rounded-2xl border border-pale/90 bg-soft/50 transition-colors duration-300"
                >
                  <button
                    type="button"
                    onClick={() => toggleFaq(idx)}
                    className="flex w-full items-center justify-between p-6 text-left"
                    aria-expanded={isOpen}
                  >
                    <span className="text-base md:text-lg font-semibold text-deep pr-4">
                      {faq.q}
                    </span>
                    <span
                      className={`size-7 shrink-0 rounded-full border border-deep/20 flex items-center justify-center text-sm font-mono text-deep transition-transform duration-300 ${
                        isOpen ? "rotate-45 bg-deep text-paper" : "bg-paper"
                      }`}
                    >
                      +
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-1 text-sm md:text-base text-deep/85 leading-relaxed border-t border-pale/40">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <CTA href={SITE.phoneHref} label={`Call ${SITE.phoneDisplay}`} />
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-brand/30 bg-paper px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-paper hover:border-brand"
            >
              <WhatsAppIcon className="size-4 fill-current" />
              <span>WhatsApp Counselor</span>
            </a>
            <CTA href="#admission" label="Book Free 2-Day Demo" variant="ghost" />
          </div>
        </div>
      </div>
    </section>
  );
}

