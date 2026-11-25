import type { ObjectId } from "mongodb";

export type CertificateStatus = "valid" | "revoked";

export interface CertificateDoc {
  _id?: ObjectId;
  certificateId: string;
  studentName: string;
  course: string;
  courseDuration: string;
  issueDate: Date;
  status: CertificateStatus;
  createdAt: Date;
  updatedAt: Date;
  revokedAt: Date | null;
  revocationReason: string | null;
  revokedBy?: string | null;
}

/** Public-only fields returned by GET /api/certificates/verify (no internal/private data). */
export interface PublicCertificatePayload {
  certificateId: string;
  studentName: string;
  course: string;
  courseDuration: string;
  issueDate: string; // YYYY-MM-DD
  status: CertificateStatus;
  revokedAt: string | null;
  instituteName: "The Prime Step";
  instituteLocation: "Indore, Madhya Pradesh, India";
}

export interface AdminCertificateItem {
  id: string;
  certificateId: string;
  studentName: string;
  course: string;
  courseDuration: string;
  issueDate: string; // YYYY-MM-DD
  status: CertificateStatus;
  createdAt: string;
  updatedAt: string;
  revokedAt: string | null;
  revocationReason: string | null;
  revokedBy: string | null;
}

export type AuditAction =
  | "certificate.created"
  | "certificate.edited"
  | "certificate.revoked"
  | "certificate.reinstated"
  | "certificate.bulk_imported";

export interface AuditLogDoc {
  _id?: ObjectId;
  action: AuditAction;
  certificateId: string | null;
  batchId: string | null;
  adminId: string;
  timestamp: Date;
  summary: string;
}

export interface AuditLogItem {
  id: string;
  action: AuditAction;
  certificateId: string | null;
  batchId: string | null;
  adminId: string;
  timestamp: string;
  summary: string;
}

export interface CsvValidatedRow {
  rowNumber: number;
  certificateId: string;
  studentName: string;
  course: string;
  courseDuration: string;
  issueDate: string; // normalized YYYY-MM-DD
}

export interface CsvRejectedRow {
  rowNumber: number;
  certificateId: string;
  studentName: string;
  course: string;
  courseDuration: string;
  issueDate: string;
  category: "duplicate_in_file" | "duplicate_in_db" | "invalid";
  reason: string;
}

export interface CsvImportPreview {
  totalRows: number;
  validCount: number;
  duplicateCount: number;
  invalidCount: number;
  validRecords: CsvValidatedRow[];
  rejectedRecords: CsvRejectedRow[];
}

export interface CsvImportCommitResult {
  batchId: string;
  importedCount: number;
  duplicatesSkipped: number;
  invalidCount: number;
  rejectedRecords: CsvRejectedRow[];
}
