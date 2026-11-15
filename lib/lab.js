// The homelab as of November 15, 2026 (after cutting it down to what's used).
// No addresses or hostnames on purpose.

export const nodes = [
  {
    name: "node1",
    spec: "OptiPlex 7050 Micro · i7-7700T · 24 GB",
    guests: [
      { label: "Dexter bots", vm: true },
      { label: "image host", vm: true },
      { label: "Lavalink" },
      { label: "DNS #2" },
      { label: "Forgejo" },
    ],
  },
  {
    name: "node2",
    spec: "OptiPlex 7050 Micro · i7-6700T · 16 GB",
    note: "the slow one right now",
    guests: [
      { label: "AdGuard + Unbound" },
      { label: "Caddy" },
      { label: "Grafana + Prometheus" },
      { label: "Backup Server" },
      { label: "tunnel" },
      { label: "Lavalink backup" },
    ],
  },
];

// Grouped, one short line each.
export const running = [
  ["Network", "AdGuard Home and Unbound for DNS (two of them, kept in sync), Caddy in front of everything, a Cloudflare tunnel, and Authelia so there's one login."],
  ["Watching", "Prometheus, Grafana and Gatus. Gatus runs 18 checks a minute and anything that breaks pings my phone through ntfy."],
  ["Backups", "Every VM and container goes to Proxmox Backup Server every night, kept for 7 days plus 4 weeks. Once a month a script restores two containers, boots them and checks they're healthy. A second copy on a real NAS is next."],
  ["Apps", "The Dexter bots, two Lavalink servers for the music bots, Forgejo for my own git, and an image host. I cut everything I wasn't using in November."],
];

// Newest first.
export const incidents = [
  {
    date: "Nov 15, 2026",
    title: "Cut the lab down to what I use",
    text: "Five machines were just sitting there: a photo library with no photos, a password manager with no accounts, a Home Assistant I never set up. I moved every backup to node2 first, then deleted them. node1's disk went from 79% used to 22%.",
  },
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
    text: "No UPS yet. Everything came back, but the media apps started before the NAS was up and saw empty folders. I made them wait for it; the NAS and those apps are gone now anyway.",
  },
  {
    date: "Nov 4, 2026",
    title: "Cron jobs that never worked",
    text: "Three of them. cron runs with a bare PATH and the Proxmox tools live in /usr/sbin, so they'd been failing quietly since day one. Every cron file sets PATH now.",
  },
  {
    date: "Oct 27, 2026",
    title: "node2's disk filled up",
    text: "At 2:47 am, and everything on it went read-only. The backups lived on that same disk and grew until it was full. Every disk has an alert at 85% now, and the backups get pruned every morning.",
  },
];
