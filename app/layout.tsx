import type { Metadata, Viewport } from "next";
import "@fontsource/cinzel/400.css";
import "@fontsource/cinzel/500.css";
import "@fontsource/cormorant-garamond/400.css";
import "@fontsource/cormorant-garamond/400-italic.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/montserrat/500.css";
import "./globals.css";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: `${site.name} — ${site.tagline}`, template: `%s · ${site.name}` },
  description: site.description,
  applicationName: site.name,
  icons: { icon: "/icon.svg" },
  openGraph: {
    type: "website",
    siteName: site.name,
    title: `${site.name} — Coming soon`,
    description: site.description,
    locale: "en_ZW",
  },
  twitter: { card: "summary", title: `${site.name} — Coming soon`, description: site.description },
};

export const viewport: Viewport = {
  themeColor: "#F4E8DC",
  colorScheme: "light",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
