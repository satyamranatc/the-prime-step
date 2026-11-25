"use client";

import { useCallback, useEffect, useState, type FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Logo from "@/components/ui/Logo";
import { SITE } from "@/lib/content";
import type { PublicCertificatePayload } from "@/lib/certificates/types";

type VerifyUiState =
  | { status: "idle" }
  | { status: "loading"; queriedId: string }
  | { status: "verified"; certificate: PublicCertificatePayload }
  | { status: "revoked"; certificate: PublicCertificatePayload }
  | { status: "not_found"; message: string; queriedId: string }
  | { status: "invalid"; message: string }
  | { status: "error"; message: string; queriedId: string };

function formatDisplayDate(isoDate: string): string {
  const d = new Date(`${isoDate}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return isoDate;
  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(d);
}

export default function VerifyCertificateClient() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const urlId = searchParams.get("id") || "";

  const [inputId, setInputId] = useState(urlId);
  const [result, setResult] = useState<VerifyUiState>({ status: "idle" });

  const runVerification = useCallback(async (rawId: string, updateUrl = false) => {
    const cleaned = rawId.trim().toUpperCase().replace(/\s+/g, "");
    if (!cleaned) {
      setResult({
        status: "invalid",
        message: "Please enter a certificate ID (for example: TPS-2026-000123).",
      });
      return;
    }

    if (updateUrl) {
      router.replace(`/verify-certificate?id=${encodeURIComponent(cleaned)}`, {
        scroll: false,
      });
    }

    setResult({ status: "loading", queriedId: cleaned });

    try {
      const res = await fetch(
        `/api/certificates/verify?id=${encodeURIComponent(cleaned)}`,
        { cache: "no-store" },
      );
      const data = await res.json();

      if (res.ok && data.ok && data.certificate) {
        if (data.state === "revoked" || data.certificate.status === "revoked") {
          setResult({ status: "revoked", certificate: data.certificate });
        } else {
          setResult({ status: "verified", certificate: data.certificate });
        }
        return;
      }

      if (data.state === "not_found" || res.status === 404) {
        setResult({
          status: "not_found",
          queriedId: cleaned,
          message:
            data.error ||
            `No certificate matching "${cleaned}" was found in The Prime Step records.`,
        });
        return;
      }

      if (data.state === "invalid" || res.status === 400) {
        setResult({
          status: "invalid",
          message: data.error || "Invalid certificate ID format.",
        });
        return;
      }

      setResult({
        status: "error",
        queriedId: cleaned,
        message:
          data.error ||
          "We could not complete verification right now. Please try again shortly.",
      });
    } catch {
      setResult({
        status: "error",
        queriedId: cleaned,
        message:
          "Network error while contacting the verification server. Please check your connection and try again.",
      });
    }
  }, [router]);

  useEffect(() => {
    if (!urlId.trim()) return;
    const normalized = urlId.trim().toUpperCase();
    const id = window.setTimeout(() => {
      setInputId(normalized);
      void runVerification(normalized, false);
    }, 0);
    return () => window.clearTimeout(id);
  }, [urlId, runVerification]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    void runVerification(inputId, true);
  };

  return (
    <div className="mx-auto max-w-2xl px-4 sm:px-6">
      {/* Official Header */}
      <div className="text-center">
        <div className="mb-5 flex justify-center">
          <Logo height={56} variant="color" />
        </div>
        <h1 className="display text-3xl text-ink sm:text-4xl">
          Certificate Verification
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
          Verify the authenticity of certificates issued by The Prime Step. Results are fetched live from our official institute records.
        </p>
      </div>

      {/* Verification Search Card */}
      <div className="mt-8 rounded-[16px] border border-hairline bg-surface p-5 shadow-[var(--elevation-1)] sm:p-7">
        <form onSubmit={handleSubmit} noValidate>
          <label
            htmlFor="certificate-id-input"
            className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted"
          >
            Certificate ID
          </label>

          <div className="mt-2 flex flex-col gap-3 sm:flex-row">
            <input
              id="certificate-id-input"
              name="certificateId"
              type="text"
              autoComplete="off"
              spellCheck={false}
              value={inputId}
              onChange={(e) => setInputId(e.target.value)}
              placeholder="e.g. TPS-2026-000123"
              className="font-mono min-h-[48px] flex-1 rounded-[8px] border border-hairline bg-canvas px-4 text-sm font-medium uppercase tracking-wider text-ink placeholder:font-sans placeholder:normal-case placeholder:tracking-normal placeholder:text-ink-muted/65 focus:border-accent focus:bg-surface focus:outline-none"
            />
            <button
              type="submit"
              disabled={result.status === "loading"}
              className="press-scale inline-flex min-h-[48px] shrink-0 items-center justify-center rounded-full bg-accent px-6 text-sm font-semibold text-accent-ink hover:bg-accent-hover disabled:opacity-60"
            >
              {result.status === "loading" ? "Verifying..." : "Verify Certificate"}
            </button>
          </div>
        </form>

        <p className="mt-3.5 text-xs leading-relaxed text-ink-muted">
          <strong className="font-semibold text-ink">Where to find your ID:</strong>{" "}
          The Certificate ID (format{" "}
          <span className="font-mono font-medium text-ink">TPS-YYYY-XXXXXX</span>) is
          printed near the bottom corner or beside the QR code on your certificate.
        </p>
      </div>

      {/* Verification Result Region */}
      <div className="mt-6" aria-live="polite">
        {/* LOADING */}
        {result.status === "loading" && (
          <div className="rounded-[16px] border border-hairline bg-surface p-6 sm:p-7">
            <div className="flex items-center gap-3">
              <span className="size-4 animate-spin rounded-full border-2 border-hairline border-t-accent" />
              <p className="text-sm font-medium text-ink">
                Checking official records for{" "}
                <span className="font-mono font-semibold">{result.queriedId}</span>...
              </p>
            </div>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="h-12 animate-pulse rounded-[8px] bg-canvas" />
              <div className="h-12 animate-pulse rounded-[8px] bg-canvas" />
              <div className="h-12 animate-pulse rounded-[8px] bg-canvas" />
              <div className="h-12 animate-pulse rounded-[8px] bg-canvas" />
            </div>
          </div>
        )}

        {/* VERIFIED */}
        {result.status === "verified" && (
          <article className="panel-in overflow-hidden rounded-[16px] border border-status-success/35 bg-surface shadow-[var(--elevation-1)]">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-status-success/20 bg-status-success/[0.07] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="grid size-7 place-items-center rounded-full bg-status-success text-sm font-bold text-white"
                >
                  ✓
                </span>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.08em] text-status-success">
                    VERIFIED
                  </span>
                  <p className="text-xs text-ink-muted">
                    Authentic certificate confirmed in The Prime Step registry
                  </p>
                </div>
              </div>
              <span className="font-mono rounded-[4px] border border-status-success/25 bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
                {result.certificate.certificateId}
              </span>
            </div>

            <dl className="grid gap-x-6 gap-y-5 p-5 sm:grid-cols-2 sm:p-7">
              <div className="sm:col-span-2">
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                  Student Name
                </dt>
                <dd className="mt-1 text-xl font-bold text-ink sm:text-2xl">
                  {result.certificate.studentName}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                  Course Name
                </dt>
                <dd className="mt-1 text-sm font-semibold text-ink sm:text-base">
                  {result.certificate.course}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                  Course Duration
                </dt>
                <dd className="tabular-nums mt-1 text-sm font-semibold text-ink sm:text-base">
                  {result.certificate.courseDuration}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                  Issue Date
                </dt>
                <dd className="tabular-nums mt-1 text-sm font-semibold text-ink sm:text-base">
                  {formatDisplayDate(result.certificate.issueDate)}
                </dd>
              </div>

              <div>
                <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                  Certificate ID
                </dt>
                <dd className="font-mono mt-1 text-sm font-semibold text-ink">
                  {result.certificate.certificateId}
                </dd>
              </div>

              <div className="border-t border-hairline pt-4 sm:col-span-2 sm:flex sm:items-center sm:justify-between">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                    Issuing Institute
                  </dt>
                  <dd className="mt-0.5 text-sm font-semibold text-ink">
                    {result.certificate.instituteName} — {result.certificate.instituteLocation}
                  </dd>
                </div>
              </div>
            </dl>
          </article>
        )}

        {/* REVOKED */}
        {result.status === "revoked" && (
          <article className="panel-in overflow-hidden rounded-[16px] border border-status-danger/40 bg-surface">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-status-danger/20 bg-status-danger/[0.07] px-5 py-4 sm:px-7">
              <div className="flex items-center gap-2.5">
                <span
                  aria-hidden="true"
                  className="grid size-7 place-items-center rounded-full bg-status-danger text-sm font-bold text-white"
                >
                  !
                </span>
                <div>
                  <span className="inline-block text-xs font-bold uppercase tracking-[0.08em] text-status-danger">
                    CERTIFICATE REVOKED
                  </span>
                  <p className="text-xs text-ink-muted">
                    This certificate is no longer valid according to institute records.
                  </p>
                </div>
              </div>
              <span className="font-mono rounded-[4px] border border-status-danger/30 bg-surface px-2.5 py-1 text-xs font-semibold text-ink">
                {result.certificate.certificateId}
              </span>
            </div>

            <div className="p-5 sm:p-7">
              <dl className="grid gap-4 text-sm sm:grid-cols-2">
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                    Student Name
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">
                    {result.certificate.studentName}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                    Course
                  </dt>
                  <dd className="mt-1 font-semibold text-ink">{result.certificate.course}</dd>
                </div>
                <div>
                  <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                    Original Issue Date
                  </dt>
                  <dd className="tabular-nums mt-1 font-medium text-ink">
                    {formatDisplayDate(result.certificate.issueDate)}
                  </dd>
                </div>
                {result.certificate.revokedAt && (
                  <div>
                    <dt className="text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted">
                      Revoked On
                    </dt>
                    <dd className="tabular-nums mt-1 font-semibold text-status-danger">
                      {formatDisplayDate(result.certificate.revokedAt)}
                    </dd>
                  </div>
                )}
              </dl>

              <p className="mt-5 border-t border-hairline pt-4 text-xs leading-relaxed text-ink-muted">
                For clarification regarding this revocation, contact The Prime Step administration at{" "}
                <a href={SITE.phoneHref} className="font-semibold text-ink underline">
                  {SITE.phoneDisplay}
                </a>{" "}
                or{" "}
                <a href={`mailto:${SITE.email}`} className="font-semibold text-ink underline">
                  {SITE.email}
                </a>
                .
              </p>
            </div>
          </article>
        )}

        {/* NOT FOUND */}
        {result.status === "not_found" && (
          <div className="panel-in rounded-[16px] border border-status-warning/35 bg-surface p-5 sm:p-7">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-status-warning">
              Certificate Not Found
            </p>
            <p className="mt-2 text-sm leading-relaxed text-ink">{result.message}</p>
            <p className="mt-3 text-xs leading-relaxed text-ink-muted">
              Double-check the spelling and hyphens of your Certificate ID (for example,{" "}
              <span className="font-mono font-semibold text-ink">TPS-2026-000123</span>). If you believe this is an error, reach out to our campus desk at{" "}
              <a href={SITE.phoneHref} className="font-semibold text-ink underline">
                {SITE.phoneDisplay}
              </a>
              .
            </p>
          </div>
        )}

        {/* INVALID INPUT */}
        {result.status === "invalid" && (
          <div className="panel-in rounded-[16px] border border-hairline bg-surface p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-status-danger">
              Invalid Certificate ID
            </p>
            <p className="mt-1.5 text-sm text-ink">{result.message}</p>
          </div>
        )}

        {/* NETWORK / SERVER ERROR */}
        {result.status === "error" && (
          <div className="panel-in rounded-[16px] border border-status-danger/35 bg-surface p-5 sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.08em] text-status-danger">
              Verification Temporarily Unavailable
            </p>
            <p className="mt-1.5 text-sm text-ink">{result.message}</p>
            <button
              type="button"
              onClick={() => void runVerification(result.queriedId, false)}
              className="mt-4 inline-flex min-h-[40px] items-center rounded-[8px] border border-hairline bg-canvas px-4 text-xs font-semibold text-ink hover:border-ink"
            >
              Try again
            </button>
          </div>
        )}
      </div>

      {/* Employer & Verification Note */}
      <div className="mt-8 border-t border-hairline pt-6 text-center text-xs leading-relaxed text-ink-muted">
        Recruiters and HR teams needing written academic verification can email{" "}
        <a href={`mailto:${SITE.email}`} className="font-semibold text-ink hover:underline">
          {SITE.email}
        </a>{" "}
        or call{" "}
        <a href={SITE.phoneHref} className="tabular-nums font-semibold text-ink hover:underline">
          {SITE.phoneDisplay}
        </a>
        .
      </div>
    </div>
  );
}
