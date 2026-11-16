"use client";

import { useState } from "react";
import { ROLES, SITE } from "@/lib/content";
import { HIRING_PARTNERS, PLACEMENT_STEPS } from "@/lib/homepage";
import CTA from "@/components/ui/CTA";
import SectionHeading from "./SectionHeading";

/** Training & Placement — career role explorer + 4-stage placement support. */
export default function TrainingPlacement() {
  const [activeRoleIndex, setActiveRoleIndex] = useState(0);
  const activeRole = ROLES[activeRoleIndex] ?? ROLES[0];

  return (
    <section
      id="careers"
      aria-labelledby="careers-title"
      className="relative scroll-mt-20 border-t border-pale/60 bg-paper py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-12">
        <SectionHeading
          id="careers-title"
          eyebrow="Training & placement support"
          title={
            <>
              From classroom practice <span className="text-brand">to interview readiness.</span>
            </>
          }
          lead="Every program includes dedicated career preparation: building a real project portfolio, resume & LinkedIn refinement, mock interview rounds, and placement assistance."
        />

        {/* 4-Stage Placement Process */}
        <ol className="mt-10 grid gap-4 sm:grid-cols-2 md:mt-14 lg:grid-cols-4 lg:gap-6">
          {PLACEMENT_STEPS.map((s) => (
            <li
              key={s.n}
              data-fade
              className="spotlight-card group flex flex-col justify-between rounded-2xl border border-pale/90 bg-soft/60 p-6 transition-all duration-500 [transition-timing-function:var(--ease-out)] hover:-translate-y-1 hover:border-brand/50 hover:bg-paper hover:shadow-[0_20px_40px_-20px_rgba(15,82,80,0.3)] sm:p-7"
            >
              <div>
                <span className="font-mono text-xs font-semibold text-brand">Step {s.n}</span>
                <h3 className="display mt-3 text-xl text-deep transition-colors duration-300 group-hover:text-brand sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-deep/80">{s.text}</p>
              </div>
              <div
                className="mt-6 h-1 w-10 rounded-full bg-brand/30 transition-all duration-500 [transition-timing-function:var(--ease-out)] group-hover:w-20 group-hover:bg-brand"
                aria-hidden="true"
              />
            </li>
          ))}
        </ol>

        {/* Interactive Career Role Explorer */}
        <div className="mt-14 rounded-3xl border border-pale/90 bg-soft/50 p-6 sm:p-8 md:mt-20 md:p-12" data-fade>
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="eyebrow text-brand">Roles our courses prepare you for</p>
              <h3 className="display mt-2 text-2xl text-deep sm:text-3xl">
                What will you actually do on the job?
              </h3>
            </div>
            <div role="tablist" aria-label="Career roles" className="flex flex-wrap gap-2">
              {ROLES.map((r, i) => {
                const selected = i === activeRoleIndex;
                return (
                  <button
                    key={r.role}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveRoleIndex(i)}
                    className={`rounded-full px-4 py-2 text-xs font-semibold transition-all duration-300 sm:text-[13px] ${
                      selected
                        ? "bg-deep text-paper shadow-xs"
                        : "border border-deep/15 bg-paper text-deep hover:border-brand"
                    }`}
                  >
                    {r.role}
                  </button>
                );
              })}
            </div>
          </div>

          <div
            key={activeRole.role}
            className="course-card-in spotlight-card mt-8 grid items-center gap-6 rounded-2xl border border-pale/80 bg-paper p-6 sm:p-8 md:grid-cols-[1.5fr_1fr]"
          >
            <div>
              <span className="eyebrow text-brand">{activeRole.from}</span>
              <h4 className="display mt-2 text-2xl text-deep sm:text-4xl">{activeRole.role}</h4>
              <p className="mt-3 text-base font-medium text-deep/90 sm:text-lg">{activeRole.what}</p>
              <p className="mt-4 border-t border-pale/70 pt-4 text-sm leading-relaxed text-deep/80">
                <strong className="text-deep">In a normal workday:</strong> {activeRole.day}
              </p>
            </div>

            <div className="flex flex-col justify-between gap-4 rounded-xl bg-soft/70 p-5 sm:p-6">
              <div>
                <p className="eyebrow text-deep/70">Recommended training</p>
                <p className="mt-1.5 text-sm font-semibold text-deep sm:text-base">{activeRole.from}</p>
              </div>
              <div className="flex flex-wrap gap-2.5">
                <CTA href="#programs" label="See matching courses" className="w-full sm:w-auto justify-center" />
                <CTA
                  href={`${SITE.whatsappHref}?text=${encodeURIComponent(
                    `Hi The Prime Step! I want to prepare for a ${activeRole.role} role. Please guide me.`,
                  )}`}
                  label="Ask a counsellor"
                  variant="ghost"
                  className="w-full sm:w-auto justify-center"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Optional verified hiring partners row — hidden when empty */}
        {HIRING_PARTNERS.length > 0 && (
          <div className="mt-12">
            <p className="eyebrow text-center text-deep/70">Companies where our alumni work</p>
            <div className="mt-4 flex flex-wrap items-center justify-center gap-6">
              {HIRING_PARTNERS.map((p) => (
                <span
                  key={p.name}
                  className="rounded-full border border-pale bg-soft px-4 py-2 text-xs font-semibold text-deep"
                >
                  {p.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
