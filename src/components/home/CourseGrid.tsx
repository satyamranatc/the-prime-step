"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { COURSE_FILTERS, type CourseFilterId } from "@/lib/homepage";
import { SITE } from "@/lib/content";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import type { CatalogCourseItem } from "@/lib/seoPages";

export interface HomeCourse {
  title: string;
  category: CatalogCourseItem["category"];
  categoryLabel: string;
  duration: string;
  level: string;
  description: string;
  tags: string[];
  href: string;
  roadmapHref: string | null;
  whatsappHref: string;
}

function Arrow() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className="transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover/btn:translate-x-1"
    >
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}

function CourseCard({ course, index }: { course: HomeCourse; index: number }) {
  return (
    <article
      className="course-card-in spotlight-card group relative flex h-full flex-col rounded-2xl border border-pale/90 bg-paper p-6 transition-[transform,box-shadow,border-color] duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1.5 hover:border-brand/60 hover:shadow-[0_24px_48px_-22px_rgba(15,82,80,0.38)] sm:p-7"
      style={{ animationDelay: `${Math.min(index, 8) * 40}ms` }}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="eyebrow text-brand transition-transform duration-300 group-hover:translate-x-0.5">
          {course.categoryLabel}
        </span>
        <span className="shrink-0 rounded-full bg-soft px-3 py-1 font-mono text-[11px] font-semibold text-deep transition-colors duration-300 group-hover:bg-pale/45">
          {course.duration}
        </span>
      </div>

      <h3 className="mt-5 text-xl font-semibold leading-snug tracking-tight text-deep sm:text-[1.35rem]">
        <Link
          href={course.href}
          className="transition-colors duration-300 group-hover:text-brand hover:text-brand focus-visible:text-brand"
        >
          {course.title}
        </Link>
      </h3>

      <p className="mt-3 text-sm leading-relaxed text-deep/80">{course.description}</p>

      <ul className="mt-5 flex flex-wrap gap-1.5" aria-label="Key tools">
        {course.tags.map((t) => (
          <li
            key={t}
            className="rounded-full border border-deep/10 px-2.5 py-1 text-[11px] font-medium text-deep/80 transition-colors duration-300 group-hover:border-brand/30 group-hover:bg-soft/70"
          >
            {t}
          </li>
        ))}
      </ul>

      <p className="mt-5 flex-1 text-xs text-deep/75">
        <span className="font-semibold text-deep">Level:</span> {course.level}
      </p>

      <div className="mt-6 flex items-center justify-between gap-3 border-t border-pale/80 pt-5">
        <Link
          href={course.href}
          aria-label={`View syllabus: ${course.title}`}
          className="group/btn press-scale inline-flex items-center gap-2 rounded-full bg-deep px-4 py-2.5 text-xs font-semibold text-paper hover:bg-brand sm:text-[13px]"
        >
          View syllabus
          <Arrow />
        </Link>

        <div className="flex items-center gap-2">
          {course.roadmapHref && (
            <Link
              href={course.roadmapHref}
              aria-label={`Explore the ${course.title} roadmap in 3D`}
              className="group/rm press-scale inline-flex items-center gap-1 rounded-full border border-deep/15 px-3 py-2 text-[11px] font-semibold text-deep hover:border-brand hover:bg-soft hover:text-brand"
            >
              <span>3D roadmap</span>
              <span
                aria-hidden="true"
                className="inline-block transition-transform duration-300 group-hover/rm:translate-x-0.5 group-hover/rm:-translate-y-0.5"
              >
                ↗
              </span>
            </Link>
          )}
          <a
            href={course.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Ask about ${course.title} on WhatsApp`}
            className="press-scale grid size-9 place-items-center rounded-full border border-deep/15 text-brand hover:scale-105 hover:border-[#25D366] hover:bg-[#25D366] hover:text-white"
          >
            <WhatsAppIcon className="size-4 fill-current" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function CourseGrid({ courses }: { courses: HomeCourse[] }) {
  const [filter, setFilter] = useState<CourseFilterId>("all");

  const counts = useMemo(() => {
    const map = new Map<CourseFilterId, number>([["all", courses.length]]);
    courses.forEach((c) => map.set(c.category, (map.get(c.category) ?? 0) + 1));
    return map;
  }, [courses]);

  const visible = filter === "all" ? courses : courses.filter((c) => c.category === filter);

  return (
    <>
      {/* Filter chips: horizontally scrollable on phones, wrapped on desktop */}
      <div className="-mx-4 mt-10 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:px-0 md:mt-14 [&::-webkit-scrollbar]:hidden">
        <div role="group" aria-label="Filter courses by category" className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {COURSE_FILTERS.map((f) => {
            const active = f.id === filter;
            return (
              <button
                key={f.id}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f.id)}
                className={`press-scale inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2.5 text-[13px] font-semibold ${
                  active
                    ? "bg-deep text-paper shadow-[0_8px_20px_-8px_rgba(15,82,80,0.55)]"
                    : "border border-deep/15 bg-paper text-deep hover:-translate-y-0.5 hover:border-brand hover:text-brand"
                }`}
              >
                {f.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 font-mono text-[10px] ${
                    active ? "bg-paper/15 text-paper" : "bg-soft text-deep/75"
                  }`}
                >
                  {counts.get(f.id) ?? 0}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} courses
      </p>

      <div key={filter} className="mt-8 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {visible.map((c, i) => (
          <CourseCard key={c.href} course={c} index={i} />
        ))}
      </div>

      {/* Closing actions */}
      <div className="mt-12 flex flex-col items-stretch gap-3 rounded-2xl border border-pale/90 bg-soft/60 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="text-sm text-deep sm:text-base">
          <span className="font-semibold">Not sure which course fits you?</span>{" "}
          <span className="text-deep/80">Talk to a counsellor — it&apos;s free.</span>
        </p>
        <div className="flex flex-col gap-2 sm:flex-row">
          <a
            href={`${SITE.whatsappHref}?text=${encodeURIComponent(
              "Hi The Prime Step! Please help me choose the right course.",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep"
          >
            <WhatsAppIcon className="size-4 fill-current" />
            Free counselling on WhatsApp
          </a>
          <Link
            href="/courses"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-deep/20 bg-paper px-5 py-3 text-sm font-semibold text-deep transition-colors hover:border-brand hover:text-brand"
          >
            Full course catalogue
            <Arrow />
          </Link>
        </div>
      </div>
    </>
  );
}
