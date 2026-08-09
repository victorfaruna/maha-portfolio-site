import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ExternalLink, Calendar, Building2 } from 'lucide-react';
import { Navbar } from '@/components/sections/Navbar';
import { Footer } from '@/components/sections/Footer';
import { ArticleBody } from '@/components/sections/ArticleBody';
import { createAnonServerClient } from '@/lib/supabase/server';
import { slugify } from '@/lib/slug';
import type { Publication } from '@/lib/supabase/types';

export const dynamic = 'force-dynamic';

async function getPublicationBySlug(slug: string): Promise<Publication | null> {
  const supabase = createAnonServerClient();

  // 1. Try exact slug match
  const { data: exactMatch } = await supabase
    .from('publications')
    .select('*')
    .eq('slug', slug)
    .maybeSingle();

  if (exactMatch) return exactMatch as Publication;

  // 2. Fallback: match by slugified title
  const { data: allPubs } = await supabase.from('publications').select('*');
  if (allPubs) {
    const match = allPubs.find((p) => p.slug === slug || slugify(p.title) === slug);
    if (match) return match as Publication;
  }

  return null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pub = await getPublicationBySlug(slug);

  if (!pub) {
    return { title: 'Article Not Found — Maha Jouini' };
  }

  return {
    title: `${pub.title} — Maha Jouini`,
    description: pub.excerpt,
  };
}

export default async function PublicationArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const publication = await getPublicationBySlug(slug);

  if (!publication) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col">
      <Navbar />

      {/* Article Header Container */}
      <article className="flex-1 pt-28 sm:pt-36 md:pt-44 pb-14 md:pb-24">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-4xl">
          {/* Back link */}
          <Link
            href="/research"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-foreground/60 hover:text-brand-navy mb-6 md:mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Research &amp; Publications
          </Link>

          {/* Header Metadata */}
          <div className="flex flex-wrap items-center gap-3 mb-6 text-xs uppercase tracking-widest font-semibold">
            <span className="bg-brand-soft-pink text-brand-pink px-3 py-1 font-bold">
              {publication.category}
            </span>
            <span className="text-foreground/40">•</span>
            <span className="text-foreground/60 inline-flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-brand-pink" />
              {publication.year}
            </span>
            {publication.source_label && (
              <>
                <span className="text-foreground/40">•</span>
                <span className="text-foreground/60 inline-flex items-center gap-1">
                  <Building2 className="w-3.5 h-3.5 text-brand-pink" />
                  {publication.source_label}
                </span>
              </>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy leading-tight tracking-tight mb-8">
            {publication.title}
          </h1>

          {/* Excerpt framing quote box */}
          {publication.excerpt && (
            <div className="relative pl-6 md:pl-8 border-l-4 border-brand-pink bg-secondary/40 py-5 pr-6 my-8">
              <p className="text-lg md:text-xl text-brand-navy font-serif leading-relaxed italic">
                "{publication.excerpt}"
              </p>
            </div>
          )}

          {/* Original External Link badge if present */}
          {publication.link && publication.link !== '#' && (
            <div className="mb-12 p-4 bg-brand-soft-blue border border-border flex items-center justify-between gap-4">
              <span className="text-xs text-foreground/70 font-sans">
                Originally published via <strong>{publication.source_label || 'External Source'}</strong>
              </span>
              <a
                href={publication.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-brand-navy border border-brand-navy/20 hover:bg-brand-navy hover:text-white transition-all shrink-0"
              >
                View Original
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}

          {/* Article Body Content */}
          <div className="mt-12 pt-8 border-t border-border">
            {publication.content ? (
              <ArticleBody content={publication.content} />
            ) : (
              <div className="py-16 text-center bg-secondary/20 border border-dashed border-border p-8">
                <p className="text-foreground/60 font-serif text-lg mb-2">
                  Article body content coming soon.
                </p>
                <p className="text-xs text-foreground/40 max-w-md mx-auto">
                  The full article body text for this publication has not been added to the CMS yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </article>

      <Footer showGradient />
    </main>
  );
}
