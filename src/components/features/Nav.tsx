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

type MenuId = "programs" | "campuses" | "resources" | null;

const PROGRAM_ITEMS = [
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
  {
    href: "/english-courses",
    title: "Spoken English & Communication",
    meta: "Fluency · GD · HR Interview Prep",
  },
] as const;

const CAMPUS_ITEMS = [
  {
    href: "/vijay-nagar",
    title: "Vijay Nagar Campus",
    meta: "Head Office · Shagun Tower, AB Road",
  },
  {
    href: "/bhawarkua",
    title: "Bhawarkua Campus",
    meta: "Student Hub · Indrapuri Main Road",
  },
  {
    href: "/annapurna",
    title: "Annapurna Campus",
    meta: "West Indore · Kalyan Tower, Annapurna Rd",
  },
  {
    href: "/corporate-training",
    title: "Corporate & College Training",
    meta: "Custom workshops & upskilling programs",
  },
] as const;

const RESOURCE_ITEMS = [
  {
    href: "/blog",
    title: "Tech Career Blog",
    meta: "Roadmaps, salaries & practical guides",
  },
  {
    href: "/roadmap/java",
    title: "3D Course Roadmaps",
    meta: "Interactive week-by-week syllabus view",
  },
  {
    href: "/faq",
    title: "Frequently Asked Questions",
    meta: "Batches, fees, demos & placement support",
  },
  {
    href: "/verify-certificate",
    title: "Verify Certificate",
    meta: "Official student credential verification",
  },
] as const;

function Chevron({ open }: { open: boolean }) {
  return (
    <svg
      width="11"
      height="11"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      className={`transition-transform duration-200 ${
        open ? "rotate-180 text-brand" : "text-ink-subtle"
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
  );
}

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<MenuId>(null);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 240,
    damping: 32,
    restDelta: 0.001,
  });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = mobileOpen ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setActiveMenu(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [mobileOpen]);

  const onLogoClick = (e: MouseEvent) => {
    setMobileOpen(false);
    setActiveMenu(null);
    if (pathname === "/") {
      e.preventDefault();
      scrollToId("top");
    }
  };

  const isProgramsActive =
    pathname === "/courses" || PROGRAM_ITEMS.some((c) => c.href === pathname);
  const isCampusesActive = CAMPUS_ITEMS.some((c) => c.href === pathname);
  const isResourcesActive =
    RESOURCE_ITEMS.some((r) => pathname.startsWith(r.href)) ||
    pathname.startsWith("/roadmap");

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[120] pt-[env(safe-area-inset-top)] transition-all duration-300 ${
          scrolled
            ? "border-b border-hairline bg-paper/92 backdrop-blur-xl shadow-[0_1px_16px_rgba(11,18,21,0.05)]"
            : "border-b border-transparent bg-paper/80 backdrop-blur-md"
        }`}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex h-[64px] max-w-[1320px] items-center justify-between px-4 sm:h-[74px] sm:px-6 lg:px-10"
        >
          {/* Left: Brand */}
          <Link
            href="/"
            onClick={onLogoClick}
            className="relative z-[130] flex items-center"
            aria-label={`${SITE.name} — Home`}
          >
            <Logo height={42} variant={mobileOpen ? "light" : "color"} />
          </Link>

          {/* Center: Clean 5-Item Spacious Navigation */}
          <ul className="hidden items-center gap-2 lg:flex">
            {/* 1. Programs Mega-Menu */}
            <li
              className="relative py-3"
              onMouseEnter={() => setActiveMenu("programs")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/courses"
                aria-haspopup="menu"
                aria-expanded={activeMenu === "programs"}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  isProgramsActive
                    ? "bg-accent-soft text-brand"
                    : "text-ink-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                <span>Programs</span>
                <Chevron open={activeMenu === "programs"} />
              </Link>

              <AnimatePresence>
                {activeMenu === "programs" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="absolute top-full left-1/2 w-[700px] -translate-x-1/2 pt-2"
                  >
                    <div className="max-h-[78vh] overflow-y-auto rounded-2xl border border-hairline bg-paper p-5 text-ink shadow-[0_28px_64px_-12px_rgba(11,18,21,0.18)]">
                      <div className="mb-3.5 flex items-center justify-between border-b border-hairline pb-3">
                        <div>
                          <span className="eyebrow text-brand">Academic Catalog</span>
                          <p className="mt-0.5 text-xs text-ink-muted">
                            15 practical offline &amp; hybrid career programs
                          </p>
                        </div>
                        <Link
                          href="/courses"
                          onClick={() => setActiveMenu(null)}
                          className="rounded-lg bg-canvas px-3 py-1.5 text-xs font-semibold text-ink transition-colors hover:bg-accent-soft hover:text-brand"
                        >
                          All 15 Programs →
                        </Link>
                      </div>

                      <div className="grid grid-cols-2 gap-1">
                        {PROGRAM_ITEMS.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setActiveMenu(null)}
                            className="group rounded-xl px-3 py-2.5 transition-colors hover:bg-canvas"
                          >
                            <p className="text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand">
                              {c.title}
                            </p>
                            <p className="mt-0.5 text-[11.5px] text-ink-subtle">
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

            {/* 2. Career Tracks */}
            <li>
              <Link
                href="/career-courses"
                className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  pathname === "/career-courses"
                    ? "bg-accent-soft text-brand"
                    : "text-ink-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                Career Tracks
              </Link>
            </li>

            {/* 3. Campuses Dropdown */}
            <li
              className="relative py-3"
              onMouseEnter={() => setActiveMenu("campuses")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/vijay-nagar"
                aria-haspopup="menu"
                aria-expanded={activeMenu === "campuses"}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  isCampusesActive
                    ? "bg-accent-soft text-brand"
                    : "text-ink-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                <span>Campuses</span>
                <Chevron open={activeMenu === "campuses"} />
              </Link>

              <AnimatePresence>
                {activeMenu === "campuses" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="absolute top-full left-1/2 w-[340px] -translate-x-1/2 pt-2"
                  >
                    <div className="rounded-2xl border border-hairline bg-paper p-3 text-ink shadow-[0_24px_56px_-12px_rgba(11,18,21,0.16)]">
                      {CAMPUS_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="group block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-canvas"
                        >
                          <p className="text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11.5px] text-ink-subtle">
                            {item.meta}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 4. Resources Dropdown */}
            <li
              className="relative py-3"
              onMouseEnter={() => setActiveMenu("resources")}
              onMouseLeave={() => setActiveMenu(null)}
            >
              <Link
                href="/blog"
                aria-haspopup="menu"
                aria-expanded={activeMenu === "resources"}
                className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  isResourcesActive
                    ? "bg-accent-soft text-brand"
                    : "text-ink-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                <span>Resources</span>
                <Chevron open={activeMenu === "resources"} />
              </Link>

              <AnimatePresence>
                {activeMenu === "resources" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.99 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.99 }}
                    transition={{ duration: 0.18, ease: EASE_OUT }}
                    className="absolute top-full left-1/2 w-[340px] -translate-x-1/2 pt-2"
                  >
                    <div className="rounded-2xl border border-hairline bg-paper p-3 text-ink shadow-[0_24px_56px_-12px_rgba(11,18,21,0.16)]">
                      {RESOURCE_ITEMS.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setActiveMenu(null)}
                          className="group block rounded-xl px-3.5 py-2.5 transition-colors hover:bg-canvas"
                        >
                          <p className="text-[13.5px] font-semibold text-ink transition-colors group-hover:text-brand">
                            {item.title}
                          </p>
                          <p className="mt-0.5 text-[11.5px] text-ink-subtle">
                            {item.meta}
                          </p>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {/* 5. About */}
            <li>
              <Link
                href="/about-us"
                className={`rounded-lg px-3.5 py-2 text-[14px] font-medium transition-colors ${
                  pathname === "/about-us"
                    ? "bg-accent-soft text-brand"
                    : "text-ink-muted hover:bg-canvas hover:text-ink"
                }`}
              >
                About
              </Link>
            </li>
          </ul>

          {/* Right: Quiet Contact Link + Single Primary Pill CTA */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <Link
              href="/contact-us"
              className={`hidden text-[14px] font-medium transition-colors lg:inline-block ${
                pathname === "/contact-us"
                  ? "text-brand"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              Contact
            </Link>

            {!mobileOpen && (
              <Link
                href={pathname === "/" ? "#admission" : "/contact-us"}
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    scrollToId("admission");
                  }
                }}
                className="press-scale inline-flex min-h-[38px] items-center gap-1.5 rounded-full bg-ink px-3.5 text-xs font-semibold text-white transition-colors hover:bg-brand lg:hidden"
              >
                <span>Free Demo</span>
                <span aria-hidden="true">→</span>
              </Link>
            )}

            <Link
              href={pathname === "/" ? "#admission" : "/contact-us"}
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  scrollToId("admission");
                }
              }}
              className="press-scale hidden items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-[13.5px] font-semibold text-white transition-colors hover:bg-brand lg:inline-flex"
            >
              <span>Book Free Demo</span>
              <span aria-hidden="true">→</span>
            </Link>

            <button
              type="button"
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileOpen((v) => !v)}
              className={`relative z-[130] grid size-11 place-items-center rounded-full border transition-colors lg:hidden ${
                mobileOpen
                  ? "border-white/25 bg-white/10"
                  : "border-hairline bg-paper hover:border-ink/40"
              }`}
            >
              <span
                className={`absolute h-[1.5px] w-4.5 transition-transform duration-300 ${
                  mobileOpen ? "rotate-45 bg-white" : "-translate-y-1.5 bg-ink"
                }`}
              />
              <span
                className={`absolute h-[1.5px] w-4.5 transition-transform duration-300 ${
                  mobileOpen ? "-rotate-45 bg-white" : "translate-y-1.5 bg-ink"
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
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: EASE_OUT }}
            className="fixed inset-0 z-[110] flex h-dvh flex-col justify-between overflow-y-auto overscroll-contain bg-[#06090b] px-5 pt-[max(5.25rem,calc(env(safe-area-inset-top)+4.5rem))] pb-[max(2rem,calc(env(safe-area-inset-bottom)+1.25rem))] text-white lg:hidden"
          >
            <div className="space-y-6">
              <ul className="divide-y divide-white/10">
                {[
                  { href: "/", label: "Home" },
                  { href: "/courses", label: "All 15 Programs" },
                  { href: "/career-courses", label: "Career Tracks" },
                  { href: "/roadmap/java", label: "3D Course Roadmaps" },
                  { href: "/corporate-training", label: "Corporate Training" },
                  { href: "/english-courses", label: "Spoken English" },
                  { href: "/blog", label: "Tech Career Blog" },
                  { href: "/verify-certificate", label: "Verify Certificate" },
                  { href: "/faq", label: "FAQs" },
                  { href: "/about-us", label: "About Us" },
                  { href: "/contact-us", label: "Contact" },
                ].map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="display flex min-h-[48px] items-center justify-between py-2.5 text-[19px] text-white transition-colors hover:text-light"
                    >
                      <span>{item.label}</span>
                      <span aria-hidden="true" className="text-sm text-white/35">
                        →
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>

              <div className="pt-2">
                <p className="eyebrow mb-3 text-white/60">Indore Campuses</p>
                <div className="flex flex-wrap gap-2">
                  {CAMPUS_ITEMS.slice(0, 3).map((c) => (
                    <Link
                      key={c.href}
                      href={c.href}
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex min-h-[38px] items-center rounded-full border border-white/15 bg-white/5 px-3.5 text-xs font-medium text-white/90 hover:border-light hover:text-white"
                    >
                      {c.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-8 space-y-4 border-t border-white/15 pt-6">
              <div className="grid grid-cols-2 gap-2.5">
                <a
                  href={SITE.phoneHref}
                  className="inline-flex min-h-[46px] items-center justify-center rounded-full bg-white px-4 text-sm font-semibold text-ink active:scale-[0.98]"
                >
                  Call Now
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-[46px] items-center justify-center gap-2 rounded-full bg-brand px-4 text-sm font-semibold text-white active:scale-[0.98]"
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
