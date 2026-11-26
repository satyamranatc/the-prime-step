"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { scrollToId } from "@/lib/scroll";
import { BRANCHES, SITE } from "@/lib/content";
import { GOOGLE_RATING } from "@/lib/homepage";
import { EASE_OUT } from "@/components/ui/Motion";

const ORBIT_LOGOS = [
  {
    name: "Python",
    course: "Python & AI",
    src: "/tech/python.png",
    href: "/python-programming-classes",
    pos: "top-[116px] left-[3.5%] lg:left-[6.5%]",
    rotate: -10,
    size: "size-15 lg:size-[68px]",
    floatY: -8,
    duration: 5.6,
    delay: 0.14,
  },
  {
    name: "Java",
    course: "Java Full Stack",
    src: "/tech/java.png",
    href: "/java-full-stack-developer",
    pos: "top-[256px] left-[1%] lg:left-[2.2%]",
    rotate: 7,
    size: "size-14 lg:size-[62px]",
    floatY: -6,
    duration: 6.2,
    delay: 0.22,
  },
  {
    name: "React",
    course: "MERN Stack",
    src: "/tech/react.png",
    href: "/mern-stack-developer-course",
    pos: "top-[386px] left-[5%] lg:left-[8.5%]",
    rotate: -7,
    size: "size-14 lg:size-[60px]",
    floatY: -7,
    duration: 5.9,
    delay: 0.3,
  },
  {
    name: "AWS Cloud",
    course: "DevOps & AWS",
    src: "/tech/aws.png",
    href: "/devops-and-cloud-computing-course",
    pos: "top-[116px] right-[3.5%] lg:right-[6.5%]",
    rotate: 10,
    size: "size-15 lg:size-[68px]",
    floatY: -8,
    duration: 5.8,
    delay: 0.18,
  },
  {
    name: "TensorFlow",
    course: "AI & ML",
    src: "/tech/tensorflow.png",
    href: "/artificial-intelligence-and-machine-learning-course",
    pos: "top-[256px] right-[1%] lg:right-[2.2%]",
    rotate: -7,
    size: "size-14 lg:size-[62px]",
    floatY: -6,
    duration: 6.4,
    delay: 0.26,
  },
] as const;

const DASHBOARD_TRACKS = [
  {
    title: "Java Full Stack Developer",
    meta: "Spring Boot · Microservices · React",
    duration: "5–6 Mo",
    href: "/java-full-stack-developer",
    roadmap: "/roadmap/java",
  },
  {
    title: "MERN Stack Developer",
    meta: "MongoDB · Express · React · Node.js",
    duration: "5–6 Mo",
    href: "/mern-stack-developer-course",
    roadmap: "/roadmap/mern",
  },
  {
    title: "Python & Applied AI",
    meta: "Python · Django · ML · GenAI",
    duration: "4–6 Mo",
    href: "/python-programming-classes",
    roadmap: "/roadmap/python",
  },
  {
    title: "Data Analytics & Power BI",
    meta: "SQL · Power BI · DAX · Excel",
    duration: "3–4 Mo",
    href: "/data-analytics-course-in-indore",
    roadmap: "/roadmap/data-analytics",
  },
] as const;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [sidebarTab, setSidebarTab] = useState<"tracks" | "campuses">("tracks");
  const [listMode, setListMode] = useState<"syllabus" | "roadmaps">("syllabus");

  // Subtle scroll-linked parallax for the orbiting tech icons
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const orbitParallaxY = useTransform(scrollYProgress, [0, 1], [0, -34]);
  const portalParallaxY = useTransform(scrollYProgress, [0, 1], [0, -14]);

  return (
    <section
      ref={sectionRef}
      id="top"
      aria-labelledby="hero-title"
      className="relative overflow-hidden bg-white pt-[calc(5.25rem+env(safe-area-inset-top))] pb-14 text-ink sm:pt-32 sm:pb-20 lg:pt-36 lg:pb-24"
    >
      {/* Smooth Sculpted Teal Orbital Halo Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <div
          className="absolute top-8 left-1/2 h-[640px] w-[640px] -translate-x-1/2 rounded-full sm:h-[840px] sm:w-[840px]"
          style={{
            background:
              "radial-gradient(circle at 50% 44%, rgba(34, 166, 159, 0.2) 0%, rgba(167, 243, 238, 0.22) 38%, rgba(235, 250, 249, 0.14) 64%, transparent 76%)",
            filter: "blur(28px)",
          }}
        />

        {/* Layered concentric orbital arcs framing the floating tech icons */}
        <div
          className="absolute top-16 left-1/2 h-[540px] w-[540px] -translate-x-1/2 rounded-full border border-brand/[0.11] sm:h-[740px] sm:w-[740px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(255,255,255,0.68) 0%, rgba(34,166,159,0.07) 55%, rgba(255,255,255,0.2) 100%)",
          }}
        />
        <div className="absolute -top-2 left-1/2 hidden h-[900px] w-[900px] -translate-x-1/2 rounded-full border border-dashed border-brand/[0.09] lg:block" />
      </div>

      {/* Depth-Layered Floating Programming Logos with Subtle Float & Scroll Parallax */}
      <motion.div
        style={{ y: orbitParallaxY }}
        className="pointer-events-none absolute inset-x-0 top-0 z-20 mx-auto hidden h-[520px] max-w-[1300px] md:block"
      >
        {ORBIT_LOGOS.map((logo) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, scale: 0.84, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6, delay: logo.delay, ease: EASE_OUT }}
            className={`pointer-events-auto absolute ${logo.pos}`}
          >
            <motion.div
              animate={{ y: [0, logo.floatY, 0] }}
              transition={{
                duration: logo.duration,
                repeat: Infinity,
                ease: "easeInOut",
                delay: logo.delay,
              }}
              style={{ rotate: logo.rotate }}
            >
              <Link
                href={logo.href}
                title={`Learn ${logo.course} at The Prime Step`}
                className={`group relative flex ${logo.size} items-center justify-center rounded-2xl border border-white/95 bg-white/95 p-3 shadow-[0_18px_38px_-12px_rgba(14,110,107,0.28),0_4px_12px_-2px_rgba(11,18,21,0.07),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-108 hover:border-brand/45 hover:shadow-[0_24px_48px_-12px_rgba(14,110,107,0.42)]`}
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={40}
                  height={40}
                  className="h-8 w-8 object-contain transition-transform duration-300 group-hover:scale-105 lg:h-9 lg:w-9"
                />
                {/* Crisp Hover Label Pill */}
                <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-hairline bg-ink px-2.5 py-0.5 text-[10.5px] font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
                  {logo.course}
                </span>
              </Link>
            </motion.div>
          </motion.div>
        ))}

        {/* 6th Balanced Orbital Tile: SQL & Power BI Analytics */}
        <motion.div
          initial={{ opacity: 0, scale: 0.84, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.34, ease: EASE_OUT }}
          className="pointer-events-auto absolute top-[386px] right-[5%] lg:right-[8.5%]"
        >
          <motion.div
            animate={{ y: [0, -7, 0] }}
            transition={{
              duration: 6.0,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.4,
            }}
            style={{ rotate: 7 }}
          >
            <Link
              href="/data-analytics-course-in-indore"
              title="Learn SQL & Data Analytics at The Prime Step"
              className="group relative flex size-14 items-center justify-center rounded-2xl border border-white/95 bg-white/95 p-3 shadow-[0_18px_38px_-12px_rgba(14,110,107,0.28),0_4px_12px_-2px_rgba(11,18,21,0.07),inset_0_1px_0_rgba(255,255,255,1)] backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-108 hover:border-brand/45 hover:shadow-[0_24px_48px_-12px_rgba(14,110,107,0.42)] lg:size-[60px]"
            >
              <svg
                viewBox="0 0 36 36"
                fill="none"
                aria-hidden="true"
                className="h-8 w-8 lg:h-9 lg:w-9"
              >
                <rect x="4" y="20" width="6" height="12" rx="2" fill="#0E6E6B" />
                <rect x="15" y="13" width="6" height="19" rx="2" fill="#14B8A6" />
                <rect x="26" y="6" width="6" height="26" rx="2" fill="#2DD4BF" />
              </svg>
              <span className="pointer-events-none absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full border border-hairline bg-ink px-2.5 py-0.5 text-[10.5px] font-medium text-white opacity-0 shadow-md transition-all duration-200 group-hover:opacity-100">
                Data &amp; Power BI
              </span>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className="relative z-10 mx-auto max-w-[1160px] px-4 sm:px-6 lg:px-8">
        {/* Centered Editorial Hero Header */}
        <div className="mx-auto max-w-3xl text-center">
          {/* Announcement Pill */}
          <motion.a
            href="#admission"
            onClick={(e) => {
              e.preventDefault();
              scrollToId("admission");
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE_OUT }}
            className="inline-flex max-w-full items-center gap-2 rounded-full border border-brand/20 bg-white/90 p-1 pr-3 text-[11.5px] font-medium text-ink shadow-[0_4px_20px_-6px_rgba(14,110,107,0.2)] backdrop-blur-md transition-colors hover:border-brand/45 sm:pr-3.5 sm:text-xs"
          >
            <span className="shrink-0 rounded-full bg-brand px-2.5 py-0.5 text-[10.5px] font-semibold text-white sm:text-[11px]">
              Free Demo
            </span>
            <span className="truncate text-ink-muted sm:hidden">
              2-day free lab demo · 3 Indore campuses →
            </span>
            <span className="hidden text-ink-muted sm:inline">
              2-day practical lab sessions across 3 Indore campuses →
            </span>
          </motion.a>

          {/* Centered 2-Line Display Headline */}
          <motion.h1
            id="hero-title"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.06, ease: EASE_OUT }}
            className="display mt-6 text-[clamp(2.1rem,8vw,4.55rem)] font-bold leading-[1.06] tracking-[-0.032em] text-ink sm:mt-7"
          >
            Master Real{" "}
            <span className="bg-gradient-to-r from-[#0a5654] via-brand to-[#22a69f] bg-clip-text text-transparent">
              Tech Skills,
            </span>
            <br />
            Build Your Career
          </motion.h1>

          {/* Concise Centered Subcopy */}
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.12, ease: EASE_OUT }}
            className="mx-auto mt-4 max-w-xl text-[14.5px] leading-[1.68] text-ink-muted sm:mt-5 sm:text-base"
          >
            Indore&apos;s hands-on IT &amp; software engineering institute — learn Java Full Stack, MERN, Python, Data Analytics, Power BI &amp; AI on real lab workstations with 1-on-1 mentor code reviews.
          </motion.p>

          {/* Centered Dual Pill CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.18, ease: EASE_OUT }}
            className="mx-auto mt-7 flex max-w-sm flex-col items-stretch justify-center gap-3 sm:mt-8 sm:max-w-none sm:flex-row sm:flex-wrap sm:items-center sm:gap-3.5"
          >
            <a
              href="#admission"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("admission");
              }}
              className="press-scale inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-brand px-7 text-sm font-semibold text-white shadow-[0_12px_28px_-8px_rgba(14,110,107,0.6)] transition-all hover:bg-[#0a5654] hover:shadow-[0_16px_34px_-8px_rgba(14,110,107,0.72)] sm:w-auto"
            >
              Book Free Demo
            </a>

            <a
              href="#courses"
              onClick={(e) => {
                e.preventDefault();
                scrollToId("courses");
              }}
              className="press-scale inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-brand/35 bg-white/95 px-7 text-sm font-semibold text-brand shadow-[0_4px_14px_-6px_rgba(14,110,107,0.18)] transition-colors hover:border-brand hover:bg-accent-soft sm:w-auto"
            >
              Explore 15 Courses
            </a>
          </motion.div>

          {/* Compact Programming Logo Row on Mobile */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2.5 md:hidden">
            {ORBIT_LOGOS.map((logo) => (
              <Link
                key={logo.name}
                href={logo.href}
                title={logo.course}
                className="flex size-11 items-center justify-center rounded-xl border border-hairline bg-white p-2 shadow-sm active:scale-95"
              >
                <Image
                  src={logo.src}
                  alt={`${logo.name} logo`}
                  width={26}
                  height={26}
                  className="h-6 w-6 object-contain"
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Bottom-Emerging Frosted White 3-Column Learning Portal Preview */}
        <motion.div
          style={{ y: portalParallaxY }}
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.24, ease: EASE_OUT }}
          className="mx-auto mt-12 max-w-[1040px] rounded-[24px] border border-white/90 bg-white/65 p-2 shadow-[0_32px_90px_-28px_rgba(14,110,107,0.24),0_2px_12px_rgba(11,18,21,0.04)] backdrop-blur-xl sm:mt-14 sm:p-2.5"
        >
          <div className="overflow-hidden rounded-[18px] border border-hairline/90 bg-white">
            <div className="grid lg:grid-cols-[210px_1fr_265px]">
              {/* Left Sidebar (Desktop) */}
              <aside className="hidden flex-col justify-between border-r border-hairline/80 bg-[#fbfdfd] p-5 lg:flex">
                <div>
                  <div className="flex items-center gap-1.5" aria-hidden="true">
                    <span className="size-2.5 rounded-full bg-rose-400/80" />
                    <span className="size-2.5 rounded-full bg-amber-400/80" />
                    <span className="size-2.5 rounded-full bg-emerald-400/80" />
                  </div>

                  <div className="mt-5 flex items-center gap-2.5">
                    <div className="grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand to-light text-xs font-bold text-white">
                      TPS
                    </div>
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-ink">The Prime Step</p>
                      <p className="truncate text-[10.5px] text-ink-subtle">Indore Lab Portal</p>
                    </div>
                  </div>

                  <p className="mt-6 text-[10px] font-semibold uppercase tracking-wider text-ink-subtle">
                    Workspace
                  </p>
                  <div className="mt-2.5 space-y-1">
                    <button
                      type="button"
                      onClick={() => setSidebarTab("tracks")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${sidebarTab === "tracks"
                        ? "bg-accent-soft text-brand"
                        : "text-ink-muted hover:bg-canvas hover:text-ink"
                        }`}
                    >
                      <span>Career Tracks</span>
                      <span className="rounded bg-brand/15 px-1.5 py-0.5 text-[10px] text-brand">
                        15
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setSidebarTab("campuses")}
                      className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs font-semibold transition-colors ${sidebarTab === "campuses"
                        ? "bg-accent-soft text-brand"
                        : "text-ink-muted hover:bg-canvas hover:text-ink"
                        }`}
                    >
                      <span>Indore Campuses</span>
                      <span className="text-[10px] text-ink-subtle">3</span>
                    </button>

                    <Link
                      href="/roadmap/java"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
                    >
                      <span>3D Roadmaps</span>
                      <span aria-hidden="true">↗</span>
                    </Link>

                    <Link
                      href="/career-courses"
                      className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-ink-muted transition-colors hover:bg-canvas hover:text-ink"
                    >
                      <span>Placement Cell</span>
                      <span aria-hidden="true">→</span>
                    </Link>
                  </div>
                </div>

                <div className="rounded-xl border border-hairline bg-white p-3">
                  <p className="text-[10.5px] font-semibold text-brand">
                    ★ {GOOGLE_RATING.rating} GOOGLE RATED
                  </p>
                  <p className="mt-0.5 text-[11px] text-ink-muted">
                    {GOOGLE_RATING.countLabel}
                  </p>
                </div>
              </aside>

              {/* Center Main Workspace */}
              <div className="p-4 sm:p-6">
                {/* Mobile & Tablet Segmented Switcher (replaces hidden desktop sidebar) */}
                <div className="mb-4 grid grid-cols-2 gap-1.5 rounded-xl border border-hairline bg-canvas p-1 lg:hidden">
                  <button
                    type="button"
                    onClick={() => setSidebarTab("tracks")}
                    className={`min-h-[38px] rounded-lg px-3 text-xs font-semibold transition-all ${
                      sidebarTab === "tracks"
                        ? "bg-white text-brand shadow-xs"
                        : "text-ink-muted"
                    }`}
                  >
                    Career Tracks (15)
                  </button>
                  <button
                    type="button"
                    onClick={() => setSidebarTab("campuses")}
                    className={`min-h-[38px] rounded-lg px-3 text-xs font-semibold transition-all ${
                      sidebarTab === "campuses"
                        ? "bg-white text-brand shadow-xs"
                        : "text-ink-muted"
                    }`}
                  >
                    3 Indore Campuses
                  </button>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h2 className="text-base font-bold text-ink">
                    {sidebarTab === "tracks" ? "Career Lab Workspace" : "3 Indore Campuses"}
                  </h2>
                  <div className="flex items-center gap-2 text-[11px] text-ink-subtle">
                    <span>100% Lab Practical</span>
                    <span className="h-1.5 w-14 overflow-hidden rounded-full bg-hairline">
                      <span className="block h-full w-4/5 rounded-full bg-brand" />
                    </span>
                  </div>
                </div>

                {sidebarTab === "tracks" ? (
                  <>
                    <div className="mt-4 grid gap-3.5 sm:grid-cols-2">
                      <Link
                        href="/java-full-stack-developer"
                        className="group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0a5654] via-brand to-[#1ea19a] p-4 text-white shadow-[0_14px_30px_-14px_rgba(14,110,107,0.65)] transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="grid size-7 place-items-center rounded-lg bg-white/15 text-xs font-bold">
                            01
                          </span>
                          <span className="text-[10.5px] font-medium uppercase tracking-wider text-white/80">
                            5–6 Months
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-snug">
                            Java &amp; MERN Full Stack Engineering
                          </p>
                          <p className="mt-1 text-[11px] text-white/80">
                            Spring Boot · React · Node.js · SQL →
                          </p>
                        </div>
                      </Link>

                      <Link
                        href="/data-analytics-course-in-indore"
                        className="group relative flex min-h-[132px] flex-col justify-between overflow-hidden rounded-2xl bg-gradient-to-br from-[#0f766e] via-[#14b8a6] to-[#2dd4bf] p-4 text-white shadow-[0_14px_30px_-14px_rgba(20,184,166,0.55)] transition-transform duration-200 hover:-translate-y-0.5"
                      >
                        <div className="flex items-center justify-between">
                          <span className="grid size-7 place-items-center rounded-lg bg-white/20 text-xs font-bold">
                            02
                          </span>
                          <span className="text-[10.5px] font-medium uppercase tracking-wider text-white/85">
                            3–6 Months
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold leading-snug">
                            Python, Data Analytics &amp; Power BI
                          </p>
                          <p className="mt-1 text-[11px] text-white/85">
                            SQL · DAX · Machine Learning · GenAI →
                          </p>
                        </div>
                      </Link>
                    </div>

                    <div className="mt-6">
                      <div className="flex items-center justify-between border-b border-hairline pb-2.5">
                        <div className="flex items-center gap-4 text-xs font-semibold">
                          <button
                            type="button"
                            onClick={() => setListMode("syllabus")}
                            className={`relative pb-2.5 -mb-2.5 transition-colors ${listMode === "syllabus"
                              ? "border-b-2 border-brand text-brand"
                              : "text-ink-subtle hover:text-ink"
                              }`}
                          >
                            Active Tracks
                          </button>
                          <button
                            type="button"
                            onClick={() => setListMode("roadmaps")}
                            className={`relative pb-2.5 -mb-2.5 transition-colors ${listMode === "roadmaps"
                              ? "border-b-2 border-brand text-brand"
                              : "text-ink-subtle hover:text-ink"
                              }`}
                          >
                            3D Roadmaps
                          </button>
                        </div>

                        <Link
                          href="/courses"
                          className="rounded-md bg-brand px-2.5 py-1 text-[11px] font-semibold text-white hover:bg-[#0a5654]"
                        >
                          All 15 →
                        </Link>
                      </div>

                      <AnimatePresence mode="wait">
                        <motion.div
                          key={listMode}
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -4 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="mt-2.5 divide-y divide-hairline/70"
                        >
                          {DASHBOARD_TRACKS.map((t) => (
                            <Link
                              key={t.title}
                              href={listMode === "syllabus" ? t.href : t.roadmap}
                              className="group flex items-center justify-between gap-3 rounded-lg px-1.5 py-2.5 text-left transition-colors hover:bg-canvas/80 active:scale-[0.99]"
                            >
                              <div className="min-w-0">
                                <p className="truncate text-xs font-semibold text-ink group-hover:text-brand">
                                  {t.title}
                                </p>
                                <p className="truncate text-[11px] text-ink-subtle">
                                  {t.meta}
                                </p>
                              </div>
                              <span className="shrink-0 text-[11px] font-semibold text-brand transition-transform duration-200 group-hover:translate-x-0.5">
                                {listMode === "syllabus" ? `${t.duration} →` : "3D View ↗"}
                              </span>
                            </Link>
                          ))}
                        </motion.div>
                      </AnimatePresence>
                    </div>
                  </>
                ) : (
                  <div className="mt-4 space-y-3">
                    {BRANCHES.map((b) => (
                      <div
                        key={b.name}
                        className="rounded-xl border border-hairline bg-canvas p-4"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-bold text-ink">
                            {b.name} Campus
                          </span>
                          <span className="text-[11px] font-semibold text-brand">
                            {b.tag}
                          </span>
                        </div>
                        <p className="mt-1 text-xs text-ink-muted">{b.address}</p>
                        <p className="mt-1 text-[11px] text-ink-subtle">
                          {b.hours}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Schedule & Live Demo Column */}
              <div className="flex flex-col justify-between border-t border-hairline/80 bg-[#fbfdfd] p-5 lg:border-t-0 lg:border-l">
                <div>
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-ink">Today&apos;s Lab Schedule</p>
                    <span className="text-[10.5px] font-semibold text-brand">INDORE</span>
                  </div>

                  <div className="mt-4 rounded-xl border border-hairline bg-white p-3.5">
                    <p className="text-[10.5px] text-ink-subtle">
                      Free 2-Day Trial Class
                    </p>
                    <p className="mt-1 text-xs font-bold text-ink">
                      Live Lab Demo &amp; Counseling
                    </p>

                    <a
                      href="#admission"
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToId("admission");
                      }}
                      className="mt-3 flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#0e9f6e] to-[#14b8a6] px-3.5 py-2.5 text-xs font-semibold text-white shadow-[0_8px_20px_-8px_rgba(14,159,110,0.65)] transition-opacity hover:opacity-95"
                    >
                      <span>Reserve Free Seat</span>
                      <span className="text-[11px]">8AM–8PM</span>
                    </a>
                  </div>
                </div>

                <div className="mt-6 border-t border-hairline pt-4">
                  <p className="text-xs font-bold text-ink">Institute Snapshot</p>
                  <p className="mt-0.5 text-[11px] text-ink-subtle">
                    Est. {SITE.established} · Practical IT Labs
                  </p>

                  <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                    <div className="rounded-lg border border-hairline bg-white py-2">
                      <span className="block text-base font-bold text-ink">
                        {GOOGLE_RATING.rating}★
                      </span>
                      <span className="block text-[10px] text-ink-subtle">Google</span>
                    </div>
                    <div className="rounded-lg border border-hairline bg-white py-2">
                      <span className="block text-base font-bold text-ink">15</span>
                      <span className="block text-[10px] text-ink-subtle">Courses</span>
                    </div>
                    <div className="rounded-lg border border-hairline bg-white py-2">
                      <span className="block text-base font-bold text-ink">3</span>
                      <span className="block text-[10px] text-ink-subtle">Campuses</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
