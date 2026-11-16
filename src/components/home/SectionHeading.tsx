import type { ReactNode } from "react";

/** Consistent section intro: mono eyebrow, display H2, optional lead paragraph. */
export default function SectionHeading({
  id,
  eyebrow,
  title,
  lead,
  dark = false,
  align = "left",
  children,
}: {
  id: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  dark?: boolean;
  align?: "left" | "center";
  children?: ReactNode;
}) {
  const centered = align === "center";
  return (
    <div className={`${centered ? "mx-auto text-center" : ""} max-w-3xl`} data-fade>
      <p className={`eyebrow ${dark ? "text-pale" : "text-brand"}`}>{eyebrow}</p>
      <h2
        id={id}
        className={`display mt-4 text-[2.25rem] leading-[1.02] sm:text-5xl md:text-[3.5rem] ${
          dark ? "text-paper" : "text-deep"
        }`}
      >
        {title}
      </h2>
      {lead && (
        <p
          className={`mt-5 text-base leading-relaxed sm:text-lg ${
            dark ? "text-pale" : "text-deep/80"
          } ${centered ? "mx-auto max-w-2xl" : "max-w-2xl"}`}
        >
          {lead}
        </p>
      )}
      {children}
    </div>
  );
}
