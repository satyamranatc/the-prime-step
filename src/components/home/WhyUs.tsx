import Image from "next/image";
import { WHY_US } from "@/lib/homepage";
import SectionHeading from "./SectionHeading";

const PHOTOS = [
  {
    src: "/brand/tps-practical-lab.jpg",
    alt: "Students doing hands-on coding practice in The Prime Step computer lab, Indore",
    caption: "Practical lab · Indore",
  },
  {
    src: "/brand/tps-mentor-classroom.jpg",
    alt: "Trainer explaining a concept to students during a live class at The Prime Step",
    caption: "Live mentorship",
  },
  {
    src: "/brand/tps-indore-campus.jpg",
    alt: "A batch of students learning inside The Prime Step classroom in Indore",
    caption: "Vijay Nagar · Bhawarkua · Annapurna",
  },
] as const;

/** Why choose The Prime Step — six plain-language reasons beside real campus photos. */
export default function WhyUs() {
  return (
    <section
      id="learning"
      aria-labelledby="learning-title"
      className="relative scroll-mt-20 bg-paper py-20 sm:py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1480px] gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-16">
        {/* Real campus photography */}
        <div className="order-2 grid grid-cols-2 gap-3 sm:gap-4 lg:order-1 lg:self-start lg:sticky lg:top-28" data-fade>
          {PHOTOS.map((p, i) => (
            <figure
              key={p.src}
              className={`group relative overflow-hidden rounded-2xl border border-deep/10 bg-soft ${
                i === 0 ? "col-span-2 aspect-[16/10]" : "aspect-[4/5]"
              }`}
            >
              <Image
                src={p.src}
                alt={p.alt}
                fill
                sizes={i === 0 ? "(min-width: 1024px) 45vw, 100vw" : "(min-width: 1024px) 22vw, 50vw"}
                className="object-cover saturate-[0.9] transition-transform duration-700 [transition-timing-function:var(--ease-out)] group-hover:scale-[1.04]"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-obsidian/70 via-obsidian/5 to-transparent"
              />
              <figcaption className="absolute bottom-3 left-3 right-3 font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-white sm:bottom-4 sm:left-4 sm:text-[11px]">
                {p.caption}
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="order-1 lg:order-2">
          <SectionHeading
            id="learning-title"
            eyebrow="Why The Prime Step"
            title={
              <>
                A classroom where you <span className="text-brand">actually build things.</span>
              </>
            }
            lead="Students choose us for one simple reason: they don't just listen to lectures — they practise, build and get their doubts cleared until things make sense."
          />

          <ol className="mt-10 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {WHY_US.map((item, i) => (
              <li
                key={item.title}
                className="group relative border-t border-pale py-6 transition-colors duration-300 hover:border-brand"
                data-fade
              >
                <span className="inline-flex items-center gap-2 font-mono text-xs font-semibold text-brand">
                  <span className="grid size-6 place-items-center rounded-full bg-soft transition-colors duration-300 group-hover:bg-brand group-hover:text-paper">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
                <h3 className="mt-3 text-lg font-semibold tracking-tight text-deep transition-colors duration-300 group-hover:text-brand">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-deep/80">{item.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
