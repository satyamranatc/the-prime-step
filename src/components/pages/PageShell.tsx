"use client";

import { useEffect, type ReactNode } from "react";
import Link from "next/link";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { setLenis } from "@/lib/scroll";
import Nav from "@/components/features/Nav";
import NextStep from "@/components/features/NextStep";
import Footer from "@/components/features/Footer";
import StickyLeadBar from "@/components/ui/StickyLeadBar";

export default function PageShell({
  children,
  breadcrumbs,
  hideNextStep = false,
}: {
  children: ReactNode;
  breadcrumbs?: { name: string; path: string }[];
  hideNextStep?: boolean;
}) {
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
      gsap.utils.toArray<HTMLElement>("[data-split]").forEach((el) => {
        gsap.from(el.querySelectorAll("[data-w]"), {
          yPercent: 115,
          duration: 1.1,
          ease: "expo.out",
          stagger: 0.05,
          scrollTrigger: { trigger: el, start: "top 90%", once: true },
        });
      });

      gsap.utils.toArray<HTMLElement>("[data-fade]").forEach((el) => {
        gsap.from(el, {
          y: 28,
          opacity: 0,
          duration: 0.95,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 92%", once: true },
        });
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
    <div id="top" className="min-h-screen bg-paper text-deep">
      <Nav />
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav
          aria-label="Breadcrumb"
          className="mx-auto max-w-[1480px] px-6 pt-28 md:px-10 md:pt-32"
        >
          <ol className="flex flex-wrap items-center gap-2 text-xs font-mono uppercase tracking-wider text-deep/65">
            {breadcrumbs.map((item, idx) => {
              const isLast = idx === breadcrumbs.length - 1;
              return (
                <li key={item.path} className="flex items-center gap-2">
                  {idx > 0 && <span aria-hidden="true" className="text-deep/35">/</span>}
                  {isLast ? (
                    <span className="font-semibold text-brand" aria-current="page">
                      {item.name}
                    </span>
                  ) : (
                    <Link href={item.path} className="hover:text-brand transition-colors">
                      {item.name}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      )}
      <main>{children}</main>
      {!hideNextStep && <NextStep />}
      <Footer />
      <StickyLeadBar />
    </div>
  );
}

