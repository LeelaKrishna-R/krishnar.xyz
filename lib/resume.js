// The resume, as data. /resume renders it as a page and /resume.txt as plain
// text for application forms, so the two can't drift apart.

export const summary =
  "Developer at Dexter AI, working on Dexter Copilot and its Discord bots. I train and run models locally and run a two-node Proxmox homelab. M.S. in Artificial Intelligence from UNT, studying for the CCNA, and looking for work in infrastructure, networking or dev tooling.";

export const experience = [
  {
    what: "Developer, Dexter AI",
    when: "2026 – now",
    where: "dextercopilot.ai · dexterai.org",
    points: [
      "Developer on Dexter Copilot (dextercopilot.ai), a voice-controlled AI cohost for streamers on Windows and Mac: OBS control, chat moderation, polls, giveaways and overlays.",
      "Rewrote the Dexter AI Discord community's bots in discord.js: four bots (community, moderation, automod and logging, support) and two music bots on Lavalink.",
      "One SQLite database shared by every process, 236 migrations so far; 2,500+ commits since May 2026.",
      "Runs on a VM in my own Proxmox homelab, along with a dashboard and the public site at dexterai.dev.",
    ],
  },
  {
    what: "Creator, Shero",
    when: "Apr 2021 – now",
    where: "sherobot.xyz",
    points: [
      "Discord bot in Node.js with MongoDB and Redis, plus a Next.js site.",
      "Checks servers for risky role and channel permissions and alerts staff to new ones. In 13,000+ servers.",
    ],
  },
  {
    what: "Freelance developer",
    when: "",
    where: "Several client projects, under NDA",
    points: [],
  },
  { what: "Intern, Caliber Embed", when: "May – Aug 2023", where: "Coimbatore, India", points: [] },
  { what: "System engineer, Diamond Pick", when: "May – Aug 2019", where: "Chennai, India", points: [] },
];

export const projects = [
  ["Homelab", "Two-node Proxmox cluster: DNS, Caddy, Authelia, Prometheus, Grafana, Loki, backups on two servers, a monthly restore drill."],
  ["Friday", "A personal AI that reads my mail, calendar and homelab and sends a brief every morning and evening."],
  ["Iris", "A macOS desktop character that AI agents talk through, over MCP and hooks. Swift and Python."],
  ["net-triage", "LLM agent that diagnoses network logs, with an eval set of 16 Cisco IOS cases (16/16)."],
  ["lazarus", "Homelab monitor that restarts failed services over SSH, with whitelisted commands only."],
  ["agent-budget", "npm package that tracks LLM token spend and refuses calls past a budget."],
];

export const education = [
  {
    what: "M.S., Artificial Intelligence",
    when: "Dec 2025",
    where: "University of North Texas, Denton · minor in mathematics",
    note: "LLMs, natural language processing, machine learning algorithms, data analysis.",
  },
  {
    what: "B.E., Electronics & Communication Engineering",
    when: "May 2021",
    where: "Kalasalingam University, Madurai, India · minor in mathematics",
    note: "Embedded systems, VLSI, signal processing, digital image processing.",
  },
];

export const skills = [
  ["Languages", "JavaScript, TypeScript, Python, C, SQL"],
  ["Frameworks", "Node.js, discord.js, React, Next.js, Vue"],
  ["Data", "SQLite, PostgreSQL, MongoDB, Redis"],
  ["Infrastructure", "Linux, Proxmox, Docker, Caddy, Prometheus, Grafana, Cloudflare"],
  ["AI", "Local model training and inference, Anthropic SDK, MCP, evals"],
  ["Certification", "SAP ABAP NetWeaver 7.50"],
];
