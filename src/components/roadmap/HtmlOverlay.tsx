"use client";

import Link from "next/link";
import { Scroll } from "@react-three/drei";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

function Section({
  children,
  style,
  className,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
}) {
  return (
    <section
      className={`absolute flex h-screen w-screen flex-col justify-center px-4 sm:px-6 md:px-12 lg:px-24 pointer-events-none ${
        className || ""
      }`}
      style={style}
    >
      <div className="mx-auto w-full max-w-6xl pointer-events-auto">{children}</div>
    </section>
  );
}

export default function HtmlOverlay({ course }: { course: RoadmapCourse }) {
  return (
    <Scroll html style={{ width: "100vw" }}>
      {/* 0vh - Hero */}
      <Section style={{ top: "0vh" }} className="items-center text-center md:items-start md:text-left">
        <div className="max-w-2xl rounded-3xl border border-pale/90 bg-paper/95 p-8 shadow-2xl backdrop-blur-xl md:p-10">
          <div className="eyebrow mb-4 inline-flex items-center gap-2 rounded-full border border-brand/30 bg-soft px-3.5 py-1 text-xs text-brand">
            <span>🏁</span>
            <span>The Prime Step Interactive Highway</span>
          </div>
          <h1 className="display mb-4 text-3xl text-deep sm:text-5xl md:text-6xl">
            {course.title} <br />
            <span className="italic text-brand">Syllabus Journey</span>
          </h1>
          <p className="mb-6 max-w-xl text-sm leading-relaxed text-deep/80 sm:text-base">
            {course.description}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full bg-brand px-4 py-2 text-xs font-semibold text-white shadow-sm">
              <span>🚗</span> Scroll to Start Driving
            </div>
            <div className="rounded-full border border-deep/15 bg-soft px-3.5 py-1.5 text-xs font-medium text-deep">
              {course.steps.length} Hands-On Milestones
            </div>
          </div>
        </div>
      </Section>

      {/* Course Steps */}
      {course.steps.map((step, index) => {
        const vhOffset = (index + 1) * 100;
        const isRight = index % 2 === 0;

        return (
          <Section
            key={step.stepId}
            style={{ top: `${vhOffset}vh` }}
            className={
              isRight
                ? "items-center text-left md:items-end md:text-right"
                : "items-center text-left md:items-start"
            }
          >
            <div
              className={`w-full max-w-md rounded-2xl border border-pale/80 bg-paper/90 p-6 shadow-xl backdrop-blur-lg transition-transform duration-300 md:max-w-xl md:p-8 ${
                isRight ? "md:ml-auto" : ""
              }`}
            >
              <div className="eyebrow mb-2 flex items-center gap-2 text-brand">
                <span>STAGE {step.stepId}</span>
                <span className="h-px w-6 bg-brand/40" />
                <span>{step.title}</span>
              </div>
              <h2 className="display mb-3 text-2xl text-deep sm:text-3xl md:text-4xl">
                {step.heading}
              </h2>
              <p className="mb-4 text-sm leading-relaxed text-deep/80 md:text-base">
                {step.desc}
              </p>

              <div className="inline-block rounded-lg border border-deep/20 bg-soft px-3 py-1.5 text-xs font-medium text-deep">
                {step.techFocus}
              </div>

              {step.project && (
                <div className="mt-5 rounded-xl border border-brand/30 bg-soft/70 p-4 text-left">
                  <div className="eyebrow mb-1 flex items-center gap-2 text-brand">
                    <span className="size-2 rounded-full bg-brand animate-pulse" />
                    Hands-On Project
                  </div>
                  <h4 className="text-base font-bold text-deep">{step.project.name}</h4>
                  <p className="mt-1 text-xs text-deep/70">{step.project.desc}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {step.project.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded bg-brand/10 px-2 py-0.5 text-[10px] font-semibold tracking-wide text-brand uppercase border border-brand/20"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Section>
        );
      })}

      {/* Final Section */}
      <Section
        style={{ top: `${(course.steps.length + 1) * 100}vh` }}
        className="items-center text-center"
      >
        <div className="max-w-3xl rounded-3xl border border-pale bg-paper/95 p-8 shadow-2xl backdrop-blur-xl md:p-12">
          <div className="eyebrow mb-3 text-brand">Destination Reached</div>
          <h2 className="display mb-4 text-4xl text-deep sm:text-5xl md:text-6xl">
            You are <span className="italic text-brand">Industry Ready.</span>
          </h2>
          <p className="mb-8 text-base text-deep/80 sm:text-lg">
            Mastered skills, deployed real projects, and prepped for technical rounds. Take your
            next step with The Prime Step today.
          </p>

          <div className="mb-8 grid grid-cols-2 gap-3 text-left md:grid-cols-4">
            {course.techStack.map((tech) => (
              <div key={tech.name} className="rounded-xl border border-pale bg-soft p-3.5">
                <h3 className="text-xs font-bold text-deep uppercase tracking-wider">
                  {tech.name}
                </h3>
                <p className="mt-1 text-xs text-deep/70">{tech.items}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/#admission"
              className="rounded-full bg-brand px-8 py-3.5 text-sm font-semibold text-white shadow-lg transition-colors hover:bg-deep"
            >
              Apply for Admissions
            </Link>
            <Link
              href="/"
              className="rounded-full border border-deep/30 px-6 py-3.5 text-sm font-semibold text-deep transition-colors hover:bg-soft"
            >
              ← Back to Homepage
            </Link>
          </div>
        </div>
      </Section>
    </Scroll>
  );
}
