import { expect, test } from "vitest";
import { createAPIApp } from "..";
import { Users } from "@/core/models/users";
import { Products } from "@/core/models/products";
import { db } from "@/core/db";

const products = new Products(db);
const users = new Users(db);
const app = createAPIApp("/api", products, users);

test("POST /login", async () => {
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

  expect(res.status).toBe(200);
});
