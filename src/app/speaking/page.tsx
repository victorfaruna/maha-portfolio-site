import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import SpeakingSection from "@/components/sections/SpeakingSection";
import { createAnonServerClient } from "@/lib/supabase/server";
import type { Publication, SpeakingItem } from "@/lib/supabase/types";
import type { MediaItem } from "@/data/speaking";

export const metadata = {
  title: "Speaking & Media — Maha Jouini",
  description:
    "Keynote addresses, panel moderation, media features, and public voice on AI governance, digital sovereignty, and Africa's technological future.",
};

// Revalidate the page at most every 60 seconds so new publications and speaking items appear promptly
export const revalidate = 60;

async function getPublications(): Promise<Publication[]> {
  try {
    const supabase = createAnonServerClient();
    const { data, error } = await supabase
      .from("publications")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("[speaking/page] Supabase publications error:", error.message);
      return [];
    }

    return (data ?? []) as Publication[];
  } catch (err) {
    console.error("[speaking/page] Failed to fetch publications:", err);
    return [];
  }
}

async function getSpeakingItems(): Promise<MediaItem[]> {
  try {
    const supabase = createAnonServerClient();
    const { data, error } = await supabase
      .from("speaking_items")
      .select("*")
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      return [];
    }

    return (data as SpeakingItem[]).map((item) => ({
      id: item.id,
      title: item.title,
      category: item.category,
      outlet: item.outlet,
      description: item.description || undefined,
      link: item.link,
      videoId: item.video_id || undefined,
      ogImage: item.og_image || undefined,
      isRTL: item.is_rtl,
      year: item.year || undefined,
    }));
  } catch (err) {
    console.error("[speaking/page] Failed to fetch speaking_items:", err);
    return [];
  }
}

export default async function SpeakingPage() {
  const [publications, customSpeakingItems] = await Promise.all([
    getPublications(),
    getSpeakingItems(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col">
      <Navbar />

      {/* Main Interactive Speaking & Media Content */}
      <SpeakingSection
        publications={publications}
        customSpeakingItems={customSpeakingItems.length > 0 ? customSpeakingItems : undefined}
      />

      <Footer showGradient />
    </main>
  );
}
