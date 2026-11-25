import Link from "next/link";
import { TRUST_ITEMS } from "@/lib/homepage";
import { Reveal } from "@/components/ui/Motion";

const QUICK_TRACKS = [
  { label: "Java Full Stack", href: "/java-full-stack-developer" },
  { label: "MERN Stack", href: "/mern-stack-developer-course" },
  { label: "Python & AI", href: "/python-programming-classes" },
  { label: "Data Analytics", href: "/data-analytics-course-in-indore" },
  { label: "Power BI", href: "/power-bi-course-in-indore" },
  { label: "DevOps & AWS", href: "/devops-and-cloud-computing-course" },
  { label: "Tally + GST", href: "/tally-gst-mastery-course" },
  { label: "Spoken English", href: "/english-courses" },
] as const;

export default function TrustStrip() {
  return (
    <section
      aria-label="Verified institutional highlights"
      className="border-y border-hairline bg-canvas"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        {/* 4-Column Architectural Metrics Ledger */}
        <Reveal>
          <dl className="grid grid-cols-2 divide-y divide-hairline md:grid-cols-4 md:divide-x md:divide-y-0">
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.label}
                className="py-7 pr-4 odd:pr-4 even:pl-4 md:px-7 md:py-8 md:first:pl-0 md:last:pr-0"
              >
                <dt className="font-mono text-[11px] font-semibold uppercase tracking-[0.09em] text-ink-subtle">
                  {item.label}
                </dt>
                <dd className="display mt-2 text-3xl font-bold text-ink sm:text-4xl">
                  {item.value}
                </dd>
                <p className="mt-1 text-xs leading-relaxed text-ink-muted">
                  {item.note}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Quick-Jump Program Index */}
        <div className="flex flex-wrap items-center gap-2 border-t border-hairline py-4">
          <span className="mr-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-ink-subtle">
            Popular Tracks:
          </span>
          {QUICK_TRACKS.map((track) => (
            <Link
              key={track.href}
              href={track.href}
              className="rounded-full border border-hairline bg-paper px-3.5 py-1.5 text-xs font-medium text-ink-muted transition-colors hover:border-brand/50 hover:text-brand"
            >
              {track.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
