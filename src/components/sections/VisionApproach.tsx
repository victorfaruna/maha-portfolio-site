"use client";

import { motion } from "framer-motion";

export function VisionApproach() {
  return (
    <section id="vision-approach" className="py-20 bg-background border-t border-border/40">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-stretch">
          {/* Left Column: Approach Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1.5 h-8 bg-brand-cyan rounded-full" />
              <h2 className="text-3xl md:text-4xl text-brand-navy font-serif font-semibold">
                The Approach
              </h2>
            </div>
            <div className="space-y-5 text-foreground/80 font-sans text-lg md:text-[19px] leading-relaxed">
              <p>
                My approach is to treat artificial intelligence not merely as an engineering challenge, but as a deeply human and cultural one.
              </p>
              <p>
                I combine <strong>technology, philosophy, public health, and policy</strong> to build AI systems that are trustworthy, compassionate, and rooted in community wisdom.
              </p>
              <p>
                Through <strong>HIKMA AI</strong> and <strong>CHIFAA</strong>, I draw inspiration from timeless civilizational knowledge from Timbuktu to Baghdad to ensure the next generation of AI is defined by empathy, multilingual accessibility, and ethical design.
              </p>
              <p className="italic pt-2 text-foreground/75">
                As Rūmī wrote:
              </p>
              <blockquote className="border-l-3 border-brand-navy pl-5 italic text-lg text-brand-navy font-serif py-1 my-2">
                &quot;Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.&quot;
              </blockquote>
              <p>
                I believe that the next generation of AI will not be defined solely by larger models or greater computational power, but by our ability to embed <strong>wisdom, empathy, cultural diversity, and human dignity</strong> into the systems we create.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="w-full h-full flex flex-col"
          >
            <div className="relative w-full h-full min-h-[480px] rounded-2xl overflow-hidden shadow-2xl bg-black border border-border/40">
              <img
                src="/images/mahaholdingbook.jpeg"
                alt="Maha Jouini holding book"
                className="w-full h-full object-cover"
                style={{ objectPosition: "50% 0%" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
