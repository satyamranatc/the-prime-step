"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

const STAGES = [
  "INITIALIZING ARCHITECTURE",
  "CALIBRATING PRACTICAL LABS",
  "SYNCHRONIZING 3D ENGINE",
  "WELCOME TO THE PRIME STEP",
];

/**
 * Cinematic Obsidian Splash Screen & Architectural Curtain Reveal
 *
 * Choreography:
 * 1. Deep obsidian space with subtle ambient cyan bloom and laser grid.
 * 2. Precision SVG stroke draw & glow assembly of the official Prime Step monument.
 * 3. High-tech HUD telemetry: coordinates (Indore), live stage updates, and tabular counter.
 * 4. Epic aperture split: at 100%, a laser seam flashes and dual shutters part
 *    with exponential ease, unveiling the hyper-realistic 3D hero below.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const shutterTop = useRef<HTMLDivElement>(null);
  const shutterBottom = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const flareRef = useRef<HTMLDivElement>(null);

  const [statusText, setStatusText] = useState(STAGES[0]);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;

    const finish = () => {
      html.dataset.ready = "1";
      window.dispatchEvent(new Event("pps-ready"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      finish();
      return;
    }

    html.style.overflow = "hidden";
    const counterObj = { v: 0 };

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          html.style.overflow = "";
        },
      });

      // 1. Initial fade-in of HUD and Ambient Core
      tl.fromTo(
        "[data-hud]",
        { opacity: 0, y: (i) => (i === 0 ? -15 : 15) },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.1
      );

      // 2. Emblem Assembly: Stroke draw + architectural layer reveals
      tl.fromTo(
        "[data-emblem-bg]",
        { scale: 0.6, opacity: 0 },
        { scale: 1, opacity: 0.7, duration: 1.4, ease: "power2.out" },
        0
      );

      tl.fromTo(
        "[data-pillar]",
        { y: 60, opacity: 0, scaleY: 0.2 },
        { y: 0, opacity: 1, scaleY: 1, duration: 1.0, ease: "expo.out", transformOrigin: "bottom" },
        0.2
      );

      tl.fromTo(
        "[data-flap]",
        { x: -30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.4
      );

      tl.fromTo(
        "[data-canopy]",
        { y: -40, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.1, ease: "expo.out" },
        0.35
      );

      tl.fromTo(
        "[data-the]",
        { opacity: 0, scale: 0.8 },
        { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" },
        0.7
      );

      // 3. Counter & Progress Bar Scrub
      tl.to(
        counterObj,
        {
          v: 100,
          duration: 2.1,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(counterObj.v);
            if (counterRef.current) {
              counterRef.current.textContent = String(val).padStart(3, "0");
            }
            if (barRef.current) {
              barRef.current.style.width = `${val}%`;
            }
            if (val < 28) setStatusText(STAGES[0]);
            else if (val < 62) setStatusText(STAGES[1]);
            else if (val < 92) setStatusText(STAGES[2]);
            else setStatusText(STAGES[3]);
          },
        },
        0.1
      );

      // 4. Emblem light sweep at completion
      tl.fromTo(
        "[data-glint]",
        { xPercent: -120, opacity: 0 },
        { xPercent: 120, opacity: 0.9, duration: 0.75, ease: "power2.inOut" },
        1.7
      );

      // 5. Fade out center content slightly before shutters part
      tl.to(
        "[data-loader-content]",
        { opacity: 0, scale: 0.96, duration: 0.45, ease: "power2.in" },
        2.2
      );

      // 6. Laser seam flash
      tl.fromTo(
        flareRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.35, ease: "expo.out" },
        2.25
      );

      // 7. Dispatch ready event so Hero starts seamlessly underneath
      tl.call(finish, [], 2.4);

      // 8. Epic Cinematic Dual Aperture Curtain Split
      tl.to(
        shutterTop.current,
        {
          yPercent: -100,
          duration: 1.15,
          ease: "expo.inOut",
        },
        2.35
      );

      tl.to(
        shutterBottom.current,
        {
          yPercent: 100,
          duration: 1.15,
          ease: "expo.inOut",
        },
        2.35
      );

      tl.to(
        flareRef.current,
        {
          opacity: 0,
          scaleY: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        2.45
      );
    }, el);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={root}
      className="loader fixed inset-0 z-[300] overflow-hidden select-none pointer-events-auto"
      role="status"
      aria-label="Loading The Prime Step"
    >
      <noscript>
        <style>{`.loader{display:none!important}`}</style>
      </noscript>

      {/* TOP APERTURE SHUTTER */}
      <div
        ref={shutterTop}
        className="absolute inset-x-0 top-0 h-[50.5vh] bg-[#050808] border-b border-cyan-500/20 shadow-2xl z-20 flex flex-col justify-between p-6 md:p-10"
      >
        {/* Subtle Ambient Blueprint Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(31, 157, 154, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "28px 28px, 56px 56px, 56px 56px",
          }}
        />

        {/* Top HUD Bar */}
        <div data-hud className="relative z-10 flex items-center justify-between text-xs font-mono text-pale/70">
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-cyan-500" />
            </span>
            <span className="font-semibold tracking-[0.22em] text-white">THE PRIME STEP</span>
            <span className="hidden sm:inline text-white/30">|</span>
            <span className="hidden sm:inline text-pale/50 tracking-wider">ACADEMY OF COMPUTING</span>
          </div>
          <div className="flex items-center gap-2 tracking-widest text-[11px] text-pale/60">
            <span>22.7196° N, 75.8577° E</span>
            <span className="text-cyan-400/80">INDORE</span>
          </div>
        </div>

        {/* Ambient Bloom Flare */}
        <div
          data-emblem-bg
          className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[480px] h-[360px] rounded-full blur-[110px] bg-cyan-500/15"
        />
      </div>

      {/* BOTTOM APERTURE SHUTTER */}
      <div
        ref={shutterBottom}
        className="absolute inset-x-0 bottom-0 h-[50.5vh] bg-[#050808] border-t border-cyan-500/20 shadow-2xl z-20 flex flex-col justify-end p-6 md:p-10"
      >
        {/* Subtle Ambient Blueprint Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(rgba(31, 157, 154, 0.4) 1px, transparent 1px), linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
            backgroundSize: "28px 28px, 56px 56px, 56px 56px",
          }}
        />

        {/* Bottom HUD: Telemetry & Tabular Progress */}
        <div data-hud className="relative z-10 space-y-4 pl-12 md:pl-14">
          {/* Laser Track */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-white/10">
            <div
              ref={barRef}
              className="h-full w-0 bg-gradient-to-r from-teal-500 via-cyan-400 to-white shadow-[0_0_14px_rgba(45,182,174,0.95)] transition-all duration-75"
            />
          </div>

          <div className="flex items-end justify-between font-mono">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.25em] text-cyan-400 font-semibold">
                SYSTEM TELEMETRY
              </div>
              <div ref={statusRef} className="text-xs sm:text-sm tracking-wider text-white font-medium">
                {statusText}
              </div>
            </div>

            <div className="flex items-baseline gap-1">
              <span
                ref={counterRef}
                className="tabular-nums font-bold text-4xl sm:text-6xl text-white tracking-tighter"
              >
                000
              </span>
              <span className="text-sm font-semibold text-cyan-400">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER STAGE: ARCHITECTURAL EMBLEM ASSEMBLY (Sits between the shutters) */}
      <div
        data-loader-content
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative">
          {/* Ambient Radial Halo */}
          <div className="absolute inset-0 -m-16 rounded-full bg-gradient-to-tr from-teal-500/20 via-cyan-400/20 to-transparent blur-3xl opacity-75" />

          {/* Precision Official Prime Step Monument Vector */}
          <svg
            viewBox="180 432 440 705"
            className="relative w-32 sm:w-40 md:w-48 drop-shadow-[0_25px_50px_rgba(0,0,0,0.9)] overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="loader-pillar-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#2EDBCE" />
                <stop offset="100%" stopColor="#157B78" />
              </linearGradient>
              <linearGradient id="loader-canopy-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#2E2E2E" />
                <stop offset="100%" stopColor="#141414" />
              </linearGradient>
              <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Glowing Accent Eaves Flap */}
            <path
              data-flap
              d="M207 550L250 575L241 604L208 607Z"
              fill="#1E9C99"
              filter="url(#neon-glow)"
              stroke="#66E5E0"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Rising Pillar */}
            <path
              data-pillar
              d="M240 758L385 680L390 1096L360 1119L222 1033L218 1024L238 1008Z"
              fill="url(#loader-pillar-grad)"
              stroke="#32D5CE"
              strokeWidth="2.5"
              strokeLinejoin="round"
              className="drop-shadow-[0_0_20px_rgba(31,157,154,0.4)]"
            />

            {/* Obsidian Roof Canopy with Chamfer Glow */}
            <path
              data-canopy
              d="M215 548L360 458L570 575L572 772L586 779L574 800L442 890L418 884L418 668L250 578Z"
              fill="url(#loader-canopy-grad)"
              stroke="#2EDBCE"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* "THE" Ridge Typography */}
            <g data-the transform="translate(424 436) rotate(33)">
              <text
                x="0"
                y="0"
                fill="#2EDBCE"
                fontSize="42"
                fontWeight="800"
                fontFamily="system-ui, sans-serif"
                letterSpacing="4"
              >
                THE
              </text>
            </g>
          </svg>

          {/* Light Glint Sheen */}
          <div
            data-glint
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/30 to-transparent w-full h-full"
          />
        </div>

        {/* Cinematic Subtitle */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-cyan-400/90 font-medium">
            Architectural Engineering
          </p>
          <p className="display mt-1 text-2xl font-bold tracking-tight text-white sm:text-3xl">
            The Prime Step
          </p>
        </div>
      </div>

      {/* HORIZONTAL LASER SEAM FLARE (Ignites when 100% is reached and shutters part) */}
      <div
        ref={flareRef}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-300 to-transparent shadow-[0_0_28px_8px_rgba(50,213,206,0.95)] z-40 opacity-0"
      />
    </div>
  );
}
