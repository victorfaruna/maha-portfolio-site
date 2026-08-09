export type MediaItem = {
  id: string;
  title: string;
  caption: string;
  image: string;
  category?: string;
  date?: string;
};

export const mediaItems: MediaItem[] = [
  {
    id: "media-1",
    title: "Keynote at African Union AI Governance Summit",
    caption: "Maha Jouini delivering the opening address on Pan-African digital sovereignty and ethical AI frameworks for regional governance.",
    image: "/images/event.webp",
    category: "Keynote Address",
    date: "2024",
  },
  {
    id: "media-2",
    title: "CHIFAA Women's Healthcare AI Workshop",
    caption: "Collaborating with local medical practitioners, survivors, and data scientists in North Africa to develop survivor-led healthcare technology.",
    image: "/images/chifaa.jpeg",
    category: "Community Workshop",
    date: "2023",
  },
  {
    id: "media-3",
    title: "UNESCO High-Level Panel on Algorithmic Ethics",
    caption: "Discussing multilateral tech regulation, indigenous language preservation in AI models, and human rights safeguards in the Global South.",
    image: "/images/advice.jpeg",
    category: "Policy Panel",
    date: "2023",
  },
  {
    id: "media-4",
    title: "Book Launch & Literary Cultural Exchange",
    caption: "Presenting published works exploring North African identity, cultural heritage, and cross-continental storytelling from Carthage to East Asia.",
    image: "/images/mahaholdingbook.jpeg",
    category: "Literary Presentation",
    date: "2022",
  },
  {
    id: "media-5",
    title: "Research Convening on Ethical AI Architecture",
    caption: "Engaging global AI ethics scholars on integrating lived experiences and civilizational wisdom into international technology policy.",
    image: "/images/research.jpg",
    category: "Research Colloquium",
    date: "2023",
  },
  {
    id: "media-6",
    title: "International Digital Policy Dialogue",
    caption: "Advocating for equitable technology access and Pan-African data ecosystems at international multilateral forums.",
    image: "/images/myjourneyimage.jpeg",
    category: "International Forum",
    date: "2022",
  },
];
