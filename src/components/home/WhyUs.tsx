"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import Chapter from "@/components/ui/Chapter";
import { EASE_OUT, Reveal } from "@/components/ui/Motion";

const LAB_STAGES = [
  {
    n: "01",
    title: "Code on lab workstations from day one",
    detail:
      "Every concept is demonstrated and immediately implemented on dedicated computers in our Indore labs — no passive slide-reading or theory-only lectures.",
    metric: "100% Hands-On Lab Sessions",
    photo: "/brand/tps-practical-lab.jpg",
    photoAlt: "Students writing code on lab workstations at The Prime Step Indore",
    caption: "Practical Computer Lab · Indore",
  },
  {
    n: "02",
    title: "One-on-one mentor debugging at your desk",
    detail:
      "When your build breaks or a query fails, trainers sit beside your screen to trace the root cause with you until you understand why it happened.",
    metric: "Direct Faculty Code Reviews",
    photo: "/brand/tps-mentor-classroom.jpg",
    photoAlt: "Senior mentor explaining architecture concepts in classroom at The Prime Step",
    caption: "Guided Mentor Session · Small Batch",
  },
  {
    n: "03",
    title: "Production-grade projects, not toy exercises",
    detail:
      "Every module concludes with a working deliverable — REST APIs, full-stack web apps, Power BI dashboards, or GST books — pushed to GitHub for recruiters to inspect.",
    metric: "Portfolio-Ready Capstones",
    photo: "/brand/tps-practical-lab.jpg",
    photoAlt: "Students building capstone software projects in The Prime Step lab",
    caption: "Capstone Architecture & GitHub",
  },
  {
    n: "04",
    title: "Accessible across 3 Indore campuses, 8 AM – 8 PM",
    detail:
      "Flexible morning, afternoon, and evening batches across Vijay Nagar, Bhawarkua, and Annapurna Road — designed for college students, freshers, and working learners.",
    metric: "Vijay Nagar · Bhawarkua · Annapurna",
    photo: "/brand/tps-indore-campus.jpg",
    photoAlt: "The Prime Step Indore campus and student learning space",
    caption: "The Prime Step · Indore Campus",
  },
] as const;

export default function WhyUs() {
  const [activeIdx, setActiveIdx] = useState(0);
  const current = LAB_STAGES[activeIdx];

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="border-t border-hairline bg-canvas py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Chapter n="02" title="The Lab Method" />
          <h2
            id="why-us-title"
            className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink"
          >
            Built like an engineering workspace, not a lecture hall.
          </h2>
          <p className="mt-3 text-base leading-relaxed text-ink-muted">
            How we turn beginners and college graduates into confident developers and analysts.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start lg:gap-14">
          {/* Left: Interactive 4-Stage Editorial List */}
          <div className="divide-y divide-hairline border-y border-hairline">
            {LAB_STAGES.map((stage, idx) => {
              const isActive = idx === activeIdx;
              return (
                <button
                  key={stage.n}
                  type="button"
                  onClick={() => setActiveIdx(idx)}
                  onMouseEnter={() => setActiveIdx(idx)}
                  className={`group flex w-full items-start gap-5 py-6 text-left transition-colors ${
                    isActive ? "bg-paper/70 px-4 -mx-4 rounded-xl" : "hover:opacity-95"
                  }`}
                >
                  <span
                    className={`mt-0.5 font-mono text-xs font-bold transition-colors ${
                      isActive ? "text-brand" : "text-ink-subtle"
                    }`}
                  >
                    {stage.n}
                  </span>

                  <div className="flex-1">
                    <div className="flex items-center justify-between gap-3">
                      <h3
                        className={`text-lg font-bold tracking-[-0.02em] transition-colors ${
                          isActive ? "text-ink" : "text-ink-muted group-hover:text-ink"
                        }`}
                      >
                        {stage.title}
                      </h3>
                      <span
                        aria-hidden="true"
                        className={`size-2 shrink-0 rounded-full transition-colors ${
                          isActive ? "bg-brand" : "bg-hairline"
                        }`}
                      />
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-ink-muted">
                      {stage.detail}
                    </p>
                    <p className="mt-3 font-mono text-[11px] font-semibold uppercase tracking-wider text-brand">
                      {stage.metric}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Synced Real Indore Campus Photography Frame */}
          <div className="lg:sticky lg:top-28">
            <div className="overflow-hidden rounded-2xl border border-hairline bg-paper p-3 shadow-[0_24px_60px_-28px_rgba(11,18,21,0.14)]">
              <div className="relative aspect-[16/11] w-full overflow-hidden rounded-xl bg-obsidian">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.n}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={current.photo}
                      alt={current.photoAlt}
                      fill
                      sizes="(min-width: 1024px) 52vw, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-3 flex items-center justify-between px-1.5 py-1">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-muted">
                  {current.caption}
                </span>
                <span className="font-mono text-[11px] text-brand">
                  {current.n} / 04
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
