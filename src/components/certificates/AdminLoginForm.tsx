"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import Logo from "@/components/ui/Logo";

export default function AdminLoginForm({
  authConfigured,
  dbConfigured,
}: {
  authConfigured: boolean;
  dbConfigured: boolean;
}) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      const data = await res.json();

      if (!res.ok || !data.ok) {
        setError(data.error || "Sign in failed. Check your credentials.");
        setSubmitting(false);
        return;
      }

      router.refresh();
    } catch {
      setError("Network error while signing in. Please try again.");
      setSubmitting(false);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-canvas px-4 py-12">
      <div className="w-full max-w-md rounded-[16px] border border-hairline bg-surface p-6 shadow-[var(--elevation-1)] sm:p-8">
        <div className="flex flex-col items-center text-center">
          <Logo height={50} variant="color" />
          <h1 className="display mt-5 text-2xl text-ink">The Prime Step Admin</h1>
          <p className="mt-1.5 text-sm text-ink-muted">
            Sign in with your administrator credentials to manage leads, reviews, and certificates.
          </p>
        </div>

        {(!authConfigured || !dbConfigured) && (
          <div className="mt-5 rounded-[8px] border border-status-warning/40 bg-status-warning/[0.07] p-3.5 text-xs leading-relaxed text-ink">
            <strong className="font-semibold text-status-warning">Environment setup required:</strong>{" "}
            {!authConfigured && "Set ADMIN_USERNAME, ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET. "}
            {!dbConfigured && "Set MONGODB_URI and MONGODB_DB_NAME. "}
            See <code className="font-mono">.env.example</code>.
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="admin-username"
              className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted"
            >
              Username
            </label>
            <input
              id="admin-username"
              name="username"
              type="text"
              required
              autoComplete="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-hairline bg-canvas px-3.5 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
            />
          </div>

          <div>
            <label
              htmlFor="admin-password"
              className="block text-xs font-semibold uppercase tracking-[0.06em] text-ink-muted"
            >
              Password
            </label>
            <input
              id="admin-password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5 min-h-[44px] w-full rounded-[8px] border border-hairline bg-canvas px-3.5 text-sm text-ink focus:border-accent focus:bg-surface focus:outline-none"
            />
          </div>

          {error && (
            <div
              role="alert"
              className="rounded-[8px] border border-status-danger/35 bg-status-danger/[0.06] px-3.5 py-2.5 text-xs font-medium text-status-danger"
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={submitting || !authConfigured}
            className="press-scale min-h-[46px] w-full rounded-full bg-accent px-5 text-sm font-semibold text-accent-ink hover:bg-accent-hover disabled:opacity-50"
          >
            {submitting ? "Signing in..." : "Sign in"}
          </button>
        </form>

        <div className="mt-6 flex items-center justify-between border-t border-hairline pt-4 text-xs text-ink-muted">
          <Link href="/verify-certificate" className="font-medium text-accent hover:underline">
            ← Public Verification Page
          </Link>
          <Link href="/" className="hover:text-ink">
            Website Home
          </Link>
        </div>
      </div>
    </main>
  );
}
