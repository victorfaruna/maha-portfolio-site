"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export function Purpose() {
  return (
    <section id="purpose" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl space-y-24">
        {/* Section 1: My Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 md:order-1"
          >
            <div className="w-16 h-px bg-foreground mb-8"></div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl text-foreground font-serif mb-6">
              My purpose
            </h2>
            <div className="space-y-6 text-foreground/80 font-sans text-[16.5px] md:text-[20px] leading-relaxed">
              <p>
                Maha Jouini is a Tunisian AI thought leader, researcher, and
                Pan-African advocate working at the intersection of artificial
                intelligence, ethics, public policy, and human development. My
                work is dedicated to ensuring that AI serves people, strengthens
                institutions, and advances social justice across Africa and the
                Global South.
              </p>
              <p className="font-semibold text-foreground text-xl leading-relaxed py-2">
                Technology alone cannot guarantee justice; AI must be guided by
                wisdom, dignity, and human resilience.
              </p>
              <p>
                As the Founder of CHIFAA, a survivor-led initiative, I develop
                responsible AI solutions for women affected by breast and
                cervical cancer across North Africa. Inspired by my own
                experience, CHIFAA combines ethical AI, multilingual
                accessibility, and community-centered design.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-video md:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl order-1 md:order-2"
          >
            <Image
              src="/images/From Storytelling and Poetry to AI Systems.jpg"
              alt="Maha Jouini"
              fill
              className="object-cover object-[5%_10%]"
            />
          </motion.div>
        </div>

        {/* Section 2: Vision & Approach (moved below My Purpose) */}
        <div className="pt-16 border-t border-border/40 grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Vision */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-brand-pink rounded-full" />
              <h2 className="text-3xl md:text-4xl text-brand-navy font-serif font-semibold">
                What is my vision?
              </h2>
            </div>
            <div className="space-y-5 text-foreground/80 font-sans text-[16.5px] md:text-[20px] leading-relaxed">
              <p>
                My vision is to ensure that the <strong>Global South becomes a global architect of responsible artificial intelligence</strong>, contributing not only technology and talent, but also wisdom, ethical leadership, and culturally grounded innovation.
              </p>
              <p>
                I believe the future of AI should be shaped by many civilizations, languages, and knowledge systems. By bringing together science, philosophy, and public policy, I work to build AI that serves humanity, protects human dignity, and advances sustainable development for all.
              </p>
            </div>

            <div className="pt-4 space-y-6">
              <div className="relative w-full h-[617px] rounded-2xl overflow-hidden shadow-lg border border-border/40 bg-black">
                <img
                  src="/images/mahaholdingbook.jpeg"
                  alt="Maha Jouini holding book"
                  className="w-full h-full object-contain"
                />
              </div>

              <div className="pt-2">
                <Link
                  href="/about"
                  className="group inline-flex items-center gap-2 px-6 py-3 border-2 border-brand-navy text-brand-navy font-semibold text-sm uppercase tracking-widest hover:bg-brand-navy hover:text-white transition-all duration-300"
                >
                  Read the Full Story
                  <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Approach */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1.5 h-8 bg-brand-cyan rounded-full" />
              <h2 className="text-3xl md:text-4xl text-brand-navy font-serif font-semibold">
                The Approach
              </h2>
            </div>
            <div className="space-y-5 text-foreground/80 font-sans text-[16.5px] md:text-[20px] leading-relaxed">
              <p>
                Artificial intelligence is not only an engineering challenge—it is a human one.
              </p>
              <p>
                My approach combines <strong>technology, ethics, philosophy, healthcare, and public policy</strong> to create AI that is trustworthy, inclusive, and rooted in the cultures and communities it serves.
              </p>
              <p>
                Through <strong>CHIFAA</strong>, I transform responsible AI principles into practical healthcare solutions that empower women affected by breast and cervical cancer across North Africa.
              </p>
              <p>
                Through <strong>HIKMA AI</strong>, I promote a vision inspired by the intellectual traditions of <strong>Timbuktu, Kairouan, Baghdad</strong>, and the timeless wisdom of <strong>Mawlānā Jalāl al-Dīn Rūmī</strong>, reminding us that intelligence without compassion is incomplete.
              </p>
              <p className="italic pt-1">
                As Rūmī wrote:
              </p>
              <blockquote className="border-l-3 border-brand-navy pl-5 italic text-[17px] text-brand-navy font-serif py-1">
                &quot;Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.&quot;
              </blockquote>
              <p>
                I believe that the next generation of AI will not be defined solely by larger models or greater computational power, but by our ability to embed <strong>wisdom, empathy, cultural diversity, and human dignity</strong> into the systems we create.
              </p>

              {/* 3 Key Impact Pillars */}
              <div className="pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-brand-navy/5 border border-brand-navy/10 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-navy/10 flex items-center justify-center text-brand-navy font-bold text-sm">
                    01
                  </div>
                  <h4 className="font-serif font-semibold text-brand-navy text-base leading-snug">
                    Ethical AI Governance
                  </h4>
                  <p className="text-xs text-foreground/70 leading-normal">
                    Designing trustworthy, policy-backed frameworks for responsible technology adoption.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-brand-pink/5 border border-brand-pink/15 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-pink/10 flex items-center justify-center text-brand-pink font-bold text-sm">
                    02
                  </div>
                  <h4 className="font-serif font-semibold text-brand-navy text-base leading-snug">
                    Global South Advocacy
                  </h4>
                  <p className="text-xs text-foreground/70 leading-normal">
                    Amplifying African & Arab knowledge systems in global AI policy discourse.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-brand-cyan/5 border border-brand-cyan/20 space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-brand-cyan/15 flex items-center justify-center text-brand-cyan font-bold text-sm">
                    03
                  </div>
                  <h4 className="font-serif font-semibold text-brand-navy text-base leading-snug">
                    Human-Centered Health
                  </h4>
                  <p className="text-xs text-foreground/70 leading-normal">
                    Transforming survivor experience into AI healthcare solutions for women.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
