"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { BRANCHES, mapsLink } from "@/lib/content";
import Split from "@/components/ui/Split";
import Chapter from "@/components/ui/Chapter";

const STATEMENT =
  "A classroom isn't a place you sit. It's a place you build — with mentors beside you, and a real problem in front of you.";

const PLATES = [
  {
    t: "Practical-based learning",
    d: "Concepts are taught by applying them — exercises, projects and hands-on practice in every program.",
  },
  {
    t: "Mentors who stay for the doubt",
    d: "Students most often highlight faculty who clear doubts one-to-one and help debug their logic.",
  },
  {
    t: "Close to where you live",
    d: "Three branches across Indore: Vijay Nagar, Bhawarkua and Annapurna Road.",
  },
];

function PlateArt({ i }: { i: number }) {
  const s = { vectorEffect: "non-scaling-stroke" as const, strokeWidth: 1.2 };
  return (
    <svg viewBox="0 0 300 380" className="absolute inset-0 h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {i === 0 &&
        [0, 1, 2, 3, 4, 5].map((k) => (
          <rect key={k} x={40 + k * 18} y={60 + k * 18} width={220 - k * 36} height={260 - k * 36} className={k === 5 ? "fill-brand stroke-deep" : "fill-none stroke-light"} {...s} />
        ))}
      {i === 1 &&
        Array.from({ length: 14 }).map((_, k) => (
          <line key={k} x1={-20 + k * 28} y1="380" x2={120 + k * 28} y2="0" className="stroke-light" {...s} />
        ))}
      {i === 2 && (
        <>
          {[150, 110, 70].map((r, k) => (
            <path key={r} d={`M${150 - r} 340V${190}a${r} ${r} 0 0 1 ${r * 2} 0v150z`} className={k === 2 ? "fill-brand stroke-deep" : "fill-none stroke-light"} {...s} />
          ))}
        </>
      )}
    </svg>
  );
}

/** Chapter 03 — editorial layout of the learning environment. */
export default function Learning() {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>("[data-plate]").forEach((p, i) => {
        gsap.fromTo(
          p,
          { clipPath: "inset(100% 0% 0% 0%)" },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            duration: 1.5,
            ease: "expo.out",
            scrollTrigger: { trigger: p, start: "top 85%", once: true },
          },
        );
        gsap.fromTo(
          p.querySelector("[data-inner]"),
          { yPercent: -8 },
          { yPercent: 8, ease: "none", scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true } },
        );
        gsap.to(p.parentElement, {
          yPercent: i === 1 ? -8 : i === 2 ? 4 : 0,
          ease: "none",
          scrollTrigger: { trigger: p, start: "top bottom", end: "bottom top", scrub: true },
        });
      });
    });
    return () => mm.revert();
  }, []);

  return (
    <section ref={root} id="learning" aria-labelledby="learning-title" className="relative bg-paper" data-aperture>
      <div className="mx-auto max-w-[1480px] px-6 py-28 md:px-10 md:py-48">
        <Chapter n="03" title="The learning experience" />
        <h2 id="learning-title" className="sr-only">
          The learning experience at The Prime Step
        </h2>

        <p data-fill className="display mt-10 max-w-[1100px] text-[9.6vw] text-deep md:text-[5.2vw] md:leading-[1.02]">
          {STATEMENT.split(" ").map((w, i) => (
            <span key={i} data-fw className="mr-[0.2em] inline-block">
              {w}
            </span>
          ))}
        </p>

        <div className="mt-24 grid gap-10 md:mt-40 md:grid-cols-3 md:gap-8">
          {PLATES.map((p, i) => (
            <div key={p.t} className={i === 1 ? "md:mt-24" : i === 2 ? "md:mt-10" : ""}>
              <div
                data-plate
                className="relative aspect-[4/5] overflow-hidden bg-soft"
                role="img"
                aria-label={p.t}
              >
                <div data-inner className="absolute inset-[-10%]">
                  <PlateArt i={i} />
                </div>
                <span className="eyebrow absolute top-5 left-5 text-deep">0{i + 1}</span>
              </div>
              <h3 className="display mt-6 text-4xl text-deep md:text-[2.6rem]">{p.t}</h3>
              <p className="mt-3 max-w-sm leading-relaxed">{p.d}</p>
            </div>
          ))}
        </div>

        {/* Branches */}
        <div className="mt-28 md:mt-48">
          <h3 className="display text-[12vw] text-deep md:text-[5vw]">
            <Split text="Find your *branch.*" as="span" />
          </h3>
          <ul className="mt-10 border-t border-deep/30">
            {BRANCHES.map((b) => (
              <li key={b.name} className="border-b border-deep/30">
                <a
                  href={mapsLink(b.address)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor
                  className="group grid items-center gap-2 py-7 transition-[padding] duration-500 [transition-timing-function:var(--ease-out)] hover:pl-4 md:grid-cols-[1fr_1.4fr_auto] md:gap-8"
                >
                  <span className="display text-4xl text-deep transition-colors group-hover:text-brand md:text-6xl">
                    {b.name}
                  </span>
                  <span className="max-w-lg leading-relaxed">{b.address}</span>
                  <span className="eyebrow flex items-center gap-3 text-brand">
                    {b.tag}
                    <span className="grid size-10 place-items-center rounded-full border border-brand transition-colors duration-500 group-hover:bg-brand group-hover:text-white">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                        <path d="M3 11L11 3M5 3h6v6" stroke="currentColor" strokeWidth="1.4" />
                      </svg>
                    </span>
                    <span className="sr-only">(opens in Google Maps)</span>
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

