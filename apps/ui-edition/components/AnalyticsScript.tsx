import Script from "next/script";

/**
 * Reads NEXT_PUBLIC_ANALYTICS_PROVIDER / NEXT_PUBLIC_ANALYTICS_ID at build time.
 * Renders nothing when unset — analytics is opt-in via environment variables,
 * never hardcoded, per the brief's "never hardcode any publisher ID" rule.
 */
export function AnalyticsScript() {
  const provider = process.env.NEXT_PUBLIC_ANALYTICS_PROVIDER;
  const id = process.env.NEXT_PUBLIC_ANALYTICS_ID;

  if (!provider || !id) return null;

  if (provider === "plausible") {
    return <Script defer data-domain={id} src="https://plausible.io/js/script.js" />;
  }

  if (provider === "ga4") {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${id}`} strategy="afterInteractive" />
        <Script id="ga4-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${id}');`}
        </Script>
      </>
    );
  }

  return null;
}
