'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { testimonials as temporaryTestimonials, type Testimonial } from '@/data/testimonials';

export function TestimonialsSection({ items }: { items?: Testimonial[] }) {
  const source = items?.length ? items : temporaryTestimonials;
  const [activeIndex, setActiveIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const index = activeIndex % source.length;
  const item = source[index];

  return (
    <section id="testimonials" aria-labelledby="testimonials-heading" className="scroll-mt-28 md:scroll-mt-48 py-16 md:py-24 bg-background border-b border-border/60">
      <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-4xl">
        <div className="text-center mb-10 md:mb-14">
          <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
            {item.isPlaceholder ? 'PREVIEW CONTENT' : 'SOCIAL PROOF & FEEDBACK'}
          </span>
          <h2 id="testimonials-heading" className="text-3xl sm:text-4xl font-sans text-brand-navy leading-tight">
            Testimonials &amp; Endorsements
          </h2>
        </div>

        <div className="relative bg-card border border-border/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
          <Quote strokeWidth={1.75} aria-hidden="true" className="w-12 h-12 text-brand-pink/20 mx-auto mb-6" />
          {item.isPlaceholder && (
            <p className="mb-6 text-xs font-medium text-foreground/60">
              Temporary sample — real testimonials will appear here once added and published.
            </p>
          )}
          <div aria-live="polite" aria-atomic="true">
            <AnimatePresence mode="wait">
              <motion.figure
                key={item.id}
                initial={{ opacity: 0, y: reducedMotion ? 0 : 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reducedMotion ? 0 : -15 }}
                transition={{ duration: reducedMotion ? 0 : 0.3 }}
              >
                <blockquote className="break-words text-lg sm:text-xl md:text-2xl font-sans text-brand-navy leading-relaxed italic mb-8">
                  &ldquo;{item.quote}&rdquo;
                </blockquote>
                <figcaption>
                  {item.avatar && (
                    <img src={item.avatar} alt={item.name} loading="lazy"
                      className="mx-auto mb-3 size-14 rounded-full object-cover"
                      onError={(event) => { event.currentTarget.hidden = true; }} />
                  )}
                  <p className="text-base font-bold text-brand-navy tracking-tight">{item.name}</p>
                  {item.title && <p className="text-xs text-foreground/60 font-sans mt-0.5">{item.title}</p>}
                </figcaption>
              </motion.figure>
            </AnimatePresence>
          </div>

          {source.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border/40">
              <button type="button" onClick={() => setActiveIndex((index + source.length - 1) % source.length)}
                className="size-10 rounded-full bg-secondary/60 hover:bg-brand-pink hover:text-white text-brand-navy flex items-center justify-center transition-colors"
                aria-label="Previous testimonial">
                <ChevronLeft className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
              <span className="text-xs text-foreground/50">{index + 1} / {source.length}</span>
              <button type="button" onClick={() => setActiveIndex((index + 1) % source.length)}
                className="size-10 rounded-full bg-secondary/60 hover:bg-brand-pink hover:text-white text-brand-navy flex items-center justify-center transition-colors"
                aria-label="Next testimonial">
                <ChevronRight className="size-5" strokeWidth={1.75} aria-hidden="true" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
