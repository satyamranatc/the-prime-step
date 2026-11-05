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

/** Static architectural fallback when WebGL is unavailable. */
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
    // Capability detection client-side
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
        .from("[data-hero] [data-w]", { yPercent: 115, duration: 1.5, stagger: 0.08 })
        .from("[data-hero-fade]", { opacity: 0, y: 24, duration: 1.1, stagger: 0.1 }, "-=1")
        .from("[data-scene]", { opacity: 0, scale: 0.95, duration: 0.8 }, "<-0.4")
        .from("[data-rule]", { scaleX: 0, transformOrigin: "left", duration: 1.5 }, "<");

      const play = () => tl.play();
      if (document.documentElement.dataset.ready) play();
      else window.addEventListener("pps-ready", play, { once: true });
      off = () => window.removeEventListener("pps-ready", play);

      // Hero 3D Exploded View tracks smoothly with page scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
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
      {/* 3D Exploded Architectural Scene (Right 50% on Desktop, Header Area on Mobile) */}
      <div
        data-scene
        className="pointer-events-none absolute inset-x-0 top-[7svh] h-[36svh] md:pointer-events-auto md:top-[6svh] md:right-[2%] md:left-[48%] md:h-[78svh] md:max-w-[740px] md:ml-auto z-10"
      >
        {gl === true && <HeroScene active={inView} />}
        {gl === false && (
          <div className="mx-auto h-full max-w-xl p-8">
            <FallbackStairs />
          </div>
        )}
      </div>

      {/* Main Hero Architectural Content */}
      <div
        data-hero
        className="relative mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-between px-6 pt-24 pb-8 md:px-10 md:pt-36 md:pb-10"
      >
        {/* Top Eyebrow Badge */}
        <div data-hero-fade>
          <div className="eyebrow inline-flex items-center gap-2 rounded-full border border-brand/25 bg-soft px-3.5 py-1 text-xs text-brand">
            <span className="size-1.5 rounded-full bg-brand animate-pulse" />
            <span>Academic Rigour · Software Architecture · Indore, India</span>
          </div>
        </div>

        {/* Hero Title & Mission Copy */}
        <div data-hero-copy className="my-auto max-w-2xl py-6 md:py-10">
          <h1 id="hero-title" className="display text-[13.5vw] text-deep sm:text-[9.5vw] md:max-w-[48vw] md:text-[6.4vw] leading-[0.98]">
            <Split text="Every career|begins with|*a* *single* *step.*" />
            <span className="sr-only"> — The Prime Step, premier technology institute in Indore</span>
          </h1>

          <div className="mt-6 grid gap-6 md:mt-8">
            <p className="max-w-xl text-base leading-relaxed text-deep/85 md:text-[1.125rem]" data-hero-fade>
              Central India&apos;s flagship institute for modern software architecture, distributed cloud systems, and applied AI. Built on practical product development, architectural mastery, and placement excellence.
            </p>

            <div className="flex flex-wrap items-center gap-4" data-hero-fade>
              <CTA href="#programs" label="Explore Flagship Programs" />
              <CTA href="#admission" label="Schedule Campus Tour" variant="ghost" />
            </div>

            {/* Credibility Credentials Ribbon */}
            <div className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-2 text-xs font-medium text-deep/70 md:text-sm" data-hero-fade>
              <span className="flex items-center gap-2">
                <span className="text-brand">✦</span> 100% Practical Engineering
              </span>
              <span className="flex items-center gap-2">
                <span className="text-brand">✦</span> Microservices, Cloud &amp; AI
              </span>
              <span className="flex items-center gap-2">
                <span className="text-brand">✦</span> Vijay Nagar · Bhawarkua
              </span>
            </div>
          </div>
        </div>

        {/* Bottom Editorial Bar & Scroll Indicator */}
        <div data-hero-fade data-rule className="border-t border-deep/15 pt-5">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs md:text-sm text-deep">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-deep">Campuses:</span>
              <span className="text-deep/75">{BRANCHES.map((b) => b.name).join("  ·  ")}</span>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-brand">
              <span>Scroll to deconstruct architecture</span>
              <span className="relative block h-px w-12 overflow-hidden bg-pale">
                <span className="absolute inset-y-0 left-0 w-1/2 animate-[slide_2s_ease-in-out_infinite] bg-brand" />
              </span>
              <span>↓</span>
            </div>
          </div>
        </div>
      </div>

      {/* Chapter 01.5: Interactive Academic Trajectory Pathfinder (Dignified & Spacious) */}
      <div className="relative mx-auto max-w-[1480px] px-6 py-14 md:px-10 md:py-20 border-t border-pale">
        <div className="rounded-3xl border border-pale/90 bg-soft/60 p-6 md:p-10 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="eyebrow text-brand">Academic Trajectory · Choose Your Starting Point</p>
              <h2 className="display mt-1 text-2xl text-deep md:text-3xl">
                Personalized Learning Pathways
              </h2>
            </div>

            {/* Persona Segment Tabs */}
            <div role="tablist" aria-label="Visitor background" className="flex flex-wrap gap-2">
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
                    className={`rounded-full px-4 py-2 text-xs font-medium transition-all duration-300 md:text-sm ${
                      selected
                        ? "bg-deep text-paper shadow-sm"
                        : "border border-deep/20 bg-paper text-deep hover:border-brand"
                    }`}
                  >
                    {p.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Active Persona Path Blueprint */}
          <div className="mt-8 grid items-center gap-6 border-t border-pale/80 pt-6 md:grid-cols-[1.3fr_1fr_auto]">
            <div>
              <p className="eyebrow text-brand">{activePersona.hindi}</p>
              <h3 className="display mt-1 text-xl text-deep md:text-2xl">
                {activePersona.headline}
              </h3>
              <p className="mt-2 max-w-xl text-xs leading-relaxed text-deep/80 md:text-sm">
                {activePersona.sub}
              </p>
            </div>

            <div>
              <p className="eyebrow text-deep/80">Recommended Starting Curricula</p>
              <ul className="mt-2.5 flex flex-wrap gap-2">
                {activePersona.recommended.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-brand/30 bg-paper px-3 py-1 text-xs font-medium text-deep shadow-2xs"
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
      </div>

      <style>{`@keyframes slide{0%{transform:translateX(-100%)}100%{transform:translateX(220%)}}@media (prefers-reduced-motion:reduce){[class*="animate-[slide"]{animation:none}}`}</style>
    </section>
  );
}
