"use client";
// "I build ___." in the hero, on its own line so a swap never moves other text: the blank cycles through what I actually build,
// sliding each word in, twice round, then settles back on the first one.
// Screen readers get the whole list once; the moving word is hidden from them.
// The server renders the first word, so it's right without JavaScript.
import { useEffect, useState } from "react";

const WORDS = ["AI tools", "Discord bots", "homelab infrastructure", "developer tooling"];

export default function RoleRotator() {
  const [n, setN] = useState(0); // swaps so far: the first word is not animated in
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let k = 0;
    const id = setInterval(() => {
      k += 1;
      setN(k);
      if (k >= WORDS.length * 2) clearInterval(id);
    }, 2300);
    return () => clearInterval(id);
  }, []);
  return (
    <>
      <span className="sr-only">AI tools, Discord bots, homelab infrastructure and developer tooling.</span>
      <span className="rotor" aria-hidden="true">
        <span key={n} className={`rotor-word${n ? " swap" : ""}`}>
          {WORDS[n % WORDS.length]}.
        </span>
      </span>
    </>
  );
}
