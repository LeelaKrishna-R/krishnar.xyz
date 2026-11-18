"use client";
// My GPU, in 3D, floating in the home page's homelab scene. Drag it any way
// you like with a mouse; on touch screens swipe sideways (vertical swipes keep
// scrolling the page). It also turns and tilts as the page scrolls past, and
// spins slowly on its own. The buttons cycle the fans and the RGB or open the
// full-screen view (components/GpuEgg.jsx). three.js is fetched when the scene
// gets close, and the canvas stops drawing while it is scrolled away.
import { useEffect, useRef, useState } from "react";

const FAN = { off: "0 dB", game: "gaming", max: "full blast" };

export default function GpuInline() {
  const box = useRef(null);
  const stage = useRef(null);
  const api = useRef(null);
  const [st, setSt] = useState({ ready: false, failed: false, fan: "game", rgb: "phantom" });

  useEffect(() => {
    let disposed = false;
    let vis;
    let onScroll;
    // parse the 3D code (three.js is big) in the first idle moment after the page
    // loads, while you're still reading the top, not later in the middle of a scroll
    const idleFirst = window.requestIdleCallback || ((cb) => setTimeout(cb, 1500));
    idleFirst(() => import("./gpu/viewer"), { timeout: 5000 });
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        // fetch the 3D code now, but build the scene in an idle moment so the
        // setup never lands in the middle of a scroll frame
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
        import("./gpu/viewer").then(({ mount }) => new Promise((done) => idle(() => done(mount), { timeout: 1200 }))).then((mount) => {
          if (disposed || !stage.current) return;
          const a = mount(stage.current, { reducedMotion: reduced, inline: true });
          if (!a) return setSt((s) => ({ ...s, failed: true }));
          api.current = a;
          setSt({ ready: true, failed: false, fan: a.fan, rgb: a.rgb });
          vis = new IntersectionObserver((es) => es.forEach((e) => a.setActive(e.isIntersecting)), { rootMargin: "100px" });
          vis.observe(box.current);
          if (!reduced) {
            let queued = false;
            onScroll = () => {
              if (queued) return;
              queued = true;
              requestAnimationFrame(() => {
                queued = false;
                const r = box.current?.getBoundingClientRect();
                if (!r) return;
                const vh = window.innerHeight;
                a.setScroll((vh / 2 - (r.top + r.height / 2)) / (vh / 2));
              });
            };
            window.addEventListener("scroll", onScroll, { passive: true });
            onScroll();
          }
        });
      },
      { rootMargin: "1200px 0px" },
    );
    near.observe(box.current);
    return () => {
      disposed = true;
      near.disconnect();
      vis?.disconnect();
      if (onScroll) window.removeEventListener("scroll", onScroll);
      api.current?.dispose();
      api.current = null;
    };
  }, []);

  const cycle = (kind) => {
    const a = api.current;
    if (!a) return;
    const list = kind === "fan" ? a.fanModes : a.rgbModes;
    const cur = kind === "fan" ? a.fan : a.rgb;
    const next = list[(list.indexOf(cur) + 1) % list.length];
    if (kind === "fan") a.setFan(next);
    else a.setRgb(next);
    setSt((s) => ({ ...s, [kind]: next }));
  };

  return (
    <figure className="gpu3d" ref={box} aria-label="A 3D model of my GPU, an ASRock Radeon RX 7900 XTX Phantom Gaming OC">
      <div className="gpu3d-stage" ref={stage} />
      {st.failed ? <p className="gpu3d-note">ASRock RX 7900 XTX Phantom Gaming OC (3D is off in this browser)</p> : null}
      <figcaption className="gpu3d-bar">
        <span className="note gpu3d-label">my GPU, drag it around</span>
        <span className="gpu3d-btns">
          <button type="button" onClick={() => cycle("fan")} disabled={!st.ready} aria-label={`Fans: ${FAN[st.fan]}. Change`}>
            fans: {FAN[st.fan]}
          </button>
          <button type="button" onClick={() => cycle("rgb")} disabled={!st.ready} aria-label={`RGB: ${st.rgb}. Change`}>
            rgb: {st.rgb}
          </button>
          <button type="button" onClick={() => window.dispatchEvent(new Event("gpu-egg:open"))} aria-label="Open the GPU full screen">
            ⤢
          </button>
        </span>
      </figcaption>
    </figure>
  );
}
