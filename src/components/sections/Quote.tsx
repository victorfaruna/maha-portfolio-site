"use client";

import { motion } from "framer-motion";
import { Quote as QuoteIcon } from "lucide-react";

export function Quote() {
  return (
    <section className="py-40 bg-background relative overflow-hidden">
      {/* Decorative gradient blurs and geometric lines */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-accent/5 via-accent/0 to-transparent rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-y-1/2 pointer-events-none" />
      <div className="absolute top-1/2 right-0 w-[400px] h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 relative z-10 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative rounded-3xl bg-secondary/10 backdrop-blur-3xl border border-white/5 p-10 md:p-20 shadow-2xl overflow-hidden group"
        >
          {/* Internal glowing orb */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/10 blur-[120px] rounded-full pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-700" />
          
          {/* Large decorative background quote mark */}
          <QuoteIcon className="absolute -top-10 -left-10 w-64 h-64 text-accent/5 rotate-180 pointer-events-none" />
          <QuoteIcon className="absolute -bottom-10 -right-10 w-64 h-64 text-foreground/5 pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-accent/10 flex items-center justify-center mb-10 border border-accent/20 shadow-inner group-hover:scale-110 transition-transform duration-500">
              <QuoteIcon className="w-10 h-10 text-accent" />
            </div>
            
            <blockquote className="text-3xl md:text-5xl lg:text-6xl font-serif text-foreground leading-[1.3] mb-16 max-w-4xl tracking-tight">
              "Maha Jouini is a <span className="relative inline-block group-hover:text-accent transition-colors duration-500"><span className="relative z-10">trailblazing</span><span className="absolute bottom-1 left-0 w-full h-3 bg-accent/20 -z-10 skew-x-[-15deg] group-hover:bg-accent/40 transition-colors duration-500" /></span> Tunisian AI researcher and Pan-African advocate... dedicated to ensuring AI serves humanity and promotes social justice."
            </blockquote>
            
            <cite className="flex flex-col items-center gap-2 not-italic">
              <span className="text-sm font-bold uppercase tracking-[0.2em] text-foreground">Elon University</span>
              <span className="text-sm font-medium tracking-widest text-muted-foreground uppercase flex items-center gap-4">
                <span className="w-8 h-[1px] bg-accent/40" />
                Featured Profile
                <span className="w-8 h-[1px] bg-accent/40" />
              </span>
            </cite>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
