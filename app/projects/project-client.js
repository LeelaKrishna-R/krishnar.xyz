"use client";

import RevealOnScroll from "../../components/RevealOnScroll";
import BackToTop from "../../components/BackToTop";
import RootClient from "../../components/RootClient";
import { featuredProjects, earlierProjects } from "../../lib/projects";

function Tile({ p }) {
  return (
    <div className="project-tile">
      <h3>{p.title}</h3>
      {p.meta && <div className="tile-meta">{p.meta}</div>}
      <p>{p.desc}</p>
      {p.detail && <p className="tile-detail">{p.detail}</p>}
      <div className="tags">
        {p.tags.map((t) => (
          <span className="tag" key={t}>
            {t}
          </span>
        ))}
      </div>
      <div className="tile-links">
        {p.links.map((l, i) => (
          <a
            key={l.href}
            className={`btn ${i === 0 ? "btn-primary" : ""}`}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
          >
            {l.label}
          </a>
        ))}
      </div>
    </div>
  );
}

export default function ClientProjectsPage() {
  return (
    <div>
      <RootClient />
      <main>
        <RevealOnScroll />
        <section className="reveal">
          <div className="container">
            <h1 className="section-title">Projects</h1>
            <p className="small muted">
              Real, shipped work first, then genuine earlier projects.
            </p>

            <h2 className="section-title" style={{ fontSize: 18, marginTop: 28 }}>
              Shipped
            </h2>
            <div className="feature-grid">
              {featuredProjects.map((p) => (
                <Tile key={p.title} p={p} />
              ))}
            </div>

            <h2 className="section-title" style={{ fontSize: 18, marginTop: 40 }}>
              Earlier work
            </h2>
            <div className="feature-grid">
              {earlierProjects.map((p) => (
                <Tile key={p.title} p={p} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <BackToTop />
    </div>
  );
}
