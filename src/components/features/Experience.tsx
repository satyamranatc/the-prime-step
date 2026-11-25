"use client";

import { useEffect, type ReactNode } from "react";
import Nav from "./Nav";
import StickyLeadBar from "@/components/ui/StickyLeadBar";

/**
 * Lightweight page shell for the homepage.
 * Uses native scrolling (no Lenis scroll-jacking, no blocking splash loader)
 * and powers subtle cursor-tracked highlights on `.spotlight-card` surfaces.
 */
export default function Experience({ children }: { children: ReactNode }) {
  useEffect(() => {
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const finePointer = window.matchMedia("(pointer: fine)").matches;
    if (calm || !finePointer) return;

    const onSpotlightMove = (e: PointerEvent) => {
      const card = (e.target as HTMLElement | null)?.closest?.(
        ".spotlight-card",
      ) as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--spot-x", `${e.clientX - rect.left}px`);
      card.style.setProperty("--spot-y", `${e.clientY - rect.top}px`);
    };

    window.addEventListener("pointermove", onSpotlightMove, { passive: true });
    return () => window.removeEventListener("pointermove", onSpotlightMove);
  }, []);

  return (
    <>
      <Nav />
      {children}
      <StickyLeadBar />
    </>
  );
}
