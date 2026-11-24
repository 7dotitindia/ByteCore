import { createClient as createSupabaseClient, type SupabaseClient } from "@supabase/supabase-js";

export type Client = SupabaseClient;

export function createClient(url: string, key: string): Client {
  return createSupabaseClient(url, key, {
    auth: { persistSession: true, autoRefreshToken: true },
  });
}
