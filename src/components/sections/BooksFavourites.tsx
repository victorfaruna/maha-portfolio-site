import React from "react";

export const BooksFavourites = () => (
  <section className="py-24 bg-[#5c7b89]">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl text-center">
      <h2 className="text-3xl md:text-4xl font-serif text-white mb-16">
        Some of my all time favourite books
      </h2>
      <div className="flex flex-wrap justify-center gap-6">
        {[1, 2, 3, 4, 5].map((_, idx) => (
          <div
            key={idx}
            className="relative w-32 h-48 md:w-40 md:h-60 shadow-xl hover:-translate-y-2 transition-transform duration-300"
          >
            <img
              src={`https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400&auto=format&fit=crop&sig=${idx}`}
              alt="Favourite book cover"
              className="absolute inset-0 w-full h-full object-cover rounded-sm"
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);
