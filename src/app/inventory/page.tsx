import FilterForm from "./FilterForm";
import Link from "next/link";
import SortableTableHeaders from "./SortableTableHeaders";
import { getServerAPICaller } from "@/lib/api-caller/server";
import { mustGetSession } from "@/lib/session/server";
import { PERMISSION, hasPermission } from "@/core/permissions";
import { noPermissionRedirect } from "@/lib/utils/server";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    name?: string;
    min_price?: string;
    max_price?: string;
    sort_field?: string;
    sort_direction?: string;
  };
};

export default async function Page({ searchParams }: Props) {
  const session = mustGetSession();
  if (!hasPermission(session.permissions, PERMISSION.READ_PRODUCT)) {
    noPermissionRedirect();
  }

  const api = getServerAPICaller();
  const res = await api.inventory.$get({ query: searchParams });

  if (!res.ok) {
    throw Error(`failed to fetch inventory, status: ${res.status}`);
  }

  const products = await res.json();

  return (
    <main className="container">
      <Link href="/" className="inline-block mb-4">
        Back to home page
      </Link>
      <h1>Inventory 📦</h1>
      <details>
        <summary>
          <span>Filters 🔍</span>
        </summary>
        <FilterForm />
      </details>
      <div className="flex justify-between items-center">
        <p className="italic my-4">
          Tip: Click the table headers to sort by field.
        </p>
        <Link href="/inventory/add-inventory">Add a product</Link>
      </div>
      <table>
        <thead>
          <SortableTableHeaders />
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>{product.price}</td>
              <td>{product.quantity}</td>
              <td className="flex gap-3">
                <Link href={`/inventory/${product.id}`} prefetch={false}>
                  View
                </Link>
                <Link href={`/inventory/${product.id}/edit`} prefetch={false}>
                  Edit
                </Link>
                <Link href={`/inventory/${product.id}/delete`} prefetch={false}>
                  Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
