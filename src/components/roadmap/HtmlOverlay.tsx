"use client";

import Link from "next/link";
import { useRoadmapStore } from "@/lib/roadmapStore";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

export default function HtmlOverlay({ course }: { course: RoadmapCourse }) {
  const activeNode = useRoadmapStore((state) => state.activeNode);
  const numSteps = course.steps.length;
  const isFinale = activeNode >= numSteps;

  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden select-none">
      {/* 1. STARTING LINE HERO CARD (activeNode === -1) */}
      {activeNode === -1 && (
        <div className="pointer-events-auto absolute top-20 left-4 md:top-24 md:left-10 max-w-md md:max-w-xl transition-all duration-500 ease-out animate-[fadeIn_0.5s_ease-out]">
          <div className="rounded-3xl border border-pale/90 bg-paper/95 p-6 shadow-2xl backdrop-blur-xl md:p-8">
            <div className="eyebrow mb-3.5 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-soft px-3.5 py-1 text-xs font-semibold text-brand">
              <span>🏁</span>
              <span>The Prime Step Interactive Highway</span>
            </div>

            <h1 className="display mb-3 text-3xl text-deep sm:text-4xl md:text-5xl leading-tight">
              {course.title} <br />
              <span className="italic text-brand">Syllabus Journey</span>
            </h1>

            <p className="mb-5 text-xs sm:text-sm leading-relaxed text-deep/80 md:text-base">
              {course.description}
            </p>

            <div className="flex flex-wrap items-center gap-2.5">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm">
                <span>🚗</span> Scroll to Start Driving
              </div>
              <div className="rounded-full border border-deep/15 bg-soft px-3.5 py-1.5 text-xs font-medium text-deep">
                {numSteps} Hands-On Milestones
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. DYNAMIC ACTIVE STAGE CARD (0 <= activeNode < numSteps) */}
      {activeNode >= 0 && activeNode < numSteps && (
        <div
          key={activeNode}
          className="pointer-events-auto absolute top-20 right-4 md:top-24 md:right-10 max-w-md md:max-w-lg transition-all duration-500 ease-out animate-[slideIn_0.4s_ease-out]"
        >
          {(() => {
            const step = course.steps[activeNode];
            if (!step) return null;

            return (
              <div className="rounded-2xl border border-pale/90 bg-paper/95 p-5 shadow-2xl backdrop-blur-xl md:p-7">
                {/* Stage Header & Milestone Dots */}
                <div className="mb-3 flex items-center justify-between">
                  <div className="eyebrow flex items-center gap-2 text-brand">
                    <span className="rounded bg-brand/10 px-2 py-0.5 font-mono text-[11px] font-bold text-brand border border-brand/20">
                      STAGE {step.stepId} / 0{numSteps}
                    </span>
                    <span className="h-px w-4 bg-brand/30" />
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-deep/70">
                      {step.title}
                    </span>
                  </div>

                  {/* Visual Milestone Track Pills */}
                  <div className="flex items-center gap-1">
                    {course.steps.map((_, i) => (
                      <span
                        key={i}
                        className={`size-1.5 rounded-full transition-all ${
                          i === activeNode
                            ? "w-4 bg-brand"
                            : i < activeNode
                            ? "bg-brand/50"
                            : "bg-pale"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Heading */}
                <h2 className="display mb-2.5 text-xl text-deep sm:text-2xl md:text-3xl leading-snug">
                  {step.heading}
                </h2>

                {/* Description */}
                <p className="mb-3.5 text-xs leading-relaxed text-deep/80 sm:text-sm">
                  {step.desc}
                </p>

                {/* Core Tech Badge */}
                <div className="mb-4 inline-block rounded-lg border border-deep/15 bg-soft px-3 py-1.5 text-xs font-medium text-deep">
                  <strong className="text-brand">Tech:</strong> {step.techFocus}
                </div>

                {/* Hands-On Project Box */}
                {step.project && (
                  <div className="rounded-xl border border-brand/25 bg-soft/80 p-3.5 text-left shadow-xs">
                    <div className="eyebrow mb-1 flex items-center gap-1.5 text-brand text-[10px]">
                      <span className="size-1.5 rounded-full bg-brand animate-pulse" />
                      Hands-On Capstone Project
                    </div>
                    <h3 className="text-sm font-bold text-deep">{step.project.name}</h3>
                    <p className="mt-0.5 text-xs text-deep/75 leading-relaxed">
                      {step.project.desc}
                    </p>
                    <div className="mt-2 flex flex-wrap gap-1">
                      {step.project.features.map((feat) => (
                        <span
                          key={feat}
                          className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-semibold text-brand uppercase border border-brand/20"
                        >
                          {feat}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })()}
        </div>
      )}

      {/* 3. GRAND FINALE DESTINATION CARD (activeNode >= numSteps) */}
      {isFinale && (
        <div className="pointer-events-auto absolute top-20 inset-x-4 md:top-24 max-w-2xl mx-auto transition-all duration-700 ease-out animate-[scaleUp_0.5s_ease-out]">
          <div className="rounded-3xl border border-pale bg-paper/98 p-6 shadow-2xl backdrop-blur-2xl md:p-9 text-center">
            <div className="eyebrow mb-2 text-brand inline-flex items-center gap-2 rounded-full border border-brand/30 bg-soft px-3.5 py-1 text-xs">
              <span>🏆</span> Destination Reached
            </div>
            <h2 className="display mb-3 text-3xl text-deep sm:text-4xl md:text-5xl">
              You are <span className="italic text-brand">Industry Ready.</span>
            </h2>
            <p className="mb-6 text-xs text-deep/80 sm:text-sm md:text-base max-w-lg mx-auto">
              Mastered skills, built real deployed projects, and prepped for technical interviews.
              Take your next step with The Prime Step today.
            </p>

            <div className="mb-6 grid grid-cols-2 gap-2 text-left md:grid-cols-4">
              {course.techStack.map((tech) => (
                <div key={tech.name} className="rounded-xl border border-pale bg-soft p-3">
                  <h4 className="text-[11px] font-bold text-deep uppercase tracking-wider">
                    {tech.name}
                  </h4>
                  <p className="mt-0.5 text-[11px] text-deep/70">{tech.items}</p>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#admission"
                className="rounded-full bg-brand px-7 py-3 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-deep sm:text-sm"
              >
                Apply for Admissions
              </Link>
              <Link
                href="/#programs"
                className="rounded-full border border-deep/25 bg-paper px-6 py-3 text-xs font-semibold text-deep transition-colors hover:bg-soft sm:text-sm"
              >
                ← Back to Programs
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Keyframe animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes slideIn {
          from { opacity: 0; transform: translateX(16px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scaleUp {
          from { opacity: 0; transform: scale(0.96); }
          to { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}
