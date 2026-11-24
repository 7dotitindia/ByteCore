import type { Client } from "../client";
import { countArticlesByStatus, listArticles } from "./articles";
import { countActiveSubscribers } from "./newsletter";

export async function getDashboardOverview(client: Client) {
  const [articleCounts, subscriberCount, recentArticles] = await Promise.all([
    countArticlesByStatus(client),
    countActiveSubscribers(client),
    listArticles(client, { limit: 5 }),
  ]);

  return {
    articleCounts,
    subscriberCount,
    recentArticles,
  };
}
