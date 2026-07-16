import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { VideoSection } from "@/components/sections/VideoSection";
import { Purpose } from "@/components/sections/Purpose";
import { JoinMovement } from "@/components/sections/JoinMovement";
import { MoonshotMission } from "@/components/sections/MoonshotMission";
import { WorkTogether } from "@/components/sections/WorkTogether";
import { FeaturedIn } from "@/components/sections/FeaturedIn";
import { EmpathyNews } from "@/components/sections/EmpathyNews";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <Hero />
      <VideoSection />
      <Purpose />
      <MoonshotMission />
      <JoinMovement />
      <WorkTogether />
      <FeaturedIn />
      <EmpathyNews />
      {/* <Initiatives />
      <Experience />
      <Footer /> */}
    </main>
  );
}
