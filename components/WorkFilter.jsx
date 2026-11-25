"use client";
// The area chips on /work. The lists are server-rendered in full; a chip only
// sets data-filter on the wrapper and CSS hides the rest (and any section left
// empty), so without JavaScript every project still shows. The choice goes in
// the URL (?area=infra) so a filtered list can be shared.
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";

export default function WorkFilter({ areas, counts, total, children }) {
  const [f, setF] = useState("all");

  useEffect(() => {
    const a = new URLSearchParams(location.search).get("area");
    if (a && areas.some((x) => x.id === a)) setF(a);
  }, [areas]);

  const pick = (id) => {
    if (id === f) return;
    const go = () => flushSync(() => setF(id));
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (document.startViewTransition && !reduced) document.startViewTransition(go);
    else go();
    const url = new URL(location.href);
    if (id === "all") url.searchParams.delete("area");
    else url.searchParams.set("area", id);
    history.replaceState(history.state, "", url);
  };

  const n = f === "all" ? total : counts[f];
  const label = f === "all" ? "" : areas.find((a) => a.id === f)?.label;
  return (
    <div className="work-list" data-filter={f}>
      <div className="work-chips" role="group" aria-label="Filter by area">
        {[{ id: "all", label: "All" }, ...areas].map((a) => (
          <button key={a.id} type="button" className="chip" aria-pressed={f === a.id} onClick={() => pick(a.id)}>
            {a.label}
            <span className="chip-n">{a.id === "all" ? total : counts[a.id]}</span>
          </button>
        ))}
        <span className="sr-only" aria-live="polite">
          {f === "all" ? `Showing all ${total} projects` : `Showing ${n} ${label} projects`}
        </span>
      </div>
      {children}
    </div>
  );
}
