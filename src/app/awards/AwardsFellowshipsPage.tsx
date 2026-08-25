"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Sparkles, ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// ─── Color tokens ─────────────────────────────────────────────────────────────
const IVORY_BG = "#FAF7F2";
const CHARCOAL_TEXT = "#12151C";
const NAVY = "#0B1F4D";
const PINK_ACCENT = "#EC4899";
const SOFT_PINK = "#FCE7F3";

// ─── Data ─────────────────────────────────────────────────────────────────────
interface AwardItem {
  title: string;
  meta: string;
  year: string;
  description: string;
  flagship?: boolean;
}

const flagshipAward: AwardItem = {
  title: "She Shapes AI Global Awards — Winner",
  meta: "AI Thought Leadership · London School of Economics",
  year: "2026",
  description:
    "Recognized for leadership and impact in responsible and ethical AI on a global stage.",
  flagship: true,
};

const otherAwards: AwardItem[] = [
  {
    title: "UNESCO MENA Top 20 Women Change Makers",
    meta: "MENA Region Impact",
    year: "2022",
    description:
      "Recognized among women driving change and impact across the MENA region.",
  },
  {
    title: "Google Women Techmakers Ambassador",
    meta: "Global Community",
    year: "Since 2022",
    description:
      "Part of Google's global Women Techmakers community, supporting the visibility and advancement of women in technology.",
  },
];

const fellowships: AwardItem[] = [
  {
    title: "Microsoft Elevate Changemaker Fellowship",
    meta: "Global Impact & Leadership",
    year: "Fellow · 2026",
    description:
      "Selected for a global changemaker programme supporting leaders using technology to drive meaningful social impact.",
  },
  {
    title: "Stanford Ethics, Technology & Public Policy Practitioner Program",
    meta: "Stanford University",
    year: "Cohort Leader · 2026",
    description:
      "Selected for a practitioner programme exploring the intersection of emerging technologies, ethics and public policy.",
  },
  {
    title: "Global Center on AI Governance",
    meta: "Women in Focus Initiative",
    year: "Research Fellow",
    description:
      "Contributing research and perspectives on responsible AI and AI governance through the Women in Focus initiative, with particular attention to women's leadership, inclusion, and AI governance in Africa.",
  },
  {
    title: "TechForward Policy Fellowship",
    meta: "AI & Public Policy",
    year: "Mentor · 2026",
    description:
      "Supporting emerging professionals working at the intersection of AI and public policy.",
  },
  {
    title: "UNDP Arab States",
    meta: "Innovation & Entrepreneurship",
    year: "Mentor · 2023",
    description:
      "Mentored women entrepreneurs and emerging innovators across the Arab States, providing guidance on business development, innovation, and entrepreneurship.",
  },
  {
    title: "ARIN Publishing Academy — First Cohort",
    meta: "Academic Publishing & Research",
    year: "Fellow · 2026",
    description:
      "Selected for the inaugural cohort of the ARIN Publishing Academy, strengthening research, academic writing, and publishing capacity for African scholars and practitioners.",
  },
  {
    title:
      "UNFPA Tunisia — Pool of Experts in AI & TFGBV",
    meta: "Digital Safety & Gender Ethics",
    year: "Expert · 2026",
    description:
      "Selected to contribute expertise on AI, digital safety, and technology-facilitated gender-based violence, supporting gender-responsive and responsible approaches to emerging technologies in Tunisia.",
  },
];

// ─── Section Heading Component ────────────────────────────────────────────────
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6 }}
      className="mb-8"
    >
      <h2
        className="font-serif text-[26px] sm:text-[30px] font-semibold mb-3 tracking-tight"
        style={{ color: CHARCOAL_TEXT }}
      >
        {children}
      </h2>
      <div
        className="h-[3px] w-[50px] rounded-full"
        style={{ backgroundColor: PINK_ACCENT }}
      />
    </motion.div>
  );
}

// ─── Flagship Card Component ──────────────────────────────────────────────────
function FlagshipCard({ item }: { item: AwardItem }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.01 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="col-span-1 md:col-span-2 group relative rounded-2xl p-7 sm:p-8 bg-white transition-all duration-300 cursor-pointer overflow-hidden border border-border shadow-sm hover:shadow-xl hover:border-brand-pink/40 hover:bg-gradient-to-br hover:from-white hover:to-brand-soft-pink/30"
    >
      <div className="relative z-10 flex flex-col sm:flex-row items-start justify-between gap-5 mb-5">
        {/* Flagship Icon Badge */}
        <div
          className="w-14 h-14 rounded-full flex items-center justify-center shrink-0 text-white shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg"
          style={{ backgroundColor: PINK_ACCENT }}
        >
          <Award size={26} strokeWidth={2} />
        </div>

        {/* Top-Right Status Pills & Interactive Arrow */}
        <div className="flex flex-wrap items-center gap-2">
          <span
            className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase text-white shadow-xs"
            style={{ backgroundColor: PINK_ACCENT }}
          >
            <Sparkles size={12} />
            Flagship Recognition
          </span>
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase border border-brand-pink/20"
            style={{ backgroundColor: SOFT_PINK, color: PINK_ACCENT }}
          >
            {item.year}
          </span>
          <div className="w-8 h-8 rounded-full bg-brand-soft-pink/60 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300 ml-1">
            <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <h3
          className="font-serif font-bold text-[20px] sm:text-[23px] leading-snug mb-2 transition-colors duration-300 text-brand-pink group-hover:text-brand-navy"
        >
          {item.title}
        </h3>

        <p
          className="text-[12px] font-sans font-bold uppercase tracking-[0.18em] mb-3 text-brand-navy/70"
        >
          {item.meta}
        </p>

        <p
          className="font-sans text-[14px] sm:text-[15px] leading-relaxed max-w-3xl text-foreground/80"
        >
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Standard Card Component ──────────────────────────────────────────────────
function StandardCard({
  item,
  Icon,
  index,
}: {
  item: AwardItem;
  Icon: React.ElementType;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
      className="group relative rounded-2xl p-7 bg-white transition-all duration-300 cursor-pointer flex flex-col justify-between border border-border shadow-xs hover:shadow-xl hover:border-brand-pink/40 hover:bg-gradient-to-br hover:from-white hover:to-brand-soft-pink/25"
    >
      <div>
        {/* Card Header: Icon Badge + Year Pill + Interactive Arrow */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:bg-brand-pink group-hover:text-white bg-brand-soft-pink text-brand-pink border border-brand-pink/20 shadow-xs"
          >
            <Icon size={20} strokeWidth={1.9} />
          </div>

          <div className="flex items-center gap-2">
            <span
              className="inline-flex items-center px-3 py-1 rounded-full text-[11px] font-bold tracking-wider uppercase shrink-0 bg-brand-soft-pink text-brand-pink border border-brand-pink/20"
            >
              {item.year}
            </span>
            <div className="w-7 h-7 rounded-full bg-brand-soft-pink/60 flex items-center justify-center text-brand-pink group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300">
              <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </div>
        </div>

        {/* Title — Vibrant Pink */}
        <h3
          className="font-serif font-bold text-[18px] leading-snug mb-1.5 transition-colors duration-300 text-brand-pink group-hover:text-brand-navy"
        >
          {item.title}
        </h3>

        {/* Meta */}
        <p
          className="text-[12px] font-sans font-bold uppercase tracking-[0.16em] mb-3 text-brand-navy/70"
        >
          {item.meta}
        </p>

        {/* Description */}
        <p className="font-sans text-[14px] text-foreground/80 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page Component ──────────────────────────────────────────────────────
export default function AwardsFellowshipsPage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: IVORY_BG, color: CHARCOAL_TEXT }}
    >
      <Navbar solid />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-36 sm:pt-64 md:pt-72 pb-14 px-6 sm:px-10">
        <div className="max-w-[760px] mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-bold font-sans uppercase tracking-[0.22em] mb-4 text-brand-pink"
          >
            Awards &amp; Fellowships
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-serif text-[30px] sm:text-[38px] md:text-[44px] leading-[1.18] font-semibold mb-7"
            style={{ color: CHARCOAL_TEXT }}
          >
            Recognized for advancing responsible AI, ethical technology, digital
            inclusion and women&apos;s leadership across Africa and globally.
          </motion.h1>

          {/* Pink Accent Rule */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-[3px] rounded-full bg-brand-pink"
          />
        </div>
      </section>

      {/* ── AWARDS & RECOGNITION ─────────────────────────────────────────── */}
      <section className="pb-16 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Awards &amp; Recognition</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Flagship Recognition Card */}
            <FlagshipCard item={flagshipAward} />

            {/* Other Award Cards */}
            {otherAwards.map((item, idx) => (
              <StandardCard
                key={idx}
                item={item}
                Icon={Award}
                index={idx + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── FELLOWSHIPS & LEADERSHIP PROGRAMMES ──────────────────────────── */}
      <section className="pb-28 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <SectionHeading>Fellowships &amp; Leadership Programmes</SectionHeading>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {fellowships.map((item, idx) => (
              <StandardCard
                key={idx}
                item={item}
                Icon={GraduationCap}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      <Footer showGradient />
    </main>
  );
}
