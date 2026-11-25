import PageHead from "../../components/PageHead";
import { Rows, ProjectRow } from "../../components/Rows";
import { bigProjects, tools, older } from "../../lib/projects";
import { meta } from "../../lib/meta";

export const metadata = meta({
  title: "Work",
  description: "Dexter Copilot, the Dexter AI bots, Friday, Iris, Shero, SyntaxHost and a few small tools for homelabs and AI agents, biggest first.",
  path: "/work",
});

export default function WorkPage() {
  return (
    <>
      <PageHead
        title="Work"
        lede="What I've built since 2019, biggest first."
        sfx={{ text: "TA-DA!", color: "#bdeedd", rotate: -8 }}
        me={{ pose: "cheer", face: "happy" }}
      />

      <div className="wrap narrow end">
        <section className="block">
          <Rows cards>
            {bigProjects.map((p) => (
              <ProjectRow key={p.slug} p={p} thumb />
            ))}
          </Rows>
        </section>

        <section className="block" id="tools">
          <h2>Small tools</h2>
          <Rows cards>
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
