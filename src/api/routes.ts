import { Hono } from "hono";
import { inventory } from "./routes/inventory";
import { Variables } from ".";
import { auth } from "./routes/auth";

export const routes = new Hono<{ Variables: Variables }>()
  .route("/inventory", inventory)
  .route("/auth", auth);
