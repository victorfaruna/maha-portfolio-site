"use client";

import { motion } from "framer-motion";
import { Award, GraduationCap, Sparkles } from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

type Recognition = {
  title: string;
  meta: string;
  year: string;
  description: string;
};

const awards: Recognition[] = [
  {
    title: "She Shapes AI Global Awards — Winner",
    meta: "AI Thought Leadership · London School of Economics",
    year: "2026",
    description:
      "Recognized for leadership and impact in responsible and ethical AI on a global stage.",
  },
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
      "Part of Google’s global Women Techmakers community, supporting the visibility and advancement of women in technology.",
  },
];

const fellowships: Recognition[] = [
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
      "Contributing research and perspectives on responsible AI and AI governance, with particular attention to women’s leadership and inclusion in Africa.",
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
      "Mentored women entrepreneurs and emerging innovators across the Arab States in business development, innovation and entrepreneurship.",
  },
  {
    title: "ARIN Publishing Academy — First Cohort",
    meta: "Academic Publishing & Research",
    year: "Fellow · 2026",
    description:
      "Selected for the inaugural cohort, strengthening research, academic writing and publishing capacity for African scholars and practitioners.",
  },
  {
    title: "UNFPA Tunisia — Pool of Experts in AI & TFGBV",
    meta: "Digital Safety & Gender Ethics",
    year: "Expert · 2026",
    description:
      "Selected to contribute expertise on AI, digital safety and technology-facilitated gender-based violence in Tunisia.",
  },
];

const reveal = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55 },
};

function SectionTitle({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <motion.header {...reveal} className="grid gap-5 border-t border-brand-navy/15 pt-7 md:grid-cols-[0.8fr_1.2fr] md:gap-12">
      <div>
        <p className="mb-3 text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">
          {eyebrow}
        </p>
        <h2 className="font-serif text-4xl leading-tight text-brand-navy sm:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-xl self-end text-base leading-relaxed text-foreground/70 sm:text-lg">
        {description}
      </p>
    </motion.header>
  );
}

function FellowshipRow({ item, index }: { item: Recognition; index: number }) {
  return (
    <motion.article
      {...reveal}
      transition={{ duration: 0.5, delay: Math.min(index * 0.04, 0.2) }}
      className="group grid gap-4 border-t border-brand-navy/15 py-7 sm:grid-cols-[44px_1fr_auto] sm:gap-5"
    >
      <span className="font-serif text-xl text-brand-pink">{String(index + 1).padStart(2, "0")}</span>
      <div>
        <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.16em] text-brand-pink">
          {item.meta}
        </p>
        <h3 className="font-serif text-2xl leading-snug text-brand-navy transition-colors group-hover:text-brand-pink">
          {item.title}
        </h3>
        <p className="mt-3 max-w-2xl text-sm leading-relaxed text-foreground/70 sm:text-base">
          {item.description}
        </p>
      </div>
      <p className="whitespace-nowrap text-sm font-semibold text-brand-navy/60 sm:pt-7">
        {item.year}
      </p>
    </motion.article>
  );
}

export default function AwardsFellowshipsPage() {
  return (
    <main className="min-h-screen overflow-x-hidden bg-white text-foreground">
      <Navbar solid />

      <section className="px-6 pb-16 pt-32 sm:px-10 sm:pt-40 md:pt-48 lg:px-16 lg:pb-24 lg:pt-52">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65 }}
            className="grid items-end gap-10 lg:grid-cols-[1.35fr_0.65fr]"
          >
            <div>
              <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-brand-pink">
                Awards &amp; Fellowships
              </p>
              <h1 className="max-w-4xl font-serif text-5xl leading-[0.98] tracking-tight text-brand-navy sm:text-6xl md:text-7xl lg:text-8xl">
                Recognition rooted in purpose.
              </h1>
            </div>

            <div className="border-l-2 border-brand-pink pl-6">
              <p className="text-base leading-relaxed text-foreground/70 sm:text-lg">
                Honours and programmes recognizing a body of work spanning responsible AI,
                public policy, digital inclusion and women&apos;s leadership.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-12 h-px origin-left bg-brand-navy/20"
          />

          <div className="mt-8 grid grid-cols-3 gap-2 sm:gap-8">
            {[
              ["10", "Recognitions & programmes"],
              ["Global", "Reach and contribution"],
              ["2011—Now", "A continuing journey"],
            ].map(([value, label]) => (
              <div key={label}>
                <p className="whitespace-nowrap font-serif text-lg text-brand-pink sm:text-3xl">{value}</p>
                <p className="mt-1 text-[8px] uppercase tracking-[0.08em] text-brand-navy/60 sm:text-xs sm:tracking-[0.12em]">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-brand-navy px-6 py-16 text-white sm:px-10 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-[0.75fr_1.25fr]">
            <motion.div {...reveal}>
              <span className="mb-7 flex size-14 items-center justify-center rounded-full border border-white/25 text-brand-pink">
                <Award size={26} strokeWidth={1.6} />
              </span>
              <p className="text-xs font-bold uppercase tracking-[0.22em] text-brand-pink">
                Flagship recognition · 2026
              </p>
              <h2 className="mt-4 font-serif text-4xl leading-tight text-white sm:text-5xl">
                She Shapes AI Global Awards
              </h2>
              <p className="mt-3 font-serif text-2xl italic text-white/75">Winner</p>
            </motion.div>

            <motion.div {...reveal} className="self-end border-t border-white/20 pt-7">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-brand-pink">
                AI Thought Leadership · London School of Economics
              </p>
              <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80 sm:text-xl">
                Recognized for leadership and impact in responsible and ethical AI on a global stage. This work is grounded in dignity, representation and meaningful change.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Awards & recognition"
            title="Moments of recognition"
            description="Selected honours celebrating advocacy, thought leadership and a sustained commitment to building more inclusive technology ecosystems."
          />

          <div className="mt-12 grid gap-px overflow-hidden border border-brand-navy/15 bg-brand-navy/15 md:grid-cols-2">
            {awards.slice(1).map((item, index) => (
              <motion.article
                key={item.title}
                {...reveal}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="group bg-white p-7 sm:p-9"
              >
                <div className="mb-12 flex items-center justify-between gap-4">
                  <Sparkles size={22} className="text-brand-pink" strokeWidth={1.6} />
                  <span className="text-sm font-semibold text-brand-navy/55">{item.year}</span>
                </div>
                <p className="text-[11px] font-bold uppercase tracking-[0.17em] text-brand-pink">
                  {item.meta}
                </p>
                <h3 className="mt-3 font-serif text-3xl leading-tight text-brand-navy transition-colors group-hover:text-brand-pink">
                  {item.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-foreground/70">
                  {item.description}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#F8F9FC] px-6 py-20 sm:px-10 lg:px-16 lg:py-28">
        <div className="mx-auto max-w-7xl">
          <SectionTitle
            eyebrow="Fellowships & programmes"
            title="Learning, leading and giving back"
            description="Programmes that deepen practice, connect ideas across regions and create space to mentor the next generation of responsible technology leaders."
          />

          <div className="mt-12 grid gap-x-12 lg:grid-cols-2">
            {fellowships.map((item, index) => (
              <FellowshipRow key={item.title} item={item} index={index} />
            ))}
          </div>

          <motion.div {...reveal} className="mt-16 flex flex-col gap-5 border-l-2 border-brand-pink pl-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <GraduationCap className="mb-4 text-brand-pink" size={28} strokeWidth={1.5} />
              <p className="font-serif text-2xl text-brand-navy sm:text-3xl">
                Recognition is meaningful when it opens doors for others.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer showGradient />
    </main>
  );
}
