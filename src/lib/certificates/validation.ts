import { z } from "zod";
import { SITE } from "@/lib/content";

/**
 * Supports standard TPS-YYYY-XXXXXX IDs as well as historical IDs imported from
 * earlier institute spreadsheets (4 to 40 uppercase alphanumeric/hyphen chars).
 */
export const CERTIFICATE_ID_REGEX = /^[A-Z0-9][A-Z0-9-]{3,39}$/;

export const MAX_CSV_BYTES = 5 * 1024 * 1024; // 5 MB
export const MAX_CSV_ROWS = 5000;

export const REQUIRED_CSV_HEADERS = [
  "certificateId",
  "studentName",
  "course",
  "courseDuration",
  "issueDate",
] as const;

export function normalizeCertificateId(raw: string): string {
  return raw.trim().toUpperCase().replace(/\s+/g, "");
}

export function isValidCertificateId(id: string): boolean {
  return CERTIFICATE_ID_REGEX.test(id);
}

/**
 * Parses YYYY-MM-DD (preferred) or DD/MM/YYYY / DD-MM-YYYY strictly without
 * silently rolling invalid dates like 2026-02-31 into March.
 */
export function parseIssueDate(raw: string): { date: Date; iso: string } | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let year: number;
  let month: number;
  let day: number;

  const isoMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  const dmyMatch = /^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/.exec(trimmed);

  if (isoMatch) {
    year = Number(isoMatch[1]);
    month = Number(isoMatch[2]);
    day = Number(isoMatch[3]);
  } else if (dmyMatch) {
    day = Number(dmyMatch[1]);
    month = Number(dmyMatch[2]);
    year = Number(dmyMatch[3]);
  } else {
    return null;
  }

  if (year < 2000 || year > 2100 || month < 1 || month > 12 || day < 1 || day > 31) {
    return null;
  }

  const date = new Date(Date.UTC(year, month - 1, day));
  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  const iso = `${String(year).padStart(4, "0")}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return { date, iso };
}

export function formatDateIso(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function buildVerificationUrl(certificateId: string, baseOrigin?: string): string {
  const base = (baseOrigin || process.env.NEXT_PUBLIC_SITE_URL || SITE.url).replace(/\/+$/, "");
  return `${base}/verify-certificate?id=${encodeURIComponent(certificateId)}`;
}

const dateStringSchema = z
  .string()
  .trim()
  .refine((val) => parseIssueDate(val) !== null, {
    message: "Use a valid date in YYYY-MM-DD format (e.g. 2026-10-15).",
  });

export const createCertificateSchema = z.object({
  certificateId: z
    .string()
    .trim()
    .transform(normalizeCertificateId)
    .refine(isValidCertificateId, {
      message: "Certificate ID must be 4–40 characters using letters, numbers, and hyphens (e.g. TPS-2026-000123).",
    }),
  studentName: z.string().trim().min(2, "Student name is required.").max(120),
  course: z.string().trim().min(2, "Course name is required.").max(140),
  courseDuration: z.string().trim().min(1, "Course duration is required.").max(60),
  issueDate: dateStringSchema,
});

export const updateCertificateSchema = z.object({
  studentName: z.string().trim().min(2, "Student name is required.").max(120),
  course: z.string().trim().min(2, "Course name is required.").max(140),
  courseDuration: z.string().trim().min(1, "Course duration is required.").max(60),
  issueDate: dateStringSchema,
});

export const revokeCertificateSchema = z.object({
  reason: z.string().trim().min(3, "Please provide a revocation reason.").max(300),
});

export const reinstateCertificateSchema = z.object({
  reason: z.string().trim().min(3, "Please provide a reinstatement note.").max(300).optional(),
});

/**
 * RFC-4180 compliant CSV parser (handles quoted fields, escaped quotes, BOM, CRLF/LF).
 */
export function parseCsvText(input: string): string[][] {
  const text = input.replace(/^\uFEFF/, "");
  const rows: string[][] = [];
  let row: string[] = [];
  let cell = "";
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];

    if (inQuotes) {
      if (ch === '"' && next === '"') {
        cell += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        cell += ch;
      }
    } else if (ch === '"') {
      inQuotes = true;
    } else if (ch === ",") {
      row.push(cell);
      cell = "";
    } else if (ch === "\r" && next === "\n") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
      i++;
    } else if (ch === "\n" || ch === "\r") {
      row.push(cell);
      rows.push(row);
      row = [];
      cell = "";
    } else {
      cell += ch;
    }
  }

  if (cell.length > 0 || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  // Drop trailing completely empty lines
  return rows.filter((r) => r.some((c) => c.trim().length > 0));
}

/** Escapes CSV values and prevents Excel/Sheets formula injection. */
export function escapeCsvCell(value: string): string {
  const raw = String(value ?? "");
  const safe = /^[=+\-@\t\r]/.test(raw) ? `'${raw}` : raw;
  if (/[",\r\n]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
}
