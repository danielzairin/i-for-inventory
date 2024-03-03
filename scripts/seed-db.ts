import "dotenv/config";
import { db, td } from "@/core/db";
import { SQLiteInsertValue } from "drizzle-orm/sqlite-core";
import { faker } from "@faker-js/faker";
import * as argon2 from "argon2";

async function main() {
  const NUM_PRODUCTS = 1000;

  const testAccounts = [
    { username: "alpha", permissions: 15 },
    { username: "beta", permissions: 6 },
    { username: "charlie", permissions: 4 },
  ];

  for (const acc of testAccounts) {
    db.insert(td.users)
      .values({
        username: acc.username,
      })
      .run();

    const hashedPassword = await argon2.hash(acc.username, { raw: false });

    db.insert(td.privateData)
      .values({
        username: acc.username,
        hashedPassword,
        permissions: acc.permissions,
      })
      .run();
  }

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
}

main();
