"use client";
// Inertial smooth scrolling (Lenis) for mouse and trackpad: the page eases to
// a stop instead of jumping per wheel notch. Off for touch screens (their
// native scrolling is already smooth) and for anyone who asked for reduced
// motion. It drives the real scroll position, so every scroll observer and
// scroll-linked animation keeps working; in-page links still land under the
// nav. The full-screen GPU view and the quick-jump box pause it while open.
import { useEffect } from "react";

export default function SmoothScroll() {
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || matchMedia("(pointer: coarse)").matches) return;
    let lenis;
    let raf = 0;
    let mo;
    let cancelled = false;
    import("lenis").then(({ default: Lenis }) => {
      if (cancelled) return;
      lenis = new Lenis({
        lerp: 0.11,
        smoothWheel: true,
        anchors: true,
        prevent: (node) => !!node.closest?.(".gpu-egg, .qj"),
      });
      const loop = (t) => {
        lenis.raf(t);
        raf = requestAnimationFrame(loop);
      };
      raf = requestAnimationFrame(loop);
      let locked = false;
      mo = new MutationObserver(() => {
        const c = document.documentElement.classList;
        const now = c.contains("gpu-open") || c.contains("qj-open");
        if (now === locked) return;
        locked = now;
        if (now) lenis.stop();
        else lenis.start();
      });
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    });
    return () => {
      cancelled = true;
      cancelAnimationFrame(raf);
      mo?.disconnect();
      lenis?.destroy();
    };
  }, []);
  return null;
}
