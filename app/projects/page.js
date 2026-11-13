import Image from "next/image";
import SectionHead from "../../components/SectionHead";
import { Term } from "../../components/ToolCard";
import { ArrowUpRight } from "../../components/Icons";
import { projects, tools, earlier } from "../../lib/projects";
import { getCommunity } from "../../lib/live";

export const revalidate = 600;

export const metadata = {
  title: "Work",
  description:
    "The Dexter AI community bots, Friday, Iris, Shero, and five small tools: what each one does and how it's built.",
};

export default async function ProjectsPage() {
  const community = await getCommunity();
  return (
    <>
      <header className="page-head wrap">
        <SectionHead
          as="h1"
          path="~/work"
          before="Everything I've "
          mark="built"
          lede="The four bigger projects, five small tools, and an older engineering project."
        />
      </header>

      <section className="page-section">
        <div className="wrap">
          {projects.map((p) => (
            <article key={p.slug} id={p.slug} className="sticker project-full" data-reveal style={{ "--accent": p.accent }}>
              <div className={`cover${p.cover.contain ? " contain" : ""} ${p.cover.className || ""}`}>
                <Image src={p.cover.src} alt={p.cover.alt} fill sizes="(max-width: 860px) 92vw, 540px" />
              </div>
              <div className="project-body">
                <div className="project-meta">{p.started ? `since ${p.started} · ${p.meta}` : p.meta}</div>
                <h2>{p.name}</h2>
                <p>{p.summary}</p>
                <ul>
                  {p.points.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
                {p.live === "discord" && community ? (
                  <div className="project-live">
                    <i className="dot-live" aria-hidden="true" />
                    <span>
                      <b>{community.members.toLocaleString("en-US")}</b> members
                      {community.online ? (
                        <>
                          {" · "}
                          <b>{community.online.toLocaleString("en-US")}</b> online now
                        </>
                      ) : null}
                    </span>
                  </div>
                ) : null}
                <div className="links">
                  {p.links.map((l, i) => (
                    <a key={l.href} className={`btn${i === 0 ? " btn-gold" : ""}`} href={l.href}>
                      {l.label} <ArrowUpRight />
                    </a>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sub-h" data-reveal>
            Small tools
          </h2>
          {tools.map((t) => (
            <article key={t.name} id={t.name} className="sticker project-full" data-reveal style={{ "--accent": "var(--teal)" }}>
              <Term lines={t.term} label={`Example output from ${t.name}`} />
              <div className="project-body">
                <h2>{t.name}</h2>
                <p>{t.summary}</p>
                <div className="chips">
                  {t.tags.map((x) => (
                    <span key={x} className="chip">
                      {x}
                    </span>
                  ))}
                </div>
                <div className="links">
                  <a className="btn btn-gold" href={t.href}>
                    {t.href.includes("npmjs") ? "npm" : "Repository"} <ArrowUpRight />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sub-h" data-reveal>
            Earlier
          </h2>
          <div className="gear single">
            {earlier.map((e) => (
              <div key={e.name} className="sticker" data-reveal>
                <h3>{e.name}</h3>
                <div className="spec">{e.when}</div>
                <p>{e.summary}</p>
                <div className="chips" style={{ marginTop: 12 }}>
                  {e.tags.map((x) => (
                    <span key={x} className="chip">
                      {x}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
