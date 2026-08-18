import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import SpeakingSection from "@/components/sections/SpeakingSection";

export const metadata = {
  title: "Speaking & Media — Maha Jouini",
  description:
    "Keynote addresses, panel moderation, media features, and public voice on AI governance, digital sovereignty, and Africa's technological future.",
};

export default function SpeakingPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden flex flex-col pt-20">
      <Navbar />

      {/* Main Interactive Speaking & Media Content */}
      <SpeakingSection />

      <Footer showGradient />
    </main>
  );
}
