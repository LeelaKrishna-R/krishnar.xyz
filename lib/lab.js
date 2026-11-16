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
  ["Watching", "Prometheus, Grafana and Gatus. Gatus runs 18 checks a minute and any failed check alerts my phone through ntfy."],
  ["Backups", "Every VM and container goes to Proxmox Backup Server every night, kept for 7 days plus 4 weeks. Once a month a script restores two containers, boots them and checks they're healthy. A second copy on a real NAS is next."],
  ["Apps", "The Dexter bots, two Lavalink servers for the music bots, Forgejo for my own git, and an image host. I cut everything I wasn't using in November."],
];

// Newest first.
export const incidents = [
  {
    date: "Nov 15, 2026",
    title: "Trimmed the lab to what it needs",
    text: "Retired five idle services, including a photo library, a password manager and Home Assistant. I moved every backup to node2 first, then removed them, and node1's disk went from 79% used to 22%.",
  },
  {
    date: "Nov 12, 2026",
    title: "Traced a CPU slowdown to the power adapter",
    text: "node2 was running at 800 MHz. I traced it to the BIOS throttling the CPU when it doesn't recognize the power adapter, and proved it by swapping adapters between the two nodes: the slowdown moved with the adapter. The fix is a genuine Dell 65 W one.",
  },
  {
    date: "Nov 11, 2026",
    title: "Removed a nightly pause in the bots",
    text: "Two of the bots paused for a few seconds at 08:30 UTC every night. I matched it to the nightly backup snapshot of their VM, turned on backup fleecing to remove the pause, and enabled discard on the VM's disk to reclaim 21 GB.",
  },
  {
    date: "Nov 10, 2026",
    title: "Fixed the boot order after a power cut",
    text: "After a seven-minute power cut everything came back on its own, but a few apps started before the storage they depend on. I made them wait for it, so the lab now recovers cleanly by itself.",
  },
  {
    date: "Nov 4, 2026",
    title: "Caught three silent cron jobs",
    text: "An audit turned up three scheduled jobs that weren't running: cron's minimal PATH doesn't include /usr/sbin, where the Proxmox tools live. Every cron file now sets PATH explicitly.",
  },
  {
    date: "Oct 27, 2026",
    title: "Added disk alerts and backup pruning",
    text: "Backups were growing on the same disk as the system until it filled at 2:47 am. I set an alert on every disk at 85% and made the backups prune themselves every morning.",
  },
];
