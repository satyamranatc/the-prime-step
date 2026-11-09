import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/content";

export default function NotFound() {
  return (
    <div className="flex min-h-[100svh] flex-col justify-between bg-paper px-6 py-12 md:px-12 text-deep">
      <header className="mx-auto flex w-full max-w-[1480px] items-center justify-between">
        <Link href="/" aria-label="Return to The Prime Step homepage">
          <Logo height={64} />
        </Link>
        <Link
          href="/"
          className="text-xs font-semibold uppercase tracking-wider text-brand hover:underline"
        >
          ← Back to Homepage
        </Link>
      </header>

      <main className="mx-auto my-auto max-w-2xl text-center py-12">
        <span className="eyebrow text-brand">404 Error · Page Not Found</span>
        <h1 className="display mt-4 text-5xl md:text-7xl font-bold tracking-tight text-deep">
          Every journey begins with a step.
        </h1>
        <p className="mt-6 text-base md:text-lg text-deep/70 leading-relaxed">
          The page or resource you are looking for has been relocated or doesn&apos;t exist. Let&apos;s guide you back to the right path.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="rounded-full bg-deep px-8 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand"
          >
            Go to Homepage
          </Link>
          <Link
            href="/roadmap/python"
            className="rounded-full border border-deep/20 bg-soft px-8 py-3.5 text-sm font-semibold text-deep transition-all hover:border-brand hover:text-brand"
          >
            Explore 3D Roadmaps
          </Link>
          <a
            href={SITE.phoneHref}
            className="rounded-full border border-pale bg-paper px-8 py-3.5 text-sm font-semibold text-deep/80 transition-all hover:border-brand"
          >
            Call Support: {SITE.phoneDisplay}
          </a>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-[1480px] flex-wrap items-center justify-between gap-4 border-t border-pale/60 pt-6 text-xs text-deep/60">
        <span>© {SITE.name} 2026. All rights reserved.</span>
        <span>{SITE.city}</span>
      </footer>
    </div>
  );
}
