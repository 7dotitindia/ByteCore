import { getDashboardOverview } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

function StatTile({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="border border-border p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-text-secondary">{label}</p>
      <p className="mt-2 font-serif text-3xl text-text">{value}</p>
    </div>
  );
}

export default async function AdminOverviewPage() {
  const supabase = await createClient();
  const { articleCounts, subscriberCount, recentArticles } = await getDashboardOverview(supabase);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Overview</h1>
      <p className="mt-1 text-sm text-text-secondary">Live counts from your Supabase database.</p>

      <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Published" value={articleCounts.published} />
        <StatTile label="Drafts" value={articleCounts.draft} />
        <StatTile label="Scheduled" value={articleCounts.scheduled} />
        <StatTile label="Subscribers" value={subscriberCount} />
      </div>

      <div className="mt-10">
        <h2 className="mb-4 text-xs font-medium uppercase tracking-wide text-text-secondary">
          Recent activity
        </h2>
        {recentArticles.length === 0 ? (
          <p className="text-sm text-text-secondary">
            No articles yet.{" "}
            <a href="/admin/articles/new" className="text-accent hover:opacity-80">
              Write your first one
            </a>
            .
          </p>
        ) : (
          <div className="flex flex-col divide-y divide-border border-y border-border">
            {recentArticles.map((article) => (
              <a
                key={article.id}
                href={`/admin/articles/${article.id}`}
                className="flex items-center justify-between py-3 text-sm transition-colors hover:text-accent"
              >
                <span className="text-text">{article.title}</span>
                <span className="text-xs uppercase tracking-wide text-text-secondary">{article.status}</span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
