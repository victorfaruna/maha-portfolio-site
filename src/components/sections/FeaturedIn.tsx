"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export function FeaturedIn() {
  const partners = [
    { name: "UNESCO", logo: "/images/unesco.png", containerClassName: "h-20 w-24 md:h-28 md:w-32" },
    { name: "African Union", logo: "/images/africanunion.jfif", containerClassName: "h-20 w-32 md:h-28 md:w-44" },
    { name: "Stanford", logo: "/images/scanford.png", containerClassName: "h-20 w-32 md:h-28 md:w-44" },
    { name: "Microsoft", logo: "/images/microsoft.avif", containerClassName: "h-14 w-40 md:h-20 md:w-56", className: "mix-blend-multiply" },
    { name: "AUDA-NEPAD", logo: "/images/auda-nepad.png", containerClassName: "h-20 w-36 md:h-28 md:w-48" },
    { name: "World Economic Forum", logo: "/images/wef.png", containerClassName: "h-20 w-32 md:h-28 md:w-44" },
  ];

  return (
    <section className="py-12 bg-secondary/30 border-y border-border/40">
      <div className="w-full px-0">
        <p className="text-center text-xs font-sans text-foreground/60 mb-8 tracking-wide font-medium">
          Trusted By
        </p>
        
        <div className="flex items-center justify-between gap-4 overflow-x-auto w-full px-16 md:px-24 py-2" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {partners.map((partner, idx) => (
            <div
              key={`${partner.name}-${idx}`}
              className={`relative flex-shrink-0 flex items-center justify-center transition-transform duration-300 hover:-translate-y-1 ${partner.containerClassName || "h-10 w-24 md:h-16 md:w-36"}`}
            >
              <Image 
                src={partner.logo} 
                alt={`${partner.name} logo`}
                fill
                className={`object-contain mix-blend-multiply ${partner.className || ""}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
