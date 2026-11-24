import type { Client } from "../client";
import type { AdCampaignStatus, AdSlotRow } from "../types";

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

export async function createCampaign(
  client: Client,
  campaign: { name: string; advertiser?: string; status?: AdCampaignStatus },
) {
  const { data, error } = await client.from("ad_campaigns").insert(campaign).select().single();
  if (error) throw error;
  return data;
}

/**
 * Creates a creative under a campaign, then wraps it in an `advertisements`
 * row (enabled by default) so it can immediately be assigned to a slot.
 */
export async function createCreativeWithAdvertisement(
  client: Client,
  input: { campaignId: string; headline: string; destinationUrl: string },
) {
  const { data: creative, error: creativeError } = await client
    .from("ad_creatives")
    .insert({ campaign_id: input.campaignId, headline: input.headline, destination_url: input.destinationUrl })
    .select()
    .single();
  if (creativeError) throw creativeError;

  const { data: advertisement, error: adError } = await client
    .from("advertisements")
    .insert({ creative_id: creative.id, enabled: true })
    .select()
    .single();
  if (adError) throw adError;

  return { creative, advertisement };
}

export async function listAdvertisements(client: Client) {
  const { data, error } = await client
    .from("advertisements")
    .select("*, ad_creatives(headline, destination_url, ad_campaigns(name))")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function assignAdvertisementToSlot(
  client: Client,
  input: { slotId: string; advertisementId: string; priority?: number },
) {
  const { data, error } = await client
    .from("ad_slot_assignments")
    .insert({ slot_id: input.slotId, advertisement_id: input.advertisementId, priority: input.priority ?? 0 })
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function listSlotAssignments(client: Client) {
  const { data, error } = await client
    .from("ad_slot_assignments")
    .select("*, advertisements(ad_creatives(headline))")
    .order("slot_id");
  if (error) throw error;
  return data;
}

export async function getActiveAdForSlot(client: Client, slotId: string) {
  const { data, error } = await client
    .from("ad_slot_assignments")
    .select("*, advertisements!inner(enabled, ad_creatives(headline, destination_url))")
    .eq("slot_id", slotId)
    .eq("advertisements.enabled", true)
    .order("priority", { ascending: false })
    .limit(1)
    .maybeSingle();
  if (error) throw error;
  return data;
}
