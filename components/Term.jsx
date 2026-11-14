// A few lines of a tool's real output, cut but never reworded. When it
// scrolls into view, commands type themselves out and output lines follow.
export default function Term({ lines, label }) {
  let t = 0.2;
  return (
    <pre className="term" aria-label={label} tabIndex={0} data-scene>
      {lines.map(([cls, text], i) => {
        const typed = cls === "p" || text.startsWith("$ ");
        const dur = typed ? Math.min(1.1, 0.025 * text.length) : 0;
        const style = { "--d": `${t.toFixed(2)}s`, "--t": `${dur.toFixed(2)}s`, "--n": Math.max(1, text.length) };
        t += typed ? dur + 0.25 : 0.15;
        return (
          <span key={i} className={`${cls || ""} t-line${typed ? " t-typed" : ""}`.trim()} style={style}>
            {text || " "}
          </span>
        );
      })}
    </pre>
  );
}
