"use client";
// The hidden surprise. The Konami code (↑ ↑ ↓ ↓ ← → ← → B A), or tapping any
// cartoon me seven times in a few seconds on a phone, fires "chibi:party":
// confetti falls, a cheering me runs across the bottom of the screen, and
// every visible chibi spins. With reduced motion only the note shows.
import { useEffect, useState } from "react";
import Chibi from "./Chibi";

const CODE = [
  "ArrowUp",
  "ArrowUp",
  "ArrowDown",
  "ArrowDown",
  "ArrowLeft",
  "ArrowRight",
  "ArrowLeft",
  "ArrowRight",
  "b",
  "a",
];
const COLORS = ["#f0b429", "#f4b8a4", "#bfe0c8", "#9ac4e8", "#e0685a", "#bdeedd"];

export default function Party() {
  const [on, setOn] = useState(0);

  useEffect(() => {
    let i = 0;
    let taps = [];
    const fire = () => window.dispatchEvent(new Event("chibi:party"));
    const onKey = (e) => {
      if (e.target.closest && e.target.closest("input, textarea, [contenteditable]")) return;
      const k = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      i = k === CODE[i] ? i + 1 : k === CODE[0] ? 1 : 0;
      if (i === CODE.length) {
        i = 0;
        fire();
      }
    };
    const onTap = (e) => {
      if (!(e.target.closest && e.target.closest(".chibi"))) return;
      const now = Date.now();
      taps = taps.filter((t) => now - t < 3000).concat(now);
      if (taps.length >= 7) {
        taps = [];
        fire();
      }
    };
    let timer;
    const onParty = () => {
      setOn(Date.now());
      clearTimeout(timer);
      timer = setTimeout(() => setOn(0), 5200);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onTap);
    window.addEventListener("chibi:party", onParty);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onTap);
      window.removeEventListener("chibi:party", onParty);
    };
  }, []);

  if (!on) return null;
  return (
    <div className="party" key={on} aria-live="polite">
      <p className="party-note sticker">you found the secret! 🎉</p>
      <div className="party-confetti" aria-hidden="true">
        {Array.from({ length: 36 }, (_, n) => (
          <i
            key={n}
            style={{
              "--x": `${(n * 37) % 100}%`,
              "--d": `${((n * 13) % 20) / 10}s`,
              "--t": `${2.4 + ((n * 7) % 12) / 10}s`,
              "--r": `${(n * 53) % 360}deg`,
              background: COLORS[n % COLORS.length],
            }}
          />
        ))}
      </div>
      <div className="party-runner" aria-hidden="true">
        <Chibi pose="cheer" face="happy" />
      </div>
    </div>
  );
}
