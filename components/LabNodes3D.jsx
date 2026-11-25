"use client";
// My two homelab nodes in 3D at the top of /homelab (components/lab3d/viewer.js).
// The power lights follow the live lab status the page already fetched (white
// = up, amber = down). Drag to turn them; they tilt a little as the page
// scrolls. three.js loads only when the section gets close, the scene is built
// in idle time, and nothing draws once it has settled.
import { useEffect, useRef, useState } from "react";

export default function LabNodes3D({ status }) {
  const box = useRef(null);
  const stage = useRef(null);
  const api = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let disposed = false;
    let vis;
    let onScroll;
    const near = new IntersectionObserver(
      (entries) => {
        if (!entries.some((e) => e.isIntersecting)) return;
        near.disconnect();
        const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
        const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 120));
        import("./lab3d/viewer")
          .then(({ mount }) => new Promise((done) => idle(() => done(mount), { timeout: 1200 })))
          .then((mount) => {
            if (disposed || !stage.current) return;
            const a = mount(stage.current, { reducedMotion: reduced, status: status || {} });
            if (!a) return setFailed(true);
            api.current = a;
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
                  a.setScroll((innerHeight / 2 - (r.top + r.height / 2)) / (innerHeight / 2));
                });
              };
              window.addEventListener("scroll", onScroll, { passive: true });
            }
          });
      },
      { rootMargin: "400px 0px" },
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
  }, [status]);

  const live = status && typeof status.node1 === "boolean";
  return (
    <figure className="lab3d" ref={box} aria-label="A 3D model of my two homelab nodes, Dell OptiPlex 7050 Micros, stacked">
      <div className="lab3d-stage" ref={stage} />
      {failed ? <p className="gpu3d-note">Two Dell OptiPlex 7050 Micros, stacked (3D is off in this browser)</p> : null}
      <figcaption className="note lab3d-note">
        node1 and node2, drag to turn them
        {live ? <span className="lab3d-key"> · power lights are live: white is up</span> : null}
      </figcaption>
    </figure>
  );
}
