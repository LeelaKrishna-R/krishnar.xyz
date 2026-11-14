import { Rows, ProjectRow } from "../../components/Rows";
import { bigProjects, tools, older } from "../../lib/projects";

export const metadata = {
  title: "Work",
  description: "Discord bots, a personal AI, a desktop character for AI agents, and some small tools.",
};

export default function WorkPage() {
  return (
    <>
      <header className="wrap narrow page-head">
        <h1>Work</h1>
        <p className="lede">The bigger stuff first. Each one has its own page with more about it.</p>
      </header>

      <div className="wrap narrow end">
        <section className="block">
          <Rows>
            {bigProjects.map((p) => (
              <ProjectRow key={p.slug} p={p} thumb />
            ))}
          </Rows>
        </section>

        <section className="block" id="tools">
          <h2>Small tools</h2>
          <Rows>
            {tools.map((p) => (
              <ProjectRow key={p.slug} p={p} />
            ))}
          </Rows>
        </section>

        <section>
          <h2 style={{ fontSize: "clamp(24px, 3vw, 30px)", marginBottom: 14 }}>Older</h2>
          <Rows>
            {older.map((o) => (
              <li key={o.name}>
                <div className="row">
                  <span className="row-name">{o.name}</span>
                  <span className="row-year">{o.year}</span>
                  <span className="row-line">{o.line}</span>
                </div>
              </li>
            ))}
          </Rows>
        </section>
      </div>
    </>
  );
}
