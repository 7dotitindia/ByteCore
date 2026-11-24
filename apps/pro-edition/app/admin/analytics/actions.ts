"use server";

import { revalidatePath } from "next/cache";
import { getSiteSettings, updateSiteSettings } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function updateAnalyticsAction(formData: FormData) {
  const supabase = await createClient();
  const current = await getSiteSettings(supabase);
  const config = { ...(current?.config ?? {}) } as Record<string, unknown>;

  config.analytics = {
    provider: String(formData.get("provider")),
    id: String(formData.get("id") ?? "") || undefined,
  };

  await updateSiteSettings(supabase, config);
  revalidatePath("/admin/analytics");
}
