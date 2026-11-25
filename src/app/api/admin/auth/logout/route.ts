import { NextResponse } from "next/server";
import { clearSessionCookie } from "@/lib/certificates/auth";

export async function POST() {
  const response = NextResponse.json({ ok: true }, { status: 200 });
  clearSessionCookie(response);
  return response;
}
