/** Architectural section index marker. */
export default function Chapter({
  n,
  title,
  dark = false,
}: {
  n: string;
  title: string;
  dark?: boolean;
}) {
  return (
    <div
      className={`eyebrow inline-flex items-center gap-3 ${
        dark ? "text-light" : "text-brand"
      }`}
    >
      <span className="font-mono">{n}</span>
      <span
        aria-hidden="true"
        className={`h-px w-8 ${dark ? "bg-white/25" : "bg-hairline"}`}
      />
      <span>{title}</span>
    </div>
  );
}
