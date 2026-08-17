"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Download, ArrowRight, Mic, Newspaper, Radio, Globe } from "lucide-react";
import { speakingData, type MediaItem, type MediaCategory } from "@/data/speaking";

const CATEGORIES = [
  "ALL",
  "KEYNOTES & TALKS",
  "PRESS FEATURES",
  "PODCASTS & BROADCASTS",
  "ARABIC MEDIA",
] as const;

type FilterTab = (typeof CATEGORIES)[number];

function getCategoryIcon(cat: MediaCategory) {
  switch (cat) {
    case "Keynote & Talk":
      return <Mic className="w-3.5 h-3.5" />;
    case "Press Feature":
      return <Newspaper className="w-3.5 h-3.5" />;
    case "Podcast & Broadcast":
      return <Radio className="w-3.5 h-3.5" />;
    case "Arabic Media":
      return <Globe className="w-3.5 h-3.5" />;
    default:
      return null;
  }
}

function getLinkLabel(cat: MediaCategory) {
  switch (cat) {
    case "Keynote & Talk":
      return "Watch Talk / Read";
    case "Press Feature":
      return "Read Feature";
    case "Podcast & Broadcast":
      return "Listen / Watch Broadcast";
    case "Arabic Media":
      return "Read Article / Watch";
    default:
      return "View Link";
  }
}

export default function SpeakingSection() {
  const [selectedTab, setSelectedTab] = useState<FilterTab>("ALL");

  const filteredItems = speakingData.filter((item: MediaItem) => {
    if (selectedTab === "ALL") return true;
    if (selectedTab === "KEYNOTES & TALKS") return item.category === "Keynote & Talk";
    if (selectedTab === "PRESS FEATURES") return item.category === "Press Feature";
    if (selectedTab === "PODCASTS & BROADCASTS") return item.category === "Podcast & Broadcast";
    if (selectedTab === "ARABIC MEDIA") return item.category === "Arabic Media";
    return true;
  });

  return (
    <div className="w-full">
      {/* ── 2. INTRO FRAMING & PRESS KIT DOWNLOAD ────────────────────────── */}
      <section className="py-12 md:py-16 bg-secondary/40 border-b border-border">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-4xl text-center">
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-base sm:text-lg md:text-xl text-foreground/80 font-sans leading-relaxed font-light mb-8"
          >
            Maha Jouini is an internationally recognized AI governance expert, researcher, and keynote speaker.
            She delivers keynote addresses, panel contributions, and expert commentary for global forums hosted by
            UNESCO, the African Union, GITEX Africa, and international news outlets—bringing Arab and African
            perspectives to global debates on ethical technology, data policy, and sovereign AI innovation.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="flex flex-wrap items-center justify-center gap-4"
          >
            <a
              href="/press-kit.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-brand-navy text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-brand-pink transition-all duration-300 shadow-md group"
            >
              <Download className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
              Download Press Kit (PDF)
            </a>

            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3.5 border border-brand-navy/30 text-brand-navy text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-brand-navy hover:text-white transition-all duration-300"
            >
              Booking &amp; Media Inquiries
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 3. FILTER TABS & CONTENT GRID ──────────────────────────────── */}
      <section className="py-14 md:py-24 bg-background">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl">
          {/* Section Header & Filter Tabs */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-[10px] sm:text-xs uppercase tracking-widest text-foreground/50 font-semibold mb-3 block">
                PRESS &amp; BROADCAST ARCHIVE
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy">
                Keynotes, Features &amp; Commentary
              </h2>
            </motion.div>

            {/* Filter Tabs — scrollable on mobile */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex gap-2 overflow-x-auto pb-1 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:pb-0"
            >
              {CATEGORIES.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setSelectedTab(tab)}
                  className={`px-3.5 sm:px-4 py-2 text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 font-semibold whitespace-nowrap shrink-0 ${
                    selectedTab === tab
                      ? "bg-brand-navy text-white shadow-sm"
                      : "bg-secondary/60 text-foreground/70 hover:bg-secondary hover:text-brand-navy"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </motion.div>
          </div>

          {/* Media Items Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredItems.map((item: MediaItem, idx: number) => {
              return (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.05 }}
                  className="group bg-background border border-border hover:border-brand-navy/30 transition-all duration-500 hover:shadow-lg relative flex flex-col justify-between p-6 sm:p-8"
                >
                  <div>
                    {/* Meta Bar: Category Tag & Year */}
                    <div className="flex items-center justify-between mb-4 text-xs uppercase tracking-widest font-semibold">
                      <span className="bg-brand-soft-pink text-brand-pink px-2.5 py-1 font-bold text-[10px] sm:text-xs inline-flex items-center gap-1.5">
                        {getCategoryIcon(item.category)}
                        {item.category}
                      </span>
                      {item.year && (
                        <span className="text-foreground/50 text-xs font-semibold">
                          {item.year}
                        </span>
                      )}
                    </div>

                    {/* Outlet Name */}
                    <p className="text-xs font-semibold text-brand-pink uppercase tracking-widest mb-2">
                      {item.outlet}
                    </p>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl font-serif text-brand-navy mb-3 leading-snug group-hover:text-brand-pink transition-colors">
                      {item.title}
                    </h3>

                    {/* Description */}
                    {item.description && (
                      <p
                        dir={item.isRTL ? "rtl" : "ltr"}
                        className={`text-foreground/75 font-sans text-xs sm:text-sm leading-relaxed mb-6 font-normal ${
                          item.isRTL ? "text-right font-serif" : "text-left"
                        }`}
                      >
                        {item.description}
                      </p>
                    )}
                  </div>

                  {/* External Link Divider & Button */}
                  <div className="pt-4 border-t border-border/60 mt-auto">
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-pink transition-colors"
                    >
                      <span>{getLinkLabel(item.category)}</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {filteredItems.length === 0 && (
            <p className="text-center text-foreground/50 py-16">
              No media items found in this category.
            </p>
          )}
        </div>
      </section>

      {/* ── 5. CLOSING CTA BANNER ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 max-w-3xl relative z-10">
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 block">
            SPEAKING &amp; EVENT INQUIRIES
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-4xl font-serif mb-5 leading-tight">
            Interested in booking Maha for a keynote, panel, or interview?
          </h3>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 font-light max-w-xl mx-auto leading-relaxed">
            Maha Jouini delivers compelling keynotes, policy moderation, and expert commentary for international summits, tech conferences, and global broadcasts.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-pink text-white text-xs sm:text-sm font-semibold uppercase tracking-wider hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-xl"
          >
            Get in Touch
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
