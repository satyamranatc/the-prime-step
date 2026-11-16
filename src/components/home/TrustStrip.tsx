import { TRUST_ITEMS } from "@/lib/homepage";

/** Quiet credibility band directly under the hero. Only verified facts. */
export default function TrustStrip() {
  return (
    <section aria-label="Why students trust The Prime Step" className="relative border-y border-pale/70 bg-soft/70">
      <div className="mx-auto max-w-[1480px] px-4 sm:px-6 md:px-12">
        <ul className="grid grid-cols-2 md:auto-cols-fr md:grid-flow-col md:grid-cols-none">
          {TRUST_ITEMS.map((item, i) => (
            <li
              key={item.label}
              className={`group flex flex-col gap-1 border-pale/80 py-6 transition-colors duration-300 sm:py-8 md:border-b-0 md:pr-8 ${
                i % 2 === 1 ? "border-l pl-4 sm:pl-6" : "pr-4"
              } ${i < 2 ? "border-b" : ""} ${i > 0 ? "md:border-l md:pl-8" : "md:border-l-0 md:pl-0"}`}
            >
              <span className="display inline-block origin-left text-3xl text-deep transition-transform duration-300 [transition-timing-function:var(--ease-out)] group-hover:translate-x-1 group-hover:text-brand sm:text-4xl">
                {item.value}
              </span>
              <span className="text-sm font-semibold text-deep">{item.label}</span>
              <span className="text-xs leading-snug text-deep/75 sm:text-[13px]">{item.note}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
