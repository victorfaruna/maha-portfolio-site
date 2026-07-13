"use client";

import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";

// Custom SVG Icons
const FacebookIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
const LinkedinIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);
const YoutubeIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
    <polygon
      points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
      fill="white"
    ></polygon>
  </svg>
);
const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const BooksHero = () => (
  <section className="relative w-full h-[60vh] md:h-[70vh] bg-black">
    <img
      src="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2000"
      alt="Purposeful Empathy Books"
      className="absolute inset-0 w-full h-full object-cover opacity-80"
    />
  </section>
);

const BooksIntro = () => (
  <section className="py-24 bg-white text-center">
    <div className="container mx-auto px-6 md:px-12 max-w-5xl">
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-brand-navy leading-tight md:leading-snug">
        Are you concerned about the direction the world is heading and that
        we're running out of time? Has presenteeism invaded your workplace,
        dragging down productivity and innovation? Have you started to notice
        the common thread between climate change, wealth inequality, racism, and
        loneliness? If so, my book is for you.
      </h2>
    </div>
  </section>
);

const BooksWhyRead = () => (
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

const BooksDownloads = () => (
  <section className="py-24 bg-white">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
      <div className="md:col-span-4">
        <h2 className="text-4xl md:text-5xl font-serif text-brand-navy leading-tight">
          Can't wait to
          <br />
          dig in?
        </h2>
      </div>
      <div className="md:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {/* Download Chapter Card */}
        <div className="relative aspect-[16/10] rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden group cursor-pointer shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?q=80&w=800"
            alt="Download a chapter"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <h3 className="absolute bottom-6 left-6 right-6 text-white text-2xl font-bold font-sans z-10">
            Download a chapter
          </h3>
        </div>
        {/* Download Workbook Card */}
        <div className="relative aspect-[16/10] rounded-tr-[4rem] rounded-bl-[4rem] overflow-hidden group cursor-pointer shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=800"
            alt="Download the workbook"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
          <h3 className="absolute bottom-6 left-6 right-6 text-white text-2xl font-bold font-sans z-10">
            Download the workbook
          </h3>
        </div>
      </div>
    </div>
  </section>
);

const BooksQuote1 = () => (
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

const BooksContents = () => (
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

const BooksQuote2 = () => (
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

const BooksRetailers = () => (
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

const BooksFavourites = () => (
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

const BooksCurrentWork = () => (
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

const BooksContact = () => (
  <section className="py-24 bg-white border-t border-gray-100">
    <div className="container mx-auto px-6 md:px-12 max-w-6xl">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start mb-16">
        <div>
          <h3 className="text-3xl md:text-4xl font-serif text-brand-navy mb-4">
            Want to review an early draft?
          </h3>
          <p className="text-sm font-semibold text-brand-navy/80">
            Sign up to get exclusive early access.
          </p>
        </div>
        <div>
          <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
            <div className="flex flex-col sm:flex-row gap-8">
              <input
                type="text"
                placeholder="Name"
                className="w-full bg-transparent border-b border-gray-300 pb-3 text-brand-navy placeholder:text-gray-500 focus:outline-none focus:border-brand-navy transition-colors"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full bg-transparent border-b border-gray-300 pb-3 text-brand-navy placeholder:text-gray-500 focus:outline-none focus:border-brand-navy transition-colors"
              />
            </div>
            <button
              type="submit"
              className="border border-brand-navy text-brand-navy px-12 py-3 hover:bg-brand-navy hover:text-white transition-colors duration-300"
            >
              Send
            </button>
          </form>
        </div>
      </div>

      {/* Stay in Touch Footer Area */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-8 border-t border-gray-100 pt-12">
        <h3 className="text-3xl md:text-4xl font-serif text-[#F2D049]">
          Stay in Touch
        </h3>

        <p className="text-xs text-gray-500 order-3 md:order-2">
          Made by Green Horizon
        </p>

        <div className="flex gap-4 order-2 md:order-3">
          {[FacebookIcon, LinkedinIcon, YoutubeIcon, InstagramIcon].map(
            (Icon, idx) => (
              <a
                key={idx}
                href="#"
                className="w-10 h-10 rounded-full bg-[#F2D049] flex items-center justify-center text-white hover:scale-110 transition-transform duration-300"
              >
                <Icon size={18} />
              </a>
            ),
          )}
        </div>
      </div>
    </div>
  </section>
);

export default function BooksPage() {
  return (
    <main className="min-h-screen bg-background text-foreground flex flex-col overflow-hidden">
      <Navbar />
      <BooksHero />
      <BooksIntro />
      <BooksWhyRead />
      <BooksDownloads />
      <BooksQuote1 />
      <BooksContents />
      <BooksQuote2 />
      <BooksRetailers />
      <BooksFavourites />
      <BooksCurrentWork />
      <BooksContact />
    </main>
  );
}
