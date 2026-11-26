"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "motion/react";
import { GooeyInput } from "@/components/ui/gooey-input";
import type { CatalogCourseItem } from "@/lib/seoPages";
import {
  CATEGORY_LABEL,
  COURSE_FILTERS,
  type CourseFilterId,
} from "@/lib/homepage";

/** Maps course slugs to real official tech logos in public/tech/ where available. */
function getCourseLogo(href: string): { src: string; alt: string } | null {
  if (href.includes("java")) return { src: "/tech/java.png", alt: "Java" };
  if (href.includes("mern") || href.includes("web-design"))
    return { src: "/tech/react.png", alt: "React" };
  if (href.includes("python")) return { src: "/tech/python.png", alt: "Python" };
  if (href.includes("artificial-intelligence"))
    return { src: "/tech/tensorflow.png", alt: "AI & ML" };
  if (href.includes("devops")) return { src: "/tech/aws.png", alt: "AWS & Cloud" };
  return null;
}

/** Crisp category-specific vector mark when a course has no PNG logo. */
function CategoryGlyph({
  category,
  href,
}: {
  category: CatalogCourseItem["category"];
  href: string;
}) {
  if (href.includes("excel") || href.includes("tally")) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="size-5 text-brand" aria-hidden="true">
        <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="1.75" />
        <path d="M3 10h18M9 10v10" stroke="currentColor" strokeWidth="1.75" />
      </svg>
    );
  }
  if (category === "Data & AI") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="size-5 text-brand" aria-hidden="true">
        <rect x="4" y="13" width="3.5" height="7" rx="1" fill="currentColor" opacity="0.45" />
        <rect x="10.25" y="9" width="3.5" height="11" rx="1" fill="currentColor" opacity="0.75" />
        <rect x="16.5" y="4" width="3.5" height="16" rx="1" fill="currentColor" />
      </svg>
    );
  }
  if (category === "Programming & Core") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className="size-5 text-brand" aria-hidden="true">
        <path
          d="M8.5 8L4 12l4.5 4M15.5 8L20 12l-4.5 4M13.5 5.5l-3 13"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5 text-brand" aria-hidden="true">
      <rect x="4" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="13" y="4" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <rect x="4" y="13" width="7" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.75" />
      <path d="M16.5 13.5v6M13.5 16.5h6" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

/**
 * Clean, structured visual header for each course card:
 * Real tech logo / crisp glyph + level pill + real skill chips over a soft teal-tinted surface.
 * Zero overlapping borders, zero generic grey skeleton bars, zero duplicate duration text.
 */
function CourseVisualHeader({ course }: { course: CatalogCourseItem }) {
  const logo = getCourseLogo(course.href);

  return (
    <div className="relative flex h-[124px] w-full flex-col justify-between overflow-hidden rounded-xl border border-hairline/70 bg-gradient-to-br from-[#f8fcfc] via-[#f4f9f9] to-[#edf6f5] p-3.5 transition-colors duration-200 group-hover:border-brand/30 group-hover:from-[#f3fbfa] group-hover:to-[#e5f4f3]">
      {/* Subtle top-right ambient sheen */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-8 -right-8 size-28 rounded-full bg-brand/[0.07] blur-2xl transition-opacity duration-300 group-hover:opacity-100"
      />

      {/* Row 1: Real Tech Icon Tile + Level Pill */}
      <div className="relative z-10 flex items-center justify-between gap-2">
        <div className="flex size-10 items-center justify-center rounded-xl border border-white bg-white shadow-[0_6px_16px_-6px_rgba(14,110,107,0.22),0_1px_2px_rgba(11,18,21,0.05)] transition-transform duration-200 group-hover:scale-105">
          {logo ? (
            <Image
              src={logo.src}
              alt={logo.alt}
              width={24}
              height={24}
              className="size-6 object-contain"
            />
          ) : (
            <CategoryGlyph category={course.category} href={course.href} />
          )}
        </div>

        <span className="rounded-full border border-hairline bg-white/90 px-2.5 py-1 text-[10.5px] font-medium text-ink-muted">
          {course.level}
        </span>
      </div>

      {/* Row 2: Real Skill Stack Chips */}
      <div className="relative z-10 flex flex-wrap items-center gap-1.5">
        {course.tags.slice(0, 3).map((tag) => (
          <span
            key={tag}
            className="rounded-md border border-hairline/80 bg-white/90 px-2 py-0.5 text-[11px] font-medium text-ink shadow-[0_1px_2px_rgba(11,18,21,0.03)]"
          >
            {tag}
          </span>
        ))}
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
      {/* Filter Pills + Live Search */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div
          role="tablist"
          aria-label="Filter courses by category"
          className="no-scrollbar flex flex-nowrap items-center gap-1.5 overflow-x-auto pb-1 sm:flex-wrap sm:overflow-visible sm:pb-0"
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
                className={`relative shrink-0 whitespace-nowrap rounded-full px-4 py-2 text-[13.5px] font-medium transition-colors ${
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

        <div className="flex w-full justify-start lg:w-auto lg:justify-end">
          <GooeyInput
            value={query}
            onValueChange={setQuery}
            placeholder="Search courses..."
            collapsedWidth={170}
            expandedWidth={250}
            expandedOffset={50}
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
                    exit={{ opacity: 0, transition: { duration: 0.18, delay: 0.08 } }}
                    className="pointer-events-none absolute inset-0 rounded-[20px] bg-accent-soft/85"
                  />
                )}
              </AnimatePresence>

              <article
                style={{ animationDelay: `${Math.min(idx * 25, 220)}ms` }}
                className="course-card-in group relative z-10 flex h-full flex-col justify-between rounded-2xl border border-[#dfe4ea] bg-paper p-5 shadow-[0_2px_8px_-4px_rgba(11,18,21,0.06)] transition-all duration-200 hover:-translate-y-0.5 hover:border-brand hover:shadow-[0_18px_38px_-16px_rgba(14,110,107,0.2)]"
              >
                <div>
                  <CourseVisualHeader course={course} />

                  {/* Clean Metadata + Title + Description */}
                  <div className="mt-4 px-0.5">
                    <div className="flex items-center justify-between gap-2 text-[11.5px]">
                      <span className="font-medium text-brand">
                        {CATEGORY_LABEL[course.category]}
                      </span>
                      <span className="font-mono text-ink-subtle">
                        {course.duration}
                      </span>
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

                {/* Action Footer */}
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-hairline/70 px-0.5 pt-4">
                  <Link
                    href={course.href}
                    className="press-scale inline-flex min-h-[38px] items-center gap-1.5 rounded-lg border border-brand/35 bg-paper px-3.5 py-1.5 text-[12.5px] font-semibold text-brand transition-colors duration-200 group-hover:border-brand group-hover:bg-brand group-hover:text-white"
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
                      className="text-[12px] font-medium text-ink-subtle transition-colors hover:text-brand"
                    >
                      3D Roadmap ↗
                    </Link>
                  ) : (
                    <span className="text-[11.5px] text-ink-subtle">
                      Indore Labs
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
