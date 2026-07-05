"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Purpose() {
  return (
    <section id="purpose" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-8xl">
        {/* Top Section: Vision */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="md:col-span-4"
          >
            <h2 className="text-4xl md:text-5xl text-foreground font-serif">
              What is my vision?
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:col-span-8 space-y-6 text-foreground/80 font-sans text-lg"
          >
            <p>
              My vision is to position Africa not merely as a participant in the
              AI revolution, but as a global architect of ethical, inclusive,
              and human-centered artificial intelligence—ensuring that the
              future of AI is shaped by African values, knowledge, and
              leadership.
            </p>
            <h3 className="text-foreground font-semibold pt-4">
              The approach?
            </h3>
            <p>
              Beyond policy, I am building a broader movement that connects
              technology with philosophy, culture, and empathy. Through HIKMA
              AI, I promote an African vision of artificial intelligence
              inspired by the intellectual legacies of Timbuktu and Baghdad.
            </p>
            <p>
              I aim to demonstrate that Africa's greatest contribution to AI is
              not only data or talent, but wisdom.
            </p>
          </motion.div>
        </div>

        {/* Bottom Section: Purpose */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="relative w-full aspect-4/3 rounded-sm overflow-hidden"
          >
            <Image
              src="/images/about.webp"
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
              <p className="font-semibold text-foreground">
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
