"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  User,
  Shield,
  Globe,
  Lightbulb,
  ShieldCheck,
  Users,
  Ribbon,
  Sparkles,
  Landmark,
  Scale,
  Target,
  Languages,
  HeartHandshake,
  Megaphone,
  Compass,
  MessageSquare,
  CheckCircle2,
} from "lucide-react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// brand tokens
const NAVY  = "#0B1F4D";
const ROSE  = "#C9A97E";
const DARK  = "#12151C";
const BLUSH = "#C4818A";

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] as [number,number,number,number] },
});

function ServiceCard({ Icon, title, description, bullets, delay = 0 }: {
  Icon: React.ElementType; title: string; description: string; bullets: string[]; delay?: number;
}) {
  return (
    <motion.div {...fadeUp(delay)} className="group rounded-2xl p-8 flex flex-col gap-5 border border-white/5 hover:border-brand-pink/30 transition-all duration-300" style={{ backgroundColor: DARK }}>
      <div className="w-12 h-12 rounded-2xl bg-brand-pink/20 text-brand-pink flex items-center justify-center flex-shrink-0 group-hover:bg-brand-pink group-hover:text-white transition-colors duration-300 shadow-sm">
        <Icon size={22} className="stroke-current" strokeWidth={1.8} />
      </div>
      <div>
        <h3 className="font-serif text-white text-[22px] leading-snug mb-2 group-hover:text-brand-pink transition-colors">{title}</h3>
        <div className="w-10 h-[1.5px] rounded-full bg-brand-pink/70" />
      </div>
      <p className="text-white/70 text-[14px] leading-relaxed font-sans">{description}</p>
      <ul className="space-y-2">
        {bullets.map((b, i) => (
          <li key={i} className="flex items-start gap-2.5 text-white/85 text-[13px] font-sans leading-snug">
            <span className="mt-[5px] w-[6px] h-[6px] rounded-full flex-shrink-0 bg-brand-pink/70" />
            {b}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

type BulletItem = { icon?: React.ElementType; text: string };

function InitiativeCard({ bannerContent, bannerBg, Icon, iconSrc, iconClassName, iconBg, titleColor, title, subtitle, body, bullets, ctaLabel, ctaBg, ctaText = "#fff", href = "#", delay = 0 }: {
  bannerContent: React.ReactNode; bannerBg: string; Icon?: React.ElementType; iconSrc?: string; iconClassName?: string; iconBg: string; titleColor?: string;
  title: string; subtitle?: string; body: React.ReactNode; bullets: BulletItem[];
  ctaLabel: string; ctaBg: string; ctaText?: string; href?: string; delay?: number;
}) {
  const accent = titleColor || (iconBg !== "transparent" ? iconBg : "#D0567A");
  return (
    <motion.div
      {...fadeUp(delay)}
      whileHover={{ y: -6, boxShadow: "0 20px 48px rgba(0,0,0,0.13)" }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="group flex flex-col h-full overflow-hidden border border-[#EAE4DC] rounded-2xl bg-[#FAF8F5] shadow-sm cursor-pointer"
    >
      {/* Banner */}
      <div className="relative w-full flex flex-col items-center justify-center overflow-hidden flex-shrink-0" style={{ background: bannerBg, aspectRatio: "1584 / 930" }}>
        <div className="absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-[1.04]">
          {bannerContent}
        </div>
      </div>

      {/* Body */}
      <div className="p-6 sm:p-7 flex flex-col justify-between flex-1 gap-5">
        <div className="space-y-4">
          <div className="flex items-center gap-4 min-h-[56px]">
            <motion.div
              className="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 shadow-sm overflow-hidden"
              style={{ backgroundColor: iconBg }}
              whileHover={{ scale: 1.12 }}
              transition={{ type: "spring", stiffness: 320, damping: 18 }}
            >
              {iconSrc ? (
                <img src={iconSrc} alt={title} className={`w-full h-full ${iconClassName || "object-contain"}`} />
              ) : Icon ? (
                <Icon size={24} color="#fff" strokeWidth={1.8} />
              ) : null}
            </motion.div>
            <div className="flex flex-col justify-center">
              <h3 className="font-serif text-[20px] sm:text-[21px] font-bold leading-tight" style={{ color: accent }}>{title}</h3>
              {subtitle && <p className="text-[12px] font-sans text-foreground/60 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          <div className="text-[14px] text-foreground/80 font-sans leading-relaxed min-h-[72px] flex items-start">{body}</div>
          <motion.div
            className="w-12 h-[2px] rounded-full"
            style={{ backgroundColor: accent }}
            whileHover={{ width: 48 }}
          />
          <ul className="space-y-3.5 pt-1">
            {bullets.map((b, i) => {
              const BulletIcon = b.icon;
              return (
                <li key={i} className="flex items-center gap-3 text-[13.5px] text-foreground/85 font-sans leading-snug">
                  {BulletIcon ? (
                    <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 border transition-colors duration-200 group-hover:border-opacity-60" style={{ borderColor: `${accent}40`, color: accent }}>
                      <BulletIcon size={14} strokeWidth={1.8} />
                    </div>
                  ) : (
                    <span className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: accent }} />
                  )}
                  <span>{b.text}</span>
                </li>
              );
            })}
          </ul>
        </div>
        <div className="pt-2 mt-auto">
          <a
            href={href}
            target={href !== "#" ? "_blank" : undefined}
            rel={href !== "#" ? "noopener noreferrer" : undefined}
            className="inline-block px-6 py-2.5 rounded-full text-[13.5px] font-semibold font-sans shadow-sm transition-all duration-200 hover:brightness-110 hover:shadow-md active:scale-95"
            style={{ backgroundColor: ctaBg, color: ctaText }}
            onClick={e => e.stopPropagation()}
          >
            {ctaLabel}
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function AiSolutionsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar solid noBorder />

      {/* SECTION 1 — HERO */}
      <section className="pt-24 sm:pt-36 md:pt-44 lg:pt-48 pb-6 px-6 sm:px-16 md:px-20 lg:px-28 max-w-[1500px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
          <div className="flex-1">
            <motion.p {...fadeUp(0)} className="text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.22em] mb-4 font-sans" style={{ color: NAVY }}>
              AI Solutions
            </motion.p>
            <motion.h1 {...fadeUp(0.08)} className="font-serif text-[36px] sm:text-[48px] md:text-[55px] lg:text-[60px] leading-[1.12] mb-5 font-semibold tracking-tight" style={{ color: NAVY }}>
              <span className="inline-block">Building Responsible AI</span><br />
              <span className="inline-block">for People and Society</span>
            </motion.h1>
            <motion.div {...fadeUp(0.14)} className="mb-6 h-[2px] w-16 rounded-full bg-brand-pink" />
            <motion.p {...fadeUp(0.2)} className="text-[16px] leading-relaxed font-sans text-foreground/70 max-w-[480px]">
              I design, advise and build AI solutions that are ethical, human-centred and context-aware, with a strong focus on Africa and the Global South.
            </motion.p>
          </div>
          <div className="flex-1 flex flex-col sm:flex-row items-center justify-between gap-8 sm:gap-10 w-full mt-4 sm:mt-0">
            <motion.div {...fadeUp(0.1)} className="w-full sm:w-[55%] max-w-[340px] sm:max-w-[500px] flex-shrink-0 flex justify-center -mt-4 sm:-mt-6 md:-mt-8">
              <Image
                src="/images/aiimage.png"
                alt="AI Solutions"
                width={500}
                height={550}
                className="w-full h-auto object-contain [mask-image:linear-gradient(to_bottom,transparent_0%,black_3%,black_100%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent_0%,black_3%,black_100%)]"
                priority
              />
            </motion.div>
            <motion.div {...fadeUp(0.25)} className="w-full sm:flex-1 flex flex-col gap-4 sm:gap-6 min-w-0 sm:pl-4">
              {[
                { Icon: User,   label: "Human dignity at the centre" },
                { Icon: Shield, label: "Ethics, transparency and accountability" },
                { Icon: Globe,  label: "Cultural context, inclusion and equity" },
              ].map(({ Icon, label }, i) => (
                <div key={i} className="flex items-center gap-3.5">
                  <div className="w-11 h-11 rounded-full bg-brand-soft-pink flex items-center justify-center flex-shrink-0">
                    <Icon size={18} style={{ color: NAVY }} strokeWidth={1.8} />
                  </div>
                  <span className="text-[14.5px] sm:text-[15.5px] font-sans font-medium leading-snug" style={{ color: NAVY }}>{label}</span>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2 — SERVICE CARDS */}
      <section className="pt-2 pb-6 px-10 sm:px-16 md:px-20 lg:px-28 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ServiceCard Icon={Lightbulb} title="AI Adoption & Strategy" description="Helping organizations understand where AI creates value and how to adopt it responsibly."
            bullets={["AI readiness assessment","Use-case identification","AI adoption roadmaps","Responsible tool selection","Implementation guidance"]} delay={0} />
          <ServiceCard Icon={ShieldCheck} title="Responsible AI & Governance" description="Turning ethical principles into practical governance and safeguards."
            bullets={["AI policies and ethical guidelines","Risk and impact assessments","Safeguards and accountability","Governance frameworks","Transparency and fairness"]} delay={0.1} />
          <ServiceCard Icon={Users} title="Advisory & Mentorship" description="Supporting leaders, teams and innovators to build responsible and impactful AI initiatives."
            bullets={["Strategic advisory","Project mentorship","Capacity building","Responsible innovation","AI leadership support"]} delay={0.2} />
        </div>
      </section>

      {/* SECTION 3 — DIVIDER */}
      <section className="py-6 px-10 sm:px-16 md:px-20 lg:px-28 max-w-[1500px] mx-auto w-full">
        <motion.div {...fadeUp(0)} className="flex flex-col items-center gap-5">
          <div className="flex items-center gap-4 w-full">
            <div className="flex items-center gap-2 flex-1">
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-pink" />
              <div className="flex-1 h-px bg-brand-pink/50" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] whitespace-nowrap font-sans flex-shrink-0" style={{ color: NAVY }}>
              Ideas Into Practice
            </span>
            <div className="flex items-center gap-2 flex-1">
              <div className="flex-1 h-px bg-brand-pink/50" />
              <div className="w-1.5 h-1.5 rounded-full flex-shrink-0 bg-brand-pink" />
            </div>
          </div>
          <p className="text-center text-[14px] font-sans text-foreground/60 max-w-[600px] leading-relaxed">
            Initiatives and frameworks I have founded or developed to bring responsible AI to life through health, knowledge and governance.
          </p>
        </motion.div>
      </section>

      {/* SECTION 4 — INITIATIVE CARDS */}
      <section className="pb-20 px-10 sm:px-16 md:px-20 lg:px-28 max-w-[1500px] mx-auto w-full">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">

          {/* CHIFAA */}
          <InitiativeCard delay={0}
            href="https://chifaa.org/"
            bannerBg="#FDE7EC"
            bannerContent={
              <img
                src="/images/chifaaaiimage.png"
                alt="CHIFAA AI"
                className="w-full h-full object-cover"
              />
            }
            iconSrc="/images/Pink Location Ribbon Icon.png" iconClassName="scale-[1.25] object-cover" iconBg="transparent" titleColor="#D0567A"
            title="CHIFAA"
            body="A survivor-led AI and digital health initiative supporting women affected by breast and cervical cancer in North Africa."
            bullets={[
              { icon: Languages, text: "Multilingual AI assistant" },
              { icon: HeartHandshake, text: "Trusted information & support" },
              { icon: Megaphone, text: "Patient voices & advocacy" },
              { icon: ShieldCheck, text: "Privacy, safety & dignity at the core" },
            ]}
            ctaLabel="Explore CHIFAA" ctaBg="#D0567A" ctaText="#fff" />

          {/* HIKMA AI */}
          <InitiativeCard delay={0.1}
            bannerBg="#12151C"
            bannerContent={
              <img
                src="/images/hikmaaaiimage.png"
                alt="HIKMA AI"
                className="w-full h-full object-cover"
              />
            }
            iconSrc="/images/hikma.png" iconClassName="scale-[1.8] object-cover" iconBg="transparent" titleColor={NAVY}
            title="HIKMA AI"
            body="A platform exploring responsible AI through African, Arab and Global South perspectives."
            bullets={[
              { icon: Compass, text: "AI ethics & philosophy" },
              { icon: Sparkles, text: "Research & thought leadership" },
              { icon: MessageSquare, text: "Dialogue & knowledge sharing" },
              { icon: Globe, text: "Culturally grounded innovation" },
            ]}
            ctaLabel="Explore HIKMA AI" ctaBg={NAVY} ctaText="#fff" />

          {/* CARTHAGE BILL */}
          <InitiativeCard delay={0.2}
            bannerBg="#C9A040"
            bannerContent={
              <img
                src="/images/carthagebillimage.png"
                alt="Carthage Bill"
                className="w-full h-full object-cover"
              />
            }
            iconSrc="/images/carthagebillicon.jpeg" iconClassName="scale-[1.45] object-cover" iconBg="transparent" titleColor="#C9A040"
            title="CARTHAGE BILL FOR AI ETHICS"
            body="An ethical framework proposing a North African approach to AI governance grounded in dignity, inclusion and technological sovereignty."
            bullets={[
              { icon: Landmark, text: "Human rights & dignity" },
              { icon: Users, text: "Inclusion & fairness" },
              { icon: CheckCircle2, text: "Accountability & transparency" },
              { icon: Shield, text: "Sovereignty & public interest" },
            ]}
            ctaLabel="Discover the Carthage Bill" ctaBg="#C9A040" ctaText="#fff" />
        </div>
      </section>

      {/* SECTION 5 — CLOSING QUOTE BANNER */}
      <section className="pb-16 px-10 sm:px-16 md:px-20 lg:px-28 max-w-[1500px] mx-auto w-full">
        <motion.div
          {...fadeUp(0)}
          className="rounded-2xl py-6 px-8 sm:py-7 sm:px-10 lg:py-8 lg:px-12 bg-brand-navy text-white flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-10 shadow-lg"
        >
          {/* Left Quote */}
          <div className="flex-1 max-w-xl">
            <div className="text-[38px] sm:text-[44px] font-serif leading-none text-purple-400 select-none" aria-hidden>&ldquo;</div>
            <p className="font-serif text-white text-[16px] sm:text-[18px] lg:text-[19px] leading-relaxed -mt-2">
              AI should not begin with the technology.<br />
              It should begin with people, context and purpose.
            </p>
          </div>

          {/* Right Icons Row */}
          <div className="flex flex-row items-center gap-3 sm:gap-5 lg:gap-7 flex-shrink-0">
            {[
              { Icon: Users,  label: "People first" },
              { Icon: Globe,  label: "Context matters" },
              { Icon: Scale,  label: "Ethics in action" },
              { Icon: Target, label: "Impact that lasts" },
            ].map(({ Icon, label }, i) => (
              <div key={i} className="flex items-center gap-3 sm:gap-5 lg:gap-7">
                {i > 0 && <div className="h-10 w-px bg-white/15 hidden sm:block" />}
                <div className="flex flex-col items-center text-center gap-2">
                  <Icon size={26} className="text-purple-300 stroke-[1.5]" />
                  <span className="text-[12px] sm:text-[12.5px] font-sans text-white/90 font-medium max-w-[80px] leading-tight">
                    {label}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      <Footer />
    </main>
  );
}
