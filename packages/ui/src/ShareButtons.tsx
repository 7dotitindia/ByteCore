"use client";

import { Link2, Linkedin, Twitter } from "lucide-react";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(path);

  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-medium uppercase tracking-wide text-text-secondary">Share</span>
      <a
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on X"
        className="flex h-8 w-8 items-center justify-center border border-border text-text-secondary transition-colors hover:border-accent hover:text-text"
      >
        <Twitter size={14} />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="flex h-8 w-8 items-center justify-center border border-border text-text-secondary transition-colors hover:border-accent hover:text-text"
      >
        <Linkedin size={14} />
      </a>
      <button
        type="button"
        aria-label="Copy link"
        onClick={() => navigator.clipboard?.writeText(window.location.href)}
        className="flex h-8 w-8 items-center justify-center border border-border text-text-secondary transition-colors hover:border-accent hover:text-text"
      >
        <Link2 size={14} />
      </button>
    </div>
  );
}
