"use client";
// Fades list items in as they scroll into view ([data-reveal] gets .in),
// staggered a little within each list. Re-runs on navigation.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollFx() {
  const pathname = usePathname();

  // The cartoon me reacts: a click gets a hop, a spin or a wiggle (in turn),
  // switching the theme makes every visible one jump, and the contact form
  // fires "chibi:throw" when a message goes out. Each reaction is a class
  // that replaces his loop for under a second.
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const kinds = ["ch-r-hop", "ch-r-spin", "ch-r-wiggle"];
    let n = 0;
    const react = (el, kind) => {
      el.classList.remove(...kinds, "ch-r-surprise", "ch-r-throw");
      void el.getBoundingClientRect();
      el.classList.add(kind);
      clearTimeout(el.__react);
      el.__react = setTimeout(() => el.classList.remove(kind), 1100);
    };
    const visible = () =>
      Array.from(document.querySelectorAll(".chibi")).filter((c) => {
        const r = c.getBoundingClientRect();
        return r.bottom > 0 && r.top < window.innerHeight && r.width > 0;
      });
    const onClick = (e) => {
      const c = e.target.closest && e.target.closest(".chibi");
      if (c) react(c, kinds[n++ % kinds.length]);
    };
    const onThrow = () => document.querySelectorAll(".ph-chibi").forEach((c) => react(c, "ch-r-throw"));
    const mo = new MutationObserver(() => visible().forEach((c) => react(c, "ch-r-surprise")));
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    document.addEventListener("click", onClick);
    window.addEventListener("chibi:throw", onThrow);
    return () => {
      mo.disconnect();
      document.removeEventListener("click", onClick);
      window.removeEventListener("chibi:throw", onThrow);
    };
  }, []);

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
