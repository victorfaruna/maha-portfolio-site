/** Encode the full message once so WhatsApp receives a clickable, readable URL. */
export function createArticleShareLinks(url: string, title: string) {
  const encodedUrl = encodeURIComponent(url);
  const message = `Read "${title}" by Maha Jouini`;

  return {
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
    x: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodeURIComponent(message)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${message}: ${url}`)}`,
  };
}
