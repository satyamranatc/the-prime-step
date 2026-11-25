import Link from "next/link";
import { Reveal } from "@/components/ui/Motion";
import { GlowingEffect } from "@/components/ui/glowing-effect";

function GlowCardShell({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={`relative rounded-2xl border border-brand/20 p-1 ${className}`}>
      <GlowingEffect
        spread={44}
        glow
        disabled={false}
        proximity={72}
        inactiveZone={0.01}
        borderWidth={2}
      />
      <div className="relative h-full w-full overflow-hidden rounded-[13px]">
        {children}
      </div>
    </div>
  );
}

export default function PopularPrograms() {
  return (
    <section
      id="ecosystem"
      aria-labelledby="ecosystem-title"
      className="relative overflow-hidden border-t border-hairline bg-paper py-20 md:py-28"
    >
      {/* Soft ambient teal bloom behind the mosaic */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-1/2 left-1/2 h-[420px] w-[780px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at 35% 50%, rgba(20,184,166,0.14), transparent 60%), radial-gradient(ellipse at 70% 55%, rgba(14,110,107,0.1), transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1220px] px-4 sm:px-6 lg:px-10">
        <Reveal className="max-w-xl">
          <h2
            id="ecosystem-title"
            className="display text-[clamp(2.2rem,4.6vw,3.5rem)] font-bold text-ink"
          >
            Inside The Prime Step
            <br />
            Learning Ecosystem
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-ink-muted sm:text-base">
            Everything built around your course — from dedicated lab infrastructure and live code reviews to QR-verified certificates and 3D syllabus previews.
          </p>
        </Reveal>

        {/* Asymmetric Dark Obsidian Mosaic powered by official Aceternity GlowingEffect */}
        <div className="mt-10 grid gap-4 md:grid-cols-12">
          <GlowCardShell className="md:col-span-4">
            <Link
              href="/vijay-nagar"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  01 · Dedicated Infrastructure
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  Workstation-First Labs
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Dedicated computers across Vijay Nagar, Bhawarkua &amp; Annapurna — open 8 AM to 8 PM for daily practice.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Explore Campuses</span>
                <span aria-hidden="true">→</span>
              </span>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-3">
            <Link
              href="/about-us"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  02 · Mentorship
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  1-on-1 Code Reviews
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Senior faculty sit beside your screen to debug errors and review every project commit.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Our Teaching Method →</span>
              </span>
            </Link>
          </GlowCardShell>

          {/* Signature Circular Obsidian Disc */}
          <Link
            href="/about-us"
            className="group relative flex min-h-[200px] items-center justify-center md:col-span-2"
            aria-label="Established in 2019 in Indore — Learn about The Prime Step"
          >
            <div className="huly-dark-card relative flex size-44 flex-col items-center justify-center rounded-full text-center text-white transition-transform duration-300 group-hover:scale-[1.03]">
              <span className="display text-4xl font-bold tracking-tight text-white">
                2019
              </span>
              <span className="mt-1 text-[11px] font-medium uppercase tracking-widest text-[#5eead4]">
                Est. Indore
              </span>
              <span
                aria-hidden="true"
                className="absolute right-3 bottom-3 grid size-8 place-items-center rounded-full border border-white/25 bg-[#071618] text-sm font-bold text-white transition-colors group-hover:border-[#5eead4] group-hover:text-[#5eead4]"
              >
                →
              </span>
            </div>
          </Link>

          <GlowCardShell className="md:col-span-3">
            <Link
              href="/verify-certificate"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  03 · Credentials
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  QR-Verified Certificates
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Every graduate receives an official credential that recruiters can verify online in seconds.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Verify Portal →</span>
              </span>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-3">
            <Link
              href="/faq"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  04 · Flexibility
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  College-Friendly Batches
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Morning, afternoon, evening &amp; weekend schedules with simple monthly installment options.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Batch &amp; Fee FAQs →</span>
              </span>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-5">
            <Link
              href="/roadmap/java"
              className="huly-dark-card group relative flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-6 text-white"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-32 opacity-60 blur-2xl"
                style={{
                  background:
                    "radial-gradient(ellipse 65% 75% at 50% 100%, rgba(20,184,166,0.45), transparent 75%)",
                }}
              />
              <div className="relative z-10">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  05 · Interactive 3D Syllabus
                </span>
                <h3 className="display mt-2 text-2xl text-white group-hover:text-[#5eead4]">
                  Drive through any roadmap in 3D.
                </h3>
                <p className="mt-1.5 max-w-sm text-xs leading-relaxed text-white/70">
                  Preview week-by-week milestones, capstone projects, and tools across 14 interactive 3D course roadmaps before enrolling.
                </p>
              </div>
              <div className="relative z-10 mt-5 flex items-center justify-between border-t border-white/12 pt-3.5 text-xs font-semibold text-[#5eead4]">
                <span>Launch 3D Career Roadmap</span>
                <span aria-hidden="true">↗</span>
              </div>
            </Link>
          </GlowCardShell>

          <GlowCardShell className="md:col-span-4">
            <a
              href="#admission"
              className="huly-dark-card group flex h-full min-h-[215px] flex-col justify-between rounded-[13px] p-5 text-white"
            >
              <div>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  06 · Zero-Risk Start
                </span>
                <h3 className="display mt-2 text-xl text-white group-hover:text-[#5eead4]">
                  Attend 2 Real Lab Classes Free
                </h3>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70">
                  Sit inside an actual Indore batch, meet your faculty, and test our teaching style before making any commitment.
                </p>
              </div>
              <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 group-hover:text-[#5eead4]">
                <span>Book Free 2-Day Demo →</span>
              </span>
            </a>
          </GlowCardShell>
        </div>
      </div>
    </section>
  );
}
