"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { BUILD_STEPS } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import Split from "@/components/ui/Split";

/** Chapter 04 — pinned: scrolling "builds" a project, step by step, inside a terminal. */
export default function Build() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(BUILD_STEPS.length - 1);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      setActive(0);
      const last = BUILD_STEPS.length - 1;
      gsap.to(sec.querySelector("[data-bar]"), {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: true,
          start: "top top",
          end: "+=220%",
          anticipatePin: 1,
          onUpdate: (self) => setActive(Math.min(last, Math.floor(self.progress * (last + 1)))),
        },
      });
    });
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} id="build" aria-labelledby="build-title" className="relative min-h-[100svh] bg-deep text-paper">
      <div className="mx-auto grid min-h-[100svh] max-w-[1480px] items-center gap-12 px-6 py-24 md:grid-cols-[1fr_1.1fr] md:gap-20 md:px-10">
        <div>
          <Chapter n="04" title="Learn by building" dark />
          <h2 id="build-title" className="display mt-8 text-[14vw] text-paper md:text-[6.4vw]">
            <Split text="Don't just learn it.|*Ship* *it.*" dark />
          </h2>

          <div className="relative mt-10 pl-8">
            <div className="absolute top-1 bottom-1 left-0 w-px bg-pale/30">
              <div data-bar className="h-full origin-top scale-y-0 bg-pale md:scale-y-0 motion-reduce:scale-y-100 max-md:scale-y-100" />
            </div>
            <ol className="space-y-6">
              {BUILD_STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`transition-opacity duration-500 ${i <= active ? "opacity-100" : "opacity-35"}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow text-pale">{s.n}</span>
                    <h3 className="display text-3xl md:text-4xl">{s.title}</h3>
                  </div>
                  <p className="mt-1 max-w-md pl-10 text-pale">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Terminal */}
        <div className="overflow-hidden rounded-xl border border-pale/30 bg-brand/25" aria-label="Illustrative terminal session">
          <div className="flex items-center gap-2 border-b border-pale/30 px-5 py-3">
            <span className="size-2.5 rounded-full bg-pale/70" />
            <span className="size-2.5 rounded-full bg-light/70" />
            <span className="size-2.5 rounded-full bg-paper/70" />
            <span className="eyebrow ml-3 text-pale">portfolio — zsh</span>
          </div>
          <div className="min-h-[300px] space-y-1 p-5 font-mono text-[0.82rem] leading-relaxed md:min-h-[380px] md:p-7 md:text-[0.95rem]">
            {BUILD_STEPS.flatMap((s, si) =>
              s.lines.map((ln, li) => (
                <div
                  key={`${si}-${li}`}
                  className={`whitespace-pre-wrap transition-all duration-500 ${si <= active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${ln.startsWith("✓") ? "text-pale" : "text-paper"}`}
                >
                  {ln}
                </div>
              )),
            )}
            <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-pale" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}

