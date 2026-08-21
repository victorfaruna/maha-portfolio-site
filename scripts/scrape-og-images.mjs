/**
 * OG Image Scraper for speaking.ts entries
 * Run: node scripts/scrape-og-images.mjs
 * Fetches og:image meta tags from each article/press URL.
 */

const items = [
  // KEYNOTES & TALKS
  { title: "AfCFTA and Digital Sovereignty in Africa", url: "https://edition.cnn.com/videos/tv/2023/07/11/ca-july-technology-and-trade-spc.cnn" },
  { title: "Building an AI-Powered Africa", url: "https://www.itweb.co.za/article/itweb-tv-building-an-ai-powered-africa-by-africans-for-africans/PmxVEMKEm16vQY85" },
  { title: "AI and Digital Transformation in Business (ICCD)", url: "https://iccdglobal.com/first-session-5/" },
  { title: "Challenges of Cryptocurrency (GITEX Africa)", url: "https://www.instagram.com/p/Cs6Tn8qqu8q/" },
  { title: "Pioneering Africa's Digital Transformation (Sentech)", url: "https://capetimes.co.za/news/2025-05-23-sentech-africa-tech-week-2025-pioneering-africas-digital-transformation/" },
  // PRESS FEATURES
  { title: "#IAmTheFutureOfAI – Women in AI Ethics", url: "https://medium.com/women-in-ai-ethics/iamthefutureofai-maha-jouini-4d28a5519560" },
  { title: "Top 5 Leaders – Global Business Times", url: "https://theglobalbusinesstimes.com/top-5-leaders-shaping-ethical-ai-digital-inclusion-in-africa/" },
  { title: "She Shapes AI Global Award – L'Economiste", url: "https://www.leconomistemaghrebin.com/2026/04/21/she-shapes-ai-global-award-maha-jouini-algorithmes/" },
  { title: "AI Ethics, Digital Sovereignty – Glamour SA", url: "https://www.glamour.co.za/lifestyle/afria-president-maha-jouini-on-ai-ethics-digital-sovereignty-and-africas-technological-future-58caab23-12f5-47d3-84af-3cc21fb6faa8" },
  { title: "Pioneering AI for Underprivileged Women – CIO Views", url: "https://cioviews.com/maha-jouini-pioneering-ai-and-digital-tech-for-unprivileged-african-and-arab-women/" },
  { title: "I Am the Future of AI – WAIE", url: "https://womeninaiethics.org/iamthefutureofai-maha-jouini/" },
  { title: "Pathways to AI for African Women – RegTech Africa", url: "https://regtechafrica.com/regetechafrica-magazine-spring-edition-vol-3/" },
  { title: "AI in Senegal – Expertise France", url: "https://rapport-annuel.expertisefrance.fr/en/projects/ai-senegal/" },
  { title: "Responsible AI – Conglomerate Magazine", url: "https://conglomeratemagazine.com/responsible-ai-is-essential-for-africas-sustainable-future/" },
  { title: "AI and Data Policy – Soweto Sunrise", url: "https://sowetosunrise.co.za/ai-and-data-policy-in-africa-a-call-for-sovereign-innovation/" },
  // PODCASTS (non-YouTube)
  { title: "How to Use AI in a Responsible Way – South Africa FM", url: "https://omny.fm/shows/the-national-pulse/how-to-use-ai-in-a-responsible-way" },
  // ARABIC MEDIA
  { title: "ArabicPost – Writing about AI", url: "https://arabicpost.live/opinions/2021/01/12/%D8%A8%D8%B9%D8%AF-%D8%A7%D8%AE%D8%AA%D8%B1%D8%A7%D8%B9-%D8%B1%D9%88%D8%A8%D9%88%D8%AA-%D9%82%D8%A7%D8%AF%D8%B1-%D8%B9%D9%84%D9%89-%D9%83%D8%AA%D8%A7%D8%A8%D8%A9-4000-%D9%82%D8%B5%D8%A9-%D8%AE%D8%A8/" },
  { title: "ThisIsLebanon – AI ethics", url: "https://www.thisislebanon.com/tech/297050/" },
  { title: "Egypt National TV (COP27)", url: "https://www.youtube.com/watch?v=4qpWdHoL_6Q" },
];

async function fetchOgImage(url) {
  try {
    const res = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; OG-Scraper/1.0)",
        "Accept": "text/html,application/xhtml+xml",
      },
      signal: AbortSignal.timeout(10000),
    });
    if (!res.ok) return { url, ogImage: null, error: `HTTP ${res.status}` };
    const html = await res.text();
    // Extract og:image
    const match =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<meta[^>]+content=["']([^"']+)["'][^>]+property=["']og:image["']/i);
    const ogImage = match ? match[1] : null;
    return { url, ogImage, error: null };
  } catch (err) {
    return { url, ogImage: null, error: err.message };
  }
}

console.log("Scraping OG images...\n");
const results = await Promise.allSettled(items.map(async (item) => {
  const result = await fetchOgImage(item.url);
  return { title: item.title, ...result };
}));

const output = results.map((r) => r.value || r.reason);

console.log("=== RESULTS ===\n");
for (const r of output) {
  const status = r.ogImage ? "✅" : "❌";
  console.log(`${status} ${r.title}`);
  if (r.ogImage) console.log(`   → ${r.ogImage}`);
  if (r.error) console.log(`   ERROR: ${r.error}`);
  console.log();
}

console.log("\n=== JSON OUTPUT (paste into speaking.ts) ===\n");
console.log(JSON.stringify(output.map(r => ({ title: r.title, ogImage: r.ogImage })), null, 2));
