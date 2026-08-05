"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function JoinMovement() {
  const cards = [
    {
      title: "Discover CHIFAA",
      image: "/images/chifaa.jpeg",
      link: "#chifaa",
      contain: true,
    },
    {
      title: "Explore HIKMA AI",
      image: "/images/hikmaa.png",
      link: "#hikma",
      contain: true,
    },
    {
      title: "Read My Research",
      image: "/images/research.jpg",
      link: "#research",
    },
    {
      title: "Book Me to Speak",
      image: "/images/event.webp",
      link: "#speak",
    },
  ];

  return (
    <section id="join" className="py-24 bg-background">
      <div className="container mx-auto px-6 md:px-12 max-w-8xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24 items-start">
          {/* Left Column: Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-4"
          >
            <div className="w-16 h-px bg-foreground/20 mb-8"></div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground font-serif leading-tight">
              Join the movement
            </h2>
          </motion.div>

          {/* Right Column: Cards Grid */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            {cards.map((card, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: idx * 0.1 }}
                className="flex flex-col gap-5"
              >
                <div className="relative aspect-[18/10] rounded-tr-[4rem] overflow-hidden group bg-white border border-border/40 shadow-sm">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className={`transition-transform duration-700 group-hover:scale-105 ${card.contain ? "object-contain p-6 pb-10" : "object-cover"}`}
                  />
                  {/* Subtle soft gradient only at the base */}
                  <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 via-black/15 to-transparent pointer-events-none" />

                  <h3 className="absolute bottom-4 left-5 right-5 text-white text-xl sm:text-2xl font-bold font-sans drop-shadow">
                    {card.title}
                  </h3>
                </div>

                <a
                  href={card.link}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-2.5 px-6 w-max transition-colors inline-block text-sm"
                >
                  Learn more
                </a>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
