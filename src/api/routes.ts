import { Hono } from "hono";
import { inventory } from "./routes/inventory";
import { Variables } from ".";

export const routes = new Hono<{ Variables: Variables }>().route(
  "/inventory",
  inventory
);
