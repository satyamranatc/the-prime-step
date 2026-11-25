import { MongoClient, type Collection, type Db } from "mongodb";
import type { AuditLogDoc, CertificateDoc } from "./types";

declare global {
  var __tpsMongoClientPromise: Promise<MongoClient> | undefined;
  var __tpsCertIndexesReady: boolean | undefined;
}

function getMongoConfig() {
  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB_NAME || "the_prime_step";
  if (!uri) {
    throw new Error("MONGODB_URI is not configured.");
  }
  return { uri, dbName };
}

export async function getMongoClient(): Promise<MongoClient> {
  const { uri } = getMongoConfig();

  if (!globalThis.__tpsMongoClientPromise) {
    const client = new MongoClient(uri, {
      maxPoolSize: 10,
      minPoolSize: 1,
      serverSelectionTimeoutMS: 6000,
      socketTimeoutMS: 20000,
    });
    globalThis.__tpsMongoClientPromise = client.connect().catch((err) => {
      globalThis.__tpsMongoClientPromise = undefined;
      throw err;
    });
  }

  return globalThis.__tpsMongoClientPromise;
}

export async function getDatabase(): Promise<Db> {
  const { dbName } = getMongoConfig();
  const client = await getMongoClient();
  const db = client.db(dbName);

  if (!globalThis.__tpsCertIndexesReady) {
    await ensureIndexes(db);
    globalThis.__tpsCertIndexesReady = true;
  }

  return db;
}

async function ensureIndexes(db: Db) {
  const certificates = db.collection<CertificateDoc>("certificates");
  const auditLogs = db.collection<AuditLogDoc>("certificate_audit_logs");

  await Promise.all([
    certificates.createIndex({ certificateId: 1 }, { unique: true, name: "uniq_certificateId" }),
    certificates.createIndex({ status: 1 }, { name: "idx_status" }),
    certificates.createIndex({ issueDate: -1 }, { name: "idx_issueDate_desc" }),
    certificates.createIndex({ studentName: 1 }, { name: "idx_studentName" }),
    certificates.createIndex({ course: 1 }, { name: "idx_course" }),
    auditLogs.createIndex({ timestamp: -1 }, { name: "idx_audit_timestamp_desc" }),
    auditLogs.createIndex({ certificateId: 1 }, { name: "idx_audit_certificateId" }),
  ]);
}

export async function getCertificatesCollection(): Promise<Collection<CertificateDoc>> {
  const db = await getDatabase();
  return db.collection<CertificateDoc>("certificates");
}

export async function getAuditLogsCollection(): Promise<Collection<AuditLogDoc>> {
  const db = await getDatabase();
  return db.collection<AuditLogDoc>("certificate_audit_logs");
}

export function isMongoConfigured(): boolean {
  return Boolean(process.env.MONGODB_URI);
}
