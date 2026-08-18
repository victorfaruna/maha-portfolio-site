import type { Publication } from '@/lib/supabase/types';

/**
 * Gets the cover image URL for a publication.
 * 1. Returns publication.cover_image_url if explicitly set.
 * 2. Otherwise, automatically extracts the first <img> src found in publication.content (Tiptap JSON).
 */
export function getPublicationCoverImage(publication: Publication): string | null {
  if (publication.cover_image_url) {
    return publication.cover_image_url;
  }

  if (publication.content) {
    let firstImageSrc: string | null = null;

    function findFirstImage(node: any) {
      if (firstImageSrc) return;
      if (!node) return;
      if (node.type === 'image' && node.attrs && node.attrs.src) {
        firstImageSrc = node.attrs.src;
        return;
      }
      if (node.content && Array.isArray(node.content)) {
        for (const child of node.content) {
          findFirstImage(child);
          if (firstImageSrc) return;
        }
      }
    }

    findFirstImage(publication.content);
    if (firstImageSrc) return firstImageSrc;
  }

  return null;
}

/**
 * Calculates estimated read time (in minutes) and realistic views count for an article.
 */
export function calculateReadTimeAndViews(publication: Publication): { readTimeMinutes: number; viewsCount: number } {
  let wordCount = 0;
  if (publication.excerpt) {
    wordCount += publication.excerpt.split(/\s+/).length;
  }

  if (publication.content) {
    function countWords(node: any) {
      if (!node) return;
      if (node.text) {
        wordCount += node.text.split(/\s+/).length;
      }
      if (node.content && Array.isArray(node.content)) {
        for (const child of node.content) {
          countWords(child);
        }
      }
    }
    countWords(publication.content);
  }

  const readTimeMinutes = Math.max(3, Math.ceil(wordCount / 180));

  // Deterministic realistic view count based on string hash
  let hash = 0;
  const str = publication.id + publication.title;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  const baseViews = 1100 + (Math.abs(hash) % 1850);

  return {
    readTimeMinutes,
    viewsCount: baseViews,
  };
}
