// "How it works" on the tool pages: a small animated sketch of the real flow,
// on a loop (input → what the tool does → result). Labelled as a sample run.
// Loops are transform/opacity only and pause off-screen (data-scene + .on,
// see ScrollFx); with reduced motion every step just shows at once.

function Flow({ label, steps, loop = 8 }) {
  return (
    <figure className="diag" data-scene style={{ "--T": `${loop}s` }} aria-label={label}>
      <figcaption className="note diag-note">how it works · a sample run</figcaption>
      <div className="diag-flow">{steps}</div>
    </figure>
  );
}

const Arrow = () => (
  <span className="diag-arrow" aria-hidden="true">
    <i />
  </span>
);

function NetTriage() {
  const lines = [
    "%SPANTREE-2-LOOPGUARD_BLOCK Gi0/1",
    "%SW_MATM-4-MACFLAP_NOTIF 0011.2233.4455",
    "%LINK-3-UPDOWN Gi0/2, changed state to up",
    "%SYS-5-CONFIG_I: Configured from console",
    "%SW_MATM-4-MACFLAP_NOTIF 0011.2233.4455",
  ];
  return (
    <Flow
      label="net-triage reads a router log, the model flags the lines that matter, and it answers stp_loop with 97% confidence"
      steps={
        <>
          <div className="sticker diag-card nt-log">
            <b className="diag-title">router.log</b>
            <span className="nt-scan" aria-hidden="true" />
            {lines.map((l, i) => (
              <code key={i} className={i === 1 || i === 4 ? "nt-line hit" : "nt-line"}>
                {l}
              </code>
            ))}
          </div>
          <Arrow />
          <div className="sticker diag-card diag-mid nt-model">
            <b>Claude</b>
            <span>category, reason, evidence</span>
            <em className="nt-check">schema ✓</em>
          </div>
          <Arrow />
          <div className="sticker diag-card nt-out">
            <small>verdict</small>
            <b>stp_loop</b>
            <span>97% · lines 2 and 5</span>
          </div>
        </>
      }
    />
  );
}

function Lazarus() {
  return (
    <Flow
      label="lazarus sees friday-nuc fail three checks in a row, runs the one allowed restart command, and the service comes back up"
      loop={9}
      steps={
        <>
          <div className="sticker diag-card lz-hosts">
            <b className="diag-title">hosts.yaml</b>
            <div className="lz-host lz-sick">
              <i className="lz-dot" />
              friday-nuc
              <span className="lz-fails">
                <em>✗</em>
                <em>✗</em>
                <em>✗</em>
              </span>
            </div>
            <div className="lz-host">
              <i className="lz-dot ok" />
              node1
            </div>
            <div className="lz-host">
              <i className="lz-dot ok" />
              node2
            </div>
          </div>
          <Arrow />
          <div className="sticker diag-card diag-mid lz-cmd">
            <b>allowed command</b>
            <code className="lz-type">systemctl restart friday</code>
            <em>over SSH · try 1 of 3</em>
          </div>
          <Arrow />
          <div className="sticker diag-card lz-out">
            <small>friday-nuc</small>
            <b className="lz-down">down</b>
            <b className="lz-up">up again</b>
          </div>
        </>
      }
    />
  );
}

function AgentBudget() {
  return (
    <Flow
      label="Each LLM call adds to the spend; at 80% agent-budget warns, at the $0.50 limit the next call is refused"
      loop={9}
      steps={
        <>
          <div className="sticker diag-card ab-calls">
            <b className="diag-title">agent calls</b>
            {["$0.12", "$0.15", "$0.13", "$0.10", "$0.08"].map((c, i) => (
              <span key={i} className={`ab-call c${i + 1}`}>
                call · {c}
              </span>
            ))}
          </div>
          <Arrow />
          <div className="sticker diag-card diag-mid ab-meter">
            <b>budget $0.50</b>
            <span className="ab-bar" aria-hidden="true">
              <i />
              <em className="ab-mark" />
            </span>
            <span className="ab-labels">
              <small className="ab-warn">warn at 80%</small>
              <small className="ab-full">limit reached</small>
            </span>
          </div>
          <Arrow />
          <div className="sticker diag-card ab-out">
            <small>call 5</small>
            <b>refused</b>
            <span>no money spent on it</span>
          </div>
        </>
      }
    />
  );
}

function HomelabAudit() {
  const lines = [
    ["db:", ""],
    ["  image: postgres:16", ""],
    ['  ports: ["5432:5432"]', "open on 0.0.0.0"],
    ["  environment:", ""],
    ["    POSTGRES_PASSWORD: hunter2", "secret in the file"],
  ];
  return (
    <Flow
      label="homelab-audit reads a docker-compose file and flags a database port open to everyone and a password pasted into the file"
      steps={
        <>
          <div className="sticker diag-card ha-file">
            <b className="diag-title">docker-compose.yml</b>
            <span className="ha-lens" aria-hidden="true" />
            {lines.map(([l, flag], i) => (
              <code key={i} className={flag ? "ha-line flagged" : "ha-line"}>
                {l}
                {flag ? <span className="ha-flag">HIGH · {flag}</span> : null}
              </code>
            ))}
          </div>
          <Arrow />
          <div className="sticker diag-card ha-out">
            <small>report</small>
            <b>3 high</b>
            <span>1 medium · 1 low · read only</span>
          </div>
        </>
      }
    />
  );
}

function HomelabHarden() {
  const rows = [
    ["root login over SSH", "HIGH"],
    ["password logins over SSH", "HIGH"],
    ["firewall", "HIGH"],
    ["automatic updates", "MED"],
  ];
  return (
    <Flow
      label="homelab-harden checks a Linux server one item at a time and flags root login and password logins over SSH, no firewall and no automatic updates, without changing anything"
      steps={
        <>
          <div className="sticker diag-card hh-list">
            <b className="diag-title">sudo python3 -m homelab_harden</b>
            {rows.map(([what, res], i) => (
              <div key={what} className={`hh-row r${i + 1}`}>
                <span>{what}</span>
                <em className={res === "ok" ? "ok" : res === "MED" ? "med" : "bad"}>{res === "ok" ? "✓ ok" : "✗ " + res}</em>
              </div>
            ))}
          </div>
          <Arrow />
          <div className="sticker diag-card hh-out">
            <small>changed on the box</small>
            <b>nothing</b>
            <span>it only looks</span>
          </div>
        </>
      }
    />
  );
}

function Homelab() {
  return (
    <Flow
      label="Gatus checks both nodes every minute; every night each VM and container is backed up to Proxmox Backup Server; once a month a script restores two containers, boots them and checks they are healthy"
      loop={9}
      steps={
        <>
          <div className="sticker diag-card hl-nodes">
            <b className="diag-title">node1 + node2</b>
            <span className="hl-leds" aria-hidden="true">
              {Array.from({ length: 6 }, (_, i) => (
                <i key={i} style={{ "--d": `${i * 0.37}s` }} />
              ))}
            </span>
            <span className="hl-beat" aria-hidden="true">
              <svg viewBox="0 0 120 24" preserveAspectRatio="none">
                <path d="M0 12 H22 L27 4 L32 20 L37 12 H60 H82 L87 4 L92 20 L97 12 H120" />
              </svg>
            </span>
            <small>Gatus · 18 checks a minute</small>
          </div>
          <span className="diag-arrow hl-pipe" aria-hidden="true">
            <i />
            <b className="hl-packet" />
          </span>
          <div className="sticker diag-card diag-mid hl-nas">
            <b>Backup Server</b>
            <span>7 days + 4 weeks kept</span>
            <span className="hl-prog" aria-hidden="true">
              <i />
            </span>
            <em>every night</em>
          </div>
          <span className="diag-arrow hl-pipe hl-pipe-2" aria-hidden="true">
            <i />
            <b className="hl-packet" />
          </span>
          <div className="sticker diag-card hl-out">
            <small>once a month</small>
            <b>restore drill</b>
            <span className="hl-drill">restored · booted · healthy ✓</span>
          </div>
        </>
      }
    />
  );
}

const DIAGRAMS = {
  homelab: Homelab,
  "net-triage": NetTriage,
  lazarus: Lazarus,
  "agent-budget": AgentBudget,
  "homelab-audit": HomelabAudit,
  "homelab-harden": HomelabHarden,
};

export default function HowItWorks({ slug }) {
  const D = DIAGRAMS[slug];
  return D ? <D /> : null;
}
