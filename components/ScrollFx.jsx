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
    return () => io.disconnect();
  }, [pathname]);

  return null;
}
