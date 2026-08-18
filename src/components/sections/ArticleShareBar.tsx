"use client";

import { useState } from "react";
import { Eye, Clock, Share2, Check, Linkedin, Twitter, Facebook, Link as LinkIcon, Send } from "lucide-react";

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
          className="p-2 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-[#0A66C2] hover:text-white hover:border-[#0A66C2] transition-all duration-300"
          aria-label="Share on LinkedIn"
          title="Share on LinkedIn"
        >
          <Linkedin className="w-3.5 h-3.5" />
        </button>

        {/* X / Twitter Button */}
        <button
          onClick={shareOnTwitter}
          className="p-2 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-black hover:text-white hover:border-black transition-all duration-300"
          aria-label="Share on X / Twitter"
          title="Share on X / Twitter"
        >
          <Twitter className="w-3.5 h-3.5" />
        </button>

        {/* Facebook Button */}
        <button
          onClick={shareOnFacebook}
          className="p-2 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-all duration-300"
          aria-label="Share on Facebook"
          title="Share on Facebook"
        >
          <Facebook className="w-3.5 h-3.5" />
        </button>

        {/* WhatsApp Button */}
        <button
          onClick={shareOnWhatsApp}
          className="p-2 rounded-full bg-secondary/60 text-brand-navy border border-border hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-all duration-300"
          aria-label="Share on WhatsApp"
          title="Share on WhatsApp"
        >
          <Send className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
