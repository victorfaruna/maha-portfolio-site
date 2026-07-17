"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="pt-24 pb-12 bg-secondary/40 text-foreground relative overflow-hidden mt-12 border-t border-border"
    >
      {/* Decorative blurred blob */}
      <div className="absolute top-0 right-0 size-125 bg-brand-cyan/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

      <div className="container mx-auto px-6 md:px-12 max-w-8xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 mb-24">
          {/* Left Column: Heading and Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8 flex flex-col justify-between"
          >
            <div>
              <span className="text-sm uppercase tracking-widest text-foreground/50 font-semibold mb-6 block">
                Let's Collaborate
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-brand-navy leading-tight">
                Ready to make an{" "}
                <span className="italic text-brand-pink">impact?</span>
              </h2>
              <p className="text-foreground/70 text-lg max-w-md mt-6">
                Reach out for speaking engagements, advisory roles, AI
                consulting, or simply to connect and share ideas.
              </p>
            </div>

            <div className="pt-12 space-y-8">
              <div>
                <p className="text-sm text-foreground/50 uppercase tracking-widest mb-2">
                  Direct Inquiry
                </p>
                <a
                  href="mailto:contact@mahajouini.com"
                  className="text-2xl md:text-3xl text-brand-navy hover:text-brand-pink transition-colors duration-300"
                >
                  contact@mahajouini.com
                </a>
              </div>

              <div>
                <p className="text-sm text-foreground/50 uppercase tracking-widest mb-4">
                  Connect
                </p>
                <div className="flex gap-3">
                  {[
                    {
                      label: "LinkedIn",
                      href: "#",
                      svg: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z" />
                          <circle cx="4" cy="4" r="2" />
                        </svg>
                      ),
                    },
                    {
                      label: "X / Twitter",
                      href: "#",
                      svg: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      ),
                    },
                    {
                      label: "Instagram",
                      href: "#",
                      svg: (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                          <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                          <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                        </svg>
                      ),
                    },
                  ].map(({ label, href, svg }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-11 h-11 flex items-center justify-center border border-brand-navy/30 text-brand-navy hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-300"
                    >
                      {svg}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-background p-8 md:p-12 border border-border shadow-sm"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-xs uppercase tracking-widest text-foreground/50 group-focus-within:text-brand-navy transition-colors">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-transparent border-b border-border pt-3 pb-3 text-lg placeholder:text-foreground/30 focus:outline-none focus:border-brand-navy transition-colors text-foreground"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs uppercase tracking-widest text-foreground/50 group-focus-within:text-brand-navy transition-colors">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-transparent border-b border-border pt-3 pb-3 text-lg placeholder:text-foreground/30 focus:outline-none focus:border-brand-navy transition-colors text-foreground"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-foreground/50 group-focus-within:text-brand-navy transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-transparent border-b border-border pt-3 pb-3 text-lg placeholder:text-foreground/30 focus:outline-none focus:border-brand-navy transition-colors text-foreground"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-foreground/50 group-focus-within:text-brand-navy transition-colors">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we collaborate?"
                  className="w-full bg-transparent border-b border-border pt-3 pb-3 text-lg placeholder:text-foreground/30 focus:outline-none focus:border-brand-navy transition-colors resize-none text-foreground"
                />
              </div>

              <button
                type="submit"
                className="w-full sm:w-fit text-sm px-10 py-4 mt-8 bg-brand-navy text-white font-semibold uppercase tracking-widest hover:bg-brand-navy/90 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between gap-6 text-foreground/50 text-sm">
          <p>© {new Date().getFullYear()} Maha Jouini. All rights reserved.</p>
          <div className="flex gap-8 uppercase tracking-widest text-xs font-semibold">
            <a href="#" className="hover:text-foreground transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-foreground transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
