"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { NAV, SITE } from "@/lib/content";
import { getLenis, scrollToId } from "@/lib/scroll";
import CTA from "@/components/ui/CTA";
import Logo from "@/components/ui/Logo";

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = bar.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        const y = self.scroll();
        el.dataset.solid = y > 40 ? "1" : "0";
        gsap.to(el, {
          yPercent: self.direction === 1 && y > 300 ? -110 : 0,
          duration: 0.5,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });
    return () => st.kill();
  }, []);

  useEffect(() => {
    const l = getLenis();
    if (open) l?.stop();
    else l?.start();
    document.documentElement.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const go = (id: string) => (e: MouseEvent) => {
    e.preventDefault();
    setOpen(false);
    window.setTimeout(() => scrollToId(id), open ? 450 : 0);
  };

  return (
    <>
      <header
        ref={bar}
        data-solid="0"
        className="group/nav fixed inset-x-0 top-0 z-[100] border-b border-transparent transition-[background-color,border-color] duration-500 data-[solid=1]:border-pale/60 data-[solid=1]:bg-paper/95"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[84px] max-w-[1480px] items-center justify-between px-6 md:px-10"
        >
          <a href="#top" onClick={go("top")} className="flex items-center" aria-label={`${SITE.name} — home`}>
            <Logo height={68} />
          </a>

          <ul className="hidden items-center gap-9 lg:flex">
            {NAV.slice(0, 4).map((l) => (
              <li key={l.id}>
                <a
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className="group relative text-[0.92rem] text-deep"
                >
                  {l.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-brand transition-transform duration-500 [transition-timing-function:var(--ease-out)] group-hover:scale-x-100" />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <CTA href="#admission" label="Admissions" />
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className="relative z-[120] grid size-12 place-items-center rounded-full border border-deep/30 lg:hidden"
            >
              <span
                className={`absolute h-px w-5 bg-deep transition-transform duration-500 ${open ? "rotate-45" : "-translate-y-1.5"}`}
              />
              <span
                className={`absolute h-px w-5 bg-deep transition-transform duration-500 ${open ? "-rotate-45" : "translate-y-1.5"}`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu"
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-0 z-[110] flex flex-col justify-between bg-deep px-6 pt-28 pb-10 transition-[clip-path] duration-700 [transition-timing-function:var(--ease-out)] lg:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
      >
        <Logo height={64} variant="light" className="absolute top-3 left-6" />
        <ul className="space-y-1">
          {NAV.map((l, i) => (
            <li key={l.id} className="overflow-hidden">
              <a
                href={`#${l.id}`}
                onClick={go(l.id)}
                style={{ transitionDelay: open ? `${250 + i * 60}ms` : "0ms" }}
                className={`display block text-[13vw] text-paper transition-transform duration-700 [transition-timing-function:var(--ease-out)] sm:text-6xl ${open ? "translate-y-0" : "translate-y-full"}`}
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>
        <div className="space-y-1 text-pale">
          <a href={SITE.phoneHref} className="block text-lg text-paper">
            {SITE.phone}
          </a>
          <a href={`mailto:${SITE.email}`} className="block text-sm">
            {SITE.email}
          </a>
        </div>
      </div>
    </>
  );
}

