import { defineConfig } from "drizzle-kit";

if (!process.env.DATABASE_URL) {
  throw Error("missing environment variable: DATABASE_URL");
}

export default defineConfig({
  schema: "./src/core/db/schema.ts",
  driver: "libsql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  verbose: true,
  strict: true,
  out: "./migrations",
});
