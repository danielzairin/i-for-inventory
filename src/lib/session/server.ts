import { decode } from "hono/jwt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Our session is equivalent to the jwt payload
function getJWTPayload() {
  const jwtCookie = cookies().get("jwt");
  const { value } = jwtCookie || {};
  if (!value) {
    return null;
  }
  return decode(value).payload as { username: string; permissions: number };
}

export function getSession() {
  const jwtPayload = getJWTPayload();
  return jwtPayload;
}

export function mustGetSession() {
  const session = getSession();
  if (!session) {
    redirect(
      `/auth/login?${new URLSearchParams({
        message: "You must be logged in to perform that action.",
      })}`
    );
  }
  return session;
}
