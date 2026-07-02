"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center pt-24 pb-16 overflow-hidden bg-background">
      {/* Futuristic Background Elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
      <div className="absolute top-20 left-10 w-[400px] h-[400px] bg-accent/20 blur-[120px] rounded-full mix-blend-multiply pointer-events-none" />
      <div className="absolute bottom-10 right-20 w-[500px] h-[500px] bg-secondary/80 blur-[150px] rounded-full mix-blend-multiply pointer-events-none" />
      
      <div className="container mx-auto px-6 md:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-start gap-8 max-w-2xl"
        >
          {/* Futuristic Status Badge */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-md"
          >
            <Sparkles className="w-4 h-4 text-accent" />
            <span className="text-xs uppercase tracking-widest font-semibold text-foreground/80">
              Shaping the Future of AI
            </span>
          </motion.div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[5rem] text-foreground leading-[1.05] font-medium tracking-tight">
            I’m <span className="bg-clip-text text-transparent bg-gradient-to-br from-foreground via-foreground/80 to-accent">Maha</span>—an AI thought leader & founder.
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mt-2 max-w-lg">
            I believe technology must be guided by wisdom and human resilience.
            I work at the intersection of artificial intelligence, ethics,
            public policy, and social justice.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="#about"
              className="group flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground text-sm uppercase tracking-widest font-semibold hover:bg-primary/90 hover:-translate-y-1 hover:shadow-[0_10px_40px_-10px_rgba(0,0,0,0.3)] transition-all duration-300 rounded-full"
            >
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <a
              href="#contact"
              className="px-8 py-4 bg-transparent text-foreground border border-border/50 text-sm uppercase tracking-widest font-semibold hover:border-foreground hover:-translate-y-1 transition-all duration-300 rounded-full backdrop-blur-sm"
            >
              Get in Touch
            </a>
          </div>
        </motion.div>

        {/* Futuristic Image Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
          className="relative w-full aspect-[4/5] md:aspect-square lg:aspect-[3/4] max-w-lg mx-auto lg:max-w-none lg:mx-0 group"
        >
          {/* Cyber/Neon glow behind the image */}
          <div className="absolute inset-0 bg-gradient-to-tr from-accent/30 to-transparent blur-3xl translate-x-4 translate-y-4 -z-10 rounded-full transition-transform duration-700 group-hover:translate-x-8 group-hover:translate-y-8" />
          
          <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/20 ring-1 ring-white/10 group-hover:ring-accent/30 transition-all duration-500 bg-background/5 backdrop-blur-xl p-2">
            <div className="relative w-full h-full rounded-[2rem] overflow-hidden">
              <Image
                src="/images/hero.webp"
                alt="Maha Jouini"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
