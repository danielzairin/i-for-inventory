import { Hono } from "hono";
import { Variables } from "..";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";

export const inventory = new Hono<{ Variables: Variables }>()
  // List products
  .get("/", async (c) => {
    const { m } = c.var;

    const products = await m.products.findMany({});

    return c.json(products);
  })

  // Get a product
  .get(
    "/:productID",
    validator("param", (value, c) => {
      const parsed = z
        .object({
          productID: z.coerce.number(),
        })
        .safeParse(value);

      if (!parsed.success) {
        throw new HTTPException(400, { message: parsed.error.message });
      }

      return parsed.data;
    }),
    async (c) => {
      const { m } = c.var;
      const { productID } = c.req.valid("param");

      const product = await m.products.findFirst({
        where: (p, { eq }) => eq(p.id, productID),
      });

      if (!product) {
        throw new HTTPException(404);
      }

      return c.json(product);
    }
  )

  // Add a product
  .post(
    "/add-inventory",
    validator("form", (value, c) => {
      const parsed = z
        .object({
          name: z.string().min(1),
          price: z.coerce.number().min(0),
          quantity: z.coerce.number().min(0),
          supplierID: z.coerce.number(),
        })
        .strip()
        .safeParse(value);

      if (!parsed.success) {
        throw new HTTPException(400, { message: parsed.error.message });
      }

      return parsed.data;
    }),
    async (c) => {
      const { m } = c.var;
      const data = c.req.valid("form");

      const product = await m.products.createOne(data);

      return c.json(product, 201);
    }
  )

  // Update a product
  .post(
    "/update-inventory",
    validator("form", (value, c) => {
      const parsed = z
        .object({
          productID: z.coerce.number(),
          name: z.string().min(1).optional(),
          price: z.coerce.number().min(0).optional(),
          quantity: z.coerce.number().min(0).optional(),
          supplierID: z.coerce.number().optional(),
        })
        .strip()
        .safeParse(value);

      if (!parsed.success) {
        throw new HTTPException(400, { message: parsed.error.message });
      }

      return parsed.data;
    }),
    async (c) => {
      const { m } = c.var;
      const data = c.req.valid("form");
      const { productID, ...updates } = data;

      const product = await m.products.updateOne(productID, updates);

      return c.json(product);
    }
  )

  // Delete a product
  .post(
    "/delete-inventory",
    validator("form", (value, c) => {
      const parsed = z
        .object({
          productID: z.coerce.number(),
        })
        .safeParse(value);

      if (!parsed.success) {
        throw new HTTPException(400, { message: parsed.error.message });
      }

      return parsed.data;
    }),
    async (c) => {
      const { m } = c.var;
      const { productID } = c.req.valid("form");

      await m.products.deleteOne(productID);

      return c.newResponse(null, 204);
    }
  );
