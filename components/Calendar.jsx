// The last year of GitHub contributions, drawn as an SVG on the server.
// Data: github-contributions-api.jogruber.de (levels 0-4, same as GitHub's).
const STEP = 14;
const CELL = 11;
const LEFT = 30;
const TOP = 18;
const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

function fmt(iso) {
  return new Date(iso + "T12:00:00Z").toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}

export default function Calendar({ days }) {
  if (!days?.length) return null;
  const firstDow = new Date(days[0].date + "T12:00:00Z").getUTCDay();
  const cells = days.map((d, i) => {
    const idx = i + firstDow;
    return { ...d, x: Math.floor(idx / 7), y: idx % 7 };
  });
  const weeks = cells[cells.length - 1].x + 1;
  const months = [];
  let last = -1;
  for (const c of cells) {
    const m = Number(c.date.slice(5, 7)) - 1;
    if (m !== last && c.y === 0 && c.x < weeks - 2) {
      months.push({ x: c.x, label: MONTHS[m] });
      last = m;
    }
  }
  const width = LEFT + weeks * STEP;
  const height = TOP + 7 * STEP;

  return (
    <svg viewBox={`0 0 ${width} ${height}`} role="img" aria-label="GitHub contributions over the last twelve months">
      {months.map((m) => (
        <text key={`${m.label}${m.x}`} x={LEFT + m.x * STEP} y={11}>
          {m.label}
        </text>
      ))}
      {[
        [1, "Mon"],
        [3, "Wed"],
        [5, "Fri"],
      ].map(([y, l]) => (
        <text key={l} x={0} y={TOP + y * STEP + 9}>
          {l}
        </text>
      ))}
      {cells.map((c) => (
        <rect
          key={c.date}
          className={`lvl${Math.max(0, Math.min(4, c.level ?? 0))}`}
          x={LEFT + c.x * STEP}
          y={TOP + c.y * STEP}
          width={CELL}
          height={CELL}
          rx={3}
        >
          <title>{`${c.count} contribution${c.count === 1 ? "" : "s"} on ${fmt(c.date)}`}</title>
        </rect>
      ))}
    </svg>
  );
}
