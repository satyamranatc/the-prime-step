"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { DISCIPLINES } from "@/lib/content";
import Glyph from "@/components/ui/Glyph";
import Split from "@/components/ui/Split";
import Chapter from "@/components/ui/Chapter";

type Mode = "simple" | "technical";

function ModeToggle({
  mode,
  onChange,
  className = "",
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="Explanation level"
      className={`inline-flex rounded-full border border-deep/30 bg-paper p-1 text-sm ${className}`}
    >
      {(["simple", "technical"] as const).map((m) => (
        <button
          key={m}
          type="button"
          aria-pressed={mode === m}
          onClick={() => onChange(m)}
          data-cursor
          className={`rounded-full px-4 py-2 capitalize transition-colors duration-300 ${
            mode === m ? "bg-deep text-paper" : "text-deep hover:bg-soft"
          }`}
        >
          {m}
        </button>
      ))}
    </div>
  );
}

// Map disciplines to interactive 3D roadmap courses
const ROADMAP_MAP: Record<string, string> = {
  fullstack: "mern",
  python: "python",
  java: "java",
  data: "python",
  ai: "python",
};

/** Chapter 02 — pinned horizontal journey. Plain language first; technical detail on demand. */
export default function Programs() {
  const section = useRef<HTMLElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const bar = useRef<HTMLDivElement>(null);
  const count = useRef<HTMLSpanElement>(null);
  const [mode, setMode] = useState<Mode>("simple");
  const simple = mode === "simple";

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
          snap: {
            snapTo: 1 / DISCIPLINES.length,
            duration: { min: 0.25, max: 0.7 },
            ease: "power2.inOut",
            delay: 0.05,
          },
          onUpdate: (self) => {
            if (bar.current) bar.current.style.transform = `scaleX(${self.progress})`;
            if (count.current) {
              const i = Math.min(
                DISCIPLINES.length,
                Math.max(1, Math.round(self.progress * DISCIPLINES.length) + 1)
              );
              count.current.textContent = String(i).padStart(2, "0");
            }
          },
        },
      });

      gsap.utils.toArray<HTMLElement>("[data-panel]").forEach((p) => {
        const num = p.querySelector("[data-num]");
        const art = p.querySelector("[data-art]");
        const txt = p.querySelectorAll("[data-ptxt]");
        const st = {
          trigger: p,
          containerAnimation: tween,
          start: "left right",
          end: "right left",
          scrub: true,
        };
        if (num) gsap.fromTo(num, { yPercent: 8 }, { yPercent: -8, ease: "none", scrollTrigger: st });
        if (art)
          gsap.fromTo(art, { yPercent: 5, rotate: 3 }, { yPercent: -5, rotate: -2, ease: "none", scrollTrigger: st });
        if (txt.length)
          gsap.fromTo(
            txt,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              stagger: 0.08,
              ease: "power2.out",
              scrollTrigger: {
                trigger: p,
                containerAnimation: tween,
                start: "left 90%",
                end: "left 45%",
                scrub: true,
              },
            }
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
      {/* Desktop toggle */}
      <div className="absolute top-24 right-10 z-20 hidden min-[900px]:block motion-reduce:hidden">
        <ModeToggle mode={mode} onChange={setMode} />
      </div>

      <div ref={track} className="h-track">
        {/* Intro panel */}
        <div className="h-panel flex shrink-0 flex-col justify-center px-6 py-28 md:px-10 md:py-0">
          <div className="mx-auto w-full max-w-[1480px]">
            <Chapter n="02" title="The world of technology" />
            <h2 id="programs-title" className="display mt-8 text-[15vw] text-deep md:text-[8.5vw]">
              <Split text="Eight worlds.|One *place* *to* *begin.*" />
            </h2>
            <p className="mt-8 max-w-md text-lg leading-relaxed" data-fade>
              New to tech? Stay on <strong className="font-semibold">Simple</strong> — we explain every
              course in everyday words. Switch to <strong className="font-semibold">Technical</strong> for
              the full detail.
            </p>
            <ModeToggle
              mode={mode}
              onChange={setMode}
              className="mt-6 min-[900px]:hidden motion-reduce:inline-flex"
            />
            <p className="eyebrow mt-12 hidden items-center gap-3 text-brand min-[900px]:flex motion-reduce:hidden">
              Keep scrolling <span aria-hidden="true">→</span>
            </p>
          </div>
        </div>

        {DISCIPLINES.map((d, i) => {
          const roadmapKey = ROADMAP_MAP[d.id] || "mern";

          return (
            <article
              key={d.id}
              data-panel
              className={`h-panel relative flex shrink-0 items-center overflow-hidden px-6 py-20 md:px-10 md:py-0 ${
                i % 2 ? "bg-paper" : "bg-soft"
              }`}
              aria-label={d.title}
            >
              <span
                data-num
                aria-hidden="true"
                className="display outline-text pointer-events-none absolute -top-[2vw] right-[2vw] text-[44vw] leading-none select-none min-[900px]:text-[30vw]"
              >
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="relative mx-auto grid w-full max-w-[1480px] items-center gap-10 min-[900px]:grid-cols-[1.15fr_0.85fr]">
                <div className="min-[900px]:pr-6">
                  <p className="eyebrow text-brand" data-ptxt>
                    {String(i + 1).padStart(2, "0")} / {String(DISCIPLINES.length).padStart(2, "0")}
                    {simple && <> &nbsp;·&nbsp; {d.title}</>}
                  </p>

                  {simple ? (
                    <>
                      <h3
                        className="display mt-4 max-w-[16ch] text-[11.5vw] text-deep min-[900px]:text-[5vw] min-[900px]:leading-[1]"
                        data-ptxt
                      >
                        {d.plain}
                      </h3>
                      <p className="mt-6 max-w-md text-lg leading-relaxed" data-ptxt>
                        <span className="eyebrow mr-3 text-brand">Like</span>
                        {d.analogy}
                      </p>
                    </>
                  ) : (
                    <>
                      <h3
                        className="display mt-4 text-[14vw] text-deep min-[900px]:text-[7vw]"
                        data-ptxt
                      >
                        {d.title}
                      </h3>
                      <p className="mt-6 max-w-md text-lg leading-relaxed" data-ptxt>
                        {d.line}
                      </p>
                      <ul className="mt-8 flex flex-wrap gap-2" data-ptxt>
                        {d.tags.map((t) => (
                          <li
                            key={t}
                            className="rounded-full border border-deep/30 px-4 py-1.5 text-sm"
                          >
                            {t}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}

                  {/* 3D Syllabus Car Drive Link */}
                  <div className="mt-8" data-ptxt>
                    <Link
                      href={`/roadmap/${roadmapKey}`}
                      className="group inline-flex items-center gap-3 rounded-full border border-brand bg-brand/10 px-5 py-2.5 text-xs font-semibold text-deep transition-all duration-300 hover:bg-brand hover:text-white md:text-sm shadow-sm"
                    >
                      <span>🚗 Drive 3D Syllabus Roadmap</span>
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
                    </Link>
                  </div>
                </div>

                <div
                  data-art
                  className="mx-auto aspect-square w-[64vw] max-w-[460px] min-[900px]:w-full min-[900px]:max-w-[480px]"
                >
                  <Glyph id={d.id} />
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Progress rail */}
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
