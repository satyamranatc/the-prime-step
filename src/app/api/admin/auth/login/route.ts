import { NextResponse } from "next/server";
import { z } from "zod";
import {
  createSessionToken,
  isAuthConfigured,
  setSessionCookie,
  verifyAdminCredentials,
} from "@/lib/certificates/auth";
import { checkRateLimit, getClientIp } from "@/lib/certificates/rateLimit";

const loginSchema = z.object({
  username: z.string().trim().min(1, "Username is required.").max(80),
  password: z.string().min(1, "Password is required.").max(200),
});

export async function POST(request: Request) {
  if (!isAuthConfigured()) {
    return NextResponse.json(
      {
        ok: false,
        error: "Admin authentication is not configured. Set ADMIN_USERNAME, ADMIN_PASSWORD_HASH, and ADMIN_SESSION_SECRET.",
      },
      { status: 503 },
    );
  }

  // Strict login rate limit: 10 attempts per 15 minutes per IP
  const ip = getClientIp(request);
  const rl = checkRateLimit(`admin-login:${ip}`, 10, 15 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many login attempts. Please wait 15 minutes and try again.",
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  try {
    const body = await request.json();
    const parsed = loginSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid credentials." },
        { status: 400 },
      );
    }

    const adminId = verifyAdminCredentials(parsed.data.username, parsed.data.password);
    if (!adminId) {
      return NextResponse.json(
        { ok: false, error: "Invalid username or password." },
        { status: 401 },
      );
    }

    const token = createSessionToken(adminId);
    const response = NextResponse.json({ ok: true, adminId }, { status: 200 });
    setSessionCookie(response, token);
    return response;
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process login request." },
      { status: 400 },
    );
  }
}
