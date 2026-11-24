import { listArticles } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

export default async function AdminArticlesPage() {
  const supabase = await createClient();
  const articles = await listArticles(supabase);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-text">Articles</h1>
        <a href="/admin/articles/new" className="bg-text px-4 py-2 text-sm font-medium text-bg hover:opacity-90">
          New article
        </a>
      </div>

      {articles.length === 0 ? (
        <p className="mt-8 text-sm text-text-secondary">No articles yet.</p>
      ) : (
        <table className="mt-8 w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-text-secondary">
              <th className="py-2 font-medium">Title</th>
              <th className="py-2 font-medium">Status</th>
              <th className="py-2 font-medium">Author</th>
              <th className="py-2 font-medium">Updated</th>
            </tr>
          </thead>
          <tbody>
            {articles.map((article) => (
              <tr key={article.id} className="border-b border-border last:border-none">
                <td className="py-3">
                  <a href={`/admin/articles/${article.id}`} className="text-text hover:text-accent">
                    {article.title}
                  </a>
                </td>
                <td className="py-3 uppercase tracking-wide text-text-secondary">{article.status}</td>
                <td className="py-3 text-text-secondary">
                  {(article as unknown as { authors?: { name?: string } }).authors?.name ?? "—"}
                </td>
                <td className="py-3 text-text-secondary">
                  {new Date(article.updated_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
