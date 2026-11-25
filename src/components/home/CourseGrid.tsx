"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import type { CatalogCourseItem } from "@/lib/seoPages";
import {
  CATEGORY_LABEL,
  COURSE_FILTERS,
  type CourseFilterId,
} from "@/lib/homepage";

/**
 * Airy, bespoke mini-UI wireframe preview tailored to each course category.
 * Inspired by clean SaaS workspace cards: translucent stacked tiles, subtle
 * category glow, and one focal element that illuminates on card hover.
 */
function CourseWireframePreview({
  category,
  tags,
  duration,
}: {
  category: CatalogCourseItem["category"];
  tags: readonly string[];
  duration: string;
}) {
  const glowStyle =
    category === "Full Stack & Web"
      ? "radial-gradient(ellipse 70% 65% at 50% 25%, rgba(14,110,107,0.12), transparent 72%)"
      : category === "Data & AI"
        ? "radial-gradient(ellipse 70% 65% at 50% 25%, rgba(34,166,159,0.14), transparent 72%)"
        : category === "Programming & Core"
          ? "radial-gradient(ellipse 70% 65% at 50% 25%, rgba(99,102,241,0.1), transparent 72%)"
          : "radial-gradient(ellipse 70% 65% at 50% 25%, rgba(245,158,11,0.12), transparent 72%)";

  if (category === "Data & AI") {
    return (
      <div
        className="relative flex h-[138px] w-full flex-col justify-center gap-2 overflow-hidden rounded-xl px-4 py-3"
        style={{ background: glowStyle }}
      >
        <div className="ml-auto flex w-[82%] items-center justify-between rounded-lg border border-hairline/70 bg-white/75 px-3 py-1.5 backdrop-blur-xs">
          <div className="h-2 w-24 rounded-full bg-slate-200/80" />
          <span className="size-3.5 rounded bg-brand/15 transition-colors group-hover:bg-brand/30" />
        </div>
        <div className="mr-auto flex w-[88%] items-center gap-2 rounded-lg border border-hairline bg-white px-3 py-2 shadow-[0_6px_20px_-10px_rgba(11,18,21,0.12)] transition-colors group-hover:border-brand/45">
          <span className="grid size-5 shrink-0 place-items-center rounded-md bg-brand/12 font-mono text-[10px] font-bold text-brand">
            ✦
          </span>
          <span className="truncate font-mono text-[10.5px] font-medium text-ink">
            {tags.slice(0, 2).join(" · ")}
          </span>
        </div>
        <div className="ml-auto flex w-[76%] items-center justify-between rounded-lg border border-hairline/70 bg-white/75 px-3 py-1.5 backdrop-blur-xs">
          <div className="h-2 w-20 rounded-full bg-slate-200/80" />
          <span className="font-mono text-[9.5px] text-ink-subtle">{duration}</span>
        </div>
      </div>
    );
  }

  if (category === "Mobile & Business") {
    return (
      <div
        className="relative flex h-[138px] w-full items-center justify-center overflow-hidden rounded-xl px-4 py-3"
        style={{ background: glowStyle }}
      >
        <div className="relative flex w-full max-w-[240px] flex-col items-center">
          <div className="grid w-full grid-cols-2 gap-2 opacity-80">
            <div className="rounded-lg border border-hairline/70 bg-white/80 p-2.5">
              <div className="h-1.5 w-10 rounded-full bg-slate-200" />
              <div className="mt-1.5 h-5 rounded bg-slate-100" />
            </div>
            <div className="rounded-lg border border-hairline/70 bg-white/80 p-2.5">
              <div className="h-1.5 w-12 rounded-full bg-slate-200" />
              <div className="mt-1.5 h-5 rounded bg-slate-100" />
            </div>
          </div>
          <div className="-mt-6 w-[74%] rounded-lg border border-hairline bg-white p-2.5 shadow-[0_10px_24px_-12px_rgba(11,18,21,0.16)] transition-colors group-hover:border-brand/45">
            <div className="flex items-center justify-between">
              <span className="truncate font-mono text-[10px] font-semibold text-brand">
                {tags[0] ?? "Workspace"}
              </span>
              <span className="font-mono text-[9.5px] text-ink-subtle">{duration}</span>
            </div>
            <div className="mt-2 grid grid-cols-2 gap-1.5">
              <div className="h-5 rounded bg-accent-soft transition-colors group-hover:bg-brand/15" />
              <div className="h-5 rounded bg-slate-100" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (category === "Programming & Core") {
    return (
      <div
        className="relative flex h-[138px] w-full flex-col justify-center gap-2 overflow-hidden rounded-xl px-4 py-3"
        style={{ background: glowStyle }}
      >
        <div className="flex items-center justify-between rounded-lg border border-hairline/70 bg-white/75 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded bg-slate-200" />
            <div className="h-2 w-24 rounded-full bg-slate-200/80" />
          </div>
          <span className="font-mono text-[10px] text-slate-300">+</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-hairline bg-white px-3 py-2 shadow-[0_6px_20px_-10px_rgba(11,18,21,0.12)] transition-colors group-hover:border-brand/45">
          <div className="flex items-center gap-2 truncate">
            <span className="size-3.5 shrink-0 rounded bg-brand/15 transition-colors group-hover:bg-brand" />
            <span className="truncate font-mono text-[10.5px] font-semibold text-ink">
              {tags.slice(0, 2).join(" · ")}
            </span>
          </div>
          <span className="ml-2 font-mono text-xs font-semibold text-brand">+</span>
        </div>
        <div className="flex items-center justify-between rounded-lg border border-hairline/70 bg-white/75 px-3 py-1.5">
          <div className="flex items-center gap-2">
            <span className="size-3 rounded bg-slate-200" />
            <div className="h-2 w-20 rounded-full bg-slate-200/80" />
          </div>
          <span className="font-mono text-[9.5px] text-ink-subtle">{duration}</span>
        </div>
      </div>
    );
  }

  // Full Stack & Web
  return (
    <div
      className="relative flex h-[138px] w-full flex-col justify-center gap-2 overflow-hidden rounded-xl px-4 py-3"
      style={{ background: glowStyle }}
    >
      <div className="flex items-center justify-between rounded-lg border border-hairline/70 bg-white/75 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <div className="h-2 w-24 rounded-full bg-slate-200/85" />
        </div>
        <span className="font-mono text-[9.5px] text-ink-subtle">{duration}</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-hairline bg-white px-3 py-2 shadow-[0_6px_20px_-10px_rgba(11,18,21,0.12)] transition-colors group-hover:border-brand/45">
        <div className="flex items-center gap-2 truncate">
          <span className="size-2.5 shrink-0 rounded-full bg-brand" />
          <span className="truncate font-mono text-[10.5px] font-semibold text-ink">
            {tags.slice(0, 3).join(" · ")}
          </span>
        </div>
        <span className="ml-2 font-mono text-xs text-brand">→</span>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-hairline/70 bg-white/75 px-3 py-1.5">
        <div className="flex items-center gap-2">
          <span className="size-2.5 rounded-full bg-slate-200" />
          <div className="h-2 w-20 rounded-full bg-slate-200/85" />
        </div>
        <div className="h-2 w-8 rounded-full bg-slate-200/70" />
      </div>
    </div>
  );
}

export default function CourseGrid({
  courses,
}: {
  courses: readonly CatalogCourseItem[];
}) {
  const [active, setActive] = useState<CourseFilterId>("all");
  const [query, setQuery] = useState("");
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return courses.filter((c) => {
      const matchesCat = active === "all" || c.category === active;
      if (!matchesCat) return false;
      if (!q) return true;
      return (
        c.title.toLowerCase().includes(q) ||
        c.description.toLowerCase().includes(q) ||
        c.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [courses, active, query]);

  return (
    <div className="mt-8">
      {/* Filter Pills (with Framer Motion layoutId) + Live Search */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Filter courses by category"
          className="flex flex-wrap items-center gap-1.5"
        >
          {COURSE_FILTERS.map((f) => {
            const isSelected = active === f.id;
            return (
              <button
                key={f.id}
                type="button"
                role="tab"
                aria-selected={isSelected}
                onClick={() => setActive(f.id)}
                className={`relative rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
                  isSelected ? "text-white" : "text-ink-muted hover:text-ink"
                }`}
              >
                {isSelected && (
                  <motion.span
                    layoutId="activeCourseTab"
                    transition={{ type: "spring", stiffness: 420, damping: 34 }}
                    className="absolute inset-0 rounded-full bg-ink"
                  />
                )}
                <span className="relative z-10">{f.label}</span>
              </button>
            );
          })}
        </div>

        <div className="relative w-full lg:w-72">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search Python, React, Excel..."
            aria-label="Search courses"
            className="w-full rounded-xl border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle transition-colors focus:border-brand focus:bg-paper focus:outline-none"
          />
        </div>
      </div>

      {/* Course Cards Grid */}
      {filtered.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-hairline bg-canvas p-10 text-center">
          <p className="text-base font-semibold text-ink">
            No programs match &ldquo;{query}&rdquo;
          </p>
          <p className="mt-1 text-sm text-ink-muted">
            Try another keyword or clear your search filter.
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setActive("all");
            }}
            className="mt-4 rounded-lg border border-hairline bg-paper px-4 py-2 text-xs font-semibold text-ink hover:border-brand hover:text-brand"
          >
            Show all {courses.length} programs
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, idx) => (
            <div
              key={course.href}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className="relative p-1.5"
            >
              <AnimatePresence>
                {hoveredIdx === idx && (
                  <motion.span
                    layoutId="courseHoverBg"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: { duration: 0.16 } }}
                    exit={{ opacity: 0, transition: { duration: 0.18, delay: 0.1 } }}
                    className="pointer-events-none absolute inset-0 rounded-[20px] bg-accent-soft/90"
                  />
                )}
              </AnimatePresence>

              <article
                style={{ animationDelay: `${Math.min(idx * 25, 220)}ms` }}
                className="course-card-in group relative z-10 flex h-full flex-col justify-between rounded-2xl border border-hairline bg-paper p-5 transition-all duration-200 hover:border-brand hover:shadow-[0_14px_34px_-16px_rgba(14,110,107,0.18)]"
              >
              <div>
                {/* Top Wireframe Micro-Illustration */}
                <CourseWireframePreview
                  category={course.category}
                  tags={course.tags}
                  duration={course.duration}
                />

                {/* Clean Editorial Text Block */}
                <div className="mt-4 px-0.5">
                  <div className="flex items-center justify-between gap-2 font-mono text-[10.5px] text-ink-subtle">
                    <span>{CATEGORY_LABEL[course.category]}</span>
                    <span>{course.duration}</span>
                  </div>

                  <h3 className="mt-1.5 text-[16.5px] font-semibold leading-snug tracking-[-0.015em] text-ink">
                    <Link
                      href={course.href}
                      className="transition-colors hover:text-brand focus:outline-none"
                    >
                      {course.title}
                    </Link>
                  </h3>

                  <p className="mt-1.5 line-clamp-2 text-[13.5px] leading-relaxed text-ink-muted">
                    {course.description}
                  </p>
                </div>
              </div>

              {/* Crisp Compact Action Row (Outlined at rest -> Filled Brand on card hover) */}
              <div className="mt-5 flex items-center justify-between gap-3 px-0.5 pt-1">
                <Link
                  href={course.href}
                  className="press-scale inline-flex items-center gap-1.5 rounded-lg border border-brand/35 bg-paper px-3.5 py-2 text-[12.5px] font-semibold text-brand transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
                >
                  <span>View Syllabus</span>
                  <span aria-hidden="true">→</span>
                </Link>

                {course.roadmapId ? (
                  <Link
                    href={`/roadmap/${course.roadmapId}`}
                    className="font-mono text-[11px] font-medium text-ink-subtle transition-colors hover:text-brand"
                  >
                    3D Roadmap ↗
                  </Link>
                ) : (
                  <span className="font-mono text-[11px] text-ink-subtle">
                    {course.level}
                  </span>
                )}
              </div>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
