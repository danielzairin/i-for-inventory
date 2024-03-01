import { test, expect } from "vitest";
import { createAPIApp } from "..";

const app = createAPIApp("/api");

test("GET /inventory", async () => {
  const res = await app.request("/api/inventory", { method: "GET" });
  expect(res.status).toBe(200);
});

test("GET /inventory/:productID", async () => {
  const res = await app.request("/api/inventory/1", { method: "GET" });
  expect(res.status).toBe(200);
});

test("POST /inventory/add-inventory", async () => {
  const res = await app.request("/api/inventory/add-inventory", {
    method: "POST",
  });
  expect(res.status).toBe(200);
});

test("POST /inventory/update-inventory", async () => {
  const res = await app.request("/api/inventory/update-inventory", {
    method: "POST",
  });
  expect(res.status).toBe(200);
});

test("POST /inventory/delete-inventory", async () => {
  const res = await app.request("/api/inventory/delete-inventory", {
    method: "POST",
  });
  expect(res.status).toBe(200);
});
