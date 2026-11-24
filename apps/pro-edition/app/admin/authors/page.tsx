import { listAuthors } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";
import { createAuthorAction } from "./actions";

export default async function AdminAuthorsPage() {
  const supabase = await createClient();
  const authors = await listAuthors(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Authors</h1>

      <form action={createAuthorAction} className="mt-6 flex flex-wrap items-end gap-3 border border-border p-4">
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Name</label>
          <input name="name" required className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Slug</label>
          <input name="slug" required pattern="[a-z0-9-]+" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <div>
          <label className="mb-1 block text-xs text-text-secondary">Title</label>
          <input name="title" className="border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
        </div>
        <button type="submit" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          Add
        </button>
      </form>

      <AdminList
        items={authors}
        emptyLabel="No authors yet."
        columns={[
          { header: "Name", render: (a) => a.name },
          { header: "Title", render: (a) => a.title ?? "—" },
          { header: "Slug", render: (a) => a.slug },
        ]}
      />
    </div>
  );
}
