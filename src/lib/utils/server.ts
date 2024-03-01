import { redirect } from "next/navigation";

export function authRedirect(message?: string) {
  const searchParams = new URLSearchParams();

  if (message) {
    searchParams.append("message", message);
  }

  return redirect(`/auth/login?${searchParams}`);
}

export function noPermissionRedirect() {
  return authRedirect("You do not have enough permissions.");
}
