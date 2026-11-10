import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { BRANCHES, SITE, SOCIAL_LINKS, mapsLink } from "@/lib/content";
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
  { href: "/courses", label: "Courses" },
  { href: "/career-courses", label: "Career Courses" },
  { href: "/corporate-training", label: "Corporate Training" },
  { href: "/english-courses", label: "English Courses" },
  { href: "/contact-us", label: "Contact Us" },
] as const;

const FOOTER_COURSES = [
  { href: "/java-full-stack-developer", label: "Java Full Stack Developer" },
  { href: "/mern-stack-developer-course", label: "MERN Stack Developer Course" },
  { href: "/python-programming-classes", label: "Python Programming Classes" },
  { href: "/data-science-and-analytics-courses-in-indore", label: "Data Science & Applied AI" },
  { href: "/data-analytics-course-in-indore", label: "Data Analytics & SQL" },
  { href: "/artificial-intelligence-and-machine-learning-course", label: "AI & Machine Learning" },
  { href: "/power-bi-course-in-indore", label: "Power BI Mastery" },
  { href: "/c-and-cpp-programming-classes", label: "C, C++ & Data Structures" },
  { href: "/android-app-development", label: "Android & Flutter App Dev" },
  { href: "/web-design-and-php-full-stack-course", label: "Web Design & Full Stack PHP" },
  { href: "/devops-and-cloud-computing-course", label: "AWS Cloud & DevOps" },
  { href: "/digital-marketing-course-in-indore", label: "Digital Marketing & SEO" },
  { href: "/tally-gst-mastery-course", label: "Tally Prime, GST & Excel" },
  { href: "/english-courses", label: "Spoken English & Soft Skills" },
] as const;

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

/** Closing footer — continues the deep-teal horizon of Chapter 06. */
export default function Footer() {
  return (
    <footer className="bg-deep text-paper" aria-label="Site footer">
      <div className="mx-auto max-w-[1480px] overflow-hidden px-6 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-10 border-t border-pale/30 pt-14 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1.15fr_0.85fr_0.95fr]">
          {/* Brand & Socials */}
          <div>
            <Link href="/" aria-label={`${SITE.name} — Home`}>
              <Logo height={110} variant="light" />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-pale">
              Premier computer academy and professional IT training institute in {SITE.city}. Est. {SITE.established}.
            </p>

            {/* Google Reviews Badge */}
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-pale/30 bg-paper/5 px-3.5 py-1.5 text-xs text-pale">
              <span className="font-semibold text-paper">★ {SITE.rating}</span>
              <span className="text-pale/60">·</span>
              <span>{SITE.reviewCount} Google Reviews</span>
            </div>

            {/* Social Media Links */}
            <div className="mt-6">
              <p className="eyebrow text-pale/80 text-[11px] mb-3">Follow &amp; Connect</p>
              <div className="flex flex-wrap items-center gap-2.5">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.id}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`The Prime Step on ${s.name}`}
                    className="flex size-9 items-center justify-center rounded-full border border-pale/30 bg-paper/5 text-pale transition-all duration-300 hover:border-brand hover:bg-brand hover:text-paper hover:scale-105"
                  >
                    {getSocialIcon(s.id)}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Contact & Hours */}
          <div>
            <h2 className="eyebrow text-pale">Get in Touch</h2>
            <ul className="mt-5 space-y-3.5 text-sm">
              <li>
                <span className="block text-xs font-mono text-pale/60 uppercase">Primary Helpline</span>
                <a href={SITE.phoneHref} className="text-paper font-medium underline-offset-4 hover:underline">
                  {SITE.phoneDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs font-mono text-pale/60 uppercase">Admissions &amp; Counseling</span>
                <a href={SITE.phoneSecondaryHref} className="text-paper font-medium underline-offset-4 hover:underline">
                  {SITE.phoneSecondaryDisplay}
                </a>
              </li>
              <li>
                <span className="block text-xs font-mono text-pale/60 uppercase">WhatsApp Inquiry</span>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-paper font-medium underline-offset-4 hover:underline"
                >
                  <WhatsAppIcon className="size-3.5 fill-current text-brand" />
                  <span>Chat with Counselor</span>
                </a>
              </li>
              <li>
                <span className="block text-xs font-mono text-pale/60 uppercase">Email</span>
                <a href={`mailto:${SITE.email}`} className="break-all text-paper underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <span className="block text-xs font-mono text-pale/60 uppercase">Lab Hours</span>
                <span className="text-pale/90">{SITE.hours}</span>
              </li>
            </ul>
          </div>

          {/* Indore Campuses */}
          <div>
            <h2 className="eyebrow text-pale">Indore Campuses</h2>
            <ul className="mt-5 space-y-4 text-sm">
              {BRANCHES.map((b) => (
                <li key={b.name} className="border-b border-pale/15 pb-3 last:border-b-0">
                  <div className="flex items-baseline justify-between">
                    <span className="font-semibold text-paper">{b.name}</span>
                    <span className="text-[11px] font-mono text-pale/60">{b.tag}</span>
                  </div>
                  <p className="mt-1 text-xs text-pale/80">{b.landmark}</p>
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-xs text-brand hover:underline"
                  >
                    <span>View Map &amp; Directions</span>
                    <span>↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Navigation */}
          <div>
            <h2 className="eyebrow text-pale">Explore</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-pale/90">
              {FOOTER_PAGES.map((p) => (
                <li key={p.href} className="hover:text-paper transition-colors">
                  <Link href={p.href} className="hover:underline underline-offset-4">
                    {p.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Flagship Courses */}
          <div>
            <h2 className="eyebrow text-pale">Flagship Courses</h2>
            <ul className="mt-5 space-y-2.5 text-sm text-pale/90">
              {FOOTER_COURSES.map((c) => (
                <li key={c.href} className="hover:text-paper transition-colors">
                  <Link href={c.href} className="hover:underline underline-offset-4">
                    {c.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Big Editorial Logo Wordmark */}
        <p
          aria-hidden="true"
          className="display mt-16 text-[15vw] leading-[0.92] text-brand select-none md:mt-24 md:text-[11.2vw] tracking-tight"
        >
          The Prime Step
        </p>
      </div>

      {/* Bottom Sub-bar */}
      <div className="relative bg-brand/40 border-t border-pale/20">
        <div className="mx-auto flex max-w-[1480px] flex-wrap items-center justify-between gap-3 px-6 py-4 text-xs md:text-sm text-pale md:px-10">
          <span>© {SITE.name} 2026. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <span>{SITE.city}</span>
            <span>·</span>
            <span>Rated {SITE.rating} on Google</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
