import { getServerAPICaller } from "@/lib/api-caller/server";
import Link from "next/link";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    productID: string;
  };
};

export default async function Page({ params }: Props) {
  const api = getServerAPICaller();
  const res = await api.inventory[":productID"].$get({
    param: params,
  });

  if (!res.ok) {
    throw Error(`failed to fetch product, status: ${res.status}`);
  }

  const product = await res.json();

  return (
    <main className="container">
      <Link href="/inventory" className="mb-4 inline-block" prefetch={false}>
        Back to Inventory 📦
      </Link>
      <h1>{product.name}</h1>
      <pre className="p-4">{JSON.stringify(product, null, 2)}</pre>
      <div className="flex gap-4">
        <Link href={`/inventory/${product.id}/edit`} prefetch={false}>
          Edit
        </Link>
        <Link href={`/inventory/${product.id}/delete`}>Delete</Link>
      </div>
    </main>
  );
}
