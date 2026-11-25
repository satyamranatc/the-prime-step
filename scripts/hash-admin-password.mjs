#!/usr/bin/env node
/**
 * Generate a scrypt password hash for ADMIN_PASSWORD_HASH in `.env.local` or Vercel.
 * Usage: node scripts/hash-admin-password.mjs "YourStrongPassword"
 */
import crypto from "crypto";

const password = process.argv[2];
if (!password || password.length < 8) {
  console.error("Usage: node scripts/hash-admin-password.mjs \"<password-at-least-8-chars>\"");
  process.exit(1);
}

const salt = crypto.randomBytes(16);
const key = crypto.scryptSync(password, salt, 64);
console.log(`ADMIN_PASSWORD_HASH=scrypt$${salt.toString("hex")}$${key.toString("hex")}`);
