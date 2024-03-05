"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

export default function SortableTableHeaders() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currSortedField = searchParams.get("sort_field");
  const currSortedDirection = searchParams.get("sort_direction");

  const handleSort = (
    field: "id" | "name" | "price" | "quantity" | "supplierID"
  ) => {
    const newSearchParams = new URLSearchParams(searchParams);

    if (currSortedField === field) {
      if (currSortedDirection === "asc") {
        newSearchParams.set("sort_direction", "desc");
        router.replace(`${pathname}?${newSearchParams}`);
        return;
      }
      newSearchParams.delete("sort_field");
      newSearchParams.delete("sort_direction");
      router.replace(`${pathname}?${newSearchParams}`);
      return;
    }

    newSearchParams.set("sort_field", field);
    newSearchParams.set("sort_direction", "asc");
    router.replace(`${pathname}?${newSearchParams}`);
  };

  const SortedIcon = () => {
    if (currSortedDirection === "asc") {
      return "☝️";
    }
    if (currSortedDirection === "desc") {
      return "👇";
    }
    return;
  };

  return (
    <tr>
      <th onClick={() => handleSort("id")} className="cursor-pointer">
        ID {currSortedField === "id" && <SortedIcon />}
      </th>
      <th onClick={() => handleSort("name")} className="cursor-pointer">
        Name {currSortedField === "name" && <SortedIcon />}
      </th>
      <th onClick={() => handleSort("price")} className="cursor-pointer">
        Price {currSortedField === "price" && <SortedIcon />}
      </th>
      <th onClick={() => handleSort("quantity")} className="cursor-pointer">
        Quantity {currSortedField === "quantity" && <SortedIcon />}
      </th>
      <th onClick={() => handleSort("supplierID")} className="cursor-pointer">
        Supplier {currSortedField === "supplierID" && <SortedIcon />}
      </th>
      <th>Actions</th>
    </tr>
  );
}
