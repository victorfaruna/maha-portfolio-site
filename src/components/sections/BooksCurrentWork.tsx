import React from "react";

export const BooksCurrentWork = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
      <div className="md:col-span-4">
        <h2 className="text-3xl md:text-4xl font-serif text-brand-navy">
          What I'm working on now
        </h2>
      </div>
      <div className="md:col-span-8 flex flex-col gap-6 text-[#2D3748] text-lg leading-relaxed">
        <p>
          Currently, my focus is dedicated to the intersection of Pan-African
          philosophy and artificial intelligence. I am writing my next major
          work exploring how African knowledge systems can guide global AI
          governance.
        </p>
        <p>
          I am also actively building out CHIFAA, expanding its reach to empower
          more women across North Africa with AI-driven health support in their
          native dialects.
        </p>
        <p>
          Through my research at the Global Center on AI Governance and as a
          Stanford Fellow, I am advocating for digital sovereignty and ensuring
          that the African continent moves from being just a consumer of
          technology to an architect of its future.
        </p>
      </div>
    </div>
  </section>
);
