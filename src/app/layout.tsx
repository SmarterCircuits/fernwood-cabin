import type { Metadata, Viewport } from "next";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";
import { site } from "@/data/site";
import "./globals.css";

const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-plex-sans", display: "swap" });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"], variable: "--font-plex-mono", display: "swap" });

export const metadata: Metadata = {
  // metadataBase / canonical are only set once a real domain is configured.
  ...(site.siteUrl ? { metadataBase: new URL(site.siteUrl), alternates: { canonical: "/" } } : {}),
  title: site.title,
  description: site.description,
  keywords: site.keywords,
  applicationName: site.projectName,
  openGraph: {
    type: "website",
    title: site.title,
    description: site.description,
    siteName: `${site.projectName} · ${site.channelName}`,
    locale: site.locale,
    ...(site.siteUrl ? { url: site.siteUrl, images: [{ url: site.ogImage.path, width: site.ogImage.width, height: site.ogImage.height, alt: site.ogImage.alt }] } : {}),
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
    ...(site.siteUrl ? { images: [site.ogImage.path] } : {}),
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#1a1e1c",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
