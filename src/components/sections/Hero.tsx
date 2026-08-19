"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <section className="relative min-h-[65vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <video
          ref={videoRef}
          src="https://cdn.chainroll.org/maha/YTDown.com_YouTube_Maha-Jouini_Media_HT9GQdHrycg_001_1080p.mp4#t=26"
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Mute / Unmute Manual Toggle Button */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video audio" : "Mute video audio"}
        className="absolute bottom-6 right-6 z-20 flex items-center gap-2 px-4 py-2.5 rounded-full bg-black/60 hover:bg-black/90 backdrop-blur-md border border-white/20 text-white transition-all duration-300 hover:scale-105 shadow-xl cursor-pointer group"
      >
        {isMuted ? (
          <>
            <VolumeX className="w-4 h-4 text-white/80 group-hover:text-white" />
            <span className="text-xs font-sans tracking-wide text-white/90">
              Enable Sound
            </span>
          </>
        ) : (
          <>
            <Volume2 className="w-4 h-4 text-brand-pink group-hover:text-white" />
            <span className="text-xs font-sans tracking-wide text-white">
              Mute Sound
            </span>
          </>
        )}
      </button>

      {/* Text Overlay */}
      <div className="container mx-auto px-6 relative z-10 flex flex-col items-center justify-center text-center mt-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* Line 1: serif text */}
          <h1
            className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl text-white font-serif tracking-tight leading-none"
            style={{ textShadow: "0px 4px 12px rgba(0,0,0,0.4)" }}
          >
            Inclusive AI Is
          </h1>

          {/* Line 2: script image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
          >
            <img
              src="/images/possible.svg"
              alt="Possible"
              className="h-20 md:h-36 w-auto -mt-4 md:-mt-8 mx-auto"
              style={{ filter: "drop-shadow(2px 4px 6px rgba(0,0,0,0.5))" }}
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
