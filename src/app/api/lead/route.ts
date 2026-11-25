import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { z } from "zod";
import { isMongoConfigured } from "@/lib/certificates/mongodb";
import { checkRateLimit, getClientIp } from "@/lib/certificates/rateLimit";
import { getLeadsCollection } from "@/lib/admin/collections";
import { normalizeCampusLabel } from "@/lib/admin/validation";
import type { LeadUtm } from "@/lib/admin/types";

const publicLeadSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(120),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .max(30)
    .regex(/^[+\d\s()-]+$/, "Phone number contains invalid characters."),
  email: z.string().trim().max(160).optional().default(""),
  course: z.string().trim().max(120).optional().default(""),
  campus: z.string().trim().max(120).optional().default("Vijay Nagar (Shagun Tower)"),
  background: z.string().trim().max(120).optional().default(""),
  message: z.string().trim().max(1500).optional().default(""),
  page: z.string().trim().max(300).optional().default(""),
  website: z.string().max(100).optional().default(""), // Honeypot trap for bots
  utm: z
    .object({
      utm_source: z.string().trim().max(100).optional(),
      utm_medium: z.string().trim().max(100).optional(),
      utm_campaign: z.string().trim().max(120).optional(),
      utm_term: z.string().trim().max(100).optional(),
      utm_content: z.string().trim().max(100).optional(),
    })
    .optional()
    .default({}),
});

export async function POST(request: Request) {
  // Block cross-site CSRF spam
  if (request.headers.get("sec-fetch-site") === "cross-site") {
    return NextResponse.json(
      { ok: false, error: "Invalid request origin." },
      { status: 403 },
    );
  }

  // Cap payload size to 16 KB to prevent memory/DoS abuse
  const contentLength = Number(request.headers.get("content-length") || "0");
  if (contentLength > 16_384) {
    return NextResponse.json(
      { ok: false, error: "Request payload too large." },
      { status: 413 },
    );
  }

  // Rate limit: 8 inquiries per 15 minutes per IP
  const ip = getClientIp(request);
  const rl = checkRateLimit(`public-lead:${ip}`, 8, 15 * 60_000);
  if (!rl.allowed) {
    return NextResponse.json(
      {
        ok: false,
        error: "Too many submissions. Please wait a few minutes or call us directly.",
      },
      { status: 429, headers: { "Retry-After": String(rl.retryAfterSec) } },
    );
  }

  try {
    const body = await request.json();
    const parsed = publicLeadSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          ok: false,
          error: parsed.error.issues[0]?.message || "Name and valid phone number are required.",
        },
        { status: 400 },
      );
    }

    // Silent honeypot drop: bots filling hidden `website` field get 200 without polluting DB
    if (parsed.data.website.trim().length > 0) {
      return NextResponse.json({ ok: true, leadId: `lead_${Date.now()}` });
    }

    const now = new Date();
    const leadId = `lead_${Date.now()}`;
    const safeUtm: LeadUtm = parsed.data.utm || {};

    const record = {
      id: leadId,
      createdAt: now.toISOString(),
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email,
      course: parsed.data.course,
      campus: normalizeCampusLabel(parsed.data.campus),
      background: parsed.data.background,
      message: parsed.data.message,
      page: parsed.data.page,
      utm: safeUtm,
    };

    // Primary persistence: MongoDB Atlas leads collection (powers /admin/leads CRM)
    if (isMongoConfigured()) {
      try {
        const leads = await getLeadsCollection();
        await leads.insertOne({
          leadId,
          name: record.name,
          phone: record.phone,
          email: record.email,
          course: record.course,
          campus: record.campus,
          background: record.background,
          message: record.message,
          page: record.page,
          utm: safeUtm,
          status: "new",
          notes: "",
          assignedTo: "",
          createdAt: now,
          updatedAt: now,
        });
      } catch (err) {
        console.error("[TPS_LEAD_MONGO_ERROR]", err);
      }
    }

    // Secondary backup: local NDJSON cache (dev/self-hosted) or structured log
    try {
      const tmpDir = path.join(process.cwd(), ".next", "cache");
      await fs.mkdir(tmpDir, { recursive: true });
      await fs.appendFile(
        path.join(tmpDir, "leads.ndjson"),
        JSON.stringify(record) + "\n",
        "utf8",
      );
    } catch {
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
      { status: 500 },
    );
  }
}
