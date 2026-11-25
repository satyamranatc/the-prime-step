"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import type { CatalogCourseItem } from "@/lib/seoPages";
import {
  CATEGORY_LABEL,
  COURSE_FILTERS,
  type CourseFilterId,
} from "@/lib/homepage";

export default function CourseGrid({
  courses,
}: {
  courses: readonly CatalogCourseItem[];
}) {
  const [active, setActive] = useState<CourseFilterId>("all");
  const [query, setQuery] = useState("");

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
            className="w-full rounded-full border border-hairline bg-canvas px-4 py-2.5 text-sm text-ink placeholder:text-ink-subtle transition-colors focus:border-brand focus:bg-paper focus:outline-none"
          />
        </div>
      </div>

      {/* Course Grid */}
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
            className="mt-4 rounded-full border border-hairline bg-paper px-4 py-2 text-xs font-semibold text-ink hover:border-brand hover:text-brand"
          >
            Show all {courses.length} programs
          </button>
        </div>
      ) : (
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((course, idx) => (
            <article
              key={course.href}
              style={{ animationDelay: `${Math.min(idx * 25, 220)}ms` }}
              className="course-card-in spotlight-card group flex flex-col justify-between rounded-2xl border border-hairline bg-paper p-6 transition-all duration-200 hover:border-brand/50 hover:shadow-[0_12px_32px_-16px_rgba(11,18,21,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-ink-subtle">
                  <span className="font-semibold text-brand">
                    {CATEGORY_LABEL[course.category]}
                  </span>
                  <span>{course.duration}</span>
                </div>

                <h3 className="mt-3 text-lg font-bold tracking-[-0.02em] text-ink transition-colors group-hover:text-brand">
                  <Link href={course.href} className="focus:outline-none">
                    {course.title}
                  </Link>
                </h3>

                <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-ink-muted">
                  {course.description}
                </p>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {course.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-md border border-hairline bg-canvas px-2.5 py-0.5 font-mono text-[11px] text-ink-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-hairline/80 pt-4 text-xs font-semibold">
                <Link
                  href={course.href}
                  className="inline-flex items-center gap-1.5 text-ink transition-colors hover:text-brand"
                >
                  <span>View Syllabus</span>
                  <span
                    aria-hidden="true"
                    className="transition-transform duration-200 group-hover:translate-x-0.5"
                  >
                    →
                  </span>
                </Link>

                {course.roadmapId ? (
                  <Link
                    href={`/roadmap/${course.roadmapId}`}
                    className="font-mono text-[11px] text-ink-subtle transition-colors hover:text-brand"
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
          ))}
        </div>
      )}
    </div>
  );
}
