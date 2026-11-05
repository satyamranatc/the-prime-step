import type Lenis from "lenis";

let instance: Lenis | null = null;

export const setLenis = (l: Lenis | null) => {
  instance = l;
};
export const getLenis = () => instance;

/** Smooth-scroll to a section id (falls back to native when Lenis is off). */
export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  if (instance) {
    instance.scrollTo(el, {
      duration: 1.6,
      easing: (t: number) => 1 - Math.pow(1 - t, 4),
    });
  } else {
    el.scrollIntoView({ behavior: "smooth" });
  }
}

/** Shared, non-reactive scene state (written by ScrollTrigger, read in the R3F loop). */
export const sceneState = { progress: 0 };

