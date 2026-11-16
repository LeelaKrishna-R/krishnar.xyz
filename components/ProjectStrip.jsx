import Link from "next/link";
import { projects } from "../lib/projects";

// The home page's moving shelf of projects: one sticker per project in its
// own colour (data-hue), drifting sideways while each one bobs and its dot
// pulses. It pauses under the pointer or keyboard focus; with reduced motion
// it is a still, wrapped row. The second copy only exists to make the loop
// seamless, so it is hidden from screen readers and the tab order.
const SHORT = {
  copilot: "AI cohost for streamers",
  dexter: "six Discord bots",
  friday: "my personal AI",
  iris: "a face for AI agents",
  shero: "13,000+ servers",
  syntaxhost: "a hosting platform I built",
  "net-triage": "reads router logs",
  lazarus: "restarts what falls over",
  "agent-budget": "caps what AI agents spend",
  "homelab-audit": "lints compose files",
  "homelab-harden": "checks Linux servers",
};

function Row({ copy }) {
  return (
    <ul className="ps-row" aria-hidden={copy || undefined}>
      {projects.map((p, i) => (
        <li key={p.slug} className="ps-item" style={{ "--i": i }}>
          <Link href={`/work/${p.slug}`} className="ps-chip" data-hue={p.slug} tabIndex={copy ? -1 : undefined}>
            <span className="ps-dot" aria-hidden="true" />
            <b>{p.name}</b>
            <small>{SHORT[p.slug]}</small>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function ProjectStrip() {
  return (
    <section className="ps" aria-labelledby="ps-h" data-scene>
      <p id="ps-h" className="note ps-note">
        things I&apos;ve made
      </p>
      <div className="ps-window">
        <div className="ps-track">
          <Row />
          <Row copy />
        </div>
      </div>
    </section>
  );
}
