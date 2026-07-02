import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { FeaturedIn } from "@/components/sections/FeaturedIn";
import { Impact } from "@/components/sections/Impact";
import { About } from "@/components/sections/About";
import { Initiatives } from "@/components/sections/Initiatives";
import { Experience } from "@/components/sections/Experience";
import { Quote } from "@/components/sections/Quote";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />
      <Hero />
      <FeaturedIn />
      <Impact />
      <About />
      <Quote />
      <Initiatives />
      <Experience />
      <Footer />
    </main>
  );
}
