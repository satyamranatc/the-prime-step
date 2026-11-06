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
 * Editorial White Splash Screen & Architectural Curtain Reveal
 *
 * Designed to match the pure, crisp Apple-grade white aesthetic:
 * 1. Pristine paper-white canvas with subtle architectural drafting grid and frosted teal aura.
 * 2. Official daylight vector monument assembly: Graphite canopy (#1B1B1B), Teal pillar (#1F9D9A), Cyan flap (#1E9C99).
 * 3. High-precision telemetry HUD: Indore coordinates, live status stages, and tabular numerals.
 * 4. Dual white aperture shutter split that dissolves seamlessly into the white 3D hero stage.
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
        { opacity: 0, y: (i) => (i === 0 ? -12 : 12) },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.1
      );

      // 2. Emblem Assembly: Architectural layer reveals
      tl.fromTo(
        "[data-emblem-bg]",
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 1.4, ease: "power2.out" },
        0
      );

      tl.fromTo(
        "[data-pillar]",
        { y: 55, opacity: 0, scaleY: 0.2 },
        { y: 0, opacity: 1, scaleY: 1, duration: 1.0, ease: "expo.out", transformOrigin: "bottom" },
        0.2
      );

      tl.fromTo(
        "[data-flap]",
        { x: -28, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.4
      );

      tl.fromTo(
        "[data-canopy]",
        { y: -36, opacity: 0 },
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

      // 4. Subtle crystal sheen sweep across emblem
      tl.fromTo(
        "[data-glint]",
        { xPercent: -120, opacity: 0 },
        { xPercent: 120, opacity: 0.85, duration: 0.8, ease: "power2.inOut" },
        1.65
      );

      // 5. Fade out center emblem content slightly before shutters part
      tl.to(
        "[data-loader-content]",
        { opacity: 0, scale: 0.97, duration: 0.45, ease: "power2.in" },
        2.2
      );

      // 6. Laser seam flash
      tl.fromTo(
        flareRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.35, ease: "expo.out" },
        2.25
      );

      // 7. Dispatch ready event so 3D Hero starts underneath
      tl.call(finish, [], 2.4);

      // 8. Dual White Shutter Aperture Parting
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
      className="loader fixed inset-0 z-[300] overflow-hidden select-none pointer-events-auto bg-white"
      role="status"
      aria-label="Loading The Prime Step"
    >
      <noscript>
        <style>{`.loader{display:none!important}`}</style>
      </noscript>

      {/* TOP APERTURE SHUTTER (Pure White with hairline border) */}
      <div
        ref={shutterTop}
        className="absolute inset-x-0 top-0 h-[50.5vh] bg-white border-b border-pale/70 shadow-sm z-20 flex flex-col justify-between p-6 md:p-10"
      >
        {/* Subtle Architectural Drafting Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#1F9D9A 1px, transparent 1px), linear-gradient(to right, #004d4d 1px, transparent 1px), linear-gradient(to bottom, #004d4d 1px, transparent 1px)`,
            backgroundSize: "28px 28px, 56px 56px, 56px 56px",
          }}
        />

        {/* Top HUD Bar */}
        <div data-hud className="relative z-10 flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-3">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-brand" />
            </span>
            <span className="font-semibold tracking-[0.22em] text-deep">THE PRIME STEP</span>
            <span className="hidden sm:inline text-deep/20">|</span>
            <span className="hidden sm:inline text-deep/60 tracking-wider">ACADEMY OF COMPUTING</span>
          </div>
          <div className="flex items-center gap-2 tracking-widest text-[11px] text-deep/70">
            <span>22.7196° N, 75.8577° E</span>
            <span className="font-semibold text-brand">INDORE</span>
          </div>
        </div>

        {/* Frosted Cyan Ambient Glow behind emblem */}
        <div
          data-emblem-bg
          className="pointer-events-none absolute left-1/2 bottom-0 -translate-x-1/2 translate-y-1/2 w-[520px] h-[380px] rounded-full blur-[100px] bg-brand/10"
        />
      </div>

      {/* BOTTOM APERTURE SHUTTER (Pure White with hairline border) */}
      <div
        ref={shutterBottom}
        className="absolute inset-x-0 bottom-0 h-[50.5vh] bg-white border-t border-pale/70 shadow-sm z-20 flex flex-col justify-end p-6 md:p-10"
      >
        {/* Subtle Architectural Drafting Grid */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#1F9D9A 1px, transparent 1px), linear-gradient(to right, #004d4d 1px, transparent 1px), linear-gradient(to bottom, #004d4d 1px, transparent 1px)`,
            backgroundSize: "28px 28px, 56px 56px, 56px 56px",
          }}
        />

        {/* Bottom HUD: Telemetry & Tabular Progress */}
        <div data-hud className="relative z-10 space-y-4 pl-12 md:pl-14">
          {/* Laser Track */}
          <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-deep/10">
            <div
              ref={barRef}
              className="h-full w-0 bg-gradient-to-r from-brand via-[#1F9D9A] to-[#1E9C99] shadow-[0_0_10px_rgba(31,157,154,0.6)] transition-all duration-75"
            />
          </div>

          <div className="flex items-end justify-between font-mono">
            <div className="space-y-1">
              <div className="text-[10px] uppercase tracking-[0.25em] text-brand font-semibold">
                SYSTEM TELEMETRY
              </div>
              <div ref={statusRef} className="text-xs sm:text-sm tracking-wider text-deep font-semibold">
                {statusText}
              </div>
            </div>

            <div className="flex items-baseline gap-1">
              <span
                ref={counterRef}
                className="tabular-nums font-bold text-4xl sm:text-6xl text-deep tracking-tighter"
              >
                000
              </span>
              <span className="text-sm font-semibold text-brand">%</span>
            </div>
          </div>
        </div>
      </div>

      {/* CENTER STAGE: ARCHITECTURAL EMBLEM ASSEMBLY */}
      <div
        data-loader-content
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
      >
        <div className="relative">
          {/* Soft Ground Contact Shadow */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full bg-deep/15 blur-xl" />

          {/* Precision Official Prime Step Monument Vector */}
          <svg
            viewBox="180 432 440 705"
            className="relative w-32 sm:w-40 md:w-48 drop-shadow-[0_15px_30px_rgba(0,77,77,0.12)] overflow-visible"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="loader-pillar-grad-light" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1F9D9A" />
                <stop offset="100%" stopColor="#157B78" />
              </linearGradient>
              <linearGradient id="loader-canopy-grad-light" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#282828" />
                <stop offset="100%" stopColor="#181818" />
              </linearGradient>
            </defs>

            {/* Accent Eaves Flap */}
            <path
              data-flap
              d="M207 550L250 575L241 604L208 607Z"
              fill="#1E9C99"
              stroke="#1A8F8C"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Rising Pillar */}
            <path
              data-pillar
              d="M240 758L385 680L390 1096L360 1119L222 1033L218 1024L238 1008Z"
              fill="url(#loader-pillar-grad-light)"
              stroke="#157B78"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* Architectural Graphite Roof Canopy */}
            <path
              data-canopy
              d="M215 548L360 458L570 575L572 772L586 779L574 800L442 890L418 884L418 668L250 578Z"
              fill="url(#loader-canopy-grad-light)"
              stroke="#101010"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />

            {/* "THE" Ridge Typography */}
            <g data-the transform="translate(424 436) rotate(33)">
              <text
                x="0"
                y="0"
                fill="#1E9C99"
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
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/50 to-transparent w-full h-full"
          />
        </div>

        {/* Editorial Subtitle */}
        <div className="mt-8 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.3em] text-brand font-semibold">
            Architectural Engineering
          </p>
          <p className="display mt-1 text-2xl font-bold tracking-tight text-deep sm:text-3xl">
            The Prime Step
          </p>
        </div>
      </div>

      {/* HORIZONTAL LASER SEAM FLARE */}
      <div
        ref={flareRef}
        className="pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-[#1F9D9A] to-transparent shadow-[0_0_20px_4px_rgba(31,157,154,0.7)] z-40 opacity-0"
      />
    </div>
  );
}
