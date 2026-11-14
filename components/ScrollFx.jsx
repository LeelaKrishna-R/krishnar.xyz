"use client";
// Fades list items in as they scroll into view ([data-reveal] gets .in),
// staggered a little within each list. Re-runs on navigation.
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ScrollFx() {
  const pathname = usePathname();

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
    return () => {
      io.disconnect();
      so.disconnect();
      vis.disconnect();
    };
  }, [pathname]);

  return null;
}
