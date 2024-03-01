import { api } from "@/lib/api-client";
import Link from "next/link";
import { deleteAction } from "./_action";

type Props = {
  params: {
    productID: string;
  };
};

export default async function Page({ params }: Props) {
  const res = await api.inventory[":productID"].$get({
    param: params,
  });

  if (!res.ok) {
    throw Error(`failed to fetch product, status: ${res.status}`);
  }

  const product = await res.json();

  return (
    <main className="flex items-center justify-center min-h-screen">
      <article>
        <h1>Delete Product</h1>
        <p>Are you sure you want to delete this product?</p>
        <pre className="p-4">{JSON.stringify(product, null, 2)}</pre>
        <form action={deleteAction}>
          <input type="hidden" name="productID" defaultValue={product.id} />
          <button className="secondary" type="submit">
            Yes, delete
          </button>
        </form>
        <Link href={`/inventory/${product.id}`} className="text-center block">
          No, return to product page
        </Link>
      </article>
    </main>
  );
}
