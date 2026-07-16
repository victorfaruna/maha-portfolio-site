import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-24 px-6 text-center min-h-[70vh]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-6">
          Work With Me
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Content coming soon.
        </p>
      </div>
      <Footer />
    </main>
  );
}
