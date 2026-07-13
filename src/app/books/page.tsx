"use client";

import React from "react";
import { Navbar } from "@/components/sections/Navbar";
import { BooksHero } from "@/components/sections/BooksHero";
import { BooksIntro } from "@/components/sections/BooksIntro";
import { BooksWhyRead } from "@/components/sections/BooksWhyRead";
import { BooksDownloads } from "@/components/sections/BooksDownloads";
import { BooksQuote1 } from "@/components/sections/BooksQuote1";
import { BooksContents } from "@/components/sections/BooksContents";
import { BooksQuote2 } from "@/components/sections/BooksQuote2";
import { BooksRetailers } from "@/components/sections/BooksRetailers";
import { BooksFavourites } from "@/components/sections/BooksFavourites";
import { BooksCurrentWork } from "@/components/sections/BooksCurrentWork";
import { BooksContact } from "@/components/sections/BooksContact";

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
