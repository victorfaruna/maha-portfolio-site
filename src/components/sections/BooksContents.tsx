import React from "react";

const contentsData = [
  {
    part: "Part 1",
    title: "Empathy Is Your Superpower",
    desc: "Discover how our brains are wired for connection.",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=600",
  },
  {
    part: "Part 2",
    title: "The Empathy Deficit",
    desc: "Why we are struggling to connect in a hyper-connected world.",
    img: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=600",
  },
  {
    part: "Part 3",
    title: "The Ego Trap",
    desc: "How to overcome barriers to understanding others.",
    img: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=600",
  },
  {
    part: "Part 4",
    title: "Radical Empathy",
    desc: "Extending compassion beyond our inner circles.",
    img: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=600",
  },
  {
    part: "Part 5",
    title: "Empathy in the Workplace",
    desc: "Building thriving organizational cultures.",
    img: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=600",
  },
  {
    part: "Part 6",
    title: "Empathic Leadership",
    desc: "Leading with both head and heart.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=600",
  },
  {
    part: "Part 7",
    title: "The Power of Story",
    desc: "Using narrative to bridge human divides.",
    img: "https://images.unsplash.com/photo-1455390582262-044cdead27d8?q=80&w=600",
  },
  {
    part: "Part 8",
    title: "Communities of Care",
    desc: "Redesigning social systems for mutual support.",
    img: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600",
  },
  {
    part: "Part 9",
    title: "Empathy & Technology",
    desc: "Ensuring AI serves our shared humanity.",
    img: "https://images.unsplash.com/photo-1531297172867-1724cc69317d?q=80&w=600",
  },
  {
    part: "Part 10",
    title: "Purposeful Empathy in Action",
    desc: "Your roadmap to creating meaningful change.",
    img: "https://images.unsplash.com/photo-1460518451285-97b6aa326961?q=80&w=600",
  },
];

export const BooksContents = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 md:px-12 max-w-7xl">
      <div className="flex flex-col items-center justify-center mb-16">
        <div className="w-16 h-px bg-brand-navy mb-4"></div>
        <h2 className="text-4xl md:text-5xl font-serif text-brand-navy">
          Contents
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {contentsData.map((item, idx) => (
          <div key={idx} className="flex flex-col gap-4 group">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
              <img
                src={item.img}
                alt={item.title}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex flex-col items-start gap-2">
              <span className="px-3 py-1 bg-gray-100 text-xs font-semibold text-brand-navy rounded-full uppercase tracking-wide">
                {item.part}
              </span>
              <h4 className="font-bold text-brand-navy text-lg leading-tight">
                {item.title}
              </h4>
              <p className="text-sm text-gray-600">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);
