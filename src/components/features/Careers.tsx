"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { CAREER_STAGES, ROLES } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import CTA from "@/components/ui/CTA";

export default function Careers() {
  const root = useRef<HTMLElement>(null);
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = ROLES[activeRoleIndex];

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
    <section ref={root} id="careers" aria-labelledby="careers-title" className="relative bg-paper py-28 md:py-40" data-aperture>
      <div className="mx-auto max-w-[1480px] px-6 md:px-12">
        <Chapter n="05" title="Career Transformation" />

        <div className="mt-8 max-w-4xl">
          <h2 id="careers-title" className="display text-[11vw] font-bold tracking-tight text-deep sm:text-[8vw] md:text-[5.5vw] leading-[0.96]">
            From classroom to <span className="italic text-brand">career-ready.</span>
          </h2>
          <p className="mt-6 text-lg md:text-xl text-deep/80 leading-relaxed max-w-2xl" data-fade>
            Every course is engineered around real industry roles. Here is what you prepare for, and what you actually do on the job.
          </p>
        </div>

        {/* Apple-style Interactive Role Showcase */}
        <div className="mt-14" data-fade>
          {/* Role Navigation Pills */}
          <div className="flex flex-wrap gap-2.5 pb-4">
            {ROLES.map((r, i) => {
              const isSelected = i === activeRoleIndex;
              return (
                <button
                  key={r.role}
                  type="button"
                  onClick={() => setActiveRoleIndex(i)}
                  className={`rounded-full px-5 py-2.5 text-xs md:text-sm font-semibold transition-all duration-300 ${
                    isSelected
                      ? "bg-deep text-paper shadow-md"
                      : "bg-soft border border-deep/15 text-deep hover:border-brand"
                  }`}
                >
                  {r.role}
                </button>
              );
            })}
          </div>

          {/* Active Role Showcase Card */}
          <div className="mt-8 rounded-3xl bg-soft p-8 md:p-14 border border-pale/70 transition-all duration-500">
            <div className="grid md:grid-cols-[1.5fr_1fr] gap-10 items-center">
              <div>
                <p className="eyebrow text-brand">{activeRole.from}</p>
                <h3 className="display mt-3 text-3xl md:text-5xl font-bold text-deep">
                  {activeRole.role}
                </h3>
                <p className="mt-4 text-xl md:text-2xl font-medium text-deep/90 leading-snug">
                  {activeRole.what}
                </p>

                <div className="mt-8 pt-6 border-t border-pale">
                  <p className="text-sm font-semibold text-deep/70 uppercase tracking-wider mb-2">
                    In a normal day:
                  </p>
                  <p className="text-base md:text-lg text-deep/85 leading-relaxed">
                    {activeRole.day}
                  </p>
                </div>
              </div>

              {/* Minimalist Graphic Highlight */}
              <div className="rounded-2xl bg-paper p-8 border border-pale flex flex-col justify-between h-full min-h-[220px]">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-semibold text-brand tracking-widest uppercase">
                    Career Pathway
                  </span>
                  <span className="size-2 rounded-full bg-brand animate-ping" />
                </div>
                <div className="my-auto py-4">
                  <p className="text-xs text-deep/60 uppercase tracking-wider">Relevant Programs</p>
                  <p className="text-base font-semibold text-deep mt-1">{activeRole.from}</p>
                </div>
                <CTA href="#programs" label="Explore Curriculum →" />
              </div>
            </div>
          </div>
        </div>

        {/* 4-Stage Placement Preparation */}
        <div className="mt-28 grid gap-16 md:mt-36 md:grid-cols-[1.4fr_0.8fr] md:gap-24">
          <ol>
            {CAREER_STAGES.map((s) => (
              <li key={s.n} data-stage className="py-7 md:py-9">
                <div data-line className="mb-6 h-px w-full origin-left bg-deep/25" />
                <div data-stext className="flex items-baseline gap-6">
                  <span className="eyebrow text-brand">{s.n}</span>
                  <span className="display text-2xl md:text-5xl font-bold text-deep">{s.t}</span>
                </div>
              </li>
            ))}
          </ol>

          <aside className="md:pt-9" data-fade>
            <h3 className="display text-3xl md:text-4xl font-bold text-deep">
              Real outcomes, not marketing promises.
            </h3>
            <p className="mt-5 text-base md:text-lg leading-relaxed text-deep/80">
              We provide comprehensive career readiness: portfolio creation, architecture reviews, mock interviews, and direct employer introductions across Indore, Pune, and Bangalore.
            </p>
            <div className="mt-8">
              <CTA
                href="https://www.google.com/search?q=The+Prime+Step+Indore+reviews"
                label="Read Student Reviews"
                variant="ghost"
              />
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
