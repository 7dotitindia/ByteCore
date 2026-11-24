import { listCategories } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";
import { createCategoryAction } from "./actions";

export default async function AdminCategoriesPage() {
  const supabase = await createClient();
  const categories = await listCategories(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Categories</h1>

      <form action={createCategoryAction} className="mt-6 flex flex-wrap items-end gap-3 border border-border p-4">
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Name</label>
          <input name="name" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Slug</label>
          <input name="slug" required pattern="[a-z0-9-]+" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div className="flex-1">
          <label className="mb-1 block text-xs text-text-secondary">Description</label>
          <input name="description" className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          Add
        </button>
      </form>

      <AdminList
        items={categories}
        emptyLabel="No categories yet."
        columns={[
          { header: "Name", render: (c) => c.name },
          { header: "Slug", render: (c) => c.slug },
          { header: "Description", render: (c) => c.description ?? "—" },
        ]}
      />
    </div>
  );
}
