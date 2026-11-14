"use client";
// The year rail on the left of the story: shows which chapter you're in and
// how far through you are. Hidden over the hero and on narrow screens.
import { useEffect, useRef, useState } from "react";

export default function StoryRail({ chapters }) {
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const fill = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight * 0.5;
      let idx = -1;
      els.forEach((el, i) => {
        if (el.getBoundingClientRect().top <= mid) idx = i;
      });
      const first = els[0]?.getBoundingClientRect().top ?? 0;
      const lastEl = els[els.length - 1];
      const end = lastEl ? lastEl.getBoundingClientRect().bottom : 0;
      setShown(first < window.innerHeight * 0.7 && end > window.innerHeight * 0.3);
      setActive(idx);
      if (fill.current && els.length) {
        const total = end - first;
        const p = total > 0 ? (mid - first) / total : 0;
        fill.current.style.transform = `scaleY(${Math.max(0, Math.min(1, p))})`;
        if (bar.current) bar.current.style.transform = `scaleX(${Math.max(0, Math.min(1, p))})`;
      }
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
  }, [chapters]);

  return (
    <>
    <div className={`story-bar${shown ? " shown" : ""}`} aria-hidden="true">
      <i ref={bar} />
    </div>
    <nav className={`rail${shown ? " shown" : ""}`} aria-label="Chapters">
      <span className="rail-line" aria-hidden="true">
        <i ref={fill} />
      </span>
      {chapters.map((c, i) => (
        <a key={c.id} href={`#${c.id}`} className={i === active ? "on" : i < active ? "past" : undefined}>
          <span className="rail-dot" aria-hidden="true" />
          {c.label}
        </a>
      ))}
    </nav>
    </>
  );
}
