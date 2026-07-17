"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type NavLink = {
  name: string;
  href: string;
  hasDropdown?: boolean;
};

const navLinks: NavLink[] = [
  { name: "About", href: "/about" },
  { name: "AI Solutions", href: "/ai-solutions" },
  { name: "Research & Publications", href: "/research" },
  { name: "Speaking & Media", href: "/speaking" },
  { name: "Awards & Fellowships", href: "/awards" },
  { name: "Work With Me", href: "/work" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-background border-b border-border shadow-sm py-2"
          : "bg-transparent py-2"
      )}
    >
      <div className="w-full px-0 sm:px-6 md:px-12 lg:px-20 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center group relative w-80 h-40 md:w-96 md:h-48 transition-transform duration-300 hover:scale-105 -ml-20 -mt-8 sm:-ml-12 md:-ml-4">
            <Image
              src="/images/logo.png"
              alt="Maha Jouini Logo"
              fill
              className="object-contain"
              priority
            />
          </Link>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <div key={link.name} className="relative group">
              <Link
                href={link.href}
                className={cn(
                  "text-sm font-semibold tracking-wide transition-colors flex items-center gap-1",
                  scrolled ? "text-foreground hover:text-accent" : "text-white hover:text-white/80"
                )}
                style={{ textShadow: scrolled ? "none" : "0px 1px 3px rgba(0,0,0,0.6)" }}
              >
                {link.name}
                {link.hasDropdown && <ChevronDown className="w-3 h-3" />}
              </Link>
            </div>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <div className="flex lg:hidden justify-end items-center mr-2 -mt-20 sm:-mt-12">
          <button
            className={cn("p-2 transition-colors", scrolled ? "text-foreground" : "text-white")}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-7 h-7" style={{ filter: scrolled ? "none" : "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))" }} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-[80vw] max-w-sm bg-background z-50 flex flex-col pt-24 px-8 pb-6 overflow-y-auto border-l border-border shadow-2xl"
            >
              <button
                className="absolute top-6 right-6 text-foreground hover:text-accent transition-colors p-2"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="w-7 h-7" />
              </button>
              <nav className="flex flex-col gap-2 mt-8 w-full items-start">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-left text-2xl font-serif text-foreground hover:text-accent transition-colors flex items-center justify-between gap-2 py-4 border-b border-border/50"
                  >
                    {link.name}
                    {link.hasDropdown && <ChevronDown className="w-5 h-5" />}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
