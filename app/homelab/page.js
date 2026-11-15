import PageHead from "../../components/PageHead";
import Link from "next/link";
import { nodes, running, incidents } from "../../lib/lab";

export const metadata = {
  title: "Homelab",
  description: "Two small Dell PCs running Proxmox at home, what runs on them, and what broke.",
};

export default function HomelabPage() {
  return (
    <>
      <PageHead
        title="Homelab"
        sfx={{ text: "BEEP BOOP", color: "#bfe0c8", rotate: 7, size: 1.15 }}
        me={{ pose: "wave", prop: "wrench", face: "grin" }}
      >
        <p className="lede">
          Two Dell OptiPlex micro PCs running Proxmox. They host the{" "}
          <Link className="inline" href="/work/dexter">
            Dexter bots
          </Link>
          , my DNS, monitoring and backups, and a pile of apps.
        </p>
      </PageHead>

      <div className="wrap narrow end">
        <section className="block">
          <div className="rack">
            <div className="cable rack-cable" aria-hidden="true">
              <i />
              <i />
              <i />
            </div>
            {nodes.map((n) => (
              <div key={n.name} className="sticker node" style={{ "--n": nodes.indexOf(n) }}>
                {n.note ? <span className="note node-note">{n.note}</span> : null}
                <h2 className="node-name">
                  <span className="leds" aria-hidden="true">
                    <i />
                    <i />
                  </span>
                  {n.name}
                </h2>
                <p className="spec">{n.spec}</p>
                <div className="guests">
                  {n.guests.map((g, gi) => (
                    <span key={g.label} className={`guest${g.vm ? " vm" : ""}`} style={{ "--g": gi }}>
                      {g.label}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <p className="key">
            <span className="guest vm">gold</span> VM, the rest are containers
          </p>
        </section>

        <section className="block">
          <h2>What&apos;s running</h2>
          <dl className="defs">
            {running.map(([k, v]) => (
              <div key={k} style={{ display: "contents" }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="broke">
          <h2 style={{ fontSize: "clamp(24px, 3vw, 30px)", marginBottom: 14 }}>Things that broke</h2>
          <ol className="log">
            {incidents.map((x) => (
              <li key={x.date} data-reveal>
                <time>{x.date}</time>
                <h3>{x.title}</h3>
                <p>{x.text}</p>
              </li>
            ))}
          </ol>
        </section>
      </div>
    </>
  );
}
