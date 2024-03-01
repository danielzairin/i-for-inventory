import { Hono } from "hono";
import { routes } from "./routes";
import { logger } from "hono/logger";
import { Products } from "@/core/models/products";

export type Variables = {
  m: {
    products: Products;
  };
};

export function createAPIApp(basePath: string, products: Products) {
  const app = new Hono<{ Variables: Variables }>().basePath(basePath);

  app.use("*", async (c, next) => {
    c.set("m", { products });
    await next();
  });

  if (process.env.NODE_ENV === "development") {
    app.use(logger());
  }

  app.route("/", routes);

  return app;
}

export function createRequestHandler(basePath: string, products: Products) {
  const app = createAPIApp(basePath, products);

  const requestHandler = (req: Request) => {
    return app.fetch(req);
  };

  return requestHandler;
}

export type AppType = typeof routes;
