"use server";

import { revalidatePath } from "next/cache";
import { createSoftware } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function createSoftwareAction(formData: FormData) {
  const supabase = await createClient();
  await createSoftware(supabase, {
    name: String(formData.get("name")),
    slug: String(formData.get("slug")),
    tagline: String(formData.get("tagline") ?? "") || undefined,
    category: String(formData.get("category") ?? "") || undefined,
    pricing_model: (String(formData.get("pricingModel") ?? "free") as "free" | "freemium" | "paid"),
    website_url: String(formData.get("websiteUrl") ?? "") || undefined,
    status: "draft",
  });
  revalidatePath("/admin/software");
}
