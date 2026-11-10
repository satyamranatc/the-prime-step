"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { SITE, SOCIAL_LINKS } from "@/lib/content";
import { getLenis, scrollToId } from "@/lib/scroll";
import CTA from "@/components/ui/CTA";
import Logo from "@/components/ui/Logo";
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";

const TOP_NAV = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/courses", label: "Courses", hasDropdown: true },
  { href: "/career-courses", label: "Career Courses" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/english-courses", label: "English Courses" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const COURSE_DROPDOWN = [
  {
    href: "/java-full-stack-developer",
    title: "Java Full Stack Developer",
    meta: "Spring Boot · Microservices · React",
  },
  {
    href: "/mern-stack-developer-course",
    title: "MERN Stack Developer Course",
    meta: "MongoDB · Express · React · Node.js",
  },
  {
    href: "/python-programming-classes",
    title: "Python Programming Classes",
    meta: "Core Python · Django · FastAPI · SQL",
  },
  {
    href: "/data-science-and-analytics-courses-in-indore",
    title: "Data Science and Analytics Courses in Indore",
    meta: "Python · Pandas · Machine Learning",
  },
  {
    href: "/data-analytics-course-in-indore",
    title: "Data Analytics Course in Indore",
    meta: "SQL · Power BI · Tableau · Excel",
  },
  {
    href: "/power-bi-course-in-indore",
    title: "Power BI Course in Indore",
    meta: "Power Query · DAX · BI Dashboards",
  },
  {
    href: "/artificial-intelligence-and-machine-learning-course",
    title: "Artificial Intelligence and Machine Learning Course",
    meta: "ML · Deep Learning · NLP · GenAI",
  },
  {
    href: "/c-and-cpp-programming-classes",
    title: "C and C++ Programming Classes",
    meta: "C · C++ OOP · STL · Data Structures",
  },
  {
    href: "/android-app-development",
    title: "Android App Development",
    meta: "Dart · Flutter · Android & iOS",
  },
  {
    href: "/web-design-and-php-full-stack-course",
    title: "Web Design and PHP Full Stack Course",
    meta: "HTML/CSS · JS · PHP · Laravel · MySQL",
  },
  {
    href: "/devops-and-cloud-computing-course",
    title: "DevOps and Cloud Computing Course",
    meta: "AWS · Linux · Docker · Kubernetes · CI/CD",
  },
  {
    href: "/digital-marketing-course-in-indore",
    title: "Digital Marketing Course in Indore",
    meta: "SEO · Google Ads · Meta Ads · GA4",
  },
  {
    href: "/tally-gst-mastery-course",
    title: "Tally GST Mastery Course",
    meta: "Tally Prime · GST Filing · Advanced Excel",
  },
  {
    href: "/english-courses",
    title: "English Courses",
    meta: "Spoken Fluency · GD & HR Interview",
  },
] as const;

export default function Nav() {
  const bar = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const pathname = usePathname();

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
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        setCoursesOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onLogoClick = (e: MouseEvent) => {
    setOpen(false);
    if (pathname === "/") {
      e.preventDefault();
      scrollToId("top");
    }
  };

  return (
    <>
      <header
        ref={bar}
        data-solid="0"
        className="group/nav fixed inset-x-0 top-0 z-[120] transition-colors duration-500 data-[solid='1']:bg-paper/90 data-[solid='1']:backdrop-blur-xl"
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-20 max-w-[1520px] items-center justify-between px-6 md:px-12"
        >
          <Link
            href="/"
            onClick={onLogoClick}
            className="relative z-[130] flex items-center"
            aria-label={`${SITE.name} — home`}
          >
            <Logo height={64} variant={open ? "light" : "color"} />
          </Link>

          <ul className="hidden items-center gap-6 xl:gap-8 lg:flex">
            {TOP_NAV.map((l) => {
              const isActive =
                pathname === l.href ||
                ("hasDropdown" in l &&
                  l.hasDropdown &&
                  COURSE_DROPDOWN.some((c) => c.href === pathname));

              if ("hasDropdown" in l && l.hasDropdown) {
                return (
                  <li
                    key={l.href}
                    className="relative py-6"
                    onMouseEnter={() => setCoursesOpen(true)}
                    onMouseLeave={() => setCoursesOpen(false)}
                  >
                    <Link
                      href={l.href}
                      className={`group relative inline-flex items-center gap-1.5 text-[0.92rem] transition-colors ${
                        isActive ? "font-semibold text-brand" : "text-deep hover:text-brand"
                      }`}
                    >
                      <span>{l.label}</span>
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 10 10"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-300 ${
                          coursesOpen ? "rotate-180 text-brand" : "text-deep/60"
                        }`}
                      >
                        <path
                          d="M2 3.5L5 6.5L8 3.5"
                          stroke="currentColor"
                          strokeWidth="1.4"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      <span
                        className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-brand transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${
                          isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />
                    </Link>

                    {/* Clean Apple-grade Courses Popover */}
                    <div
                      className={`absolute top-full left-1/2 w-[680px] -translate-x-1/2 pt-1 transition-all duration-200 ${
                        coursesOpen
                          ? "pointer-events-auto translate-y-0 opacity-100"
                          : "pointer-events-none -translate-y-1.5 opacity-0"
                      }`}
                    >
                      <div className="max-h-[78vh] overflow-y-auto rounded-2xl border border-pale/90 bg-paper p-5 shadow-[0_20px_50px_rgba(0,36,36,0.12)]">
                        <div className="flex items-center justify-between border-b border-pale/60 pb-3 mb-3">
                          <span className="eyebrow text-brand">All Courses</span>
                          <Link
                            href="/courses"
                            onClick={() => setCoursesOpen(false)}
                            className="text-xs font-semibold text-deep hover:text-brand transition-colors"
                          >
                            View Courses Page →
                          </Link>
                        </div>

                        <div className="grid grid-cols-2 gap-1.5">
                          {COURSE_DROPDOWN.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              onClick={() => setCoursesOpen(false)}
                              className="group rounded-xl p-2.5 transition-colors hover:bg-soft"
                            >
                              <p className="text-[13px] font-semibold text-deep group-hover:text-brand transition-colors">
                                {item.title}
                              </p>
                              <p className="mt-0.5 text-[11px] text-deep/65">{item.meta}</p>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className={`group relative text-[0.92rem] transition-colors ${
                      isActive ? "font-semibold text-brand" : "text-deep hover:text-brand"
                    }`}
                  >
                    {l.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px w-full origin-left bg-brand transition-transform duration-500 [transition-timing-function:var(--ease-out)] ${
                        isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                      }`}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-3">
            <div className="hidden lg:block">
              <CTA
                href={pathname === "/" ? "#admission" : "/contact-us"}
                label="Admissions"
              />
            </div>
            <button
              type="button"
              aria-expanded={open}
              aria-controls="menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className={`relative z-[130] grid size-12 place-items-center rounded-full border transition-colors lg:hidden ${
                open ? "border-pale/40" : "border-deep/30"
              }`}
            >
              <span
                className={`absolute h-px w-5 transition-transform duration-500 ${
                  open ? "rotate-45 bg-paper" : "-translate-y-1.5 bg-deep"
                }`}
              />
              <span
                className={`absolute h-px w-5 transition-transform duration-500 ${
                  open ? "-rotate-45 bg-paper" : "translate-y-1.5 bg-deep"
                }`}
              />
            </button>
          </div>
        </nav>
      </header>

      <div
        id="menu"
        aria-hidden={!open}
        inert={!open}
        className="fixed inset-0 z-[110] flex flex-col justify-between overflow-y-auto bg-deep px-6 pt-28 pb-10 transition-[clip-path] duration-700 [transition-timing-function:var(--ease-out)] lg:hidden"
        style={{ clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)" }}
      >
        <div className="space-y-6">
          <ul className="space-y-1">
            {TOP_NAV.map((l, i) => (
              <li key={l.href} className="overflow-hidden">
                <Link
                  href={l.href}
                  onClick={() => setOpen(false)}
                  style={{ transitionDelay: open ? `${200 + i * 50}ms` : "0ms" }}
                  className={`display block text-[11vw] leading-[1.02] text-paper transition-transform duration-700 [transition-timing-function:var(--ease-out)] sm:text-5xl ${
                    open ? "translate-y-0" : "translate-y-full"
                  }`}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="border-t border-pale/20 pt-5">
            <p className="eyebrow text-pale/70 mb-3">Popular Courses</p>
            <div className="flex flex-wrap gap-2">
              {COURSE_DROPDOWN.map((c) => (
                <Link
                  key={c.href}
                  href={c.href}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-pale/30 bg-paper/10 px-3.5 py-1.5 text-xs font-medium text-paper transition-colors hover:bg-brand"
                >
                  {c.title}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-4 border-t border-pale/20 pt-6 text-pale">
          <div className="space-y-1">
            <a href={SITE.phoneHref} className="block text-xl font-medium text-paper">
              {SITE.phoneDisplay}
            </a>
            <p className="text-xs text-pale/80">Counseling: {SITE.phoneSecondaryDisplay}</p>
            <a href={`mailto:${SITE.email}`} className="block text-sm text-pale hover:underline">
              {SITE.email}
            </a>
          </div>

          <div className="flex items-center gap-3 pt-2">
            {SOCIAL_LINKS.map((s) => (
              <a
                key={s.id}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.name}
                className="flex size-9 items-center justify-center rounded-full border border-pale/30 bg-paper/10 text-paper transition-all hover:bg-brand"
              >
                {s.id === "instagram" && <InstagramIcon className="size-4" />}
                {s.id === "linkedin" && <LinkedInIcon className="size-4" />}
                {s.id === "youtube" && <YouTubeIcon className="size-4" />}
                {s.id === "facebook" && <FacebookIcon className="size-4" />}
                {s.id === "whatsapp" && <WhatsAppIcon className="size-4" />}
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
