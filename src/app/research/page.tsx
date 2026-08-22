import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { createAnonServerClient } from "@/lib/supabase/server";
import type { Publication } from "@/lib/supabase/types";
import NewsHeroGrid from "@/components/sections/NewsHeroGrid";
import PublicationsSection from "./PublicationsSection";

export const dynamic = "force-dynamic";

async function getData() {
  const supabase = createAnonServerClient();

  const pubRes = await supabase.from("publications").select("*").order("year", { ascending: false });

  return {
    publications: (pubRes.data ?? []) as Publication[],
  };
}

export default async function ResearchPage() {
  const { publications } = await getData();

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* ── 1. HERO SECTION ──────────────────────────────────────────────── */}
      <section className="relative w-full h-[60vh] md:h-[75vh] min-h-[420px] flex items-end pb-10 md:pb-16 overflow-hidden">
        <Image
          src="/images/researchandpublica.jpeg"
          alt="Research at the Intersection of AI, Ethics, and Policy"
          fill
          className="object-cover object-top"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/30" />

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl">
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 block">
              RESEARCH &amp; PUBLICATIONS
            </span>
            <h1
              className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight leading-[1.1] mb-4 md:mb-6"
              style={{ textShadow: "0px 4px 16px rgba(0,0,0,0.5)" }}
            >
              Research at the Intersection of AI, Ethics, and Policy
            </h1>
            <p className="text-sm sm:text-base md:text-xl text-white/90 font-sans max-w-2xl font-light leading-relaxed">
              Advancing digital sovereignty, Pan-African ethical AI frameworks, and inclusive technology policy across North Africa and the Global South.
            </p>
          </div>
        </div>
      </section>

      {/* ── 2. EDITORIAL NEWS HERO GRID (Placed before Featured Publications) ─ */}
      <NewsHeroGrid publications={publications} />

      {/* ── 3. FEATURED PUBLICATIONS & OPINIONS ───────────────────────────── */}
      <PublicationsSection publications={publications} />

      {/* Footer */}
      <Footer showGradient />
    </main>
  );
}
