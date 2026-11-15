"use client";
// Re-mounts on every navigation. On the first load it only fades in; when
// you move between pages, a stage curtain opens on the new page (two velvet
// halves gather to the sides under a scalloped pelmet). It sits outside the
// faded wrapper so it's solid from the first frame. The flag lives in the browser only, so the
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
        <div className="curtain" aria-hidden="true">
          <i className="c-l" />
          <i className="c-r" />
          <b />
        </div>
      ) : null}
      <div className={`page-in${wipe ? " wiped" : ""}`}>{children}</div>
    </>
  );
}
