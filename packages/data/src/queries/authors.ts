import type { Client } from "../client";
import type { AuthorRow } from "../types";

export async function listAuthors(client: Client) {
  const { data, error } = await client.from("authors").select("*").order("name");
  if (error) throw error;
  return data as AuthorRow[];
}

export async function createAuthor(
  client: Client,
  author: { slug: string; name: string; title?: string; bio?: string },
) {
  const { data, error } = await client.from("authors").insert(author).select().single();
  if (error) throw error;
  return data as AuthorRow;
}
