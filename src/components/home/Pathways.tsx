"use client";

import { useState } from "react";
import { PERSONAS, SITE, type PersonaId } from "@/lib/content";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";
import SectionHeading from "./SectionHeading";

/** "Where are you starting from?" — persona tabs with a recommended path for each. */
export default function Pathways() {
  const [personaId, setPersonaId] = useState<PersonaId>("student");
  const [showHindi, setShowHindi] = useState(false);
  const active = PERSONAS.find((p) => p.id === personaId) ?? PERSONAS[0];

  return (
    <section
      id="pathways"
      aria-labelledby="pathways-title"
      className="relative border-t border-pale/60 bg-soft/60 py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="pathways-title"
            eyebrow="Find your path"
            title={
              <>
                Where are you <span className="text-brand">starting from?</span>
              </>
            }
            lead="Choose what describes you best. We'll show the courses most students in your situation begin with."
          />

          <div
            role="group"
            aria-label="Language"
            className="inline-flex w-max items-center rounded-full border border-deep/20 bg-paper p-1 text-xs font-semibold"
          >
            {[
              { v: false, l: "EN" },
              { v: true, l: "EN + हिं" },
            ].map((o) => (
              <button
                key={o.l}
                type="button"
                onClick={() => setShowHindi(o.v)}
                aria-pressed={showHindi === o.v}
                className={`rounded-full px-3.5 py-1.5 transition-colors ${
                  showHindi === o.v ? "bg-deep text-paper" : "text-deep hover:bg-soft"
                }`}
              >
                {o.l}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:mt-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2fr)] lg:gap-6">
          {/* Persona list */}
          <div role="tablist" aria-label="Your background" className="grid grid-cols-2 gap-2 lg:grid-cols-1">
            {PERSONAS.map((p) => {
              const selected = p.id === personaId;
              return (
                <button
                  key={p.id}
                  id={`persona-tab-${p.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="persona-panel"
                  onClick={() => setPersonaId(p.id)}
                  className={`press-scale rounded-2xl border p-4 text-left sm:p-5 ${
                    selected
                      ? "border-deep bg-deep text-paper shadow-[0_16px_32px_-20px_rgba(15,82,80,0.6)]"
                      : "border-pale/90 bg-paper text-deep hover:-translate-y-0.5 hover:border-brand/60"
                  }`}
                >
                  <span className="block text-sm font-semibold leading-snug sm:text-base">{p.label}</span>
                  <span className={`mt-1 block text-xs leading-snug ${selected ? "text-pale" : "text-deep/70"}`}>
                    {p.hindi}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Recommended path */}
          <div
            key={active.id}
            id="persona-panel"
            role="tabpanel"
            aria-labelledby={`persona-tab-${active.id}`}
            className="course-card-in spotlight-card rounded-3xl border border-pale/90 bg-paper p-6 sm:p-8 md:p-10"
          >
            <p className="eyebrow text-brand">{showHindi ? active.hindi : `For: ${active.label}`}</p>
            <h3 className="display mt-3 text-2xl leading-tight text-deep sm:text-3xl md:text-4xl">
              {active.headline}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-deep/80 sm:text-base">{active.sub}</p>

            <p className="eyebrow mt-8 text-deep/75">Good courses to start with</p>
            <ol className="mt-4 grid gap-2 sm:grid-cols-2">
              {active.recommended.map((item, i) => (
                <li
                  key={item}
                  className="group/step flex items-center gap-3 rounded-xl border border-pale/80 bg-soft/60 px-4 py-3 text-sm font-semibold text-deep transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/40 hover:bg-paper"
                >
                  <span className="grid size-6 shrink-0 place-items-center rounded-full bg-paper font-mono text-[11px] text-brand transition-colors duration-300 group-hover/step:bg-brand group-hover/step:text-paper">
                    {i + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ol>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={`${SITE.whatsappHref}?text=${encodeURIComponent(
                  `Hi The Prime Step! I am a ${active.label} and would like to talk to a career counsellor.`,
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-deep"
              >
                <WhatsAppIcon className="size-4 fill-current" />
                {active.cta}
              </a>
              <a
                href={SITE.phoneHref}
                className="inline-flex items-center justify-center rounded-full border border-deep/20 px-5 py-3 text-sm font-semibold text-deep transition-colors hover:border-brand hover:text-brand"
              >
                Call {SITE.phoneDisplay}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
