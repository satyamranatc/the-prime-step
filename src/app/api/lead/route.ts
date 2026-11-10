import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      name = "",
      phone = "",
      email = "",
      course = "",
      campus = "Vijay Nagar (Shagun Tower)",
      background = "",
      message = "",
      utm = {},
      page = "",
    } = body ?? {};

    if (!name.trim() || !phone.trim()) {
      return NextResponse.json(
        { ok: false, error: "Name and phone number are required." },
        { status: 400 }
      );
    }

    const record = {
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString(),
      name: String(name).trim(),
      phone: String(phone).trim(),
      email: String(email).trim(),
      course: String(course).trim(),
      campus: String(campus).trim(),
      background: String(background).trim(),
      message: String(message).trim(),
      page: String(page).trim(),
      utm,
    };

    // Persist lead locally in tmp/leads.ndjson when writable, and forward to webhook if configured
    try {
      const tmpDir = path.join(process.cwd(), ".next", "cache");
      await fs.mkdir(tmpDir, { recursive: true });
      await fs.appendFile(
        path.join(tmpDir, "leads.ndjson"),
        JSON.stringify(record) + "\n",
        "utf8"
      );
    } catch {
      // Serverless read-only fallback: structured stdout log for Vercel / cloud log drains
      console.info("[TPS_LEAD_CAPTURED]", JSON.stringify(record));
    }

    const webhookUrl = process.env.LEAD_WEBHOOK_URL;
    if (webhookUrl) {
      await fetch(webhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(record),
      }).catch(() => null);
    }

    return NextResponse.json({ ok: true, leadId: record.id });
  } catch {
    return NextResponse.json(
      { ok: false, error: "Unable to process lead submission." },
      { status: 500 }
    );
  }
}

