import React from "react";

export const BooksRetailers = () => (
  <section className="py-12 bg-white border-b border-gray-100">
    <div className="container mx-auto px-6 max-w-6xl flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
      {/* Logos placeholders */}
      <h3 className="font-bold text-2xl tracking-tighter">amazon</h3>
      <h3 className="font-bold text-xl text-orange-500">audible</h3>
      <h3 className="font-bold text-xl text-green-700">BARNES & NOBLE</h3>
      <h3 className="font-black text-3xl text-blue-800 tracking-tighter">
        BAM!
      </h3>
      <h3 className="font-medium text-lg">IndieBound</h3>
    </div>
  </section>
);
