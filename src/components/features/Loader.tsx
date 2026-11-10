"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/ui/Logo";

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
      try {
        sessionStorage.setItem("tps_visited", "1");
      } catch {
        // ignore storage errors
      }
      window.dispatchEvent(new Event("pps-ready"));
    };

    const alreadyVisited = (() => {
      try {
        return sessionStorage.getItem("tps_visited") === "1";
      } catch {
        return false;
      }
    })();

    if (alreadyVisited || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
        { opacity: 0, y: (i) => (i === 0 ? -10 : 10) },
        { opacity: 1, y: 0, duration: 0.4, ease: "power3.out" },
        0
      );

      // 2. Emblem Reveal
      tl.fromTo(
        "[data-emblem-bg]",
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6, ease: "power2.out" },
        0
      );

      tl.fromTo(
        "[data-emblem]",
        { scale: 0.92, y: 14, opacity: 0 },
        { scale: 1, y: 0, opacity: 1, duration: 0.55, ease: "expo.out" },
        0.05
      );

      // 3. Fast 0.85s Counter Scrub (capped under 1.3s total for fast LCP)
      tl.to(
        counterObj,
        {
          v: 100,
          duration: 0.85,
          ease: "power2.inOut",
          onUpdate: () => {
            const val = Math.round(counterObj.v);
            if (counterRef.current) {
              counterRef.current.textContent = String(val).padStart(3, "0");
            }
            if (barRef.current) {
              barRef.current.style.width = `${val}%`;
            }
            if (val < 30) setStatusText(STAGES[0]);
            else if (val < 65) setStatusText(STAGES[1]);
            else if (val < 92) setStatusText(STAGES[2]);
            else setStatusText(STAGES[3]);
          },
        },
        0.05
      );

      // 4. Sheen sweep
      tl.fromTo(
        "[data-glint]",
        { xPercent: -120, opacity: 0 },
        { xPercent: 120, opacity: 0.85, duration: 0.45, ease: "power2.inOut" },
        0.55
      );

      // 5. Fade out center emblem content slightly before shutters part
      tl.to(
        "[data-loader-content]",
        { opacity: 0, scale: 0.97, duration: 0.25, ease: "power2.in" },
        0.9
      );

      // 6. Laser seam flash
      tl.fromTo(
        flareRef.current,
        { opacity: 0, scaleX: 0 },
        { opacity: 1, scaleX: 1, duration: 0.2, ease: "expo.out" },
        0.92
      );

      // 7. Dispatch ready event at ~0.95s so Hero starts immediately
      tl.call(finish, [], 0.95);

      // 8. Dual White Shutter Aperture Parting
      tl.to(
        shutterTop.current,
        {
          yPercent: -100,
          duration: 0.65,
          ease: "expo.inOut",
        },
        0.95
      );

      tl.to(
        shutterBottom.current,
        {
          yPercent: 100,
          duration: 0.65,
          ease: "expo.inOut",
        },
        0.95
      );

      tl.to(
        flareRef.current,
        {
          opacity: 0,
          scaleY: 0,
          duration: 0.35,
          ease: "power2.out",
        },
        1.0
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

      {/* CENTER STAGE: ARCHITECTURAL EMBLEM */}
      <div
        data-loader-content
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none"
      >
        <div data-emblem className="relative flex flex-col items-center">
          {/* Soft Ground Contact Shadow */}
          <div className="absolute -bottom-7 left-1/2 -translate-x-1/2 w-48 h-8 rounded-full bg-deep/15 blur-lg" />

          {/* Precision Official Prime Step Monument Vector */}
          <Logo mark height={170} className="relative select-none drop-shadow-[0_20px_40px_rgba(0,77,77,0.16)]" />

          {/* Light Glint Sheen */}
          <div
            data-glint
            className="pointer-events-none absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/60 to-transparent w-full h-full"
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
