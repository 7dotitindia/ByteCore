import { listSoftware } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";
import { createSoftwareAction } from "./actions";

export default async function AdminSoftwarePage() {
  const supabase = await createClient();
  const software = await listSoftware(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Software</h1>

      <form action={createSoftwareAction} className="mt-6 flex flex-wrap items-end gap-3 border border-border p-4">
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Name</label>
          <input name="name" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Slug</label>
          <input name="slug" required pattern="[a-z0-9-]+" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Tagline</label>
          <input name="tagline" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Pricing</label>
          <select name="pricingModel" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
            <option value="free">Free</option>
            <option value="freemium">Freemium</option>
            <option value="paid">Paid</option>
          </select>
        </div>
        <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          Add
        </button>
      </form>

      <AdminList
        items={software}
        emptyLabel="No software yet."
        columns={[
          { header: "Name", render: (s) => s.name },
          { header: "Category", render: (s) => s.category ?? "—" },
          { header: "Pricing", render: (s) => s.pricing_model },
          { header: "Status", render: (s) => s.status },
        ]}
      />
    </div>
  );
}
