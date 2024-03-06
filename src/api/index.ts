import { Hono } from "hono";
import { routes } from "./routes";
import { logger } from "hono/logger";
import { Products } from "@/core/models/products";
import { Users } from "@/core/models/users";
import { deleteCookie, getCookie } from "hono/cookie";
import { decode, verify } from "hono/jwt";

export type Variables = {
  m: {
    products: Products;
    users: Users;
  };
  user: {
    username: string;
    permissions: number;
  } | null;
};

export function createAPIApp(
  basePath: string,
  products: Products,
  users: Users
) {
  const app = new Hono<{ Variables: Variables }>().basePath(basePath);

  app.use("*", async (c, next) => {
    c.set("m", { products, users });
    await next();
  });

  app.use("*", async (c, next) => {
    c.set("user", null);

    const jwt = getCookie(c, "jwt");
    if (jwt) {
      try {
        await verify(jwt, process.env.JWT_SECRET!, "HS256");
        const { payload } = decode(jwt);
        c.set("user", {
          username: payload.username,
          permissions: payload.permissions,
        });
      } catch (err) {
        deleteCookie(c, "jwt");
      }
    }

    await next();
  });

  if (process.env.NODE_ENV === "development") {
    app.use(logger());
  }

  app.route("/", routes);

  return app;
}

export function createRequestHandler(
  basePath: string,
  products: Products,
  users: Users
) {
  const app = createAPIApp(basePath, products, users);

  const requestHandler = (req: Request) => {
    return app.fetch(req);
  };

  return requestHandler;
}

export type AppType = typeof routes;
