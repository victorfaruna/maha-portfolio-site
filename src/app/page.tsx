import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { IntroText } from "@/components/sections/IntroText";
import { VideoSection } from "@/components/sections/VideoSection";
import { Purpose } from "@/components/sections/Purpose";
import { JoinMovement } from "@/components/sections/JoinMovement";
import { MoonshotMission } from "@/components/sections/MoonshotMission";
import { WorkTogether } from "@/components/sections/WorkTogether";
import { FeaturedIn } from "@/components/sections/FeaturedIn";
import { RecognitionStrip } from "@/components/sections/RecognitionStrip";

import { Initiatives } from "@/components/sections/Initiatives";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <Hero />
      <IntroText />
      <VideoSection />
      <Purpose />
      <MoonshotMission />
      <JoinMovement />
      <WorkTogether />
      <FeaturedIn />
      <RecognitionStrip />
      <Footer />
      {/* <Initiatives />
      <Experience /> */}
    </main>
  );
}
