"use client";

import Link from "next/link";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

export default function HtmlOverlay({ course }: { course: RoadmapCourse }) {
  const numSteps = course.steps.length;

  return (
    <div className="relative w-screen select-none">
      {/* ========================================================
          1. HERO STARTING STAGE (0vh) — Matches Reference Exactly
          ======================================================== */}
      <section
        style={{ top: "0vh" }}
        className="absolute inset-x-0 h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pointer-events-none"
      >
        <div className="max-w-7xl w-full mx-auto pointer-events-auto">
          <div className="max-w-xl md:max-w-2xl text-left">
            {/* Institute Pill Badge */}
            <div className="flex flex-wrap items-center gap-2 mb-4 md:mb-6">
              <span className="inline-block px-4 py-1.5 rounded-full border border-teal-500/25 bg-teal-500/10 text-[#1AAB95] font-semibold tracking-wide backdrop-blur-sm text-xs md:text-sm uppercase">
                THE PRIME STEP · INDORE
              </span>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-900/5 text-zinc-700 font-mono text-xs">
                {course.duration}
              </span>
              <span className="inline-block px-3.5 py-1.5 rounded-full bg-zinc-900/5 text-zinc-700 font-mono text-xs">
                {course.level}
              </span>
            </div>

            {/* Giant Bold Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight md:leading-none tracking-tight text-zinc-900 mb-4 md:mb-6">
              {course.title}{" "}
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-[#1AAB95] to-[#2DD4BF]">
                Car Roadmap
              </span>
            </h1>

            {/* Narrative Description */}
            <p className="text-zinc-600 text-base sm:text-lg md:text-xl leading-relaxed max-w-xl mb-5 font-normal">
              {course.description}
            </p>

            {/* 4-Pillar Overview Strip */}
            <div className="mb-6 flex flex-wrap gap-2">
              {[
                "1. Core Syllabus Overview",
                "2. Hands-On Lab Projects",
                "3. 1-on-1 Personal Training",
                "4. Placement Support",
              ].map((pill) => (
                <span
                  key={pill}
                  className="rounded-lg border border-zinc-200/80 bg-white/85 px-3 py-1.5 text-xs font-semibold text-zinc-800 shadow-xs backdrop-blur-sm"
                >
                  {pill}
                </span>
              ))}
            </div>

            {/* Scroll Indicator */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-teal-500/20 bg-teal-500/5 px-4 py-2 text-xs font-semibold text-[#1AAB95]">
              <span className="animate-bounce">↓</span>
              <span>Scroll to Drive Through Syllabus &amp; Training</span>
              <span className="text-zinc-400">•</span>
              <span>{numSteps} Milestones</span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          2. MILESTONE STAGES ((i + 1) * 100vh) — Alternating Layout
          ======================================================== */}
      {course.steps.map((step, index) => {
        const isRightAligned = index % 2 === 0;
        const topVh = (index + 1) * 100;

        return (
          <section
            key={step.stepId}
            style={{ top: `${topVh}vh` }}
            className={`absolute inset-x-0 h-screen flex flex-col justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16 pointer-events-none ${
              isRightAligned
                ? "items-center md:items-end text-left md:text-right"
                : "items-center md:items-start text-left"
            }`}
          >
            <div className="max-w-7xl w-full mx-auto pointer-events-auto">
              <div
                className={`w-full max-w-md md:max-w-xl transition-transform duration-500 hover:scale-[1.01] ${
                  isRightAligned ? "md:ml-auto" : ""
                }`}
              >
                {/* Step Index & Title */}
                <span className="text-[#1AAB95] font-bold text-sm md:text-base mb-1 block uppercase tracking-wider">
                  {step.stepId} / {step.title}
                </span>

                {/* Step Headline */}
                <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-zinc-900 mb-3 md:mb-4 tracking-tight leading-tight">
                  {step.heading}
                </h2>

                {/* Description */}
                <p className="text-zinc-500 text-sm md:text-base leading-relaxed mb-3">
                  {step.desc}
                </p>

                {/* Core Tech Pill Badge */}
                <div className="inline-block px-3 py-2 md:px-4 md:py-2 bg-zinc-100/90 backdrop-blur-md rounded-lg text-xs md:text-sm font-semibold text-zinc-700 shadow-xs border border-zinc-200/60 mb-5">
                  <strong className="text-[#1AAB95]">Tech:</strong> {step.techFocus}
                </div>

                {/* Hands-On Capstone Project Card */}
                {step.project && (
                  <div
                    className={`p-5 rounded-2xl bg-white/85 border border-zinc-200/70 backdrop-blur-md shadow-lg text-left transition-all duration-300 hover:shadow-xl hover:border-teal-500/30 ${
                      isRightAligned ? "md:ml-auto" : ""
                    }`}
                  >
                    <div className="flex items-center gap-2 mb-2 text-[#1AAB95] font-black text-[11px] uppercase tracking-widest">
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#1AAB95] opacity-75" />
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1AAB95]" />
                      </span>
                      ⚡ Capstone Project
                    </div>
                    <h4 className="text-xl font-black text-zinc-950 mb-1.5 leading-tight">
                      {step.project.name}
                    </h4>
                    <p className="text-zinc-600 text-xs md:text-sm leading-relaxed mb-3">
                      {step.project.desc}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {step.project.features.map((feat) => (
                        <span
                          key={feat}
                          className="rounded bg-teal-500/10 px-2 py-0.5 text-[10px] font-semibold text-[#1AAB95] uppercase border border-teal-500/20"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}

      {/* ========================================================
          3. GRAND FINALE CELEBRATION STAGE ((numSteps + 1) * 100vh)
          ======================================================== */}
      <section
        style={{ top: `${(numSteps + 1) * 100}vh` }}
        className="absolute inset-x-0 h-screen flex flex-col justify-center items-center px-6 md:px-16 pointer-events-none text-center"
      >
        <div className="max-w-2xl w-full mx-auto pointer-events-auto rounded-3xl border border-zinc-200/80 bg-white/95 p-8 md:p-12 shadow-2xl backdrop-blur-xl">
          <div className="inline-block px-4 py-1.5 rounded-full border border-teal-500/30 bg-teal-500/10 text-[#1AAB95] font-semibold tracking-wide mb-4 text-xs md:text-sm uppercase">
            🏆 DESTINATION REACHED
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-zinc-900 mb-4 tracking-tight">
            You are <span className="text-[#1AAB95]">Placement Ready.</span>
          </h2>
          <p className="text-zinc-500 text-sm md:text-base leading-relaxed max-w-lg mx-auto mb-8">
            You have driven through the complete industry-aligned curriculum, built deployed production systems, and mastered real architectural engineering.
          </p>

          <div className="mb-8 grid grid-cols-2 gap-3 text-left md:grid-cols-4">
            {course.techStack.map((tech) => (
              <div key={tech.name} className="rounded-xl border border-zinc-200/60 bg-zinc-50/80 p-3">
                <h4 className="text-[11px] font-bold text-zinc-900 uppercase tracking-wider">
                  {tech.name}
                </h4>
                <p className="mt-0.5 text-[11px] text-zinc-500">{tech.items}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <a
              href={`https://wa.me/919479611441?text=${encodeURIComponent(`Hi The Prime Step! I completed the ${course.title} 3D Roadmap and want to book a free demo class.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-[#1AAB95] px-7 py-3.5 text-sm font-bold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#148977]"
            >
              WhatsApp Career Counselor
            </a>
            <a
              href="tel:+919479611441"
              className="rounded-full border border-teal-500/30 bg-teal-500/10 px-6 py-3.5 text-sm font-bold text-[#156b69] transition-colors hover:bg-teal-500/20"
            >
              Call +91 94796 11441
            </a>
            <Link
              href={course.seoHref || "/courses"}
              className="rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              Full Syllabus Details →
            </Link>
            <Link
              href="/courses"
              className="rounded-full border border-zinc-200 bg-white px-6 py-3.5 text-sm font-semibold text-zinc-700 transition-colors hover:bg-zinc-50"
            >
              ← Explore All Courses
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
