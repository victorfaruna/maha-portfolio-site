"use client";

import { motion } from "framer-motion";

export function IntroText() {
  return (
    <section className="relative pt-6 md:pt-16 pb-6 px-6 bg-background overflow-hidden">
      <div className="container mx-auto max-w-[1400px] relative z-10 px-4 md:px-12">
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="text-foreground/80 text-xl md:text-2xl lg:text-3xl font-light leading-relaxed tracking-wide text-center font-sans"
        >
          I&apos;m{" "}
          <span className="text-brand-navy font-semibold font-sans">Maha Jouini</span>{" "}
          an AI governance expert, AI solutions developer, speaker, podcaster,
          cancer survivor, and founder of{" "}
          <a
            href="https://hikmaai.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-navy underline underline-offset-4 hover:text-brand-navy focus-visible:text-brand-navy"
          >
            HIKMA AI
          </a>{" "}
          and{" "}
          <a
            href="https://www.chifaa.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-brand-navy underline underline-offset-4 hover:text-brand-navy focus-visible:text-brand-navy"
          >
            CHIFAA
          </a>. I build
          responsible, human-centered AI that bridges technology, health,
          ethics, and culture, amplifying the voices of Africa, the Arab world,
          and the Global South to shape a wiser and more inclusive future.
        </motion.p>
      </div>
    </section>
  );
}
