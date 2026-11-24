import type { Client } from "../client";
import type { AdSlotRow } from "../types";

export async function listAdSlots(client: Client) {
  const { data, error } = await client.from("ad_slots").select("*").order("id");
  if (error) throw error;
  return data as AdSlotRow[];
}

export async function listCampaigns(client: Client) {
  const { data, error } = await client.from("ad_campaigns").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}
