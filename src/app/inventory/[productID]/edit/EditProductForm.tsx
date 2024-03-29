"use client";

import SubmitButton from "@/components/SubmitButton";
import { Product } from "@/core/models/products";
import { Supplier } from "@/core/models/suppliers";
import { getClientAPICaller } from "@/lib/api-caller/client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  product: Product;
  suppliers: Supplier[];
};

export default function EditProductForm({ product, suppliers }: Props) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: product.name,
      price: product.price,
      quantity: product.quantity,
    },
  });

  const handleSubmit = form.handleSubmit(async (values) => {
    try {
      const api = getClientAPICaller();
      await api.inventory["update-inventory"].$post({
        form: {
          productID: String(product.id),
          name: values.name,
          price: String(values.price),
          quantity: String(values.quantity),
        },
      });
      router.push(`/inventory/${product.id}`);
      router.refresh();
      router.prefetch("/inventory");
    } catch (err) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("An unknown error occured while submitting the form.");
      }
    }
  });

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name
        <input type="name" required {...form.register("name")} />
      </label>
      <label>
        Price
        <input type="number" min="0" required {...form.register("price")} />
      </label>
      <label>
        Quantity
        <input type="number" min="0" required {...form.register("quantity")} />
      </label>
      <label>
        Supplier
        <select name="supplierID" required>
          {suppliers.map((supplier) => (
            <option key={supplier.id} value={supplier.id}>
              {supplier.name}
            </option>
          ))}
        </select>
      </label>
      <SubmitButton className="secondary">Save product details</SubmitButton>
    </form>
  );
}
