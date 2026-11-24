export default function AdminAnalyticsPage() {
  return (
    <div>
      <h1 className="font-serif text-3xl text-text">Analytics</h1>
      <p className="mt-3 max-w-lg text-sm text-text-secondary">
        Not built yet — scheduled for Phase 6 along with SEO and advertisement management. The
        database already tracks impressions and clicks on <code>advertisements</code>; this page
        will add pageview/referrer tracking (e.g. Plausible or an analytics provider's script tag
        configured here) and surface it alongside that data.
      </p>
    </div>
  );
}
