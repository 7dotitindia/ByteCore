import type { Client } from "../client";
import type { SoftwareRow } from "../types";

export async function listSoftware(client: Client) {
  const { data, error } = await client.from("software").select("*").order("name");
  if (error) throw error;
  return data as SoftwareRow[];
}

export async function createSoftware(
  client: Client,
  software: Partial<SoftwareRow> & { slug: string; name: string },
) {
  const { data, error } = await client.from("software").insert(software).select().single();
  if (error) throw error;
  return data as SoftwareRow;
}
