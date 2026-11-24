import { listMedia } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { AdminList } from "@/components/AdminList";

export default async function AdminMediaPage() {
  const supabase = await createClient();
  const media = await listMedia(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Media Library</h1>
      <p className="mt-1 text-sm text-text-secondary">
        Uploads go through a Supabase Storage bucket — see{" "}
        <code>docs/supabase-setup.md</code> for creating one and wiring an upload route.
      </p>

      <AdminList
        items={media}
        emptyLabel="No media uploaded yet."
        columns={[
          { header: "URL", render: (m) => m.url },
          { header: "Alt text", render: (m) => m.alt_text ?? "—" },
          { header: "Type", render: (m) => m.content_type ?? "—" },
          { header: "Uploaded", render: (m) => new Date(m.created_at).toLocaleDateString() },
        ]}
      />
    </div>
  );
}
