const VIDEO_ID = /^[a-zA-Z0-9_-]{11}$/;
const YOUTUBE_HOSTS = new Set([
  'youtube.com', 'www.youtube.com', 'm.youtube.com', 'music.youtube.com',
  'youtube-nocookie.com', 'www.youtube-nocookie.com',
]);

/** Accept video IDs and YouTube watch, share, Shorts, live and embed URLs. */
export function extractYouTubeId(value?: string | null): string | null {
  const input = value?.trim();
  if (!input) return null;
  if (VIDEO_ID.test(input)) return input;

  try {
    const url = new URL(/^[a-z][a-z\d+.-]*:/i.test(input) ? input : `https://${input}`);
    if (!['http:', 'https:'].includes(url.protocol)) return null;
    const host = url.hostname.toLowerCase();
    const segments = url.pathname.split('/').filter(Boolean);
    let id: string | null = null;

    if (host === 'youtu.be' || host === 'www.youtu.be') {
      id = segments[0] ?? null;
    } else if (YOUTUBE_HOSTS.has(host)) {
      if (segments[0] === 'watch') id = url.searchParams.get('v');
      else if (['embed', 'shorts', 'live', 'v'].includes(segments[0])) id = segments[1] ?? null;
      else if (segments[0] === 'u' && segments.length === 3) id = segments[2];
    }

    return id && VIDEO_ID.test(id) ? id : null;
  } catch {
    return null;
  }
}

export function getYouTubeThumbnail(value?: string | null): string | null {
  const id = extractYouTubeId(value);
  return id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : null;
}

type MediaSource = { link?: string | null; videoId?: string | null; ogImage?: string | null };

export function getSpeakingVideoId({ link, videoId }: MediaSource): string | null {
  // The linked video wins over an older stored ID or manually supplied image.
  return extractYouTubeId(link) || extractYouTubeId(videoId);
}

export function getSpeakingThumbnail(source: MediaSource): string | null {
  return getYouTubeThumbnail(getSpeakingVideoId(source)) || source.ogImage?.trim() || null;
}
