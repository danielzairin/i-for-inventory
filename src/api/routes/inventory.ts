import { Hono } from "hono";
import { Variables } from "..";
import { HTTPException } from "hono/http-exception";

export const inventory = new Hono<{ Variables: Variables }>()
  // List products
  .get("/", async (c) => {
    const { m } = c.var;

    const prods = await m.products.findMany({});

    return c.json(prods);
  })

  // Get a product
  .get("/:productID", async (c) => {
    const { m } = c.var;

    const prod = await m.products.findFirst({});
    if (!prod) {
      throw new HTTPException(404);
    }

    return c.json(prod);
  })

  // Add a product
  .post("/add-inventory", async (c) => {
    return c.text("TODO: Add product to inventory");
  })

  // Update a product
  .post("/update-inventory", async (c) => {
    return c.text("TODO: Update a product");
  })

  // Delete a product
  .post("/delete-inventory", async (c) => {
    return c.text("TODO: Delete a product");
  });
