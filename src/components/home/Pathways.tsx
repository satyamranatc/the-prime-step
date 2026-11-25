"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import Chapter from "@/components/ui/Chapter";
import { EASE_OUT, Reveal } from "@/components/ui/Motion";

const PATHWAYS = [
  {
    id: "college",
    label: "College Students",
    tag: "B.Tech · BCA · B.Sc · MCA",
    headline: "Build real projects before campus placements begin.",
    body: "Stop waiting for final-year panic. Learn C/C++, DSA, Java, Python, or MERN alongside your semester schedule with evening and weekend lab batches.",
    tracks: [
      { label: "C & C++ with DSA", href: "/c-and-cpp-programming-classes" },
      { label: "Python Programming", href: "/python-programming-classes" },
      { label: "Java Full Stack", href: "/java-full-stack-developer" },
    ],
  },
  {
    id: "freshers",
    label: "Final-Year & Freshers",
    tag: "Job-Ready Transition",
    headline: "Turn your degree into a portfolio companies actually hire from.",
    body: "Intensive, project-first tracks paired with GitHub code reviews, resume architecture, and mock technical + HR interviews to bridge the fresher gap.",
    tracks: [
      { label: "MERN Stack Developer", href: "/mern-stack-developer-course" },
      { label: "Data Analytics (SQL + Power BI)", href: "/data-analytics-course-in-indore" },
      { label: "AI & Machine Learning", href: "/artificial-intelligence-and-machine-learning-course" },
    ],
  },
  {
    id: "non-it",
    label: "Non-IT & Commerce",
    tag: "B.Com · BBA · BA · 12th Pass",
    headline: "Start from zero — explained in clear, jargon-free language.",
    body: "You do not need a computer science degree to build a strong career. Start with Data Analytics, Power BI, Digital Marketing, MS Office, Tally + GST, or Spoken English.",
    tracks: [
      { label: "Data Analytics", href: "/data-analytics-course-in-indore" },
      { label: "Tally Prime + GST", href: "/tally-gst-mastery-course" },
      { label: "MS Office & Advanced Excel", href: "/ms-office-and-excel-course-in-indore" },
      { label: "Spoken English & Interview Prep", href: "/english-courses" },
    ],
  },
  {
    id: "working",
    label: "Working Professionals",
    tag: "Upskilling & Role Switch",
    headline: "Upgrade your stack with flexible morning & evening batches.",
    body: "Move from support, operations, or manual reporting into Cloud/DevOps, Power BI analytics, Python automation, or modern Full Stack engineering.",
    tracks: [
      { label: "DevOps & AWS Cloud", href: "/devops-and-cloud-computing-course" },
      { label: "Power BI Mastery", href: "/power-bi-course-in-indore" },
      { label: "Corporate Training", href: "/corporate-training" },
    ],
  },
] as const;

export default function Pathways() {
  const [activeId, setActiveId] = useState<string>(PATHWAYS[0].id);
  const current = PATHWAYS.find((p) => p.id === activeId) ?? PATHWAYS[0];

  return (
    <section
      id="pathways"
      aria-labelledby="pathways-title"
      className="border-t border-hairline bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-2xl">
          <Chapter n="05" title="Learner Pathways" />
          <h2
            id="pathways-title"
            className="display mt-4 text-[clamp(2rem,4vw,3.25rem)] text-ink"
          >
            Not sure where to start? Pick your current stage.
          </h2>
        </Reveal>

        <div className="mt-10 grid gap-8 lg:grid-cols-[0.38fr_0.62fr] lg:items-start">
          {/* Left Segmented Selector */}
          <div
            role="tablist"
            aria-label="Learner backgrounds"
            className="flex flex-row gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {PATHWAYS.map((p) => {
              const isSelected = p.id === current.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setActiveId(p.id)}
                  className={`shrink-0 rounded-xl border px-4 py-3.5 text-left transition-all lg:w-full ${
                    isSelected
                      ? "border-brand bg-accent-soft text-ink"
                      : "border-hairline bg-paper text-ink-muted hover:border-ink/30 hover:text-ink"
                  }`}
                >
                  <span className="block text-sm font-bold">{p.label}</span>
                  <span className="mt-0.5 block font-mono text-[11px] text-ink-subtle">
                    {p.tag}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Right Animated Recommendation Panel */}
          <div className="rounded-2xl border border-hairline bg-canvas p-7 md:p-10">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: EASE_OUT }}
              >
                <span className="eyebrow text-brand">{current.tag}</span>
                <h3 className="display mt-3 text-2xl text-ink md:text-3xl">
                  {current.headline}
                </h3>
                <p className="prose-measure mt-4 text-sm leading-relaxed text-ink-muted md:text-base">
                  {current.body}
                </p>

                <div className="mt-8 border-t border-hairline pt-6">
                  <p className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                    Recommended Starting Tracks
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2.5">
                    {current.tracks.map((track) => (
                      <Link
                        key={track.href}
                        href={track.href}
                        className="press-scale inline-flex items-center gap-2 rounded-full border border-hairline bg-paper px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand sm:text-sm"
                      >
                        <span>{track.label}</span>
                        <span aria-hidden="true">→</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
