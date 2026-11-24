import { listAdSlots, listAdvertisements, listCampaigns, listSlotAssignments } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";
import { assignSlotAction, createCampaignAction, createCreativeAction } from "./actions";

export default async function AdminAdvertisementsPage() {
  const supabase = await createClient();
  const [slots, campaigns, advertisements, assignments] = await Promise.all([
    listAdSlots(supabase),
    listCampaigns(supabase),
    listAdvertisements(supabase),
    listSlotAssignments(supabase),
  ]);

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
        ]}
      />

      <h2 className="mt-10 text-xs font-medium uppercase tracking-wide text-text-secondary">Campaigns</h2>
      <form action={createCampaignAction} className="mt-3 flex flex-wrap items-end gap-3 border border-border p-4">
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Name</label>
          <input name="name" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Advertiser</label>
          <input name="advertiser" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          Create campaign
        </button>
      </form>
      <AdminList
        items={campaigns}
        emptyLabel="No campaigns yet."
        columns={[
          { header: "Name", render: (c) => c.name },
          { header: "Advertiser", render: (c) => c.advertiser ?? "—" },
          { header: "Status", render: (c) => c.status },
        ]}
      />

      <h2 className="mt-10 text-xs font-medium uppercase tracking-wide text-text-secondary">Creatives</h2>
      {campaigns.length === 0 ? (
        <p className="mt-3 text-sm text-text-secondary">Create a campaign first.</p>
      ) : (
        <form action={createCreativeAction} className="mt-3 flex flex-wrap items-end gap-3 border border-border p-4">
          <div>
            <label className="mb-1 block text-xs text-text-secondary">Campaign</label>
            <select name="campaignId" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
              {campaigns.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary">Headline</label>
            <input name="headline" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
          </div>
          <div className="flex-1">
            <label className="mb-1 block text-xs text-text-secondary">Destination URL</label>
            <input name="destinationUrl" type="url" required className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
          </div>
          <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
            Add creative
          </button>
        </form>
      )}
      <AdminList
        items={advertisements as unknown as { id: string }[]}
        emptyLabel="No creatives yet."
        columns={[
          { header: "Headline", render: (a) => (a as any).ad_creatives?.headline ?? "—" },
          { header: "Campaign", render: (a) => (a as any).ad_creatives?.ad_campaigns?.name ?? "—" },
          { header: "Enabled", render: (a) => ((a as any).enabled ? "Yes" : "No") },
          { header: "Impressions / Clicks", render: (a) => `${(a as any).impressions} / ${(a as any).clicks}` },
        ]}
      />

      <h2 className="mt-10 text-xs font-medium uppercase tracking-wide text-text-secondary">Slot assignments</h2>
      {advertisements.length === 0 ? (
        <p className="mt-3 text-sm text-text-secondary">Add a creative first.</p>
      ) : (
        <form action={assignSlotAction} className="mt-3 flex flex-wrap items-end gap-3 border border-border p-4">
          <div>
            <label className="mb-1 block text-xs text-text-secondary">Slot</label>
            <select name="slotId" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
              {slots.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary">Advertisement</label>
            <select name="advertisementId" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
              {advertisements.map((a) => (
                <option key={(a as any).id} value={(a as any).id}>
                  {(a as any).ad_creatives?.headline ?? (a as any).id}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-1 block text-xs text-text-secondary">Priority</label>
            <input name="priority" type="number" defaultValue={0} className="w-20 border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
          </div>
          <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
            Assign
          </button>
        </form>
      )}
      <AdminList
        items={assignments as unknown as { id: string }[]}
        emptyLabel="No slot assignments yet."
        columns={[
          { header: "Slot", render: (a) => (a as any).slot_id },
          { header: "Creative", render: (a) => (a as any).advertisements?.ad_creatives?.headline ?? "—" },
          { header: "Priority", render: (a) => (a as any).priority },
        ]}
      />
    </div>
  );
}
