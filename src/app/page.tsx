import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { IntroText } from "@/components/sections/IntroText";
import { Purpose } from "@/components/sections/Purpose";
import { VisionApproach } from "@/components/sections/VisionApproach";
import { JoinMovement } from "@/components/sections/JoinMovement";
import { MoonshotMission } from "@/components/sections/MoonshotMission";
import { FeaturedIn } from "@/components/sections/FeaturedIn";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar mobileMenuFont="sans" />
      <Hero />
      <IntroText />
      <Purpose />
      <VisionApproach />
      <MoonshotMission />
      <JoinMovement />
      <FeaturedIn />
      <Footer showGradient />
    </main>
  );
}
