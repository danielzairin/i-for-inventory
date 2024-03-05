import Link from "next/link";
import { hasPermission, PERMISSION } from "@/core/permissions";
import { mustGetSession } from "@/lib/session/server";
import { noPermissionRedirect } from "@/lib/utils/server";
import { getServerAPICaller } from "@/lib/api-caller/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import SubmitButton from "@/components/SubmitButton";

export const dynamic = "force-dynamic";

async function addProductAction(formData: FormData) {
  "use server";
  const api = getServerAPICaller();
  const res = await api.inventory["add-inventory"].$post({
    form: {
      name: formData.get("name") as string,
      price: formData.get("price") as string,
      quantity: formData.get("quantity") as string,
      supplierID: formData.get("supplierID") as string,
    },
  });

  if (!res.ok) {
    throw Error(`failed to create product, status: ${res.status}`);
  }

  const product = await res.json();

  revalidatePath("/inventory");
  redirect(`/inventory/${product.id}`);
}

export default async function Page() {
  const session = mustGetSession();
  if (!hasPermission(session.permissions, PERMISSION.CREATE_PRODUCT)) {
    noPermissionRedirect();
  }

  return (
    <main className="container">
      <Link href="/inventory" className="mb-4 inline-block">
        Back to Inventory 📦
      </Link>
      <h1>Add Product</h1>
      <form action={addProductAction}>
        <label>
          Name
          <input name="name" type="name" required />
        </label>
        <label>
          Price
          <input name="price" type="number" min="0" required />
        </label>
        <label>
          Quantity
          <input name="quantity" type="number" min="0" required />
        </label>
        <label>
          Supplier ID
          <input name="supplierID" type="number" required value={1} readOnly />
        </label>
        <SubmitButton className="secondary">
          Add product to inventory
        </SubmitButton>
      </form>
    </main>
  );
}
