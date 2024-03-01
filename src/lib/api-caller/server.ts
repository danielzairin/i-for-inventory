import { AppType } from "@/api";
import { hc } from "hono/client";
import { cookies } from "next/headers";

export function getServerAPICaller() {
  if (!process.env.NEXT_PUBLIC_API_BASE_URL) {
    throw Error("missing environment variable: NEXT_PUBLIC_API_BASE_URL");
  }

  const jwtCookie = cookies().get("jwt");
  const jwt = jwtCookie?.value;

  const apiCaller = hc<AppType>(process.env.NEXT_PUBLIC_API_BASE_URL, {
    headers: {
      ...(jwt && { Cookie: `jwt=${jwt}` }),
    },
  });

  return apiCaller;
}
