"use client";

import { motion } from "framer-motion";

export function FeaturedIn() {
  const partners = [
    "UNESCO",
    "African Union",
    "Stanford",
    "Microsoft",
    "AUDA-NEPAD",
    "World Economic Forum",
  ];

  return (
    <section className="py-16 bg-secondary/30 border-y border-border/40">
      <div className="container mx-auto px-6 max-w-7xl">
        <p className="text-center text-xs font-sans text-foreground/60 mb-10 tracking-wide font-medium">
          Trusted By
        </p>
        
        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20">
          {partners.map((partner, idx) => (
            <div
              key={`${partner}-${idx}`}
              className="flex items-center justify-center opacity-70 hover:opacity-100 grayscale hover:grayscale-0 transition-all duration-300"
            >
              {/* Placeholder for actual logos - using text styled as a logo */}
              <span className="text-2xl md:text-3xl font-serif font-bold text-foreground tracking-tight">
                {partner}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
