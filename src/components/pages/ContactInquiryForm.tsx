"use client";

import { useState, type FormEvent } from "react";
import { BRANCHES, SITE } from "@/lib/content";
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
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
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

    const whatsappUrl = `https://wa.me/919479611441?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
    setSubmitted(true);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-pale bg-soft p-7 md:p-10 shadow-xs"
    >
      <p className="eyebrow text-brand">Instant Demo &amp; Counseling Booking</p>
      <h2 className="display mt-2 text-3xl md:text-4xl text-deep">
        Book your free 2-day demo class.
      </h2>
      <p className="mt-2 text-sm text-deep/75">
        Fill in your details below to connect directly with our Indore admissions counselor on WhatsApp or phone.
      </p>

      <div className="mt-7 space-y-5">
        <div>
          <label htmlFor="inq-name" className="block text-xs font-mono uppercase tracking-wider text-deep/80 mb-2">
            Full Name *
          </label>
          <input
            id="inq-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your full name"
            className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-sm text-deep placeholder:text-deep/40 focus:border-brand focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="inq-phone" className="block text-xs font-mono uppercase tracking-wider text-deep/80 mb-2">
            Mobile / WhatsApp Number *
          </label>
          <input
            id="inq-phone"
            type="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+91 98XXX XXXXX"
            className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-sm text-deep placeholder:text-deep/40 focus:border-brand focus:outline-none"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label htmlFor="inq-course" className="block text-xs font-mono uppercase tracking-wider text-deep/80 mb-2">
              Course Interest
            </label>
            <select
              id="inq-course"
              value={course}
              onChange={(e) => setCourse(e.target.value)}
              className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-sm text-deep focus:border-brand focus:outline-none"
            >
              {COURSE_OPTIONS.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="inq-branch" className="block text-xs font-mono uppercase tracking-wider text-deep/80 mb-2">
              Preferred Indore Campus
            </label>
            <select
              id="inq-branch"
              value={branch}
              onChange={(e) => setBranch(e.target.value)}
              className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-sm text-deep focus:border-brand focus:outline-none"
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
          <label htmlFor="inq-bg" className="block text-xs font-mono uppercase tracking-wider text-deep/80 mb-2">
            Current Background
          </label>
          <select
            id="inq-bg"
            value={background}
            onChange={(e) => setBackground(e.target.value)}
            className="w-full rounded-xl border border-pale bg-paper px-4 py-3 text-sm text-deep focus:border-brand focus:outline-none"
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
          className="inline-flex w-full items-center justify-center gap-2.5 rounded-full bg-brand px-7 py-4 text-sm font-semibold text-white transition-colors hover:bg-deep cursor-pointer"
        >
          <WhatsAppIcon className="size-4 fill-current" />
          <span>Send Inquiry &amp; Book Demo on WhatsApp</span>
        </button>

        {submitted && (
          <p className="rounded-xl border border-brand/30 bg-paper p-3.5 text-center text-xs font-medium text-deep">
            Opening WhatsApp with your demo request! You can also call us directly at{" "}
            <a href={SITE.phoneHref} className="font-semibold text-brand underline">
              {SITE.phoneDisplay}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}

