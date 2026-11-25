import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { BRANCHES, SITE, SOCIAL_LINKS, mapsLink } from "@/lib/content";
import { GOOGLE_RATING } from "@/lib/homepage";
import {
  InstagramIcon,
  LinkedInIcon,
  YouTubeIcon,
  FacebookIcon,
  WhatsAppIcon,
} from "@/components/ui/SocialIcons";

const FOOTER_PAGES = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/courses", label: "All 15 Programs" },
  { href: "/career-courses", label: "Career Tracks" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/english-courses", label: "Spoken English" },
  { href: "/roadmap/java", label: "3D Course Roadmaps" },
  { href: "/blog", label: "Tech Career Blog" },
  { href: "/faq", label: "FAQs" },
  { href: "/verify-certificate", label: "Verify Certificate" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const FOOTER_COURSES = [
  { href: "/java-full-stack-developer", label: "Java Full Stack Developer" },
  { href: "/mern-stack-developer-course", label: "MERN Stack Developer" },
  { href: "/python-programming-classes", label: "Python Programming" },
  { href: "/data-science-and-analytics-courses-in-indore", label: "Data Science & Analytics" },
  { href: "/data-analytics-course-in-indore", label: "Data Analytics" },
  { href: "/artificial-intelligence-and-machine-learning-course", label: "AI & Machine Learning" },
  { href: "/power-bi-course-in-indore", label: "Power BI Mastery" },
  { href: "/c-and-cpp-programming-classes", label: "C & C++ Programming" },
  { href: "/android-app-development", label: "Android & Flutter Apps" },
  { href: "/web-design-and-php-full-stack-course", label: "Web Design & PHP Full Stack" },
  { href: "/devops-and-cloud-computing-course", label: "DevOps & Cloud Computing" },
  { href: "/digital-marketing-course-in-indore", label: "Digital Marketing" },
  { href: "/ms-office-and-excel-course-in-indore", label: "MS Office & Advanced Excel" },
  { href: "/tally-gst-mastery-course", label: "Tally GST Mastery" },
] as const;

const BRANCH_ROUTES: Record<string, string> = {
  "Vijay Nagar": "/vijay-nagar",
  Bhawarkua: "/bhawarkua",
  Annapurna: "/annapurna",
};

function getSocialIcon(id: string) {
  switch (id) {
    case "instagram":
      return <InstagramIcon className="size-4" />;
    case "linkedin":
      return <LinkedInIcon className="size-4" />;
    case "youtube":
      return <YouTubeIcon className="size-4" />;
    case "facebook":
      return <FacebookIcon className="size-4" />;
    case "whatsapp":
      return <WhatsAppIcon className="size-4" />;
    default:
      return null;
  }
}

export default function Footer() {
  return (
    <footer
      aria-label="Site footer"
      className="relative overflow-hidden border-t border-[#5eead4]/15 bg-[#061315] text-white"
    >
      {/* Subtle top-center ambient teal sheen matching dark bento cards */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-64 w-[760px] -translate-x-1/2 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(ellipse at center, rgba(20, 184, 166, 0.16) 0%, transparent 72%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-[1320px] px-4 pt-14 sm:px-6 md:pt-20 lg:px-10">
        {/* Top Compact Brand + Action Strip */}
        <div className="flex flex-col justify-between gap-6 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <div className="flex flex-wrap items-center gap-4">
            <Link href="/" aria-label={`${SITE.name} — Home`}>
              <Logo height={52} variant="light" />
            </Link>
            <a
              href={GOOGLE_RATING.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/85 transition-colors hover:border-[#5eead4]/50"
            >
              <span className="font-semibold text-amber-400">★ {GOOGLE_RATING.rating}</span>
              <span className="text-white/30">|</span>
              <span>{GOOGLE_RATING.countLabel}</span>
            </a>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href={SITE.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="press-scale inline-flex min-h-[42px] items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-4 text-xs font-semibold text-white transition-colors hover:border-[#5eead4]/60 hover:text-[#5eead4]"
            >
              <WhatsAppIcon className="size-3.5 fill-current text-[#5eead4]" />
              <span>WhatsApp Counselor</span>
            </a>
            <Link
              href="/contact-us"
              className="press-scale inline-flex min-h-[42px] items-center gap-2 rounded-full bg-white px-5 text-xs font-semibold text-ink transition-colors hover:bg-[#edf7f6] hover:text-brand"
            >
              <span>Book Free Demo</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        {/* Main 5-Column Directory */}
        <div className="grid gap-10 border-b border-white/10 py-14 md:grid-cols-2 lg:grid-cols-[1.2fr_0.95fr_1.15fr_0.85fr_1.05fr]">
          {/* About & Socials */}
          <div>
            <h2 className="eyebrow text-[#5eead4]">The Prime Step</h2>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/70">
              Practical software engineering, data analytics, and career training institute in {SITE.city}. Established {SITE.established}.
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`The Prime Step on ${s.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white/75 transition-colors hover:border-[#5eead4] hover:bg-brand hover:text-white"
                >
                  {getSocialIcon(s.id)}
                </a>
              ))}
            </div>

            {/* Street-Level Building Location Guide Short */}
            <div className="mt-6 max-w-[230px] rounded-2xl border border-white/10 bg-white/[0.03] p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#5eead4]">
                  <span className="size-1.5 rounded-full bg-[#5eead4]" />
                  Location Guide
                </span>
                <a
                  href="https://www.youtube.com/shorts/B_JTvOQeGEM"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-medium text-white/60 transition-colors hover:text-[#5eead4]"
                >
                  YouTube ↗
                </a>
              </div>
              <p className="mt-1 text-[11.5px] leading-snug text-white/65">
                Quick street guide to find our building.
              </p>
              <div className="mt-2.5 aspect-[9/16] w-full overflow-hidden rounded-xl border border-white/10 bg-black">
                <iframe
                  src="https://www.youtube-nocookie.com/embed/B_JTvOQeGEM?rel=0&modestbranding=1"
                  title="Street-level location guide to find The Prime Step building"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              </div>
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h2 className="eyebrow text-[#5eead4]">Admissions Desk</h2>
            <ul className="mt-4 space-y-3.5 text-sm">
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-white/45">
                  Primary Helpline
                </span>
                <a
                  href={SITE.phoneHref}
                  className="mt-0.5 inline-block font-medium text-white transition-colors hover:text-[#5eead4]"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-white/45">
                  Counseling &amp; Batches
                </span>
                <a
                  href={SITE.phoneSecondaryHref}
                  className="mt-0.5 inline-block font-medium text-white transition-colors hover:text-[#5eead4]"
                >
                  {SITE.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-white/45">
                  Email
                </span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-0.5 inline-block break-all text-white/85 transition-colors hover:text-[#5eead4]"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="block text-[11px] uppercase tracking-wider text-white/45">
                  Lab Hours
                </span>
                <span className="mt-0.5 block text-white/75">{SITE.hours}</span>
              </li>
            </ul>
          </div>

          {/* Indore Campuses */}
          <div>
            <h2 className="eyebrow text-[#5eead4]">Indore Campuses</h2>
            <ul className="mt-4 space-y-4 text-sm">
              {BRANCHES.map((b) => (
                <li key={b.name} className="border-b border-white/10 pb-3.5 last:border-b-0 last:pb-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <Link
                      href={BRANCH_ROUTES[b.name] ?? "/contact-us"}
                      className="font-semibold text-white transition-colors hover:text-[#5eead4]"
                    >
                      {b.name}
                    </Link>
                    <span className="text-[10.5px] uppercase tracking-wider text-white/45">
                      {b.tag}
                    </span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">{b.landmark}</p>
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-[#5eead4] hover:underline"
                  >
                    <span>Directions</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Institution */}
          <div>
            <h2 className="eyebrow text-[#5eead4]">Institution</h2>
            <ul className="mt-4 space-y-2 text-[13.5px] text-white/75">
              {FOOTER_PAGES.map((p) => (
                <li key={p.href}>
                  <Link
                    href={p.href}
                    className="transition-colors hover:text-white"
                  >
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h2 className="eyebrow text-[#5eead4]">Programs</h2>
            <ul className="mt-4 space-y-2 text-[13.5px] text-white/75">
              {FOOTER_COURSES.map((c) => (
                <li key={c.href}>
                  <Link
                    href={c.href}
                    className="transition-colors hover:text-white"
                  >
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Copyright & Mobile Safe Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-6 pb-[calc(5rem+env(safe-area-inset-bottom))] text-xs text-white/55 md:pb-6">
          <span>© 2026 {SITE.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-3 text-[11.5px]">
            <span>{SITE.city}</span>
            <span aria-hidden="true">·</span>
            <span>Est. {SITE.established}</span>
            <span aria-hidden="true">·</span>
            <span>{GOOGLE_RATING.rating}★ on Google</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
