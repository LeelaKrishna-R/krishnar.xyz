import Link from "next/link";
import { links, site } from "../../lib/site";

export const metadata = {
  title: "Resume",
  description: "Krishna Ravuri's resume: Discord bots, homelab, an M.S. in AI from UNT, studying for the CCNA.",
};

// Built from the same facts as the rest of the site. The PDF download is the
// older version until a new one is made.
const experience = [
  {
    what: "Developer, Dexter AI",
    when: "2026 – now",
    where: "dexterai.dev",
    points: [
      "Rewrote the Dexter AI Discord community's bots in discord.js: four bots (community, moderation, automod and logging, support) and two music bots on Lavalink.",
      "One SQLite database shared by every process, 236 migrations so far; 2,500+ commits since May 2026.",
      "Runs on a VM in my own Proxmox homelab, along with a dashboard and the public site at dexterai.dev.",
    ],
  },
  {
    what: "Creator, Shero",
    when: "Apr 2021 – now",
    where: "sherobot.xyz",
    points: [
      "Discord bot in Node.js with MongoDB and Redis, plus a Next.js site.",
      "Checks servers for risky role and channel permissions and alerts staff to new ones. In 13,000+ servers.",
    ],
  },
  { what: "Intern, Caliber Embed", when: "May – Aug 2023", where: "Coimbatore, India", points: [] },
  { what: "System engineer, Diamond Pick", when: "May – Aug 2019", where: "Chennai, India", points: [] },
];

const projects = [
  ["Homelab", "Two-node Proxmox cluster: DNS, Caddy, Authelia, Prometheus, Grafana, Loki, backups on two servers, a monthly restore drill."],
  ["Friday", "A personal AI that reads my mail, calendar and homelab and sends a brief every morning and evening."],
  ["Iris", "A macOS desktop character that AI agents talk through, over MCP and hooks. Swift and Python."],
  ["net-triage", "LLM agent that diagnoses network logs with an eval set of 16 Cisco IOS cases (16/16)."],
  ["lazarus", "Homelab monitor that restarts failed services over SSH, with whitelisted commands only."],
  ["agent-budget", "npm package that tracks LLM token spend and refuses calls past a budget."],
];

const skills = [
  ["Languages", "JavaScript, TypeScript, Python, C, SQL"],
  ["Frameworks", "Node.js, discord.js, React, Next.js, Vue"],
  ["Data", "SQLite, PostgreSQL, MongoDB, Redis"],
  ["Infrastructure", "Linux, Proxmox, Docker, Caddy, Prometheus, Grafana, Cloudflare"],
  ["AI", "Anthropic SDK, MCP, evals"],
  ["Certification", "SAP ABAP NetWeaver 7.50"],
];

export default function ResumePage() {
  return (
    <article className="wrap narrow end resume">
      <header className="page-head">
        <h1>Krishna Ravuri</h1>
        <p className="lede">
          Denton, Texas ·{" "}
          <a className="inline" href={`mailto:${site.email}`}>
            {site.email}
          </a>{" "}
          ·{" "}
          <a className="inline" href={links.github}>
            GitHub
          </a>{" "}
          ·{" "}
          <a className="inline" href={links.linkedin}>
            LinkedIn
          </a>
        </p>
        <p className="resume-sum">
          I build Discord bots and small dev tools and run a two-node Proxmox homelab. M.S. in Artificial Intelligence
          from UNT. Studying for the CCNA, and looking for work in infrastructure, networking or dev tooling.
        </p>
        <div className="btns resume-btns">
          <a className="btn btn-gold" href="/resume/Leelakrishna-Ravuri-ATS.pdf" download>
            PDF (older version)
          </a>
          <a className="btn" href="/resume/resume-ats.txt" download>
            Plain text
          </a>
        </div>
      </header>

      <section className="r-block">
        <h2>Experience</h2>
        {experience.map((e) => (
          <div key={e.what} className="r-item">
            <div className="r-head">
              <b>{e.what}</b>
              <span>{e.when}</span>
            </div>
            <div className="r-where">{e.where}</div>
            {e.points.length ? (
              <ul>
                {e.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            ) : null}
          </div>
        ))}
      </section>

      <section className="r-block">
        <h2>Projects</h2>
        <dl className="defs">
          {projects.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
        <p className="r-more">
          More on the <Link className="inline" href="/work">work page</Link>.
        </p>
      </section>

      <section className="r-block">
        <h2>Education</h2>
        <div className="r-item">
          <div className="r-head">
            <b>M.S., Artificial Intelligence</b>
            <span>Dec 2025</span>
          </div>
          <div className="r-where">University of North Texas, Denton · minor in mathematics</div>
          <ul>
            <li>LLMs, natural language processing, machine learning algorithms, data analysis.</li>
          </ul>
        </div>
        <div className="r-item">
          <div className="r-head">
            <b>B.E., Electronics &amp; Communication Engineering</b>
            <span>May 2021</span>
          </div>
          <div className="r-where">Kalasalingam University, Madurai, India · minor in mathematics</div>
          <ul>
            <li>Embedded systems, VLSI, signal processing, digital image processing.</li>
          </ul>
        </div>
      </section>

      <section className="r-block">
        <h2>Skills</h2>
        <dl className="defs">
          {skills.map(([k, v]) => (
            <div key={k} style={{ display: "contents" }}>
              <dt>{k}</dt>
              <dd>{v}</dd>
            </div>
          ))}
        </dl>
      </section>
    </article>
  );
}
