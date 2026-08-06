"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_ID = "gcnLfZ4VI74";
const PLAYER_ELEMENT_ID = "hero-yt-player";
// Show YouTube's own thumbnail instantly — no black flash
const THUMBNAIL_URL = `https://img.youtube.com/vi/${VIDEO_ID}/maxresdefault.jpg`;

export function Hero() {
  const playerRef = useRef<any>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const initPlayer = () => {
      if (playerRef.current) return; // Avoid double-init
      playerRef.current = new window.YT.Player(PLAYER_ELEMENT_ID, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          mute: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          showinfo: 0,
          rel: 0,
          modestbranding: 1,
          iv_load_policy: 3,
          cc_load_policy: 0,
          cc_lang_pref: 0,
          start: 30,
          playsinline: 1,
          vq: "hd1080",
        } as any,
        events: {
          onReady: (event: any) => {
            event.target.mute();
            event.target.setPlaybackQuality("hd1080");
            const disableCaptions = (player: any) => {
              try { player.unloadModule("captions"); } catch (_) {}
              try { player.unloadModule("cc"); } catch (_) {}
              try { player.setOption("captions", "track", {}); } catch (_) {}
            };
            disableCaptions(event.target);
            setTimeout(() => disableCaptions(event.target), 1000);
            setTimeout(() => disableCaptions(event.target), 3000);
            event.target.playVideo();
          },
          onStateChange: (event: any) => {
            // Fade out thumbnail the moment video is actually playing
            if (event.data === window.YT.PlayerState.PLAYING) {
              setVideoPlaying(true);
            }
            // Loop from start=30 when video ends
            if (event.data === window.YT.PlayerState.ENDED) {
              event.target.seekTo(30);
              event.target.playVideo();
            }
          },
        },
      });
    };

    // If the API was already loaded by layout.tsx <script> tag, use it immediately
    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      const previousCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof previousCallback === "function") previousCallback();
        initPlayer();
      };
      // Fallback: inject script if layout.tsx script hasn't fired yet
      if (!document.getElementById("yt-iframe-api-script")) {
        const script = document.createElement("script");
        script.id = "yt-iframe-api-script";
        script.src = "https://www.youtube.com/iframe_api";
        document.head.appendChild(script);
      }
    }

    return () => {
      if (playerRef.current) {
        try { playerRef.current.destroy(); } catch (_) {}
        playerRef.current = null;
      }
    };
  }, []);

  return (
    <section className="relative min-h-[65vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Background Video */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* YouTube IFrame API replaces this div */}
        <div
          id={PLAYER_ELEMENT_ID}
          className="absolute top-1/2 left-1/2 w-[100vw] h-[56.25vw] min-h-[100vh] min-w-[177.77vh] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        />

        {/* Thumbnail overlay — visible immediately, fades out when video plays */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000"
          style={{
            backgroundImage: `url(${THUMBNAIL_URL})`,
            opacity: videoPlaying ? 0 : 1,
            pointerEvents: "none",
          }}
        />

        {/* Overlay for text readability */}
        <div className="absolute inset-0 bg-black/30" />
      </div>

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
