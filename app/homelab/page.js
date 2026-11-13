import SectionHead from "../../components/SectionHead";
import { nodes, figures, gear, services, incidents } from "../../lib/lab";

export const metadata = {
  title: "Homelab",
  description:
    "A two-node Proxmox cluster at home: what runs on it, how it's watched and backed up, and a log of what broke and how it was fixed.",
};

export default function HomelabPage() {
  return (
    <>
      <header className="page-head wrap">
        <SectionHead
          as="h1"
          path="~/lab"
          before="The "
          mark="homelab"
          lede="Two Dell micro PCs in a Proxmox cluster. It runs the Dexter community's bots, my DNS, monitoring and backups, and a handful of apps. Most of my tools started as a fix for something here."
        />
        <div className="lab-figures" style={{ maxWidth: 620 }} data-reveal>
          {figures.map((f) => (
            <div key={f.label}>
              <b>{f.value}</b>
              <span>{f.label}</span>
            </div>
          ))}
        </div>
      </header>

      <section className="page-section">
        <div className="wrap">
          <h2 className="sub-h" data-reveal>
            The machines
          </h2>
          <div className="rack rack-2">
            {nodes.map((n) => (
              <div key={n.name} className="sticker node" data-reveal>
                <div className="node-head">
                  <h3>
                    <span className="leds" aria-hidden="true">
                      <i />
                      <i />
                    </span>
                    {n.name}
                  </h3>
                </div>
                <p className="spec-line">{n.spec}</p>
                <p className="role">{n.role}</p>
                <div className="guests">
                  {n.guests.map((g) => (
                    <span key={g.label} className={`guest${g.vm ? " vm" : ""}`}>
                      {g.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="key" data-reveal>
            <span className="guest vm">gold</span> virtual machine · <span className="guest">plain</span> container
          </p>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sub-h" data-reveal>
            What runs on it
          </h2>
          <div className="svc-groups">
            {services.map((g) => (
              <div key={g.title} className="sticker" data-reveal>
                <h3>{g.title}</h3>
                <ul className="svc">
                  {g.items.map(([name, what]) => (
                    <li key={name}>
                      <b>{name}</b>: {what}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap">
          <h2 className="sub-h" data-reveal>
            Hardware
          </h2>
          <div className="gear">
            {gear.map((g) => (
              <div key={g.name} className="sticker" data-reveal>
                <h3>{g.name}</h3>
                <div className="spec">{g.spec}</div>
                <p>{g.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="page-section" style={{ paddingTop: 0 }} id="log">
        <div className="wrap">
          <h2 className="sub-h" data-reveal>
            What broke, and the fix
          </h2>
          <ol className="log">
            {incidents.map((x) => (
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
    </>
  );
}
