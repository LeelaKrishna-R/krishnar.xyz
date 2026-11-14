"use client";
// Counts up from zero the first time it scrolls into view. The server renders
// the final number, so it's right without JavaScript or with reduced motion.
import { useEffect, useRef } from "react";

export default function CountUp({ value, duration = 1600 }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    el.textContent = "0";
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t) => {
          const k = Math.min(1, (t - t0) / duration);
          el.textContent = Math.round(value * (1 - Math.pow(1 - k, 3))).toLocaleString("en-US");
          if (k < 1) raf = requestAnimationFrame(tick);
        };
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
      {value.toLocaleString("en-US")}
    </span>
  );
}
