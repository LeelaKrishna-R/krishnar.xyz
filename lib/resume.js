// The resume, as data. /resume renders it as a page, /resume.txt as plain text
// for application forms, and scripts/resume-pdf.mjs prints the ATS-friendly
// PDF from it, so the three can't drift apart.

export const person = {
  name: "Leelakrishna Ravuri",
  title: "Software Developer | AI and Infrastructure",
  place: "Denton, TX",
};

export const summary =
  "Volunteer developer at Dexter AI, working on Dexter Copilot, a voice-controlled AI cohost for streamers, and on the six-bot Discord platform behind its community. Building Discord bots since 2019. I run a two-node Proxmox homelab with monitoring, nightly backups and monthly restore drills, and I train and run language models on my own hardware. M.S. in Artificial Intelligence from the University of North Texas, studying for the CCNA, and looking for roles in infrastructure, networking or developer tooling.";

export const skills = [
  ["Languages", "JavaScript, TypeScript, Python, SQL, C"],
  ["Frameworks and Runtimes", "Node.js, discord.js, React, Next.js, Vue"],
  ["Databases", "SQLite, PostgreSQL, MongoDB, Redis"],
  [
    "Infrastructure",
    "Linux, Proxmox VE, Proxmox Backup Server, Docker, PM2, Caddy, Cloudflare Tunnel, Authelia, systemd, SSH, Git, Prometheus, Grafana, Loki",
  ],
  ["Networking", "DNS (AdGuard Home, Unbound), reverse proxies, subnetting, Cisco IOS log and config analysis (CCNA in progress)"],
  [
    "AI",
    "Local model training and inference, LLM agents, evaluation sets, structured outputs, Anthropic SDK, Model Context Protocol (MCP)",
  ],
];

export const experience = [
  {
    org: "Dexter AI",
    place: "dextercopilot.ai | dexterai.org",
    role: "Software Developer (Volunteer)",
    when: "May 2026 – Present",
    points: [
      "Develop Dexter Copilot, a voice-controlled AI cohost for streamers on Windows and macOS that switches OBS scenes, moderates chat and starts polls, giveaways and overlay designs from spoken commands.",
      "Rewrote the community's Discord platform in discord.js: four bots (community, moderation, automod and logging, support) and two music bots on Lavalink, serving a server of 3,500+ members.",
      "Moved the main community bot off a persistent gateway connection to signed HTTP interactions, with a second bot watching server events and handing it work through a shared job queue.",
      "Designed one SQLite database shared by six processes (236 ordered migrations, CI checks that reject reordering); 2,500+ commits since May 2026, hosted on a VM in my own Proxmox homelab.",
    ],
  },
  {
    org: "Shero",
    place: "sherobot.xyz",
    role: "Creator and Developer",
    when: "April 2021 – Present",
    points: [
      "Built and maintain a Discord bot in Node.js with MongoDB and Redis, plus its Next.js website; used in more than 13,000 servers.",
      "Scans servers for risky role and channel permissions daily and alerts staff when something new appears.",
    ],
  },
  {
    org: "Freelance",
    place: "Remote",
    role: "Software Developer: several client projects, under NDA",
    when: "2023 – Present",
    points: [],
  },
  { org: "Caliber Embed", place: "Coimbatore, India", role: "Intern", when: "May 2023 – August 2023", points: [] },
  { org: "Diamond Pick", place: "Chennai, India", role: "System Engineer (Summer)", when: "May 2019 – August 2019", points: [] },
];

export const projects = [
  {
    name: "Homelab",
    tech: "Proxmox, two nodes",
    text: "paired AdGuard Home and Unbound DNS, Caddy, Cloudflare Tunnel, Authelia SSO; Prometheus, Grafana, Loki and Gatus (46 checks a minute); nightly backups with a monthly restore drill.",
  },
  {
    name: "net-triage",
    tech: "TypeScript, Claude",
    text: "LLM agent that diagnoses network logs and device configs with schema-checked answers; scores 16/16 on an evaluation set of real Cisco IOS cases at about $0.20 per run.",
  },
  {
    name: "lazarus",
    tech: "Python",
    text: "homelab monitor that restarts failed services over SSH using only allow-listed commands, with backoff, a dry-run mode, 42 tests and cron-friendly exit codes.",
  },
  {
    name: "agent-budget",
    tech: "TypeScript, npm",
    text: "library that tracks LLM token spend in integer microdollars and refuses calls once a budget is reached; no dependencies.",
  },
];

export const certifications = ["SAP ABAP NetWeaver 7.50", "Cisco CCNA (in progress)"];

export const education = [
  {
    school: "University of North Texas",
    place: "Denton, TX",
    degree: "Master of Science, Artificial Intelligence (minor in Mathematics)",
    when: "January 2024 – December 2025",
  },
  {
    school: "Kalasalingam University",
    place: "Madurai, India",
    degree: "Bachelor of Engineering, Electronics and Communication Engineering (minor in Mathematics)",
    when: "May 2021",
  },
];

export const pdfPath = "/resume/Leelakrishna-Ravuri-Resume.pdf";
