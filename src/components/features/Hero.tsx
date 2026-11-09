"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/scroll";
import { BRANCHES, PERSONAS, type PersonaId } from "@/lib/content";
import CTA from "@/components/ui/CTA";
import TypingHeadline from "./TypingHeadline";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Clean architectural fallback when WebGL is unavailable */
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
          className={i === 8 ? "fill-brand" : "fill-pale"}
        />
      ))}
    </svg>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const heroStage = useRef<HTMLDivElement>(null);
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
    const stage = heroStage.current;
    if (!stage) return;
    const mm = gsap.matchMedia();
    let off: (() => void) | undefined;

    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const tl = gsap
        .timeline({ paused: true, defaults: { ease: "expo.out" } })
        .from("[data-hero-headline]", { y: 40, opacity: 0, duration: 1.4 })
        .from("[data-hero-sub]", { y: 24, opacity: 0, duration: 1.2 }, "-=1.0")
        .from("[data-hero-cta]", { y: 20, opacity: 0, duration: 1.0 }, "-=0.9")
        .from("[data-scene]", { opacity: 0, scale: 0.94, duration: 1.3 }, "<-0.3")
        .from("[data-rule]", { opacity: 0, duration: 1.2 }, "-=0.8");

      const play = () => tl.play();
      if (document.documentElement.dataset.ready) play();
      else window.addEventListener("pps-ready", play, { once: true });
      off = () => window.removeEventListener("pps-ready", play);

      // Hero pinned scroll: Locks the hero, smoothly opens & deconstructs the 3D logo,
      // and only then releases to scroll down the rest of the site!
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=120%",
        pin: true,
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
      className="relative bg-paper text-deep"
      aria-labelledby="hero-title"
    >
      {/* ========================================================
          SCENE 01: HERO PRODUCT REVEAL (Pinned to open 3D logo first)
          ======================================================== */}
      <div
        ref={heroStage}
        className="relative min-h-[100svh] flex flex-col justify-between px-6 pt-28 pb-8 md:px-12 md:pt-36 md:pb-12 max-w-[1520px] mx-auto bg-paper"
      >
        {/* 3D Architectural Monument Canvas */}
        <div
          data-scene
          className="pointer-events-none absolute inset-x-0 top-[12svh] h-[40svh] md:pointer-events-auto md:top-[8svh] md:right-[3%] md:left-[46%] md:h-[82svh] md:max-w-[760px] md:ml-auto z-10"
        >
          {gl === true && <HeroScene active={inView} />}
          {gl === false && (
            <div className="mx-auto h-full max-w-xl p-8">
              <FallbackStairs />
            </div>
          )}
        </div>

        {/* Hero Typography & Single Action Focus */}
        <div className="my-auto max-w-2xl py-6 md:py-12 z-20">
          <p className="eyebrow text-brand mb-4" data-hero-sub>
            Software Architecture &amp; Technology · Indore
          </p>

          <h1
            id="hero-title"
            data-hero-headline
            className="display text-[12.5vw] font-bold tracking-tight text-deep sm:text-[9.2vw] md:text-[6.2vw] leading-[0.94] min-h-[3em] sm:min-h-[2.85em]"
          >
            <TypingHeadline />
          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-lg text-base md:text-xl leading-relaxed text-deep/80 font-normal"
          >
            Master modern full stack development, cloud microservices, and applied AI. Built on practical product development and placement excellence.
          </p>

          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-4">
            <CTA href="#programs" label="Explore Programs" />
            <CTA href="#campuses" label="Campus Tour" variant="ghost" />
          </div>
        </div>

        {/* Minimal Bottom Editorial Bar */}
        <div data-rule className="border-t border-pale/70 pt-5 z-20">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs md:text-sm text-deep/70">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-deep">Campuses:</span>
              <span>{BRANCHES.map((b) => b.name).join("  ·  ")}</span>
            </div>

            <div className="flex items-center gap-2 text-brand font-medium">
              <span>Scroll to deconstruct</span>
              <span className="text-base">↓</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SCENE 02: PERSONALIZED PATHWAYS (Spacious, dignified chapter)
          ======================================================== */}
      <div className="relative border-t border-pale/60 bg-soft/50 py-24 md:py-36 px-6 md:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="max-w-3xl">
            <p className="eyebrow text-brand">Personalized Trajectory</p>
            <h2 className="display mt-3 text-3xl md:text-5xl font-bold tracking-tight text-deep">
              Choose your starting point.
            </h2>
            <p className="mt-4 text-base md:text-lg text-deep/80">
              Select your current background to explore the recommended learning curriculum designed for your goals.
            </p>
          </div>

          {/* Segmented Persona Selector */}
          <div
            role="tablist"
            aria-label="Visitor background"
            className="mt-10 flex flex-wrap gap-2.5"
          >
            {PERSONAS.map((p) => {
              const selected = p.id === personaId;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  onClick={() => setPersonaId(p.id)}
                  className={`rounded-full px-5 py-2.5 text-xs md:text-sm font-semibold transition-all duration-300 ${
                    selected
                      ? "bg-deep text-paper shadow-md"
                      : "bg-paper border border-deep/15 text-deep hover:border-brand"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Clean Focused Content Showcase */}
          <div className="mt-10 rounded-3xl bg-paper border border-pale/80 p-8 md:p-12 shadow-sm grid md:grid-cols-[1.4fr_1fr_auto] items-center gap-8">
            <div>
              <p className="eyebrow text-brand">{activePersona.hindi}</p>
              <h3 className="display mt-2 text-2xl md:text-3xl font-bold text-deep">
                {activePersona.headline}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-deep/80 max-w-xl">
                {activePersona.sub}
              </p>
            </div>

            <div>
              <p className="eyebrow text-deep/70">Recommended Curricula</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activePersona.recommended.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-soft border border-brand/20 px-4 py-1.5 text-xs font-semibold text-deep"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="md:justify-self-end">
              <CTA href="#admission" label={activePersona.cta} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
