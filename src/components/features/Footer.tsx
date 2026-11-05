import Logo from "@/components/ui/Logo";
import { BRANCHES, DISCIPLINES, SITE, mapsLink } from "@/lib/content";

/** Closing footer — continues the deep-teal horizon of Chapter 06. */
export default function Footer() {
  return (
    <footer className="bg-deep text-paper" aria-label="Site footer">
      <div className="mx-auto max-w-[1480px] overflow-hidden px-6 pt-20 md:px-10 md:pt-28">
        <div className="grid gap-14 border-t border-pale/30 pt-14 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Logo height={110} variant="light" />
            <p className="mt-4 max-w-xs text-pale">
              IT training &amp; skill development institute in {SITE.city}.
            </p>
          </div>

          <div>
            <h2 className="eyebrow text-pale">Contact</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={SITE.phoneHref} className="underline-offset-4 hover:underline">
                  {SITE.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${SITE.email}`} className="break-all underline-offset-4 hover:underline">
                  {SITE.email}
                </a>
              </li>
              <li>
                <a href={SITE.url} className="underline-offset-4 hover:underline">
                  theprimestep.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-pale">Branches</h2>
            <ul className="mt-5 space-y-3">
              {BRANCHES.map((b) => (
                <li key={b.name}>
                  <a
                    href={mapsLink(b.address)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline-offset-4 hover:underline"
                  >
                    {b.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="eyebrow text-pale">Programs</h2>
            <ul className="mt-5 space-y-3">
              {DISCIPLINES.slice(0, 6).map((d) => (
                <li key={d.id}>{d.title}</li>
              ))}
            </ul>
          </div>
        </div>

        <p
          aria-hidden="true"
          className="display mt-16 text-[19vw] leading-[0.95] text-brand select-none md:mt-24"
        >
          Prime Step
        </p>
      </div>
      <div className="relative bg-brand/40">
        <div className="mx-auto flex max-w-[1480px] flex-wrap justify-between gap-2 px-6 py-5 text-sm text-pale md:px-10">
          <span>© {SITE.name}. All rights reserved.</span>
          <span>{SITE.city}</span>
        </div>
      </div>
    </footer>
  );
}
