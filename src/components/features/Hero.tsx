"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/scroll";
import { BRANCHES } from "@/lib/content";
import CTA from "@/components/ui/CTA";
import Logo from "@/components/ui/Logo";
import TypingHeadline from "./TypingHeadline";
import HeroShootingStars from "./HeroShootingStars";

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
    <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-6">
      <div className="pointer-events-none absolute size-48 sm:size-64 rounded-full bg-brand/10 blur-3xl" />
      <div className="relative flex flex-col items-center">
        <Logo mark height={175} className="drop-shadow-[0_18px_36px_rgba(15,82,80,0.14)] max-h-[220px]" />
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {["Python", "Java", "React", "AI / ML", "AWS"].map((tech) => (
            <span
              key={tech}
              className="rounded-full border border-pale bg-paper/90 px-2.5 sm:px-3 py-1 font-mono text-[10px] sm:text-[11px] font-semibold text-deep shadow-2xs"
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
      <div ref={heroStage} className="relative overflow-hidden min-h-[100svh] w-full bg-paper">
        {/* Hyper-Realistic Full-Bleed Sky, Volumetric White Clouds, Vapor Smoke & Shooting Stars */}
        <HeroShootingStars active={inView} />

        <div className="relative min-h-[100svh] flex flex-col justify-between px-4 sm:px-6 pt-24 sm:pt-26 pb-7 md:px-12 md:pt-28 md:pb-10 max-w-[1520px] mx-auto">
          {/* 3D Architectural Monument Canvas (Desktop) / Static Poster (Mobile & Pre-Idle) */}
          <div
            data-scene
            className="relative mx-auto h-[38svh] w-full max-w-lg md:pointer-events-auto md:absolute md:top-[53%] md:-translate-y-1/2 md:right-[-2%] md:left-[38%] md:h-[82svh] md:max-w-[900px] md:ml-auto z-10"
          >
            {gl ? <HeroScene active={inView} /> : <StaticMonumentPoster />}
          </div>

          {/* Hero Typography & Actions */}
          <div className="my-auto max-w-2xl py-4 md:py-6 z-20">
            <p className="eyebrow text-brand mb-3 sm:mb-4" data-hero-sub>
              Software Architecture &amp; Technology · Indore
            </p>

            <h1
              id="hero-title"
              data-hero-headline
              className="display text-[11.5vw] text-deep sm:text-[8.6vw] md:text-[5.8vw] leading-[0.96] break-words"
            >
              <TypingHeadline />
            </h1>

            <p
              data-hero-sub
              className="mt-5 sm:mt-6 max-w-lg text-sm sm:text-base md:text-xl leading-relaxed text-deep/85 font-normal"
            >
              Master modern full stack development, cloud microservices, and applied AI. Built on practical lab engineering, 1-on-1 mentorship, and placement readiness.
            </p>

            <div data-hero-cta className="mt-6 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <CTA href="#programs" label="Explore Courses" className="w-full sm:w-auto justify-center text-center" />
              <CTA href="#campuses" label="Campus Tour" variant="ghost" className="w-full sm:w-auto justify-center text-center" />
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
                <span>Scroll to explore</span>
                <span className="text-base">↓</span>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}
