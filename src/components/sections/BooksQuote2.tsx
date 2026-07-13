import React from "react";

export const BooksQuote2 = () => (
  <section className="relative w-full py-32 bg-black overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2000"
      alt="Library books"
      className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-luminosity"
    />
    <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-relaxed">
        "If you want to contribute to a better, brighter future, Purposeful
        Empathy is required reading."
      </h2>
    </div>
  </section>
);
