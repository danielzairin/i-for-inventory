import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const suppliers = sqliteTable("suppliers", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
});

export const products = sqliteTable("products", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  price: integer("price", { mode: "number" }).notNull(),
  quantity: integer("quantity", { mode: "number" }).notNull(),
  supplierID: integer("supplier_id", { mode: "number" })
    .references(() => suppliers.id)
    .notNull(),
});
