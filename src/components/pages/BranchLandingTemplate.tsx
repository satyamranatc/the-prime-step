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

  const breadcrumbs = [
    { name: "Home", path: "/" },
    { name: `${branch.name} Campus`, path: `/${slug}` },
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `The Prime Step — ${branch.name} Campus, Indore`,
    description,
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
      postalCode:
        branchKey === "Vijay Nagar"
          ? "452010"
          : branchKey === "Bhawarkua"
            ? "452001"
            : "452009",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude:
        branchKey === "Vijay Nagar"
          ? 22.7533
          : branchKey === "Bhawarkua"
            ? 22.6926
            : 22.6978,
      longitude:
        branchKey === "Vijay Nagar"
          ? 75.8937
          : branchKey === "Bhawarkua"
            ? 75.8676
            : 75.8362,
    },
  };

  return (
    <PageShell
      breadcrumbs={breadcrumbs}
      title={headline}
      eyebrow={`${branch.name} Campus · Indore`}
      lead={lead}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="mx-auto max-w-[1380px] space-y-16">
        {/* Campus Overview & Location Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <div className="space-y-6 rounded-2xl border border-hairline bg-paper p-6 sm:p-8 md:col-span-2">
            <span className="eyebrow text-brand">{branch.tag}</span>
            <h2 className="display text-2xl text-ink md:text-3xl">
              Campus Facilities &amp; Practical Labs
            </h2>
            <p className="prose-measure text-sm leading-relaxed text-ink-muted sm:text-base">
              {description}
            </p>

            <div className="grid gap-5 border-t border-hairline pt-5 sm:grid-cols-2">
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                  Operating Hours
                </span>
                <p className="mt-1 text-sm font-semibold text-ink">{branch.hours}</p>
                <p className="mt-0.5 text-xs text-brand">
                  Dedicated lab workstations for all batches
                </p>
              </div>
              <div>
                <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                  Direct Campus Phone
                </span>
                <p className="mt-1 text-sm font-semibold text-ink">
                  <a href={branch.phoneHref} className="hover:text-brand hover:underline">
                    {branch.phone}
                  </a>
                </p>
                <p className="mt-0.5 text-xs text-ink-muted">
                  Call or WhatsApp for batch timings
                </p>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
                Serving Students From
              </span>
              <div className="mt-2.5 flex flex-wrap gap-2">
                {nearbyAreas.map((area) => (
                  <span
                    key={area}
                    className="rounded-full border border-hairline bg-canvas px-3 py-1 text-xs font-medium text-ink-muted"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-hairline bg-canvas p-6 sm:p-8">
            <div>
              <span className="eyebrow text-brand">Physical Location</span>
              <h3 className="display mt-2 text-xl text-ink">Visit the Campus</h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-muted">
                {branch.address}
              </p>
              <p className="mt-2 font-mono text-xs font-semibold text-brand">
                Landmark: {branch.landmark}
              </p>
            </div>

            <div className="mt-8 space-y-3">
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="press-scale flex w-full items-center justify-center rounded-full bg-ink py-3 text-sm font-semibold text-white hover:bg-brand"
              >
                Open Google Maps ↗
              </a>
              <a
                href={branch.phoneHref}
                className="press-scale flex w-full items-center justify-center rounded-full border border-hairline bg-paper py-3 text-sm font-semibold text-ink hover:border-brand hover:text-brand"
              >
                Call Front Desk
              </a>
            </div>
          </div>
        </div>

        {/* Courses at this Branch */}
        <div className="space-y-6">
          <div className="flex flex-wrap items-end justify-between gap-4 border-b border-hairline pb-4">
            <div>
              <span className="eyebrow text-brand">Academic Offerings</span>
              <h2 className="display mt-2 text-2xl text-ink md:text-3xl">
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

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {ALL_CATALOG_COURSES.slice(0, 6).map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="group flex flex-col justify-between rounded-2xl border border-hairline bg-paper p-6 transition-all hover:border-brand/50 hover:shadow-[0_12px_28px_-16px_rgba(11,18,21,0.12)]"
              >
                <div>
                  <div className="flex items-center justify-between font-mono text-[11px] text-ink-subtle">
                    <span className="font-semibold text-brand">{c.duration}</span>
                    <span>{c.level}</span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold text-ink transition-colors group-hover:text-brand">
                    {c.title}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                    {c.description}
                  </p>
                </div>
                <div className="mt-4 border-t border-hairline pt-3 text-xs font-semibold text-ink-muted group-hover:text-brand">
                  Explore Course Details →
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Local Student Experiences */}
        <div className="space-y-6">
          <div className="border-b border-hairline pb-4">
            <span className="eyebrow text-brand">Student Experiences</span>
            <h2 className="display mt-2 text-2xl text-ink md:text-3xl">
              Student Reviews from {branch.name}
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {reviews.map((rev, idx) => (
              <div
                key={idx}
                className="space-y-4 rounded-2xl border border-hairline bg-canvas p-6"
              >
                <div className="text-sm text-amber-500">
                  {"★".repeat(rev.rating)}
                </div>
                <p className="text-sm leading-relaxed text-ink-muted">
                  &ldquo;{rev.text}&rdquo;
                </p>
                <div className="border-t border-hairline pt-3">
                  <p className="text-xs font-bold text-ink">{rev.author}</p>
                  <p className="font-mono text-[11px] text-ink-subtle">{rev.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
