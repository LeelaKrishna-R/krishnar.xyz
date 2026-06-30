"use client";
import Link from "next/link";
import BackToTop from "../components/BackToTop";
import SocialBar from "../components/SocialBar";
import ContribGraph from "../components/ContribGraph";
import GithubStats from "../components/GithubStats";
import TypingText from "../components/TypingText";
import RevealUp from "../components/RevealUp";
import { featuredProjects } from "../lib/projects";

const work = [
  {
    group: "Hands-on",
    note: "Built real things with these",
    items: ["JavaScript", "Node.js", "discord.js", "Linux", "Git"],
  },
  {
    group: "Building with",
    note: "Shipping projects, still leveling up",
    items: ["Python", "TypeScript", "Anthropic SDK"],
  },
  {
    group: "Learning now",
    note: "Where I'm headed next",
    items: ["Networking", "CCNA", "Infrastructure"],
  },
];

export default function HomePage() {
  return (
    <div>
      <main>
        <RevealUp />
        {/* HERO */}
        <section className="hero" style={{ borderTop: "none" }}>
          <div className="container">
            <div className="hero-grid">
              {/* Left */}
              <div>
                <span className="kicker">
                  Systems integration → infrastructure &amp; networking
                </span>
                <TypingText
                  className="title"
                  text="I keep real systems alive, and build small tools when they break too often."
                />
                <p className="subtitle">
                  I run a homelab, and most of what I make starts there: something falls over one
                  too many times, so I build a tool to deal with it. I lean on AI where it
                  genuinely helps, and I try to be honest about what I'm still figuring out.
                </p>

                <div className="status-row">
                  <Link className="status-pill" href="/homelab">Homelab</Link>
                  <span className="status-pill">Studying for CCNA</span>
                  <span className="status-pill">MS in AI, UNT</span>
                </div>

                <div className="cta">
                  <Link className="btn btn-primary" href="/projects">
                    View projects
                  </Link>
                  <Link className="btn" href="/contact">
                    Get in touch
                  </Link>
                </div>

                <div style={{ marginTop: 20 }}>
                  <SocialBar />
                </div>
              </div>

              {/* Right */}
              <aside aria-label="Profile" style={{ display: "grid", gap: 16 }}>
                <div className="hero-card" style={{ padding: 16 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <img className="pfp" src="/images/me-ghibli.png" alt="Leelakrishna Ravuri" />
                    <div>
                      <div style={{ fontWeight: 700 }}>Leelakrishna Ravuri</div>
                      <div style={{ color: "var(--muted)" }}>Based in USA · from India</div>
                    </div>
                  </div>

                  <div className="meta" style={{ marginTop: 12, lineHeight: 1.5 }}>
                    <div className="m">
                      <b>Focus</b> Homelab, infra, dev tooling
                    </div>
                    <div className="m">
                      <b>Learning</b> Networking, CCNA
                    </div>
                    <div className="m">
                      <b>Currently</b> Dev at dexterai.org
                    </div>
                    <div className="m">
                      <b>Email</b>{" "}
                      <a href="mailto:email@krishnar.xyz">email@krishnar.xyz</a>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        {/* WHAT I WORK WITH */}
        <section className="reveal-up">
          <div className="container">
            <h2 className="section-title">What I actually work with</h2>
            <p className="subtitle" style={{ maxWidth: "60ch", marginBottom: 20 }}>
              The honest version: what I reach for, what I'm building with, and what I'm actively
              learning. No proficiency bars, nothing I've touched once and listed as a skill.
            </p>
            <div className="skills-grid">
              {work.map((g) => (
                <div className="skill-box" key={g.group} style={{ cursor: "default" }}>
                  <div className="work-head">
                    <h3>{g.group}</h3>
                    <p className="muted">{g.note}</p>
                  </div>
                  <div className="skill-pills">
                    {g.items.map((s) => (
                      <span className="skill-pill" key={s}>
                        <span className="label">{s}</span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FEATURED PROJECTS */}
        <section className="reveal-up">
          <div className="container">
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: 16,
                flexWrap: "wrap",
              }}
            >
              <h2 className="section-title" style={{ marginBottom: 0 }}>
                Pinned projects
              </h2>
              <Link href="/projects" className="small" style={{ fontWeight: 600 }}>
                See all projects →
              </Link>
            </div>
            <div className="feature-grid" style={{ marginTop: 20 }}>
              {featuredProjects.map((p) => (
                <a
                  className="feature-card"
                  key={p.title}
                  href={p.links[0].href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="tags">
                    {p.tags.map((t) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* GITHUB */}
        <section className="reveal-up">
          <div className="container">
            <h2 className="section-title">My GitHub</h2>
            <p className="subtitle" style={{ maxWidth: "62ch", marginBottom: 20 }}>
              The last year of commits. Most of it is the homelab tooling and the projects above.
            </p>
            <div style={{ marginBottom: 18 }}>
              <GithubStats />
            </div>
            <div className="contrib-wrap">
              <ContribGraph />
            </div>
          </div>
        </section>

        {/* CONTACT CTA */}
        <section className="reveal-up">
          <div className="container">
            <div className="contact-card" style={{ textAlign: "center" }}>
              <h2 className="section-title" style={{ marginBottom: 8 }}>
                Get in touch
              </h2>
              <p className="subtitle" style={{ margin: "0 auto 18px" }}>
                I'm open to work in infrastructure, networking, and dev tooling. The fastest way to
                reach me is email or LinkedIn.
              </p>
              <div className="cta" style={{ justifyContent: "center", marginTop: 0 }}>
                <a className="btn btn-primary" href="mailto:email@krishnar.xyz">
                  Email me
                </a>
                <a
                  className="btn"
                  href="https://www.linkedin.com/in/leelakrishnaravuri/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  className="btn"
                  href="https://github.com/LeelaKrishna-R"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
