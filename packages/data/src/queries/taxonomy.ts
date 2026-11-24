import type { Client } from "../client";
import type { CategoryRow, TagRow } from "../types";

export async function listCategories(client: Client) {
  const { data, error } = await client.from("categories").select("*").order("name");
  if (error) throw error;
  return data as CategoryRow[];
}

export async function createCategory(client: Client, category: { slug: string; name: string; description?: string }) {
  const { data, error } = await client.from("categories").insert(category).select().single();
  if (error) throw error;
  return data as CategoryRow;
}

export async function listTags(client: Client) {
  const { data, error } = await client.from("tags").select("*").order("name");
  if (error) throw error;
  return data as TagRow[];
}

export async function createTag(client: Client, tag: { slug: string; name: string }) {
  const { data, error } = await client.from("tags").insert(tag).select().single();
  if (error) throw error;
  return data as TagRow;
}
