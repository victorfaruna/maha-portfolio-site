"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mic,
  Users,
  MessageSquare,
  Briefcase,
  Presentation,
  Play,
  ArrowUpRight,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Radio,
  Globe,
  Sparkles,
  Quote,
  ShieldCheck,
  Heart,
  Scale,
  Building2,
  Lightbulb,
  Trophy,
} from "lucide-react";
import {
  speakingData,
  type MediaItem,
  type MediaCategory,
} from "@/data/speaking";
import { testimonials } from "@/data/testimonials";
import { VideoModal } from "@/components/ui/VideoModal";
import PressSection from "@/components/sections/PressSection";
import NewsHeroGrid from "@/components/sections/NewsHeroGrid";
import type { Publication } from "@/lib/supabase/types";

const CATEGORIES = [
  "ALL",
  "KEYNOTES & TALKS",
  "PRESS FEATURES",
  "PODCASTS & BROADCASTS",
  "ARABIC MEDIA",
] as const;

type FilterTab = (typeof CATEGORIES)[number];

const OFFERINGS = [
  {
    icon: Mic,
    title: "Keynote Speaking",
    description:
      "AI governance, digital sovereignty, and responsible innovation across Africa and the Global South.",
  },
  {
    icon: Users,
    title: "Panel Moderation",
    description:
      "Bringing multi-stakeholder perspectives together on emerging tech policy and digital rights.",
  },
  {
    icon: MessageSquare,
    title: "Media Commentary",
    description:
      "Expert analysis for press, broadcast, and podcast features on AI ethics, safety, and governance.",
  },
  {
    icon: Briefcase,
    title: "Advisory & Consulting",
    description:
      "Government and institutional advisory on responsible AI strategy and sovereign data policies.",
  },
  {
    icon: Presentation,
    title: "Workshops & Training",
    description:
      "Hands-on executive sessions on AI ethics, digital transformation, and inclusive innovation.",
  },
  {
    icon: Trophy,
    title: "Award Jury & Expert Evaluation",
    description:
      "Serving on international jury panels for AI innovation prizes, digital leadership awards, and tech policy competitions across Africa and the Arab world.",
  },
];

const TOPICS = [
  {
    icon: ShieldCheck,
    title: "AI Governance & Digital Sovereignty",
    description:
      "Building policy frameworks that let nations and regions shape their own AI futures, data infrastructure, and technological autonomy.",
  },
  {
    icon: Heart,
    title: "Responsible AI in Healthcare",
    description:
      "Culturally grounded, survivor-informed AI design, drawn from her practical work founding CHIFAA for North African healthcare access.",
  },
  {
    icon: Scale,
    title: "AI Ethics & Gender Equity",
    description:
      "Examining how AI governance intersects with gender, inclusion, algorithmic bias, and public policy in developing ecosystems.",
  },
  {
    icon: Building2,
    title: "Digital Transformation & Public Institutions",
    description:
      "Practical experience turning policy into implementation across African Union member states and international development agencies.",
  },
  {
    icon: Lightbulb,
    title: "Culturally Grounded Innovation",
    description:
      "Bridging Arab and African intellectual traditions with modern AI ethics, drawn from her work with HIKMA AI.",
  },
];

function getCategoryIcon(cat: MediaCategory) {
  switch (cat) {
    case "Keynote & Talk":
      return <Mic className="w-3.5 h-3.5" />;
    case "Press Feature":
      return <Newspaper className="w-3.5 h-3.5" />;
    case "Podcast & Broadcast":
      return <Radio className="w-3.5 h-3.5" />;
    case "Arabic Media":
      return <Globe className="w-3.5 h-3.5" />;
    default:
      return null;
  }
}

function getLinkLabel(cat: MediaCategory) {
  switch (cat) {
    case "Keynote & Talk":
      return "Watch Talk / Read";
    case "Press Feature":
      return "Read Feature";
    case "Podcast & Broadcast":
      return "Listen / Watch Broadcast";
    case "Arabic Media":
      return "Read Article / Watch";
    default:
      return "View Link";
  }
}

function CountUpNumber({ target = 50, duration = 1.8 }: { target?: number; duration?: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / (duration * 1000), 1);
      
      const easeOutCubic = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOutCubic * target));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration]);

  return <span>{count}</span>;
}

export default function SpeakingSection({
  publications = [],
  customSpeakingItems,
}: {
  publications?: Publication[];
  customSpeakingItems?: MediaItem[];
}) {
  const [selectedTab, setSelectedTab] = useState<FilterTab>("ALL");
  const [activeTestimonialIndex, setActiveTestimonialIndex] = useState(0);

  const mediaSource = customSpeakingItems && customSpeakingItems.length > 0 ? customSpeakingItems : speakingData;

  // Video Modal State
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    videoId: string | null;
    title: string;
  }>({
    isOpen: false,
    videoId: null,
    title: "",
  });

  const totalEngagements = speakingData.length;


  const handlePrevTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev === 0 ? testimonials.length - 1 : prev - 1,
    );
  };

  const handleNextTestimonial = () => {
    setActiveTestimonialIndex((prev) =>
      prev === testimonials.length - 1 ? 0 : prev + 1,
    );
  };

  return (
    <div className="w-full overflow-hidden bg-background">
      {/* ── 1. STAT-DRIVEN HERO SECTION ────────────────────────────────────────── */}
      <section className="relative w-full min-h-screen flex items-end pb-16 md:pb-24 overflow-hidden">
        {/* Background Image */}
        <img
          src="/images/pictures for research and publicaton/speaking4.jpeg"
          alt="Maha Jouini Speaking"
          className="absolute inset-0 w-full h-full object-cover object-[50%_25%]"
        />
        {/* Lighter Gradient Overlay for bright image visibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/75 via-black/20 to-black/10" />

        <div className="container mx-auto px-5 sm:px-8 md:px-12 lg:px-20 relative z-10">
          <div className="max-w-4xl">
            <motion.span
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 flex items-center gap-2"
              style={{ textShadow: "0px 2px 10px rgba(0,0,0,0.8)" }}
            >
              <Sparkles className="w-4 h-4" />
              GLOBAL KEYNOTES &amp; BROADCAST commentary
            </motion.span>

            {/* Stat-driven headline calculated dynamically */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl text-white font-serif tracking-tight leading-[1.1] mb-6"
              style={{ textShadow: "0px 4px 24px rgba(0,0,0,0.85)" }}
            >
              <CountUpNumber target={50} duration={1.8} />+ Speaking Engagements, Press Features and Broadcasts Across the Globe
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-base sm:text-lg md:text-xl text-white/95 font-sans max-w-2xl font-normal leading-relaxed mb-8"
              style={{ textShadow: "0px 2px 14px rgba(0,0,0,0.85)" }}
            >
              Keynote addresses, policy moderation, and expert commentary for
              global forums hosted by UNESCO, the African Union, GITEX Africa,
              and international news outlets.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <Link
                href="/contact"
                className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-pink text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-xl group"
              >
                Book Maha to Speak
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* TODO: Logo strip — client is sourcing real outlet logo assets (CNN, UNESCO, GITEX, etc.) separately. Build a simple responsive flex/grid row component here once assets are provided, evenly spaced, muted/grayscale with hover-to-full-color interaction. Do not populate with text wordmarks or placeholder images. */}

      {/* ── 2. "BOOK MAHA FOR" — SPLIT LAYOUT ───────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background border-b border-border/60">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl">
          <div className="text-center max-w-3xl mx-auto mb-6">
            <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
              SERVICES &amp; ENGAGEMENTS
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy leading-tight">
              Book Maha For
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-stretch">
            {/* Left Column: Clean Uncontained Portrait Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-5 flex flex-col items-center lg:items-start justify-end"
            >
              {/* 💡 PORTRAIT POSITION & SIZE CONTROL:
                  - translateY(-20px) : Moves image UP (-30px = higher, 0px = bottom, 20px = lower)
                  - scale(1.02)       : Adjusts size (1.0 = normal, 1.05 = bigger, 0.95 = smaller)
              */}
              <img
                src="/images/transparentspeaking.png"
                alt="Maha Jouini Keynote Speaker"
                className="w-full h-full object-contain object-bottom drop-shadow-lg transition-all duration-500"
                style={{ transform: "translateY(-60px) scale(0.91)" }}
              />
            </motion.div>

            {/* Right Column: Offerings List */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-7 flex flex-col justify-center space-y-3.5"
            >
              {OFFERINGS.map((offering, index) => {
                const IconComponent = offering.icon;
                return (
                  <motion.div
                    key={offering.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.08 }}
                    className="group p-4 sm:p-5 bg-card border border-border/70 hover:border-brand-pink/40 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 flex items-start gap-4"
                  >
                    <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-brand-soft-pink text-brand-pink flex items-center justify-center shrink-0 group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300 shadow-sm">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base sm:text-lg font-serif text-brand-navy mb-1 group-hover:text-brand-pink transition-colors font-medium">
                        {offering.title}
                      </h3>
                      <p className="text-foreground/70 font-sans text-xs sm:text-sm leading-relaxed">
                        {offering.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 3. "WATCH & LISTEN" — INTERACTIVE VIDEO GRID ─────────────────────── */}
      <section className="py-16 md:py-24 bg-secondary/30 border-b border-border/60">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
                MEDIA &amp; BROADCAST HIGHLIGHTS
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-brand-navy leading-tight">
                Watch &amp; Listen
              </h2>
            </motion.div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {mediaSource.filter((item) => Boolean(item.videoId)).map((item, idx) => {
              const youtubeThumbnail = `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`;
              return (
                <motion.div
                  key={item.title + idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="group bg-card border border-border/80 hover:border-brand-pink/40 rounded-3xl shadow-sm hover:shadow-xl transition-all duration-500 overflow-hidden flex flex-col cursor-pointer"
                  onClick={() =>
                    setModalState({
                      isOpen: true,
                      videoId: item.videoId || null,
                      title: item.title,
                    })
                  }
                >
                  {/* Video Thumbnail Box with Play Button Overlay */}
                  <div className="relative aspect-video w-full overflow-hidden bg-black">
                    <img
                      src={youtubeThumbnail}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                      <div className="w-14 h-14 rounded-full bg-brand-pink text-white flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-6 h-6 fill-current translate-x-0.5" />
                      </div>
                    </div>
                    <div className="absolute top-3 left-3 z-10">
                      <span className="bg-black/70 backdrop-blur-md text-white border border-white/20 px-3 py-1 rounded-full text-[10px] font-mono tracking-wider">
                        {item.outlet}
                      </span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 sm:p-8 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="text-lg sm:text-xl font-serif text-brand-navy mb-3 leading-snug group-hover:text-brand-pink transition-colors font-medium">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-foreground/70 font-sans text-xs sm:text-sm leading-relaxed line-clamp-3 mb-6">
                          {item.description}
                        </p>
                      )}
                    </div>

                    <div className="inline-flex items-center justify-between w-full text-xs font-bold uppercase tracking-wider text-brand-navy group-hover:text-brand-pink transition-colors pt-4 border-t border-border/50 mt-auto">
                      <span>Watch Broadcast</span>
                      <div className="w-7 h-7 rounded-full bg-brand-navy/5 group-hover:bg-brand-pink/15 flex items-center justify-center transition-colors">
                        <Play className="w-3.5 h-3.5 fill-current text-brand-navy group-hover:text-brand-pink" />
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 4. "TOPICS" — DARK CONTRAST SECTION ─────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-8xl relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
            <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
              KEYNOTE &amp; PANEL THEMES
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif text-white leading-tight">
              Core Keynote Topics
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-14 items-center">
            {/* Left Column: Topics List */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:col-span-7 space-y-6"
            >
              {TOPICS.map((topic, idx) => {
                const TopicIcon = topic.icon;
                return (
                  <motion.div
                    key={topic.title}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.08 }}
                    className="group pb-6 border-b border-white/15 last:border-b-0 last:pb-0 flex items-start gap-4 sm:gap-6"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-brand-pink/20 text-brand-pink flex items-center justify-center shrink-0 group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300 shadow-sm mt-0.5">
                      <TopicIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-serif text-white mb-2 font-medium group-hover:text-brand-pink transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-white/75 font-sans text-sm sm:text-base leading-relaxed font-light">
                        {topic.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>

            {/* Right Column: Portrait Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="lg:col-span-5"
            >
              <div className="relative aspect-[4/5] w-full rounded-3xl overflow-hidden border border-white/20 shadow-2xl group">
                <img
                  src="/images/hero.webp"
                  alt="Maha Jouini AI Governance"
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/90 via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="text-[10px] font-mono tracking-widest uppercase text-brand-pink bg-white/10 backdrop-blur-md px-3 py-1 rounded-full border border-white/20 inline-block mb-2">
                    Keynote Address
                  </span>
                  <h4 className="text-xl font-serif text-white font-medium">
                    Bridging Policy &amp; Ethics
                  </h4>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 4.5 NEWS HERO GRID — publications from Supabase ──────────────── */}
      <NewsHeroGrid publications={publications} />

      {/* ── 5. "IN THE PRESS" — FEATURED + HORIZONTAL SCROLL ROWS ──────────────── */}
      <PressSection
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        setModalState={setModalState}
        customItems={customSpeakingItems}
      />

      {/* ── 6. TESTIMONIALS CAROUSEL ────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-background border-b border-border/60">
        <div className="container mx-auto px-5 sm:px-8 md:px-12 max-w-4xl">
          <div className="text-center mb-10 md:mb-14">
            <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
              SOCIAL PROOF &amp; FEEDBACK
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-brand-navy leading-tight">
              Testimonials &amp; Endorsements
            </h2>
          </div>

          {/* Testimonial Carousel Card */}
          <div className="relative bg-card border border-border/80 rounded-3xl p-8 sm:p-12 shadow-sm text-center">
            <Quote className="w-12 h-12 text-brand-pink/20 mx-auto mb-6" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonialIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
              >
                <p className="text-lg sm:text-xl md:text-2xl font-serif text-brand-navy leading-relaxed italic mb-8">
                  "{testimonials[activeTestimonialIndex].quote}"
                </p>
                <div>
                  <h4 className="text-base font-bold text-brand-navy tracking-tight">
                    {testimonials[activeTestimonialIndex].name}
                  </h4>
                  <p className="text-xs text-foreground/60 font-sans mt-0.5">
                    {testimonials[activeTestimonialIndex].title}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-4 mt-8 pt-6 border-t border-border/40">
              <button
                onClick={handlePrevTestimonial}
                className="w-10 h-10 rounded-full bg-secondary/60 hover:bg-brand-pink hover:text-white text-brand-navy flex items-center justify-center transition-colors"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <span className="text-xs font-mono text-foreground/50">
                {activeTestimonialIndex + 1} / {testimonials.length}
              </span>
              <button
                onClick={handleNextTestimonial}
                className="w-10 h-10 rounded-full bg-secondary/60 hover:bg-brand-pink hover:text-white text-brand-navy flex items-center justify-center transition-colors"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── 7. CLOSING CTA BANNER ────────────────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-brand-navy text-white text-center relative overflow-hidden">
        <div className="container mx-auto px-5 sm:px-8 max-w-3xl relative z-10">
          <span className="text-xs uppercase tracking-widest text-brand-pink font-extrabold mb-3 block">
            SPEAKING &amp; EVENT INQUIRIES
          </span>
          <h3 className="text-2xl sm:text-3xl md:text-5xl font-serif text-white mb-5 leading-tight">
            Ready to bring Maha to your next event, panel, or feature?
          </h3>
          <p className="text-white/80 text-sm sm:text-base md:text-lg mb-8 font-light max-w-xl mx-auto leading-relaxed">
            Maha Jouini delivers compelling keynotes, policy moderation, and
            expert commentary for international summits, tech conferences, and
            global broadcasts.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 bg-brand-pink text-white text-xs sm:text-sm font-extrabold uppercase tracking-wider rounded-full hover:bg-white hover:text-brand-navy transition-all duration-300 shadow-xl"
          >
            Book Maha to Speak
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* Video Modal Instance */}
      <VideoModal
        isOpen={modalState.isOpen}
        onClose={() =>
          setModalState({ isOpen: false, videoId: null, title: "" })
        }
        videoId={modalState.videoId}
        title={modalState.title}
      />
    </div>
  );
}
