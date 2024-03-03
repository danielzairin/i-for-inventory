"use client";

import { AppType } from "@/api";
import { hc } from "hono/client";

export function getClientAPICaller() {
  if (!process.env.NEXT_PUBLIC_BASE_URL) {
    throw Error("missing environment variable: NEXT_PUBLIC_BASE_URL");
  }

  const apiCaller = hc<AppType>(`${process.env.NEXT_PUBLIC_BASE_URL}/api`);

  return apiCaller;
}
