"use server";

import { revalidatePath } from "next/cache";
import { createCategory } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function createCategoryAction(formData: FormData) {
  const supabase = await createClient();
  await createCategory(supabase, {
    name: String(formData.get("name")),
    slug: String(formData.get("slug")),
    description: String(formData.get("description") ?? "") || undefined,
  });
  revalidatePath("/admin/categories");
}
