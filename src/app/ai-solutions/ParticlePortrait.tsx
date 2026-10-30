"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import ParticleImage from "@/components/ui/ParticleImage";
import styles from "./ai-solutions.module.css";

// Match the contained static image exactly; only the particles react to input.
const imageConfig = { image: "/images/aiimage.png", mode: "fit", scale: 10 };
const hoverConfig = {
  hoverType: "roam",
  transition: { duration: 0.8, ease: "easeInOut" },
  roamWidth: 0,
  roamHeight: 0,
  roamShape: "rectangle",
  roamOpacity: 1,
  hideType: "scatter",
};
const mobileRepulsionConfig = { repulsionMode: "outside", repulsionForce: 18, repulsionRadius: 44, entryImpulse: 60 };
const desktopRepulsionConfig = { ...mobileRepulsionConfig, repulsionRadius: 56 };
const desktopPointerQuery = "(min-width: 1024px) and (hover: hover) and (pointer: fine)";

function subscribeToDesktopPointer(onChange: () => void) {
  const query = window.matchMedia(desktopPointerQuery);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}
function getDesktopPointer() {
  return window.matchMedia(desktopPointerQuery).matches;
}
function getServerDesktopPointer() {
  return false;
}

export function ParticlePortrait({ reduceMotion }: { reduceMotion: boolean }) {
  const isDesktopPointer = useSyncExternalStore(subscribeToDesktopPointer, getDesktopPointer, getServerDesktopPointer);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isDocumentVisible, setIsDocumentVisible] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || typeof window.ResizeObserver !== "function") return;

    function updateDocumentVisibility() {
      setIsDocumentVisible(!document.hidden);
      if (document.hidden) setIsHovered(false);
    }
    updateDocumentVisibility();
    document.addEventListener("visibilitychange", updateDocumentVisibility);

    const observer = typeof window.IntersectionObserver === "function"
      ? new IntersectionObserver(([entry]) => {
          setIsVisible(entry.isIntersecting);
          if (!entry.isIntersecting) setIsHovered(false);
        })
      : null;
    if (observer) observer.observe(container);
    else setIsVisible(true);

    return () => {
      observer?.disconnect();
      document.removeEventListener("visibilitychange", updateDocumentVisibility);
    };
  }, []);

  const canAnimate = !reduceMotion && isVisible && isDocumentVisible;
  const isActive = canAnimate && isHovered && isReady;

  return (
    <div
      ref={containerRef}
      className={`${styles.particleFrame} absolute inset-3 sm:inset-6`}
      data-particle-portrait
      data-particle-active={isActive}
      data-particle-ready={canAnimate && isReady}
      onContextMenu={event => event.preventDefault()}
      onDragStart={event => event.preventDefault()}
      onPointerEnter={event => {
        if (event.pointerType !== "touch") setIsHovered(true);
      }}
      onPointerLeave={() => setIsHovered(false)}
      onTouchStart={() => setIsHovered(true)}
      onTouchEnd={() => setIsHovered(false)}
      onTouchCancel={() => setIsHovered(false)}
    >
      <Image
        src="/images/aiimage.png"
        alt="A woman's profile illustrated as an interconnected digital network"
        fill
        sizes="(min-width: 1440px) 560px, (min-width: 1024px) 42vw, 90vw"
        className={`${styles.particleImage} object-contain`}
        draggable={false}
        preload
      />
      {canAnimate && (
        <ParticleImage
          className={styles.particleCanvas}
          aria-hidden="true"
          imageConfig={imageConfig}
          particleCount={100}
          particleSize={8}
          hoverConfig={hoverConfig}
          repulsionConfig={isDesktopPointer ? desktopRepulsionConfig : mobileRepulsionConfig}
          ignoreWhite
          animate={isHovered}
          onReady={setIsReady}
        />
      )}
    </div>
  );
}
