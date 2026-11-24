import { listTags } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";
import { createTagAction } from "./actions";

export default async function AdminTagsPage() {
  const supabase = await createClient();
  const tags = await listTags(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Tags</h1>

      <form action={createTagAction} className="mt-6 flex flex-wrap items-end gap-3 border border-border p-4">
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Name</label>
          <input name="name" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Slug</label>
          <input name="slug" required pattern="[a-z0-9-]+" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          Add
        </button>
      </form>

      <AdminList
        items={tags}
        emptyLabel="No tags yet."
        columns={[
          { header: "Name", render: (t) => t.name },
          { header: "Slug", render: (t) => t.slug },
        ]}
      />
    </div>
  );
}
