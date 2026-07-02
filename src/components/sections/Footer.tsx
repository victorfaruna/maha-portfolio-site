"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="py-24 bg-background relative overflow-hidden text-center border-t border-white/5">
      {/* Footer background glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-4xl h-[400px] bg-accent/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-4xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-4 block">
            Let's Collaborate
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-serif text-foreground mb-12 tracking-tight">
            Stay in <span className="text-transparent bg-clip-text bg-gradient-to-r from-foreground to-accent">Touch</span>
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {['LinkedIn', 'Twitter', 'Email'].map((social, idx) => (
              <a 
                key={idx}
                href={social === 'Email' ? "mailto:contact@mahajouini.com" : "#"} 
                className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/10 bg-secondary/30 backdrop-blur-md text-sm font-medium uppercase tracking-widest text-foreground/80 hover:text-foreground hover:bg-secondary hover:border-accent/40 hover:shadow-[0_0_20px_-5px_rgba(255,0,0,0.15)] transition-all duration-300"
              >
                {social}
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </a>
            ))}
          </div>

          <p className="text-muted-foreground text-sm font-medium tracking-wide">
            © {new Date().getFullYear()} Maha Jouini. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
