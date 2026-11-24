import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { AdminSidebar } from "@/components/AdminSidebar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="flex min-h-screen">
      <AdminSidebar email={user.email ?? ""} />
      <div className="flex-1 overflow-y-auto">
        <main className="mx-auto max-w-5xl px-8 py-10">{children}</main>
      </div>
    </div>
  );
}
