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

export const users = sqliteTable("users", {
  username: text("username").primaryKey(),
});

export const privateData = sqliteTable("privateData", {
  id: integer("id", { mode: "number" }).primaryKey({ autoIncrement: true }),
  username: text("username")
    .references(() => users.username, {
      onDelete: "cascade",
    })
    .notNull(),
  password: text("password").notNull(),
  permissions: integer("permissions", { mode: "number" }).notNull(),
});
