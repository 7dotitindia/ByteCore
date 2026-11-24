import { listAdSlots, listCampaigns } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";

export default async function AdminAdvertisementsPage() {
  const supabase = await createClient();
  const [slots, campaigns] = await Promise.all([listAdSlots(supabase), listCampaigns(supabase)]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Advertisements</h1>

      <h2 className="mt-8 text-xs font-medium uppercase tracking-wide text-text-secondary">Ad slots</h2>
      <AdminList
        items={slots}
        emptyLabel="No ad slots configured."
        columns={[
          { header: "Slot ID", render: (s) => s.id },
          { header: "Label", render: (s) => s.label },
          { header: "Description", render: (s) => s.description ?? "—" },
        ]}
      />

      <h2 className="mt-10 text-xs font-medium uppercase tracking-wide text-text-secondary">Campaigns</h2>
      <AdminList
        items={campaigns}
        emptyLabel="No campaigns yet. Create one, then attach creatives and assign them to slots above."
        columns={[
          { header: "Name", render: (c) => c.name },
          { header: "Advertiser", render: (c) => c.advertiser ?? "—" },
          { header: "Status", render: (c) => c.status },
        ]}
      />
    </div>
  );
}
