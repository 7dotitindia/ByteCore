import type { Client } from "../client";
import type { NewsletterSubscriberRow } from "../types";

export async function listSubscribers(client: Client) {
  const { data, error } = await client
    .from("newsletter_subscribers")
    .select("*")
    .order("subscribed_at", { ascending: false });
  if (error) throw error;
  return data as NewsletterSubscriberRow[];
}

export async function countActiveSubscribers(client: Client) {
  const { count, error } = await client
    .from("newsletter_subscribers")
    .select("id", { count: "exact", head: true })
    .is("unsubscribed_at", null);
  if (error) throw error;
  return count ?? 0;
}

export async function subscribeEmail(client: Client, email: string, source?: string) {
  const { error } = await client.from("newsletter_subscribers").insert({ email, source });
  if (error) throw error;
}
