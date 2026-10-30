"use client";

import type { MouseEvent, ReactNode } from "react";

export function ServicesScrollLink({ children, className }: { children: ReactNode; className?: string }) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

    const target = document.getElementById("ways-to-work");
    if (!target) return;

    event.preventDefault();
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (window.location.hash !== "#ways-to-work") {
      window.history.pushState(null, "", "#ways-to-work");
    }

    target.focus({ preventScroll: true });
    target.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
  }

  return (
    <a href="#ways-to-work" className={className} onClick={handleClick}>
      {children}
    </a>
  );
}
