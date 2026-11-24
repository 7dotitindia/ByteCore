import type { Client } from "../client";
import type { SiteSettingsRow } from "../types";

export async function getSiteSettings(client: Client) {
  const { data, error } = await client.from("site_settings").select("*").eq("id", true).maybeSingle();
  if (error) throw error;
  return data as SiteSettingsRow | null;
}

export async function updateSiteSettings(client: Client, config: Record<string, unknown>) {
  const { data, error } = await client
    .from("site_settings")
    .update({ config })
    .eq("id", true)
    .select()
    .single();
  if (error) throw error;
  return data as SiteSettingsRow;
}
