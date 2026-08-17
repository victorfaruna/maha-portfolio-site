"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
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
              SCHOLARLY WORKS &amp; POLICY
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy">
              Featured Publications &amp; Articles
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
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 sm:px-4 py-1.5 sm:py-2 text-[11px] sm:text-xs uppercase tracking-wider transition-all duration-300 font-semibold whitespace-nowrap shrink-0 ${
                  selectedCategory === cat
                    ? "bg-brand-navy text-white shadow-sm"
                    : "bg-secondary/60 text-foreground/70 hover:bg-secondary hover:text-brand-navy"
                }`}
              >
                {cat}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8">
          {filtered.map((pub: Publication, idx: number) => {
            const articleSlug = pub.slug || slugify(pub.title);
            const hasContent = Boolean(pub.content || pub.slug);
            const coverImage = getPublicationCoverImage(pub);

            const cardInnerContent = (
              <div className="flex flex-col justify-between h-full">
                {/* Optional Cover Image Banner */}
                {coverImage && (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-secondary/30 border-b border-border/60">
                    <img
                      src={coverImage}
                      alt={pub.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="flex flex-col justify-between flex-1 p-5 sm:p-8">
                  <div>
                    {/* Category Tag & Year */}
                    <div className="flex items-center justify-between mb-4 md:mb-6 text-xs uppercase tracking-widest font-semibold">
                      <span className="bg-brand-soft-pink text-brand-pink px-2.5 py-1 font-bold text-[10px] sm:text-xs">
                        {pub.category}
                      </span>
                      <span className="text-foreground/50">{pub.year}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-lg sm:text-xl md:text-2xl font-serif text-brand-navy mb-3 leading-tight group-hover:text-brand-pink transition-colors">
                      {pub.title}
                    </h3>

                    {/* Publisher badge */}
                    {pub.source_label && (
                      <p className="text-xs text-foreground/50 uppercase tracking-wider mb-3">
                        {pub.source_label}
                      </p>
                    )}

                    {/* Short Excerpt */}
                    <p className="text-foreground/70 font-sans text-sm leading-relaxed line-clamp-3 mb-6 md:mb-8">
                      {pub.excerpt}
                    </p>
                  </div>

                  {/* Read Article Link Indicator */}
                  {hasContent ? (
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-brand-navy group-hover:text-brand-pink transition-colors pt-4 border-t border-border/60 mt-auto">
                      Read Article
                      <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-foreground/30 pt-4 border-t border-border/60 cursor-not-allowed mt-auto">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            );

            return (
              <motion.div
                key={pub.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.06 }}
                className="group bg-background border border-border hover:border-brand-navy/30 transition-all duration-500 hover:shadow-lg relative overflow-hidden flex flex-col"
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
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-foreground/50 py-12 md:py-16">No publications in this category yet.</p>
        )}
      </div>
    </section>
  );
}
