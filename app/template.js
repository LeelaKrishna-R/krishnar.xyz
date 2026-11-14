"use client";
// Re-mounts on every navigation. On the first load it only fades in; when
// you move between pages, three colour panels swipe off the new page like a
// cartoon scene change. The panels sit outside the faded wrapper so they're
// solid from the first frame. The flag lives in the browser only, so the
// server never renders a wipe.
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
    <>
      {wipe ? (
        <div className="wipe" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
      ) : null}
      <div className={`page-in${wipe ? " wiped" : ""}`}>{children}</div>
    </>
  );
}
