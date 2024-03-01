import EditProductForm from "./EditProductForm";
import Link from "next/link";
import { getServerAPICaller } from "@/lib/api-caller/server";

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
      <Link href={`/inventory/${product.id}`} className="mb-4 inline-block">
        Back to product page
      </Link>
      <h1>Edit Product</h1>
      <EditProductForm product={product} />
    </main>
  );
}
