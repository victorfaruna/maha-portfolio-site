"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// ─── Brand tokens (consistent with rest of site) ─────────────────────────────
const NAVY = "#0B1F4D";
const ROSE = "#C9A97E"; // rose-gold accent

// ─── Animation helper ─────────────────────────────────────────────────────────
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: {
    duration: 0.6,
    delay,
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
  },
});

// ─── Entry component ──────────────────────────────────────────────────────────
function Entry({
  Icon,
  title,
  meta,
  description,
  delay = 0,
}: {
  Icon: React.ElementType;
  title: string;
  meta: string;
  description: string;
  delay?: number;
}) {
  return (
    <motion.div {...fadeUp(delay)}>
      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 py-7">
        {/* Rose-gold circular icon badge */}
        <div className="flex-shrink-0 mt-0.5">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              backgroundColor: `${ROSE}18`,
              border: `1.5px solid ${ROSE}55`,
            }}
          >
            <Icon size={17} style={{ color: ROSE }} strokeWidth={1.8} />
          </div>
        </div>

        {/* Text content */}
        <div className="flex-1 min-w-0">
          <h3
            className="font-serif font-bold text-[17px] leading-snug mb-1"
            style={{ color: NAVY }}
          >
            {title}
          </h3>
          <p
            className="text-[12px] font-sans font-semibold uppercase tracking-[0.15em] mb-2"
            style={{ color: `${ROSE}CC` }}
          >
            {meta}
          </p>
          <p className="font-sans text-[14px] text-foreground/70 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
      {/* Hairline divider */}
      <div
        className="w-full"
        style={{ borderBottom: "0.5px solid var(--border)" }}
      />
    </motion.div>
  );
}

// ─── Section heading treatment ────────────────────────────────────────────────
function SectionHeading({
  children,
  delay = 0,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return (
    <motion.div {...fadeUp(delay)} className="mb-8">
      <h2
        className="font-serif text-[26px] font-semibold mb-3"
        style={{ color: NAVY }}
      >
        {children}
      </h2>
      <div
        className="h-[2px] w-[50px] rounded-full"
        style={{ backgroundColor: ROSE }}
      />
    </motion.div>
  );
}

// ─── Data ─────────────────────────────────────────────────────────────────────
const awards = [
  {
    title: "She Shapes AI Global Awards — Winner",
    meta: "AI Thought Leadership · 2026 · London School of Economics",
    description:
      "Recognized for leadership and impact in responsible and ethical AI.",
  },
  {
    title: "UNESCO MENA Top 20 Women Change Makers",
    meta: "2022",
    description:
      "Recognized among women driving change and impact across the MENA region.",
  },
  {
    title: "Google Women Techmakers Ambassador",
    meta: "Since 2022",
    description:
      "Part of Google's global Women Techmakers community, supporting the visibility and advancement of women in technology.",
  },
];

const fellowships = [
  {
    title: "Microsoft Elevate Changemaker Fellowship",
    meta: "Fellow · 2026",
    description:
      "Selected for a global changemaker programme supporting leaders using technology to drive meaningful social impact.",
  },
  {
    title: "Stanford Ethics, Technology & Public Policy Practitioner Program",
    meta: "Practitioner · 2025 and cohort leader 2026",
    description:
      "Selected for a practitioner programme exploring the intersection of emerging technologies, ethics and public policy.",
  },
  {
    title: "Global Center on AI Governance",
    meta: "Research Fellow · Women in Focus",
    description:
      "Contributing research and perspectives on responsible AI and AI governance through the Women in Focus initiative, with particular attention to women's leadership, inclusion, and AI governance in Africa.",
  },
  {
    title: "TechForward Policy Fellowship",
    meta: "Mentor · 2026",
    description:
      "Supporting emerging professionals working at the intersection of AI and public policy.",
  },
  {
    title: "UNDP Arab States",
    meta: "Business Mentor · 2023",
    description:
      "Mentored women entrepreneurs and emerging innovators across the Arab States, providing guidance on business development, innovation, and entrepreneurship.",
  },
  {
    title: "ARIN Publishing Academy — First Cohort",
    meta: "Fellow · 2026",
    description:
      "Selected for the inaugural cohort of the ARIN Publishing Academy, strengthening research, academic writing, and publishing capacity for African scholars and practitioners.",
  },
  {
    title:
      "UNFPA Tunisia — Pool of Experts in AI & Technology-Facilitated Gender-Based Violence (TFGBV)",
    meta: "Expert · 2026",
    description:
      "Selected to contribute expertise on AI, digital safety, and technology-facilitated gender-based violence, supporting gender-responsive and responsible approaches to emerging technologies in Tunisia.",
  },
];

// ─── Page client component ────────────────────────────────────────────────────
export default function AwardsFellowshipsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar solid />

      {/* ── HERO ──────────────────────────────────────────────────────────── */}
      <section className="pt-44 pb-14 px-6 sm:px-10">
        <div className="max-w-[700px] mx-auto text-center">
          {/* Eyebrow */}
          <motion.p
            {...fadeUp(0)}
            className="text-[12px] font-bold font-sans uppercase tracking-[0.22em] mb-5"
            style={{ color: ROSE }}
          >
            Awards &amp; Fellowships
          </motion.p>

          {/* Main heading */}
          <motion.h1
            {...fadeUp(0.09)}
            className="font-serif text-[30px] sm:text-[38px] md:text-[42px] leading-[1.2] font-semibold mb-7"
            style={{ color: NAVY }}
          >
            Recognized for advancing responsible AI, ethical technology, digital
            inclusion and women&apos;s leadership across Africa and globally.
          </motion.h1>

          {/* Thin rose-gold rule */}
          <motion.div
            {...fadeUp(0.17)}
            className="mx-auto h-[2px] w-[60px] rounded-full"
            style={{ backgroundColor: ROSE }}
          />
        </div>
      </section>

      {/* ── AWARDS & RECOGNITION ─────────────────────────────────────────── */}
      <section className="pb-16 px-6 sm:px-10">
        <div className="max-w-[800px] mx-auto">
          <SectionHeading delay={0.05}>Awards &amp; Recognition</SectionHeading>

          {/* Top hairline */}
          <div
            className="w-full"
            style={{ borderBottom: "0.5px solid var(--border)" }}
          />

          {awards.map((a, i) => (
            <Entry
              key={i}
              Icon={Award}
              title={a.title}
              meta={a.meta}
              description={a.description}
              delay={0.07 + i * 0.06}
            />
          ))}
        </div>
      </section>

      {/* ── FELLOWSHIPS & LEADERSHIP PROGRAMMES ──────────────────────────── */}
      <section className="pb-28 px-6 sm:px-10">
        <div className="max-w-[800px] mx-auto">
          <SectionHeading delay={0.05}>
            Fellowships &amp; Leadership Programmes
          </SectionHeading>

          {/* Top hairline */}
          <div
            className="w-full"
            style={{ borderBottom: "0.5px solid var(--border)" }}
          />

          {fellowships.map((f, i) => (
            <Entry
              key={i}
              Icon={GraduationCap}
              title={f.title}
              meta={f.meta}
              description={f.description}
              delay={0.07 + i * 0.055}
            />
          ))}
        </div>
      </section>

      <Footer showGradient />
    </main>
  );
}
