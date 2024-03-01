import "dotenv/config";
import { db, td } from "@/core/db";
import { SQLiteInsertValue } from "drizzle-orm/sqlite-core";
import { faker } from "@faker-js/faker";

const NUM_PRODUCTS = 1000;

db.insert(td.suppliers)
  .values({
    id: 1,
    name: faker.company.name(),
  })
  .run();

const productValues: SQLiteInsertValue<typeof td.products>[] = [];

for (let i = 0; i < NUM_PRODUCTS; i++) {
  productValues.push({
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 10, max: 1000 }),
    quantity: faker.number.int({ min: 0, max: 10 }),
    supplierID: 1,
  });
}

db.insert(td.products).values(productValues).run();
