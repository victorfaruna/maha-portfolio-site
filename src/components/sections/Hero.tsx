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
        <div className="absolute inset-0 bg-black/20" />
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
            className="text-6xl md:text-8xl lg:text-[7rem] text-white font-serif tracking-tight leading-none"
            style={{ textShadow: "0px 4px 12px rgba(0,0,0,0.4)" }}
          >
            Empathy Is Our
          </h1>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2, delay: 0.2, ease: "easeOut" }}
            className="absolute -bottom-8 md:-bottom-12 lg:-bottom-16 left-0 right-0"
          >
            <h2
              className="text-5xl tracking-tight md:text-8xl text-[#FFE873] leading-none"
              style={{
                fontFamily: "var(--font-script), cursive",
                textShadow: "2px 4px 10px rgba(0,0,0,0.5)",
                // transform: "rotate(-2deg)"
              }}
            >
              Superpower
            </h2>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
