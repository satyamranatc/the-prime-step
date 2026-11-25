import crypto from "crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "tps_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 12; // 12 hours

export interface AdminSession {
  adminId: string;
  iat: number;
  exp: number;
}

function getSessionSecret(): string {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 16) {
    throw new Error("ADMIN_SESSION_SECRET must be configured (at least 16 characters).");
  }
  return secret;
}

export function isAuthConfigured(): boolean {
  const hasSecret = Boolean(process.env.ADMIN_SESSION_SECRET && process.env.ADMIN_SESSION_SECRET.length >= 16);
  const hasCreds = Boolean(
    process.env.ADMIN_USERNAME &&
      (process.env.ADMIN_PASSWORD_HASH || process.env.ADMIN_PASSWORD),
  );
  return hasSecret && hasCreds;
}

/**
 * Verifies username and password against environment configuration.
 * Supports `ADMIN_PASSWORD_HASH` in `scrypt$<saltHex>$<derivedHex>` format (recommended)
 * or `ADMIN_PASSWORD` for local development.
 */
export function verifyAdminCredentials(username: string, password: string): string | null {
  const expectedUser = process.env.ADMIN_USERNAME?.trim();
  if (!expectedUser) return null;

  const userBuf = Buffer.from(username.trim().toLowerCase(), "utf8");
  const expectedUserBuf = Buffer.from(expectedUser.toLowerCase(), "utf8");
  if (
    userBuf.length !== expectedUserBuf.length ||
    !crypto.timingSafeEqual(userBuf, expectedUserBuf)
  ) {
    return null;
  }

  const storedHash = process.env.ADMIN_PASSWORD_HASH?.trim();
  if (storedHash) {
    const parts = storedHash.split("$");
    if (parts.length !== 3 || parts[0] !== "scrypt") return null;
    const salt = Buffer.from(parts[1], "hex");
    const key = Buffer.from(parts[2], "hex");
    const derived = crypto.scryptSync(password, salt, key.length);
    if (derived.length !== key.length || !crypto.timingSafeEqual(derived, key)) {
      return null;
    }
    return expectedUser;
  }

  const plainPassword = process.env.ADMIN_PASSWORD;
  if (plainPassword) {
    const a = crypto.createHash("sha256").update(password).digest();
    const b = crypto.createHash("sha256").update(plainPassword).digest();
    if (crypto.timingSafeEqual(a, b)) {
      return expectedUser;
    }
  }

  return null;
}

export function hashPasswordScrypt(password: string): string {
  const salt = crypto.randomBytes(16);
  const key = crypto.scryptSync(password, salt, 64);
  return `scrypt$${salt.toString("hex")}$${key.toString("hex")}`;
}

function signPayload(payloadB64: string): string {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(payloadB64)
    .digest("base64url");
}

export function createSessionToken(adminId: string): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: AdminSession = {
    adminId,
    iat: now,
    exp: now + SESSION_TTL_SECONDS,
  };
  const payloadB64 = Buffer.from(JSON.stringify(payload), "utf8").toString("base64url");
  const sig = signPayload(payloadB64);
  return `${payloadB64}.${sig}`;
}

export function verifySessionToken(token: string | undefined): AdminSession | null {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadB64, sig] = parts;

  try {
    const expectedSig = signPayload(payloadB64);
    const sigBuf = Buffer.from(sig, "utf8");
    const expectedBuf = Buffer.from(expectedSig, "utf8");
    if (sigBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(sigBuf, expectedBuf)) {
      return null;
    }

    const decoded = JSON.parse(
      Buffer.from(payloadB64, "base64url").toString("utf8"),
    ) as AdminSession;

    if (!decoded.adminId || typeof decoded.exp !== "number") return null;
    if (decoded.exp <= Math.floor(Date.now() / 1000)) return null;
    return decoded;
  } catch {
    return null;
  }
}

export async function getAdminSession(): Promise<AdminSession | null> {
  const cookieStore = await cookies();
  if (!isAuthConfigured()) return null;
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export function setSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export function clearSessionCookie(response: NextResponse): void {
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: "",
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}

/**
 * Independent server-side authorization + same-origin CSRF check for all admin API routes.
 */
export async function requireAdminApi(
  request: Request,
): Promise<{ session: AdminSession } | { error: NextResponse }> {
  if (!isAuthConfigured()) {
    return {
      error: NextResponse.json(
        { ok: false, error: "Administrator authentication is not configured on this server." },
        { status: 503 },
      ),
    };
  }

  // Same-origin CSRF verification for state-changing requests
  const method = request.method.toUpperCase();
  if (method !== "GET" && method !== "HEAD" && method !== "OPTIONS") {
    const origin = request.headers.get("origin");
    const host = request.headers.get("host");
    if (origin && host) {
      try {
        const originHost = new URL(origin).host;
        if (originHost !== host) {
          return {
            error: NextResponse.json(
              { ok: false, error: "Invalid request origin." },
              { status: 403 },
            ),
          };
        }
      } catch {
        return {
          error: NextResponse.json(
            { ok: false, error: "Invalid request origin." },
            { status: 403 },
          ),
        };
      }
    }
  }

  const session = await getAdminSession();
  if (!session) {
    return {
      error: NextResponse.json(
        { ok: false, error: "Unauthorized. Please sign in as an administrator." },
        { status: 401 },
      ),
    };
  }

  return { session };
}
