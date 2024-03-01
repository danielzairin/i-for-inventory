import { AppType } from "@/api";
import { hc } from "hono/client";

if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
  throw Error("missing environment variable: NEXT_PUBLIC_API_BASE_URL");
}

export const api = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL);
