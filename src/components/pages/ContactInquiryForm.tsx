"use client";

import { useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BRANCHES, SITE } from "@/lib/content";
import { EASE_OUT } from "@/components/ui/Motion";
import { WhatsAppIcon } from "@/components/ui/SocialIcons";

const COURSE_OPTIONS = [
  "Java Full Stack Developer",
  "MERN Stack Developer Course",
  "Python Programming & Full Stack",
  "Data Science & AI / Machine Learning",
  "Data Analytics & Power BI",
  "Spoken English & Personality Development",
  "C, C++ & Data Structures (DSA)",
  "Android & Flutter App Development",
  "Tally Prime with GST & Advanced Excel",
  "Corporate / College Training Inquiry",
] as const;

export default function ContactInquiryForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [course, setCourse] = useState<string>(COURSE_OPTIONS[0]);
  const [branch, setBranch] = useState<string>(BRANCHES[0].name);
  const [background, setBackground] = useState("College Student / 12th Pass");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const buildWhatsAppUrl = () => {
    const message = [
      `Hello The Prime Step Admissions Team,`,
      ``,
      `I would like to book a Free Counseling / 2-Day Demo Class:`,
      `• Name: ${name.trim() || "Prospective Student"}`,
      `• Phone: ${phone.trim() || "Not provided"}`,
      `• Course Interest: ${course}`,
      `• Preferred Indore Campus: ${branch}`,
      `• Background: ${background}`,
    ].join("\n");
    return `https://wa.me/919479611441?text=${encodeURIComponent(message)}`;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const whatsappUrl = buildWhatsAppUrl();

    // Open WhatsApp synchronously inside the user gesture so mobile/desktop popup blockers don't block it
    if (typeof window !== "undefined") {
      window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    }

    // Extract UTM parameters for attribution
    const params = new URLSearchParams(typeof window !== "undefined" ? window.location.search : "");
    const utm = {
      utm_source: params.get("utm_source") || "",
      utm_medium: params.get("utm_medium") || "",
      utm_campaign: params.get("utm_campaign") || "",
    };

    try {
      await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        keepalive: true,
        body: JSON.stringify({
          name,
          phone,
          course,
          campus: branch,
          background,
          page: typeof window !== "undefined" ? window.location.pathname : "/contact-us",
          utm,
        }),
      });
    } catch {
      // Even if offline, WhatsApp message is already launched above
    } finally {
      setSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl sm:rounded-3xl border border-pale bg-soft p-5 sm:p-7 md:p-10 shadow-xs"
    >
      <p className="eyebrow text-brand">Instant Demo &amp; Counseling Booking</p>
      <h2 className="display mt-2 text-2xl sm:text-3xl md:text-4xl text-deep">
        Book your free 2-day demo class.
      </h2>
      <p className="mt-2 text-xs sm:text-sm text-deep/80">
        Register your details below. Our Indore admissions counselor will call you to schedule your lab slot, or you can connect immediately on WhatsApp.
      </p>

      <div className="mt-6 sm:mt-7 space-y-4 sm:space-y-5">
        <div>
          <label htmlFor="inq-name" className="block text-xs font-mono font-semibold uppercase tracking-wider text-deep mb-2">
            Full Name *
          </label>
          <input
            id="inq-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-base md:text-sm text-deep placeholder:text-deep/45 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="inq-phone" className="block text-xs font-mono font-semibold uppercase tracking-wider text-deep mb-2">
            Mobile / WhatsApp Number *
          </label>
          <input
            id="inq-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98XXX XXXXX"
            className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-base md:text-sm text-deep placeholder:text-deep/45 focus:border-brand focus:outline-none"
          />
        </div>

        <div className="grid gap-4 sm:gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="inq-course" className="block text-xs font-mono font-semibold uppercase tracking-wider text-deep mb-2">
              Course Interest
            </label>
            <select
              id="inq-course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-base md:text-sm text-deep focus:border-brand focus:outline-none"
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inq-branch" className="block text-xs font-mono font-semibold uppercase tracking-wider text-deep mb-2">
              Preferred Indore Campus
            </label>
            <select
              id="inq-branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-base md:text-sm text-deep focus:border-brand focus:outline-none"
            >
              {BRANCHES.map((b) => (
                <option key={b.name} value={b.name}>
                  {b.name} ({b.tag})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label htmlFor="inq-bg" className="block text-xs font-mono font-semibold uppercase tracking-wider text-deep mb-2">
            Current Background
          </label>
          <select
            id="inq-bg"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-base md:text-sm text-deep focus:border-brand focus:outline-none"
          >
            <option value="College Student / 12th Pass">College Student / 12th Pass</option>
            <option value="Non-IT / Career Switcher">Non-IT / Career Switcher</option>
            <option value="Working Professional">Working Professional</option>
            <option value="Parent Inquiring for Student">Parent Inquiring for Student</option>
            <option value="Corporate / HR Representative">Corporate / HR Representative</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="press-scale inline-flex min-h-[48px] w-full cursor-pointer items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_-8px_rgba(14,110,107,0.5)] transition-all hover:bg-deep disabled:cursor-not-allowed disabled:opacity-65 sm:py-4"
        >
          {submitting && (
            <span
              aria-hidden="true"
              className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
            />
          )}
          <WhatsAppIcon className="size-4 fill-current" />
          <span>{submitting ? "Opening WhatsApp..." : "Book Free Demo on WhatsApp"}</span>
        </button>

        <AnimatePresence>
          {submitted && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3, ease: EASE_OUT }}
              className="space-y-3 rounded-2xl border border-brand/35 bg-paper p-4 shadow-xs sm:p-5"
            >
              <p className="text-sm font-semibold text-deep">
                ✓ Inquiry saved &amp; WhatsApp chat opened for our {branch} counselor.
              </p>
              <p className="text-xs text-deep/75">
                If WhatsApp didn&apos;t open automatically, tap below to send your pre-filled message:
              </p>
              <div className="flex flex-col flex-wrap gap-2.5 pt-1 sm:flex-row">
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="press-scale inline-flex min-h-[44px] w-full items-center justify-center gap-2 rounded-full bg-brand px-4 py-2.5 text-xs font-semibold text-white hover:bg-deep sm:w-auto"
                >
                  <WhatsAppIcon className="size-3.5 fill-current" />
                  <span>Confirm on WhatsApp</span>
                </a>
                <a
                  href={SITE.phoneHref}
                  className="press-scale inline-flex min-h-[44px] w-full items-center justify-center gap-1.5 rounded-full border border-deep/20 px-4 py-2.5 text-xs font-semibold text-deep hover:border-brand sm:w-auto"
                >
                  <span>Call {SITE.phoneDisplay}</span>
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </form>
  );
}
