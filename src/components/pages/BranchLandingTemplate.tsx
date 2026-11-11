import Link from "next/link";
import PageShell from "@/components/pages/PageShell";
import { SITE, BRANCHES } from "@/lib/content";
import { ALL_CATALOG_COURSES } from "@/lib/seoPages";

export interface BranchPageProps {
  branchKey: "Vijay Nagar" | "Bhawarkua" | "Annapurna";
  slug: string;
  headline: string;
  lead: string;
  description: string;
  googleMapsUrl: string;
  nearbyAreas: string[];
  reviews: { author: string; role: string; text: string; rating: number }[];
}

export default function BranchLandingTemplate({
  branchKey,
  slug,
  headline,
  lead,
  description,
  googleMapsUrl,
  nearbyAreas,
  reviews,
}: BranchPageProps) {
  const branch = BRANCHES.find((b) => b.name === branchKey) || BRANCHES[0];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `The Prime Step — ${branch.name} Campus, Indore`,
    description: description,
    url: `${SITE.url}/${slug}`,
    telephone: branch.phone,
    email: SITE.email,
    image: `${SITE.url}/brand/logo.png`,
    priceRange: "₹₹",
    openingHours: "Mo-Sa 08:00-20:00",
    address: {
      "@type": "PostalAddress",
      streetAddress: branch.address,
      addressLocality: "Indore",
      addressRegion: "Madhya Pradesh",
      postalCode: branchKey === "Vijay Nagar" ? "452010" : branchKey === "Bhawarkua" ? "452001" : "452009",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: branchKey === "Vijay Nagar" ? 22.7533 : branchKey === "Bhawarkua" ? 22.6926 : 22.6978,
      longitude: branchKey === "Vijay Nagar" ? 75.8937 : branchKey === "Bhawarkua" ? 75.8676 : 75.8362,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.9",
      reviewCount: "850",
    },
  };

  return (
    <PageShell title={headline} eyebrow={`${branch.name} Campus · Indore`} lead={lead}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="mx-auto max-w-5xl space-y-16">
        {/* Campus Overview & Essential Info Card */}
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-pale/80 bg-paper p-8 md:col-span-2 space-y-6">
            <span className="eyebrow text-brand">{branch.tag}</span>
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-deep">
              Campus Facilities & Practical Labs
            </h2>
            <p className="text-base text-deep/75 leading-relaxed">
              {description}
            </p>

            <div className="grid gap-4 sm:grid-cols-2 pt-4 border-t border-pale">
              <div>
                <span className="text-xs uppercase tracking-wider text-deep/50 font-semibold">
                  Operating Hours
                </span>
                <p className="mt-1 text-sm font-semibold text-deep">{branch.hours}</p>
                <p className="text-xs text-brand font-medium">Labs available 24/7 for project students</p>
              </div>
              <div>
                <span className="text-xs uppercase tracking-wider text-deep/50 font-semibold">
                  Direct Campus Phone
                </span>
                <p className="mt-1 text-sm font-semibold text-deep">
                  <a href={branch.phoneHref} className="hover:text-brand hover:underline">
                    {branch.phone}
                  </a>
                </p>
                <p className="text-xs text-deep/60">Call or WhatsApp for batch timings</p>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs uppercase tracking-wider text-deep/50 font-semibold">
                Serving Students From
              </span>
              <div className="mt-2 flex flex-wrap gap-2">
                {nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full bg-soft px-3 py-1 text-xs font-medium text-deep/80"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Location & Direction Card */}
          <div className="rounded-3xl border border-brand/20 bg-soft p-8 flex flex-col justify-between">
            <div>
              <span className="eyebrow text-brand">Physical Location</span>
              <h3 className="mt-2 text-xl font-bold text-deep">Visit the Campus</h3>
              <p className="mt-4 text-sm font-medium text-deep/90 leading-relaxed">
                {branch.address}
              </p>
              <p className="mt-2 text-xs font-semibold text-brand">
                Landmark: {branch.landmark}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-full bg-deep py-3 text-sm font-semibold text-paper transition-all hover:bg-brand"
              >
                Open Google Maps Directions ↗
              </a>
              <a
                href={branch.phoneHref}
                className="flex w-full items-center justify-center rounded-full border border-deep/20 bg-paper py-3 text-sm font-semibold text-deep transition-all hover:border-brand"
              >
                Call Front Desk
              </a>
            </div>
          </div>
        </div>

        {/* Featured Courses at this Branch */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-pale pb-4">
            <div>
              <span className="eyebrow text-brand">Academic Offerings</span>
              <h2 className="text-2xl font-bold tracking-tight text-deep">
                Courses Taught at {branch.name} Campus
              </h2>
            </div>
            <Link
              href="/courses"
              className="text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
            >
              View Full Course Catalog →
            </Link>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_CATALOG_COURSES.slice(0, 6).map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group rounded-2xl border border-pale/80 bg-paper p-6 transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-md flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between text-xs font-semibold text-brand">
                    <span>{c.duration}</span>
                    <span>{c.level}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-deep group-hover:text-brand transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-xs text-deep/70 line-clamp-2">
                    {c.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-pale/60 text-xs font-semibold text-deep/60 group-hover:text-brand">
                  Explore Course Details →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Local Verified Reviews */}
        <div className="space-y-6">
          <div className="border-b border-pale pb-4">
            <span className="eyebrow text-brand">Student Experiences</span>
            <h2 className="text-2xl font-bold tracking-tight text-deep">
              Student Reviews from {branch.name}
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="rounded-2xl border border-pale/70 bg-paper p-6 space-y-4"
              >
                <div className="flex items-center text-amber-500 text-sm">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="text-sm text-deep/80 leading-relaxed italic">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="pt-2 border-t border-pale/60">
                  <p className="text-xs font-bold text-deep">{rev.author}</p>
                  <p className="text-[11px] text-deep/60">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Branch Admissions CTA */}
        <div className="rounded-3xl border border-brand/20 bg-soft p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-deep">
            Join the Next Batch at {branch.name} Campus
          </h3>
          <p className="mt-3 text-base text-deep/70 max-w-xl mx-auto">
            Book a 2-day free demo class to experience our practical computer labs, meet the mentors, and discuss personalized learning paths.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
            <a
              href={branch.phoneHref}
              className="rounded-full bg-deep px-8 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand"
            >
              Call {branch.phone}
            </a>
            <Link
              href="/contact-us"
              className="rounded-full border border-deep/20 bg-paper px-8 py-3.5 text-sm font-semibold text-deep transition-all hover:border-brand"
            >
              Book Free Demo Class
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}

