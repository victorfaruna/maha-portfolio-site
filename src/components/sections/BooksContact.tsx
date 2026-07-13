import React from "react";

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

export const BooksContact = () => (
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
