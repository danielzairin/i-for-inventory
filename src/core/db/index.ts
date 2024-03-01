import { drizzle } from "drizzle-orm/better-sqlite3";
// @ts-expect-error better-sqlite3 types aren't needed
import Database from "better-sqlite3";
import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw Error("missing environment variable: DATABASE_URL");
}

const sqlite = new Database(process.env.DATABASE_URL);

export const db = drizzle(sqlite, { schema });

export type DB = typeof db;

export { schema as td };
