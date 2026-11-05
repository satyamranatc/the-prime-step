"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { DISCIPLINES } from "@/lib/content";
import Glyph from "@/components/ui/Glyph";
import Split from "@/components/ui/Split";
import Chapter from "@/components/ui/Chapter";

/** Chapter 02 — pinned horizontal journey through each discipline. */
export default function Programs() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sec = section.current;
    const tr = track.current;
    if (!sec || !tr) return;
    const mm = gsap.matchMedia();

    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      const dist = () => tr.scrollWidth - window.innerWidth;
      const tween = gsap.to(tr, {
        x: () => -dist(),
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: 0.7,
          start: "top top",
          end: () => `+=${dist()}`,
          invalidateOnRefresh: true,
          anticipatePin: 1,
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (count.current) {
              const i = Math.min(DISCIPLINES.length, Math.max(1, Math.round(self.progress * DISCIPLINES.length + 0.5)));
              count.current.textContent = String(i).padStart(2, "0");
            }
          },
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((p) => {
        const num = p.querySelector("[data-num]");
        const art = p.querySelector("[data-art]");
        const txt = p.querySelectorAll("[data-ptxt]");
        const st = { trigger: p, containerAnimation: tween, start: "left 90%", end: "right 10%", scrub: true };
        if (num) gsap.fromTo(num, { xPercent: 35 }, { xPercent: -35, ease: "none", scrollTrigger: st });
        if (art) gsap.fromTo(art, { xPercent: 8, rotate: 3 }, { xPercent: -8, rotate: -2, ease: "none", scrollTrigger: st });
        if (txt.length)
          gsap.fromTo(
            txt,
            { opacity: 0.0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: { trigger: p, containerAnimation: tween, start: "left 85%", end: "left 35%", scrub: true },
            },
          );
      });
    });

    return () => mm.revert();
  }, []);

  return (
    <section
      ref={section}
      id="programs"
      aria-labelledby="programs-title"
      className="relative overflow-hidden bg-soft"
      data-aperture
    >
      <div ref={track} className="h-track">
        {/* Intro panel */}
        <div className="h-panel flex shrink-0 flex-col justify-center px-6 py-28 md:px-10 md:py-0">
          <div className="mx-auto w-full max-w-[1480px]">
            <Chapter n="02" title="The world of technology" />
            <h2 id="programs-title" className="display mt-8 text-[15vw] text-deep md:text-[8.5vw]">
              <Split text="Eight worlds.|One *place* *to* *begin.*" />
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed" data-fade>
              Choose a discipline and go deep. Every program is taught practically, with
              projects at its core.
            </p>
            <p className="eyebrow mt-12 hidden items-center gap-3 text-brand min-[900px]:flex motion-reduce:hidden">
              Keep scrolling <span aria-hidden="true">→</span>
            </p>
          </div>
        </div>

        {DISCIPLINES.map((d, i) => (
          <article
            key={d.id}
            data-panel
            className={`h-panel relative flex shrink-0 items-center overflow-hidden px-6 py-20 md:px-10 md:py-0 ${i % 2 ? "bg-paper" : "bg-soft"}`}
            aria-label={d.title}
          >
            <span
              data-num
              aria-hidden="true"
              className="display outline-text pointer-events-none absolute -bottom-[6vw] left-0 text-[48vw] leading-none select-none min-[900px]:text-[34vw]"
            >
              {String(i + 1).padStart(2, "0")}
            </span>

            <div className="relative mx-auto grid w-full max-w-[1480px] items-center gap-10 min-[900px]:grid-cols-[1.15fr_0.85fr]">
              <div>
                <p className="eyebrow text-brand" data-ptxt>
                  {String(i + 1).padStart(2, "0")} / {String(DISCIPLINES.length).padStart(2, "0")}
                </p>
                <h3 className="display mt-4 text-[14vw] text-deep min-[900px]:text-[7.4vw]" data-ptxt>
                  {d.title}
                </h3>
                <p className="mt-6 max-w-md text-lg leading-relaxed" data-ptxt>
                  {d.line}
                </p>
                <ul className="mt-8 flex flex-wrap gap-2" data-ptxt>
                  {d.tags.map((t) => (
                    <li key={t} className="rounded-full border border-deep/30 px-4 py-1.5 text-sm">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
              <div data-art className="mx-auto aspect-square w-[68vw] max-w-[520px] min-[900px]:w-full">
                <Glyph id={d.id} />
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Progress rail (desktop) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden items-center gap-4 px-10 pb-8 min-[900px]:flex motion-reduce:hidden"
      >
        <span ref={count} className="eyebrow text-deep">
          01
        </span>
        <div className="h-px flex-1 bg-pale">
          <div ref={bar} className="h-px origin-left scale-x-0 bg-brand" />
        </div>
        <span className="eyebrow text-deep">{String(DISCIPLINES.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

