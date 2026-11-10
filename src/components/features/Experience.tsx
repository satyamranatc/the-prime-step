"use client";

import { useEffect, type ReactNode } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import Loader from "./Loader";
import Nav from "./Nav";
import StickyLeadBar from "@/components/ui/StickyLeadBar";

/**
 * Orchestrates the whole experience: smooth scroll (Lenis ↔ ScrollTrigger on fine-pointer desktop),
 * the loader/cursor/nav shell, and global reveal choreography.
 * Everything animated is gated behind prefers-reduced-motion.
 */
export default function Experience({ children }: { children: ReactNode }) {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    if (!calm && finePointer) {
      lenis = new Lenis({
        lerp: 0.1,
        wheelMultiplier: 0.85,
      });
      setLenis(lenis);
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t: number) => lenis?.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(500, 33);
    }

    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      // Masked headline reveals
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        if (el.closest("[data-hero]")) return;
        gsap.from(el.querySelectorAll("[data-w]"), {
          yPercent: 115,
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.06,
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });
      // Soft rise-in
      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          y: 36,
          opacity: 0,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });
      // Scroll-scrubbed word fill
      gsap.utils.toArray<HTMLElement>("[data-fill]").forEach((el) => {
        gsap.fromTo(
          el.querySelectorAll("[data-fw]"),
          { opacity: 0.16 },
          {
            opacity: 1,
            ease: "none",
            stagger: 0.12,
            scrollTrigger: { trigger: el, start: "top 80%", end: "bottom 45%", scrub: true },
          },
        );
      });
    });

    const refresh = () => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refresh);
    window.addEventListener("load", refresh);

    return () => {
      window.removeEventListener("load", refresh);
      mm.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      setLenis(null);
    };
  }, []);

  return (
    <>
      <Loader />
      <Nav />
      {children}
      <StickyLeadBar />
    </>
  );
}

