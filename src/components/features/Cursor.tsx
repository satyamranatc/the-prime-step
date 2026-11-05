"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";

/** Dot + ring cursor for fine pointers. Ring grows over interactive elements. */
export default function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    const dx = gsap.quickTo(d, "x", { duration: 0.1, ease: "power3" });
    const dy = gsap.quickTo(d, "y", { duration: 0.1, ease: "power3" });
    const rx = gsap.quickTo(r, "x", { duration: 0.55, ease: "power3" });
    const ry = gsap.quickTo(r, "y", { duration: 0.55, ease: "power3" });

    const move = (e: MouseEvent) => {
      dx(e.clientX);
      dy(e.clientY);
      rx(e.clientX);
      ry(e.clientY);
      gsap.to([d, r], { opacity: 1, duration: 0.3, overwrite: "auto" });
    };
    const over = (e: MouseEvent) => {
      const hit = (e.target as HTMLElement).closest("a,button,[data-cursor]");
      gsap.to(r, { scale: hit ? 1.9 : 1, duration: 0.4, ease: "power3.out" });
      gsap.to(d, { scale: hit ? 0.4 : 1, duration: 0.3 });
    };
    const leave = () => gsap.to([d, r], { opacity: 0, duration: 0.3 });

    window.addEventListener("mousemove", move, { passive: true });
    window.addEventListener("mouseover", over, { passive: true });
    document.addEventListener("mouseleave", leave);
    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseover", over);
      document.removeEventListener("mouseleave", leave);
    };
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[250] -mt-5 -ml-5 size-10 rounded-full border border-brand opacity-0 [@media(pointer:coarse)]:hidden"
      />
      <div
        ref={dot}
        aria-hidden="true"
        className="pointer-events-none fixed top-0 left-0 z-[250] -mt-[3px] -ml-[3px] size-1.5 rounded-full bg-brand opacity-0 [@media(pointer:coarse)]:hidden"
      />
    </>
  );
}

