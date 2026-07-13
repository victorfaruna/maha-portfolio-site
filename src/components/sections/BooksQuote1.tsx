import React from "react";

export const BooksQuote1 = () => (
  <section className="relative w-full py-32 bg-brand-navy overflow-hidden">
    <img
      src="https://images.unsplash.com/photo-1495562569060-2eec283d3391?q=80&w=2000"
      alt="Ocean waves"
      className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
    />
    <div className="relative z-10 container mx-auto px-6 text-center max-w-4xl">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-white leading-relaxed">
        "Purposeful Empathy will swing you from cynicism to hope, from
        helplessness to effectiveness, and from apathy to action."
      </h2>
      <p className="mt-8 text-white/80 font-sans text-sm uppercase tracking-widest">
        - Maha Jouini, Purposeful Empathy
      </p>
    </div>
  </section>
);
