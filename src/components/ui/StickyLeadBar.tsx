"use client";

import Link from "next/link";
import { SITE } from "@/lib/content";

/**
 * Sticky mobile bottom conversion bar (Call / WhatsApp / Free Demo)
 * + subtle desktop floating WhatsApp counselor pill.
 */
export default function StickyLeadBar() {
  const waUrl = `${SITE.whatsappHref}?text=${encodeURIComponent(
    "Hi The Prime Step! I want to inquire about courses, fees, and a free 2-day demo class."
  )}`;

  return (
    <>
      {/* Desktop Floating WhatsApp Pill */}
      <a
        href={waUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Career Counselor on WhatsApp"
        className="fixed right-6 bottom-6 z-[110] hidden md:inline-flex items-center gap-2.5 rounded-full border border-pale/80 bg-paper/95 px-4 py-2.5 text-xs font-semibold text-deep shadow-[0_10px_30px_rgba(15,82,80,0.14)] backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-brand hover:bg-brand hover:text-white"
      >
        <span className="relative flex size-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#25D366] opacity-75" />
          <span className="relative inline-flex size-2.5 rounded-full bg-[#25D366]" />
        </span>
        <span>WhatsApp Counselor</span>
      </a>

      {/* Mobile Sticky Bottom Action Bar */}
      <div className="fixed inset-x-0 bottom-0 z-[110] border-t border-hairline bg-paper/95 px-3 pt-2.5 shadow-[0_-8px_28px_rgba(11,18,21,0.08)] backdrop-blur-xl md:hidden safe-bottom safe-x">
        <div className="mx-auto grid max-w-md grid-cols-3 gap-2">
          <a
            href={SITE.phoneHref}
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full border border-hairline bg-canvas px-2 text-xs font-semibold text-ink active:scale-[0.98]"
          >
            <span>Call Now</span>
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-brand px-2 text-xs font-semibold text-white shadow-[0_6px_16px_-6px_rgba(14,110,107,0.65)] active:scale-[0.98]"
          >
            <span>WhatsApp</span>
          </a>
          <Link
            href="/contact-us"
            className="flex min-h-[44px] items-center justify-center gap-1.5 rounded-full bg-ink px-2 text-xs font-semibold text-white active:scale-[0.98]"
          >
            <span>Free Demo</span>
          </Link>
        </div>
      </div>
    </>
  );
}

