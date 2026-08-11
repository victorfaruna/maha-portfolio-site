"use client";

import { motion } from "framer-motion";
import { Send } from "lucide-react";

export function Footer({ showGradient = false }: { showGradient?: boolean }) {
  return (
    <footer
      id="contact"
      className="pt-24 pb-12 bg-secondary/40 text-foreground relative overflow-hidden mt-12 border-t border-border"
    >
      {/* Decorative blurred blob */}
      {showGradient && (
        <div className="absolute top-0 right-0 size-125 bg-brand-cyan/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      )}

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
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-brand-navy leading-tight">
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
                  href="mailto:hello@mahajouini.net"
                  className="text-lg sm:text-2xl md:text-3xl text-brand-navy hover:text-brand-pink transition-colors duration-300 break-all"
                >
                  hello@mahajouini.net
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
                    {
                      label: "YouTube",
                      href: "#",
                      svg: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M23.498 6.163a3.003 3.003 0 0 0-2.11-2.11C19.518 3.545 12 3.545 12 3.545s-7.518 0-9.388.507a3.003 3.003 0 0 0-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 0 0 2.11 2.11c1.87.507 9.388.507 9.388.507s7.518 0 9.388-.507a3.003 3.003 0 0 0 2.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                        </svg>
                      ),
                    },
                    {
                      label: "SoundCloud",
                      href: "#",
                      svg: (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                          <path d="M23.999 14.165c-.052 1.796-1.612 3.169-3.4 3.169h-8.18a.68.68 0 0 1-.675-.683V7.862a.747.747 0 0 1 .452-.724s.75-.513 2.333-.513a5.364 5.364 0 0 1 2.763.755 5.433 5.433 0 0 1 2.57 3.54c.282-.08.574-.121.868-.12.884 0 1.73.358 2.347.992s.948 1.49.922 2.373ZM10.721 8.421c.247 2.98.427 5.697 0 8.672a.264.264 0 0 1-.53 0c-.395-2.946-.22-5.718 0-8.672a.264.264 0 0 1 .53 0ZM9.072 9.448c.247 2.659.33 4.986-.006 7.655a.277.277 0 0 1-.55 0c-.331-2.63-.256-5.02 0-7.655a.277.277 0 0 1 .556 0ZM7.424 10.362c.22 2.394.27 4.475-.006 6.87a.294.294 0 0 1-.58 0c-.267-2.376-.208-4.5.006-6.87a.294.294 0 0 1 .58 0ZM5.777 11.233c.18 2.062.204 3.855-.007 5.922a.311.311 0 0 1-.613 0c-.203-2.05-.183-3.876.007-5.922a.311.311 0 0 1 .613 0ZM4.129 11.838c.134 1.745.14 3.256-.007 5.006a.333.333 0 0 1-.659 0c-.14-1.74-.136-3.27.007-5.006a.333.333 0 0 1 .659 0ZM2.482 12.395c.09 1.455.076 2.7-.007 4.159a.36.36 0 0 1-.71 0c-.078-1.451-.089-2.716.007-4.159a.36.36 0 0 1 .71 0ZM.834 13.064c.038.995.006 1.834-.007 2.825a.399.399 0 0 1-.788 0c-.013-.992-.025-1.83.007-2.825a.399.399 0 0 1 .788 0Z"/>
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
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} Maha Jouini. All rights reserved.</p>
            <p className="text-foreground/50 font-normal">
              Made with ♥ for Africa by{" "}
              <a
                href="https://talkafricang.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground underline underline-offset-2 transition-colors"
              >
                TalkAfricaNG
              </a>
            </p>
          </div>
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
