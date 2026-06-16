import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
import Database from "better-sqlite3";
import path from "path";

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

function createPrismaClient() {
  // Strip the "file:" prefix from DATABASE_URL to get the actual file path
  const dbUrl = process.env.DATABASE_URL ?? "file:./therabuddy.db";
  const dbPath = dbUrl.startsWith("file:") ? dbUrl.slice(5) : dbUrl;
  const resolvedPath = path.isAbsolute(dbPath)
    ? dbPath
    : path.join(process.cwd(), dbPath);

  const sqlite = new Database(resolvedPath);
  sqlite.pragma("journal_mode = WAL");

  const adapter = new PrismaBetterSqlite3({
    url: resolvedPath,
  });

  return new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
