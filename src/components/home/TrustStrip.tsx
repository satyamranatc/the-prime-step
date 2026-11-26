import { TRUST_ITEMS } from "@/lib/homepage";
import { Reveal } from "@/components/ui/Motion";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

const QUICK_TRACKS = [
  { label: "Java Full Stack", meta: "Spring Boot · React", href: "/java-full-stack-developer" },
  { label: "MERN Stack", meta: "MongoDB · Node.js", href: "/mern-stack-developer-course" },
  { label: "Python & AI", meta: "Django · GenAI", href: "/python-programming-classes" },
  { label: "Data Analytics", meta: "SQL · Power BI", href: "/data-analytics-course-in-indore" },
  { label: "Power BI Mastery", meta: "DAX · Dashboards", href: "/power-bi-course-in-indore" },
  { label: "DevOps & AWS", meta: "Docker · Kubernetes", href: "/devops-and-cloud-computing-course" },
  { label: "Android & Flutter", meta: "Dart · iOS/Android", href: "/android-app-development" },
  { label: "Tally Prime + GST", meta: "GST Filing · Accounts", href: "/tally-gst-mastery-course" },
  { label: "Advanced Excel", meta: "XLOOKUP · MIS", href: "/ms-office-and-excel-course-in-indore" },
  { label: "Spoken English", meta: "GD & HR Prep", href: "/english-courses" },
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
                className="py-5 pr-3 odd:border-r odd:border-hairline even:pl-3.5 sm:py-7 md:border-r-0 md:px-7 md:py-8 md:first:pl-0 md:last:pr-0 md:odd:border-r-0"
              >
                <dt className="font-mono text-[10.5px] font-semibold uppercase tracking-[0.09em] text-ink-subtle sm:text-[11px]">
                  {item.label}
                </dt>
                <dd className="display mt-1.5 text-2xl font-bold text-ink sm:mt-2 sm:text-4xl">
                  <AnimatedCounter value={item.value} />
                </dd>
                <p className="mt-1 text-[11.5px] leading-relaxed text-ink-muted sm:text-xs">
                  {item.note}
                </p>
              </div>
            ))}
          </dl>
        </Reveal>

        {/* Infinite Moving Course & Tech Strip */}
        <div
          className="group relative overflow-hidden border-t border-hairline py-4 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          aria-label="Technologies and courses taught at The Prime Step"
        >
          <div className="flex w-max gap-3 animate-[tps-marquee_34s_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:animate-none">
            {[...QUICK_TRACKS, ...QUICK_TRACKS].map((item, idx) => (
              <a
                key={`${item.label}-${idx}`}
                href={item.href}
                className="inline-flex shrink-0 items-center gap-2.5 rounded-full border border-hairline bg-paper px-4 py-2 text-xs font-semibold text-ink transition-colors hover:border-brand hover:text-brand"
              >
                <span className="size-1.5 rounded-full bg-brand" />
                <span>{item.label}</span>
                <span className="font-mono text-[10.5px] font-normal text-ink-subtle">
                  {item.meta}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
