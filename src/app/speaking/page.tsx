import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import SpeakingSection from "@/components/sections/SpeakingSection";
import { createAnonServerClient } from "@/lib/supabase/server";
import type { SpeakingItem } from "@/lib/supabase/types";
import type { MediaItem } from "@/data/speaking";
import { getPublishedTestimonials } from "@/lib/testimonials-server";
import { getPageMetadata } from "@/lib/site-metadata";

export const metadata = getPageMetadata("/speaking");

export const revalidate = 60;

async function getSpeakingItems(): Promise<MediaItem[]> {
  try {
    const supabase = createAnonServerClient();
    const { data, error } = await supabase
      .from("speaking_items")
      .select("*")
      .order("created_at", { ascending: false })
      .abortSignal(AbortSignal.timeout(8000));

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
  const [customSpeakingItems, customTestimonials] = await Promise.all([
    getSpeakingItems(), getPublishedTestimonials(),
  ]);

  return (
    <main className="min-h-screen bg-background text-foreground font-sans overflow-hidden flex flex-col">
      <Navbar mobileMenuFont="sans" />

      {/* Main Interactive Speaking & Media Content */}
      <SpeakingSection
        customSpeakingItems={customSpeakingItems.length > 0 ? customSpeakingItems : undefined}
        customTestimonials={customTestimonials}
      />

      <Footer showGradient />
    </main>
  );
}
