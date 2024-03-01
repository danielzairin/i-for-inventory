"use server";

import { api } from "@/lib/api-client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteAction = async (formData: FormData) => {
  "use server";
  await api.inventory["delete-inventory"].$post({
    form: {
      productID: formData.get("productID")?.toString() || "",
    },
  });
  revalidatePath("/inventory");
  redirect("/inventory");
};
