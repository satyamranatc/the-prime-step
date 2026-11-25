"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "motion/react";
import { EASE_OUT, Reveal } from "@/components/ui/Motion";
import { PointerHighlight } from "@/components/ui/pointer-highlight";
import { CardBody, CardContainer } from "@/components/ui/3d-card";

const LAB_PHOTOS = [
  {
    id: "lab",
    label: "Practical Lab",
    src: "/brand/tps-practical-lab.jpg",
    alt: "Students coding on dedicated lab workstations at The Prime Step Indore",
    caption: "Dedicated Workstations · Vijay Nagar & Bhawarkua",
  },
  {
    id: "mentor",
    label: "Mentor Classroom",
    src: "/brand/tps-mentor-classroom.jpg",
    alt: "Senior mentor explaining software architecture at The Prime Step Indore",
    caption: "1-on-1 Faculty Code Walkthroughs",
  },
  {
    id: "campus",
    label: "Indore Campus",
    src: "/brand/tps-indore-campus.jpg",
    alt: "The Prime Step Indore computer training campus",
    caption: "Open 8:00 AM – 8:00 PM · 3 Indore Locations",
  },
] as const;

export default function WhyUs() {
  const [photoId, setPhotoId] = useState<string>(LAB_PHOTOS[0].id);
  const currentPhoto =
    LAB_PHOTOS.find((p) => p.id === photoId) ?? LAB_PHOTOS[0];

  return (
    <section
      id="why-us"
      aria-labelledby="why-us-title"
      className="bg-[#f6f7f9] py-20 text-ink md:py-28"
    >
      <div className="mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-10">
        {/* PART A: Huly-inspired "Unmatched lab training" Asymmetric Dark Bento Grid */}
        <Reveal className="max-w-xl">
          <h2
            id="why-us-title"
            className="display text-[clamp(2.2rem,4.6vw,3.6rem)] font-extrabold text-ink"
          >
            Unmatched lab training
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            The Prime Step combines dedicated computer labs, one-on-one mentor debugging, and structured weekly sprints so every student builds real engineering proof.
          </p>
        </Reveal>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          {/* Card 1 (5 cols): Live Lab Workstations with warm amber/teal beam */}
          <Reveal className="huly-dark-card flex min-h-[300px] flex-col justify-between rounded-2xl p-6 text-white lg:col-span-5">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -top-12 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(255,154,77,0.45) 0%, rgba(34,166,159,0.22) 55%, transparent 75%)",
              }}
            />

            <div className="relative z-10 mx-auto my-auto w-full max-w-[290px] rounded-xl border border-white/12 bg-[#0c1117]/90 p-3.5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-2 font-mono text-[10px] text-white/50">
                <span>tps-lab-terminal</span>
                <span className="text-light">● LIVE</span>
              </div>
              <div className="mt-2.5 space-y-1.5 font-mono text-[11px]">
                <p className="text-white/85">
                  <span className="text-light">$</span> git commit -m &quot;auth-api&quot;
                </p>
                <p className="text-white/60">✓ 14 tests passing (0 errors)</p>
                <p className="rounded bg-white/[0.06] px-2 py-1 text-amber-300/95">
                  → Deploy Capstone to Production
                </p>
              </div>
            </div>

            <p className="relative z-10 mt-6 text-xs leading-relaxed text-white/65 sm:text-[13px]">
              <strong className="font-semibold text-white">Live Lab Workstations.</strong>{" "}
              Code every single concept in class on dedicated machines — zero passive slides.
            </p>
          </Reveal>

          {/* Card 2 (7 cols): Floating Crisp White Weekly Sprint Card */}
          <Reveal
            delay={0.06}
            className="huly-dark-card flex min-h-[300px] flex-col justify-between rounded-2xl p-6 text-white lg:col-span-7"
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute top-0 left-1/2 h-48 w-80 -translate-x-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,166,159,0.34) 0%, transparent 70%)",
              }}
            />

            <div className="relative z-10 mx-auto my-auto w-full max-w-[360px] rounded-xl border border-white/25 bg-white p-4 text-ink shadow-[0_24px_60px_-10px_rgba(0,0,0,0.65)]">
              <div className="flex items-center justify-between border-b border-hairline pb-2.5">
                <span className="text-xs font-bold text-ink">Weekly Lab Sprint</span>
                <span className="rounded-full bg-accent-soft px-2.5 py-0.5 font-mono text-[10px] font-semibold text-brand">
                  Week 06 · Active
                </span>
              </div>
              <div className="mt-3 space-y-2">
                <div className="rounded-lg border border-hairline bg-canvas p-2.5">
                  <span className="font-mono text-[10px] font-semibold text-brand">
                    HIGH PRIORITY
                  </span>
                  <p className="mt-0.5 text-xs font-semibold text-ink">
                    Build REST API with JWT Role Auth
                  </p>
                </div>
                <div className="rounded-lg border border-hairline bg-paper p-2.5">
                  <span className="font-mono text-[10px] font-semibold text-amber-600">
                    FACULTY REVIEW
                  </span>
                  <p className="mt-0.5 text-xs font-semibold text-ink">
                    1-on-1 Code Review &amp; GitHub PR Merge
                  </p>
                </div>
              </div>
            </div>

            <p className="relative z-10 mt-6 text-xs leading-relaxed text-white/65 sm:text-[13px]">
              <strong className="font-semibold text-white">Structured Weekly Sprints.</strong>{" "}
              Every module ends with a verified lab deliverable pushed to your portfolio.
            </p>
          </Reveal>

          {/* Card 3 (7 cols): Floating Crisp White 1-on-1 Mentor Debugging Card */}
          <Reveal
            delay={0.1}
            className="huly-dark-card flex min-h-[300px] flex-col justify-between rounded-2xl p-6 text-white lg:col-span-7"
          >
            <div className="relative z-10 mx-auto my-auto grid w-full max-w-[440px] items-center gap-3 sm:grid-cols-[1.15fr_0.85fr]">
              <div className="rounded-xl border border-white/25 bg-white p-4 text-ink shadow-[0_24px_60px_-10px_rgba(0,0,0,0.65)]">
                <p className="text-xs font-bold text-ink">1-on-1 Desk Debugging</p>
                <p className="mt-1 font-mono text-[10.5px] text-ink-subtle">
                  Mon – Sat · 8:00 AM – 8:00 PM
                </p>
                <p className="mt-2 text-[11px] leading-relaxed text-ink-muted">
                  Stuck on a Spring Boot exception, SQL join, or React state bug? Senior trainers debug beside your screen.
                </p>
                <span className="mt-3 inline-block rounded-md bg-ink px-2.5 py-1 font-mono text-[10px] font-semibold text-white">
                  Direct Lab Support
                </span>
              </div>

              <div className="hidden rounded-xl border border-white/10 bg-white/[0.04] p-3.5 text-white/75 sm:block">
                <span className="font-mono text-[10px] text-light">BATCH SIZE</span>
                <p className="mt-1 text-xs font-semibold text-white">
                  Focused Small Batches
                </p>
                <p className="mt-1 text-[11px] text-white/55">
                  Personal attention for both IT &amp; Non-IT learners.
                </p>
              </div>
            </div>

            <p className="relative z-10 mt-6 text-xs leading-relaxed text-white/65 sm:text-[13px]">
              <strong className="font-semibold text-white">1-on-1 Mentor Debugging.</strong>{" "}
              Never leave a class with an unresolved error — trainers explain the root cause beside you.
            </p>
          </Reveal>

          {/* Card 4 (5 cols): Signature Concentric Luminous Ring (Placement & Mock Alerts) */}
          <Reveal
            delay={0.14}
            className="huly-dark-card flex min-h-[300px] flex-col justify-between rounded-2xl p-6 text-white lg:col-span-5"
          >
            <div className="relative z-10 my-auto flex items-center justify-center py-4">
              <div
                className="relative grid size-36 place-items-center rounded-full"
                style={{
                  background:
                    "conic-gradient(from 140deg, rgba(34,166,159,0.75), rgba(255,158,82,0.78), rgba(14,110,107,0.45), rgba(34,166,159,0.75))",
                  boxShadow:
                    "0 0 48px 4px rgba(34,166,159,0.35), 0 0 36px 2px rgba(255,158,82,0.28)",
                }}
              >
                <div className="grid size-24 place-items-center rounded-full bg-[#090d12] ring-1 ring-white/15">
                  <div className="text-center">
                    <span className="block font-mono text-lg font-bold text-white">
                      4.9★
                    </span>
                    <span className="block font-mono text-[9px] uppercase tracking-wider text-light">
                      Indore Rated
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <p className="relative z-10 mt-4 text-xs leading-relaxed text-white/65 sm:text-[13px]">
              <strong className="font-semibold text-white">Placement Readiness.</strong>{" "}
              Mock technical &amp; HR interviews, LinkedIn optimization, and hiring alerts.
            </p>
          </Reveal>
        </div>

        {/* PART B: Huly-inspired "Learn together. Inside our Indore labs." Photo Frame with Floorplan Bloom */}
        <div className="relative mt-24 md:mt-32">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="display text-[clamp(2.2rem,4.8vw,3.8rem)] font-extrabold text-ink">
              Learn together.
              <br />
              Inside our{" "}
              <PointerHighlight
                containerClassName="inline-block"
                rectangleClassName="rounded-lg border-brand/55 bg-accent-soft/75"
                pointerClassName="text-brand"
              >
                <span className="relative z-10 px-1.5 text-brand">Indore labs.</span>
              </PointerHighlight>
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-ink-muted sm:text-base">
              Real classrooms, dedicated computer workstations, and face-to-face mentorship across Vijay Nagar, Bhawarkua, and Annapurna.
            </p>
          </Reveal>

          {/* Architectural Floorplan Backdrop + Framed Real Campus Photo */}
          <div className="relative mx-auto mt-10 max-w-4xl py-6 sm:py-10">
            <div
              aria-hidden="true"
              className="floorplan-grid pointer-events-none absolute -inset-x-8 inset-y-0 rounded-3xl [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_40%,transparent_100%)]"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-10 top-1/2 h-56 -translate-y-1/2 rounded-full blur-3xl"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,166,159,0.28) 0%, rgba(14,110,107,0.1) 50%, transparent 75%)",
              }}
            />

            <CardContainer containerClassName="py-0 w-full" className="w-full">
              <CardBody className="h-auto w-full">
                <div className="relative z-10 overflow-hidden rounded-2xl border border-white bg-paper p-2.5 shadow-[0_30px_80px_-24px_rgba(11,18,21,0.24)] sm:p-3">
              <div className="relative aspect-[16/9] w-full overflow-hidden rounded-xl bg-obsidian">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentPhoto.id}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.35, ease: EASE_OUT }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={currentPhoto.src}
                      alt={currentPhoto.alt}
                      fill
                      sizes="(min-width: 1024px) 896px, 100vw"
                      className="object-cover"
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Subtle Bottom Photo Control Bar */}
                <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/15 bg-[#06090b]/75 px-3.5 py-2 backdrop-blur-md">
                  <span className="font-mono text-[11px] font-medium text-white/90">
                    {currentPhoto.caption}
                  </span>
                  <div className="flex items-center gap-1">
                    {LAB_PHOTOS.map((p) => (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setPhotoId(p.id)}
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                          p.id === currentPhoto.id
                            ? "bg-white text-ink"
                            : "text-white/75 hover:bg-white/10 hover:text-white"
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              </div>
              </CardBody>
            </CardContainer>
          </div>

          {/* 3 Architectural Highlights Underneath */}
          <div className="mx-auto mt-6 grid max-w-3xl gap-6 text-left sm:grid-cols-3">
            <div>
              <span className="font-mono text-xs font-bold text-brand">01 · VIJAY NAGAR</span>
              <h3 className="mt-1.5 text-sm font-bold text-ink">Head Office &amp; Labs</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                Shagun Tower, AB Road — flagship software &amp; data engineering labs.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-brand">02 · BHAWARKUA</span>
              <h3 className="mt-1.5 text-sm font-bold text-ink">Student Hub Campus</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                Indrapuri Main Road — built for B.Tech, BCA &amp; MCA college schedules.
              </p>
            </div>
            <div>
              <span className="font-mono text-xs font-bold text-brand">03 · ANNAPURNA</span>
              <h3 className="mt-1.5 text-sm font-bold text-ink">West Indore Center</h3>
              <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                Annapurna Road — coding, analytics, office &amp; spoken English batches.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
