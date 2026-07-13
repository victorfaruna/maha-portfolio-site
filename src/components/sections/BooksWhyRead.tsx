import React from "react";

export const BooksWhyRead = () => (
  <section className="py-20 bg-white">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
      <div className="flex flex-col gap-8">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-navy">
          Why read Purposeful Empathy?
        </h2>
        <div className="relative aspect-square w-full max-w-md rounded-tr-[5rem] overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=800"
            alt="Author reading a book under a tree"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
      </div>
      <div className="flex flex-col gap-6 pt-2 text-[#2D3748] text-lg leading-relaxed">
        <h3 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">
          The good news
        </h3>
        <p>
          I wrote this book because it is possible to create a more just,
          healthy, and sustainable world. We just need to awaken and scale
          purposeful empathy.
        </p>
        <p>
          If you want to live a life of meaning and impact, this book will show
          you how. If you are a leader who wants to foster a thriving,
          innovative culture, this book is for you.
        </p>
        <p>
          Backed by science and inspiring stories, I reveal how empathy is not
          just a soft skill, but a hard-wired biological necessity and the
          ultimate catalyst for human evolution and organizational success.
        </p>
        <p>
          Through practical frameworks and actionable exercises, you'll discover
          how to leverage empathy to transform your personal life, your
          workplace, and our shared future. We are at a critical juncture in
          human history. The choice is ours: apathy or empathy.
        </p>
      </div>
    </div>
  </section>
);
