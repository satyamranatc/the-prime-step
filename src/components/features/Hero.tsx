"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/scroll";
import { BRANCHES, PERSONAS, SITE, type PersonaId } from "@/lib/content";
import CTA from "@/components/ui/CTA";
import Logo from "@/components/ui/Logo";
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

/** Clean architectural monument poster for mobile & pre-idle state */
function StaticMonumentPoster() {
  return (
    <div className="relative flex h-full w-full items-center justify-center p-6">
      <div className="pointer-events-none absolute size-64 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative flex flex-col items-center">
        <Logo mark height={220} className="drop-shadow-[0_18px_36px_rgba(15,82,80,0.14)]" />
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["Python", "Java", "React", "AI / ML", "AWS"].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-pale bg-paper/90 px-3 py-1 font-mono text-[11px] font-semibold text-deep shadow-2xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const heroStage = useRef<HTMLDivElement>(null);
  const [gl, setGl] = useState<boolean>(false);
  const [inView, setInView] = useState(true);
  const [personaId, setPersonaId] = useState<PersonaId>("student");
  const [showHindi, setShowHindi] = useState(false);
  const activePersona = PERSONAS.find((p) => p.id === personaId) ?? PERSONAS[0];

  useEffect(() => {
    // Only mount WebGL 3D scene on desktop viewports after browser idle to protect mobile LCP/INP
    const isDesktop = window.matchMedia("(min-width: 900px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || calm || !webglOK()) return;

    const timer = window.setTimeout(() => {
      setGl(true);
    }, 180);
    return () => window.clearTimeout(timer);
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
        .from("[data-hero-headline]", { y: 32, opacity: 0, duration: 1.1 })
        .from("[data-hero-sub]", { y: 20, opacity: 0, duration: 0.95 }, "-=0.8")
        .from("[data-hero-cta]", { y: 16, opacity: 0, duration: 0.85 }, "-=0.75")
        .from("[data-scene]", { opacity: 0, scale: 0.96, duration: 1.0 }, "<-0.2")
        .from("[data-rule]", { opacity: 0, duration: 0.9 }, "-=0.7");

      const play = () => tl.play();
      if (document.documentElement.dataset.ready) play();
      else window.addEventListener("pps-ready", play, { once: true });
      off = () => window.removeEventListener("pps-ready", play);
    });

    // Desktop-only pinned 3D deconstruction (no scroll-jacking on mobile)
    mm.add("(min-width: 900px) and (prefers-reduced-motion: no-preference)", () => {
      ScrollTrigger.create({
        trigger: stage,
        start: "top top",
        end: "+=110%",
        pin: true,
        scrub: 0.7,
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
          SCENE 01: HERO PRODUCT REVEAL
          ======================================================== */}
      <div
        ref={heroStage}
        className="relative min-h-[100svh] flex flex-col justify-between px-6 pt-28 pb-8 md:px-12 md:pt-32 md:pb-12 max-w-[1520px] mx-auto bg-paper"
      >
        {/* 3D Architectural Monument Canvas (Desktop) / Static Poster (Mobile & Pre-Idle) */}
        <div
          data-scene
          className="relative mx-auto h-[38svh] w-full max-w-lg md:pointer-events-auto md:absolute md:top-[4svh] md:right-[-2%] md:left-[38%] md:h-[88svh] md:max-w-[920px] md:ml-auto z-10"
        >
          {gl ? <HeroScene active={inView} /> : <StaticMonumentPoster />}
        </div>

        {/* Hero Typography & Actions */}
        <div className="my-auto max-w-2xl py-4 md:py-10 z-20">
          <p className="eyebrow text-brand mb-4" data-hero-sub>
            Software Architecture &amp; Technology · Indore
          </p>

          <h1
            id="hero-title"
            data-hero-headline
            className="display text-[12vw] text-deep sm:text-[8.6vw] md:text-[5.8vw] leading-[0.96]"
          >
            <TypingHeadline />
          </h1>

          <p
            data-hero-sub
            className="mt-6 max-w-lg text-base md:text-xl leading-relaxed text-deep/85 font-normal"
          >
            Master modern full stack development, cloud microservices, and applied AI. Built on practical lab engineering, 1-on-1 mentorship, and placement readiness.
          </p>

          <div data-hero-cta className="mt-8 flex flex-wrap items-center gap-4">
            <CTA href="/courses" label="Explore Programs" />
            <CTA href="#campuses" label="Campus Tour" variant="ghost" />
          </div>
        </div>

        {/* Minimal Bottom Editorial Bar */}
        <div data-rule className="border-t border-pale/70 pt-5 z-20">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs md:text-sm text-deep/80">
            <div className="flex items-center gap-2">
              <span className="font-semibold text-deep">Indore Campuses:</span>
              <span>{BRANCHES.map((b) => b.name).join("  ·  ")}</span>
            </div>

            <div className="hidden min-[900px]:flex items-center gap-2 text-brand font-medium">
              <span>Scroll to deconstruct</span>
              <span className="text-base">↓</span>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================
          SCENE 02: PERSONALIZED PATHWAYS
          ======================================================== */}
      <div className="relative border-t border-pale/60 bg-soft/60 py-24 md:py-32 px-6 md:px-12">
        <div className="mx-auto max-w-[1480px]">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-3xl">
              <p className="eyebrow text-brand">Personalized Trajectory</p>
              <h2 className="display mt-3 text-4xl md:text-6xl text-deep">
                Choose your <span className="text-brand">starting point.</span>
              </h2>
              <p className="mt-4 text-base md:text-lg text-deep/80">
                Select your current background to view the recommended learning path designed for your goals.
              </p>
            </div>

            {/* Intentional EN / Hinglish Toggle */}
            <div
              role="group"
              aria-label="Language subtitle toggle"
              className="inline-flex items-center rounded-full border border-deep/20 bg-paper p-1 text-xs font-semibold"
            >
              <button
                type="button"
                onClick={() => setShowHindi(false)}
                aria-pressed={!showHindi}
                className={`rounded-full px-3.5 py-1.5 transition-colors ${
                  !showHindi ? "bg-deep text-paper" : "text-deep hover:bg-soft"
                }`}
              >
                EN
              </button>
              <button
                type="button"
                onClick={() => setShowHindi(true)}
                aria-pressed={showHindi}
                className={`rounded-full px-3.5 py-1.5 transition-colors ${
                  showHindi ? "bg-deep text-paper" : "text-deep hover:bg-soft"
                }`}
              >
                EN + हिं
              </button>
            </div>
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
                      ? "bg-deep text-paper shadow-sm"
                      : "bg-paper border border-deep/20 text-deep hover:border-brand"
                  }`}
                >
                  {p.label}
                </button>
              );
            })}
          </div>

          {/* Clean Focused Content Showcase */}
          <div className="mt-8 rounded-3xl bg-paper border border-pale/90 p-8 md:p-12 shadow-xs grid md:grid-cols-[1.4fr_1fr_auto] items-center gap-8">
            <div>
              <p className="eyebrow text-brand">
                {showHindi ? activePersona.hindi : `Pathway · ${activePersona.label}`}
              </p>
              <h3 className="display mt-2 text-3xl md:text-4xl text-deep">
                {activePersona.headline}
              </h3>
              <p className="mt-3 text-sm md:text-base leading-relaxed text-deep/85 max-w-xl">
                {activePersona.sub}
              </p>
            </div>

            <div>
              <p className="eyebrow text-deep/80">Recommended Curricula</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activePersona.recommended.map((item) => (
                  <span
                    key={item}
                    className="rounded-full bg-soft border border-brand/25 px-4 py-1.5 text-xs font-semibold text-deep"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row md:flex-col items-start md:items-end gap-3 md:justify-self-end">
              <CTA
                href={`${SITE.whatsappHref}?text=${encodeURIComponent(`Hi The Prime Step! I am a ${activePersona.label} and would like to talk to a career counselor.`)}`}
                label={activePersona.cta}
              />
              <CTA
                href={SITE.phoneHref}
                label={`Call ${SITE.phoneDisplay}`}
                variant="ghost"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
