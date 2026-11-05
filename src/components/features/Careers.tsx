"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { CAREER_STAGES, ROLES } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import Split from "@/components/ui/Split";
import CTA from "@/components/ui/CTA";

/** Chapter 05 — real job roles explained in plain words + honest career preparation. */
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
          { xPercent: -3, opacity: 0.35 },
          { xPercent: 0, opacity: 1, ease: "none", scrollTrigger: { trigger: s, start: "top 85%", end: "top 55%", scrub: true } },
        );
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="careers" aria-labelledby="careers-title" className="relative bg-paper" data-aperture>
      <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-44">
        <Chapter n="05" title="Career transformation" />
        <h2 id="careers-title" className="display mt-8 max-w-[1000px] text-[14vw] text-deep md:text-[7vw]">
          <Split text="From classroom|to *career-ready.*" />
        </h2>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-deep" data-fade>
          Wondering what job you actually prepare for? Here are the roles our courses lead to — and
          what you do in a normal day on the job.
        </p>

        {/* Job-role cards in plain language */}
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" data-fade>
          {ROLES.map((r, i) => (
            <article
              key={r.role}
              className="flex flex-col justify-between rounded-2xl border border-pale bg-soft p-6 transition-colors duration-300 hover:border-brand"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-brand">Role 0{i + 1}</span>
                  <span className="rounded-full bg-paper px-3 py-1 text-xs font-medium text-deep">
                    {r.from}
                  </span>
                </div>
                <h3 className="display mt-4 text-3xl text-deep md:text-4xl">{r.role}</h3>
                <p className="mt-2 text-base font-medium text-deep">{r.what}</p>
                <p className="mt-3 text-sm leading-relaxed text-deep">
                  <span className="eyebrow mr-2 text-brand">A normal day:</span>
                  {r.day}
                </p>
              </div>
            </article>
          ))}
        </div>

        {/* 4-stage placement preparation */}
        <div className="mt-24 grid gap-16 md:mt-32 md:grid-cols-[1.4fr_0.8fr] md:gap-24">
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
              We offer placement assistance — resume building, portfolio projects, mock interviews
              and connections to recruiters in Indore and beyond. Results depend on each
              student&apos;s effort and skills. Ask admissions for current placement records, and
              read what students say in their own words.
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
