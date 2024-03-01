"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";

type FormValues = {
  name: string;
  min_price: string;
  max_price: string;
};

export default function FilterForm() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const form = useForm<FormValues>({
    defaultValues: {
      name: searchParams.get("name") || "",
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
    },
  });

  const handleSubmit = form.handleSubmit((values) => {
    const newSearchParams = new URLSearchParams(searchParams);
    for (const [key, value] of Object.entries(values)) {
      if (!value) {
        newSearchParams.delete(key);
        continue;
      }
      newSearchParams.set(key, value);
    }
    router.replace(`${pathname}?${newSearchParams}`);
  });

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <h4>Name</h4>
        <label>
          Contains
          <input
            type="text"
            placeholder="rubber"
            autoComplete="off"
            {...form.register("name")}
          />
        </label>
      </div>
      <div>
        <h4>Price</h4>
        <div className="grid grid-cols-2 gap-4">
          <label>
            Minimum
            <input
              type="number"
              placeholder="0"
              {...form.register("min_price")}
            />
          </label>
          <label>
            Maximum
            <input type="number" {...form.register("max_price")} />
          </label>
        </div>
      </div>
      <button className="secondary" type="submit">
        Apply filter
      </button>
    </form>
  );
}
