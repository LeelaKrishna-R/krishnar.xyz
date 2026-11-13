import Image from "next/image";
import { ArrowUpRight } from "./Icons";

// A project sticker: accent strip, a real screenshot, what it is, and links.
export default function ProjectCard({ p, community, tilt }) {
  const live = p.live === "discord" && community;
  return (
    <article
      className={`sticker project lift${p.wide ? " wide" : ""}${p.flip ? " flip" : ""}`}
      data-reveal
      style={{ "--accent": p.accent, "--tilt": p.wide ? "0deg" : tilt }}
    >
      <div className="project-inner">
        <div className={`cover${p.cover.contain ? " contain" : ""} ${p.cover.className || ""}`}>
          <Image
            src={p.cover.src}
            alt={p.cover.alt}
            fill
            sizes={p.wide ? "(max-width: 860px) 92vw, 600px" : "(max-width: 860px) 92vw, 540px"}
          />
        </div>
        <div className="project-body">
          <div className="project-meta">{p.started ? `since ${p.started} · ${p.meta}` : p.meta}</div>
          <h3>{p.name}</h3>
          <p>{p.summary}</p>
          {live ? (
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
          {p.fact ? (
            <div className="project-live">
              <span>
                <b>{p.fact.value}</b> {p.fact.label}
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
      </div>
    </article>
  );
}
