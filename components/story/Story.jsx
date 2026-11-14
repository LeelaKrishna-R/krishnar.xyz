import Image from "next/image";
import Link from "next/link";
import CountUp from "../CountUp";
import StoryRail from "./StoryRail";
import { Scribble } from "../Icons";
import { site } from "../../lib/site";

// The home page story: one scene per chapter. A scene gets .in when its
// content scrolls into view (components/ScrollFx.jsx) and its CSS
// animations play. Every line here is a fact from the resume, the repos or
// the live sites; the only opinion ("subnetting drills are boring") is from
// my own blog post.

const bots = [
  { name: "Spark", job: "levels, games, the economy", img: "spark" },
  { name: "Warden", job: "moderation", img: "warden" },
  { name: "Sentinel", job: "automod, verification, logs", img: "sentinel" },
  { name: "Steward", job: "tickets and modmail", img: "steward" },
  { name: "Clarity", job: "music", img: "clarity" },
  { name: "Cadence", job: "more music", img: "cadence" },
];

// Fixed positions so the server cloud looks placed by hand, not random.
const servers = [
  [8, 22, "G"], [24, 8, "N"], [42, 16, "A"], [61, 6, "R"], [79, 20, "M"], [92, 8, "T"],
  [6, 52, "S"], [94, 50, "L"],
  [6, 84, "B"], [25, 90, "H"], [45, 86, "Z"], [64, 92, "C"], [82, 84, "F"],
];

const notes = [
  { when: "Oct 27", what: "disk full at 2:47 am", c: "#f6dc7c", r: "-6deg" },
  { when: "Nov 10", what: "7-minute power cut, no UPS", c: "#f4b8a4", r: "4deg" },
  { when: "Nov 12", what: "node2 stuck at 800 MHz", c: "#bfe0c8", r: "-3deg" },
];

// The rail shows real years; several scenes can share one.
export const chapters = [
  { label: "2019", ids: ["s-2019"] },
  { label: "2021", ids: ["s-2021"] },
  { label: "2025", ids: ["s-texas"] },
  { label: "2026", ids: ["s-2026", "s-lab", "s-ai"] },
  { label: "now", ids: ["s-now", "s-next"] },
];

function Scene({ id, year, flip, kicker, title, children, visual }) {
  return (
    <section className={`scene${flip ? " flip" : ""}`} id={id} data-scene aria-labelledby={`${id}-h`}>
      {year ? (
        <span className="scene-year" aria-hidden="true">
          {year}
        </span>
      ) : null}
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
        <p>
          I was studying engineering in Madurai and spent that summer at a job in Chennai. That&apos;s when I made my
          first Discord bot, and I&apos;ve been making them ever since.
        </p>
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
        <p>
          I started Shero that April, in Node.js with MongoDB and Redis behind it. It began as a way for servers to
          advertise each other. These days it checks servers for risky permissions, and it&apos;s in more than 13,000
          of them.
        </p>
        <Link className="more" href="/work/shero">
          More about Shero →
        </Link>
      </Scene>

      <Scene
        id="s-texas"
        kicker="2021 → 2025"
        title="Madurai to Texas."
        visual={
          <svg className="route" viewBox="0 0 640 340" role="img" aria-label="A route from Madurai to Coimbatore, then to Denton, Texas">
            <defs>
              <mask id="route-mask">
                <path className="route-draw" pathLength="1" d="M560 250 L512 222 C 420 40, 220 40, 96 132" />
              </mask>
            </defs>
            <path className="route-line" d="M560 250 L512 222 C 420 40, 220 40, 96 132" mask="url(#route-mask)" />
            <text x="318" y="58" textAnchor="middle" className="route-km">
              about 9,400 miles
            </text>
            <g className="pin pin-a">
              <circle cx="560" cy="250" r="9" />
              <text x="560" y="282" textAnchor="middle" className="pin-name">
                Madurai
              </text>
              <text x="560" y="303" textAnchor="middle" className="pin-sub">
                B.E., 2021
              </text>
            </g>
            <g className="pin pin-c">
              <circle cx="512" cy="222" r="7" />
              <text x="478" y="200" textAnchor="end" className="pin-name">
                Coimbatore
              </text>
              <text x="478" y="220" textAnchor="end" className="pin-sub">
                internship, 2023
              </text>
            </g>
            <g className="pin pin-b">
              <circle cx="96" cy="132" r="9" />
              <text x="96" y="164" textAnchor="middle" className="pin-name">
                Denton, Texas
              </text>
              <text x="96" y="185" textAnchor="middle" className="pin-sub">
                M.S. in AI, 2025
              </text>
            </g>
            <g className="plane">
              <path d="M-14 0 L14 0 M4 -11 L-2 0 L4 11 M-11 -5 L-8 0 L-11 5" />
            </g>
          </svg>
        }
      >
        <p>
          I finished my engineering degree in 2021 and did an internship at Caliber Embed in Coimbatore in 2023. Then I
          moved to Denton for a master&apos;s in AI at UNT, about 9,400 miles from Madurai.
        </p>
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
                <Image className="bot-av" src={`/work/bots/${b.img}.webp`} alt="" width={56} height={56} />
                <b>{b.name}</b>
                <span>{b.job}</span>
              </div>
            ))}
          </div>
        }
      >
        <p>
          This year I rewrote the bots for the Dexter AI Discord in discord.js. There are six of them now, each with one
          job, and the code is past 2,500 commits since May.
        </p>
        {community ? (
          <p className="live-pill">
            <span className="dot-live" aria-hidden="true" />
            {community.members.toLocaleString("en-US")} members
            {community.online ? ` · ${community.online.toLocaleString("en-US")} online` : ""}
          </p>
        ) : null}
        <Link className="more" href="/work/dexter">
          How they work →
        </Link>
      </Scene>

      <Scene
        id="s-lab"
        year="lab"
        kicker="2026 · at home"
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
        <p>
          Two little Dell PCs running Proxmox. Things break, and I write down what broke. One night a disk filled up at
          2:47 am and everything on it went read-only.
        </p>
        <Link className="more" href="/homelab#broke">
          See what else broke →
        </Link>
      </Scene>

      <Scene
        id="s-ai"
        year="AI"
        flip
        kicker="2026 · on the side"
        title="Friday and Iris."
        visual={
          <div className="sticker desk" aria-hidden="true">
            <div className="desk-bar">
              <i />
              <i />
              <i />
            </div>
            <div className="brief">
              <small>Friday · demo brief</small>
              <b>Good morning, Boss</b>
              <span className="brief-line" style={{ "--d": "0.5s" }}>
                3 things need your decision
              </span>
              <span className="brief-line" style={{ "--d": "0.75s" }}>
                2 on your calendar
              </span>
            </div>
            <div className="desk-iris">
              <span className="bubble">task done!</span>
              <Image src="/work/iris-wave.webp" alt="" width={120} height={183} unoptimized />
            </div>
          </div>
        }
      >
        <p>
          Friday is an AI I built for myself. She reads my mail and sends me a brief every morning and evening. Iris
          gives AI agents a face: a little character on the Mac desktop who talks for them.
        </p>
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
            <span className="note net-note">
              64 addresses each <Scribble />
            </span>
          </div>
        }
      >
        <p>
          I&apos;m studying for the CCNA, because I want to understand the network under everything I run. Subnetting
          drills are boring, but everything else sits on top of them.
        </p>
      </Scene>

      <section className="story-end" id="s-next" data-scene aria-labelledby="s-next-h">
        <div className="wrap">
          <p className="kicker">What&apos;s next</p>
          <h2 id="s-next-h">I&apos;m looking for work.</h2>
          <p className="end-lede">
            Infrastructure, networking or dev tooling. If you&apos;re hiring for any of that, I&apos;d like to hear from
            you.
          </p>
          <div className="btns end-btns">
            <Link className="btn btn-gold" href="/resume">
              My resume
            </Link>
            <a className="btn" href={`mailto:${site.email}`}>
              {site.email}
            </a>
          </div>
          <div className="end-links">
            {[
              ["/work", "Work", "everything I've made"],
              ["/homelab", "Homelab", "the machines and what broke"],
              ["/blog", "Writing", "a few write-ups"],
              ["/about", "About", "the short bio"],
            ].map(([href, label, sub], i) => (
              <Link key={href} href={href} className="sticker end-link" style={{ "--d": `${0.3 + i * 0.08}s` }}>
                <b>{label}</b>
                <span>{sub}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
