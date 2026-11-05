"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/scroll";
import { BRANCHES, PERSONAS, type PersonaId } from "@/lib/content";
import Split from "@/components/ui/Split";
import CTA from "@/components/ui/CTA";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Static fallback when WebGL is unavailable. */
function FallbackStairs() {
  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" aria-hidden="true">
      {Array.from({ length: 9 }).map((_, i) => (
        <rect
          key={i}
          x={20 + i * 40}
          y={280 - (i + 1) * 28}
          width="40"
          height={(i + 1) * 28}
          className={i === 8 ? "fill-brand stroke-deep" : "fill-light stroke-deep"}
          strokeWidth="1"
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const [gl, setGl] = useState<boolean | null>(null);
  const [inView, setInView] = useState(true);
  const [personaId, setPersonaId] = useState<PersonaId>("student");
  const activePersona = PERSONAS.find((p) => p.id === personaId) ?? PERSONAS[0];

  useEffect(() => {
    // Capability detection can only happen client-side.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setGl(webglOK());
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { rootMargin: "100px" });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    let off: (() => void) | undefined;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .from("[data-hero] [data-w]", { yPercent: 115, duration: 1.5, stagger: 0.09 })
        .from("[data-hero-fade]", { opacity: 0, y: 26, duration: 1.1, stagger: 0.1 }, "-=1")
        .from("[data-scene]", { opacity: 0, scale: 0.94, y: 40, duration: 1.8 }, "<-0.3")
        .from("[data-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.6 }, "<");

      const play = () => tl.play();
      if (document.documentElement.dataset.ready) play();
      else window.addEventListener("pps-ready", play, { once: true });
      off = () => window.removeEventListener("pps-ready", play);

      // Hero scene responds to scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          sceneState.progress = self.progress;
        },
      });
    });

    return () => {
      off?.();
      mm.revert();
      sceneState.progress = 0;
    };
  }, []);

  return (
    <section
      ref={root}
      id="top"
      className="relative min-h-[100svh] overflow-hidden bg-paper"
      aria-labelledby="hero-title"
    >
      {/* 3D scene — kept cleanly inside the right column on desktop, top area on mobile */}
      <div
        data-scene
        className="pointer-events-none absolute inset-x-0 top-[9svh] h-[34svh] md:pointer-events-auto md:top-[6svh] md:right-[2%] md:left-[46%] md:h-[64svh]"
      >
        {gl === true && <HeroScene active={inView} />}
        {gl === false && (
          <div className="mx-auto h-full max-w-xl p-8">
            <FallbackStairs />
          </div>
        )}
      </div>

      <div
        data-hero
        className="relative mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-end px-6 pt-[42svh] pb-10 md:px-10 md:pt-32 md:pb-12"
      >
        <div data-hero-copy>
          <p className="eyebrow mb-5 text-brand" data-hero-fade>
            IT Training &amp; Job-Ready Skill Institute — Indore &nbsp;·&nbsp; <span className="normal-case tracking-normal">Seekho practical, bano job-ready</span>
          </p>
          <h1 id="hero-title" className="display text-[14.5vw] text-deep sm:text-[10.5vw] md:max-w-[46vw] md:text-[7.2vw]">
            <Split text="Every career|begins with|*a* *single* *step.*" />
            <span className="sr-only"> — The Prime Step, IT training institute in Indore</span>
          </h1>

          <div className="mt-6 grid gap-6 md:mt-8">
            <p className="max-w-lg text-base leading-relaxed text-deep md:text-[1.1rem]" data-hero-fade>
              Learn to <strong className="font-semibold">build websites &amp; mobile apps</strong>,{" "}
              <strong className="font-semibold">analyse business data</strong>, and{" "}
              <strong className="font-semibold">work with AI</strong> — taught step by step from
              scratch in Indore, with real projects and placement support.
            </p>
            <div className="flex flex-wrap items-center gap-4" data-hero-fade>
              <CTA href="#admission" label="Talk to admissions" />
              <CTA href="#programs" label="See all courses" variant="ghost" />
            </div>
          </div>
        </div>

        {/* Interactive "Who are you?" pathfinder */}
        <div
          data-hero-fade
          className="mt-10 rounded-2xl border border-pale bg-soft/80 p-5 md:mt-14 md:p-7"
          aria-label="Choose who you are to see your recommended path"
        >
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="eyebrow text-brand">Who are you? &nbsp;·&nbsp; Apna path chunein</p>
            <div role="tablist" aria-label="Visitor type" className="flex flex-wrap gap-2">
              {PERSONAS.map((p) => {
                const selected = p.id === personaId;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setPersonaId(p.id)}
                    data-cursor
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-colors duration-300 md:text-sm ${
                      selected
                        ? "bg-deep text-paper"
                        : "border border-deep/25 bg-paper text-deep hover:border-brand"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 grid items-center gap-6 border-t border-pale/70 pt-5 md:grid-cols-[1.2fr_1fr_auto]">
            <div>
              <p className="eyebrow text-brand">{activePersona.hindi}</p>
              <h2 className="display mt-1 text-2xl text-deep md:text-3xl">
                {activePersona.headline}
              </h2>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-deep md:text-base">
                {activePersona.sub}
              </p>
            </div>

            <div>
              <p className="eyebrow text-deep">Popular starting courses</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {activePersona.recommended.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-brand/40 bg-paper px-3.5 py-1 text-xs font-medium text-deep md:text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="justify-self-start md:justify-self-end">
              <CTA href="#admission" label={activePersona.cta} />
            </div>
          </div>
        </div>

        <div data-rule className="mt-8 h-px w-full bg-deep/30 md:mt-10" />
        <div
          className="eyebrow mt-4 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-deep"
          data-hero-fade
        >
          <span>{BRANCHES.map((b) => b.name).join("  ·  ")}</span>
          <span className="flex items-center gap-3">
            Scroll
            <span className="relative block h-px w-12 overflow-hidden bg-pale">
              <span className="absolute inset-y-0 left-0 w-1/2 animate-[slide_2s_ease-in-out_infinite] bg-brand" />
            </span>
          </span>
        </div>
      </div>
      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(220%)}}@media (prefers-reduced-motion:reduce){[class*="animate-[slide"]{animation:none}}`}</style>
    </section>
  );
}
