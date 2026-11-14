"use client";
// Re-mounts on every navigation. On the first load it only fades in; when
// you move between pages, three colour panels swipe across like a cartoon
// scene change. The flag lives in the browser only, so the server never
// renders a wipe.
import { useState } from "react";

let firstMount = true;

export default function Template({ children }) {
  const [wipe] = useState(() => {
    if (typeof window === "undefined") return false;
    const w = !firstMount;
    firstMount = false;
    return w;
  });
  return (
    <div className="page-in">
      {wipe ? (
        <div className="wipe" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : null}
      {children}
    </div>
  );
}
