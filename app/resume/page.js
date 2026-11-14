import Link from "next/link";
import PrintButton from "../../components/PrintButton";
import { summary, experience, projects, education, skills } from "../../lib/resume";
import { links, site } from "../../lib/site";

export const metadata = {
  title: "Resume",
  description: "Krishna Ravuri's resume: Discord bots, homelab, an M.S. in AI from UNT, studying for the CCNA.",
};

function Defs({ rows }) {
  return (
    <dl className="defs">
      {rows.map(([k, v]) => (
        <div key={k} style={{ display: "contents" }}>
          <dt>{k}</dt>
          <dd>{v}</dd>
        </div>
      ))}
    </dl>
  );
}

function Item({ what, when, where, points = [] }) {
  return (
    <div className="r-item">
      <div className="r-head">
        <b>{what}</b>
        <span>{when}</span>
      </div>
      <div className="r-where">{where}</div>
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
        <h1 className="ph-title">
          Krishna Ravuri
        </h1>
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
        <span className="stamp open-stamp" aria-hidden="true">
          open to work
        </span>
        <p className="resume-sum">{summary}</p>
        <div className="btns resume-btns">
          <a className="btn btn-gold" href="/resume/Krishna-Ravuri-Resume.pdf" download>
            Download PDF
          </a>
          <a className="btn" href="/resume.txt">
            Plain text
          </a>
          <PrintButton>Print</PrintButton>
        </div>
      </header>

      <section className="r-block">
        <h2>Experience</h2>
        {experience.map((e) => (
          <Item key={e.what} {...e} />
        ))}
      </section>

      <section className="r-block">
        <h2>Projects</h2>
        <Defs rows={projects} />
        <p className="r-more">
          More on the{" "}
          <Link className="inline" href="/work">
            work page
          </Link>
          .
        </p>
      </section>

      <section className="r-block">
        <h2>Education</h2>
        {education.map((e) => (
          <Item key={e.what} {...e} points={[e.note]} />
        ))}
      </section>

      <section className="r-block">
        <h2>Skills</h2>
        <Defs rows={skills} />
      </section>

    </article>
  );
}
