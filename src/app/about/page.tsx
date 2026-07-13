import { Navbar } from "@/components/sections/Navbar";
import { Purpose } from "@/components/sections/Purpose";
import { Experience } from "@/components/sections/Experience";
import { Footer } from "@/components/sections/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />
      <div className="pt-24 flex-1">
        <Purpose />
        <Experience />
      </div>
      <Footer />
    </main>
  );
}
