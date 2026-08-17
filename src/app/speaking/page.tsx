import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import SpeakingSection from "@/components/sections/SpeakingSection";

export const metadata = {
  title: "Speaking & Media — Maha Jouini",
  description:
    "Keynotes, panels, and press features on AI governance, digital sovereignty, and Africa's technological future.",
};

export default function SpeakingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      <Navbar />

      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[420px] flex items-end pb-10 md:pb-16 overflow-hidden">
        <Image
          src="/images/pictures for research and publicaton/99.jpeg"
          alt="Maha Jouini – Speaking, Press & Public Voice"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Lighter overlay for clear, bright visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/25 to-black/10" />

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 block">
              SPEAKING &amp; MEDIA
            </span>
            <h1
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight leading-[1.1] mb-4 md:mb-6"
              style={{ textShadow: "0px 2px 12px rgba(0,0,0,0.6)" }}
            >
              Speaking, Press &amp; Public Voice
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-white/90 font-sans max-w-2xl font-light leading-relaxed">
              Keynotes, panels, and press features on AI governance, digital sovereignty, and Africa's technological future.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. MAIN PAGE CONTENT ───────────────────────────────────────── */}
      <SpeakingSection />

      <Footer showGradient />
    </main>
  );
}
