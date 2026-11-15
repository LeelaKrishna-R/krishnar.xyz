// "Live" pill on the homelab page: how many health checks pass right now,
// whether both nodes answer, and how long ago the last backup finished.
// Rendered on the server from lib/live.js getLab(); nothing when it's null.
const ago = (ms) => {
  const m = Math.max(0, Math.round((Date.now() - ms) / 60000));
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h} h ago` : `${Math.round(h / 24)} days ago`;
};

export default function LabStatus({ lab }) {
  if (!lab) return null;
  const allUp = lab.up === lab.total;
  return (
    <p className="live-pill lab-pill">
      <span className={`dot-live${allUp ? "" : " warn"}`} aria-hidden="true" />
      live: {lab.up} of {lab.total} checks passing · node1 {lab.nodes.node1 ? "up" : "down"} · node2{" "}
      {lab.nodes.node2 ? "up" : "down"}
      {lab.lastBackup ? ` · last backup ${ago(lab.lastBackup)}` : ""}
    </p>
  );
}
