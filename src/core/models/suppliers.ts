import { InferSelectModel } from "drizzle-orm";
import { DB, td } from "@/core/db";

export type Supplier = InferSelectModel<typeof td.suppliers>;

export class Suppliers {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  findMany(...params: Parameters<typeof this.db.query.suppliers.findMany>) {
    return this.db.query.suppliers.findMany(...params);
  }
}
