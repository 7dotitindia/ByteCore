"use server";

import { revalidatePath } from "next/cache";
import { updateUserRole, type UserRole } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export async function updateUserRoleAction(formData: FormData) {
  const supabase = await createClient();
  await updateUserRole(supabase, String(formData.get("userId")), formData.get("role") as UserRole);
  revalidatePath("/admin/users");
}
