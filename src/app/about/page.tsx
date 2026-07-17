"use client";

import { useState, useEffect, useRef } from "react";
import { useInView, motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// ─── Data ────────────────────────────────────────────────────────────────────

const taglines = [
  "I turn lived experience into policy.",
  "I build AI with wisdom, not just data.",
  "Every system carries a worldview.\nI make sure it sees everyone.",
];

const timelineItems = [
  {
    period: "2011–2013",
    title: "Empowering Youth During Tunisia's Democratic Transition",
    content:
      "In the wake of Tunisia's revolution, I worked alongside youth organisations and civil society groups to rebuild civic participation and democratic engagement. This formative chapter taught me that meaningful change requires both institutional reform and community trust — lessons that would shape every role I took on after.",
  },
  {
    period: "2014–2017",
    title: "Advancing Regional Policy at the African Union",
    content:
      "At the African Union, I contributed to regional policy frameworks spanning education, gender equity, and digital inclusion across 54 member states. Working at the continental level sharpened my understanding of how policy shapes opportunity — and how often the voices of the Global South are absent from the rooms where those decisions are made.",
  },
  {
    period: "2018–2020",
    title: "Driving Digital Transformation Across the African Union",
    content:
      "I led programmes to advance data governance, ICT policy, and the digitisation of public services — helping translate the African Union's digital agenda into on-the-ground reality. This work revealed both the enormous potential and the deep inequities embedded in how technology arrives in different communities.",
  },
  {
    period: "2020–2022",
    title: "Human Rights, Digital Inclusion, and Responsible Innovation",
    content:
      "As emerging technologies began reshaping society at speed, I shifted focus to the intersection of human rights and digital innovation — advocating for frameworks that centre dignity, inclusion, and justice. During this period I also navigated a deeply personal chapter: a cancer diagnosis that fundamentally changed how I understand resilience, care, and what it means to design systems for real human lives.",
  },
  {
    period: "2022",
    title: "Advancing National Digital Transformation in Mauritania and STEM",
    content:
      "I supported Mauritania's national digital strategy while championing STEM education initiatives designed to cultivate Africa's next generation of technology leaders — particularly young women who remain underrepresented in these fields.",
  },
  {
    period: "2022",
    title: "Contributing to the Global Conversation on AI Ethics",
    content:
      "I participated in landmark international forums on AI ethics, bringing African and Arab perspectives into spaces that too often default to Western frameworks. Every conversation reinforced the same conviction: the future of AI must be shaped by many civilisations, not just a few.",
  },
  {
    period: "2023",
    title: "Measuring Responsible AI Across Africa (GIRAI)",
    content:
      "As part of the Global Index on Responsible AI (GIRAI), I led research assessing the state of AI governance, institutional readiness, and responsible adoption across African nations — producing evidence-based insights to guide policymakers and practitioners.",
  },
  {
    period: "2024",
    title: "Helping Shape Tunisia's Responsible AI Landscape (GIZ)",
    content:
      "Partnering with GIZ, I co-designed Tunisia's responsible AI roadmap — translating global governance principles into nationally relevant policy that reflects Tunisia's specific social, cultural, and institutional context.",
  },
  {
    period: "2025",
    title: "Leading Research on AI Governance and Gender",
    content:
      "I published research on the gendered dimensions of AI systems, examining how automated decision-making can reproduce or amplify structural inequalities — particularly for women in the Global South. This work sits at the heart of why governance cannot be an afterthought.",
  },
  {
    period: "2025",
    title: "Supervising Responsible AI Research Across Africa and MENA",
    content:
      "I mentored emerging researchers and supervised AI governance projects across multiple African and MENA countries, working to build a generation of locally rooted, globally connected AI ethics practitioners.",
  },
  {
    period: "2025",
    title: "Educating the Next Generation (UNESCO–LG MOOC)",
    content:
      "Co-developing a UNESCO–LG MOOC on AI literacy and ethics, I helped bring rigorous, culturally grounded AI education to thousands of learners across Africa and the Arab world — in the languages and contexts that matter to them.",
  },
  {
    period: "2026–Present",
    title: "Advising on AI and Technology-Facilitated GBV; Building CHIFAA",
    content:
      "Today I advise policymakers on AI's role in technology-facilitated gender-based violence, while building CHIFAA — a survivor-led AI platform offering multilingual, culturally grounded support for women affected by breast and cervical cancer across North Africa. CHIFAA is the convergence of everything: lived experience, technical expertise, ethical commitment, and cultural care.",
  },
];

const educationItems = [
  { institution: "OPIT", degree: "MSc in Responsible AI (In Progress)", location: "Malta", year: "2026–Present" },
  { institution: "Stanford University", degree: "Certificate, Ethics, Technology & Public Policy", location: "USA", year: "2025" },
  { institution: "HEC Rabat", degree: "Executive Master's, Cloud Computing, Cybersecurity & Data Governance", location: "Morocco", year: "2025" },
  { institution: "University of Cape Town", degree: "AI Policy and Ethics", location: "South Africa", year: "2024" },
  { institution: "CAIDP", degree: "AI Policy Certificate", location: "", year: "2022" },
  { institution: "Tianjin University of Technology", degree: "MSc Applied Technology & AI", location: "China", year: "2016–2020" },
  { institution: "France 24 Media Center", degree: "Digital Rights and Communication", location: "France", year: "2016" },
  { institution: "Tunis High Institute of Human Sciences", degree: "BA French Literature and Civilization", location: "Tunisia", year: "2008–2012" },
  { institution: "Tunisian Institute of Technology", degree: "Diploma, IT and Administration", location: "Tunisia", year: "2008" },
];

const channels = [
  {
    name: "LinkedIn",
    desc: "Policy updates, governance commentary, and AI leadership perspectives.",
    href: "#",
    color: "hover:border-brand-navy",
    iconColor: "text-brand-navy",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    name: "Podcast",
    desc: "Conversations on responsible AI, the Global South, and technology for humanity.",
    href: "#",
    color: "hover:border-brand-pink",
    iconColor: "text-brand-pink",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <line x1="12" y1="19" x2="12" y2="23" />
        <line x1="8" y1="23" x2="16" y2="23" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    desc: "Behind-the-scenes: speaking engagements, events, and moments that matter.",
    href: "#",
    color: "hover:border-brand-cyan",
    iconColor: "text-brand-cyan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
];

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function AboutPage() {
  const [taglineIndex, setTaglineIndex] = useState(0);
  const videoRef = useRef(null);
  const isInView = useInView(videoRef, { once: true, amount: 0.3 });
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    const interval = setInterval(
      () => setTaglineIndex((prev) => (prev + 1) % taglines.length),
      3600
    );
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (isInView) setShouldPlay(true);
  }, [isInView]);

  return (
    <main className="min-h-screen bg-background text-foreground overflow-hidden">
      <Navbar />

      {/* ── A: Hero ─────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[65vh] md:h-[75vh] overflow-hidden">
        <Image
          src="/images/instagram inspiraton.jpg"
          alt="Maha Jouini – AI Governance Expert"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/25 via-black/15 to-black/55" />

        {/* Rotating tagline */}
        <div className="absolute inset-0 flex items-end pb-12 px-8 md:px-16">
          <AnimatePresence mode="wait">
            <motion.p
              key={taglineIndex}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.65, ease: "easeInOut" }}
              className="text-white text-2xl md:text-4xl max-w-xl whitespace-pre-line font-script"
              style={{
                textShadow: "0px 2px 16px rgba(0,0,0,0.7)",
                lineHeight: 1.45,
              }}
            >
              {taglines[taglineIndex]}
            </motion.p>
          </AnimatePresence>
        </div>
      </section>

      {/* ── B: Intro Paragraph ──────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.p
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="text-foreground/80 text-lg md:text-xl lg:text-2xl font-light leading-relaxed"
        >
          People say change happens in the blink of an eye — but I&apos;ve lived
          through enough chapters to know it happens in waves. I&apos;m{" "}
          <span className="text-brand-navy font-semibold font-serif">Maha Jouini</span>:
          AI governance expert, researcher, and founder of{" "}
          <span className="text-brand-pink font-medium">HIKMA AI</span> and{" "}
          <span className="text-brand-cyan font-medium">CHIFAA</span>. I build
          responsible, human-centered AI that bridges technology, health, ethics,
          and culture — amplifying the voices of Africa, the Arab world, and the
          Global South to shape a wiser, more inclusive future.
        </motion.p>
      </section>

      <div className="mx-auto max-w-7xl px-4 md:px-8">
        <hr className="border-border" />
      </div>

      {/* ── C: What's My Story — Video + Timeline ───────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-4xl md:text-5xl lg:text-6xl font-serif text-brand-navy mb-4"
        >
          What&apos;s my story?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-foreground/65 text-lg mb-14 max-w-3xl"
        >
          A career built at the intersection of policy, technology, and lived
          experience — across continents, crises, and breakthroughs.
        </motion.p>

        {/* YouTube */}
        <motion.div
          ref={videoRef}
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.85, ease: "easeOut" }}
          className="relative w-full aspect-video overflow-hidden shadow-2xl bg-black border border-foreground/10 mb-20"
        >
          {shouldPlay ? (
            <iframe
              className="absolute inset-0 w-full h-full"
              src="https://www.youtube.com/embed/wYy9CqunS8g?autoplay=1&mute=1&controls=1&rel=0&modestbranding=1"
              title="Maha Jouini – My Story"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
              <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4" />
              <span className="text-white/60 text-sm animate-pulse">Loading video…</span>
            </div>
          )}
        </motion.div>

        {/* ── Timeline ── */}
        <div className="relative">
          {/* Vertical rule — visible sm+ */}
          <div className="absolute left-[120px] top-2 bottom-2 w-px bg-border hidden sm:block" />

          <div className="space-y-10">
            {timelineItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.55, delay: idx * 0.04 }}
                className="relative flex flex-col sm:flex-row gap-3 sm:gap-0"
              >
                {/* Year — desktop left column */}
                <div className="hidden sm:flex w-[120px] flex-shrink-0 justify-end pr-8 pt-[3px]">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brand-pink text-right leading-tight">
                    {item.period}
                  </span>
                </div>

                {/* Dot on the line */}
                <div className="hidden sm:block absolute left-[116px] top-[5px] w-[9px] h-[9px] rounded-full bg-brand-navy border-2 border-background shadow-sm" />

                {/* Content */}
                <div className="sm:pl-10 flex-1">
                  {/* Year visible on mobile */}
                  <span className="sm:hidden text-[11px] font-bold uppercase tracking-widest text-brand-pink mb-1 block">
                    {item.period}
                  </span>
                  <h3 className="text-lg font-semibold text-brand-navy font-serif mb-1.5 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-foreground/70 text-[15px] leading-relaxed">{item.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Looking Ahead */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-20 max-w-3xl sm:pl-[130px]"
        >
          <h3 className="text-2xl md:text-3xl font-serif text-brand-navy mb-4">
            Looking Ahead
          </h3>
          <p className="text-foreground/75 text-lg leading-relaxed">
            The chapters ahead are ones I&apos;m still writing — in research labs,
            policy rooms, clinical settings, and classrooms. I am committed to
            ensuring that the next wave of AI is not just powerful, but wise; not
            just efficient, but just.
          </p>
        </motion.div>

        {/* Closing pull-quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="border-l-4 border-brand-pink pl-8 py-3 mt-12 max-w-3xl sm:ml-[130px]"
        >
          <p className="text-xl md:text-2xl font-serif italic text-foreground/85 leading-relaxed">
            &ldquo;Technology is most powerful when it strengthens institutions,
            expands opportunity, and serves humanity with wisdom, dignity, and
            justice.&rdquo;
          </p>
        </motion.blockquote>
      </section>

      {/* ── D: Philosophy ───────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-brand-navy mb-14"
        >
          Philosophy
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-brand-pink" />
              <h3 className="text-xl font-semibold text-brand-navy font-serif">
                What Is My Vision?
              </h3>
            </div>
            <p className="text-foreground/75 leading-relaxed text-[15px]">
              My vision is to ensure that the Global South becomes a global
              architect of responsible artificial intelligence — contributing not
              only technology and talent, but wisdom, ethical leadership, and
              culturally grounded innovation. The future of AI must be shaped by
              many civilisations, languages, and knowledge systems. By bringing
              together science, philosophy, and public policy, I work to build AI
              that serves humanity, protects human dignity, and advances
              sustainable development for all.
            </p>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.12 }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-1 h-8 bg-brand-cyan" />
              <h3 className="text-xl font-semibold text-brand-navy font-serif">
                The Approach
              </h3>
            </div>
            <p className="text-foreground/75 leading-relaxed text-[15px]">
              Artificial intelligence is not only an engineering challenge — it is
              a human one. My approach combines technology, ethics, philosophy,
              healthcare, and public policy to create AI that is trustworthy,
              inclusive, and rooted in the cultures and communities it serves.
              Through CHIFAA, I transform responsible AI principles into practical
              healthcare solutions. Through HIKMA AI, I draw on the intellectual
              traditions of Timbuktu, Kairouan, and Baghdad — reminding us that
              intelligence without compassion is incomplete.
            </p>
          </motion.div>
        </div>

        {/* Moonshot pull-quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-brand-navy/5 border-l-4 border-brand-navy pl-8 pr-8 py-8"
        >
          <p className="text-xl md:text-2xl font-serif italic text-brand-navy leading-relaxed">
            &ldquo;Lived experience is not a footnote to expertise — it is
            expertise. It transforms knowledge into wisdom, and innovation into
            impact.&rdquo;
          </p>
        </motion.blockquote>
      </section>

      {/* ── E: Education ─────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-brand-navy mb-12"
        >
          Education
        </motion.h2>

        <div className="space-y-0">
          {educationItems.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -12 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: idx * 0.055 }}
              className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-8 border-b border-border py-5 last:border-0"
            >
              <span className="text-[11px] font-bold text-brand-pink uppercase tracking-widest sm:w-28 flex-shrink-0">
                {item.year}
              </span>
              <div>
                <p className="font-semibold text-brand-navy font-serif text-lg leading-tight">
                  {item.institution}
                </p>
                <p className="text-foreground/65 text-[15px] mt-0.5">
                  {item.degree}
                  {item.location && (
                    <span className="text-foreground/40"> — {item.location}</span>
                  )}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── F: Stay Connected ────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-8 max-w-7xl mx-auto border-t border-border">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif text-brand-navy mb-3"
        >
          Stay Connected
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-foreground/60 text-lg mb-12 max-w-2xl"
        >
          Follow along on the channels where I share policy thinking, research
          updates, and the work behind HIKMA AI and CHIFAA.
        </motion.p>

        {/* Channel cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-14">
          {channels.map((ch, idx) => (
            <motion.a
              key={ch.name}
              href={ch.href}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`block p-6 border-2 border-border ${ch.color} transition-all duration-300 group`}
            >
              <div className={`mb-4 ${ch.iconColor}`}>{ch.icon}</div>
              <h3 className="font-semibold text-brand-navy font-serif text-xl mb-2">
                {ch.name}
              </h3>
              <p className="text-foreground/60 text-sm leading-relaxed">{ch.desc}</p>
            </motion.a>
          ))}
        </div>

        {/* Newsletter signup */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="bg-secondary/50 border border-border p-8 md:p-12"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl md:text-3xl font-serif text-brand-navy mb-3">
                Stay in the loop
              </h3>
              <p className="text-foreground/65 leading-relaxed">
                Get updates on responsible AI, governance research, and
                CHIFAA&apos;s work — straight to your inbox.
              </p>
            </div>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="email"
                placeholder="Your email address"
                className="flex-1 bg-background border border-border px-4 py-3 text-foreground placeholder:text-foreground/35 focus:outline-none focus:border-brand-navy transition-colors"
              />
              <button
                type="submit"
                className="px-8 py-3 bg-brand-navy text-white font-semibold uppercase tracking-widest text-sm hover:bg-brand-navy/90 transition-colors whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
