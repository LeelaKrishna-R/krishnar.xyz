"use client";
// Hidden surprise #2: a 3D model of my GPU you can turn around. Opens when you
// click the "my GPU" sticker on the home page or type "gpu" anywhere. The
// three.js scene (components/gpu/viewer.js) is only downloaded at that moment.
// Drag to orbit, scroll or pinch to zoom; arrow keys and +/- do the same;
// F cycles the fans, R the RGB, B flips to the backplate, Esc closes.
import { useCallback, useEffect, useRef, useState } from "react";

const FAN_LABEL = { off: "0 dB (fans off)", game: "gaming", max: "full blast" };
const RGB_LABEL = { rainbow: "rainbow", ember: "ember", ice: "ice", off: "off" };

export default function GpuEgg() {
  const [open, setOpen] = useState(false);
  const [state, setState] = useState({ ready: false, failed: false, fan: "game", rgb: "rainbow", back: false });
  const stage = useRef(null);
  const api = useRef(null);
  const closeBtn = useRef(null);
  const opener = useRef(null);

  const close = useCallback(() => setOpen(false), []);

  // triggers: the sticker (a button on the home page) and typing "gpu"
  useEffect(() => {
    let typed = "";
    const onClick = (e) => {
      const t = e.target.closest?.("[data-gpu-egg]");
      if (!t) return;
      opener.current = t;
      setOpen(true);
    };
    const onKey = (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || e.target.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;
      typed = (typed + e.key.toLowerCase()).slice(-3);
      if (typed === "gpu") {
        opener.current = document.activeElement;
        setOpen(true);
      }
    };
    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  // build the scene when the dialog opens, tear it all down when it closes
  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.classList.add("gpu-open");
    closeBtn.current?.focus();
    import("./gpu/viewer").then(({ mount }) => {
      if (cancelled || !stage.current) return;
      const a = mount(stage.current, { reducedMotion: reduced });
      if (!a) return setState((s) => ({ ...s, failed: true }));
      api.current = a;
      setState({ ready: true, failed: false, fan: a.fan, rgb: a.rgb, back: false });
    });
    return () => {
      cancelled = true;
      api.current?.dispose();
      api.current = null;
      setState((s) => ({ ...s, ready: false, back: false }));
      document.documentElement.classList.remove("gpu-open");
      opener.current?.focus?.();
    };
  }, [open]);

  const cycle = (kind) => {
    const a = api.current;
    if (!a) return;
    if (kind === "fan") {
      const list = a.fanModes;
      const next = list[(list.indexOf(a.fan) + 1) % list.length];
      a.setFan(next);
      setState((s) => ({ ...s, fan: next }));
    } else {
      const list = a.rgbModes;
      const next = list[(list.indexOf(a.rgb) + 1) % list.length];
      a.setRgb(next);
      setState((s) => ({ ...s, rgb: next }));
    }
  };
  const flip = () => {
    const back = api.current?.flip();
    setState((s) => ({ ...s, back: !!back }));
  };

  const onKeyDown = (e) => {
    const a = api.current;
    if (e.key === "Escape") return close();
    if (e.key === "Tab") {
      // keep focus inside the dialog
      const items = [...e.currentTarget.querySelectorAll("button")];
      const i = items.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      } else if (!e.shiftKey && i === items.length - 1) {
        e.preventDefault();
        items[0].focus();
      }
      return;
    }
    if (!a) return;
    const k = e.key.toLowerCase();
    const map = { arrowleft: [-0.12, 0], arrowright: [0.12, 0], arrowup: [0, -0.1], arrowdown: [0, 0.1] };
    if (map[k]) {
      e.preventDefault();
      a.nudge(map[k][0], map[k][1]);
    } else if (k === "+" || k === "=") a.nudge(0, 0, 0.9);
    else if (k === "-") a.nudge(0, 0, 1.1);
    else if (k === "f") cycle("fan");
    else if (k === "r") cycle("rgb");
    else if (k === "b") flip();
  };

  if (!open) return null;
  return (
    <div className="gpu-egg" role="dialog" aria-modal="true" aria-labelledby="gpu-title" onKeyDown={onKeyDown}>
      <div className="gpu-stage" ref={stage} />
      <header className="gpu-head">
        <p className="gpu-kicker">you found my GPU</p>
        <h2 id="gpu-title">ASRock Radeon RX 7900 XTX Phantom Gaming OC</h2>
        <p className="gpu-spec">24 GB GDDR6 · 330 × 140 × 58 mm · three fans, the middle one spins backwards · it trains my models</p>
      </header>
      <button ref={closeBtn} type="button" className="gpu-close" onClick={close} aria-label="Close the GPU model">
        ✕
      </button>
      {state.failed ? (
        <p className="gpu-note">Your browser has 3D turned off, so the card stays in its box this time.</p>
      ) : !state.ready ? (
        <p className="gpu-note" aria-live="polite">
          unboxing…
        </p>
      ) : null}
      <div className="gpu-hud" aria-label="Controls">
        <button type="button" className="gpu-btn" onClick={() => cycle("fan")} disabled={!state.ready}>
          <small>fans</small> {FAN_LABEL[state.fan]}
        </button>
        <button type="button" className="gpu-btn" onClick={() => cycle("rgb")} disabled={!state.ready}>
          <small>rgb</small> {RGB_LABEL[state.rgb]}
        </button>
        <button type="button" className="gpu-btn" onClick={flip} disabled={!state.ready}>
          {state.back ? "show the fans" : "show the backplate"}
        </button>
        <button type="button" className="gpu-btn" onClick={() => api.current?.reset()} disabled={!state.ready}>
          reset view
        </button>
      </div>
      <p className="gpu-hint">drag to turn · scroll or pinch to zoom · keys: arrows, + −, F, R, B, Esc</p>
    </div>
  );
}
