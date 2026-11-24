import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import { Header, Footer } from "@bytescope/ui";
import { defaultConfig } from "@bytescope/config";
import "./globals.css";

const sans = Inter({ subsets: ["latin"], variable: "--font-sans" });
const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: `${defaultConfig.siteName} — ${defaultConfig.tagline}`,
  description:
    "ByteScope is a premium technology and software publication covering AI, software, innovation and digital products.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={defaultConfig.defaultTheme === "dark" ? "dark" : ""}>
      <body className={`${sans.variable} ${serif.variable} font-sans antialiased`}>
        <Header siteName={defaultConfig.siteName} navigation={defaultConfig.navigation} />
        <main>{children}</main>
        <Footer
          siteName={defaultConfig.siteName}
          tagline={defaultConfig.tagline}
          navigation={defaultConfig.navigation}
          socialLinks={defaultConfig.socialLinks}
        />
      </body>
    </html>
  );
}
