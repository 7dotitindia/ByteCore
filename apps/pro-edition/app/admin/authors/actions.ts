"use server";

import { revalidatePath } from "next/cache";
import { createAuthor } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function createAuthorAction(formData: FormData) {
  const supabase = await createClient();
  await createAuthor(supabase, {
    name: String(formData.get("name")),
    slug: String(formData.get("slug")),
    title: String(formData.get("title") ?? "") || undefined,
    bio: String(formData.get("bio") ?? "") || undefined,
  });
  revalidatePath("/admin/authors");
}
