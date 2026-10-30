import type { Metadata } from "next";

export const SITE_URL = "https://mahajouini.net";
export const SITE_NAME = "Maha Jouini";
export const SOCIAL_IMAGE_PATH = "/images/social-logo.png";
export const SOCIAL_IMAGE_URL = `${SITE_URL}${SOCIAL_IMAGE_PATH}`;

export const publicPages = {
  "/": {
    title: "Maha Jouini | AI Thought Leader & Pan-African Advocate",
    description:
      "Personal portfolio of Maha Jouini, an AI thought leader, researcher, and Pan-African advocate working at the intersection of artificial intelligence, ethics, public policy, and human development.",
  },
  "/about": {
    title: "About | Maha Jouini",
    description:
      "Meet Maha Jouini, an AI governance expert, technologist, author and founder of HIKMA AI and CHIFAA, advancing responsible technology across Africa and the Global South.",
  },
  "/ai-solutions": {
    title: "AI Solutions | Maha Jouini",
    description:
      "Explore Maha Jouini’s responsible AI initiatives, including HIKMA AI and CHIFAA, and services connecting technology, governance, health and inclusion.",
  },
  "/research": {
    title: "Research & Publications | Maha Jouini",
    description:
      "Explore Maha Jouini’s research, policy briefs, academic papers and articles on responsible AI, digital sovereignty, ethics and inclusion.",
  },
  "/speaking": {
    title: "Speaking & Media | Maha Jouini",
    description:
      "Keynote addresses, panel moderation, media features, and public voice on AI governance, digital sovereignty, and Africa’s technological future.",
  },
  "/awards": {
    title: "Awards & Fellowships | Maha Jouini",
    description:
      "Recognition and fellowships for Maha Jouini’s work advancing responsible AI, ethical technology, digital inclusion, and women’s leadership across Africa and globally.",
  },
  "/work": {
    title: "Work With Me | Maha Jouini",
    description:
      "Work with Maha Jouini on responsible AI advisory, policy and governance, workshops, speaking and mentorship, with people at the centre.",
  },
  "/books": {
    title: "Books | Maha Jouini",
    description:
      "Discover books and writing by Maha Jouini, exploring identity, culture and society across Africa and the Arab world.",
  },
  "/courses": {
    title: "Courses | Maha Jouini",
    description: "Courses by Maha Jouini. New content coming soon.",
  },
  "/podcast": {
    title: "Podcast | Maha Jouini",
    description: "The Maha Jouini podcast. New content coming soon.",
  },
  "/quotes": {
    title: "Quotes | Maha Jouini",
    description: "Quotes and reflections from Maha Jouini. New content coming soon.",
  },
} as const;

function createMetadata(path: string, title: string, description: string) {
  return {
    title,
    description,
    alternates: { canonical: new URL(path, SITE_URL).href },
    openGraph: {
      type: "website" as const,
      locale: "en_US",
      siteName: SITE_NAME,
      title,
      description,
      url: new URL(path, SITE_URL).href,
      images: [
        {
          url: SOCIAL_IMAGE_URL,
          secureUrl: SOCIAL_IMAGE_URL,
          width: 1200,
          height: 630,
          type: "image/png",
          alt: "Maha Jouini logo — Responsible AI Technologist",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      site: "@MahaJouiniAI",
      creator: "@MahaJouiniAI",
      title,
      description,
      images: [{ url: SOCIAL_IMAGE_URL, alt: "Maha Jouini logo — Responsible AI Technologist" }],
    },
  } satisfies Metadata;
}

export function getPageMetadata(path: keyof typeof publicPages): Metadata {
  const { title, description } = publicPages[path];
  return createMetadata(path, title, description);
}

type ArticleMetadata = {
  title: string;
  excerpt: string;
  slug: string | null;
  category: string;
  updated_at: string;
};

export function getArticleMetadata(article: ArticleMetadata, requestedSlug: string): Metadata {
  // Keep the working URL for older records without a stored slug, including
  // non-Latin article URLs, rather than inventing a different canonical path.
  const slug = article.slug?.trim() || requestedSlug;
  const title = `${article.title} | ${SITE_NAME}`;
  const description = article.excerpt?.replace(/\s+/g, " ").trim()
    || `Read ${article.title} by ${SITE_NAME}.`;
  const metadata = createMetadata(`/research/${encodeURIComponent(slug)}`, title, description);

  return {
    ...metadata,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    openGraph: {
      ...metadata.openGraph,
      type: "article",
      authors: [SITE_URL],
      section: article.category,
      // CMS creation time is not necessarily the original publication date.
      ...(article.updated_at && !Number.isNaN(Date.parse(article.updated_at))
        ? { modifiedTime: new Date(article.updated_at).toISOString() }
        : {}),
    },
  };
}
