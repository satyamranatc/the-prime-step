import { SITE } from "@/lib/content";

const ASPECT = 1275 / 770;

/** The Prime Step logo (vector). `light` is the reversed version for deep-teal backgrounds. */
export default function Logo({
  height = 52,
  variant = "color",
  className = "",
  mark = false,
}: {
  height?: number;
  variant?: "color" | "light";
  className?: string;
  mark?: boolean;
}) {
  const file = `/brand/logo-${mark ? "mark" : "full"}${variant === "light" ? "-light" : ""}.svg`;
  const w = Math.round(height * (mark ? 440 / 705 : ASPECT));
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={file}
      alt={mark ? "" : SITE.name}
      width={w}
      height={height}
      decoding="async"
      className={`block select-none ${className}`}
      style={{ height, width: w }}
    />
  );
}
