import { PrismaClient } from "@prisma/client";
import { PrismaLibSql } from "@prisma/adapter-libsql";

const globalForPrisma = globalThis as unknown as {
  prisma_v4?: PrismaClient;
};

function createPrisma() {
  const url = process.env.DATABASE_URL || "file:./therabuddy.db";
  const adapter = new PrismaLibSql({ url });
  return new PrismaClient({ adapter } as any);
}

export const prisma = globalForPrisma.prisma_v4 ?? createPrisma();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma_v4 = prisma;
}