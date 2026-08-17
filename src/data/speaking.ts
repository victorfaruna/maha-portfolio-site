export type MediaCategory =
  | "Keynote & Talk"
  | "Press Feature"
  | "Podcast & Broadcast"
  | "Arabic Media";

export type MediaItem = {
  id?: string;
  title: string;
  category: MediaCategory;
  outlet: string;
  description?: string;
  link: string;
  isRTL?: boolean;
  year?: string;
};

export const speakingData: MediaItem[] = [
  // ── KEYNOTES & TALKS ──────────────────────────────────────────────
  {
    title: "AfCFTA and Digital Sovereignty in Africa",
    category: "Keynote & Talk",
    outlet: "CNN Africa",
    description: "Discussion on technology, trade, and digital sovereignty under the African Continental Free Trade Area.",
    link: "https://edition.cnn.com/videos/tv/2023/07/11/ca-july-technology-and-trade-spc.cnn",
    year: "2023",
  },
  {
    title: "Building an AI-Powered Africa, by Africans for Africans",
    category: "Keynote & Talk",
    outlet: "ITWeb TV",
    description: "In-depth interview on shaping sovereign AI infrastructure, local talent development, and responsible digital governance across the African continent.",
    link: "https://www.itweb.co.za/article/itweb-tv-building-an-ai-powered-africa-by-africans-for-africans/PmxVEMKEm16vQY85",
    year: "2023",
  },
  {
    title: "AI and Digital Transformation in Business",
    category: "Keynote & Talk",
    outlet: "Islamic Chamber of Commerce and Development (ICCD)",
    description: "First Session keynote on driving responsible AI adoption and digital transformation in business across member states.",
    link: "https://iccdglobal.com/first-session-5/",
    year: "2023",
  },
  {
    title: "Challenges of Cryptocurrency and Blockchain",
    category: "Keynote & Talk",
    outlet: "GITEX Africa Morocco 2023",
    description: "Jury Member & Speaker session examining financial tech governance, cryptocurrency policy, and blockchain inclusion.",
    link: "https://www.instagram.com/p/Cs6Tn8qqu8q/",
    year: "2023",
  },
  {
    title: "Pioneering Africa's Digital Transformation",
    category: "Keynote & Talk",
    outlet: "Sentech Africa Tech Week",
    description: "Keynote on leading digital transformation strategies, cross-border digital integration, and inclusive tech policy.",
    link: "https://capetimes.co.za/news/2025-05-23-sentech-africa-tech-week-2025-pioneering-africas-digital-transformation/",
    year: "2025",
  },

  // ── PRESS FEATURES & IN-DEPTH PROFILES ─────────────────────────────
  {
    title: "#IAmTheFutureOfAI: Spotlight on Maha Jouini",
    category: "Press Feature",
    outlet: "Women in AI Ethics",
    description: "Global spotlight profile highlighting Maha Jouini's work at the intersection of AI governance, ethics, and gender equality in Africa.",
    link: "https://medium.com/women-in-ai-ethics/iamthefutureofai-maha-jouini-4d28a5519560",
    year: "2023",
  },
  {
    title: "Top 5 Leaders Shaping Ethical AI & Digital Inclusion in Africa",
    category: "Press Feature",
    outlet: "The Global Business Times",
    description: "Feature article highlighting 5 prominent global leaders advancing human-centered AI policy and digital access.",
    link: "https://theglobalbusinesstimes.com/top-5-leaders-shaping-ethical-ai-digital-inclusion-in-africa/",
    year: "2024",
  },
  {
    title: "She Shapes AI Global Award – Maha Jouini and Algorithmic Governance",
    category: "Press Feature",
    outlet: "L'Économiste Maghrébin",
    description: "Feature on Maha Jouini receiving the She Shapes AI Global Award for AI Thought Leadership and algorithmic governance.",
    link: "https://www.leconomistemaghrebin.com/2026/04/21/she-shapes-ai-global-award-maha-jouini-algorithmes/",
    year: "2026",
  },
  {
    title: "AI Ethics, Digital Sovereignty, and Africa's Technological Future",
    category: "Press Feature",
    outlet: "Glamour South Africa",
    description: "In-depth press feature on AFRIA leadership, AI safety, digital sovereignty, and the role of women in shaping future tech policy.",
    link: "https://www.glamour.co.za/lifestyle/afria-president-maha-jouini-on-ai-ethics-digital-sovereignty-and-africas-technological-future-58caab23-12f5-47d3-84af-3cc21fb6faa8",
    year: "2025",
  },
  {
    title: "Maha Jouini: Pioneering AI and Digital Tech for Underprivileged African and Arab Women",
    category: "Press Feature",
    outlet: "CIO Views Magazine",
    description: "Cover story and profile on empowering women through human-centered tech initiatives and culturally grounded AI governance.",
    link: "https://cioviews.com/maha-jouini-pioneering-ai-and-digital-tech-for-unprivileged-african-and-arab-women/",
    year: "2024",
  },
  {
    title: "'I Am the Future of AI' Spotlight Series",
    category: "Press Feature",
    outlet: "Women in AI Ethics (WAIE)",
    description: "Official WAIE feature showcasing thought leaders promoting ethical AI frameworks from the Global South.",
    link: "https://womeninaiethics.org/iamthefutureofai-maha-jouini/",
    year: "2023",
  },
  {
    title: "Pathways to AI and Digital Tech for African Women",
    category: "Press Feature",
    outlet: "RegTech Africa Magazine",
    description: "Spring Edition Vol. 3 feature examining regulatory technology, gender parity in tech, and African AI leadership.",
    link: "https://regtechafrica.com/regetechafrica-magazine-spring-edition-vol-3/",
    year: "2024",
  },
  {
    title: "AI in Senegal: 'Digital Sovereignty Will Allow Countries to Come Out of Poverty'",
    category: "Press Feature",
    outlet: "Expertise France (Annual Report)",
    description: "Annual Report project feature on national digital capacity, AI governance in Senegal, and economic sovereignty.",
    link: "https://rapport-annuel.expertisefrance.fr/en/projects/ai-senegal/",
    year: "2023",
  },
  {
    title: "Responsible AI is Essential for Africa's Sustainable Future",
    category: "Press Feature",
    outlet: "Conglomerate Magazine",
    description: "Policy analysis on aligning emerging AI deployment with the UN Sustainable Development Goals across African nations.",
    link: "https://conglomeratemagazine.com/responsible-ai-is-essential-for-africas-sustainable-future/",
    year: "2024",
  },
  {
    title: "AI and Data Policy in Africa: A Call for Sovereign Innovation",
    category: "Press Feature",
    outlet: "Soweto Sunrise",
    description: "Op-ed and commentary advocating for data sovereignty, continental governance frameworks, and localized AI innovation.",
    link: "https://sowetosunrise.co.za/ai-and-data-policy-in-africa-a-call-for-sovereign-innovation/",
    year: "2024",
  },

  // ── PODCASTS & BROADCASTS ──────────────────────────────────────────
  {
    title: "How to Use AI in a Responsible Way",
    category: "Podcast & Broadcast",
    outlet: "The National Pulse | South Africa FM",
    description: "Radio & podcast interview on practical frameworks for responsible AI usage, ethics, and safeguarding public trust.",
    link: "https://omny.fm/shows/the-national-pulse/how-to-use-ai-in-a-responsible-way",
    year: "2024",
  },
  {
    title: "Technology and AI Advocacy in Tunisia – Maha Jouini & Chido Dzinotyiwei",
    category: "Podcast & Broadcast",
    outlet: "Vambo AI in Africa Series (Ep. 9)",
    description: "Video podcast conversation on multilingual AI, language preservation, and digital advocacy in North Africa.",
    link: "https://www.youtube.com/watch?v=c7lJ-CJEbGo",
    year: "2024",
  },
  {
    title: "Maha Jouini Opens Pathways to AI and Digital Tech for African Women",
    category: "Podcast & Broadcast",
    outlet: "Frontrunners Development",
    description: "Broadcast interview on social impact entrepreneurship, health tech (CHIFAA), and digital inclusion.",
    link: "https://www.youtube.com/watch?v=LxkZd6NEKoQ",
    year: "2024",
  },
  {
    title: "Tech Revolution: Integrating And Empowering African Women",
    category: "Podcast & Broadcast",
    outlet: "News Central Agency | Nigeria",
    description: "Television broadcast segment on gender inclusion in tech policy, AI education, and digital economic empowerment.",
    link: "https://www.youtube.com/watch?v=wYy9CqunS8g&t=351s",
    year: "2023",
  },

  // ── ARABIC MEDIA ───────────────────────────────────────────────────
  {
    title: "Writing about the social impact of AI",
    category: "Arabic Media",
    outlet: "ArabicPost",
    description: "In my Arabic-language article «بعد اختراع روبوت قادر على كتابة 4000 قصة... هل انتهى عصر الصحافة البشرية؟» published by ArabicPost, I analyzed how automated journalism and AI-generated news could transform media ecosystems in the Arab region—raising early awareness about algorithmic bias, job displacement, and the ethical use of AI in newsrooms. This article reflects my early commitment to communicating AI issues in Arabic so that public debate is not limited to English-language sources.",
    link: "https://arabicpost.live/opinions/2021/01/12/بعد-اختراع-روبوت-قادر-على-كتابة-4000-قصة-خب/",
    isRTL: true,
    year: "2021",
  },
  {
    title: "Contributing to AI ethics awareness in the Arab region",
    category: "Arabic Media",
    outlet: "Here Lebanon (ThisIsLebanon)",
    description: "I was cited in the article \"هل يكون الذكاء الاصطناعي بديلاً عاطفياً عن الشريك البشري؟\" published on Here Lebanon (ThisIsLebanon). The article discussed emotional AI, ethical risks, and the psychological impacts of AI companionship apps such as Paradot. My contribution emphasized the need for ethical frameworks, social acceptance research, and human-centric design in emerging AI technologies. This demonstrates my active role in shaping Arabic-language conversations around AI governance and ethics.",
    link: "https://www.thisislebanon.com/tech/297050/",
    isRTL: true,
    year: "2024",
  },
  {
    title: "Engaging with climate governance and AI for environmental resilience",
    category: "Arabic Media",
    outlet: "Egypt National TV (COP27)",
    description: "I also followed the national Egyptian TV coverage of the Climate Change Summit (COP27), held in Egypt, through the official broadcast available on YouTube. This engagement reflects my commitment to understanding how climate governance debates intersect with digital transformation and the potential of ethical AI to support climate adaptation—in Africa, and North Africa specifically, where environmental vulnerabilities, water scarcity, and socio-economic inequalities require context-aware technological solutions. This reference demonstrates my broader awareness of how AI policy, climate resilience, and sustainable development are connected across the region.",
    link: "https://www.youtube.com/watch?v=4qpWdHoL_6Q",
    isRTL: true,
    year: "2022",
  },
];
