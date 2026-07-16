"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";

export function VideoSection() {
  const ref = useRef(null);
  // Trigger when the video section is partially in view
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldPlay(true);
    }
  }, [isInView]);

  return (
    <section className="relative py-24 bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/images/texture-dots.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-pink/20 rounded-full blur-[100px]"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl text-foreground font-serif mb-6"
          >
            Insights & Perspectives
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/80 font-sans text-lg md:text-xl max-w-2xl mx-auto"
          >
            A deep dive into the intersection of ethical AI, human dignity, and the future of the Global South.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-foreground/10"
        >
          {shouldPlay ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/wYy9CqunS8g?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
              <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-white/60 font-sans text-sm animate-pulse">Loading video...</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
