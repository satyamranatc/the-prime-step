"use client";

import type { MouseEvent } from "react";
import Magnetic from "./Magnetic";
import { scrollToId } from "@/lib/scroll";

type Variant = "primary" | "ghost" | "light";

const styles: Record<Variant, string> = {
  primary: "bg-brand text-white hover:bg-deep",
  ghost: "border border-deep/40 text-deep hover:bg-deep hover:text-white",
  light: "bg-paper text-deep hover:bg-pale",
};

/** Button / link with a rolling label and arrow. `href="#id"` smooth-scrolls via Lenis. */
export default function CTA({
  href,
  label,
  variant = "primary",
}: {
  href: string;
  label: string;
  variant?: Variant;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToId(href.slice(1));
    }
  };
  return (
    <Magnetic>
      <a
        href={href}
        onClick={onClick}
        data-cursor
        className={`group relative inline-flex items-center gap-4 rounded-full py-2 pr-2 pl-7 text-[0.95rem] font-medium transition-colors duration-500 ${styles[variant]}`}
      >
        <span className="relative block overflow-hidden">
          <span className="block transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:-translate-y-full">
            {label}
          </span>
          <span
            aria-hidden="true"
            className="absolute inset-0 translate-y-full transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:translate-y-0"
          >
            {label}
          </span>
        </span>
        <span className="grid size-11 place-items-center rounded-full bg-white/15 transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:rotate-45">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" />
          </svg>
        </span>
      </a>
    </Magnetic>
  );
}

