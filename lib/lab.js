// The homelab, as of November 2026. No addresses or hostnames on purpose.

export const nodes = [
  {
    name: "node1",
    spec: "Dell OptiPlex 7050 Micro · i7-7700T · 24 GB · 500 GB SSD",
    role: "Production: the Discord bots' VM, the NAS with the main backups, and apps.",
    guests: [
      { label: "Dexter bots (VM)", vm: true },
      { label: "NAS + main backups", vm: true },
      { label: "Lavalink" },
      { label: "Second DNS" },
      { label: "Apps" },
      { label: "Image host", vm: true },
    ],
  },
  {
    name: "node2",
    spec: "Dell OptiPlex 7050 Micro · i7-6700T · 16 GB · 256 GB SSD",
    role: "The core: DNS, the proxy, monitoring, a second backup server, media and Home Assistant.",
    guests: [
      { label: "AdGuard + Unbound" },
      { label: "Caddy" },
      { label: "Grafana · Prometheus · Loki" },
      { label: "Backup server" },
      { label: "Jellyfin" },
      { label: "Immich" },
      { label: "Home Assistant", vm: true },
      { label: "Cloudflare Tunnel" },
    ],
  },
];

export const figures = [
  { value: "2", label: "Proxmox nodes in one cluster" },
  { value: "46", label: "health checks every minute" },
  { value: "2", label: "backup servers, one on each node" },
];

export const gear = [
  {
    name: "node1",
    spec: "OptiPlex 7050 Micro · i7-7700T · 24 GB · 500 GB SSD",
    text: "Holds two of the cluster's three quorum votes, so the bots keep running when node2 is off.",
  },
  {
    name: "node2",
    spec: "OptiPlex 7050 Micro · i7-6700T · 16 GB · 256 GB SSD",
    text: "Its Intel GPU does Jellyfin's transcoding, and it drives the monitor on the wall.",
  },
  {
    name: "TP-Link switch",
    spec: "8 ports, gigabit",
    text: "Everything sits on one flat LAN behind the ISP router.",
  },
  {
    name: "A monitor on the wall",
    spec: "Kiosk on node2",
    text: "Rotates through the Homepage dashboard, a status wall and the service checks.",
  },
];

export const services = [
  {
    title: "Network",
    items: [
      ["AdGuard Home + Unbound", "two DNS servers kept in sync, with ad blocking"],
      ["Caddy", "reverse proxy with a wildcard Let's Encrypt certificate, generated from one services file"],
      ["Cloudflare Tunnel", "publishes chosen services without opening router ports"],
      ["Authelia", "one login for the whole lab: forward auth and OIDC"],
    ],
  },
  {
    title: "Watching",
    items: [
      ["Prometheus + Alertmanager", "host down, guest down, disks and thin pools over 85%, CPU heat"],
      ["Grafana", "every dashboard is built from code"],
      ["Loki + Alloy", "logs from all 13 machines in one place"],
      ["Gatus", "46 checks every minute"],
      ["ntfy", "alerts and a weekly report on my phone"],
      ["Scrutiny", "disk health from both nodes, hourly"],
    ],
  },
  {
    title: "Backups",
    items: [
      ["Proxmox Backup Server on the NAS", "every VM and container, nightly at 02:30"],
      ["A second backup server on node2", "keeps a two-day copy of node1's guests, including the bots"],
      ["A monthly restore drill", "restores two containers from the newest backups with no network and checks they boot healthy"],
    ],
  },
  {
    title: "Apps",
    items: [
      ["The Dexter community bots", "a VM, backed up nightly like everything else"],
      ["Lavalink", "audio for the music bots"],
      ["Jellyfin and Immich", "media and photos, stored on the NAS"],
      ["Home Assistant", "its own VM"],
      ["Forgejo", "git for the lab's config, with a CI runner that checks every push"],
      ["Paperless, Mealie, Zipline", "documents, recipes, file sharing"],
    ],
  },
];

// Newest first. The full write-ups live in the lab repo's README.
export const incidents = [
  {
    date: "2026-11-12",
    title: "node2 stuck at 800 MHz",
    text: "The BIOS caps the CPU at 800 MHz before boot when it can't identify the power adapter. Temperatures and the OS were fine, and swapping adapters between the nodes moved the problem with the adapter.",
    fix: "node1 got the working adapter. node2 runs at 800 MHz until it gets a genuine Dell 65 W one."
  },
  {
    date: "2026-11-11",
    title: "Two bots stalled for up to 3 seconds at 08:30 UTC every night",
    text: "That's when the nightly backup reached their VM. Without fleecing, every write inside the VM waited on the backup server, which sat on the same SSD.",
    fix: "Fleecing on for the nightly jobs; turning on discard for the VM also freed 21 GB.",
  },
  {
    date: "2026-11-10",
    title: "A seven-minute power cut, no UPS",
    text: "Everything came back, but node2's NFS mounts came up before the NAS VM on node1, so Jellyfin and Immich started on empty folders.",
    fix: "A service on node2 now waits for the NAS, mounts it, then starts those two.",
  },
  {
    date: "2026-11-04",
    title: "Three cron jobs that had never worked",
    text: "cron.d jobs get PATH=/usr/bin:/bin, and the Proxmox tools live in /usr/sbin. No container trims, stale disk health, and a restore drill that always said there was no backup.",
    fix: "Every cron file sets PATH, tested under the same empty environment.",
  },
  {
    date: "2026-10-27",
    title: "node2's storage pool filled up at 02:47",
    text: "Every container on it went read-only and Immich's database died while Docker still reported it healthy. The main backup datastore shared that 141 GB pool.",
    fix: "Primary backups moved to the NAS on node1, and every storage pool now has a fill alert.",
  },
];
