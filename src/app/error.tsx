"use client";

import { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/content";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log client error securely without leaking sensitive information
    if (process.env.NODE_ENV === "development") {
      console.error("Runtime client error:", error);
    }
  }, [error]);

  return (
    <div className="flex min-h-[100svh] flex-col justify-between bg-paper px-6 py-12 md:px-12 text-deep">
      <header className="mx-auto flex w-full max-w-[1480px] items-center justify-between">
        <Link href="/" aria-label="Return to The Prime Step homepage">
          <Logo height={64} />
        </Link>
      </header>

      <main className="mx-auto my-auto max-w-xl text-center py-12">
        <span className="eyebrow text-brand">System Notice</span>
        <h1 className="display mt-4 text-4xl md:text-6xl font-bold tracking-tight text-deep">
          Something unexpected occurred.
        </h1>
        <p className="mt-5 text-sm md:text-base text-deep/75 leading-relaxed">
          We encountered a temporary technical glitch. You can retry loading this view, or connect directly with our campus desk.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => reset()}
            className="rounded-full bg-deep px-8 py-3.5 text-sm font-semibold text-paper transition-all hover:bg-brand cursor-pointer"
          >
            Try Again
          </button>
          <Link
            href="/"
            className="rounded-full border border-deep/20 bg-soft px-8 py-3.5 text-sm font-semibold text-deep transition-all hover:border-brand hover:text-brand"
          >
            Return to Homepage
          </Link>
          <a
            href={SITE.whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-brand/30 bg-paper px-6 py-3.5 text-sm font-semibold text-brand transition-all hover:bg-brand hover:text-paper"
          >
            Chat on WhatsApp
          </a>
        </div>
      </main>

      <footer className="mx-auto flex w-full max-w-[1480px] flex-wrap items-center justify-between gap-4 border-t border-pale/60 pt-6 text-xs text-deep/60">
        <span>© {SITE.name} 2026. All rights reserved.</span>
        <span>Helpline: {SITE.phoneDisplay}</span>
      </footer>
    </div>
  );
}
