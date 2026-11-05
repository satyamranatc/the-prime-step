"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { sceneState } from "@/lib/scroll";
import { BRANCHES } from "@/lib/content";
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
          className={i === 8 ? "fill-brand stroke-deep" : "fill-pale stroke-light"}
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

      // Hero scene + type respond to scroll
      ScrollTrigger.create({
        trigger: el,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          sceneState.progress = self.progress;
        },
      });
      gsap.to("[data-hero-copy]", {
        yPercent: -18,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top top", end: "bottom top", scrub: true },
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
      {/* Architectural grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(to right, #B2D8D8 1px, transparent 1px)",
          backgroundSize: "calc(100% / 6) 100%",
          maskImage: "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
          WebkitMaskImage: "linear-gradient(to bottom, transparent, #000 25%, #000 75%, transparent)",
        }}
      />

      {/* 3D scene */}
      <div
        data-scene
        className="absolute inset-x-0 top-[9svh] h-[36svh] md:inset-y-0 md:top-0 md:left-[48%] md:h-full"
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
        className="relative mx-auto flex min-h-[100svh] max-w-[1480px] flex-col justify-end px-6 pt-[42svh] pb-8 md:px-10 md:pt-28 md:pb-10"
      >
        <div data-hero-copy>
          <p className="eyebrow mb-6 text-brand" data-hero-fade>
            IT training &amp; skill development — Indore
          </p>
          <h1 id="hero-title" className="display text-[15vw] text-deep sm:text-[11vw] md:max-w-[46vw] md:text-[7.6vw]">
            <Split text="Every career|begins with|*a* *single* *step.*" />
            <span className="sr-only"> — The Prime Step, IT training institute in Indore</span>
          </h1>

          <div className="mt-6 grid gap-6 md:mt-10">
            <p className="max-w-md text-base leading-relaxed text-deep md:text-[1.05rem]" data-hero-fade>
              Hands-on, project-based training in programming, data, AI and software
              development — with placement assistance built in.
            </p>
            <div className="flex flex-wrap items-center gap-4" data-hero-fade>
              <CTA href="#admission" label="Talk to admissions" />
              <CTA href="#programs" label="Explore programs" variant="ghost" />
            </div>
          </div>
        </div>

        <div data-rule className="mt-8 h-px w-full bg-deep/30 md:mt-12" />
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

