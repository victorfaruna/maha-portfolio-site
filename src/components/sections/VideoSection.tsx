"use client";

import { useRef, useState, useEffect } from "react";
import { useInView, motion } from "framer-motion";

// Extend the Window type to include the YouTube IFrame API globals
declare global {
  interface Window {
    YT: typeof YT;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_ID = "wYy9CqunS8g";
const PLAYER_ELEMENT_ID = "yt-bg-player";

export function VideoSection() {
  const ref = useRef(null);
  const playerRef = useRef<YT.Player | null>(null);
  // Trigger when the video section is partially in view
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [shouldPlay, setShouldPlay] = useState(false);

  useEffect(() => {
    if (isInView) {
      setShouldPlay(true);
    }
  }, [isInView]);

  // Load the YouTube IFrame API script once the section is in view
  useEffect(() => {
    if (!shouldPlay) return;

    const initPlayer = () => {
      playerRef.current = new window.YT.Player(PLAYER_ELEMENT_ID, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          controls: 0,
          rel: 0,
          modestbranding: 1,
          cc_load_policy: 0,
          start: 30,
          // Disable annotations and info cards as well
          iv_load_policy: 3,
        } as YT.PlayerVars,
        events: {
          onReady: (event: YT.PlayerEvent) => {
            // Ensure the player is muted via the API as well
            event.target.mute();
            // Unload the captions/subtitles module
            event.target.unloadModule("captions");
            event.target.playVideo();
          },
        },
      });
    };

    // If the API is already ready, initialise immediately; otherwise set the
    // global callback that the script calls when it finishes loading.
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      // Preserve any existing callback registered by other components
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") previousCallback();
        initPlayer();
      };

      // Only inject the script tag once
      if (!document.getElementById("yt-iframe-api-script")) {
        const script = document.createElement("script");
        script.id = "yt-iframe-api-script";
        script.src = "https://www.youtube.com/iframe_api";
        script.async = true;
        document.body.appendChild(script);
      }
    }

    return () => {
      // Clean up the player instance on unmount
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [shouldPlay]);

  return (
    <section className="relative pt-10 pb-24 bg-background">
      {/* Decorative background elements */}
      <div className="absolute inset-0 bg-[url('/images/texture-dots.png')] opacity-10 mix-blend-overlay"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-brand-cyan/20 rounded-full blur-[100px]"></div>
      <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-brand-pink/20 rounded-full blur-[100px]"></div>
      
      <div className="container relative z-10 mx-auto px-6 md:px-12 max-w-7xl">
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl text-foreground font-serif mb-6"
          >
            Insights &amp; Perspectives
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-foreground/80 font-sans text-lg md:text-xl max-w-2xl mx-auto"
          >
            A deep dive into the intersection of ethical AI, human dignity, and the future of the Global South.
          </motion.p>
        </div>

        <motion.div 
          ref={ref}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full aspect-video overflow-hidden shadow-2xl bg-black border border-border"
        >
          {shouldPlay ? (
            /* The YouTube IFrame API replaces this div with the player iframe */
            <div
              id={PLAYER_ELEMENT_ID}
              className="absolute inset-0 w-full h-full"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-900">
              <div className="w-12 h-12 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mb-4"></div>
              <span className="text-white/60 font-sans text-sm animate-pulse">Loading video...</span>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
