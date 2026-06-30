"use client";
import { useEffect, useMemo, useState } from "react";

const USER = "LeelaKrishna-R";

// current + longest run of consecutive days with at least one contribution.
function streaks(days) {
  if (!Array.isArray(days) || !days.length) return { current: 0, longest: 0 };
  const sorted = [...days].sort((a, b) => (a.date < b.date ? -1 : 1));
  let longest = 0, run = 0;
  for (const d of sorted) {
    if ((d.count || 0) > 0) {
      run++;
      if (run > longest) longest = run;
    } else run = 0;
  }
  let current = 0;
  for (let i = sorted.length - 1; i >= 0; i--) {
    if ((sorted[i].count || 0) > 0) current++;
    else if (i === sorted.length - 1) continue; // today may not have a commit yet
    else break;
  }
  return { current, longest };
}

// Pulls public profile + contribution data straight from public APIs (no token,
// CORS-friendly), so the numbers next to the contribution graph always render live.
export default function GithubStats() {
  const [user, setUser] = useState(null);
  const [contrib, setContrib] = useState(null);
  const [days, setDays] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const [u, c] = await Promise.all([
          fetch(`https://api.github.com/users/${USER}`, { signal: ctrl.signal }),
          fetch(`https://github-contributions-api.jogruber.de/v4/${USER}?y=last`, {
            signal: ctrl.signal,
          }),
        ]);
        if (!u.ok) throw new Error("github");
        setUser(await u.json());
        if (c.ok) {
          const cd = await c.json();
          setContrib(cd?.total?.lastYear ?? null);
          setDays(cd?.contributions ?? null);
        }
      } catch (e) {
        if (e.name !== "AbortError") setFailed(true);
      }
    })();
    return () => ctrl.abort();
  }, []);

  const streak = useMemo(() => (days ? streaks(days) : null), [days]);

  const show = (v) => (typeof v === "number" ? v.toLocaleString() : failed ? "n/a" : "...");

  const stats = [
    { label: "Public repos", value: user?.public_repos },
    { label: "Followers", value: user?.followers },
    { label: "Contributions (1y)", value: contrib },
    { label: "Current streak", value: streak?.current },
    { label: "Longest streak", value: streak?.longest },
  ];

  return (
    <div className="gh-stats">
      {stats.map((s) => (
        <div className="gh-stat" key={s.label}>
          <div className="gh-stat-num">{show(s.value)}</div>
          <div className="gh-stat-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
