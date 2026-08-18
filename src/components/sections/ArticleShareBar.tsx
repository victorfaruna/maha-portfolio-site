"use client";

import { useState } from "react";
import { Eye, Clock, Check, Link as LinkIcon, Send } from "lucide-react";

type Props = {
  title: string;
  year: string;
  sourceLabel?: string | null;
  readTimeMinutes?: number;
  viewsCount?: number;
};

export function ArticleShareBar({
  title,
  year,
  sourceLabel,
  readTimeMinutes = 4,
  viewsCount = 1240,
}: Props) {
  const [copied, setCopied] = useState(false);

  const getShareUrl = () => {
    if (typeof window !== "undefined") return window.location.href;
    return "";
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    if (!url) return;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
    }
  };

  const shareOnLinkedIn = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, "_blank");
  };

  const shareOnTwitter = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Read "${title}" by Maha Jouini`);
    window.open(`https://twitter.com/intent/tweet?url=${url}&text=${text}`, "_blank");
  };

  const shareOnFacebook = () => {
    const url = encodeURIComponent(getShareUrl());
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank");
  };

  const shareOnWhatsApp = () => {
    const url = encodeURIComponent(getShareUrl());
    const text = encodeURIComponent(`Read "${title}" by Maha Jouini: ${url}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, "_blank");
  };

  return (
    <div className="my-6 pt-4 pb-6 border-y border-border/70 flex flex-col md:flex-row md:items-center justify-between gap-5">
      {/* Author & Reading Metadata */}
      <div className="flex items-center gap-3.5">
        {/* Circle Avatar of Author (Maha Jouini) */}
        <div className="relative shrink-0">
          <img
            src="/images/abouthero.JPG"
            alt="Maha Jouini"
            className="w-12 h-12 rounded-full object-cover object-center ring-2 ring-brand-pink/30 shadow-sm"
          />
          <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-white rounded-full" title="Verified Author" />
        </div>

        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-brand-navy tracking-tight font-sans">
              Maha Jouini
            </h4>
            <span className="text-[10px] font-bold uppercase tracking-wider text-brand-pink bg-brand-pink/10 px-2 py-0.5 rounded-full">
              Author
            </span>
          </div>
          <p className="text-xs text-foreground/60 font-sans mt-0.5">
            Founder &amp; AI Governance Expert
          </p>

          <div className="flex items-center gap-3 text-xs text-foreground/50 font-sans mt-1.5 flex-wrap">
            <span>Published {year}</span>
            <span>•</span>
            <span className="inline-flex items-center gap-1">
              <Clock className="w-3 h-3 text-brand-pink" />
              {readTimeMinutes} min read
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1 font-mono text-[11px] text-brand-navy font-semibold">
              <Eye className="w-3.5 h-3.5 text-brand-pink" />
              {viewsCount.toLocaleString()} views
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Social Share Buttons */}
      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-xs font-bold uppercase tracking-wider text-foreground/50 mr-1 hidden sm:inline">
          Share:
        </span>

        {/* Copy Link Button */}
        <button
          onClick={handleCopyLink}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-300 ${
            copied
              ? "bg-green-600 text-white border-green-600 shadow-sm"
              : "bg-secondary/60 text-brand-navy border-border hover:bg-brand-pink/10 hover:border-brand-pink/30 hover:text-brand-pink"
          }`}
          title="Copy Article Link"
        >
          {copied ? (
            <>
              <Check className="w-3.5 h-3.5" />
              Copied!
            </>
          ) : (
            <>
              <LinkIcon className="w-3.5 h-3.5" />
              Copy Link
            </>
          )}
        </button>

        {/* LinkedIn Button */}
        <button
          onClick={shareOnLinkedIn}
          className="p-2.5 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300 flex items-center justify-center"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
          </svg>
        </button>

        {/* X / Twitter Button */}
        <button
          onClick={shareOnTwitter}
          className="p-2.5 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-black hover:text-white hover:border-black transition-all duration-300 flex items-center justify-center"
          aria-label="Share on X / Twitter"
          title="Share on X / Twitter"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </button>

        {/* Facebook Button */}
        <button
          onClick={shareOnFacebook}
          className="p-2.5 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300 flex items-center justify-center"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
            <path d="M12 2.04C6.5 2.04 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.22 5.96C15.31 5.96 16.45 6.15 16.45 6.15V8.62H15.19C13.95 8.62 13.56 9.39 13.56 10.18V12.06H16.34L15.89 14.96H13.56V21.96A10 10 0 0 0 22 12.06C22 6.53 17.5 2.04 12 2.04Z" />
          </svg>
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={shareOnWhatsApp}
          className="p-2.5 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300 flex items-center justify-center"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
