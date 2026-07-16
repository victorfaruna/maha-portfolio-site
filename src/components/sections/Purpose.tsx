"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Purpose() {
  return (
    <section id="purpose" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        {/* Top Section: Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 mb-32 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 order-2 md:order-1"
          >
            <div className="w-16 h-px bg-foreground mb-8"></div>
            <h2 className="text-4xl md:text-5xl text-foreground font-serif mb-6">
              What is my vision?
            </h2>
            <div className="space-y-6 text-foreground/80 font-sans text-lg">
              <p>
                My vision is to ensure that the Global South becomes a global architect of responsible artificial intelligence, contributing not only technology and talent, but also wisdom, ethical leadership, and culturally grounded innovation.
              </p>
              <p>
                I believe the future of AI should be shaped by many civilizations, languages, and knowledge systems. By bringing together science, philosophy, and public policy, I work to build AI that serves humanity, protects human dignity, and advances sustainable development for all.
              </p>
              
              <h3 className="text-foreground font-semibold pt-2 text-xl">
                The Approach
              </h3>
              
              <p>
                Artificial intelligence is not only an engineering challenge—it is a human one. My approach combines technology, ethics, philosophy, healthcare, and public policy to create AI that is trustworthy, inclusive, and rooted in the cultures and communities it serves.
              </p>
              <p>
                Through CHIFAA, I transform responsible AI principles into practical healthcare solutions that empower women affected by breast and cervical cancer across North Africa.
              </p>
              <p>
                Through HIKMA AI, I promote a vision inspired by the intellectual traditions of Timbuktu, Kairouan, Baghdad, and the timeless wisdom of Mawlānā Jalāl al-Dīn Rūmī, reminding us that intelligence without compassion is incomplete.
              </p>
              <blockquote className="italic border-l-2 border-brand-pink pl-6 py-2 my-6 text-xl font-serif text-foreground/90">
                &quot;Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.&quot; 
                <footer className="text-sm font-sans mt-2 text-foreground/60">— Rūmī</footer>
              </blockquote>
              <p>
                I believe that the next generation of AI will not be defined solely by larger models or greater computational power, but by our ability to embed wisdom, empathy, cultural diversity, and human dignity into the systems we create.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[3/4] lg:aspect-[4/5] rounded-xl overflow-hidden order-1 md:order-2 shadow-2xl"
          >
            <Image
              src="/images/vision.jpg"
              alt="Vision"
              fill
              className="object-cover"
            />
          </motion.div>
        </div>

        {/* Bottom Section: Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-[3/4] lg:aspect-[4/5] rounded-xl overflow-hidden shadow-2xl"
          >
            <Image
              src="/images/From Storytelling and Poetry to AI Systems.jpg"
              alt="Maha Jouini"
              fill
              className="object-cover object-[5%_10%]"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            <div className="w-16 h-px bg-foreground mb-8"></div>
            <h2 className="text-4xl md:text-5xl text-foreground font-serif mb-6">
              My purpose
            </h2>
            <div className="space-y-6 text-foreground/80 font-sans text-lg">
              <p>
                Maha Jouini is a Tunisian AI thought leader, researcher, and
                Pan-African advocate working at the intersection of artificial
                intelligence, ethics, public policy, and human development. My
                work is dedicated to ensuring that AI serves people, strengthens
                institutions, and advances social justice across Africa and the
                Global South.
              </p>
              <p className="font-semibold text-foreground text-xl leading-relaxed py-4">
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
        </div>
      </div>
    </section>
  );
}
