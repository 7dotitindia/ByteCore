"use server";

import { revalidatePath } from "next/cache";
import { assignAdvertisementToSlot, createCampaign, createCreativeWithAdvertisement } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function createCampaignAction(formData: FormData) {
  const supabase = await createClient();
  await createCampaign(supabase, {
    name: String(formData.get("name")),
    advertiser: String(formData.get("advertiser") ?? "") || undefined,
    status: "draft",
  });
  revalidatePath("/admin/advertisements");
}

export async function createCreativeAction(formData: FormData) {
  const supabase = await createClient();
  await createCreativeWithAdvertisement(supabase, {
    campaignId: String(formData.get("campaignId")),
    headline: String(formData.get("headline")),
    destinationUrl: String(formData.get("destinationUrl")),
  });
  revalidatePath("/admin/advertisements");
}

export async function assignSlotAction(formData: FormData) {
  const supabase = await createClient();
  await assignAdvertisementToSlot(supabase, {
    slotId: String(formData.get("slotId")),
    advertisementId: String(formData.get("advertisementId")),
    priority: Number(formData.get("priority") ?? 0),
  });
  revalidatePath("/admin/advertisements");
}
