"use client";
// A pencil at the top of a post that draws a line as you read.
import { useEffect, useRef } from "react";

export default function ReadPencil() {
  const line = useRef(null);
  const pencil = useRef(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const article = document.querySelector(".article");
      if (!article) return;
      const r = article.getBoundingClientRect();
      const total = r.height - window.innerHeight * 0.6;
      const p = Math.max(0, Math.min(1, -r.top / (total || 1)));
      const w = window.innerWidth;
      if (line.current) line.current.style.transform = `scaleX(${p})`;
      if (pencil.current) pencil.current.style.transform = `translateX(${p * (w - 46)}px) rotate(${p >= 1 ? 0 : -8}deg)`;
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div className="read-pencil" aria-hidden="true">
      <i ref={line} />
      <svg ref={pencil} viewBox="0 0 34 14">
        <path className="p-body" d="M2 3 H24 V11 H2 Z" />
        <path className="p-tip" d="M24 3 L33 7 L24 11 Z" />
        <path className="p-lead" d="M30 5.7 L33 7 L30 8.3 Z" />
        <path className="p-eraser" d="M0 3 H3 V11 H0 Z" />
      </svg>
    </div>
  );
}
