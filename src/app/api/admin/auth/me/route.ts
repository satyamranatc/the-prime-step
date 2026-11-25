import { NextResponse } from "next/server";
import { getAdminSession } from "@/lib/certificates/auth";

export async function GET() {
  const session = await getAdminSession();
  if (!session) {
    return NextResponse.json({ ok: false, authenticated: false }, { status: 401 });
  }
  return NextResponse.json({
    ok: true,
    authenticated: true,
    adminId: session.adminId,
  });
}
