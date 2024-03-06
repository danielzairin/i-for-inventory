import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { createClient } from "@libsql/client";

if (!process.env.DATABASE_URL) {
  throw Error("missing environment variable: DATABASE_URL");
}

if (process.env.NODE_ENV === "production" && !process.env.DATABASE_AUTH_TOKEN) {
  throw Error("missing environment variable: DATABASE_AUTH_TOKEN");
}

const dbClient = createClient({
  url: process.env.DATABASE_URL,
  authToken: process.env.DATABASE_AUTH_TOKEN,
});

export const db = drizzle(dbClient, { schema });

export type DB = typeof db;

export { schema as td };
