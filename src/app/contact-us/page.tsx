import type { Metadata } from "next";
import { BRANCHES, FAQS, SITE, SOCIAL_LINKS, mapsLink } from "@/lib/content";
import { buildBreadcrumbJsonLd } from "@/lib/seoPages";
import Chapter from "@/components/ui/Chapter";
import ContactInquiryForm from "@/components/pages/ContactInquiryForm";
import PageShell from "@/components/pages/PageShell";

const pageTitle = "Contact Us — Vijay Nagar, Bhawarkua & Annapurna Campuses | The Prime Step Indore";
const pageDescription =
  "Contact The Prime Step Indore for course admissions, fee structure, and free 2-day demo classes. Visit our Vijay Nagar (Shagun Tower), Bhawarkua (Indrapuri), or Annapurna Road campuses or call +91 94796 11441.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: [
    "Contact The Prime Step Indore",
    "The Prime Step Vijay Nagar address phone number",
    "The Prime Step Bhawarkua address",
    "The Prime Step Annapurna campus",
    "Computer coaching inquiry Indore",
  ],
  alternates: {
    canonical: `${SITE.url}/contact-us`,
  },
  openGraph: {
    title: pageTitle,
    description: pageDescription,
    url: `${SITE.url}/contact-us`,
    siteName: SITE.name,
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: pageDescription,
  },
};

export default function ContactUsPage() {
  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: "Contact Us", path: "/contact-us" },
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      buildBreadcrumbJsonLd(breadcrumbs),
      {
        "@type": "ContactPage",
        "@id": `${SITE.url}/contact-us#contact`,
        url: `${SITE.url}/contact-us`,
        name: pageTitle,
        description: pageDescription,
        mainEntity: {
          "@id": `${SITE.url}/#organization`,
        },
      },
    ],
  };

  return (
    <PageShell breadcrumbs={breadcrumbs}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* 1. Hero & Direct Contact Grid */}
      <section className="mx-auto max-w-[1480px] px-6 pt-8 pb-20 md:px-10 md:pt-12 md:pb-28">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
          <div>
            <p className="eyebrow text-brand">Admissions, Demo Classes &amp; Counseling</p>
            <h1 className="display mt-4 text-[11.5vw] text-deep sm:text-[7.5vw] md:text-[5.2vw] leading-[0.95]">
              Let&apos;s plan your next step in Indore.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-deep/85">
              Have questions about which course fits your background, batch timings, or 0% interest installment options? Speak directly with our career counselors or walk into any of our three Indore campuses.
            </p>

            {/* Direct Contact Channels */}
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <a
                href={SITE.phoneHref}
                className="rounded-2xl border border-pale bg-soft p-6 transition-colors hover:border-brand"
              >
                <span className="eyebrow text-brand">Primary Helpline</span>
                <p className="display mt-2 text-2xl text-deep">{SITE.phoneDisplay}</p>
                <p className="mt-1 text-xs text-deep/70">Mon – Sat · 8:00 AM – 8:00 PM</p>
              </a>

              <a
                href={SITE.phoneSecondaryHref}
                className="rounded-2xl border border-pale bg-soft p-6 transition-colors hover:border-brand"
              >
                <span className="eyebrow text-brand">Counseling Desk</span>
                <p className="display mt-2 text-2xl text-deep">{SITE.phoneSecondaryDisplay}</p>
                <p className="mt-1 text-xs text-deep/70">Admissions &amp; Batch Schedules</p>
              </a>

              <a
                href={SITE.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl border border-pale bg-soft p-6 transition-colors hover:border-brand"
              >
                <span className="eyebrow text-brand">WhatsApp Admissions</span>
                <p className="display mt-2 text-2xl text-deep">{SITE.whatsappDisplay}</p>
                <p className="mt-1 text-xs text-deep/70">Instant Syllabus PDF &amp; Fee Details</p>
              </a>

              <a
                href={`mailto:${SITE.email}`}
                className="rounded-2xl border border-pale bg-soft p-6 transition-colors hover:border-brand"
              >
                <span className="eyebrow text-brand">Official Email</span>
                <p className="mt-2 truncate font-semibold text-base text-deep">{SITE.email}</p>
                <p className="mt-1 text-xs text-deep/70">Corporate &amp; Academic Queries</p>
              </a>
            </div>

            {/* Social Channels */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <span className="eyebrow text-deep/65 mr-2">Connect:</span>
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-pale bg-paper px-4 py-1.5 text-xs font-medium text-deep hover:border-brand hover:text-brand transition-colors"
                >
                  {s.name}
                </a>
              ))}
            </div>
          </div>

          {/* Interactive Booking Form */}
          <ContactInquiryForm />
        </div>
      </section>

      {/* 2. Three Indore Campuses */}
      <section className="border-t border-pale/60 bg-soft py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="01" title="Indore Campus Locations" />
          <div className="mt-6 max-w-2xl">
            <h2 className="display text-4xl md:text-6xl text-deep">
              Visit our campuses in Indore.
            </h2>
            <p className="mt-4 text-base md:text-lg text-deep/80">
              Drop by for a 1-on-1 counseling session, tour our practical computer labs, and attend a 2-day free demo class.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {BRANCHES.map((b) => (
              <div
                key={b.name}
                className="flex flex-col justify-between rounded-3xl border border-pale/90 bg-paper p-7 md:p-9 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="eyebrow text-brand">{b.tag}</span>
                    <span className="text-xs font-mono text-deep/65">Indore</span>
                  </div>
                  <h3 className="display mt-3 text-3xl text-deep">{b.name} Campus</h3>
                  <p className="mt-1.5 text-xs font-semibold text-brand">{b.landmark}</p>
                  <p className="mt-4 text-sm md:text-base leading-relaxed text-deep/80">
                    {b.address}
                  </p>
                  <p className="mt-4 text-xs font-mono text-deep/70">{b.hours}</p>
                </div>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-pale/70 pt-5">
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand hover:underline"
                  >
                    <span>Get Directions on Google Maps</span>
                    <span>↗</span>
                  </a>
                  <a
                    href={b.phoneHref}
                    className="rounded-full bg-soft px-4 py-2 text-xs font-semibold text-deep border border-pale hover:border-brand transition-colors"
                  >
                    Call {b.phone}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Admissions FAQs */}
      <section className="bg-paper py-20 md:py-28">
        <div className="mx-auto max-w-[1480px] px-6 md:px-10">
          <Chapter n="02" title="Admissions FAQ" />
          <h2 className="display mt-4 text-3xl md:text-5xl text-deep">
            Before you visit our campus.
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {FAQS.map((faq) => (
              <div key={faq.q} className="rounded-2xl border border-pale bg-soft/60 p-6 md:p-7">
                <h3 className="text-base md:text-lg font-semibold text-deep">{faq.q}</h3>
                <p className="mt-2.5 text-sm md:text-base leading-relaxed text-deep/80">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

