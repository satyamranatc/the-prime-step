import { NextResponse } from "next/server";
import type { Filter } from "mongodb";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection } from "@/lib/certificates/mongodb";
import { recordAuditLog } from "@/lib/certificates/audit";
import {
  createCertificateSchema,
  formatDateIso,
  parseIssueDate,
} from "@/lib/certificates/validation";
import type { AdminCertificateItem, CertificateDoc } from "@/lib/certificates/types";

function serializeCert(doc: CertificateDoc): AdminCertificateItem {
  return {
    id: doc._id ? doc._id.toString() : doc.certificateId,
    certificateId: doc.certificateId,
    studentName: doc.studentName,
    course: doc.course,
    courseDuration: doc.courseDuration,
    issueDate: formatDateIso(new Date(doc.issueDate)),
    status: doc.status === "revoked" ? "revoked" : "valid",
    createdAt: new Date(doc.createdAt).toISOString(),
    updatedAt: new Date(doc.updatedAt).toISOString(),
    revokedAt: doc.revokedAt ? new Date(doc.revokedAt).toISOString() : null,
    revocationReason: doc.revocationReason ?? null,
    revokedBy: doc.revokedBy ?? null,
  };
}

function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const col = await getCertificatesCollection();
    const { searchParams } = new URL(request.url);

    const q = (searchParams.get("q") || "").trim();
    const status = (searchParams.get("status") || "all").trim();
    const yearStr = (searchParams.get("year") || "").trim();
    const course = (searchParams.get("course") || "").trim();
    const page = Math.max(1, Number(searchParams.get("page") || "1") || 1);
    const limit = Math.min(100, Math.max(10, Number(searchParams.get("limit") || "25") || 25));

    const filter: Filter<CertificateDoc> = {};

    if (status === "valid" || status === "revoked") {
      filter.status = status;
    }

    if (course && course !== "all") {
      filter.course = course;
    }

    if (yearStr && /^\d{4}$/.test(yearStr)) {
      const y = Number(yearStr);
      filter.issueDate = {
        $gte: new Date(Date.UTC(y, 0, 1)),
        $lt: new Date(Date.UTC(y + 1, 0, 1)),
      };
    }

    if (q) {
      const rx = new RegExp(escapeRegex(q), "i");
      filter.$or = [
        { certificateId: rx },
        { studentName: rx },
        { course: rx },
      ];
    }

    const currentYear = new Date().getUTCFullYear();
    const startOfYear = new Date(Date.UTC(currentYear, 0, 1));
    const startOfNextYear = new Date(Date.UTC(currentYear + 1, 0, 1));

    const [
      items,
      filteredTotal,
      totalCount,
      validCount,
      revokedCount,
      issuedThisYear,
      distinctCourses,
      yearAgg,
    ] = await Promise.all([
      col
        .find(filter)
        .sort({ createdAt: -1, issueDate: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      col.countDocuments(filter),
      col.countDocuments({}),
      col.countDocuments({ status: "valid" }),
      col.countDocuments({ status: "revoked" }),
      col.countDocuments({ issueDate: { $gte: startOfYear, $lt: startOfNextYear } }),
      col.distinct("course"),
      col
        .aggregate<{ _id: number }>([
          { $group: { _id: { $year: "$issueDate" } } },
          { $sort: { _id: -1 } },
        ])
        .toArray(),
    ]);

    return NextResponse.json({
      ok: true,
      stats: {
        total: totalCount,
        valid: validCount,
        revoked: revokedCount,
        issuedThisYear,
        currentYear,
      },
      filters: {
        courses: distinctCourses.filter(Boolean).sort(),
        years: yearAgg.map((y) => y._id).filter((y) => typeof y === "number"),
      },
      pagination: {
        page,
        limit,
        total: filteredTotal,
        totalPages: Math.max(1, Math.ceil(filteredTotal / limit)),
      },
      items: items.map(serializeCert),
    });
  } catch (err) {
    console.error("[TPS_ADMIN_LIST_CERTS_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "Could not load certificates from the database." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  try {
    const body = await request.json();
    const parsed = createCertificateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { ok: false, error: parsed.error.issues[0]?.message || "Invalid certificate data." },
        { status: 400 },
      );
    }

    const parsedDate = parseIssueDate(parsed.data.issueDate);
    if (!parsedDate) {
      return NextResponse.json(
        { ok: false, error: "Invalid issue date." },
        { status: 400 },
      );
    }

    const col = await getCertificatesCollection();

    // Check duplicate before insert (also enforced by MongoDB unique index)
    const existing = await col.findOne(
      { certificateId: parsed.data.certificateId },
      { projection: { _id: 1 } },
    );
    if (existing) {
      return NextResponse.json(
        {
          ok: false,
          error: `Certificate ID "${parsed.data.certificateId}" already exists. Existing records are never overwritten.`,
        },
        { status: 409 },
      );
    }

    const now = new Date();
    const doc: CertificateDoc = {
      certificateId: parsed.data.certificateId,
      studentName: parsed.data.studentName,
      course: parsed.data.course,
      courseDuration: parsed.data.courseDuration,
      issueDate: parsedDate.date,
      status: "valid",
      createdAt: now,
      updatedAt: now,
      revokedAt: null,
      revocationReason: null,
      revokedBy: null,
    };

    const insertRes = await col.insertOne(doc);
    doc._id = insertRes.insertedId;

    await recordAuditLog({
      action: "certificate.created",
      certificateId: doc.certificateId,
      adminId: auth.session.adminId,
      summary: `Created certificate for ${doc.studentName} (${doc.course}, ${doc.courseDuration})`,
    });

    return NextResponse.json(
      { ok: true, certificate: serializeCert(doc) },
      { status: 201 },
    );
  } catch (err: unknown) {
    const code = (err as { code?: number })?.code;
    if (code === 11000) {
      return NextResponse.json(
        { ok: false, error: "A certificate with this ID already exists." },
        { status: 409 },
      );
    }
    console.error("[TPS_ADMIN_CREATE_CERT_ERROR]", err instanceof Error ? err.message : "unknown");
    return NextResponse.json(
      { ok: false, error: "Failed to save certificate." },
      { status: 500 },
    );
  }
}
