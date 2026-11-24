import type { Client } from "../client";
import type { ArticleRow } from "../types";

export async function listArticles(client: Client, opts: { limit?: number } = {}) {
  let query = client
    .from("articles")
    .select("*, authors(name), categories:primary_category_id(name)")
    .order("created_at", { ascending: false });

  if (opts.limit) query = query.limit(opts.limit);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getArticleById(client: Client, id: string) {
  const { data, error } = await client.from("articles").select("*").eq("id", id).single();
  if (error) throw error;
  return data as ArticleRow;
}

export async function createArticle(client: Client, article: Partial<ArticleRow> & { title: string; slug: string }) {
  const { data, error } = await client.from("articles").insert(article).select().single();
  if (error) throw error;
  return data as ArticleRow;
}

export async function updateArticle(client: Client, id: string, patch: Partial<ArticleRow>) {
  const { data, error } = await client.from("articles").update(patch).eq("id", id).select().single();
  if (error) throw error;
  return data as ArticleRow;
}

export async function deleteArticle(client: Client, id: string) {
  const { error } = await client.from("articles").delete().eq("id", id);
  if (error) throw error;
}

export async function countArticlesByStatus(client: Client) {
  const [published, draft, scheduled] = await Promise.all([
    client.from("articles").select("id", { count: "exact", head: true }).eq("status", "published"),
    client.from("articles").select("id", { count: "exact", head: true }).eq("status", "draft"),
    client.from("articles").select("id", { count: "exact", head: true }).eq("status", "scheduled"),
  ]);
  return {
    published: published.count ?? 0,
    draft: draft.count ?? 0,
    scheduled: scheduled.count ?? 0,
  };
}
