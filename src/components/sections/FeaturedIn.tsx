"use client";

import Image from "next/image";

const partners = [
  { name: "UNESCO", logo: "/images/unesco.png", containerClassName: "h-20 max-w-24 md:h-28 md:max-w-32" },
  { name: "African Union", logo: "/images/africanunion.jfif", containerClassName: "h-20 max-w-32 md:h-28 md:max-w-44" },
  { name: "Stanford", logo: "/images/scanford.png", containerClassName: "h-20 max-w-32 md:h-28 md:max-w-44" },
  { name: "Microsoft", logo: "/images/microsoft.avif", containerClassName: "h-14 max-w-40 md:h-20 md:max-w-56" },
];

export function FeaturedIn() {
  return (
    <section className="py-12 bg-secondary/30 border-y border-border/40">
      <p className="text-center text-xs font-sans text-foreground/60 mb-8 tracking-wide font-medium">
        Trusted By
      </p>

      <ul className="mx-auto grid w-full max-w-5xl grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 px-6 sm:grid-cols-4 md:gap-x-10">
        {partners.map((partner) => (
          <li
            key={partner.name}
            className={`relative w-full min-w-0 ${partner.containerClassName}`}
          >
            <Image
              src={partner.logo}
              alt={`${partner.name} logo`}
              fill
              sizes="(min-width: 1024px) 224px, (min-width: 640px) 22vw, 44vw"
              className="object-contain mix-blend-multiply"
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
