import { Hono } from "hono";
import { Variables } from "..";

export const inventory = new Hono<{ Variables: Variables }>()
  .get("/", async (c) => {
    return c.text("TODO: Get inventory");
  })
  .get("/:productID", async (c) => {
    return c.text("TODO: Get a product by ID");
  })
  .post("/add-inventory", async (c) => {
    return c.text("TODO: Add product to inventory");
  })
  .post("/update-inventory", async (c) => {
    return c.text("TODO: Update a product");
  })
  .post("/delete-inventory", async (c) => {
    return c.text("TODO: Delete a product");
  });
