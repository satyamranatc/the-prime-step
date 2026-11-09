export default function Loading() {
  return (
    <div
      className="flex min-h-[100svh] w-full items-center justify-center bg-paper"
      aria-live="polite"
      aria-label="Loading content"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="size-10 animate-spin rounded-full border-2 border-pale border-t-brand" />
        <span className="font-mono text-xs uppercase tracking-widest text-deep/60">
          Loading The Prime Step...
        </span>
      </div>
    </div>
  );
}

