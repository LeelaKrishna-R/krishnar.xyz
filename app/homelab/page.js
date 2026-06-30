export const metadata = { title: "Homelab · Leelakrishna Ravuri" };

const gear = [
  {
    name: "Dell i7 Micro PC",
    spec: "24GB RAM",
    role: "The always-on node. Runs the homelab services and the monitoring and self-healing tooling I build.",
  },
  {
    name: "TP-Link TL-SG108E",
    spec: "8-port managed gigabit",
    role: "Smart-managed switch. VLANs and port config here are how I practice for the CCNA on real hardware instead of a simulator.",
  },
  {
    name: "CyberPower CP1500AVRLCD",
    spec: "1500VA UPS",
    role: "Rides out power blips so nothing corrupts on an unexpected cut, and gives the lab time to shut down cleanly.",
  },
  {
    name: "WD Elements Desktop",
    spec: "12TB",
    role: "Bulk storage and backups for the lab.",
  },
  {
    name: "Monoprice Cat6 (slim)",
    role: "Slim Cat6 runs between the nodes and the switch. Cable management is half of keeping a lab sane.",
  },
];

export default function HomelabPage() {
  return (
    <main>
      <section>
        <div className="container">
          <h1 className="section-title">Homelab</h1>
          <p className="subtitle" style={{ maxWidth: "64ch", marginBottom: 24 }}>
            The small infrastructure I run at home, and where most of my tools come from. When
            something here breaks one too many times, I build something to deal with it. It is
            modest on purpose: enough to run real services and practice real networking.
          </p>
          <div className="gear-grid">
            {gear.map((it) => (
              <div className="gear-card" key={it.name}>
                <div className="gear-name">
                  {it.name}
                  {it.spec ? <span className="gear-spec">{it.spec}</span> : null}
                </div>
                <p className="gear-role">{it.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
