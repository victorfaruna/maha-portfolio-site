"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/here.jpeg"
          alt="Maha Jouini Hero Background"
          fill
          className="object-center opacity-90"
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
          className="flex flex-col items-start"
        >
          {/* Line 1: serif text */}
          <h1
            className="text-5xl md:text-7xl text-white font-serif tracking-tight leading-none"
            style={{ textShadow: "0px 4px 12px rgba(0,0,0,0.4)" }}
          >
            Inclusive AI Is
          </h1>

          {/* Line 2: script image — sits directly below, same left edge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src="/images/possible.svg"
              alt="Possible"
              className="h-20 md:h-36 w-auto -mt-2 md:-mt-4"
              style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
