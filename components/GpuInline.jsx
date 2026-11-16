"use client";
// My GPU, in 3D, right in the home page's homelab scene: it turns slowly on its
// own, you can drag it side to side, and the buttons cycle the fans and the RGB
// or open the full-screen view (components/GpuEgg.jsx). three.js is fetched
// when the scene gets close to the screen, and the canvas stops drawing while
// it is scrolled away. Without WebGL it shows a still note instead.
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
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        import("./gpu/viewer").then(({ mount }) => {
          if (disposed || !stage.current) return;
          const a = mount(stage.current, { reducedMotion: reduced, inline: true });
          if (!a) return setSt((s) => ({ ...s, failed: true }));
          api.current = a;
          setSt({ ready: true, failed: false, fan: a.fan, rgb: a.rgb });
          vis = new IntersectionObserver((es) => es.forEach((e) => a.setActive(e.isIntersecting)), { rootMargin: "100px" });
          vis.observe(box.current);
        });
      },
      { rootMargin: "600px 0px" },
    );
    near.observe(box.current);
    return () => {
      disposed = true;
      near.disconnect();
      vis?.disconnect();
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
    <figure className="sticker gpu3d" ref={box} aria-label="A 3D model of my GPU, an ASRock Radeon RX 7900 XTX Phantom Gaming OC">
      <div className="gpu3d-stage" ref={stage} />
      {st.failed ? <p className="gpu3d-note">ASRock RX 7900 XTX Phantom Gaming OC (3D is off in this browser)</p> : null}
      <figcaption className="gpu3d-bar">
        <span className="gpu3d-label">
          my GPU <small>RX 7900 XTX · 24 GB · drag to spin</small>
        </span>
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
