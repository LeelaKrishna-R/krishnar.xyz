"use client";
// The year rail on the left of the story (wide screens) and a thin progress
// bar at the top (narrow screens). Each rail entry is a real year and can
// cover several scenes. Hidden, and out of the tab order, over the hero.
import { useEffect, useRef, useState } from "react";

export default function StoryRail({ chapters }) {
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const fill = useRef(null);
  const bar = useRef(null);

  useEffect(() => {
    const groups = chapters.map((c) => c.ids.map((id) => document.getElementById(id)).filter(Boolean));
    const all = groups.flat();
    if (!all.length) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const vh = window.innerHeight;
      const mid = vh * 0.5;
      let idx = -1;
      groups.forEach((els, i) => {
        if (els.some((el) => el.getBoundingClientRect().top <= mid)) idx = i;
      });
      const first = all[0].getBoundingClientRect().top;
      const end = all[all.length - 1].getBoundingClientRect().bottom;
      setShown(first < vh * 0.7 && end > vh * 0.3);
      setActive(idx);
      const p = Math.max(0, Math.min(1, (mid - first) / (end - first || 1)));
      if (fill.current) fill.current.style.transform = `scaleY(${p})`;
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
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
      <nav className={`rail${shown ? " shown" : ""}`} aria-label="Chapters" aria-hidden={!shown} inert={!shown}>
        <span className="rail-line" aria-hidden="true">
          <i ref={fill} />
        </span>
        {chapters.map((c, i) => (
          <a key={c.label} href={`#${c.ids[0]}`} className={i === active ? "on" : i < active ? "past" : undefined}>
            <span className="rail-dot" aria-hidden="true" />
            {c.label}
          </a>
        ))}
      </nav>
    </>
  );
}
