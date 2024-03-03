import "dotenv/config";
import { migrate } from "drizzle-orm/libsql/migrator";
import { db } from "@/core/db";

async function main() {
  await migrate(db, { migrationsFolder: "./migrations" });
}

main();
