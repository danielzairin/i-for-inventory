import { InferSelectModel } from "drizzle-orm";
import { DB, td } from "@/core/db";

export type Supplier = InferSelectModel<typeof td.suppliers>;

export class Suppliers {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  get query() {
    return this.db.query.suppliers;
  }
}
