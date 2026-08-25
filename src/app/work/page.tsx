"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  Lightbulb,
  FileText,
  GraduationCap,
  Mic2,
  Users,
  Briefcase,
  BookOpen,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// ─── Page-scoped accent tokens ─────────────────────────────────────────────────
const PURPLE_MEDIUM = "#9333EA";
const PURPLE_DARK = "#7E22CE";
const PINK_ACCENT = "#EC4899";
const SOFT_PINK = "#FCE7F3";
const CHARCOAL = "#12151C";
const NAVY = "#0B1F4D";
const GRADIENT = "linear-gradient(90deg, #A855F7, #EC4899)";

// ─── Animation helpers ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
});

// ─── Service card data ─────────────────────────────────────────────────────────
const topCards = [
  {
    Icon: Lightbulb,
    title: "Responsible AI Advisory",
    body: "Strategic guidance for organizations seeking to adopt AI in a way that is ethical, inclusive, and aligned with their mission.",
    items: [
      "AI strategy and adoption",
      "Responsible AI frameworks",
      "AI governance and ethics",
      "Risk and impact assessment",
      "Organizational AI readiness",
    ],
  },
  {
    Icon: FileText,
    title: "AI Policy & Governance",
    body: "Supporting institutions in translating AI ethics into practical policies, governance models, and accountability mechanisms.",
    items: [
      "AI policy development",
      "Governance frameworks",
      "Ethical AI guidelines",
      "Digital rights and inclusion",
      "Public sector AI governance",
    ],
  },
  {
    Icon: GraduationCap,
    title: "Training & Capacity Building",
    body: "Interactive workshops and executive training designed to build AI literacy and responsible AI capabilities across organizations.",
    items: [
      "AI literacy for leaders",
      "Responsible AI and ethics",
      "Generative AI in practice",
      "AI for social impact",
      "AI and vulnerable communities",
    ],
    listLabel: "Topics include:",
  },
];

const bottomCards = [
  {
    Icon: Mic2,
    title: "Speaking & Thought Leadership",
    body: "Available for international conferences, high-level forums, panels, podcasts, and institutional events on AI, ethics, and digital transformation.",
    items: [
      "Responsible AI",
      "AI governance and public policy",
      "AI in Africa and the Global South",
      "Women in technology",
      "Digital inclusion and innovation",
    ],
    listLabel: "Speaking areas:",
  },
  {
    Icon: Users,
    title: "Mentorship",
    body: "Mentoring women entrepreneurs, researchers, policymakers, and emerging technology leaders building impactful AI and innovation initiatives.",
    items: [
      "Leadership and career development",
      "AI entrepreneurship",
      "Responsible innovation",
      "Research and public policy",
      "Social-impact technology",
    ],
    listLabel: "Focus areas:",
  },
];

const serviceChips = [
  { label: "Advisory",   Icon: Lightbulb },
  { label: "Consulting", Icon: Briefcase },
  { label: "Training",   Icon: GraduationCap },
  { label: "Speaking",   Icon: Mic2 },
  { label: "Research",   Icon: BookOpen },
  { label: "Mentorship", Icon: Users },
];

// ─── Service Card Component ────────────────────────────────────────────────────
function ServiceCard({
  Icon,
  title,
  body,
  items,
  listLabel,
  index,
}: {
  Icon: React.ElementType;
  title: string;
  body: string;
  items: string[];
  listLabel?: string;
  index: number;
}) {
  return (
    <motion.div
      {...fadeUp(index * 0.08)}
      whileHover={{ y: -6, scale: 1.015 }}
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="group relative rounded-2xl p-7 bg-white border border-[rgba(168,85,247,0.15)] shadow-xs hover:shadow-xl hover:border-[rgba(236,72,153,0.35)] transition-all duration-300 flex flex-col cursor-pointer"
    >
      {/* Hover overlay ring */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300 shadow-[0_12px_30px_rgba(0,0,0,0.1)] -m-[1px] border border-foreground/10" />

      {/* Icon Badge */}
      <div
        className="w-12 h-12 rounded-full flex items-center justify-center mb-5 shrink-0 transition-all duration-300 group-hover:scale-110 bg-white border border-border shadow-xs"
      >
        <Icon size={20} style={{ color: NAVY }} strokeWidth={1.9} />
      </div>

      {/* Title */}
      <h3
        className="font-serif font-bold text-[18px] leading-snug mb-2 transition-colors duration-300 text-brand-pink group-hover:text-brand-navy"
      >
        {title}
      </h3>

      {/* Body */}
      <p className="font-sans text-[14px] text-foreground/75 leading-relaxed mb-4">
        {body}
      </p>

      {/* Bullet list */}
      <div className="mt-auto">
        {listLabel && (
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: PURPLE_DARK }}
          >
            {listLabel}
          </p>
        )}
        {!listLabel && (
          <p
            className="text-[11px] font-bold uppercase tracking-[0.15em] mb-2"
            style={{ color: PURPLE_DARK }}
          >
            Services:
          </p>
        )}
        <ul className="space-y-1.5">
          {items.map((item, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] text-foreground/70">
              <span
                className="mt-[5px] w-1.5 h-1.5 rounded-full shrink-0"
                style={{ backgroundColor: PINK_ACCENT }}
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function WorkWithMePage() {
  return (
    <main
      className="min-h-screen overflow-x-hidden"
      style={{ backgroundColor: "#FAF7F2", color: CHARCOAL }}
    >
      <Navbar solid />

      {/* ── SECTION 1: HERO / INTRO ─────────────────────────────────────────── */}
      <section className="pt-36 sm:pt-64 md:pt-72 pb-12 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-[12px] font-bold font-sans uppercase tracking-[0.22em] mb-4"
            style={{ color: PURPLE_MEDIUM }}
          >
            Work With Me
          </motion.p>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="font-serif text-[30px] sm:text-[38px] md:text-[44px] leading-[1.15] font-semibold mb-5 max-w-3xl"
            style={{ color: CHARCOAL }}
          >
            Turning Responsible AI into Strategy, Governance and Impact
          </motion.h1>

          {/* Animated gradient underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 60 }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.2 }}
            className="h-[3px] rounded-full mb-7"
            style={{ background: GRADIENT }}
          />

          {/* Intro body */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.3 }}
            className="font-sans text-[16px] sm:text-[17px] text-foreground/75 leading-relaxed max-w-[640px]"
          >
            I collaborate with governments, international organizations, NGOs, startups, research institutions, and businesses to design, adopt, and govern AI responsibly. My work combines ethical innovation, public policy, and practical implementation, with a strong focus on Africa, the MENA region, and the Global South.
          </motion.p>
        </div>
      </section>

      {/* ── SECTION 2: PORTRAIT + QUOTE ─────────────────────────────────────── */}
      <section className="py-14 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row gap-10 md:gap-14 items-center">
            {/* Portrait */}
            <motion.div
              {...fadeUp(0)}
              className="w-full md:w-[45%] shrink-0"
            >
              <div className="relative w-full rounded-2xl overflow-hidden shadow-xl bg-[#111]">
                <Image
                  src="/images/hero.webp"
                  alt="Maha Jouini — Work With Me"
                  width={600}
                  height={800}
                  className="w-full h-auto object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Pull Quote */}
            <motion.div
              {...fadeUp(0.12)}
              className="w-full md:w-[55%] flex flex-col justify-center"
            >
              {/* Giant quote glyph */}
              <div
                className="font-serif text-[80px] leading-none mb-2 select-none"
                style={{ color: "#A855F7", opacity: 0.35 }}
                aria-hidden
              >
                &ldquo;
              </div>

              <blockquote
                className="font-serif text-[22px] sm:text-[25px] italic leading-[1.45] mb-6"
                style={{ color: NAVY }}
              >
                Technology should empower people, protect rights and advance inclusion.{" "}
                <strong className="not-italic font-bold">
                  That is the future I work towards.
                </strong>
              </blockquote>

              {/* Small gradient rule */}
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: 50 }}
                viewport={{ once: true }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="h-[3px] rounded-full"
                style={{ background: GRADIENT }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SECTION 3: THREE SERVICE CARDS (top row) ───────────────────────── */}
      <section className="py-12 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topCards.map((card, idx) => (
              <ServiceCard
                key={idx}
                Icon={card.Icon}
                title={card.title}
                body={card.body}
                items={card.items}
                listLabel={card.listLabel}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 4: TWO CARDS (second row) ──────────────────────────────── */}
      <section className="py-6 pb-16 px-6 sm:px-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
            {bottomCards.map((card, idx) => (
              <ServiceCard
                key={idx}
                Icon={card.Icon}
                title={card.title}
                body={card.body}
                items={card.items}
                listLabel={card.listLabel}
                index={idx}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── SECTION 5: LET'S WORK TOGETHER (closing band) ──────────────────── */}
      <section
        className="py-20 px-6 sm:px-10"
        style={{
          background:
            "linear-gradient(135deg, rgba(168,85,247,0.06) 0%, rgba(236,72,153,0.06) 100%), #FAF7F2",
        }}
      >
        <div className="max-w-[700px] mx-auto text-center flex flex-col items-center">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0)}
            className="text-[11px] font-bold uppercase tracking-[0.22em] mb-5"
            style={{ color: PURPLE_MEDIUM }}
          >
            Let&apos;s Work Together
          </motion.p>

          {/* Heading */}
          <motion.h2
            {...fadeUp(0.08)}
            className="font-serif text-[22px] sm:text-[26px] font-semibold leading-[1.4] mb-10"
            style={{ color: CHARCOAL }}
          >
            Whether you are developing an AI strategy, designing ethical governance, training your team, or exploring responsible innovation, I would be delighted to collaborate with you.
          </motion.h2>

          {/* Service chips */}
          <motion.div
            {...fadeUp(0.16)}
            className="flex flex-wrap items-center justify-center gap-3"
          >
            {serviceChips.map(({ label, Icon }, idx) => (
              <span key={idx} className="flex items-center gap-2.5">
                <span
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[rgba(168,85,247,0.18)] bg-white/70 text-[11px] font-bold uppercase tracking-[0.16em] transition-all duration-300 hover:bg-white hover:shadow-md hover:border-brand-pink/30 cursor-default"
                  style={{ color: PURPLE_DARK }}
                >
                  <Icon size={13} strokeWidth={2} style={{ color: PINK_ACCENT }} />
                  {label}
                </span>
                {idx < serviceChips.length - 1 && (
                  <span className="text-foreground/20 text-[12px] font-light hidden sm:inline">·</span>
                )}
              </span>
            ))}
          </motion.div>
        </div>
      </section>

      <Footer showGradient />
    </main>
  );
}
