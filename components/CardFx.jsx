"use client";
// Desktop hover for the project, post and number cards: the card tips a few
// degrees toward the pointer and a soft light follows it. One delegated
// listener, updates batched to one per frame, only CSS variables change
// (the tilt is a composited transform). Off for touch and reduced motion.
import { useEffect } from "react";

const SEL = ".rows.cards a.row, .impact-card";

export default function CardFx() {
  useEffect(() => {
    if (!matchMedia("(pointer: fine)").matches || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let card = null;
    let raf = 0;
    let x = 0;
    let y = 0;
    const paint = () => {
      raf = 0;
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (x - r.left) / r.width;
      const py = (y - r.top) / r.height;
      card.style.setProperty("--mx", `${(px * 100).toFixed(1)}%`);
      card.style.setProperty("--my", `${(py * 100).toFixed(1)}%`);
      card.style.setProperty("--tx", `${((px - 0.5) * 6).toFixed(2)}deg`);
      card.style.setProperty("--ty", `${((0.5 - py) * 5).toFixed(2)}deg`);
    };
    const move = (e) => {
      const c = e.target.closest?.(SEL);
      if (c !== card) {
        if (card) card.classList.remove("fx-on");
        card = c;
        if (card) card.classList.add("fx-on");
      }
      if (!card) return;
      x = e.clientX;
      y = e.clientY;
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const leave = (e) => {
      if (card && !card.contains(e.relatedTarget)) {
        card.classList.remove("fx-on");
        card = null;
      }
    };
    document.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerout", leave, { passive: true });
    return () => {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerout", leave);
      cancelAnimationFrame(raf);
    };
  }, []);
  return null;
}
