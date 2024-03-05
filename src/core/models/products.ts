import { DB, td } from "@/core/db";
import { InferSelectModel, eq } from "drizzle-orm";

export type Product = InferSelectModel<typeof td.products>;

export class Products {
  private db: DB;

  constructor(db: DB) {
    this.db = db;
  }

  get query() {
    return this.db.query.products;
  }

  async createOne(
    data: Pick<Product, "name" | "price" | "quantity" | "supplierID">
  ): Promise<Product> {
    return this.db.insert(td.products).values(data).returning().get();
  }

  async updateOne(
    productID: Product["id"],
    data: Partial<Pick<Product, "name" | "price" | "quantity" | "supplierID">>
  ): Promise<Product> {
    return this.db
      .update(td.products)
      .set(data)
      .where(eq(td.products.id, productID))
      .returning()
      .get();
  }

  async deleteOne(productID: Product["id"]): Promise<Product | undefined> {
    return this.db
      .delete(td.products)
      .where(eq(td.products.id, productID))
      .returning()
      .get();
  }
}
