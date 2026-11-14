import Image from "next/image";
import Link from "next/link";
import CountUp from "../CountUp";
import StoryRail from "./StoryRail";
import { Scribble } from "../Icons";
import Sfx from "../Sfx";
import { site } from "../../lib/site";

// The home page story, cut like a short film: seven scenes, grouped by
// place, then the credits. A scene gets .in when its content scrolls into
// view (components/ScrollFx.jsx) and its CSS animations play. Every line is
// a fact from the resume, the repos, the live sites or Krishna himself; the
// only opinion ("subnetting drills are boring") is from his own blog post.

const bots = [
  { name: "Spark", img: "spark" },
  { name: "Warden", img: "warden" },
  { name: "Sentinel", img: "sentinel" },
  { name: "Steward", img: "steward" },
  { name: "Clarity", img: "clarity" },
  { name: "Cadence", img: "cadence" },
];

// Fixed positions so the server cloud looks placed by hand, not random.
const servers = [
  [8, 22, "G"], [24, 8, "N"], [42, 16, "A"], [61, 6, "R"], [79, 20, "M"], [92, 8, "T"],
  [6, 52, "S"], [94, 50, "L"],
  [6, 84, "B"], [25, 90, "H"], [45, 86, "Z"], [64, 92, "C"], [82, 84, "F"],
];

// The rail shows real years; several scenes can share one.
export const chapters = [
  { label: "2019", ids: ["s-2019"] },
  { label: "2021", ids: ["s-2021"] },
  { label: "2025", ids: ["s-texas"] },
  { label: "2026", ids: ["s-dexter", "s-home", "s-side"] },
  { label: "now", ids: ["s-now"] },
];

function Scene({ id, n, year, flip, kicker, title, children, visual, sfx }) {
  return (
    <section className={`scene${flip ? " flip" : ""}`} id={id} data-scene aria-labelledby={`${id}-h`}>
      {year ? (
        <span className="scene-year" aria-hidden="true">
          {year}
        </span>
      ) : null}
      <div className="wrap scene-grid">
        <div className="scene-text">
          <p className="kicker">
            <span className="slate" aria-hidden="true">
              <span className="slate-top" />
              scene {String(n).padStart(2, "0")}
            </span>
            {kicker}
          </p>
          <h2 id={`${id}-h`}>{title}</h2>
          {children}
        </div>
        <div className="scene-visual">
          {visual}
          {sfx ? <Sfx {...sfx} /> : null}
        </div>
      </div>
    </section>
  );
}

function Mic() {
  return (
    <svg className="mic-ico" viewBox="0 0 24 24" aria-hidden="true">
      <rect x="9" y="3" width="6" height="11" rx="3" />
      <path d="M6 11a6 6 0 0 0 12 0M12 17v4" />
    </svg>
  );
}

export default function Story({ community }) {
  return (
    <div className="story">
      <StoryRail chapters={chapters} />

      <Scene
        id="s-2019"
        sfx={{"text":"BEEP!","color":"#f2c76b","rotate":8,"delay":"1.05s","style":{"right":"-18px","top":"36%"}}}
        n={1}
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
        sfx={{"text":"WHOA!","color":"#bfe0c8","rotate":-10,"delay":"1.3s","style":{"left":"-8%","top":"-16%"}}}
        n={2}
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
        sfx={{"text":"WHOOSH!","color":"#c9d7f2","rotate":-6,"delay":"0.9s","size":1.1,"style":{"left":"2%","top":"4%"}}}
        n={3}
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
            <text x="372" y="58" textAnchor="middle" className="route-km">
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
        id="s-dexter"
        sfx={{"text":"DING!","color":"#f4b8a4","rotate":10,"delay":"1.75s","style":{"right":"-22px","top":"24%"}}}
        n={4}
        year="2026"
        flip
        kicker="2026 · at Dexter AI"
        title="I work on Dexter Copilot."
        visual={
          <div className="dexter-shot" aria-hidden="true">
            <div className="sticker stream">
              <div className="stream-bar">
                <span className="live-tag">
                  <i className="rec" />
                  LIVE
                </span>
                <span>minecraft · day 12</span>
              </div>
              <div className="stream-body">
                <div className="say me" style={{ "--d": "0.2s" }}>
                  <span className="mic">
                    <Mic />
                  </span>
                  ask chat, minecraft or fortnite?
                </div>
                <div className="say dex" style={{ "--d": "1s" }}>
                  <b>Dexter</b> poll is live, 60 seconds on the clock
                </div>
                <div className="poll" style={{ "--d": "1.6s" }}>
                  <div className="poll-row">
                    <span>minecraft</span>
                    <i style={{ "--w": "71%" }} />
                  </div>
                  <div className="poll-row">
                    <span>fortnite</span>
                    <i style={{ "--w": "29%" }} />
                  </div>
                </div>
              </div>
              <span className="stream-cap">lines from Dexter&apos;s demo</span>
            </div>
            <div className="cast">
              <span className="note cast-note">and the cast in its Discord</span>
              <div className="cast-row">
                {bots.map((b, i) => (
                  <span key={b.name} className="cast-member" style={{ "--d": `${1.4 + i * 0.08}s` }} title={b.name}>
                    <Image src={`/work/bots/${b.img}.webp`} alt="" width={52} height={52} />
                    <small>{b.name}</small>
                  </span>
                ))}
              </div>
            </div>
          </div>
        }
      >
        <p>
          I&apos;m a developer at Dexter AI, on Dexter Copilot: a voice-controlled AI cohost for streamers. Say a
          sentence and it runs OBS, moderates chat, starts polls and giveaways, and designs your overlays.
        </p>
        <p>I also rewrote the six bots that run its Discord community.</p>
        {community ? (
          <p className="live-pill">
            <span className="dot-live" aria-hidden="true" />
            {community.members.toLocaleString("en-US")} members
            {community.online ? ` · ${community.online.toLocaleString("en-US")} online` : ""}
          </p>
        ) : null}
        <p className="more-row">
          <Link className="more" href="/work/copilot">
            Copilot →
          </Link>
          <Link className="more" href="/work/dexter">
            The bots →
          </Link>
        </p>
      </Scene>

      <Scene
        id="s-home"
        sfx={{"text":"WHIRRR","color":"#f2c76b","rotate":-9,"delay":"0.9s","style":{"left":"-34px","top":"38%"}}}
        n={5}
        year="home"
        kicker="2026 · at home"
        title="A homelab and a busy GPU."
        visual={
          <div className="home-shot" aria-hidden="true">
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
            <div className="models">
              <div className="sticker gpu">
                <div className="fans">
                  {[0, 1].map((k) => (
                    <svg key={k} className="fan" viewBox="-20 -20 40 40">
                      <circle r="18" />
                      <path d="M0 0 C 6 -6, 4 -15, 0 -16 C -3 -10, -3 -4, 0 0 Z" />
                      <path d="M0 0 C 6 -6, 4 -15, 0 -16 C -3 -10, -3 -4, 0 0 Z" transform="rotate(120)" />
                      <path d="M0 0 C 6 -6, 4 -15, 0 -16 C -3 -10, -3 -4, 0 0 Z" transform="rotate(240)" />
                      <circle className="hub" r="3.5" />
                    </svg>
                  ))}
                </div>
                <span className="gpu-label">my GPU, busy</span>
              </div>
              <div className="sticker loss">
                <svg viewBox="0 0 260 150">
                  <path className="axis" d="M30 10 V 125 H 250" />
                  <path className="curve" pathLength="1" d="M34 22 C 60 30, 70 70, 100 88 S 160 108, 190 113 S 230 117, 248 118" />
                  <text x="38" y="14">loss</text>
                  <text x="212" y="142">epochs</text>
                </svg>
                <span className="training">
                  training
                  <i />
                  <i />
                  <i />
                </span>
              </div>
            </div>
          </div>
        }
      >
        <p>
          Two little Dell PCs running Proxmox keep my bots up, and a GPU at home trains and runs my own models. Things
          break, and I write down what broke. One night a disk filled up at 2:47 am and everything on it went read-only.
        </p>
        <Link className="more" href="/homelab">
          The homelab, and what broke →
        </Link>
      </Scene>

      <Scene
        id="s-side"
        sfx={{"text":"THUD!","color":"#f4b8a4","rotate":7,"delay":"2.05s","style":{"left":"34%","bottom":"-18px"}}}
        n={6}
        year="side"
        flip
        kicker="2026 · on the side"
        title="Friday, Iris, and work I can't show you."
        visual={
          <div className="side-shot" aria-hidden="true">
            <div className="sticker desk">
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
            <div className="sticker folder" style={{ "--d": "1.2s", "--r": "-5deg" }}>
              <span className="folder-tab">client work</span>
              <i style={{ width: "84%" }} />
              <i style={{ width: "62%" }} />
              <i style={{ width: "72%" }} />
              <span className="stamp">NDA</span>
            </div>
          </div>
        }
      >
        <p>
          Friday is an AI I built for myself: she reads my mail and sends me a brief every morning and evening. Iris gives
          AI agents a face, a little character on the Mac desktop who talks for them.
        </p>
        <p>I&apos;ve also built several projects for clients. They&apos;re under NDA, so the folder stays shut.</p>
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
        sfx={{"text":"AHA!","color":"#bfe0c8","rotate":9,"delay":"1.6s","style":{"right":"-14px","top":"-14%"}}}
        n={7}
        year="now"
        kicker="Now"
        title="Learning networking, properly."
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
              {[".0/26", ".64/26", ".128/26", ".192/26"].map((v, i) => (
                <div key={v} className="net" style={{ "--d": `${1.1 + i * 0.1}s` }}>
                  {v}
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

      <section className="credits" id="s-next" data-scene aria-labelledby="s-next-h">
        <div className="wrap">
          <div className="roll" aria-label="Credits">
            {[
              ["starring", "Krishna Ravuri"],
              ["and", "Dexter Copilot"],
              ["featuring", "Spark · Warden · Sentinel · Steward · Clarity · Cadence"],
              ["also starring", "Shero · Friday · Iris"],
              ["filmed on location in", "Chennai · Madurai · Coimbatore · Denton"],
              ["special effects", "two Dell OptiPlex micro PCs and one busy GPU"],
            ].map(([role, who], i) => (
              <div key={role} className="credit" style={{ "--d": `${0.15 + i * 0.2}s` }}>
                <span className="role">{role}</span>
                <span className="who">{who}</span>
              </div>
            ))}
            <p className="credit true" style={{ "--d": "1.4s" }}>
              based on a true story
            </p>
          </div>

          <h2 id="s-next-h" className="tbc">
            To be continued<span className="dots">...</span>
          </h2>
          <p className="end-lede">
            The next chapter needs a team. I&apos;m looking for work in infrastructure, networking or dev tooling.
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
              <Link key={href} href={href} className="sticker end-link" style={{ "--d": `${2 + i * 0.08}s` }}>
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
