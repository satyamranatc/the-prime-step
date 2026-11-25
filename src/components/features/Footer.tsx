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
  { href: "/courses", label: "All Courses" },
  { href: "/career-courses", label: "Career Courses" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/english-courses", label: "English Courses" },
  { href: "/roadmap/java", label: "3D Course Roadmaps" },
  { href: "/blog", label: "Tech Career Blog" },
  { href: "/faq", label: "FAQs" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const FOOTER_COURSES = [
  { href: "/java-full-stack-developer", label: "Java Full Stack Developer" },
  { href: "/mern-stack-developer-course", label: "MERN Stack Developer Course" },
  { href: "/python-programming-classes", label: "Python Programming Classes" },
  { href: "/data-science-and-analytics-courses-in-indore", label: "Data Science & Analytics" },
  { href: "/data-analytics-course-in-indore", label: "Data Analytics Course" },
  { href: "/artificial-intelligence-and-machine-learning-course", label: "AI & Machine Learning" },
  { href: "/power-bi-course-in-indore", label: "Power BI Course" },
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
    <footer className="bg-obsidian text-white" aria-label="Site footer">
      <div className="mx-auto max-w-[1380px] px-4 pt-16 sm:px-6 md:pt-24 lg:px-10">
        <div className="grid gap-12 border-b border-white/12 pb-16 md:grid-cols-2 lg:grid-cols-[1.3fr_0.95fr_1.15fr_0.85fr_1.05fr]">
          {/* Brand & Institutional Proof */}
          <div>
            <Link href="/" aria-label={`${SITE.name} — Home`}>
              <Logo height={64} variant="light" />
            </Link>
            <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/70">
              Practical software engineering, data analytics, and career training institute in {SITE.city}. Established {SITE.established}.
            </p>

            <a
              href={GOOGLE_RATING.reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs text-white/85 transition-colors hover:border-light/60"
            >
              <span className="font-semibold text-amber-400">★ {GOOGLE_RATING.rating}</span>
              <span className="text-white/40">·</span>
              <span>{GOOGLE_RATING.countLabel}</span>
            </a>

            <div className="mt-6 flex flex-wrap items-center gap-2">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`The Prime Step on ${s.name}`}
                  className="flex size-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white/75 transition-colors hover:border-light hover:bg-brand hover:text-white"
                >
                  {getSocialIcon(s.id)}
                </a>
              ))}
            </div>
          </div>

          {/* Direct Contact */}
          <div>
            <h2 className="eyebrow text-light">Admissions Desk</h2>
            <ul className="mt-5 space-y-4 text-sm">
              <li>
                <span className="block font-mono text-[11px] uppercase text-white/45">
                  Primary Helpline
                </span>
                <a
                  href={SITE.phoneHref}
                  className="mt-0.5 inline-block font-medium text-white hover:text-light"
                >
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block font-mono text-[11px] uppercase text-white/45">
                  Counseling &amp; Batches
                </span>
                <a
                  href={SITE.phoneSecondaryHref}
                  className="mt-0.5 inline-block font-medium text-white hover:text-light"
                >
                  {SITE.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <span className="block font-mono text-[11px] uppercase text-white/45">
                  WhatsApp
                </span>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 inline-flex items-center gap-1.5 font-medium text-white hover:text-light"
                >
                  <WhatsAppIcon className="size-3.5 fill-current text-light" />
                  <span>Chat with Counselor</span>
                </a>
              </li>
              <li>
                <span className="block font-mono text-[11px] uppercase text-white/45">Email</span>
                <a
                  href={`mailto:${SITE.email}`}
                  className="mt-0.5 inline-block break-all text-white/85 hover:text-light"
                >
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="block font-mono text-[11px] uppercase text-white/45">
                  Lab Hours
                </span>
                <span className="mt-0.5 block text-white/75">{SITE.hours}</span>
              </li>
            </ul>
          </div>

          {/* Indore Campuses */}
          <div>
            <h2 className="eyebrow text-light">Indore Campuses</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {BRANCHES.map((b) => (
                <li key={b.name} className="border-b border-white/10 pb-3.5 last:border-b-0">
                  <div className="flex items-baseline justify-between gap-2">
                    <Link
                      href={BRANCH_ROUTES[b.name] ?? "/contact-us"}
                      className="font-semibold text-white transition-colors hover:text-light"
                    >
                      {b.name}
                    </Link>
                    <span className="font-mono text-[10px] uppercase text-white/45">{b.tag}</span>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-white/65">{b.landmark}</p>
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs font-medium text-light hover:underline"
                  >
                    <span>Directions</span>
                    <span aria-hidden="true">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Explore */}
          <div>
            <h2 className="eyebrow text-light">Institution</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-white/75">
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
            <h2 className="eyebrow text-light">Programs</h2>
            <ul className="mt-5 space-y-2 text-[13.5px] text-white/75">
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
        <div className="flex flex-wrap items-center justify-between gap-4 py-7 pb-[calc(5rem+env(safe-area-inset-bottom))] text-xs text-white/55 md:pb-7">
          <span>© 2026 {SITE.name}. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-4 font-mono text-[11px]">
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
