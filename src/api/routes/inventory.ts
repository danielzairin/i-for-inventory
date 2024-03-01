import { Hono } from "hono";
import { Variables } from "..";
import { HTTPException } from "hono/http-exception";
import { validator } from "hono/validator";
import { z } from "zod";
import { SQL } from "drizzle-orm";
import { PERMISSION, hasPermission } from "@/core/permissions";

export const inventory = new Hono<{ Variables: Variables }>()
  // Require user to be logged in
  .use(async (c, next) => {
    const user = c.get("user");
    if (!user) {
      throw new HTTPException(401);
    }

    await next();
  })

  // List products
  .get(
    "/",
    validator("query", (value, c) => {
      const parsed = z
        .object({
          ["name"]: z.string().optional(),
          ["min_price"]: z.coerce.number().optional(),
          ["max_price"]: z.coerce.number().optional(),
          ["sort_field"]: z
            .enum(["id", "name", "price", "quantity"])
            .optional(),
          ["sort_direction"]: z.enum(["asc", "desc"]).optional(),
        })
        .safeParse(value);

      if (!parsed.success) {
        throw new HTTPException(400, { message: parsed.error.message });
      }

      return parsed.data;
    }),
    async (c) => {
      const { m } = c.var;
      const q = c.req.valid("query");

      const products = await m.products.findMany({
        where: (p, { like, lte, gte, and }) => {
          const conditions: SQL[] = [];
          if (q.name) conditions.push(like(p.name, `%${q.name}%`));
          if (q.min_price) conditions.push(gte(p.price, q.min_price));
          if (q.max_price) conditions.push(lte(p.price, q.max_price));
          return and(...conditions);
        },
        orderBy: (p, order) => {
          if (!(q.sort_field && q.sort_direction)) {
            return [];
          }
          return order[q.sort_direction](p[q.sort_field]);
        },
      });

      return c.json(products);
    }
  )

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
      const { m, user } = c.var;
      const data = c.req.valid("form");

      if (!hasPermission(user!.permissions, PERMISSION.CREATE_PRODUCT)) {
        throw new HTTPException(403);
      }

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
