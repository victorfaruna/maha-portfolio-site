"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Pause, Play, Image as ImageIcon } from "lucide-react";
import type { MediaItem } from "@/lib/supabase/types";

type Props = {
  mediaItems: MediaItem[];
};

export function ResearchGallery({ mediaItems }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(true);

  const nextSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % mediaItems.length);
  }, [mediaItems.length]);

  const prevSlide = useCallback(() => {
    if (mediaItems.length === 0) return;
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + mediaItems.length) % mediaItems.length);
  }, [mediaItems.length]);

  const goToSlide = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  useEffect(() => {
    if (!isPlaying || mediaItems.length === 0) return;
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [isPlaying, nextSlide, mediaItems.length]);

  if (mediaItems.length === 0) return null;

  const currentItem = mediaItems[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 200 : -200,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 200 : -200,
      opacity: 0,
    }),
  };

  return (
    <section className="py-14 md:py-24 bg-background border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-7xl">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-12 flex flex-col sm:flex-row sm:items-end justify-between gap-4"
        >
          <div>
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 flex items-center gap-2">
              <ImageIcon className="w-3.5 h-3.5" />
              MEDIA &amp; PHOTO GALLERY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy">
              Research &amp; Events in Action
            </h2>
          </div>

          {/* Counter & Play/Pause */}
          <div className="flex items-center gap-4">
            <span className="text-xs font-mono uppercase tracking-widest text-foreground/50">
              {String(currentIndex + 1).padStart(2, "0")} / {String(mediaItems.length).padStart(2, "0")}
            </span>
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-2 border border-border text-foreground/70 hover:text-brand-navy hover:border-brand-navy transition-colors rounded-full"
              aria-label={isPlaying ? "Pause Slideshow" : "Play Slideshow"}
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 ml-0.5" />}
            </button>
          </div>
        </motion.div>

        {/* Carousel Container */}
        <div className="bg-secondary/20 border border-border p-4 sm:p-6 md:p-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 items-start">

            {/* Image Slide Frame */}
            <div className="lg:col-span-7 relative aspect-[4/3] sm:aspect-[16/10] w-full overflow-hidden bg-black/5 border border-border shadow-md">
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentItem.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                  }}
                  className="absolute inset-0 w-full h-full"
                >
                  <Image
                    src={currentItem.image_url}
                    alt={currentItem.title ?? "Gallery image"}
                    fill
                    className="object-cover"
                    priority
                    unoptimized={currentItem.image_url.startsWith("/")}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Info Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-5">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentItem.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="space-y-4"
                >
                  {/* Tags */}
                  <div className="flex items-center gap-3 flex-wrap">
                    {currentItem.category_tag && (
                      <span className="bg-brand-pink/10 text-brand-pink border border-brand-pink/20 text-[10px] sm:text-xs px-2.5 py-1 font-semibold uppercase tracking-wider">
                        {currentItem.category_tag}
                      </span>
                    )}
                    {currentItem.year && (
                      <span className="text-xs uppercase tracking-widest text-foreground/50 font-medium">
                        {currentItem.year}
                      </span>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-brand-navy leading-snug">
                    {currentItem.title}
                  </h3>

                  {/* Context Note */}
                  <div className="border-l-2 border-brand-pink/40 pl-4 py-1">
                    <p className="text-[10px] sm:text-xs uppercase tracking-widest text-foreground/40 font-semibold mb-1">
                      IMAGE NOTE &amp; CONTEXT
                    </p>
                    <p className="text-foreground/80 font-sans text-sm md:text-base leading-relaxed">
                      {currentItem.context_note}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Prev / Next Navigation */}
              <div className="flex items-center gap-3 pt-4 border-t border-border/80">
                <button
                  onClick={prevSlide}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-5 border border-border text-brand-navy hover:bg-brand-navy hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group font-semibold uppercase text-[10px] sm:text-xs tracking-wider"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:-translate-x-1" />
                  Prev
                </button>
                <button
                  onClick={nextSlide}
                  className="flex-1 py-2.5 sm:py-3 px-3 sm:px-5 bg-brand-navy text-white hover:bg-brand-navy/90 transition-all duration-300 flex items-center justify-center gap-2 group font-semibold uppercase text-[10px] sm:text-xs tracking-wider"
                  aria-label="Next image"
                >
                  Next
                  <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Thumbnails Strip */}
          <div className="mt-6 md:mt-8 pt-5 md:pt-6 border-t border-border/60">
            <p className="text-[10px] uppercase tracking-widest text-foreground/50 font-semibold mb-3">
              Select Image ({mediaItems.length} Total)
            </p>
            <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 sm:gap-3">
              {mediaItems.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`relative aspect-[16/10] w-full overflow-hidden border transition-all duration-300 ${
                    currentIndex === index
                      ? "border-brand-pink ring-2 ring-brand-pink/30 scale-105"
                      : "border-border opacity-60 hover:opacity-100 hover:border-brand-navy/40"
                  }`}
                  aria-label={`Go to slide ${index + 1}: ${item.title}`}
                >
                  <Image
                    src={item.image_url}
                    alt={item.title ?? ""}
                    fill
                    className="object-cover"
                    unoptimized={item.image_url.startsWith("/")}
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
