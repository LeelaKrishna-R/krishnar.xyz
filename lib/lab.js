// The homelab as of November 2026. No addresses or hostnames on purpose.

export const nodes = [
  {
    name: "node1",
    spec: "OptiPlex 7050 Micro · i7-7700T · 24 GB",
    guests: [
      { label: "Dexter bots", vm: true },
      { label: "NAS + backups", vm: true },
      { label: "Lavalink" },
      { label: "DNS #2" },
      { label: "apps" },
    ],
  },
  {
    name: "node2",
    spec: "OptiPlex 7050 Micro · i7-6700T · 16 GB",
    note: "the slow one right now",
    guests: [
      { label: "AdGuard + Unbound" },
      { label: "Caddy" },
      { label: "Grafana" },
      { label: "Prometheus" },
      { label: "backup copy" },
      { label: "Jellyfin" },
      { label: "Immich" },
      { label: "Home Assistant", vm: true },
    ],
  },
];

// Grouped, one short line each.
export const running = [
  ["Network", "AdGuard Home and Unbound for DNS (two of them, kept in sync), Caddy in front of everything, a Cloudflare tunnel, and Authelia so there's one login."],
  ["Watching", "Prometheus, Grafana, Loki and Gatus. Gatus runs 46 checks a minute and anything that breaks pings my phone through ntfy."],
  ["Backups", "Proxmox Backup Server on the NAS every night, with a two-day copy on node2. Once a month a script restores a couple of containers to make sure the backups actually work."],
  ["Apps", "The Dexter bots, Lavalink for the music bots, Jellyfin, Immich, Home Assistant, Forgejo, Paperless, Mealie and a few others."],
];

// Newest first.
export const incidents = [
  {
    date: "Nov 12, 2026",
    title: "node2 stuck at 800 MHz",
    text: "Turns out the BIOS throttles the CPU when it doesn't recognize the power brick. I swapped bricks between the two nodes and the problem moved with it. node2 needs a real Dell 65 W adapter.",
  },
  {
    date: "Nov 11, 2026",
    title: "Bots freezing at 08:30 UTC",
    text: "Two of the bots stalled for a few seconds every night. That's when the nightly backup reached their VM. Turning on fleecing fixed it, and enabling discard on the VM got back 21 GB.",
  },
  {
    date: "Nov 10, 2026",
    title: "Seven-minute power cut",
    text: "No UPS yet. Everything came back, but Jellyfin and Immich started before the NAS was up and saw empty folders. node2 now waits for the NAS before starting them.",
  },
  {
    date: "Nov 4, 2026",
    title: "Cron jobs that never worked",
    text: "Three of them. cron runs with a bare PATH and the Proxmox tools live in /usr/sbin, so they'd been failing quietly since day one. Every cron file sets PATH now.",
  },
  {
    date: "Oct 27, 2026",
    title: "node2's disk filled up",
    text: "At 2:47 am, and everything on it went read-only. The main backups lived on that same disk. They're on the NAS now, and every disk has an alert.",
  },
];
