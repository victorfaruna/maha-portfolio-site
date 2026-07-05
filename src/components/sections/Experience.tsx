"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function Experience() {
  const experiences = [
    {
      title: "Vice President",
      org: "AFRIA (Agence Francophone et Africaine de l'Intelligence Artificielle)",
      desc: "Promoting francophone African representation in AI.",
      year: "Present",
    },
    {
      title: "Senior AI Consultant",
      org: "African Union Development Agency (AUDA-NEPAD)",
      desc: "Developing the African Union AI White Paper & Continental Strategy.",
      year: "2023 - Present",
    },
    {
      title: "Fellow",
      org: "Stanford University - Center for Democratic Development",
      desc: "Researching the intersection of technology, democracy, and African policy.",
      year: "2022 - 2023",
    },
  ];

  return (
    <section className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-accent/10 blur-[150px] rounded-full -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-secondary/50 blur-[150px] rounded-full translate-x-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
          {/* Sticky Header Column */}
          <div className="lg:col-span-4 relative">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="sticky top-32"
            >
              <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-4 block flex items-center gap-2">
                <div className="w-8 h-[2px] bg-accent" /> Career Timeline
              </span>
              <h2 className="text-5xl md:text-6xl text-foreground font-medium tracking-tight leading-[1.1] mb-6">
                Professional <br />
                <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/80 to-accent">
                  Journey
                </span>
              </h2>
              <p className="text-lg text-muted-foreground">
                A timeline of my dedication to advancing AI policy and
                representation globally.
              </p>
            </motion.div>
          </div>

          {/* Timeline Column */}
          <div className="lg:col-span-8 relative">
            {/* The vertical track line */}
            <div className="absolute left-[15px] md:left-[39px] top-8 bottom-8 w-[2px] bg-gradient-to-b from-accent/50 via-border to-transparent hidden sm:block" />

            <div className="space-y-12">
              {experiences.map((exp, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative sm:pl-24 group"
                >
                  {/* Glowing Node */}
                  <div className="absolute left-[-5px] md:left-[31px] top-8 w-4 h-4 rounded-full bg-background border-2 border-accent shadow-[0_0_15px_rgba(255,0,0,0.5)]g hidden sm:block transition-transform duration-500 group-hover:scale-150" />

                  <div className="relative overflow-hidden cursor-pointer rounded-smbackdrop-blur-md border border-black/10 p-8 transition-all duration-500 hover:-translate-y-2">
                    {/* Hover Glow */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                      <div className="md:w-1/3">
                        <span className="inline-block px-4 py-1.5 rounded-md bg-accent/10 text-accent text-xs  font-bold uppercase tracking-widest mb-4">
                          {exp.year}
                        </span>
                        <h3 className="text-2xl font-serif text-foreground  transition-colors duration-300">
                          {exp.title}
                        </h3>
                      </div>
                      <div className="md:w-2/3">
                        <h4 className="text-xl font-sans text-foreground/90 mb-3 font-medium leading-snug">
                          {exp.org}
                        </h4>
                        <p className="text-muted-foreground font-sans text-lg leading-relaxed">
                          {exp.desc}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Event Image embedded in the timeline stream */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative sm:pl-24 mt-16 group"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent/20 to-transparent blur-3xl translate-x-4 translate-y-4 -z-10 rounded-full transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6" />

              <div className="relative w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden shadow-lg border border-white/20 ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500">
                <Image
                  src="/images/event.webp"
                  alt="Maha Jouini Speaking at Event"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
