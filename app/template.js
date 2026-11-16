"use client";
// Re-mounts on every navigation. On the first load it only fades in; when
// you move between pages, a stage curtain opens on the new page (two velvet
// halves gather to the sides under a scalloped pelmet). It sits outside the
// faded wrapper so it's solid from the first frame.
//
// The flag only flips in an effect, after the first page has committed. It
// used to flip inside the useState initializer: when React paused and
// restarted hydration (it time-slices, so it sometimes does), the restart
// saw the flag already flipped, rendered a curtain the server never sent and
// threw React error #418 about 1 load in 100.
import { useEffect, useState } from "react";

let hydrated = false;

export default function Template({ children }) {
  const [wipe] = useState(() => typeof window !== "undefined" && hydrated);
  useEffect(() => {
    hydrated = true;
  }, []);
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
