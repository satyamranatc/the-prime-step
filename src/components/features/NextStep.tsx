"use client";

import Link from "next/link";
import { SITE } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";
import { Reveal } from "@/components/ui/Motion";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function NextStep() {
  return (
    <section
      id="admission"
      aria-labelledby="admission-title"
      className="relative overflow-hidden border-t border-white/10 bg-obsidian py-20 text-white md:py-28"
    >
      <div
        aria-hidden="true"
        className="arch-grid-dark pointer-events-none absolute inset-0 opacity-60"
      />
      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <Chapter n="07" title="Admissions & Free Demo" dark />
            <h2
              id="admission-title"
              className="display mt-5 max-w-2xl text-[clamp(2rem,4.5vw,3.75rem)] text-white"
            >
              Attend two real lab sessions before you decide.
            </h2>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-white/75 md:text-lg">
              Visit our Vijay Nagar, Bhawarkua, or Annapurna campus, meet the faculty, and test our teaching style first-hand — completely free.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap lg:justify-end">
            <CTA
              href={SITE.phoneHref}
              label={`Call ${SITE.phoneDisplay}`}
              variant="light"
              className="w-full sm:w-auto"
            />
            <CTA
              href={SITE.whatsappHref}
              label="WhatsApp Admissions"
              variant="ghost-light"
              icon={<WhatsAppIcon className="size-4 fill-current text-light" />}
              className="w-full sm:w-auto"
            />
            <Link
              href="/contact-us"
              className="inline-flex min-h-[48px] items-center justify-center rounded-full px-5 text-sm font-semibold text-white/80 underline-offset-4 transition-colors hover:text-white hover:underline"
            >
              View campus addresses →
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
