"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe2, ShieldCheck, Cpu } from "lucide-react";

export function About() {
  return (
    <section id="about" className="py-32 relative bg-background overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-secondary/50 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-accent/10 blur-[150px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Main Image Column - Bento Item 1 */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 relative w-full h-[500px] lg:h-auto min-h-[400px] group rounded-2xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-accent/20 blur-2xl -translate-x-6 translate-y-6 -z-10 rounded-full transition-transform duration-700 group-hover:-translate-x-8 group-hover:translate-y-8" />
            <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-lg border border-white/10 ring-1 ring-white/5 group-hover:ring-accent/20 transition-all duration-500 bg-secondary/20 p-2">
              <div className="relative w-full h-full rounded-xl overflow-hidden">
                <Image
                  src="/images/about.webp"
                  alt="Maha Jouini Portrait"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </div>
          </motion.div>

          {/* Content Column - Bento Grid */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Main Purpose Card - Bento Item 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="p-8 md:p-12 rounded-2xl bg-secondary/30 backdrop-blur-xl border border-white/10 shadow-md flex flex-col justify-center h-full relative overflow-hidden group"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2 group-hover:bg-accent/10 transition-colors duration-500" />
              
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-4 flex items-center gap-2">
                <div className="w-8 h-[2px] bg-accent" /> The Vision
              </span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 tracking-tight">
                My <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">Purpose</span>
              </h2>
              <p className="text-foreground/80 text-lg md:text-xl leading-relaxed font-sans max-w-2xl">
                As a Tunisian AI thought leader and researcher, my journey spans
                Tunisia, China, Mauritania, and South Africa. I have dedicated
                my career to ensuring that AI serves people, strengthens
                institutions, and advances social justice across Africa and the Global South.
              </p>
            </motion.div>

            {/* Smaller Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
              
              {/* Achievement Card - Bento Item 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="p-8 rounded-2xl bg-accent/5 backdrop-blur-md border border-accent/20 shadow-md hover:shadow-accent/5 transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <Globe2 className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">Global Recognition</h3>
                <p className="text-foreground/70 text-base leading-relaxed font-sans">
                  Recognized among UNESCO's Top 20 Arab Women AI Changemakers, and
                  recipient of the 2026 She Shapes AI Award.
                </p>
              </motion.div>

              {/* Policy Card - Bento Item 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="p-8 rounded-2xl bg-secondary/30 backdrop-blur-md border border-white/10 shadow-md hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-lg bg-background border border-white/10 flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform duration-500">
                  <ShieldCheck className="w-6 h-6 text-foreground group-hover:text-accent transition-colors duration-300" />
                </div>
                <h3 className="text-xl font-serif text-foreground mb-3">Ethical Frameworks</h3>
                <p className="text-foreground/70 text-base leading-relaxed font-sans">
                  From AUDA-NEPAD to fellowships at Stanford and Microsoft, positioning Africa as an architect of ethical tech.
                </p>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
