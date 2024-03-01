"use client";

import { Product } from "@/core/models/products";
import { api } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

type Props = {
  product: Product;
};

export default function EditProductForm({ product }: Props) {
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
        <input
          type="number"
          required
          defaultValue={product.supplierID}
          disabled
        />
      </label>
      <button className="secondary" type="submit">
        Save product details
      </button>
    </form>
  );
}
