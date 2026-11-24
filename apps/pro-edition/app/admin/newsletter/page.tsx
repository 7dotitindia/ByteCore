import { countActiveSubscribers, listSubscribers } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";

export default async function AdminNewsletterPage() {
  const supabase = await createClient();
  const [subscribers, activeCount] = await Promise.all([
    listSubscribers(supabase),
    countActiveSubscribers(supabase),
  ]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Newsletter</h1>
      <p className="mt-1 text-sm text-text-secondary">{activeCount} active subscribers.</p>

      <AdminList
        items={subscribers}
        emptyLabel="No subscribers yet."
        columns={[
          { header: "Email", render: (s) => s.email },
          { header: "Source", render: (s) => s.source ?? "—" },
          { header: "Subscribed", render: (s) => new Date(s.subscribed_at).toLocaleDateString() },
          { header: "Status", render: (s) => (s.unsubscribed_at ? "Unsubscribed" : "Active") },
        ]}
      />
    </div>
  );
}
