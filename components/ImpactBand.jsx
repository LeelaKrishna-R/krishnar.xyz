import Link from "next/link";
import CountUp from "./CountUp";

// "By the numbers" on the home page: a few real figures, each counting up the
// first time it scrolls into view and linking to the work behind it. Each card
// wears its project's colour (data-hue). The Discord member count is live.
export default function ImpactBand({ members }) {
  const items = [
    { n: 13000, plus: true, label: "servers run Shero, the bot I started in 2021", href: "/work/shero", hue: "shero" },
    { n: members || 3500, plus: !members, label: "members in the Discord community my bots run", href: "/work/dexter", hue: "dexter" },
    { n: 2600, plus: true, label: "commits on those bots since the rewrite in May", href: "/work/dexter", hue: "dexter" },
    { n: 16, of: 16, label: "real Cisco fault cases net-triage gets right", href: "/work/net-triage", hue: "net-triage" },
    { n: 18, label: "health checks a minute across my homelab", href: "/homelab" },
    { n: 65, label: "tests behind lazarus, which restarts what falls over", href: "/work/lazarus", hue: "lazarus" },
  ];
  return (
    <section className="impact" aria-labelledby="impact-h">
      <div className="wrap">
        <h2 id="impact-h" className="note impact-note">
          by the numbers
        </h2>
        <ul className="impact-grid">
          {items.map((it, i) => (
            <li key={it.label} data-reveal style={{ "--i": i }}>
              <Link href={it.href} className="impact-card" data-hue={it.hue}>
                <span className="impact-n">
                  <CountUp value={it.n} />
                  {it.of ? <span className="impact-of">/{it.of}</span> : null}
                  {it.plus ? <span className="impact-plus">+</span> : null}
                </span>
                <span className="impact-label">{it.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
