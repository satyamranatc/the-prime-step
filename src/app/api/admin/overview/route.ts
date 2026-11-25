import { NextResponse } from "next/server";
import { requireAdminApi } from "@/lib/certificates/auth";
import { getCertificatesCollection, isMongoConfigured } from "@/lib/certificates/mongodb";
import {
  getLeadsCollection,
  getReviewsCollection,
} from "@/lib/admin/collections";
import { CAMPUS_OPTIONS } from "@/lib/admin/types";

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"] as const;

export async function GET(request: Request) {
  const auth = await requireAdminApi(request);
  if ("error" in auth) return auth.error;

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { ok: false, error: "MONGODB_URI is not configured." },
      { status: 503 },
    );
  }

  try {
    const [leadsCol, reviewsCol, certsCol] = await Promise.all([
      getLeadsCollection(),
      getReviewsCollection(),
      getCertificatesCollection(),
    ]);

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setHours(0, 0, 0, 0);
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const [
      totalLeads,
      newLeads,
      enrolledLeads,
      totalReviews,
      approvedReviews,
      totalCerts,
      validCerts,
      recentLeadsDocs,
      last7DaysDocs,
      vijayCount,
      bhawarkuaCount,
      annapurnaCount,
    ] = await Promise.all([
      leadsCol.countDocuments(),
      leadsCol.countDocuments({ status: "new" }),
      leadsCol.countDocuments({ status: "enrolled" }),
      reviewsCol.countDocuments(),
      reviewsCol.countDocuments({ approved: true }),
      certsCol.countDocuments(),
      certsCol.countDocuments({ status: "valid" }),
      leadsCol.find({}).sort({ createdAt: -1 }).limit(6).toArray(),
      leadsCol
        .find({ createdAt: { $gte: sevenDaysAgo } }, { projection: { createdAt: 1 } })
        .toArray(),
      leadsCol.countDocuments({ campus: CAMPUS_OPTIONS[0] }),
      leadsCol.countDocuments({ campus: CAMPUS_OPTIONS[1] }),
      leadsCol.countDocuments({ campus: CAMPUS_OPTIONS[2] }),
    ]);

    // Build ordered last-7-days buckets
    const buckets: Array<{ key: string; day: string; count: number }> = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date(sevenDaysAgo);
      d.setDate(sevenDaysAgo.getDate() + i);
      const key = d.toISOString().slice(0, 10);
      buckets.push({ key, day: DAY_LABELS[d.getDay()], count: 0 });
    }
    const bucketMap = new Map(buckets.map((b) => [b.key, b]));
    for (const doc of last7DaysDocs) {
      const key = doc.createdAt.toISOString().slice(0, 10);
      const bucket = bucketMap.get(key);
      if (bucket) bucket.count += 1;
    }

    return NextResponse.json({
      ok: true,
      stats: {
        leads: { total: totalLeads, new: newLeads, enrolled: enrolledLeads },
        reviews: {
          total: totalReviews,
          approved: approvedReviews,
          pending: Math.max(0, totalReviews - approvedReviews),
        },
        certificates: { total: totalCerts, valid: validCerts },
      },
      weeklyLeads: buckets.map(({ day, count }) => ({ day, count })),
      campusBreakdown: [
        {
          campus: "Vijay Nagar",
          subtitle: "Shagun Tower · Main Hub",
          leads: vijayCount,
          phone: "+91 94796 11441",
        },
        {
          campus: "Bhawarkua",
          subtitle: "Indrapuri · Student Hub",
          leads: bhawarkuaCount,
          phone: "+91 91091 83932",
        },
        {
          campus: "Annapurna",
          subtitle: "Annapurna Main Road",
          leads: annapurnaCount,
          phone: "+91 94796 11441",
        },
      ],
      recentLeads: recentLeadsDocs.map((doc) => ({
        id: String(doc._id),
        leadId: doc.leadId,
        name: doc.name,
        phone: doc.phone,
        course: doc.course,
        campus: doc.campus,
        status: doc.status,
        createdAt: doc.createdAt.toISOString(),
      })),
    });
  } catch (err) {
    console.error("[ADMIN_OVERVIEW_ERROR]", err);
    return NextResponse.json(
      { ok: false, error: "Could not load overview metrics." },
      { status: 500 },
    );
  }
}
