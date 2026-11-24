"use server";

import { revalidatePath } from "next/cache";
import { getSiteSettings, updateSiteSettings } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function updateSeoDefaultsAction(formData: FormData) {
  const supabase = await createClient();
  const current = await getSiteSettings(supabase);
  const config = { ...(current?.config ?? {}) } as Record<string, unknown>;

  config.siteUrl = String(formData.get("siteUrl"));
  config.seo = {
    defaultTitle: String(formData.get("defaultTitle")),
    defaultDescription: String(formData.get("defaultDescription")),
  };

  await updateSiteSettings(supabase, config);
  revalidatePath("/admin/seo");
}
