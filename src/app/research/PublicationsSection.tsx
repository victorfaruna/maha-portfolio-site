"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { slugify } from "@/lib/slug";
import { getPublicationCoverImage } from "@/lib/publicationUtils";
import type { Publication } from "@/lib/supabase/types";

const CATEGORIES = ["All", "Policy Brief", "Academic Paper", "Article"];

export default function PublicationsSection({ publications }: { publications: Publication[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const filtered =
    selectedCategory === "All"
      ? publications
      : publications.filter((p) => p.category === selectedCategory);

  return (
    <section className="py-14 md:py-24 bg-background overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl">
        {/* Section Header & Curved Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 md:mb-16 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-pink font-semibold mb-3 flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5" />
              SCHOLARLY WORKS &amp; POLICY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy leading-tight">
              Featured Publications &amp; Articles
            </h2>
          </motion.div>

          {/* Curved Filter Tabs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex gap-2.5 overflow-x-auto pb-1.5 -mx-5 px-5 sm:mx-0 sm:px-0 sm:flex-wrap sm:pb-0"
          >
            {CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`px-4 sm:px-5 py-2 text-[11px] sm:text-xs uppercase tracking-wider rounded-full font-bold transition-all duration-300 whitespace-nowrap shrink-0 border ${
                    isSelected
                      ? "bg-brand-navy text-white border-brand-navy shadow-md ring-2 ring-brand-navy/20"
                      : "bg-secondary/40 text-foreground/70 border-border/60 hover:bg-brand-pink/10 hover:text-brand-pink hover:border-brand-pink/30"
                  }`}
                >
                  {cat}
                </motion.button>
              );
            })}
          </motion.div>
        </div>

        {/* Interactive Animated Cards Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((pub: Publication, idx: number) => {
              const articleSlug = pub.slug || slugify(pub.title);
              const hasContent = Boolean(pub.content || pub.slug);
              const coverImage = getPublicationCoverImage(pub);

              const cardInnerContent = (
                <div className="flex flex-col justify-between h-full">
                  {/* Cover Image Container with Floating Category & Year Badges */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-secondary/30 border-b border-border/50">
                    {coverImage ? (
                      <img
                        src={coverImage}
                        alt={pub.title}
                        className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-brand-navy/15 via-brand-pink/10 to-brand-navy/5 flex items-center justify-center p-6 text-center">
                        <span className="font-serif italic text-brand-navy/40 text-sm">
                          {pub.category}
                        </span>
                      </div>
                    )}

                    {/* Gradient Overlay for Tag Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-transparent pointer-events-none opacity-80" />

                    {/* Floating Category Tag on Cover Image */}
                    <div className="absolute top-3.5 left-3.5 z-10">
                      <span className="bg-white/95 backdrop-blur-md text-brand-pink border border-white/50 shadow-sm px-3 py-1 rounded-full text-[10px] font-extrabold tracking-widest uppercase inline-block">
                        {pub.category}
                      </span>
                    </div>

                    {/* Floating Year Badge on Cover Image */}
                    <div className="absolute top-3.5 right-3.5 z-10">
                      <span className="bg-black/65 backdrop-blur-md text-white/90 border border-white/20 shadow-sm px-2.5 py-1 rounded-full text-[10px] font-mono tracking-wider inline-block">
                        {pub.year}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="flex flex-col justify-between flex-1 p-6 sm:p-8">
                    <div>
                      {/* Publisher badge */}
                      {pub.source_label && (
                        <div className="mb-3">
                          <span className="inline-block text-[10px] sm:text-xs font-bold uppercase tracking-wider text-brand-pink/90 bg-brand-soft-pink px-2.5 py-0.5 rounded-md border border-brand-pink/20">
                            {pub.source_label}
                          </span>
                        </div>
                      )}

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-brand-navy mb-3 leading-snug group-hover:text-brand-pink transition-colors duration-300 font-medium">
                        {pub.title}
                      </h3>

                      {/* Short Excerpt */}
                      <p className="text-foreground/75 font-sans text-sm leading-relaxed line-clamp-3 mb-6">
                        {pub.excerpt}
                      </p>
                    </div>

                    {/* Read Article Indicator */}
                    {hasContent ? (
                      <div className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-bold uppercase tracking-wider text-brand-navy group-hover:text-brand-pink transition-colors pt-4 border-t border-border/50 mt-auto">
                        <span>Read Article</span>
                        <div className="w-8 h-8 rounded-full bg-brand-navy/5 group-hover:bg-brand-pink/15 flex items-center justify-center transition-colors">
                          <ArrowUpRight className="w-4 h-4 text-brand-navy group-hover:text-brand-pink transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </div>
                      </div>
                    ) : (
                      <div className="inline-flex items-center justify-between w-full text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/30 pt-4 border-t border-border/50 cursor-not-allowed mt-auto">
                        <span>Coming Soon</span>
                      </div>
                    )}
                  </div>
                </div>
              );

              return (
                <motion.div
                  layout
                  key={pub.id}
                  initial={{ opacity: 0, scale: 0.93, y: 24 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.93, y: 15 }}
                  transition={{
                    duration: 0.45,
                    delay: idx * 0.05,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  whileHover={{ y: -6 }}
                  className="group bg-card border border-border/80 hover:border-brand-pink/40 rounded-3xl shadow-sm hover:shadow-xl hover:shadow-brand-pink/5 transition-all duration-500 overflow-hidden flex flex-col relative"
                >
                  {hasContent ? (
                    <Link
                      href={`/research/${articleSlug}`}
                      className="block h-full cursor-pointer"
                    >
                      {cardInnerContent}
                    </Link>
                  ) : (
                    <div className="h-full">{cardInnerContent}</div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </motion.div>

        {filtered.length === 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center text-foreground/50 py-16 font-serif text-lg"
          >
            No publications in this category yet.
          </motion.p>
        )}
      </div>
    </section>
  );
}
