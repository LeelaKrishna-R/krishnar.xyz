"use client";
// The year rail on the left of the story (wide screens) and a thin progress
// bar at the top (narrow screens). The story's protagonist, a tiny version of
// the portrait, travels down the rail (or along the bar) as you scroll. Each
// rail entry is a real year and can cover several scenes. Hidden, and out of
// the tab order, over the hero.
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

export default function StoryRail({ chapters }) {
  const [active, setActive] = useState(-1);
  const [shown, setShown] = useState(false);
  const fill = useRef(null);
  const bar = useRef(null);
  const line = useRef(null);
  const me = useRef(null);
  const rider = useRef(null);
  const links = useRef([]);

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
      if (bar.current) bar.current.style.transform = `scaleX(${p})`;
      if (rider.current) rider.current.style.transform = `translateX(${p * (window.innerWidth - 26)}px)`;
      // On the rail the portrait walks from year dot to year dot: it sits on
      // the lit year and moves to the next one as that year's scenes go by.
      const dots = links.current.filter(Boolean).map((a) => a.offsetTop + a.offsetHeight / 2);
      if (me.current && line.current && dots.length) {
        let y = dots[0];
        if (idx >= 0) {
          const els = groups[idx];
          const top = els[0].getBoundingClientRect().top;
          const bottom = els[els.length - 1].getBoundingClientRect().bottom;
          const local = Math.max(0, Math.min(1, (mid - top) / (bottom - top || 1)));
          const from = dots[idx];
          const to = dots[Math.min(idx + 1, dots.length - 1)];
          y = from + (to - from) * local;
        }
        me.current.style.transform = `translateY(${y}px)`;
        if (fill.current) {
          const lineTop = line.current.offsetTop;
          fill.current.style.transform = `scaleY(${Math.max(0, (y - lineTop) / (line.current.clientHeight || 1))})`;
        }
      }
      const credits = document.getElementById("s-next");
      document.documentElement.classList.toggle("on-credits", !!credits && credits.getBoundingClientRect().top < 72);
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
      document.documentElement.classList.remove("on-credits");
    };
  }, [chapters]);

  return (
    <>
      <div className={`story-bar${shown ? " shown" : ""}`} aria-hidden="true">
        <i ref={bar} />
        <span className="bar-rider" ref={rider}>
          <Image src="/images/me.webp" alt="" width={26} height={26} />
        </span>
      </div>
      <nav className={`rail${shown ? " shown" : ""}`} aria-label="Chapters" aria-hidden={!shown} inert={!shown}>
        <span className="rail-line" aria-hidden="true" ref={line}>
          <i ref={fill} />
        </span>
        <span className="rail-me" aria-hidden="true" ref={me}>
          <Image src="/images/me.webp" alt="" width={34} height={34} />
        </span>
        {chapters.map((c, i) => (
          <a
            key={c.label}
            ref={(el) => (links.current[i] = el)}
            href={`#${c.ids[0]}`}
            className={i === active ? "on" : i < active ? "past" : undefined}>
            <span className="rail-dot" aria-hidden="true" />
            {c.label}
          </a>
        ))}
      </nav>
    </>
  );
}
