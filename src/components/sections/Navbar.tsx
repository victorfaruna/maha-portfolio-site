"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

const navLinks = [
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
          ? "bg-background/90 backdrop-blur-xl border-b border-white/10 shadow-sm py-2"
          : "bg-transparent py-2"
      )}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col items-center">
          <Link href="/" className="flex items-center group relative w-64 h-32 md:w-96 md:h-48 transition-transform duration-300 hover:scale-105 -ml-4">
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
        <div className="flex lg:hidden justify-end items-center">
          <button
            className={cn("transition-colors", scrolled ? "text-foreground" : "text-white")}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-8 h-8" style={{ filter: scrolled ? "none" : "drop-shadow(0px 2px 4px rgba(0,0,0,0.5))" }} />
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, y: 0, backdropFilter: "blur(16px)" }}
            exit={{ opacity: 0, y: -20, backdropFilter: "blur(0px)" }}
            className="fixed inset-0 bg-background/95 z-50 flex flex-col pt-24 px-6 pb-6"
          >
            <button
              className="absolute top-6 right-6 text-foreground hover:text-accent transition-colors"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              <X className="w-8 h-8" />
            </button>
            <nav className="flex flex-col gap-6 mt-12 items-center">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-2xl font-serif text-foreground hover:text-accent transition-colors flex items-center gap-2"
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown className="w-5 h-5" />}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
