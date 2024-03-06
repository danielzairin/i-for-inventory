import { test, expect } from "vitest";
import { createAPIApp } from "..";
import { Products } from "@/core/models/products";
import { db } from "@/core/db";
import { faker } from "@faker-js/faker";
import { Users } from "@/core/models/users";

const products = new Products(db);
const users = new Users(db);
const app = createAPIApp("/api", products, users);

const fetchJWT = async () => {
  const res = await app.request("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: "alpha",
      password: "alpha",
    }),
  });

  if (!res.ok) {
    throw Error(`failed to fetch JWT, status: ${res.status}`);
  }

  const { jwt } = await res.json();

  return jwt as string;
};

test("GET /inventory", async () => {
  const jwt = await fetchJWT();
  const res = await app.request("/api/inventory", {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });
  expect(res.status).toBe(200);
});

test("GET /inventory/:productID", async () => {
  const jwt = await fetchJWT();
  const res = await app.request("/api/inventory/1", {
    method: "GET",
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });
  expect(res.status).toBe(200);
});

test("POST /inventory/add-inventory", async () => {
  const data = {
    name: faker.commerce.productName(),
    price: faker.number.int({ min: 10, max: 1000 }),
    quantity: faker.number.int({ min: 0, max: 10 }),
    supplierID: 1,
  };

  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, String(value));
  }

  const jwt = await fetchJWT();
  const res = await app.request(`/api/inventory/add-inventory`, {
    method: "POST",
    body: formData,
    headers: {
      Cookie: `jwt=${jwt}`,
    },
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

  const jwt = await fetchJWT();
  const res = await app.request("/api/inventory/update-inventory", {
    method: "POST",
    body: formData,
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });

  expect(res.status).toBe(200);
});

test("POST /inventory/delete-inventory", async () => {
  const formData = new FormData();
  formData.append("productID", "13");

  const jwt = await fetchJWT();
  const res = await app.request("/api/inventory/delete-inventory", {
    method: "POST",
    body: formData,
    headers: {
      Cookie: `jwt=${jwt}`,
    },
  });

  expect(res.status).toBe(204);
});
