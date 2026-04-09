import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "src/db/schema.prisma",

  datasource: {
    provider: "sqlite",
    url: "file:./therabuddy.db",
  },

  migrations: {
    path: "prisma/migrations",
  },
});