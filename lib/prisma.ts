import { PrismaClient } from "@/app/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

/**
 * Without DATABASE_URL the public site serves the static content in content/*.ts
 * (see lib/content-queries.ts), and DB-only features (contact leads, analytics) switch off.
 */
export const isDatabaseConfigured = Boolean(process.env.DATABASE_URL);

// Reuse a single PrismaClient across hot reloads in dev to avoid exhausting connections.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

function createClient() {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
  return new PrismaClient({ adapter });
}

export const prisma = globalForPrisma.prisma ?? createClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
