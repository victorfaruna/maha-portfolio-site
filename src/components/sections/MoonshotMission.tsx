import React from "react";

export function MoonshotMission() {
  return (
    <section className="relative w-full py-24 md:py-32 bg-black flex items-center justify-center overflow-hidden">
      {/* Background moonshot video */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <video
          src="https://res.cloudinary.com/dwwyegu5r/video/upload/moonshot_oufdqz.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="object-cover w-full h-full opacity-80"
        />
        {/* Subtle overlay to ensure text is readable */}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Text overlay */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h2 className="font-script text-white text-3xl md:text-5xl leading-tight max-w-4xl mx-auto drop-shadow-md">
          Lived experience is not a footnote to expertise—it is expertise.
          <br className="hidden md:block" /> It transforms knowledge into wisdom, and innovation into impact.
        </h2>
      </div>
    </section>
  );
}
