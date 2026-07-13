import { Navbar } from "@/components/sections/Navbar";
import { WorkTogether } from "@/components/sections/WorkTogether";
import { Footer } from "@/components/sections/Footer";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />
      <div className="pt-24 flex-1">
        <WorkTogether />
      </div>
      <Footer />
    </main>
  );
}
