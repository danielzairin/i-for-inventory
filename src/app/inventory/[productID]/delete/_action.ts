"use server";

import { getServerAPICaller } from "@/lib/api-caller/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const deleteAction = async (formData: FormData) => {
  "use server";
  const api = getServerAPICaller();
  await api.inventory["delete-inventory"].$post({
    form: {
      productID: formData.get("productID")?.toString() || "",
    },
  });
  revalidatePath("/inventory");
  redirect("/inventory");
};
