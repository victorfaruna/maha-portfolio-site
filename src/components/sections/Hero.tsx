"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero.webp"
          alt="Maha Jouini Hero Background"
          fill
          className="object-[10%_10%] opacity-90"
          priority
          objectFit="cover"
        />
        {/* Subtle overlay to ensure text readability */}
        <div className="absolute inset-0 bg-black/50" />
      </div>

      {/* Text Overlay */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <h1
            className="text-5xl md:text-7xl text-white font-serif tracking-tight leading-tight max-w-5xl mx-auto"
            style={{ textShadow: "0px 4px 12px rgba(0,0,0,0.4)" }}
          >
            Designing Human-Centered AI
          </h1>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
            className="-mt-2"
          >
            <h2
              className="text-4xl md:text-5xl text-brand-pink leading-normal"
              style={{
                fontFamily: "var(--font-script), cursive",
                textShadow: "2px 4px 10px rgba(0,0,0,0.5)",
              }}
            >
              for Africa and the Global South.
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
