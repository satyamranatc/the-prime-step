"use client";

import Link from "next/link";
import { MacbookScroll } from "@/components/ui/macbook-scroll";
import { Keyboard } from "@/components/ui/keyboard";
import Logo from "@/components/ui/Logo";

export default function MacbookShowcase() {
  return (
    <section
      id="lab-workspace"
      aria-labelledby="lab-workspace-title"
      className="relative w-full border-t border-hairline bg-paper"
      style={{
        isolation: "isolate",
        contain: "layout paint",
        clipPath: "inset(0)",          /* clips 3D-transformed children that escape overflow:hidden */
      }}
    >
      {/* 1. Official Aceternity MacbookScroll with Real Indore Practical Lab Content */}
      <MacbookScroll
        title={
          <span id="lab-workspace-title">
            Write production code from day one <br /> inside Indore&apos;s practical IT labs.
          </span>
        }
        badge={
          <Link href="/about-us" aria-label="The Prime Step Indore">
            <div className="flex items-center gap-1.5 rounded-full border border-hairline bg-white/95 px-2.5 py-1 shadow-sm">
              <Logo height={18} variant="color" />
            </div>
          </Link>
        }
        src="/brand/tps-practical-lab.jpg"
        showGradient={false}
      />

      {/* 2. Official Aceternity Interactive Mechanical Keyboard with Real Recorded Sound */}
      <div className="border-t border-hairline bg-canvas py-16 md:py-24">
        <div className="mx-auto max-w-[1220px] px-4 text-center sm:px-6 lg:px-10">
          <span className="eyebrow text-brand">
            Interactive Lab Experience · Sound On
          </span>
          <h2 className="display mt-3 text-[clamp(1.75rem,3.6vw,2.75rem)] font-bold text-ink">
            Built for people who love shipping real code.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
            Click any key or type on your keyboard — experience the tactile mechanical sound while exploring our hands-on labs across Vijay Nagar, Bhawarkua, and Annapurna.
          </p>

          <div className="mt-10 flex w-full items-center justify-center overflow-hidden py-4">
            <Keyboard enableSound showPreview />
          </div>
        </div>
      </div>
    </section>
  );
}
