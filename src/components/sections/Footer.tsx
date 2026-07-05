"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Send } from "lucide-react";

export function Footer() {
  return (
    <footer
      id="contact"
      className="pt-24 pb-12 bg-black text-background relative overflow-hidden mt-12"
    >
      {/* Decorative blurred blob */}
      <div className="absolute top-0 right-0 size-125 bg-white/5 blur-[150px] rounded-full translate-x-1/2 -translate-y-1/2 pointer-events-none" />

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
              <span className="text-sm uppercase tracking-widest text-white/60 font-semibold mb-6 block">
                Let's Collaborate
              </span>
              <h2 className="text-3xl md:text-5xl font-serif text-accent/70 leading-tight">
                Ready to make an{" "}
                <span className="italic text-white/90">impact?</span>
              </h2>
              <p className="text-background/70 text-lg max-w-md mt-6">
                Reach out for speaking engagements, advisory roles, AI
                consulting, or simply to connect and share ideas.
              </p>
            </div>

            <div className="pt-12 space-y-8">
              <div>
                <p className="text-sm text-background/50 uppercase tracking-widest mb-2">
                  Direct Inquiry
                </p>
                <a
                  href="mailto:contact@mahajouini.com"
                  className="text-2xl md:text-3xl hover:text-white/70 transition-colors duration-300"
                >
                  contact@mahajouini.com
                </a>
              </div>

              <div>
                <p className="text-sm text-background/50 uppercase tracking-widest mb-4">
                  Connect
                </p>
                <div className="flex flex-wrap gap-4">
                  {["LinkedIn", "Twitter", "Instagram"].map((social, idx) => (
                    <a
                      key={idx}
                      href="#"
                      className="group flex items-center gap-2 px-6 py-3 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-sm font-medium uppercase tracking-widest hover:bg-white hover:text-black hover:border-white transition-all duration-300"
                    >
                      {social}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
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
            className="bg-background/5 p-8 md:p-12 rounded-[1rem] border border-white/10 backdrop-blur-md"
          >
            <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 group">
                  <label className="text-xs uppercase tracking-widest text-background/60 group-focus-within:text-white transition-colors">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="Jane"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg placeholder:text-background/20 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
                <div className="space-y-2 group">
                  <label className="text-xs uppercase tracking-widest text-background/60 group-focus-within:text-white transition-colors">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className="w-full bg-transparent border-b border-white/20 pb-3 text-lg placeholder:text-background/20 focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-background/60 group-focus-within:text-white transition-colors">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="jane@example.com"
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-lg placeholder:text-background/20 focus:outline-none focus:border-white transition-colors"
                />
              </div>

              <div className="space-y-2 group">
                <label className="text-xs uppercase tracking-widest text-background/60 group-focus-within:text-white transition-colors">
                  Message
                </label>
                <textarea
                  rows={4}
                  placeholder="How can we collaborate?"
                  className="w-full bg-transparent border-b border-white/20 pb-3 text-lg placeholder:text-background/20 focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-fit text-sm px-10 grid-cols-1 py-4 mt-8 bg-white text-black rounded-full font-semibold uppercase tracking-widest hover:bg-white/90 transition-all duration-300 flex items-center justify-center gap-3 group"
              >
                Send Message
                <Send className="w-4 h-4 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
              </button>
            </form>
          </motion.div>
        </div>

        {/* Footer Bottom Line */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-background/50 text-sm">
          <p>© {new Date().getFullYear()} Maha Jouini. All rights reserved.</p>
          <div className="flex gap-8 uppercase tracking-widest text-xs font-semibold">
            <a href="#" className="hover:text-background transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
