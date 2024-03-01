import { AppType } from "@/api";
import { hc } from "hono/client";

if (!process.env.API_BASE_URL) {
  throw Error("missing environment variable: API_BASE_URL");
}

export const api = hc<AppType>(process.env.API_BASE_URL);
