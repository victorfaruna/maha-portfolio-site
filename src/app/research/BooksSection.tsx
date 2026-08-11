"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import type { Book } from "@/lib/supabase/types";

export default function BooksSection({ books }: { books: Book[] }) {
  if (books.length === 0) return null;

  return (
    <section className="py-14 md:py-24 bg-secondary/30 text-foreground border-t border-border relative overflow-hidden">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-10 md:mb-16 text-center max-w-3xl mx-auto"
        >
          <span className="text-[10px] sm:text-xs uppercase tracking-widest text-brand-pink font-semibold mb-4 block">
            LITERARY &amp; ANTHROPOLOGICAL WORKS
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy mb-4 md:mb-6">
            Published Books
          </h2>
          <p className="text-foreground/70 font-sans text-sm md:text-lg">
            Exploring cultural narratives, regional history, and human story-telling as foundations for contemporary global perspectives.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 lg:gap-16">
          {books.map((book, idx) => (
            <motion.div
              key={book.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.2 }}
              className="bg-background border border-border p-5 sm:p-8 md:p-10 flex flex-col sm:flex-row gap-6 sm:gap-8 items-center group hover:border-brand-navy/30 transition-all duration-500 shadow-sm"
            >
              {/* Book Cover Image */}
              {book.cover_image_url && (
                <div className="relative w-32 h-44 sm:w-40 sm:h-56 flex-shrink-0 shadow-md overflow-hidden rounded-sm group-hover:scale-105 transition-transform duration-500">
                  <Image
                    src={book.cover_image_url}
                    alt={book.title_english}
                    fill
                    className="object-cover"
                    unoptimized={true}
                  />
                </div>
              )}

              {/* Book Details */}
              <div className="flex flex-col justify-between flex-grow text-center sm:text-left">
                <div>
                  {book.published_year && (
                    <span className="text-xs uppercase tracking-widest text-brand-pink font-semibold mb-2 block">
                      Published {book.published_year}
                    </span>
                  )}

                  {/* Arabic Title + English Title */}
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-serif text-brand-navy mb-2 leading-snug">
                    <span dir="rtl" lang="ar" className="font-serif font-bold ml-2">
                      {book.title_arabic}
                    </span>{" "}
                    <span className="italic text-foreground/70 font-sans text-base sm:text-xl font-light block sm:inline mt-1 sm:mt-0">
                      ({book.title_english})
                    </span>
                  </h3>

                  <p className="text-foreground/70 font-sans text-sm leading-relaxed my-3 md:my-4">
                    {book.description}
                  </p>
                </div>

                {book.external_link && book.external_link !== "#" ? (
                  <a
                    href={book.external_link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold uppercase tracking-wider text-brand-navy hover:text-brand-pink transition-colors mt-3 md:mt-4"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </a>
                ) : (
                  <span className="inline-flex items-center justify-center sm:justify-start gap-2 text-sm font-semibold uppercase tracking-wider text-foreground/30 mt-3 md:mt-4">
                    Learn More
                    <ArrowRight className="w-4 h-4" />
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
