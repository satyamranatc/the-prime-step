"use client";

import { useState } from "react";
import Link from "next/link";
import { PLACEMENT_STEPS } from "@/lib/homepage";
import Chapter from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Motion";

const ROLE_SPECS = [
  {
    id: "fullstack",
    role: "Full Stack Engineer",
    stack: "Java / Spring Boot or MERN · SQL · REST APIs · Git",
    deliverables: [
      "Deployed production web app with auth & role permissions",
      "Clean GitHub commit history & architecture README",
      "DSA + system design mock technical rounds",
    ],
    href: "/mern-stack-developer-course",
  },
  {
    id: "data",
    role: "Data & BI Analyst",
    stack: "SQL · Power BI · Advanced Excel · Python EDA",
    deliverables: [
      "Interactive executive Power BI dashboards with DAX",
      "SQL business case queries & automated Excel MIS",
      "Case-study interview walkthroughs & portfolio",
    ],
    href: "/data-analytics-course-in-indore",
  },
  {
    id: "python",
    role: "Python & AI Developer",
    stack: "Python · Django / FastAPI · Pandas · ML & GenAI",
    deliverables: [
      "API backend + automated data pipeline projects",
      "Applied ML / NLP notebook & live demo app",
      "Code review & problem-solving interview drills",
    ],
    href: "/python-programming-classes",
  },
  {
    id: "business",
    role: "Accounts, Office & Marketing",
    stack: "Tally Prime + GST · Advanced Excel · SEO & Performance Ads",
    deliverables: [
      "Live GST returns, balance sheets & MIS sheets",
      "Real campaign audits, GA4 tracking & reporting",
      "Spoken English, GD & HR interview readiness",
    ],
    href: "/tally-gst-mastery-course",
  },
] as const;

export default function TrainingPlacement() {
  const [selectedRole, setSelectedRole] = useState<string>(ROLE_SPECS[0].id);
  const activeRole =
    ROLE_SPECS.find((r) => r.id === selectedRole) ?? ROLE_SPECS[0];

  return (
    <section
      id="placement"
      aria-labelledby="placement-title"
      className="relative overflow-hidden bg-obsidian py-20 text-white md:py-28"
    >
      <div
        aria-hidden="true"
        className="arch-grid-dark pointer-events-none absolute inset-0 opacity-60"
      />

      <div className="relative z-10 mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <Reveal className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
          <div>
            <Chapter n="04" title="Career & Placement Cell" dark />
            <h2
              id="placement-title"
              className="display mt-4 max-w-2xl text-[clamp(2rem,4vw,3.35rem)] text-white"
            >
              Training ends only when you are ready to sit the interview.
            </h2>
          </div>

          <p className="max-w-lg text-sm leading-relaxed text-white/75 md:text-base">
            We don&apos;t hand out fake job guarantees. Instead, we build the exact proof recruiters evaluate: working code on GitHub, sharp technical fundamentals, and realistic mock interviews.
          </p>
        </Reveal>

        {/* 4-Stage Architectural Hairline Pipeline */}
        <div className="mt-12 grid divide-y divide-white/12 border-y border-white/12 md:grid-cols-4 md:divide-x md:divide-y-0">
          {PLACEMENT_STEPS.map((step) => (
            <div
              key={step.n}
              className="py-7 md:px-6 md:py-8 md:first:pl-0 md:last:pr-0"
            >
              <span className="font-mono text-xs font-semibold text-light">
                {step.n}
              </span>
              <h3 className="mt-3 text-lg font-bold tracking-[-0.015em] text-white">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                {step.text}
              </p>
            </div>
          ))}
        </div>

        {/* Interactive Target Role Spec Viewer */}
        <div className="mt-12 rounded-2xl border border-white/12 bg-white/[0.03] p-6 md:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-white/12 pb-5 md:flex-row md:items-center">
            <span className="eyebrow text-light">
              Interview Readiness Blueprint
            </span>
            <div className="flex flex-wrap gap-2">
              {ROLE_SPECS.map((spec) => (
                <button
                  key={spec.id}
                  type="button"
                  onClick={() => setSelectedRole(spec.id)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                    spec.id === activeRole.id
                      ? "bg-white text-ink"
                      : "border border-white/15 text-white/75 hover:border-white/40 hover:text-white"
                  }`}
                >
                  {spec.role}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1.2fr] md:items-center">
            <div>
              <h3 className="display text-2xl text-white">{activeRole.role}</h3>
              <p className="mt-2 font-mono text-xs text-light">
                {activeRole.stack}
              </p>
              <Link
                href={activeRole.href}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-brand px-5 py-2.5 text-xs font-semibold text-white transition-colors hover:bg-light hover:text-ink"
              >
                <span>View Recommended Track</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>

            <ul className="space-y-3">
              {activeRole.deliverables.map((d) => (
                <li
                  key={d}
                  className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white/85"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 size-1.5 shrink-0 rounded-full bg-light"
                  />
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
