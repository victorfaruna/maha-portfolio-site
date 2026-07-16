import React from "react";

export function MoonshotMission() {
  return (
    <section className="relative w-full py-14 md:py-18 bg-[#0d2a3f] flex items-center justify-center overflow-hidden">
      {/* Background moon image, centered */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="relative w-[300px] h-[300px] md:w-[400px] md:h-[400px]">
          {/* We use an Unsplash moon image with mix-blend-screen to blend the black background of the image into our dark blue background */}
          <img
            src="https://images.unsplash.com/photo-1522030299830-16b8d3d049fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
            alt="Full Moon"
            className="object-contain w-full h-full mix-blend-screen opacity-90"
          />
        </div>
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
