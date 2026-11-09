"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { SITE } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import Split from "@/components/ui/Split";
import CTA from "@/components/ui/CTA";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const N = 8;
const fills = ["fill-soft", "fill-pale", "fill-pale", "fill-light", "fill-light", "fill-light", "fill-paper", "fill-brand"];
const desktopHeights = [20, 42, 70, 108, 156, 214, 280, 350];
const mobileHeights = [10, 20, 34, 52, 74, 100, 130, 164];

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
      {/* Desktop Horizon + sun + stairs (exponential curve keeps left side open) */}
      <svg
        viewBox="0 0 1200 700"
        preserveAspectRatio="xMaxYMax slice"
        className="pointer-events-none absolute inset-0 hidden h-full w-full md:block"
        aria-hidden="true"
      >
        <circle data-sun cx="930" cy="240" r="190" className="fill-brand" />
        <line x1="0" y1="670" x2="1200" y2="670" className="stroke-light/50" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {Array.from({ length: N }).map((_, i) => {
          const w = 150;
          const h = desktopHeights[i];
          return (
            <rect
              key={i}
              data-step
              x={i * w}
              y={670 - h}
              width={w}
              height={h}
              className={`${fills[i]} stroke-deep`}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      {/* Mobile Horizon + sun + stairs (proportional for mobile viewports) */}
      <svg
        viewBox="0 0 400 700"
        preserveAspectRatio="xMidYMax slice"
        className="pointer-events-none absolute inset-0 block h-full w-full md:hidden"
        aria-hidden="true"
      >
        <circle data-sun cx="330" cy="200" r="130" className="fill-brand" />
        <line x1="0" y1="660" x2="400" y2="660" className="stroke-light/50" strokeWidth="1" vectorEffect="non-scaling-stroke" />
        {Array.from({ length: N }).map((_, i) => {
          const w = 50;
          const h = mobileHeights[i];
          return (
            <rect
              key={`m-${i}`}
              data-step
              x={i * w}
              y={660 - h}
              width={w}
              height={h}
              className={`${fills[i]} stroke-deep`}
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          );
        })}
      </svg>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-start px-6 pt-16 pb-12 md:px-10 md:pt-20 lg:pt-24">
        <Chapter n="07" title="The next step" dark />
        <h2 id="admission-title" className="display mt-5 text-[15vw] leading-[0.92] text-paper md:mt-6 md:text-[7.5vw] lg:text-[6.5vw]">
          <Split text="The next step|is *yours.*" dark />
        </h2>
        <p className="mt-4 max-w-md text-base leading-relaxed text-pale md:text-lg" data-fade>
          Speak with our admissions team about the right program for you.
        </p>

        <div data-cta className="mt-6 flex max-w-xl flex-wrap items-center gap-3.5 sm:gap-4">
          <CTA href={SITE.phoneHref} label={`Call ${SITE.phoneDisplay}`} variant="light" />
          <CTA
            href={SITE.whatsappHref}
            label="WhatsApp Admissions"
            variant="primary"
            icon={<WhatsAppIcon className="size-4 fill-current text-white" />}
          />
          <CTA href={`mailto:${SITE.email}`} label="Email admissions" variant="ghost-light" />
        </div>
      </div>
    </section>
  );
}

