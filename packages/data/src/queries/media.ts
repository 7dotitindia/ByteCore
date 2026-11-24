import type { Client } from "../client";
import type { MediaRow } from "../types";

export async function listMedia(client: Client) {
  const { data, error } = await client.from("media").select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return data as MediaRow[];
}
