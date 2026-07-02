"use client";

import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Network, Sparkles } from "lucide-react";

export function Initiatives() {
  const initiatives = [
    {
      title: "CHIFAA",
      desc: "A survivor-led initiative developing responsible AI solutions for women affected by breast and cervical cancer across North Africa.",
      icon: Sparkles,
    },
    {
      title: "HIKMA AI",
      desc: "An organization focused on building ethical, Pan-African AI frameworks that respect digital sovereignty.",
      icon: Network,
    },
  ];

  return (
    <section id="initiatives" className="py-32 bg-background relative overflow-hidden">
      {/* Decorative background blurs */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-accent/5 blur-[150px] rounded-full translate-x-1/3 -translate-y-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-foreground/5 blur-[120px] rounded-full -translate-x-1/3 translate-y-1/3 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-5xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <span className="text-sm uppercase tracking-widest text-muted-foreground font-semibold mb-4 block">
            Core Initiatives
          </span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-foreground mb-6 font-medium tracking-tight">
            What is <span className="bg-clip-text text-transparent bg-gradient-to-r from-foreground to-accent">ethical AI?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-sans max-w-2xl mx-auto">
            Ethical AI means technology that supports dignity, inclusion, and equitable outcomes.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {initiatives.map((init, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.2 }}
              className="h-full group"
            >
              <Card className="h-full flex flex-col justify-center text-center p-6 lg:p-10 bg-secondary/20 backdrop-blur-xl border border-white/10 hover:border-accent/40 shadow-xl hover:shadow-[0_0_40px_-15px_rgba(255,0,0,0.2)] transition-all duration-500 overflow-hidden relative">
                {/* Subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                
                <CardHeader className="relative z-10 flex flex-col items-center">
                  <div className="w-16 h-16 rounded-2xl bg-background border border-white/10 shadow-inner flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500">
                    <init.icon className="w-8 h-8 text-foreground group-hover:text-accent transition-colors duration-300" />
                  </div>
                  <CardTitle className="text-3xl mb-4 font-serif text-foreground group-hover:text-accent transition-colors duration-300">
                    {init.title}
                  </CardTitle>
                  <CardDescription className="text-lg leading-relaxed text-foreground/80 font-sans">
                    {init.desc}
                  </CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
