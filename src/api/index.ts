import { Hono } from "hono";
import { routes } from "./routes";
import { logger } from "hono/logger";

export type Variables = {};

export function createAPIApp(basePath: string) {
  const app = new Hono<{ Variables: Variables }>().basePath(basePath);

  app.use(logger());

  app.route("/", routes);

  return app;
}

export function createRequestHandler(basePath: string) {
  const app = createAPIApp(basePath);

  const requestHandler = (req: Request) => {
    return app.fetch(req);
  };

  return requestHandler;
}

export type AppType = typeof routes;
