"use client";

import type { MouseEvent, ReactNode } from "react";
import { scrollToId } from "@/lib/scroll";

type Variant = "primary" | "ghost" | "light" | "ghost-light";

const styles: Record<Variant, string> = {
  primary:
    "bg-ink text-white hover:bg-brand shadow-[0_1px_2px_rgba(11,18,21,0.08)]",
  ghost:
    "border border-hairline bg-paper text-ink hover:border-ink/40 hover:bg-canvas",
  light:
    "bg-white text-ink hover:bg-accent-soft hover:text-brand",
  "ghost-light":
    "border border-white/25 bg-white/5 text-white hover:border-white/60 hover:bg-white/10",
};

export default function CTA({
  href,
  label,
  variant = "primary",
  icon,
  target,
  rel,
  className = "",
}: {
  href: string;
  label: string;
  variant?: Variant;
  icon?: ReactNode;
  target?: string;
  rel?: string;
  className?: string;
}) {
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      scrollToId(href.slice(1));
    }
  };

  const isExternal = href.startsWith("http://") || href.startsWith("https://");
  const resolvedTarget = target ?? (isExternal ? "_blank" : undefined);
  const resolvedRel = rel ?? (isExternal ? "noopener noreferrer" : undefined);

  return (
    <a
      href={href}
      onClick={onClick}
      target={resolvedTarget}
      rel={resolvedRel}
      className={`press-scale group inline-flex min-h-[48px] items-center justify-center gap-2.5 rounded-full px-6 py-3 text-[14.5px] font-semibold ${styles[variant]} ${className}`}
    >
      <span>{label}</span>
      <span
        aria-hidden="true"
        className="inline-flex items-center transition-transform duration-200 group-hover:translate-x-0.5"
      >
        {icon ?? (
          <svg width="15" height="15" viewBox="0 0 16 16" fill="none">
            <path
              d="M3.5 8h9M8.5 4l4 4-4 4"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
      </span>
    </a>
  );
}
