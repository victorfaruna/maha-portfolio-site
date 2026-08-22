"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Publication } from "@/lib/supabase/types";
import { getPublicationCoverImage } from "@/lib/publicationUtils";

// ─── Types ────────────────────────────────────────────────────────────────────

type SlotType = "left" | "top-right" | "bottom-right";

type SlotConfig = {
  slot: SlotType;
  intervalMs: number;
  startDelayMs: number;
  slotIndex: number;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const SLOT_CONFIGS: SlotConfig[] = [
  { slot: "left",         intervalMs: 5000, startDelayMs: 0,    slotIndex: 0 },
  { slot: "top-right",    intervalMs: 3500, startDelayMs: 1200, slotIndex: 1 },
  { slot: "bottom-right", intervalMs: 4000, startDelayMs: 2500, slotIndex: 2 },
];

// ─── Per-slot framer-motion variants ─────────────────────────────────────────

const leftVariants = {
  enter:  { x: "100%",  opacity: 0 },
  center: { x: 0,       opacity: 1 },
  exit:   { x: "-100%", opacity: 0 },
};

const topRightVariants = {
  enter:  { y: "-100%", opacity: 0 },
  center: { y: 0,       opacity: 1 },
  exit:   { y: "100%",  opacity: 0 },
};

const bottomRightVariants = {
  enter:  { y: "100%",  opacity: 0 },
  center: { y: 0,       opacity: 1 },
  exit:   { y: "-100%", opacity: 0 },
};

function variantsFor(slot: SlotType) {
  if (slot === "left")         return leftVariants;
  if (slot === "top-right")    return topRightVariants;
  return bottomRightVariants;
}

// ─── Fallback Thumb ───────────────────────────────────────────────────────────

function FallbackThumb({ title }: { title: string }) {
  return (
    <div className="absolute inset-0 bg-brand-navy flex flex-col items-center justify-center gap-4 p-8">
      <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
        <svg className="w-6 h-6 text-brand-pink" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10l6 6v8a2 2 0 01-2 2z" />
        </svg>
      </div>
      <p className="text-white/60 text-sm font-serif text-center leading-snug line-clamp-3 max-w-[200px]">
        {title}
      </p>
    </div>
  );
}

// ─── Article Card Content ─────────────────────────────────────────────────────

function ArticleCard({
  publication,
  isFeatured,
}: {
  publication: Publication;
  isFeatured: boolean;
}) {
  const imgSrc = getPublicationCoverImage(publication);
  const href = publication.link ?? (publication.slug ? `/research/${publication.slug}` : "#");

  return (
    <a
      href={href}
      target={publication.link ? "_blank" : "_self"}
      rel="noopener noreferrer"
      className="absolute inset-0 group block"
    >
      {/* Background image */}
      {imgSrc ? (
        <img
          src={imgSrc}
          alt={publication.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          loading="lazy"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
          }}
        />
      ) : (
        <FallbackThumb title={publication.title} />
      )}

      {/* Dark gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.30) 50%, transparent 100%)",
        }}
      />

      {/* Category pill — top left: PINK ON WHITE */}
      <div className="absolute top-3 left-3 z-10">
        <span className="bg-white/95 text-brand-pink font-extrabold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full shadow-md border border-white/20">
          {publication.category}
        </span>
      </div>

      {/* Year badge — top right */}
      {publication.year && (
        <div className="absolute top-3 right-3 z-10">
          <span className="bg-black/50 backdrop-blur-sm text-white/90 text-[9px] font-mono px-2 py-0.5 rounded-full">
            {publication.year}
          </span>
        </div>
      )}

      {/* Text content — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-10">
        {/* Source label */}
        {publication.source_label && (
          <p className="text-brand-pink text-[9px] font-bold uppercase tracking-widest mb-1.5">
            {publication.source_label}
          </p>
        )}

        {/* Title */}
        <h3
          className={`font-serif text-white leading-snug font-medium group-hover:text-white/90 transition-colors ${
            isFeatured
              ? "text-[20px] sm:text-[22px] line-clamp-3 mb-2"
              : "text-[14px] sm:text-[15px] line-clamp-2"
          }`}
        >
          {publication.title}
        </h3>

        {/* Excerpt — featured card only */}
        {isFeatured && publication.excerpt && (
          <p className="text-white/75 text-[13px] leading-relaxed line-clamp-2 mt-2 font-sans font-light">
            {publication.excerpt}
          </p>
        )}
      </div>
    </a>
  );
}

// ─── Single Animated Slot ─────────────────────────────────────────────────────

function AnimatedSlot({
  publications,
  config,
  currentIndex,
  onRotate,
  isFeatured,
  className,
}: {
  publications: Publication[];
  config: SlotConfig;
  currentIndex: number;
  onRotate: (slotIndex: number) => void;
  isFeatured: boolean;
  className?: string;
}) {
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);

  const total = publications.length;
  const variants = variantsFor(config.slot);

  useEffect(() => {
    if (total <= 1) return;

    // Stagger startup
    timeoutRef.current = setTimeout(() => {
      intervalRef.current = setInterval(() => {
        onRotate(config.slotIndex);
      }, config.intervalMs);
    }, config.startDelayMs);

    return () => {
      if (timeoutRef.current)  clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [total, config.intervalMs, config.startDelayMs, config.slotIndex, onRotate]);

  const publication = publications[currentIndex];
  if (!publication) return null;

  return (
    <div
      className={`relative overflow-hidden rounded-xl bg-brand-navy/20 ${className ?? ""}`}
    >
      <AnimatePresence initial={false} mode="sync">
        <motion.div
          key={`${config.slot}-${currentIndex}-${publication.id}`}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="absolute inset-0"
        >
          <ArticleCard
            publication={publication}
            isFeatured={isFeatured}
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

// ─── NewsHeroGrid (main export) ───────────────────────────────────────────────

export default function NewsHeroGrid({
  publications,
}: {
  publications: Publication[];
}) {
  const total = publications.length;

  // Initial state is deterministic for SSR to prevent hydration errors
  const [activeIndices, setActiveIndices] = useState<[number, number, number]>(() => [
    0,
    total > 1 ? 1 : 0,
    total > 2 ? 2 : 0,
  ]);

  // Perform initial shuffle on client mount only (after hydration)
  useEffect(() => {
    if (total <= 3) return;
    const pool = Array.from({ length: total }, (_, i) => i);
    for (let i = pool.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [pool[i], pool[j]] = [pool[j], pool[i]];
    }
    setActiveIndices([pool[0], pool[1], pool[2]]);
  }, [total]);

  // Rotate a specific slot to a random non-duplicate article
  const handleRotate = useCallback((slotIdx: number) => {
    setActiveIndices((prev) => {
      if (total <= 1) return prev;

      const otherIndices = prev.filter((_, i) => i !== slotIdx);
      
      // Candidates: any index not currently displayed on OTHER slots and different from CURRENT slot
      let candidates = Array.from({ length: total }, (_, k) => k).filter(
        (k) => !otherIndices.includes(k) && k !== prev[slotIdx]
      );

      // Fallback 1: any index not currently displayed on other slots
      if (candidates.length === 0) {
        candidates = Array.from({ length: total }, (_, k) => k).filter(
          (k) => !otherIndices.includes(k)
        );
      }

      // Fallback 2: any index except current slot index
      if (candidates.length === 0) {
        candidates = Array.from({ length: total }, (_, k) => k).filter(
          (k) => k !== prev[slotIdx]
        );
      }

      if (candidates.length === 0) return prev;

      const nextIndex = candidates[Math.floor(Math.random() * candidates.length)];
      const next = [...prev] as [number, number, number];
      next[slotIdx] = nextIndex;
      return next;
    });
  }, [total]);

  if (total === 0) return null;

  return (
    <section className="py-12 md:py-16 bg-background">
      <div className="container mx-auto px-3 sm:px-5 md:px-12 max-w-8xl">

        {/* Desktop: 65/35 grid */}
        <div
          className="hidden md:grid gap-3"
          style={{
            gridTemplateColumns: "65fr 35fr",
            gridTemplateRows: "520px",
          }}
        >
          {/* Left — big featured card, slides L←R */}
          <AnimatedSlot
            publications={publications}
            config={SLOT_CONFIGS[0]}
            currentIndex={activeIndices[0]}
            onRotate={handleRotate}
            isFeatured={true}
            className="row-span-1"
          />

          {/* Right column — two stacked cards */}
          <div className="flex flex-col gap-3">
            {/* Top-right — slides top→bottom */}
            <AnimatedSlot
              publications={publications}
              config={SLOT_CONFIGS[1]}
              currentIndex={activeIndices[1]}
              onRotate={handleRotate}
              isFeatured={false}
              className="flex-1"
            />
            {/* Bottom-right — slides bottom→top */}
            <AnimatedSlot
              publications={publications}
              config={SLOT_CONFIGS[2]}
              currentIndex={activeIndices[2]}
              onRotate={handleRotate}
              isFeatured={false}
              className="flex-1"
            />
          </div>
        </div>

        {/* Mobile: same 65/35 grid as desktop */}
        <div
          className="md:hidden grid gap-3"
          style={{
            gridTemplateColumns: "65fr 35fr",
            gridTemplateRows: "300px",
          }}
        >
          {/* Left — big featured card */}
          <AnimatedSlot
            publications={publications}
            config={SLOT_CONFIGS[0]}
            currentIndex={activeIndices[0]}
            onRotate={handleRotate}
            isFeatured={true}
            className="row-span-1"
          />

          {/* Right column — two stacked cards */}
          <div className="flex flex-col gap-3">
            <AnimatedSlot
              publications={publications}
              config={SLOT_CONFIGS[1]}
              currentIndex={activeIndices[1]}
              onRotate={handleRotate}
              isFeatured={false}
              className="flex-1"
            />
            <AnimatedSlot
              publications={publications}
              config={SLOT_CONFIGS[2]}
              currentIndex={activeIndices[2]}
              onRotate={handleRotate}
              isFeatured={false}
              className="flex-1"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
