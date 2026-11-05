"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { BUILD_STEPS } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import Split from "@/components/ui/Split";

const LAST = BUILD_STEPS.length - 1;

/** The page being "built" — what a non-technical visitor sees assemble as the code is typed. */
function Preview({ active }: { active: number }) {
  const show = (n: number) => (active >= n ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3");
  return (
    <div className="flex h-full flex-col bg-paper text-deep">
      <div className="flex items-center gap-2 border-b border-pale px-3 py-2">
        <span className="flex gap-1.5">
          <i className="size-2 rounded-full bg-pale" />
          <i className="size-2 rounded-full bg-pale" />
          <i className="size-2 rounded-full bg-pale" />
        </span>
        <span className="ml-2 flex-1 truncate rounded-full bg-soft px-3 py-1 font-mono text-[0.68rem]">
          {active >= 2 ? "yourname.dev" : "localhost:3000"}
        </span>
        <span
          className={`rounded-full bg-brand px-2 py-0.5 font-mono text-[0.6rem] text-paper transition-opacity duration-500 ${active >= 2 ? "opacity-100" : "opacity-0"}`}
        >
          LIVE
        </span>
      </div>

      <div className="relative flex-1 space-y-4 p-4 md:p-6">
        <div className={`flex items-center justify-between border-b border-pale pb-3 transition-all duration-700 ${show(1)}`}>
          <span className="display text-xl">Your Name</span>
          <span className="flex gap-4 text-xs">
            <span>Projects</span>
            <span>About</span>
            <span>Contact</span>
          </span>
        </div>

        <div className="transition-all duration-700">
          <p className="display text-3xl md:text-4xl">Hello, I&apos;m Your Name</p>
          <p className="mt-1 text-sm">Aspiring developer</p>
        </div>

        <div className={`grid grid-cols-2 gap-3 transition-all duration-700 delay-150 ${show(1)}`}>
          {["Weather App", "Quiz Game"].map((p, i) => (
            <div key={p} className="rounded-lg border border-pale bg-soft p-3">
              <div className={`mb-3 h-14 rounded ${i ? "bg-pale" : "bg-brand"}`} />
              <p className="text-sm font-medium">{p}</p>
              <p className="text-xs">Built in class</p>
            </div>
          ))}
        </div>

        <div
          className={`absolute inset-x-4 bottom-4 rounded-lg border border-brand bg-paper p-3 transition-all duration-700 md:inset-x-6 md:bottom-6 ${show(3)}`}
        >
          <p className="eyebrow text-brand">Interview practice</p>
          <p className="text-sm">Mock round complete — ready for the real one.</p>
        </div>
      </div>
    </div>
  );
}

/** Chapter 04 — split screen: code on the left, the real page assembling on the right. */
export default function Build() {
  const section = useRef<HTMLElement>(null);
  const [active, setActive] = useState(LAST);

  useEffect(() => {
    const sec = section.current;
    if (!sec) return;
    const mm = gsap.matchMedia();
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      setActive(0);
      gsap.to(sec.querySelector("[data-bar]"), {
        scaleY: 1,
        ease: "none",
        scrollTrigger: {
          trigger: sec,
          pin: true,
          scrub: true,
          start: "top top",
          end: "+=200%",
          onUpdate: (self) => setActive(Math.min(LAST, Math.floor(self.progress * (LAST + 1)))),
        },
      });
    });
    return () => {
      mm.revert();
    };
  }, []);

  return (
    <section ref={section} id="build" aria-labelledby="build-title" className="relative min-h-[100svh] bg-deep text-paper">
      <div className="mx-auto grid min-h-[100svh] max-w-[1480px] items-center gap-10 px-6 py-24 md:grid-cols-[0.8fr_1.4fr] md:gap-14 md:px-10">
        <div>
          <Chapter n="04" title="Learn by building" dark />
          <h2 id="build-title" className="display mt-8 text-[14vw] text-paper md:text-[5.2vw]">
            <Split text="Don't just learn it.|*Ship* *it.*" dark />
          </h2>

          <div className="relative mt-8 pl-8">
            <div className="absolute top-1 bottom-1 left-0 w-px bg-pale/30">
              <div data-bar className="h-full origin-top scale-y-0 bg-pale max-md:scale-y-100 motion-reduce:scale-y-100" />
            </div>
            <ol className="space-y-5">
              {BUILD_STEPS.map((s, i) => (
                <li
                  key={s.n}
                  className={`transition-opacity duration-500 ${i <= active ? "opacity-100" : "opacity-60"}`}
                  aria-current={i === active ? "step" : undefined}
                >
                  <div className="flex items-baseline gap-4">
                    <span className="eyebrow text-pale">{s.n}</span>
                    <h3 className="display text-3xl md:text-[2.1rem]">{s.title}</h3>
                  </div>
                  <p className="mt-1 max-w-sm pl-10 text-pale">{s.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Split screen */}
        <div>
          <div
            className="grid overflow-hidden rounded-xl border border-pale/40 md:h-[min(62svh,560px)] md:grid-cols-2"
            aria-label="Illustrative example: code on the left builds the page on the right"
          >
            <div className="min-h-[260px] bg-brand/30 md:min-h-0">
              <div className="flex items-center gap-2 border-b border-pale/30 px-4 py-2.5">
                <span className="eyebrow text-pale">What you type</span>
              </div>
              <div className="space-y-1.5 p-4 font-mono text-[0.78rem] leading-relaxed md:p-5 md:text-[0.84rem]">
                {BUILD_STEPS.flatMap((s, si) =>
                  s.code.map((ln, li) => (
                    <div
                      key={`${si}-${li}`}
                      className={`whitespace-pre-wrap transition-all duration-500 ${si <= active ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"} ${
                        ln.startsWith("✓") || ln.startsWith("<!--") ? "text-pale" : "text-paper"
                      }`}
                    >
                      {ln}
                    </div>
                  )),
                )}
                <span className="caret inline-block h-4 w-2 translate-y-0.5 bg-pale" aria-hidden="true" />
              </div>
            </div>
            <div className="min-h-[320px] border-t border-pale/40 md:min-h-0 md:border-t-0 md:border-l">
              <Preview active={active} />
            </div>
          </div>
          <p className="eyebrow mt-3 text-pale">Illustrative example — you type on the left, the page appears on the right.</p>
        </div>
      </div>
    </section>
  );
}
