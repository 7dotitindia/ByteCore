import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header, Footer } from "@bytescope/ui";
import { defaultConfig } from "@bytescope/config";
import { JsonLd, organizationSchema } from "@bytescope/seo";
import { AnalyticsScript } from "@/components/AnalyticsScript";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? defaultConfig.siteUrl;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${defaultConfig.siteName} — ${defaultConfig.tagline}`,
    template: `%s — ${defaultConfig.siteName}`,
  },
  description:
    "ByteScope is a premium technology and software publication covering AI, software, innovation and digital products.",
  openGraph: {
    siteName: defaultConfig.siteName,
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={defaultConfig.defaultTheme === "dark" ? "dark" : ""}>
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>
        <JsonLd data={organizationSchema({ name: defaultConfig.siteName, url: siteUrl })} />
        <Header siteName={defaultConfig.siteName} navigation={defaultConfig.navigation} />
        <main>{children}</main>
        <Footer
          siteName={defaultConfig.siteName}
          tagline={defaultConfig.tagline}
          navigation={defaultConfig.navigation}
          socialLinks={defaultConfig.socialLinks}
        />
        <AnalyticsScript />
      </body>
    </html>
  );
}
