import PrintButton from "../../components/PrintButton";
import { person, summary, experience, projects, certifications, education, skills, pdfPath, docxPath } from "../../lib/resume";
import { links, site } from "../../lib/site";
import { meta } from "../../lib/meta";

export const metadata = meta({
  title: "Resume",
  description: "Leelakrishna Ravuri's resume: Dexter Copilot, Discord bots, a Proxmox homelab, an M.S. in AI from UNT, studying for the CCNA.",
  path: "/resume",
});

function Item({ org, place, role, when, points = [] }) {
  return (
    <div className="r-item">
      <div className="r-head">
        <b>{org}</b>
        <span>{place}</span>
      </div>
      <div className="r-head r-sub">
        <span>{role}</span>
        <span className="r-when">{when}</span>
      </div>
      {points.length ? (
        <ul>
          {points.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export default function ResumePage() {
  return (
    <article className="wrap narrow end resume cartoon-head">
      <header className="page-head">
        <h1 className="ph-title">{person.name}</h1>
        <p className="r-title">{person.title}</p>
        <p className="lede">
          {person.place} ·{" "}
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
        <span className="stamp open-stamp" aria-hidden="true">
          open to work
        </span>
        <div className="btns resume-btns">
          <a className="btn btn-gold" href={pdfPath} download>
            Download PDF
          </a>
          <a className="btn" href={docxPath} download>
            Word
          </a>
          <a className="btn" href="/resume.txt">
            Plain text
          </a>
          <PrintButton>Print</PrintButton>
        </div>
      </header>

      <section className="r-block">
        <h2>Summary</h2>
        <p className="resume-sum">{summary}</p>
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

      <section className="r-block">
        <h2>Work experience</h2>
        {experience.map((e) => (
          <Item key={e.org} {...e} />
        ))}
      </section>

      <section className="r-block">
        <h2>Projects</h2>
        <ul className="r-list">
          {projects.map((p) => (
            <li key={p.name}>
              <b>{p.name}</b> ({p.tech}): {p.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="r-block">
        <h2>Certifications</h2>
        <ul className="r-list">
          {certifications.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      </section>

      <section className="r-block">
        <h2>Education</h2>
        {education.map((e) => (
          <Item key={e.school} org={e.school} place={e.place} role={e.degree} when={e.when} />
        ))}
      </section>
    </article>
  );
}
