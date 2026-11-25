"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { gsap } from "@/lib/gsap";
import { sceneState, scrollToId } from "@/lib/scroll";
import { BRANCHES, SITE } from "@/lib/content";
import { GOOGLE_RATING } from "@/lib/homepage";
import { EASE_OUT } from "@/components/ui/Motion";
import Logo from "@/components/ui/Logo";

const HeroScene = dynamic(() => import("./HeroScene"), { ssr: false });

function webglOK() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

function StaticMarkStage() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center p-8">
      <Logo
        mark
        height={176}
        className="max-h-[190px] drop-shadow-[0_24px_48px_rgba(14,110,107,0.18)]"
      />
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {["Java", "MERN", "Python", "Data & AI", "DevOps"].map((tech) => (
          <span
            key={tech}
            className="rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[11px] font-medium text-ink-muted"
          >
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

const HERO_PILLARS = [
  { label: "Lab-First Curriculum", value: "100% Practical Workstations" },
  { label: "Mentorship", value: "1-on-1 Code Reviews" },
  { label: "Career Cell", value: "Mocks, GitHub & Referrals" },
] as const;

export default function Hero() {
  const rootRef = useRef<HTMLElement>(null);
  const [gl, setGl] = useState(false);
  const [inView, setInView] = useState(true);
  const [exploded, setExploded] = useState(false);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 900px)").matches;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!isDesktop || calm || !webglOK()) return;

    const timer = window.setTimeout(() => setGl(true), 120);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    return () => {
      sceneState.progress = 0;
    };
  }, []);

  const toggleExplode = () => {
    setExploded((prev) => {
      const next = !prev;
      gsap.to(sceneState, {
        progress: next ? 0.62 : 0,
        duration: 0.9,
        ease: "expo.out",
      });
      return next;
    });
  };

  return (
    <section
      ref={rootRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-paper pt-24 pb-16 sm:pt-28 sm:pb-20 lg:pt-32 lg:pb-24"
    >
      {/* Subtle architectural hairline grid with radial fade */}
      <div
        aria-hidden="true"
        className="arch-grid pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_75%_65%_at_50%_15%,#000_45%,transparent_100%)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(14,110,107,0.08)_0%,transparent_70%)]"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* Institutional Status Row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT }}
          className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-hairline pb-4"
        >
          <div className="inline-flex items-center gap-2.5">
            <span className="size-2 rounded-full bg-brand" />
            <span className="font-mono text-[11.5px] font-semibold uppercase tracking-[0.1em] text-ink">
              Indore · {BRANCHES.map((b) => b.name).join(" · ")}
            </span>
          </div>

          <a
            href={GOOGLE_RATING.reviewsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-3 py-1 font-mono text-[11px] font-medium text-ink-muted transition-colors hover:border-brand/40 hover:text-ink"
          >
            <span className="font-semibold text-amber-600">★ {GOOGLE_RATING.rating}</span>
            <span className="text-hairline">|</span>
            <span>{GOOGLE_RATING.countLabel}</span>
          </a>
        </motion.div>

        {/* Main 12-Column Asymmetric Hero Split */}
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Left: Authoritative Institutional Messaging (Immediate HTML, Zero Typing Delay) */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.05, ease: EASE_OUT }}
              className="eyebrow text-brand"
            >
              IT &amp; Software Engineering Institute · Est. {SITE.established}
            </motion.p>

            <motion.h1
              id="hero-title"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1, ease: EASE_OUT }}
              className="display mt-4 text-[clamp(2.5rem,5.4vw,4.6rem)] font-extrabold leading-[1.01] tracking-[-0.036em] text-ink"
            >
              Practical software engineering.{" "}
              <span className="text-brand">Built in Indore.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.16, ease: EASE_OUT }}
              className="prose-measure mt-6 text-base leading-[1.68] text-ink-muted sm:text-lg"
            >
              Master Java Full Stack, MERN, Python, Data Analytics, Power BI, AI &amp; Cloud on dedicated lab workstations — with one-on-one mentor code reviews, real production projects, and structured placement preparation.
            </motion.p>

            {/* Primary & Secondary Actions */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.22, ease: EASE_OUT }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center"
            >
              <a
                href="#admission"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("admission");
                }}
                className="press-scale group inline-flex min-h-[52px] items-center justify-center gap-2.5 rounded-full bg-ink px-7 text-[15px] font-semibold text-white hover:bg-brand"
              >
                <span>Book a Free 2-Day Demo</span>
                <span
                  aria-hidden="true"
                  className="transition-transform duration-200 group-hover:translate-x-0.5"
                >
                  →
                </span>
              </a>

              <a
                href="#courses"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToId("courses");
                }}
                className="press-scale inline-flex min-h-[52px] items-center justify-center rounded-full border border-hairline bg-paper px-6 text-[15px] font-semibold text-ink hover:border-ink/40 hover:bg-canvas"
              >
                Explore 15 Programs
              </a>

              <Link
                href="/roadmap/java"
                className="inline-flex min-h-[44px] items-center justify-center px-2 text-sm font-semibold text-ink-muted underline-offset-4 transition-colors hover:text-brand hover:underline"
              >
                Interactive 3D Roadmaps ↗
              </Link>
            </motion.div>

            {/* Crisp 3-Column Architectural Specification Strip */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.28, ease: EASE_OUT }}
              className="mt-10 grid gap-4 border-t border-hairline pt-6 sm:grid-cols-3"
            >
              {HERO_PILLARS.map((item) => (
                <div key={item.label}>
                  <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-subtle">
                    {item.label}
                  </span>
                  <span className="mt-1 block text-sm font-semibold text-ink">
                    {item.value}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Architectural 3D Mark Studio Frame */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.14, ease: EASE_OUT }}
            className="relative flex flex-col justify-between overflow-hidden rounded-2xl border border-hairline bg-canvas p-4 shadow-[0_24px_60px_-28px_rgba(11,18,21,0.14)] sm:p-5"
          >
            {/* Frame Header */}
            <div className="relative z-20 flex items-center justify-between gap-2 border-b border-hairline/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="size-2 rounded-full bg-brand" />
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.08em] text-ink-muted">
                  The Prime Step · Architecture
                </span>
              </div>

              <button
                type="button"
                onClick={toggleExplode}
                className={`press-scale hidden items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-[11px] font-semibold transition-colors min-[900px]:inline-flex ${
                  exploded
                    ? "border-brand bg-brand text-white"
                    : "border-hairline bg-paper text-ink hover:border-brand hover:text-brand"
                }`}
              >
                <span>{exploded ? "Assemble Mark" : "Inspect Layers"}</span>
                <span aria-hidden="true">{exploded ? "↙" : "↗"}</span>
              </button>
            </div>

            {/* 3D Canvas Stage */}
            <div className="relative mx-auto h-[300px] w-full sm:h-[360px] lg:h-[420px]">
              {gl ? <HeroScene active={inView} /> : <StaticMarkStage />}
            </div>

            {/* Frame Footer Telemetry */}
            <div className="relative z-20 flex flex-wrap items-center justify-between gap-2 border-t border-hairline/80 pt-3 font-mono text-[11px] text-ink-subtle">
              <span>{exploded ? "VIEW: DECONSTRUCTED LAYERS" : "LABS OPEN 8 AM – 8 PM"}</span>
              <a
                href={SITE.phoneHref}
                className="font-semibold text-ink transition-colors hover:text-brand"
              >
                {SITE.phoneDisplay}
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
