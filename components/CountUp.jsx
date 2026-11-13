"use client";
// A number that counts up from zero the first time it scrolls into view.
// The server renders the final value, so it's correct without JavaScript.
import { useEffect, useRef } from "react";

export default function CountUp({ value, duration = 1200 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof value !== "number") return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const fmt = (n) => Math.round(n).toLocaleString("en-US");
    let raf = 0;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / duration);
          el.textContent = fmt(value * (1 - Math.pow(1 - k, 3)));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        el.textContent = "0";
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [value, duration]);

  return (
    <span ref={ref} suppressHydrationWarning>
      {typeof value === "number" ? value.toLocaleString("en-US") : "–"}
    </span>
  );
}
