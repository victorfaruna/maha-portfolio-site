import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />
      <div className="flex-1 flex flex-col items-center justify-center pt-32 pb-12 px-6 text-center min-h-[40vh]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-6">
          Get in Touch
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          I'd love to hear from you. Fill out the form below or reach out on my social channels.
        </p>
      </div>
      <Footer />
    </main>
  );
}
