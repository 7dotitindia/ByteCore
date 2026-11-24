import { listAuthors, listCategories } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";
import { ArticleEditor } from "@/components/ArticleEditor";
import { createArticleAction } from "./actions";

export default async function NewArticlePage() {
  const supabase = await createClient();
  const [authors, categories] = await Promise.all([listAuthors(supabase), listCategories(supabase)]);

  return (
    <div>
      <h1 className="font-serif text-3xl text-text">New article</h1>

      <form action={createArticleAction} className="mt-8 flex flex-col gap-8 lg:flex-row">
        <div className="flex-1">
          <div className="flex flex-col gap-4">
            <input
              name="title"
              placeholder="Headline"
              required
              className="border-b border-border bg-transparent pb-2 font-serif text-3xl text-text outline-none focus:border-accent"
            />
            <input
              name="subtitle"
              placeholder="Subtitle"
              className="border-b border-border bg-transparent pb-2 text-lg text-text-secondary outline-none focus:border-accent"
            />
          </div>

          <div className="mt-6">
            <ArticleEditor name="content" />
          </div>
        </div>

        <aside className="w-full shrink-0 lg:w-72">
          <div className="flex flex-col gap-5 border border-border p-5">
            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Slug</label>
              <input name="slug" required pattern="[a-z0-9-]+" className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Status</label>
              <select name="status" defaultValue="draft" className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
                <option value="draft">Draft</option>
                <option value="scheduled">Scheduled</option>
                <option value="published">Published</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Author</label>
              <select name="authorId" className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
                <option value="">Unassigned</option>
                {authors.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Category</label>
              <select name="categoryId" className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent">
                <option value="">None</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Reading time (min)</label>
              <input name="readingTime" type="number" min={1} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
            </div>

            <label className="flex items-center gap-2 text-sm text-text">
              <input type="checkbox" name="featured" />
              Feature on homepage
            </label>

            <div>
              <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-text-secondary">Excerpt</label>
              <textarea name="excerpt" rows={3} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
            </div>

            <div className="border-t border-border pt-4">
              <p className="mb-2 text-xs font-medium uppercase tracking-wide text-text-secondary">SEO</p>
              <input name="seoTitle" placeholder="SEO title" className="mb-2 w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
              <textarea name="seoDescription" placeholder="SEO description" rows={2} className="w-full border border-border bg-bg px-3 py-2 text-sm text-text outline-none focus:border-accent" />
            </div>

            <button type="submit" className="bg-text px-4 py-2.5 text-sm font-medium text-bg transition-opacity hover:opacity-90">
              Save article
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}
