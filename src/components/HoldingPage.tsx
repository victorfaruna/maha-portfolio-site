"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Globe, Heart, Mail } from "lucide-react";

export function HoldingPage() {
  return (
    <div className="min-h-screen bg-[#FDFCFB] text-[#1E293B] relative overflow-hidden flex flex-col justify-between selection:bg-[#E5A823]/20 selection:text-[#0B1F4D]">
      {/* Ambient background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Soft golden aura at top-center */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-[#E5A823]/15 via-[#F3C969]/10 to-transparent blur-3xl rounded-full" />
        {/* Soft cool-slate aura bottom right */}
        <div className="absolute bottom-[-10%] right-[-5%] w-[550px] h-[450px] bg-gradient-to-t from-[#0B1F4D]/5 via-[#0B1F4D]/2 to-transparent blur-3xl rounded-full" />
        
        {/* Micro-dot luxury matrix overlay */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage: `radial-gradient(#0B1F4D 1px, transparent 1px)`,
            backgroundSize: "28px 28px",
          }}
        />
      </div>

      {/* Header Bar */}
      <header className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 flex items-center justify-between border-b border-stone-200/60">
        <div className="flex items-center gap-3">
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-stone-200 shadow-xs bg-white">
            <Image
              src="/images/logo.png"
              alt="Maha Jouini"
              fill
              className="object-contain p-1"
              priority
            />
          </div>
          <div>
            <p className="font-serif text-base tracking-wide font-semibold text-[#0B1F4D]">
              Maha Jouini
            </p>
            <p className="text-[11px] uppercase tracking-widest text-stone-500 font-medium">
              Pan-African Thought Leader
            </p>
          </div>
        </div>


      </header>

      {/* Main Content Area */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto px-6 py-16 text-center">

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[#0B1F4D] leading-[1.12] mb-6"
        >
          Maha Jouini is cooking{" "}
          <span className="italic font-light text-[#D18F08] relative inline-block">
            something nice.
            <svg
              className="absolute -bottom-2 left-0 w-full text-[#E5A823]/30 h-2"
              viewBox="0 0 100 12"
              preserveAspectRatio="none"
            >
              <path
                d="M0,7 Q50,0 100,7"
                fill="transparent"
                stroke="currentColor"
                strokeWidth="4"
              />
            </svg>
          </span>
        </motion.h1>

        {/* Lead sentence */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base sm:text-xl text-stone-600 font-sans font-light leading-relaxed max-w-2xl mx-auto mb-12"
        >
          A newly reimagined digital experience at the intersection of{" "}
          <span className="text-[#0B1F4D] font-medium">Artificial Intelligence</span>,{" "}
          <span className="text-[#0B1F4D] font-medium">Ethics</span>, and{" "}
          <span className="text-[#0B1F4D] font-medium">Pan-African Leadership</span> is currently being prepared with care and vision.
        </motion.p>

        {/* Talk Africa NG Centerpiece Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.4 }}
          className="w-full max-w-xl bg-white/95 backdrop-blur-xl border border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xl shadow-[#0B1F4D]/5 relative overflow-hidden"
        >
          {/* Subtle gold accent corner ribbon */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#E5A823]/10 to-transparent rounded-bl-full pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            {/* Talk Africa NG Logo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden border-2 border-[#E5A823]/30 shadow-md shrink-0 bg-white">
              <Image
                src="/images/talkafricang-logo.jpg"
                alt="Talk Africa NG Logo"
                fill
                className="object-cover"
                priority
              />
            </div>

            {/* Talk Africa NG Text */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#9A6700] mb-1">
                <Globe className="w-3.5 h-3.5 text-[#D18F08]" />
                Talk Africa NG
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#0B1F4D] tracking-tight mb-1">
                Talkafricang
              </h2>

              <p className="font-serif italic text-lg sm:text-xl text-[#B37807] font-normal mb-3 flex items-center justify-center sm:justify-start gap-2">
                <Heart className="w-4 h-4 fill-[#D18F08] text-[#D18F08] inline" />
                For the love of Africa
              </p>

              <p className="text-xs sm:text-sm text-stone-500 font-sans leading-relaxed">
                Empowering continental voices, ethical AI discourse, and authentic African narratives on the global stage.
              </p>
            </div>
          </div>

          {/* Action pills inside card */}
          <div className="mt-6 pt-5 border-t border-stone-100 flex flex-wrap items-center justify-between gap-3 text-xs">
            <span className="text-stone-400 font-mono tracking-wider">
              EST. TALKAFRICANG
            </span>
            <div>
              <a
                href="mailto:talkafricang@gmail.com"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0B1F4D] hover:bg-[#1F5AA6] text-white transition-all duration-200 font-medium shadow-xs hover:shadow-md cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>talkafricang@gmail.com</span>
              </a>
            </div>
          </div>
        </motion.div>

        {/* Feature Tags / Pillars */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.55 }}
          className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mt-10 max-w-xl"
        >
          {[
            "✦ Responsible AI",
            "✦ African Sovereignty",
            "✦ Policy & Ethics",
            "✦ Storytelling & Books",
            "✦ Global Thought Leadership",
          ].map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3.5 py-1.5 rounded-full bg-white border border-stone-200/80 text-stone-600 shadow-2xs font-medium hover:border-[#E5A823]/40 transition-colors"
            >
              {tag}
            </span>
          ))}
        </motion.div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full max-w-6xl mx-auto px-6 py-8 border-t border-stone-200/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
        <div className="flex items-center gap-2">
          <span className="font-serif font-medium text-stone-700">
            Talkafricang
          </span>
          <span>&bull;</span>
          <span className="italic font-serif text-[#9A6700]">
            For the love of Africa
          </span>
        </div>

        <p className="text-center sm:text-right font-sans">
          &copy; {new Date().getFullYear()} Talk Africa NG &amp; Maha Jouini. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
