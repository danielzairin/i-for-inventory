import { api } from "@/lib/api-client";

export default async function Home() {
  const res = await api.inventory.$get();

  if (!res.ok) {
    throw Error(`failed to fetch inventory, status: ${res.status}`);
  }

  const data = await res.text();

  return (
    <main>
      <p>Hello, world</p>
      <pre>{data}</pre>
    </main>
  );
}
