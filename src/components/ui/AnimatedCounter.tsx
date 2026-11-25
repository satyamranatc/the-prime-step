"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";

/**
 * Subtle, SEO-safe counter for verified institutional metrics (e.g. "4.9★", "2019", "3", "15").
 * Renders the real final value in SSR HTML and animates smoothly once on viewport entry.
 */
export default function AnimatedCounter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const match = value.match(/^(\d+(?:\.\d+)?)(.*)$/);
    if (!match) return;

    const target = parseFloat(match[1]);
    const suffix = match[2] || "";
    const decimals = match[1].includes(".") ? match[1].split(".")[1].length : 0;
    const startVal = target >= 1000 ? target - 24 : 0;

    const controls = animate(startVal, target, {
      duration: 1.05,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        setDisplay(`${latest.toFixed(decimals)}${suffix}`);
      },
      onComplete: () => {
        setDisplay(value);
      },
    });

    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref} className="tabular-nums">
      {display}
    </span>
  );
}
