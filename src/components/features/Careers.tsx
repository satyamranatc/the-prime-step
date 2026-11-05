"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CAREER_STAGES } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import Split from "@/components/ui/Split";
import CTA from "@/components/ui/CTA";

/** Chapter 05 — career preparation, stated honestly (no invented figures or testimonials). */
export default function Careers() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-stage]").forEach((s) => {
        gsap.fromTo(
          s.querySelector("[data-line]"),
          { scaleX: 0 },
          { scaleX: 1, ease: "none", transformOrigin: "left", scrollTrigger: { trigger: s, start: "top 85%", end: "top 45%", scrub: true } },
        );
        gsap.fromTo(
          s.querySelector("[data-stext]"),
          { xPercent: -3, opacity: 0.3 },
          { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: s, start: "top 85%", end: "top 55%", scrub: true } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="careers" aria-labelledby="careers-title" className="relative bg-paper" data-aperture>
      <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-48">
        <Chapter n="05" title="Career transformation" />
        <h2 id="careers-title" className="display mt-8 max-w-[1000px] text-[14vw] text-deep md:text-[7vw]">
          <Split text="From classroom|to *career-ready.*" />
        </h2>

        <div className="mt-20 grid gap-16 md:mt-28 md:grid-cols-[1.4fr_0.8fr] md:gap-24">
          <ol>
            {CAREER_STAGES.map((s) => (
              <li key={s.n} data-stage className="py-7 md:py-9">
                <div data-line className="mb-6 h-px w-full origin-left bg-deep/40" />
                <div data-stext className="flex items-baseline gap-6">
                  <span className="eyebrow text-brand">{s.n}</span>
                  <span className="display text-[2.1rem] text-deep md:text-6xl">{s.t}</span>
                </div>
              </li>
            ))}
          </ol>

          <aside className="md:pt-9" data-fade>
            <p className="display text-3xl text-deep md:text-4xl">Real outcomes, not marketing numbers.</p>
            <p className="mt-5 leading-relaxed">
              We offer placement assistance — resume building, portfolio projects, interview
              preparation and connections to recruiters. Results depend on each student&apos;s effort
              and skills. Ask admissions for current placement records, and read what students say
              in their own words.
            </p>
            <div className="mt-8">
              <CTA
                href="https://www.google.com/search?q=The+Prime+Step+Indore+reviews"
                label="Read student reviews"
                variant="ghost"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

