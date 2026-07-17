"use client";

import { motion } from "framer-motion";

const recognitions = [
  {
    title: "She Shapes AI Global Award",
    detail: "AI Thought Leadership (2026)",
  },
  {
    title: "UNESCO Top 20 Women AI Change Makers",
    detail: "MENA Region",
  },
  {
    title: "Vice President",
    detail: "Agence Francophone et Africaine de l'Intelligence Artificielle (AFRIA)",
  },
];

export function RecognitionStrip() {
  return (
    <section className="py-6 bg-brand-navy border-y border-white/10 overflow-hidden">
      <div className="container mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row items-center justify-center gap-0 md:gap-0 divide-y md:divide-y-0 md:divide-x divide-white/20"
        >
          {recognitions.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col items-center text-center px-8 py-3 md:py-0"
            >
              <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-brand-pink mb-0.5">
                {item.title}
              </span>
              <span className="text-[11px] uppercase tracking-[0.12em] text-white/60 font-light">
                {item.detail}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
