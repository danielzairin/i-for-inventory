import Link from "next/link";
import { deleteAction } from "./_action";
import { getServerAPICaller } from "@/lib/api-caller/server";
import { hasPermission, PERMISSION } from "@/core/permissions";
import { mustGetSession } from "@/lib/session/server";
import { noPermissionRedirect } from "@/lib/utils/server";
import SubmitButton from "@/components/SubmitButton";

type Props = {
  params: {
    productID: string;
  };
};

export default async function Page({ params }: Props) {
  const session = mustGetSession();
  if (!hasPermission(session.permissions, PERMISSION.DELETE_PRODUCT)) {
    noPermissionRedirect();
  }

  const api = getServerAPICaller();
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
          <SubmitButton className="secondary">Yes, delete</SubmitButton>
        </form>
        <Link href={`/inventory/${product.id}`} className="text-center block">
          No, return to product page
        </Link>
      </article>
    </main>
  );
}
