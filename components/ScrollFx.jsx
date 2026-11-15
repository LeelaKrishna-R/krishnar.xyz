"use client";
// Fades list items in as they scroll into view ([data-reveal] gets .in),
// staggered a little within each list. Re-runs on navigation.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollFx() {
  const pathname = usePathname();

  // The cartoon me's eyes follow the pointer: each chibi gets --lx/--ly (-1..1)
  // pointing from its face toward the cursor. Reads first, then writes, once a
  // frame at most; nothing happens on touch screens or with reduced motion.
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine) and (prefers-reduced-motion: no-preference)").matches) return;
    let frame = 0;
    let px = 0;
    let py = 0;
    const update = () => {
      frame = 0;
      const els = Array.from(document.querySelectorAll(".chibi"));
      const vh = window.innerHeight;
      const moves = [];
      for (const el of els) {
        const r = el.getBoundingClientRect();
        if (r.bottom < 0 || r.top > vh || !r.width) continue;
        const cx = r.left + r.width / 2;
        const cy = r.top + r.height * 0.32;
        const dx = (px - cx) / 260;
        const dy = (py - cy) / 260;
        const len = Math.max(1, Math.hypot(dx, dy));
        moves.push([el, (dx / len).toFixed(2), (dy / len).toFixed(2)]);
      }
      for (const [el, x, y] of moves) {
        el.style.setProperty("--lx", x);
        el.style.setProperty("--ly", y);
      }
    };
    const onMove = (e) => {
      px = e.clientX;
      py = e.clientY;
      if (!frame) frame = requestAnimationFrame(update);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  useEffect(() => {
    window.__fx = true;
    const els = Array.from(document.querySelectorAll("[data-reveal]:not(.in)"));
    for (const el of els) {
      const sibs = Array.from(el.parentElement?.children || []).filter((c) => c.hasAttribute("data-reveal"));
      el.style.setProperty("--i", String(Math.min(sibs.indexOf(el), 6)));
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
      { rootMargin: "0px 0px -5% 0px" },
    );
    els.forEach((el) => io.observe(el));

    // Story scenes play once their content (not the whole tall section) is on
    // screen, so a phone never shows a blank band where the next scene is.
    const scenes = Array.from(document.querySelectorAll("[data-scene]:not(.in)"));
    const owner = new Map();
    const so = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            owner.get(e.target).classList.add("in");
            so.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0 },
    );
    scenes.forEach((el) => {
      const target = el.querySelector(":scope > .wrap") || el;
      owner.set(target, el);
      so.observe(target);
    });
    // .on marks scenes near the viewport; looping animations pause without it.
    const vis = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("on", e.isIntersecting);
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    document.querySelectorAll("[data-scene]").forEach((el) => vis.observe(el));
    // Every cartoon me off screen (hero, title card, footer) stops moving too.
    const chib = new IntersectionObserver(
      (entries) => {
        for (const e of entries) e.target.classList.toggle("ch-off", !e.isIntersecting);
      },
      { rootMargin: "10% 0px 10% 0px" },
    );
    document.querySelectorAll(".chibi").forEach((el) => chib.observe(el));
    return () => {
      io.disconnect();
      so.disconnect();
      vis.disconnect();
      chib.disconnect();
    };
  }, [pathname]);

  return null;
}
