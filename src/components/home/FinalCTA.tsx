import { SITE } from "@/lib/content";
import Chapter from "@/components/ui/Chapter";
import { Reveal } from "@/components/ui/Motion";
import ContactInquiryForm from "@/components/pages/ContactInquiryForm";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

export default function FinalCTA() {
  return (
    <section
      id="admission"
      aria-labelledby="admission-title"
      className="border-t border-hairline bg-paper py-20 md:py-28"
    >
      <div className="mx-auto max-w-[1380px] px-4 sm:px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
          <Reveal>
            <Chapter n="07" title="Admissions & Free Demo" />
            <h2
              id="admission-title"
              className="display mt-4 text-[clamp(2rem,4vw,3.35rem)] text-ink"
            >
              Book a free 2-day lab demo class in Indore.
            </h2>
            <p className="prose-measure mt-4 text-base leading-relaxed text-ink-muted">
              Sit inside a real classroom at Vijay Nagar, Bhawarkua, or Annapurna, meet your trainer, and review the complete syllabus before making any commitment.
            </p>

            <div className="mt-8 space-y-4 border-t border-hairline pt-6">
              <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <a
                  href={SITE.phoneHref}
                  className="press-scale inline-flex min-h-[48px] w-full items-center justify-center rounded-full bg-ink px-6 text-sm font-semibold text-white hover:bg-brand sm:w-auto"
                >
                  Call {SITE.phoneDisplay}
                </a>
                <a
                  href={SITE.whatsappHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-scale inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full border border-hairline bg-canvas px-6 text-sm font-semibold text-ink hover:border-brand hover:text-brand sm:w-auto"
                >
                  <WhatsAppIcon className="size-4 fill-current text-brand" />
                  <span>WhatsApp Counselor</span>
                </a>
              </div>

              <p className="font-mono text-xs text-ink-subtle">
                Mon – Sat · 8:00 AM – 8:00 PM · Zero-pressure counseling
              </p>
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <div className="rounded-2xl border border-hairline bg-canvas p-6 sm:p-8">
              <ContactInquiryForm />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
