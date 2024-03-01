import { getServerAPICaller } from "@/lib/api-caller/server";
import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    message?: string;
  };
};

async function loginAction(formData: FormData) {
  "use server";
  const api = getServerAPICaller();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const res = await api.auth.login.$post({
    json: {
      username,
      password,
    },
  });
  console.log("succ");

  if (!res.ok) {
    throw Error(`Failed to login, status: ${res.status}`);
  }

  const { jwt } = await res.json();

  cookies().set("jwt", jwt);
  redirect("/inventory");
}

export default async function Page({ searchParams }: Props) {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <article className="max-w-[600px]">
        <h1>Login</h1>
        {searchParams.message && (
          <p className="text-red-400">{searchParams.message}</p>
        )}
        <form action={loginAction}>
          <label>
            Username
            <input type="text" name="username" required autoComplete="off" />
          </label>
          <label>
            Password
            <input type="password" name="password" required />
          </label>
          <button type="submit">Login</button>
        </form>
        <Link href="/demo-accounts" className="block text-center">
          View demo accounts
        </Link>
      </article>
    </main>
  );
}
