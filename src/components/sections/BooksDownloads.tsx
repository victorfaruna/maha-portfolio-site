import React from "react";

export const BooksDownloads = () => (
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
