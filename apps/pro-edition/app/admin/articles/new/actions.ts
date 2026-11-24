"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { createArticle } from "@bytescope/data";
import { createClient } from "@/lib/supabase/server";

const articleInput = z.object({
  title: z.string().min(1),
  slug: z.string().min(1).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use lowercase letters, numbers and hyphens only"),
  subtitle: z.string().optional(),
  excerpt: z.string().optional(),
  status: z.enum(["draft", "scheduled", "published"]),
  authorId: z.string().optional(),
  categoryId: z.string().optional(),
  seoTitle: z.string().optional(),
  seoDescription: z.string().optional(),
  readingTime: z.coerce.number().optional(),
  featured: z.coerce.boolean().optional(),
  content: z.string(),
});

export async function createArticleAction(formData: FormData) {
  const parsed = articleInput.safeParse({
    title: formData.get("title"),
    slug: formData.get("slug"),
    subtitle: formData.get("subtitle") || undefined,
    excerpt: formData.get("excerpt") || undefined,
    status: formData.get("status"),
    authorId: formData.get("authorId") || undefined,
    categoryId: formData.get("categoryId") || undefined,
    seoTitle: formData.get("seoTitle") || undefined,
    seoDescription: formData.get("seoDescription") || undefined,
    readingTime: formData.get("readingTime") || undefined,
    featured: formData.get("featured") === "on",
    content: formData.get("content") || "{}",
  });

  if (!parsed.success) {
    throw new Error(parsed.error.issues.map((i) => i.message).join(", "));
  }

  const input = parsed.data;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  await createArticle(supabase, {
    title: input.title,
    slug: input.slug,
    subtitle: input.subtitle ?? null,
    excerpt: input.excerpt ?? null,
    status: input.status,
    author_id: input.authorId || null,
    primary_category_id: input.categoryId || null,
    seo_title: input.seoTitle ?? null,
    seo_description: input.seoDescription ?? null,
    reading_time_minutes: input.readingTime ?? null,
    featured: input.featured ?? false,
    content: JSON.parse(input.content),
    published_at: input.status === "published" ? new Date().toISOString() : null,
    created_by: user?.id ?? null,
  });

  redirect("/admin/articles");
}
