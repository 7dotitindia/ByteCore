"use server";

import { revalidatePath } from "next/cache";
import { getSiteSettings, updateSiteSettings } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function updateCustomizationAction(formData: FormData) {
  const supabase = await createClient();
  const current = await getSiteSettings(supabase);
  const config = { ...(current?.config ?? {}) } as Record<string, unknown>;

  config.siteName = String(formData.get("siteName"));
  config.tagline = String(formData.get("tagline"));
  config.defaultTheme = String(formData.get("defaultTheme"));
  config.homepageLayout = String(formData.get("homepageLayout"));
  config.colors = {
    primary: String(formData.get("primaryColor")),
    accent: String(formData.get("accentColor")),
  };

  await updateSiteSettings(supabase, config);
  revalidatePath("/admin/customization");
}
