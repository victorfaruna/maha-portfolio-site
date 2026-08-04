"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[65vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <iframe
          src="https://www.youtube.com/embed/gcnLfZ4VI74?autoplay=1&mute=1&loop=1&playlist=gcnLfZ4VI74&controls=0&showinfo=0&rel=0&modestbranding=1&iv_load_policy=3&playsinline=1"
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none opacity-80"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
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
          className="flex flex-col items-center "
        >
          {/* Line 1: serif text */}
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-serif tracking-tight leading-none"
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
              className="h-20 md:h-36 w-auto -mt-4 md:-mt-8 mx-auto"
              style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
