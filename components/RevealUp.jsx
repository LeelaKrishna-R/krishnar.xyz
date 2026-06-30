"use client";
import { useEffect } from "react";

// Adds `.in` to every `.reveal-up` element as it scrolls into view, once.
// Pure progressive enhancement: if there's no observer support, everything shows.
export default function RevealUp() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal-up:not(.in)");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
