import Image from "next/image";
import Link from "next/link";
import CountUp from "../CountUp";
import StoryRail from "./StoryRail";
import { site } from "../../lib/site";

// The home page story: one scene per chapter. Each scene gets .in when it
// scrolls into view (components/ScrollFx.jsx) and its CSS animations play.
// Text is kept to a line or two per scene.

const bots = [
  { name: "Spark", job: "levels, games, economy", c: "#e9a934" },
  { name: "Warden", job: "moderation", c: "#d9603f" },
  { name: "Sentinel", job: "automod and logs", c: "#5b8c6a" },
  { name: "Steward", job: "tickets and modmail", c: "#3f7fa3" },
  { name: "Clarity", job: "music", c: "#a37ad9" },
  { name: "Cadence", job: "music", c: "#c9708f" },
];

// Fixed positions so the server cloud looks hand-placed, not random each load.
const servers = [
  [8, 22, "G"], [24, 8, "N"], [42, 18, "A"], [61, 6, "R"], [79, 20, "M"], [92, 8, "T"],
  [14, 52, "S"], [33, 44, "K"], [52, 48, "P"], [71, 42, "D"], [88, 50, "L"],
  [6, 82, "B"], [25, 76, "H"], [45, 84, "Z"], [64, 74, "C"], [82, 84, "F"],
];

const notes = [
  { when: "Oct 27", what: "disk full at 2:47 am", c: "#f6dc7c", r: "-6deg" },
  { when: "Nov 10", what: "7-minute power cut, no UPS", c: "#f4b8a4", r: "4deg" },
  { when: "Nov 12", what: "node2 stuck at 800 MHz", c: "#bfe0c8", r: "-3deg" },
];

export const chapters = [
  { id: "s-2019", label: "2019" },
  { id: "s-2021", label: "2021" },
  { id: "s-texas", label: "2025" },
  { id: "s-2026", label: "2026" },
  { id: "s-lab", label: "lab" },
  { id: "s-ai", label: "AI" },
  { id: "s-now", label: "now" },
];

function Scene({ id, year, flip, kicker, title, children, visual }) {
  return (
    <section className={`scene${flip ? " flip" : ""}`} id={id} data-scene aria-labelledby={`${id}-h`}>
      <span className="scene-year" aria-hidden="true">
        {year}
      </span>
      <div className="wrap scene-grid">
        <div className="scene-text">
          <p className="kicker">{kicker}</p>
          <h2 id={`${id}-h`}>{title}</h2>
          {children}
        </div>
        <div className="scene-visual">{visual}</div>
      </div>
    </section>
  );
}

export default function Story({ community }) {
  return (
    <div className="story">
      <StoryRail chapters={chapters} />

      <Scene
        id="s-2019"
        year="2019"
        kicker="2019 · Chennai"
        title="It started with Discord bots."
        visual={
          <div className="sticker chat" aria-hidden="true">
            <div className="chat-head">
              <span># general</span>
            </div>
            <div className="msg" style={{ "--d": "0.2s" }}>
              <span className="av" style={{ background: "#e9a934" }}>K</span>
              <div>
                <b>krishna</b>
                <p>!hello</p>
              </div>
            </div>
            <div className="msg" style={{ "--d": "0.9s" }}>
              <span className="av bot">B</span>
              <div>
                <b>
                  my first bot <i className="bot-tag">BOT</i>
                </b>
                <p>Hi! I&apos;m online.</p>
              </div>
            </div>
            <div className="msg" style={{ "--d": "1.6s" }}>
              <span className="av" style={{ background: "#e9a934" }}>K</span>
              <div>
                <b>krishna</b>
                <p>it works!!</p>
              </div>
            </div>
            <div className="typing" style={{ "--d": "2.2s" }}>
              <i />
              <i />
              <i />
            </div>
          </div>
        }
      >
        <p>I had a summer job as a system engineer and started making Discord bots. I haven&apos;t stopped since.</p>
      </Scene>

      <Scene
        id="s-2021"
        year="2021"
        flip
        kicker="2021"
        title="Then came Shero."
        visual={
          <div className="servers" aria-hidden="true">
            {servers.map(([x, y, l], i) => (
              <span key={i} className="srv" style={{ left: `${x}%`, top: `${y}%`, "--d": `${0.1 + i * 0.07}s` }}>
                {l}
              </span>
            ))}
            <div className="sticker srv-count">
              <b>
                <CountUp value={13000} />+
              </b>
              <span>servers</span>
            </div>
          </div>
        }
      >
        <p>A Discord bot I started that April. It&apos;s in more than 13,000 servers now.</p>
        <Link className="more" href="/work/shero">
          More about Shero →
        </Link>
      </Scene>

      <Scene
        id="s-texas"
        year="2025"
        kicker="2021 → 2025"
        title="India to Texas."
        visual={
          <svg className="route" viewBox="0 0 600 320" role="img" aria-label="A route from Madurai, India to Denton, Texas">
            <defs>
              <mask id="route-mask">
                <path className="route-draw" pathLength="1" d="M520 230 C 400 40, 200 40, 90 120" />
              </mask>
            </defs>
            <path className="route-line" d="M520 230 C 400 40, 200 40, 90 120" mask="url(#route-mask)" />
            <g className="pin pin-a">
              <circle cx="520" cy="230" r="9" />
              <text x="520" y="262" textAnchor="middle" className="pin-name">
                Madurai, India
              </text>
              <text x="520" y="284" textAnchor="middle" className="pin-sub">
                B.E., 2021
              </text>
            </g>
            <g className="pin pin-b">
              <circle cx="90" cy="120" r="9" />
              <text x="90" y="152" textAnchor="middle" className="pin-name">
                Denton, Texas
              </text>
              <text x="90" y="174" textAnchor="middle" className="pin-sub">
                M.S. in AI, 2025
              </text>
            </g>
            <text x="305" y="52" textAnchor="middle" className="route-km">
              about 9,400 miles
            </text>
            <g className="plane">
              <path d="M-12 0 L10 0 M2 -8 L10 0 L2 8 M-8 -5 L-4 0 L-8 5" />
            </g>
          </svg>
        }
      >
        <p>An engineering degree at Kalasalingam University, then a master&apos;s in AI at UNT in Denton.</p>
      </Scene>

      <Scene
        id="s-2026"
        year="2026"
        flip
        kicker="2026"
        title="Six bots, one Discord server."
        visual={
          <div className="bots" aria-hidden="true">
            {bots.map((b, i) => (
              <div key={b.name} className="sticker bot" style={{ "--d": `${0.1 + i * 0.12}s` }}>
                <span className="bot-av" style={{ background: b.c }}>
                  {b.name[0]}
                </span>
                <b>{b.name}</b>
                <span>{b.job}</span>
              </div>
            ))}
          </div>
        }
      >
        <p>This year I rewrote the bots for the Dexter AI community. Each one has its own job.</p>
        {community ? (
          <p className="live">
            <span className="dot-live" aria-hidden="true" />
            {community.members.toLocaleString("en-US")} members
            {community.online ? `, ${community.online.toLocaleString("en-US")} online right now` : ""}
          </p>
        ) : null}
        <Link className="more" href="/work/dexter">
          How they work →
        </Link>
      </Scene>

      <Scene
        id="s-lab"
        year="lab"
        kicker="At home"
        title="They run in my homelab."
        visual={
          <div className="lab" aria-hidden="true">
            <div className="lab-nodes">
              <div className="sticker lab-node">
                <span className="leds">
                  <i />
                  <i />
                </span>
                <b>node1</b>
                <span>the bots live here</span>
              </div>
              <div className="cable">
                <i />
                <i />
                <i />
              </div>
              <div className="sticker lab-node">
                <span className="leds">
                  <i />
                  <i />
                </span>
                <b>node2</b>
                <span>DNS, backups, Grafana</span>
              </div>
            </div>
            <div className="lab-notes">
              {notes.map((n, i) => (
                <div key={n.when} className="sticky" style={{ background: n.c, "--r": n.r, "--d": `${0.5 + i * 0.25}s` }}>
                  <b>{n.when}</b>
                  {n.what}
                </div>
              ))}
            </div>
          </div>
        }
      >
        <p>Two little Dell PCs running Proxmox. Things break, so I keep notes.</p>
        <Link className="more" href="/homelab#broke">
          See what broke →
        </Link>
      </Scene>

      <Scene
        id="s-ai"
        year="AI"
        flip
        kicker="On the side"
        title="Friday and Iris."
        visual={
          <div className="sticker desk" aria-hidden="true">
            <div className="desk-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="brief">
              <b>Friday · morning brief</b>
              <span className="bar" style={{ "--w": "82%", "--d": "0.4s" }} />
              <span className="bar" style={{ "--w": "64%", "--d": "0.6s" }} />
              <span className="bar" style={{ "--w": "73%", "--d": "0.8s" }} />
            </div>
            <div className="iris">
              <span className="bubble">task done!</span>
              <Image src="/work/iris-wave.webp" alt="" width={120} height={183} unoptimized />
            </div>
          </div>
        }
      >
        <p>Friday is an AI that looks after my day. Iris gives AI agents a face on the Mac desktop.</p>
        <p className="more-row">
          <Link className="more" href="/work/friday">
            Friday →
          </Link>
          <Link className="more" href="/work/iris">
            Iris →
          </Link>
        </p>
      </Scene>

      <Scene
        id="s-now"
        year="now"
        kicker="Now"
        title="Learning what's underneath."
        visual={
          <div className="subnets mono" aria-hidden="true">
            <div className="net" style={{ "--d": "0.1s" }}>
              10.0.0.0/24
            </div>
            <div className="net-row">
              <div className="net" style={{ "--d": "0.6s" }}>
                .0/25
              </div>
              <div className="net" style={{ "--d": "0.7s" }}>
                .128/25
              </div>
            </div>
            <div className="net-row">
              {[".0/26", ".64/26", ".128/26", ".192/26"].map((n, i) => (
                <div key={n} className="net" style={{ "--d": `${1.1 + i * 0.1}s` }}>
                  {n}
                </div>
              ))}
            </div>
          </div>
        }
      >
        <p>I&apos;m studying for the CCNA. Subnets, switching, routing.</p>
      </Scene>

      <section className="story-end" data-scene>
        <div className="wrap">
          <h2>That&apos;s the story so far.</h2>
          <div className="end-links">
            {[
              ["/work", "Work", "everything I've made"],
              ["/homelab", "Homelab", "the machines and what broke"],
              ["/blog", "Writing", "a few write-ups"],
              ["/about", "About", "the boring version"],
            ].map(([href, label, sub], i) => (
              <Link key={href} href={href} className="sticker end-link" style={{ "--d": `${i * 0.08}s` }}>
                <b>{label}</b>
                <span>{sub}</span>
              </Link>
            ))}
          </div>
          <p className="end-mail">
            Or just email me:{" "}
            <a className="inline" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </p>
        </div>
      </section>
    </div>
  );
}
