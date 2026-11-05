"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import Logo from "@/components/ui/Logo";

/** Custom loading experience: a staircase builds while the counter climbs, then the curtain lifts. */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const html = document.documentElement;
    const finish = () => {
      html.dataset.ready = "1";
      window.dispatchEvent(new Event("pps-ready"));
    };

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.style.display = "none";
      finish();
      return;
    }

    html.style.overflow = "hidden";
    const counter = el.querySelector<HTMLElement>("[data-count]");
    const obj = { v: 0 };

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          onComplete: () => {
            el.style.display = "none";
            html.style.overflow = "";
          },
        })
        .fromTo(
          "[data-lstep]",
          { scaleY: 0 },
          { scaleY: 1, duration: 0.9, stagger: 0.2, ease: "expo.out", transformOrigin: "bottom" },
          0,
        )
        .to(
          obj,
          {
            v: 100,
            duration: 2,
            ease: "power2.inOut",
            onUpdate: () => {
              if (counter) counter.textContent = String(Math.round(obj.v)).padStart(3, "0");
            },
          },
          0,
        )
        .to("[data-lcontent]", { opacity: 0, y: -24, duration: 0.5, ease: "power2.in" }, 2.2)
        .call(finish, [], 2.75)
        .to(el, { yPercent: -100, duration: 1.1, ease: "expo.inOut" }, 2.55);
    }, el);

    return () => {
      ctx.revert();
      html.style.overflow = "";
    };
  }, []);

  return (
    <div
      ref={root}
      className="loader fixed inset-0 z-[300] flex flex-col justify-between bg-paper p-6 md:p-10"
      role="status"
      aria-label="Loading The Prime Step"
    >
      <noscript>
        <style>{`.loader{display:none!important}`}</style>
      </noscript>
      <div data-lcontent className="eyebrow flex items-center justify-between text-deep">
        <Logo height={64} />
        <span>Indore</span>
      </div>
      <div data-lcontent className="flex items-end gap-1.5 self-center">
        {[28, 48, 68, 88, 108].map((h, i) => (
          <div
            key={h}
            data-lstep
            style={{ height: h }}
            className={`w-8 md:w-10 ${i === 4 ? "bg-brand" : "bg-pale"}`}
          />
        ))}
      </div>
      <div data-lcontent className="flex items-end justify-between">
        <span data-count className="display text-[28vw] leading-none text-deep md:text-[16vw]">
          000
        </span>
        <span className="eyebrow mb-4 text-brand">Preparing your first step</span>
      </div>
    </div>
  );
}

