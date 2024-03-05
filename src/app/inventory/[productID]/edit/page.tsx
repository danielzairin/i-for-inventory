import EditProductForm from "./EditProductForm";
import Link from "next/link";
import { getServerAPICaller } from "@/lib/api-caller/server";
import { hasPermission, PERMISSION } from "@/core/permissions";
import { mustGetSession } from "@/lib/session/server";
import { noPermissionRedirect } from "@/lib/utils/server";
import { Suppliers } from "@/core/models/suppliers";
import { db } from "@/core/db";

export const dynamic = "force-dynamic";

type Props = {
  params: {
    productID: string;
  };
};

export default async function Page({ params }: Props) {
  const session = mustGetSession();
  if (!hasPermission(session.permissions, PERMISSION.UPDATE_PRODUCT)) {
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

  const supplierModel = new Suppliers(db);
  const suppliers = await supplierModel.query.findMany({});

  return (
    <main className="container">
      <Link href={`/inventory/${product.id}`} className="mb-4 inline-block">
        Back to product page
      </Link>
      <h1>Edit Product</h1>
      <EditProductForm product={product} suppliers={suppliers} />
    </main>
  );
}
