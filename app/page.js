import Image from "next/image";
import Link from "next/link";
import SectionHead from "../components/SectionHead";
import Marker from "../components/Marker";
import CountUp from "../components/CountUp";
import Calendar from "../components/Calendar";
import ProjectCard from "../components/ProjectCard";
import ToolCard from "../components/ToolCard";
import { GitHub, LinkedIn, XLogo, Mail, ArrowRight, Scribble } from "../components/Icons";
import { projects, tools } from "../lib/projects";
import { nodes, figures, incidents } from "../lib/lab";
import { timeline } from "../lib/timeline";
import { getAllPosts, formatDate } from "../lib/posts";
import { getGithub, getCommunity } from "../lib/live";
import { links, site } from "../lib/site";

// Live numbers are refreshed at most every ten minutes.
export const revalidate = 600;

const TILTS = ["-0.6deg", "0.5deg", "0.4deg", "-0.5deg", "0.3deg"];

export default async function Home() {
  const [gh, community, posts] = await Promise.all([getGithub(), getCommunity(), getAllPosts()]);

  return (
    <>
      {/* ---------- hero ---------- */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div>
            <span className="status">
              <i className="dot-live" aria-hidden="true" /> Studying for the CCNA
            </span>
            <h1 className="in">
              <span className="line">Leelakrishna</span>
              <span className="line">
                <Marker>Ravuri</Marker>
              </span>
            </h1>
            <p className="lede">
              I build <strong>Discord bots</strong>, a personal AI called <strong>Friday</strong>, and small
              developer tools. The bots run on a <strong>homelab</strong> I keep at home. I have an M.S. in Artificial Intelligence from the
              University of North Texas.
            </p>
            <div className="cta">
              <a className="btn btn-gold" href="#work">
                See my work <ArrowRight />
              </a>
              <a className="btn" href={`mailto:${site.email}`}>
                Email me
              </a>
            </div>
            <div className="socials">
              <a className="icon-btn" href={links.github} aria-label="GitHub">
                <GitHub />
              </a>
              <a className="icon-btn" href={links.linkedin} aria-label="LinkedIn">
                <LinkedIn />
              </a>
              <a className="icon-btn" href={links.x} aria-label="X">
                <XLogo />
              </a>
              <a className="icon-btn" href={`mailto:${site.email}`} aria-label="Email">
                <Mail />
              </a>
            </div>
          </div>

          <div className="id-wrap">
            <div className="id-float">
              <div className="sticker id-card">
                <span className="tape" aria-hidden="true" />
                <div className="id-photo">
                  <Image
                    src="/images/me.webp"
                    alt="An illustrated portrait of Leelakrishna Ravuri"
                    width={640}
                    height={640}
                    priority
                    sizes="(max-width: 900px) 320px, 360px"
                  />
                </div>
                <div className="id-name">Leelakrishna Ravuri</div>
                <dl className="id-rows">
                  <dt>based in</dt>
                  <dd>Denton, Texas</dd>
                  <dt>from</dt>
                  <dd>India</dd>
                  <dt>degree</dt>
                  <dd>M.S. AI, UNT</dd>
                </dl>
              </div>
            </div>
            <span className="note id-note">
              me, Ghibli-style
              <Scribble />
            </span>
            {community ? (
              <a className="sticker live-card" href="https://discord.gg/dexterai">
                <i className="dot-live" aria-hidden="true" />
                <span>
                  <b>{community.members.toLocaleString("en-US")}</b>
                  <small>
                    in the Dexter AI community
                    {community.online ? <><br />{community.online.toLocaleString("en-US")} online now</> : null}
                  </small>
                </span>
              </a>
            ) : null}
          </div>
        </div>
      </section>

      {/* ---------- work ---------- */}
      <section className="section" id="work">
        <div className="wrap">
          <SectionHead
            path="~/work"
            before="Things I've "
            mark="built"
            lede="The bigger projects first, then five small tools: three for running servers, one for network logs, one for LLM costs."
          />
          <div className="work-grid">
            {projects.map((p, i) => (
              <ProjectCard key={p.slug} p={p} community={community} tilt={TILTS[i % TILTS.length]} />
            ))}
          </div>

          <div className="tools-head" data-reveal>
            <h3>Small tools</h3>
          </div>
          <div className="tools-grid">
            {tools.map((t, i) => (
              <ToolCard key={t.name} t={t} tilt={TILTS[(i + 2) % TILTS.length]} />
            ))}
            <Link className="sticker tool tool-more" href="/projects" data-reveal>
              <b>All projects</b>
              <p>More detail on each one, plus an older engineering project.</p>
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* ---------- homelab ---------- */}
      <section className="section section-band" id="homelab">
        <div className="wrap">
          <SectionHead path="~/lab" before="The " mark="homelab" />
          <div className="lab-grid">
            <div className="lab-copy" data-reveal>
              <p>
                Two Dell micro PCs in a <strong>Proxmox cluster</strong>. node1 runs production, including the VM the
                Dexter bots live on. node2 runs DNS, the reverse proxy, monitoring, backups, media and Home Assistant.
              </p>
              <p>
                Alerts go to my phone. Nightly backups go to a backup server on node1, and node2 keeps a two-day copy
                of node1's machines, bots included. When something breaks, it goes in the log below.
              </p>
              <div className="lab-figures">
                {figures.map((f) => (
                  <div key={f.label}>
                    <b>{f.value}</b>
                    <span>{f.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rack">
              {nodes.map((n) => (
                <div key={n.name} data-reveal>
                  <div className="sticker node">
                    <div className="node-head">
                      <h3>
                        <span className="leds" aria-hidden="true">
                          <i />
                          <i />
                        </span>
                        {n.name}
                      </h3>
                      <span className="spec">{n.spec.split(" · ").slice(1).join(" · ")}</span>
                    </div>
                    <p className="role">{n.role}</p>
                    <div className="guests">
                      {n.guests.map((g) => (
                        <span key={g.label} className={`guest${g.vm ? " vm" : ""}`}>
                          {g.label}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="tools-head" data-reveal>
            <h3>What broke lately</h3>
            <Link className="more-link" href="/homelab">
              The whole lab →
            </Link>
          </div>
          <ol className="log">
            {incidents.slice(0, 3).map((x) => (
              <li key={x.date} className="sticker" data-reveal>
                <time dateTime={x.date}>{x.date}</time>
                <div>
                  <h3>{x.title}</h3>
                  <p>
                    {x.text} <b>Fix:</b> {x.fix}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- github ---------- */}
      {gh.days || gh.repos !== null ? (
        <section className="section" id="github">
          <div className="wrap">
            <SectionHead
              path="~/commits"
              before="A year on "
              mark="GitHub"
              lede="Pulled live from GitHub. Most of the work is in private repositories, which is why the graph is busier than the repo count."
            />
            <div className="stats">
              {[
                { v: gh.lastYear, l: "contributions in the last year" },
                { v: gh.longest, l: "days, longest streak" },
                { v: gh.current, l: "days, current streak" },
                { v: gh.repos, l: "public repositories" },
              ]
                .filter((s) => typeof s.v === "number")
                .map((s, i) => (
                  <div key={s.l} className="sticker stat" data-reveal style={{ "--tilt": TILTS[i] }}>
                    <b>
                      <CountUp value={s.v} />
                    </b>
                    <span>{s.l}</span>
                  </div>
                ))}
            </div>
            {gh.days ? (
              <div className="sticker calendar" data-reveal>
                <div className="calendar-scroll">
                  <Calendar days={gh.days} />
                </div>
                <div className="calendar-foot">
                  <a href={links.github}>github.com/LeelaKrishna-R</a>
                  <span className="legend">
                    less
                    <i className="lvl0" style={{ background: "color-mix(in srgb, var(--ink) 7%, transparent)" }} />
                    <i style={{ background: "color-mix(in srgb, var(--gold) 35%, transparent)" }} />
                    <i style={{ background: "color-mix(in srgb, var(--gold) 60%, transparent)" }} />
                    <i style={{ background: "var(--gold)" }} />
                    <i style={{ background: "var(--coral)" }} />
                    more
                  </span>
                </div>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      {/* ---------- path ---------- */}
      <section className="section section-band" id="path">
        <div className="wrap">
          <SectionHead path="~/path" before="How I got " mark="here" />
          <div className="timeline">
            <div className="timeline-line" aria-hidden="true">
              <i />
            </div>
            {timeline.map((t) => (
              <div key={t.title} className={`tl${t.now ? " tl-now" : ""}`} data-reveal style={{ "--c": t.color }}>
                <span className="tl-dot" aria-hidden="true" />
                <div className="sticker tl-card">
                  <div className="tl-when">{t.when}</div>
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- writing ---------- */}
      <section className="section" id="writing">
        <div className="wrap">
          <SectionHead path="~/writing" before="Notes from the " mark="build">
            <Link className="more-link" href="/blog">
              All posts →
            </Link>
          </SectionHead>
          <div className="posts">
            {posts.slice(0, 3).map((p, i) => (
              <Link
                key={p.slug}
                href={`/blog/${p.slug}`}
                className="sticker post-card"
                data-reveal
                style={{ "--tilt": TILTS[(i + 1) % TILTS.length] }}
              >
                <time dateTime={p.date}>
                  {formatDate(p.date)} · {p.minutes} min
                </time>
                <h3>{p.title}</h3>
                <p>{p.excerpt}</p>
                <span className="read">Read →</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- contact ---------- */}
      <section className="section" id="contact" style={{ paddingTop: 0, paddingBottom: "clamp(64px, 8vw, 104px)" }}>
        <div className="wrap">
          <div className="sticker contact-card" data-reveal>
            <div>
              <span className="path-label">~/contact</span>
              <h2 style={{ marginTop: 18 }}>
                Say <Marker>hello</Marker>
              </h2>
              <p>
                I'm open to work in infrastructure, networking and developer tooling. Email is the fastest way to
                reach me.
              </p>
            </div>
            <div className="contact-actions">
              <a className="email" href={`mailto:${site.email}`}>
                {site.email}
              </a>
              <div className="cta" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 8 }}>
                <Link className="btn btn-gold" href="/contact">
                  Send a message
                </Link>
                <a className="btn" href={links.linkedin}>
                  LinkedIn
                </a>
                <Link className="btn" href="/resume">
                  Resume
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
