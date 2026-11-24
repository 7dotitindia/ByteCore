import type { Client } from "../client";
import type { UserRole, UserRow } from "../types";

export async function listUsers(client: Client) {
  const { data, error } = await client.from("users").select("*").order("created_at");
  if (error) throw error;
  return data as UserRow[];
}

export async function getCurrentUser(client: Client) {
  const {
    data: { user },
  } = await client.auth.getUser();
  if (!user) return null;

  const { data, error } = await client.from("users").select("*").eq("id", user.id).single();
  if (error) throw error;
  return data as UserRow;
}

export async function updateUserRole(client: Client, userId: string, role: UserRole) {
  const { data, error } = await client.from("users").update({ role }).eq("id", userId).select().single();
  if (error) throw error;
  return data as UserRow;
}
