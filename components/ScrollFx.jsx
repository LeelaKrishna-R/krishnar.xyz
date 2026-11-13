"use client";
// Everything scroll-driven, in one passive listener and one observer:
// reveal-on-scroll ([data-reveal] gets .in), the top progress bar, the
// timeline's fill line, and the back-to-top button. Re-runs on navigation.
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { ArrowUp } from "./Icons";

export default function ScrollFx() {
  const pathname = usePathname();
  const bar = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.__fx = true;
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.in)"));
    // Stagger siblings that share a grid: --i is their index among revealables.
    for (const el of els) {
      if (el.style.getPropertyValue("--i")) continue;
      const sibs = Array.from(el.parentElement?.children || []).filter((c) => c.hasAttribute("data-reveal"));
      el.style.setProperty("--i", String(Math.min(sibs.indexOf(el), 4)));
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    els.forEach((el) => io.observe(el));

    const line = document.querySelector(".timeline");
    let frame = 0;
    const update = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const y = window.scrollY;
      if (bar.current) bar.current.style.transform = `scaleX(${max > 0 ? Math.min(1, y / max) : 0})`;
      setShowTop(y > 700);
      if (line) {
        const r = line.getBoundingClientRect();
        // The fill tip follows a line 75% of the way down the viewport.
        const p = (window.innerHeight * 0.75 - r.top) / (r.height || 1);
        line.style.setProperty("--fill", String(Math.max(0, Math.min(1, p))));
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [pathname]);

  return (
    <>
      <div className="progress" ref={bar} aria-hidden="true" />
      <button
        type="button"
        className={`icon-btn to-top${showTop ? " show" : ""}`}
        onClick={() => window.scrollTo({ top: 0, behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
        aria-label="Back to top"
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp />
      </button>
    </>
  );
}
