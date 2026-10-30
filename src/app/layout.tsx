import type { Metadata } from "next";
import { getPageMetadata, SITE_NAME, SITE_URL } from "@/lib/site-metadata";
import "./globals.css";

export const metadata: Metadata = {
  ...getPageMetadata("/"),
  metadataBase: new URL(SITE_URL),
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased font-sans">
      <head>
        {/* Preconnect to YouTube domains for faster video embed loading */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
      </head>
      <body
        suppressHydrationWarning
        className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30 font-sans"
      >
        {children}
      </body>
    </html>
  );
}
