// A few lines of a tool's real output, cut but never reworded.
export default function Term({ lines, label }) {
  return (
    <pre className="term" aria-label={label} tabIndex={0}>
      {lines.map(([cls, text], i) => (
        <span key={i} className={cls || undefined}>
          {text}
          {"\n"}
        </span>
      ))}
    </pre>
  );
}
