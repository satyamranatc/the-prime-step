import { BRANCHES, SITE } from "@/lib/content";
import ContactInquiryForm from "@/components/pages/ContactInquiryForm";
import CTA from "@/components/ui/CTA";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

/** Final conversion section: free 2-day demo class booking + direct counselling contacts. */
export default function FinalCTA() {
  return (
    <section
      id="admission"
      aria-labelledby="admission-title"
      className="relative scroll-mt-20 border-t border-pale/60 bg-deep py-20 text-paper sm:py-24 md:py-32"
    >
      <div className="mx-auto grid max-w-[1480px] items-start gap-12 px-4 sm:px-6 md:px-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
        <div className="lg:pt-4" data-fade>
          <p className="eyebrow text-pale">Admissions &amp; Free Counselling</p>
          <h2
            id="admission-title"
            className="display mt-4 text-4xl leading-[0.98] text-paper sm:text-5xl md:text-6xl"
          >
            Try a 2-day demo class. <span className="text-light">Decide after you sit in the lab.</span>
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-pale/90 sm:text-lg">
            Meet our trainers, see how concepts are taught step by step on real machines, and get honest guidance on the right course, fees, and batch timing for your schedule.
          </p>

          <ul className="mt-8 space-y-3 text-sm text-paper/90 sm:text-base">
            <li className="flex items-center gap-3">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-white">
                ✓
              </span>
              <span>Free 1-on-1 career counselling &amp; syllabus walkthrough</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-white">
                ✓
              </span>
              <span>2-day complimentary classroom &amp; lab demo session</span>
            </li>
            <li className="flex items-center gap-3">
              <span className="grid size-5 shrink-0 place-items-center rounded-full bg-brand text-xs text-white">
                ✓
              </span>
              <span>0% interest monthly installment options available</span>
            </li>
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <CTA
              href={SITE.phoneHref}
              label={`Call ${SITE.phoneDisplay}`}
              variant="light"
              className="w-full sm:w-auto justify-center"
            />
            <CTA
              href={SITE.whatsappHref}
              label="WhatsApp Admissions"
              variant="primary"
              icon={<WhatsAppIcon className="size-4 fill-current text-white" />}
              className="w-full sm:w-auto justify-center"
            />
          </div>

          <div className="mt-10 border-t border-pale/20 pt-6 text-xs text-pale/85">
            <span className="font-semibold text-paper">3 Indore Centres:</span>{" "}
            {BRANCHES.map((b) => `${b.name} (${b.landmark})`).join(" · ")}
          </div>
        </div>

        <div data-fade className="text-deep">
          <ContactInquiryForm />
        </div>
      </div>
    </section>
  );
}
