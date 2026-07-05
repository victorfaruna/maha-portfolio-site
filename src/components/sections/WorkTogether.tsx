"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function WorkTogether() {
  const services = [
    {
      title: "Speaking with passion",
      image: "/images/event.webp",
      link: "#speaking",
    },
    {
      title: "Advising with integrity",
      image: "/images/about.webp",
      link: "#advising",
    },
  ];

  return (
    <section id="work-together" className="bg-background">
      {/* Top Banner */}
      <div className="relative w-full h-[400px] md:h-[500px] flex flex-col items-center justify-center text-center overflow-hidden">
        <Image
          src="/images/hero.webp"
          alt="Collaborate with Maha Jouini"
          fill
          className="object-cover object-[50%_30%]"
        />
        <div className="absolute inset-0 bg-black/50" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-serif mb-8 tracking-wide">
            Ready to reshape the future?
          </h2>
          <a
            href="#contact"
            className="inline-block border border-white text-white hover:bg-white hover:text-black transition-colors duration-300 py-3 px-8 text-lg font-sans"
          >
            Get in touch
          </a>
        </motion.div>
      </div>

      {/* Bottom Section: Services */}
      <div className="py-24">
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
                Let's work together
              </h2>
            </motion.div>
            
            {/* Right Column: Cards Grid */}
            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
              {services.map((service, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.8, delay: idx * 0.1 }}
                  className="flex flex-col gap-6"
                >
                  <div className="relative aspect-[16/10] rounded-tr-[5rem] overflow-hidden group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {/* Subtle dark gradient for text readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    <h3 className="absolute bottom-6 left-6 right-6 text-white text-3xl md:text-4xl font-bold font-sans">
                      {service.title}
                    </h3>
                  </div>
                  
                  <a 
                    href={service.link}
                    className="bg-[#FDE047] hover:bg-[#FACC15] text-white font-bold py-3 px-8 w-max transition-colors inline-block"
                  >
                    Learn more
                  </a>
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>
      </div>
    </section>
  );
}
