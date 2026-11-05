"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import Split from "@/components/ui/Split";
import CTA from "@/components/ui/CTA";

const N = 8;
const fills = ["fill-soft", "fill-pale", "fill-pale", "fill-light", "fill-light", "fill-light", "fill-paper", "fill-brand"];

/** Chapter 06 — the stairs assemble as you scroll; the last step is yours. */
export default function NextStep() {
  const section = useRef<HTMLElement>(null);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const steps = sec.querySelectorAll("[data-step]");
      const tl = gsap
        .timeline({
          scrollTrigger: {
            trigger: sec,
            start: "top 80%",
            end: "bottom bottom",
            scrub: 1,
          },
        })
        .from(steps, { yPercent: 90, stagger: 0.1, ease: "power2.out" }, 0)
        .from("[data-sun]", { yPercent: 45, opacity: 0.2, ease: "power2.out" }, 0.2)
        .from("[data-cta]", { opacity: 0, y: 24, ease: "power2.out" }, 0.4);
      return () => {
        tl.kill();
      };
    });
    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      id="admission"
      aria-labelledby="admission-title"
      className="relative min-h-[100svh] overflow-hidden bg-deep text-paper"
    >
      {/* Horizon + sun */}
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMaxYMax slice"
        className="pointer-events-none absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <circle data-sun cx="930" cy="250" r="190" className="fill-brand" />
        <line x1="0" y1="620" x2="1200" y2="620" className="stroke-light/50" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {Array.from({ length: N }).map((_, i) => {
          const w = 150;
          const h = 30 + i * 48;
          return (
            <rect
              key={i}
              data-step
              x={i * w}
              y={620 - h + 80}
              width={w}
              height={h}
              className={`${fills[i]} stroke-deep`}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <div className="relative mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-start px-6 pt-32 pb-12 md:px-10 md:pt-36">
        <Chapter n="06" title="The next step" dark />
        <h2 id="admission-title" className="display mt-8 text-[17vw] text-paper md:text-[9vw]">
          <Split text="The next step|is *yours.*" dark />
        </h2>
        <p className="mt-6 max-w-md text-lg leading-relaxed text-pale" data-fade>
          Speak with our admissions team about the right program for you.
        </p>

        <div data-cta className="mt-8 flex flex-wrap items-center gap-4">
          <CTA href={SITE.phoneHref} label={`Call ${SITE.phone}`} variant="light" />
          <CTA href={`mailto:${SITE.email}`} label="Email admissions" variant="primary" />
        </div>
      </div>
    </section>
  );
}

