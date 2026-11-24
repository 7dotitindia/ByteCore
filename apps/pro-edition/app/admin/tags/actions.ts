"use server";

import { revalidatePath } from "next/cache";
import { createTag } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function createTagAction(formData: FormData) {
  const supabase = await createClient();
  await createTag(supabase, {
    name: String(formData.get("name")),
    slug: String(formData.get("slug")),
  });
  revalidatePath("/admin/tags");
}
