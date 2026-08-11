import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Maha Jouini | AI Thought Leader & Pan-African Advocate",
  description:
    "Personal portfolio of Maha Jouini, an AI thought leader, researcher, and Pan-African advocate working at the intersection of artificial intelligence, ethics, public policy, and human development.",
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
