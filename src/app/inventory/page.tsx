import FilterForm from "./FilterForm";
import Link from "next/link";
import SortableTableHeaders from "./SortableTableHeaders";
import { getServerAPICaller } from "@/lib/api-caller/server";
import { mustGetSession } from "@/lib/session/server";
import { PERMISSION, hasPermission } from "@/core/permissions";
import { noPermissionRedirect } from "@/lib/utils/server";
import { Pagination } from "./Pagination";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: {
    name?: string;
    min_price?: string;
    max_price?: string;
    sort_field?: string;
    sort_direction?: string;
    offset?: string;
  };
};

const ITEMS_PER_PAGE = 25;

export default async function Page({ searchParams }: Props) {
  const session = mustGetSession();
  if (!hasPermission(session.permissions, PERMISSION.READ_PRODUCT)) {
    noPermissionRedirect();
  }

  const api = getServerAPICaller();
  const res = await api.inventory.$get({
    query: {
      ...searchParams,
      limit: ITEMS_PER_PAGE.toString(),
    },
  });

  if (!res.ok) {
    throw Error(`failed to fetch inventory, status: ${res.status}`);
  }

  const products = await res.json();

  return (
    <main className="px-8">
      <div className="flex gap-4">
        <Link href="/" className="inline-block mb-4">
          Back to home page
        </Link>
        <Link href="/auth/login" className="inline-block mb-4">
          Change account
        </Link>
      </div>
      <h1>Inventory 📦</h1>
      <div className="flex gap-4">
        <div className="self-start sticky top-8 min-w-fit">
          <p>Filters 🔍</p>
          <FilterForm />
        </div>
        <div className="flex-1">
          <div className="flex justify-between items-end">
            <p className="italic">
              Tip: Click the table headers to sort by field.
            </p>
            <Link role="button" href="/inventory/add-inventory">
              Add a product
            </Link>
          </div>
          <table className="my-4 min-w-max striped">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div
            className="sticky bottom-0 right-0 left-0 py-4"
            style={{ backgroundColor: "var(--pico-background-color)" }}
          >
            <Pagination
              itemsPerPage={ITEMS_PER_PAGE}
              numItemsNow={products.length}
            />
          </div>
        </div>
      </div>
    </main>
  );
}
