import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maha Jouini | AI Thought Leader & Pan-African Advocate",
  description: "Personal portfolio of Maha Jouini, an AI thought leader, researcher, and Pan-African advocate working at the intersection of artificial intelligence, ethics, public policy, and human development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        {/* Preconnect to YouTube domains for faster video loading */}
        <link rel="preconnect" href="https://www.youtube.com" />
        <link rel="preconnect" href="https://www.youtube-nocookie.com" />
        <link rel="preconnect" href="https://i.ytimg.com" />
        <link rel="dns-prefetch" href="https://www.youtube.com" />
        {/* Load YouTube IFrame API as early as possible */}
        <script src="https://www.youtube.com/iframe_api" async />
      </head>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent/30">{children}</body>
    </html>
  );
}
