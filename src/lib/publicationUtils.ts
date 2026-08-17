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
