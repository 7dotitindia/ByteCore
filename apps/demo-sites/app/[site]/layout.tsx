import { notFound } from "next/navigation";
import { demoSites, getDemoSite } from "@bytescope/config";
import { Header, Footer } from "@bytescope/ui";

export function generateStaticParams() {
  return demoSites.map((d) => ({ site: d.slug }));
}

export default async function DemoSiteLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ site: string }>;
}) {
  const { site } = await params;
  const demo = getDemoSite(site);
  if (!demo) notFound();

  const { config } = demo;

  return (
    <div
      className={config.defaultTheme === "dark" ? "dark" : ""}
      style={
        {
          "--color-accent": config.colors.accent,
        } as React.CSSProperties
      }
    >
      <Header siteName={config.siteName} navigation={config.navigation} />
      <main>{children}</main>
      <Footer
        siteName={config.siteName}
        tagline={config.tagline}
        navigation={config.navigation}
        socialLinks={config.socialLinks}
      />
    </div>
  );
}
