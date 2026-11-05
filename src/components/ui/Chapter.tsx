/** Small chapter marker that anchors each scene in the narrative. */
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
      className={`eyebrow flex items-center gap-4 ${dark ? "text-pale" : "text-brand"}`}
      data-fade
    >
      <span>Chapter {n}</span>
      <span className={`h-px w-12 ${dark ? "bg-pale/60" : "bg-brand/40"}`} />
      <span>{title}</span>
    </div>
  );
}

