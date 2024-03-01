import { test, expect } from "vitest";
import { createAPIApp } from "..";
import { Products } from "@/core/models/products";
import { db } from "@/core/db";
import { faker } from "@faker-js/faker";

const products = new Products(db);
const app = createAPIApp("/api", products);

test("GET /inventory", async () => {
  const res = await app.request("/api/inventory", { method: "GET" });
  expect(res.status).toBe(200);
});

test("GET /inventory/:productID", async () => {
  const res = await app.request("/api/inventory/1", { method: "GET" });
  expect(res.status).toBe(200);
});

test("POST /inventory/add-inventory", async () => {
  const data = {
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 1000, max: 10000 }),
    quantity: faker.number.int({ min: 0, max: 10 }),
    supplierID: 1,
  };

  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, String(value));
  }

  const res = await app.request(`/api/inventory/add-inventory`, {
    method: "POST",
    body: formData,
  });

  expect(res.status).toBe(201);
});

test("POST /inventory/update-inventory", async () => {
  const data = {
    productID: 1,
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 1000, max: 10000 }),
    quantity: faker.number.int({ min: 0, max: 10 }),
    supplierID: 1,
  };

  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, String(value));
  }

  const res = await app.request("/api/inventory/update-inventory", {
    method: "POST",
    body: formData,
  });

  expect(res.status).toBe(200);
});

test("POST /inventory/delete-inventory", async () => {
  const formData = new FormData();
  formData.append("productID", "13");

  const res = await app.request("/api/inventory/delete-inventory", {
    method: "POST",
    body: formData,
  });

  expect(res.status).toBe(204);
});
