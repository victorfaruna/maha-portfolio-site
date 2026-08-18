export type Publication = {
  id: string;
  title: string;
  category: string;
  excerpt: string;
  year: string;
  link: string;
  image?: string;
  publisher?: string;
};

export const publications: Publication[] = [
  {
    id: "pub-1",
    title: "Pan-African AI Governance: Building Ethical Frameworks for Digital Sovereignty",
    category: "Policy Brief",
    year: "2024",
    publisher: "HIKMA AI Policy Group",
    excerpt: "An investigation into how African nations can define sovereign AI policy frameworks that prioritize local data ownership, cultural preservation, and equitable economic growth.",
    link: "#",
    image: "/images/research.jpg",
  },
  {
    id: "pub-2",
    title: "AI & Gender Equity in Healthcare: Community-Led Innovation in North Africa",
    category: "Academic Paper",
    year: "2023",
    publisher: "CHIFAA Research Initiative",
    excerpt: "Analyzing the role of survivor-led technology solutions in improving healthcare accessibility and ethical medical AI for women affected by breast and cervical cancer.",
    link: "#",
    image: "/images/chifaa.jpeg",
  },
  {
    id: "pub-3",
    title: "Decolonizing Algorithmic Infrastructure: Lived Experience as Policy",
    category: "Opinion",
    year: "2023",
    publisher: "Global AI Ethics Review",
    excerpt: "Exploring how lived experience in African communities should directly inform algorithmic auditing, international AI standards, and multilateral tech policy.",
    link: "#",
    image: "/images/hikmaa.png",
  },
  {
    id: "pub-4",
    title: "Ethical AI Architecture: Safeguarding Digital Dignity in the Global South",
    category: "Policy Brief",
    year: "2022",
    publisher: "African Technology Policy Network",
    excerpt: "Formulating actionable guidelines for multilateral tech governance that respect human dignity, language rights, and economic inclusion in developing AI ecosystems.",
    link: "#",
    image: "/images/advice.jpeg",
  },
  {
    id: "pub-5",
    title: "Cultural Heritage and Machine Learning: Preserving Indigenous Knowledges",
    category: "Academic Paper",
    year: "2022",
    publisher: "Digital Humanities & Ethics Journal",
    excerpt: "Examining natural language processing datasets and advocating for inclusive AI representations of North African and Pan-African linguistic heritage.",
    link: "#",
    image: "/images/hero.webp",
  },
  {
    id: "pub-6",
    title: "Multilateral Governance & Sovereign Dataspaces across the African Continent",
    category: "Opinion",
    year: "2021",
    publisher: "Pan-African Digital Futures",
    excerpt: "Strategic recommendations for regional data sovereignty, cross-border privacy safeguards, and collaborative tech innovation.",
    link: "#",
    image: "/images/ai.jpg",
  },
];
