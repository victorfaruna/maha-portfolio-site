"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Newspaper,
  Radio,
  Globe,
  ArrowUpRight,
  Play,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { speakingData, type MediaItem, type MediaCategory } from "@/data/speaking";

// ─── Constants ────────────────────────────────────────────────────────────────

const ROTATION_INTERVAL_MS = 3500;
const SLIDE_DURATION     = 0.55;  // seconds
const CARD_HEIGHT        = 370;   // px — all 4 slots same height

type FilterTab =
  | "ALL"
  | "KEYNOTES & TALKS"
  | "PRESS FEATURES"
  | "ARABIC MEDIA";

interface PressSectionProps {
  selectedTab: FilterTab;
  setSelectedTab: (tab: FilterTab) => void;
  setModalState: (state: { isOpen: boolean; videoId: string | null; title: string }) => void;
  customItems?: MediaItem[];
}

const CATEGORIES: FilterTab[] = [
  "ALL",
  "KEYNOTES & TALKS",
  "PRESS FEATURES",
  "ARABIC MEDIA",
];

const CATEGORY_ROWS: {
  label: string;
  tab: FilterTab;
  category: MediaCategory;
  startDelayMs: number;
  intervalMs: number;
}[] = [
  { label: "PRESS FEATURES",       tab: "PRESS FEATURES",       category: "Press Feature",       startDelayMs: 0,    intervalMs: 4000 },
  { label: "KEYNOTES & TALKS",      tab: "KEYNOTES & TALKS",      category: "Keynote & Talk",      startDelayMs: 1400, intervalMs: 4400 },
  { label: "ARABIC MEDIA",          tab: "ARABIC MEDIA",          category: "Arabic Media",        startDelayMs: 2800, intervalMs: 4600 },
];

// ─── Slide variants — all slots animate in the same direction simultaneously ──

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "102%" : "-102%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-102%" : "102%",
    opacity: 0,
  }),
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getCategoryIcon(cat: MediaCategory) {
  switch (cat) {
    case "Keynote & Talk":      return <Mic       className="w-3 h-3" />;
    case "Press Feature":       return <Newspaper className="w-3 h-3" />;
    case "Podcast & Broadcast": return <Radio     className="w-3 h-3" />;
    case "Arabic Media":        return <Globe     className="w-3 h-3" />;
  }
}

function getLinkLabel(cat: MediaCategory) {
  switch (cat) {
    case "Keynote & Talk":      return "Watch Talk";
    case "Press Feature":       return "Read Feature";
    case "Podcast & Broadcast": return "Listen / Watch";
    case "Arabic Media":        return "Read Article";
  }
}

function FallbackThumb({ outlet, category }: { outlet: string; category: MediaCategory }) {
  return (
    <div className="w-full h-full bg-brand-navy flex flex-col items-center justify-center gap-2 p-4">
      <div className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-brand-pink">
        {getCategoryIcon(category)}
      </div>
      <span className="text-white/50 text-[10px] font-mono uppercase tracking-widest text-center leading-tight line-clamp-2">
        {outlet}
      </span>
    </div>
  );
}

// ─── Card Content ─────────────────────────────────────────────────────────────
// Rendered inside each slot. The slot clips overflow so content slides in/out.

function CardContent({
  item,
  isFeatured,
  onVideoClick,
}: {
  item: MediaItem;
  isFeatured: boolean;
  onVideoClick: (id: string, title: string) => void;
}) {
  const isVideo = Boolean(item.videoId);

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isVideo && item.videoId) {
      onVideoClick(item.videoId, item.title);
    } else {
      window.open(item.link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group absolute inset-0 flex flex-col cursor-pointer hover:border-brand-pink/40 transition-colors"
    >
      {/* ── Thumbnail ── */}
      <div className="relative w-full h-[200px] flex-shrink-0 overflow-hidden bg-brand-navy/10">
        {item.ogImage ? (
          <img
            src={item.ogImage}
            alt={item.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        ) : (
          <FallbackThumb outlet={item.outlet} category={item.category} />
        )}

        {/* Video play overlay */}
        {isVideo && (
          <div className="absolute inset-0 bg-black/35 group-hover:bg-black/20 transition-colors flex items-center justify-center">
            <div
              className={`rounded-full bg-brand-pink text-white flex items-center justify-center shadow-xl group-hover:scale-110 transition-transform ${
                isFeatured ? "w-12 h-12" : "w-9 h-9"
              }`}
            >
              <Play
                className={`fill-current translate-x-0.5 ${isFeatured ? "w-5 h-5" : "w-3.5 h-3.5"}`}
              />
            </div>
          </div>
        )}

        {/* Category pill — featured slot only */}
        {isFeatured && (
          <div className="absolute top-3 left-3 z-10">
            <span className="bg-brand-soft-pink text-brand-pink px-2.5 py-1 text-[10px] font-bold rounded-full border border-brand-pink/20 uppercase tracking-wider inline-flex items-center gap-1">
              {getCategoryIcon(item.category)}
              {item.category}
            </span>
          </div>
        )}

        {/* Year badge */}
        {item.year && (
          <div className="absolute top-2 right-2 z-10">
            <span className="bg-black/55 backdrop-blur-sm text-white/85 px-2 py-0.5 text-[9px] font-mono rounded-full">
              {item.year}
            </span>
          </div>
        )}
      </div>

      {/* ── Body ── */}
      <div className={`flex flex-col flex-1 min-h-0 ${isFeatured ? "p-5" : "p-3.5"}`}>
        {/* Outlet */}
        <p
          className={`font-bold text-brand-pink uppercase tracking-widest truncate flex-shrink-0 mb-1.5 ${
            isFeatured ? "text-[10px]" : "text-[9px]"
          }`}
        >
          {item.outlet}
        </p>

        {/* Title */}
        <h3
          dir={item.isRTL ? "rtl" : "ltr"}
          className={`font-serif text-brand-navy group-hover:text-brand-pink transition-colors font-medium leading-snug flex-shrink-0 ${
            isFeatured
              ? "text-[17px] line-clamp-3 mb-2"
              : "text-[13px] line-clamp-2 mb-2"
          }`}
        >
          {item.isRTL ? (
            <span dir="rtl" lang="ar">
              {item.title}
            </span>
          ) : (
            item.title
          )}
        </h3>

        {/* Excerpt — featured slot only */}
        {isFeatured && item.description && (
          <p
            dir={item.isRTL ? "rtl" : "ltr"}
            className={`text-foreground/55 text-xs leading-relaxed line-clamp-2 mb-3 flex-shrink-0 ${
              item.isRTL ? "text-right" : ""
            }`}
          >
            {item.description}
          </p>
        )}

        {/* CTA */}
        <div
          className={`inline-flex items-center gap-1.5 font-bold uppercase tracking-wider text-brand-navy group-hover:text-brand-pink transition-colors mt-auto ${
            isFeatured ? "text-[11px]" : "text-[10px]"
          }`}
        >
          {getLinkLabel(item.category)}
          <ArrowUpRight
            className={`group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform ${
              isFeatured ? "w-3.5 h-3.5" : "w-3 h-3"
            }`}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Category Carousel ────────────────────────────────────────────────────────

function CategoryCarousel({
  label,
  items,
  onVideoClick,
  startDelayMs = 0,
  intervalMs = 4000,
}: {
  label: string;
  items: MediaItem[];
  onVideoClick: (id: string, title: string) => void;
  startDelayMs?: number;
  intervalMs?: number;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection]       = useState<1 | -1>(1);
  const [isPaused, setIsPaused]         = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const timeoutRef  = useRef<ReturnType<typeof setTimeout>  | null>(null);

  const total    = items.length;
  const numSlots = Math.min(total, 4);

  // ── Timer ────────────────────────────────────────────────────────────────
  const startTimer = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, intervalMs);
  }, [total, intervalMs]);

  useEffect(() => {
    if (isPaused) {
      if (timeoutRef.current)  clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    // Stagger startup timer on initial page load / refresh
    timeoutRef.current = setTimeout(() => {
      startTimer();
    }, startDelayMs);

    return () => {
      if (timeoutRef.current)  clearTimeout(timeoutRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, startDelayMs, startTimer]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
    startTimer();
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
    startTimer();
  };

  if (total === 0) return null;

  // Derive articles for each slot
  const slotItems = Array.from(
    { length: numSlots },
    (_, i) => items[(currentIndex + i) % total],
  );

  // Grid: featured slot (32%) + equal small slots (22% each)
  const gridCols =
    numSlots === 1 ? "1fr" :
    numSlots === 2 ? "32fr 22fr" :
    numSlots === 3 ? "32fr 22fr 22fr" :
                     "32fr 22fr 22fr 22fr";

  return (
    <div className="py-8 border-t border-border/40 first:border-t-0 first:pt-0">

      {/* ── Row header ── */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-foreground/40 inline-flex items-center gap-2">
          {getCategoryIcon(items[0].category)}
          {label}
        </span>

        <div className="flex items-center gap-2">
          {/* Dot indicators */}
          <div className="hidden sm:flex items-center gap-1 mr-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setDirection(i > currentIndex ? 1 : -1);
                  setCurrentIndex(i);
                  startTimer();
                }}
                className={`rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? "bg-brand-pink w-4 h-1.5"
                    : "bg-foreground/20 w-1.5 h-1.5"
                }`}
                aria-label={`Go to article ${i + 1}`}
              />
            ))}
          </div>

          {/* Prev / Next arrows */}
          <button
            onClick={handlePrev}
            aria-label={`Previous ${label} article`}
            className="w-7 h-7 rounded-full border border-border/70 hover:border-brand-pink/60 flex items-center justify-center text-foreground/50 hover:text-brand-pink transition-all"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleNext}
            aria-label={`Next ${label} article`}
            className="w-7 h-7 rounded-full border border-border/70 hover:border-brand-pink/60 flex items-center justify-center text-foreground/50 hover:text-brand-pink transition-all"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Desktop: 4-slot grid — slots never move, only content slides ── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="hidden md:grid gap-3"
        style={{ gridTemplateColumns: gridCols }}
      >
        {slotItems.map((item, slotIdx) => {
          const isFeatured = slotIdx === 0;
          return (
            // Fixed slot container — never moves, clips sliding content
            <div
              key={slotIdx}
              className="rounded-xl border border-border/60 bg-card overflow-hidden relative"
              style={{ height: `${CARD_HEIGHT}px` }}
            >
              {/*
                AnimatePresence mode="sync":
                - Old content exits (slides left) and new content enters (from right) simultaneously
                - Both are absolute-positioned so they overlay inside the fixed slot
                - With all 4 slots animating in the same direction at the same speed,
                  the result looks like a single physical strip sliding leftward
              */}
              <AnimatePresence initial={false} custom={direction} mode="sync">
                <motion.div
                  key={`slot${slotIdx}-${item.title}`}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: SLIDE_DURATION,
                    ease: [0.32, 0.72, 0, 1], // snappy ease-out curve
                  }}
                  className="absolute inset-0"
                >
                  <CardContent
                    item={item}
                    isFeatured={isFeatured}
                    onVideoClick={onVideoClick}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          );
        })}
      </div>

      {/* ── Mobile: single full-width slot ── */}
      <div
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        className="md:hidden"
      >
        <div
          className="rounded-xl border border-border/60 bg-card overflow-hidden relative"
          style={{ height: `${CARD_HEIGHT}px` }}
        >
          <AnimatePresence initial={false} custom={direction} mode="sync">
            <motion.div
              key={`mobile-${slotItems[0].title}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: SLIDE_DURATION, ease: [0.32, 0.72, 0, 1] }}
              className="absolute inset-0"
            >
              <CardContent
                item={slotItems[0]}
                isFeatured={true}
                onVideoClick={onVideoClick}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Mobile dot indicators */}
        <div className="flex justify-center gap-1.5 mt-3">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > currentIndex ? 1 : -1);
                setCurrentIndex(i);
                startTimer();
              }}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex ? "bg-brand-pink w-4" : "bg-foreground/20 w-1.5"
              }`}
              aria-label={`Go to article ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── PressSection (main export) ───────────────────────────────────────────────

export default function PressSection({
  selectedTab,
  setSelectedTab,
  setModalState,
  customItems,
}: PressSectionProps) {
  const handleVideoClick = (videoId: string, title: string) => {
    setModalState({ isOpen: true, videoId, title });
  };

  const mediaSource = customItems && customItems.length > 0 ? customItems : speakingData;

  const getItemsForCategory = (category: MediaCategory) =>
    mediaSource.filter((item) => item.category === category);

  const visibleRows =
    selectedTab === "ALL"
      ? CATEGORY_ROWS
      : CATEGORY_ROWS.filter((row) => row.tab === selectedTab);

  return (
    <section className="py-16 md:py-24 bg-background border-b border-border/60">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl">

        {/* ── Section Header + Filter Tabs ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-14 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
              PRESS &amp; MEDIA ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy leading-tight">
              In the Press &amp; Public Voice
            </h2>
          </motion.div>

          {/* Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex gap-2.5 overflow-x-auto pb-1.5 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:pb-0"
          >
            {CATEGORIES.map((tab) => {
              const isSelected = selectedTab === tab;
              return (
                <motion.button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-4 sm:px-5 py-2 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-bold transition-all duration-300 whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? "bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-navy/20"
                      : "bg-secondary/40 text-foreground/70 border-border/60 hover:bg-brand-pink/10 hover:text-brand-pink hover:border-brand-pink/30"
                  }`}
                >
                  {tab}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* ── Per-category carousels ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {visibleRows.map((row) => (
            <CategoryCarousel
              key={row.category}
              label={row.label}
              items={getItemsForCategory(row.category)}
              onVideoClick={handleVideoClick}
              startDelayMs={row.startDelayMs}
              intervalMs={row.intervalMs}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
