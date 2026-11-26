"use client";

import Link from "next/link";
import type { RoadmapCourse } from "@/lib/roadmapCourses";

/**
 * Lightweight, zero-WebGL interactive 2D Highway Roadmap fallback.
 * Automatically shown when WebGL is unavailable, context is lost,
 * prefers-reduced-motion is active, or the user toggles "2D Lite Mode".
 */
export default function RoadmapLiteFallback({
  course,
  reason,
  canSwitchTo3D,
  onEnable3D,
}: {
  course: RoadmapCourse;
  reason?: string;
  canSwitchTo3D?: boolean;
  onEnable3D?: () => void;
}) {
  return (
    <div className="min-h-dvh w-full overflow-y-auto bg-gradient-to-b from-white via-[#F5FBFA] to-white px-4 pt-[calc(4.75rem+env(safe-area-inset-top))] pb-[max(3rem,calc(env(safe-area-inset-bottom)+2rem))] text-ink">
      <div className="mx-auto max-w-3xl">
        {/* Header Card */}
        <div className="rounded-3xl border border-brand/20 bg-white/95 p-6 shadow-[0_18px_45px_-22px_rgba(14,110,107,0.28)] sm:p-8">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent-soft px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              Interactive Syllabus Roadmap
            </span>
            {canSwitchTo3D && onEnable3D && (
              <button
                type="button"
                onClick={onEnable3D}
                className="rounded-full border border-brand/30 bg-white px-3.5 py-1.5 text-xs font-semibold text-brand transition-colors hover:bg-brand hover:text-white"
              >
                Launch 3D View ↗
              </button>
            )}
          </div>

          <h1 className="display mt-4 text-2xl font-bold text-ink sm:text-4xl">
            {course.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-ink-muted sm:text-base">
            {course.subtitle}
          </p>
          {reason && (
            <p className="mt-3 text-xs font-medium text-ink-subtle">{reason}</p>
          )}
        </div>

        {/* Vertical Highway Timeline */}
        <ol className="relative mt-8 space-y-5 pl-6 before:absolute before:top-3 before:bottom-3 before:left-[11px] before:w-[2px] before:bg-gradient-to-b before:from-brand before:via-light before:to-brand/30">
          {course.steps.map((step, idx) => (
            <li
              key={step.title}
              className="relative rounded-2xl border border-hairline bg-white p-5 shadow-[0_8px_24px_-16px_rgba(11,18,21,0.14)] transition-transform duration-200 hover:-translate-y-0.5"
            >
              <span
                aria-hidden="true"
                className="absolute top-6 -left-[25px] grid size-6 place-items-center rounded-full border-2 border-white bg-brand text-[10px] font-bold text-white shadow-sm"
              >
                {idx + 1}
              </span>

              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
                  Milestone {String(idx + 1).padStart(2, "0")} · {step.title}
                </span>
                <span className="rounded-full bg-canvas px-2.5 py-0.5 text-[11px] font-medium text-ink-muted">
                  {step.techFocus}
                </span>
              </div>

              <h2 className="mt-1.5 text-lg font-bold text-ink">{step.heading}</h2>
              <p className="mt-1.5 text-sm leading-relaxed text-ink-muted">
                {step.desc}
              </p>

              {step.project && (
                <div className="mt-3.5 rounded-xl border border-hairline bg-canvas p-3.5">
                  <p className="text-xs font-semibold text-brand">
                    Lab Project: {step.project.name}
                  </p>
                  <p className="mt-1 text-xs text-ink-muted">{step.project.desc}</p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {step.project.features.map((feat) => (
                      <span
                        key={feat}
                        className="rounded-md border border-hairline bg-white px-2 py-0.5 text-[11px] font-medium text-ink"
                      >
                        {feat}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </li>
          ))}
        </ol>

        {/* Finale Conversion Card */}
        <div className="mt-8 rounded-3xl border border-brand/25 bg-[#071618] p-6 text-center text-white sm:p-8">
          <p className="font-mono text-[11px] uppercase tracking-widest text-[#5eead4]">
            Placement Ready
          </p>
          <h2 className="display mt-2 text-2xl font-bold text-white">
            Experience this roadmap live in our Indore labs.
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-sm text-white/70">
            Attend a free 2-day hands-on demo class at Vijay Nagar, Bhawarkua, or Annapurna.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href={course.seoHref || "/courses"}
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-6 text-sm font-semibold text-ink hover:bg-[#edf7f6]"
            >
              View Full Syllabus →
            </Link>
            <a
              href={`https://wa.me/919479611441?text=${encodeURIComponent(`Hi The Prime Step! I just reviewed the ${course.title} roadmap and want to book a free demo class.`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-brand px-6 text-sm font-semibold text-white hover:bg-[#0a5654]"
            >
              Book Free Demo on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
