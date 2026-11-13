import { ArrowUpRight } from "./Icons";

// A small tool: name, one paragraph, and a few lines of what it prints.
// In a link card the snippet wraps (nothing inside a link should need
// scrolling); on its own it scrolls and can take keyboard focus.
export function Term({ lines, label, clip = false }) {
  return (
    <pre className={`term${clip ? " clip" : ""}`} aria-label={label} tabIndex={clip ? undefined : 0}>
      {lines.map(([cls, text], i) => (
        <span key={i} className={cls || undefined}>
          {text}
          {clip ? null : "\n"}
        </span>
      ))}
    </pre>
  );
}

export default function ToolCard({ t, tilt }) {
  return (
    <a className="sticker tool" href={t.href} data-reveal style={{ "--tilt": tilt }}>
      <h4>
        {t.name} <ArrowUpRight />
      </h4>
      <p>{t.summary}</p>
      <Term lines={t.term} label={`Example output from ${t.name}`} clip />
      <div className="chips">
        {t.tags.map((x) => (
          <span key={x} className="chip">
            {x}
          </span>
        ))}
      </div>
    </a>
  );
}
