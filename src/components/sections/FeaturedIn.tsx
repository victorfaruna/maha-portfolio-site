"use client";

import { motion } from "framer-motion";

export function FeaturedIn() {
  const partners = [
    "UNESCO",
    "African Union",
    "Stanford University",
    "Microsoft",
    "AUDA-NEPAD",
    "She Shapes AI",
    "Elon University",
    "World Economic Forum",
  ];

  // Duplicate for seamless marquee
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-24 border-y border-white/5 bg-background relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-5xl h-32 bg-accent/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Edge fading gradients for the marquee */}
      <div className="absolute top-0 bottom-0 left-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

      <div className="container mx-auto px-6 mb-12 relative z-20">
        <p className="text-center text-sm uppercase tracking-widest text-muted-foreground font-semibold flex items-center justify-center gap-4">
          <span className="w-12 h-[2px] bg-accent/50" />
          Trusted By & Featured In
          <span className="w-12 h-[2px] bg-accent/50" />
        </p>
      </div>
      
      <div className="relative w-full overflow-hidden flex">
        <motion.div 
          className="flex gap-6 md:gap-12 w-max px-6 md:px-12"
          animate={{ x: [0, -1035] }} // Adjust width based on content for perfect loop if needed, using standard CSS animation might be smoother for some, but framer-motion is fine
          transition={{
            repeat: Infinity,
            repeatType: "loop",
            duration: 30,
            ease: "linear",
          }}
        >
          {duplicatedPartners.map((partner, idx) => (
            <div
              key={`${partner}-${idx}`}
              className="px-8 py-4 rounded-2xl bg-secondary/30 backdrop-blur-md border border-white/10 shadow-lg hover:border-accent/40 hover:bg-secondary/50 hover:shadow-[0_0_20px_-5px_rgba(255,0,0,0.2)] transition-all duration-300 group flex-shrink-0 cursor-default"
            >
              <span className="text-lg md:text-xl font-serif text-foreground/80 group-hover:text-foreground group-hover:scale-105 inline-block transition-transform duration-300">
                {partner}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
