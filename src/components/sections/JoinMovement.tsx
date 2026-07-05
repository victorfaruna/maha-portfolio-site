"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function JoinMovement() {
  const cards = [
    {
      title: "Discover CHIFAA",
      image: "/images/event.webp",
      link: "#chifaa",
    },
    {
      title: "Explore HIKMA AI",
      image: "/images/hero.webp",
      link: "#hikma",
    },
    {
      title: "Read My Research",
      image: "/images/about.webp",
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
            <h2 className="text-5xl md:text-6xl text-foreground font-serif leading-tight">
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
                className="flex flex-col gap-6"
              >
                <div className="relative aspect-[4/3] rounded-tr-[5rem] overflow-hidden group">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  {/* Subtle dark gradient for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  
                  <h3 className="absolute bottom-6 left-6 right-6 text-white text-3xl md:text-4xl font-bold font-sans">
                    {card.title}
                  </h3>
                </div>
                
                <a 
                  href={card.link}
                  className="bg-[#FDE047] hover:bg-[#FACC15] text-white font-bold py-3 px-8 w-max transition-colors inline-block"
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
