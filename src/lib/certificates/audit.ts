import { getAuditLogsCollection } from "./mongodb";
import type { AuditAction } from "./types";

export async function recordAuditLog(entry: {
  action: AuditAction;
  certificateId?: string | null;
  batchId?: string | null;
  adminId: string;
  summary: string;
}): Promise<void> {
  try {
    const col = await getAuditLogsCollection();
    await col.insertOne({
      action: entry.action,
      certificateId: entry.certificateId ?? null,
      batchId: entry.batchId ?? null,
      adminId: entry.adminId,
      timestamp: new Date(),
      summary: entry.summary,
    });
  } catch (err) {
    // Audit logging failure should be surfaced in server logs without leaking secrets
    console.error("[TPS_AUDIT_LOG_ERROR]", err instanceof Error ? err.message : "unknown");
  }
}
