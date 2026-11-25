"use client";

import { useEffect, useState, type MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion, useScroll, useSpring } from "motion/react";
import { SITE, SOCIAL_LINKS } from "@/lib/content";
import { scrollToId } from "@/lib/scroll";
import { EASE_OUT } from "@/components/ui/Motion";
import Logo from "@/components/ui/Logo";
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";

const TOP_NAV = [
  { href: "/courses", label: "Courses", hasDropdown: true },
  { href: "/career-courses", label: "Career Tracks" },
  { href: "/corporate-training", label: "Corporate" },
  { href: "/english-courses", label: "English" },
  { href: "/about-us", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact-us", label: "Contact" },
] as const;

const COURSE_DROPDOWN = [
  {
    href: "/java-full-stack-developer",
    title: "Java Full Stack Developer",
    meta: "Spring Boot · Microservices · React",
  },
  {
    href: "/mern-stack-developer-course",
    title: "MERN Stack Developer",
    meta: "MongoDB · Express · React · Node.js",
  },
  {
    href: "/python-programming-classes",
    title: "Python Programming",
    meta: "Core Python · Django · FastAPI · SQL",
  },
  {
    href: "/data-science-and-analytics-courses-in-indore",
    title: "Data Science & Analytics",
    meta: "Python · Pandas · Machine Learning",
  },
  {
    href: "/data-analytics-course-in-indore",
    title: "Data Analytics",
    meta: "SQL · Power BI · Tableau · Excel",
  },
  {
    href: "/power-bi-course-in-indore",
    title: "Power BI Mastery",
    meta: "Power Query · DAX · BI Dashboards",
  },
  {
    href: "/artificial-intelligence-and-machine-learning-course",
    title: "AI & Machine Learning",
    meta: "ML · Deep Learning · NLP · GenAI",
  },
  {
    href: "/c-and-cpp-programming-classes",
    title: "C & C++ Programming",
    meta: "C · C++ OOP · STL · Data Structures",
  },
  {
    href: "/android-app-development",
    title: "Android & Flutter Apps",
    meta: "Dart · Flutter · Android & iOS",
  },
  {
    href: "/web-design-and-php-full-stack-course",
    title: "Web Design & PHP Full Stack",
    meta: "HTML/CSS · JS · PHP · Laravel · MySQL",
  },
  {
    href: "/devops-and-cloud-computing-course",
    title: "DevOps & Cloud Computing",
    meta: "AWS · Linux · Docker · Kubernetes",
  },
  {
    href: "/digital-marketing-course-in-indore",
    title: "Digital Marketing",
    meta: "SEO · Google Ads · Meta Ads · GA4",
  },
  {
    href: "/ms-office-and-excel-course-in-indore",
    title: "MS Office & Advanced Excel",
    meta: "XLOOKUP · Pivot Tables · MIS Reporting",
  },
  {
    href: "/tally-gst-mastery-course",
    title: "Tally Prime + GST Mastery",
    meta: "Tally Prime · GST Filing · Accounting",
  },
] as const;

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [coursesOpen, setCoursesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  const darkSurface = false;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
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
        className={`fixed inset-x-0 top-0 z-[120] transition-all duration-300 ${
          darkSurface
            ? "border-b border-white/[0.06] bg-[#06090b]/55 backdrop-blur-md"
            : scrolled
              ? "border-b border-hairline bg-paper/92 backdrop-blur-xl shadow-[0_1px_16px_rgba(11,18,21,0.05)]"
              : "border-b border-transparent bg-paper/80 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[72px] max-w-[1380px] items-center justify-between px-4 sm:px-6 lg:px-10"
        >
          {/* Brand */}
          <Link
            href="/"
            onClick={onLogoClick}
            className="relative z-[130] flex items-center"
            aria-label={`${SITE.name} — Home`}
          >
            <Logo height={48} variant={open || darkSurface ? "light" : "color"} />
          </Link>

          {/* Center Navigation */}
          <ul className="hidden items-center gap-1 lg:flex">
            {TOP_NAV.map((item) => {
              const isActive =
                pathname === item.href ||
                ("hasDropdown" in item &&
                  item.hasDropdown &&
                  COURSE_DROPDOWN.some((c) => c.href === pathname));

              const linkTone = darkSurface
                ? isActive
                  ? "bg-white/10 text-white"
                  : "text-white/75 hover:bg-white/[0.07] hover:text-white"
                : isActive
                  ? "bg-accent-soft text-brand"
                  : "text-ink-muted hover:bg-canvas hover:text-ink";

              if ("hasDropdown" in item && item.hasDropdown) {
                return (
                  <li
                    key={item.href}
                    className="relative py-3"
                    onMouseEnter={() => setCoursesOpen(true)}
                    onMouseLeave={() => setCoursesOpen(false)}
                  >
                    <Link
                      href={item.href}
                      aria-haspopup="menu"
                      aria-expanded={coursesOpen}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${linkTone}`}
                    >
                      <span>{item.label}</span>
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 12 12"
                        fill="none"
                        aria-hidden="true"
                        className={`transition-transform duration-200 ${
                          coursesOpen
                            ? "rotate-180 text-light"
                            : darkSurface
                              ? "text-white/50"
                              : "text-ink-subtle"
                        }`}
                      >
                        <path
                          d="M2.5 4.5L6 8L9.5 4.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </Link>

                    <AnimatePresence>
                      {coursesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.99 }}
                          transition={{ duration: 0.2, ease: EASE_OUT }}
                          className="absolute top-full left-1/2 w-[680px] -translate-x-1/2 pt-2"
                        >
                          <div className="max-h-[78vh] overflow-y-auto rounded-2xl border border-hairline bg-paper p-5 text-ink shadow-[0_28px_64px_-12px_rgba(11,18,21,0.22)]">
                            <div className="mb-3.5 flex items-center justify-between border-b border-hairline pb-3">
                              <div>
                                <span className="eyebrow text-brand">Academic Catalog</span>
                                <p className="mt-0.5 text-xs text-ink-muted">
                                  15 lab-based programs across 3 Indore campuses
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <Link
                                  href="/roadmap/java"
                                  onClick={() => setCoursesOpen(false)}
                                  className="text-xs font-semibold text-ink-muted transition-colors hover:text-brand"
                                >
                                  3D Roadmaps
                                </Link>
                                <Link
                                  href="/courses"
                                  onClick={() => setCoursesOpen(false)}
                                  className="rounded-lg bg-canvas px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
                                >
                                  All Courses →
                                </Link>
                              </div>
                            </div>

                            <div className="grid grid-cols-2 gap-1">
                              {COURSE_DROPDOWN.map((c) => (
                                <Link
                                  key={c.href}
                                  href={c.href}
                                  onClick={() => setCoursesOpen(false)}
                                  className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-canvas"
                                >
                                  <p className="text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand">
                                    {c.title}
                                  </p>
                                  <p className="mt-0.5 font-mono text-[11px] text-ink-subtle">
                                    {c.meta}
                                  </p>
                                </Link>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${linkTone}`}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right Actions */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/roadmap/java"
              className={`hidden rounded-full border px-4 py-2 font-mono text-[11px] font-semibold uppercase tracking-wider transition-colors xl:inline-flex ${
                darkSurface
                  ? "border-white/20 text-white/85 hover:border-white/50 hover:text-white"
                  : "border-hairline text-ink-muted hover:border-ink/40 hover:text-ink"
              }`}
            >
              3D Roadmaps
            </Link>

            <Link
              href={pathname === "/" ? "#admission" : "/contact-us"}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToId("admission");
                }
              }}
              className={`press-scale hidden items-center gap-2 rounded-full px-5 py-2.5 text-[13px] font-semibold lg:inline-flex ${
                darkSurface
                  ? "border border-white/25 bg-white text-ink hover:bg-accent-soft"
                  : "bg-ink text-white hover:bg-brand"
              }`}
            >
              <span>Book Free Demo</span>
              <span aria-hidden="true">→</span>
            </Link>

            <button
              type="button"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
              className={`relative z-[130] grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${
                open || darkSurface
                  ? "border-white/25 bg-white/10"
                  : "border-hairline bg-paper hover:border-ink/40"
              }`}
            >
              <span
                className={`absolute h-[1.5px] w-4.5 transition-transform duration-300 ${
                  open
                    ? "rotate-45 bg-white"
                    : darkSurface
                      ? "-translate-y-1.5 bg-white"
                      : "-translate-y-1.5 bg-ink"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4.5 transition-transform duration-300 ${
                  open
                    ? "-rotate-45 bg-white"
                    : darkSurface
                      ? "translate-y-1.5 bg-white"
                      : "translate-y-1.5 bg-ink"
                }`}
              />
            </button>
          </div>
        </nav>
        {/* Subtle 1.5px teal reading-progress hairline */}
        <motion.div
          aria-hidden="true"
          style={{ scaleX, transformOrigin: "0% 50%" }}
          className="pointer-events-none absolute inset-x-0 bottom-0 h-[1.5px] bg-gradient-to-r from-brand via-light to-brand/70"
        />
      </header>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="fixed inset-0 z-[110] flex flex-col justify-between overflow-y-auto bg-[#06090b] px-5 pt-[max(5.5rem,calc(env(safe-area-inset-top)+4rem))] pb-[max(2.5rem,calc(env(safe-area-inset-bottom)+1.5rem))] text-white lg:hidden"
          >
            <div className="space-y-6">
              <ul className="divide-y divide-white/10">
                <li>
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="display block py-3.5 text-2xl text-white transition-colors hover:text-light"
                  >
                    Home
                  </Link>
                </li>
                {TOP_NAV.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="display block py-3.5 text-2xl text-white transition-colors hover:text-light"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <p className="eyebrow mb-3 text-white/60">Flagship Courses</p>
                <div className="flex flex-wrap gap-2">
                  {COURSE_DROPDOWN.slice(0, 8).map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setOpen(false)}
                      className="rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/90 hover:border-light hover:text-white"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
              <div className="flex flex-wrap gap-3">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex flex-1 items-center justify-center rounded-full bg-white px-5 py-3 text-sm font-semibold text-ink"
                >
                  Call {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-brand px-5 py-3 text-sm font-semibold text-white"
                >
                  <WhatsAppIcon className="size-4 fill-current" />
                  <span>WhatsApp</span>
                </a>
              </div>

              <div className="flex items-center justify-between pt-2">
                <a href={`mailto:${SITE.email}`} className="text-xs text-white/70">
                  {SITE.email}
                </a>
                <div className="flex items-center gap-2">
                  {SOCIAL_LINKS.map((s) => (
                    <a
                      key={s.id}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={s.name}
                      className="flex size-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/80 hover:border-light hover:text-white"
                    >
                      {s.id === "instagram" && <InstagramIcon className="size-3.5" />}
                      {s.id === "linkedin" && <LinkedInIcon className="size-3.5" />}
                      {s.id === "youtube" && <YouTubeIcon className="size-3.5" />}
                      {s.id === "facebook" && <FacebookIcon className="size-3.5" />}
                      {s.id === "whatsapp" && <WhatsAppIcon className="size-3.5" />}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
