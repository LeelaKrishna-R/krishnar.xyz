// The work, as data. Shared by the home page and /projects.
// Every claim here can be checked at the linked repo or site.

export const projects = [
  {
    slug: "dexter",
    name: "Dexter AI community bots",
    accent: "#e9a934",
    meta: "discord.js · Node.js · SQLite · Lavalink",
    summary:
      "The bots behind the Discord community for Dexter, a voice-controlled AI cohost for Twitch streamers. Four bots split the work: Spark runs the community commands and economy, Warden moderates, Sentinel handles automod, verification and logging, and Steward runs modmail and tickets. Two more play music. They run on a VM in my homelab.",
    points: [
      "Spark has no gateway connection. Its commands arrive as signed HTTP interactions and everything it does goes out over REST; Warden watches the gateway and hands Spark the work.",
      "Two music bots, Clarity and Cadence, each with its own Lavalink connection. A command goes to whichever bot is already in your voice channel, or to one that's free.",
      "One SQLite database shared by every process, with more than 650 migrations behind it.",
      "Moderation, automod, anti-raid, verification, levels, an economy, arcade games, giveaways, tickets and modmail, plus a dashboard and the public site at dexterai.dev.",
      "Over 2,500 commits since the discord.js rewrite started in May 2026.",
    ],
    tags: ["discord.js", "Node.js", "SQLite", "Lavalink"],
    cover: { src: "/work/cover-dexter.webp", alt: "The dexterai.dev home page" },
    live: "discord",
    links: [
      { label: "dexterai.dev", href: "https://dexterai.dev" },
      { label: "Join the server", href: "https://discord.gg/dexterai" },
    ],
    wide: true,
  },
  {
    slug: "friday",
    name: "Friday",
    accent: "#d9603f",
    meta: "Personal AI · runs on one Mac at home",
    summary:
      "A personal AI that reads my mail, calendar and homelab, sends me a brief every morning and evening, turns bills into reminders, and asks before it does anything risky.",
    points: [
      "Each bill in my mail gets a reminder two days before it's due, and the reminder checks itself off when the payment confirmation arrives. No bank is connected.",
      "Ask it how the homelab is doing and it reads the machines, health checks and alerts live. Stopping, updating or rolling back a machine waits for my yes.",
      "It says which email, event or page an answer came from, and says so when it has no source.",
      "Approvals come to my iPhone, my Mac, or Iris.",
    ],
    tags: ["Agents", "Self-hosted", "macOS"],
    cover: { src: "/work/cover-friday.webp", alt: "The heyfriday.dev home page" },
    links: [{ label: "heyfriday.dev", href: "https://heyfriday.dev" }],
  },
  {
    slug: "iris",
    name: "Iris",
    started: "Oct 2026",
    accent: "#9b86c8",
    meta: "Swift · Python · MCP",
    summary:
      "A small animated character for the Mac desktop that any AI agent can use as its face. She speaks its replies, glances up when a task finishes, and shows Allow / Deny before an agent does something.",
    points: [
      "Claude Code, Codex, Cursor and Gemini CLI connect through an MCP server or their own hooks; scripts use a small CLI or the HTTP API.",
      "The local API only answers requests signed with a key that only your macOS user can read.",
      "194 animations. She can't click, type or press keys: her hands are left out of the agent interface on purpose.",
    ],
    tags: ["Swift", "MCP", "macOS"],
    cover: { src: "/work/iris.webp", alt: "Iris, a chibi character in a cream hoodie", contain: true, className: "cover-iris" },
    links: [{ label: "Repository", href: "https://github.com/LeelaKrishna-R/iris" }],
  },
  {
    slug: "shero",
    name: "Shero",
    started: "Apr 2021",
    accent: "#2f9c8f",
    meta: "Node.js · MongoDB · Redis · Next.js",
    summary:
      "A Discord bot that runs private, read-only permission checks, watches servers for new risky roles and channels, and takes admin requests in plain language. It's in more than 13,000 servers.",
    points: [
      "Started in Node.js with MongoDB and Redis behind it, and a Next.js site for setup.",
      "Permission Watch compares a server's roles and channels daily and alerts the staff channel when a new risk appears.",
      "Shero AI takes requests like creating channels or roles, and checks permissions before it changes anything.",
    ],
    tags: ["Node.js", "MongoDB", "Redis"],
    cover: { src: "/work/cover-shero.webp", alt: "The sherobot.xyz home page" },
    links: [{ label: "sherobot.xyz", href: "https://www.sherobot.xyz" }],
    fact: { value: "13,000+", label: "servers" },
    wide: true,
    flip: true,
  },
];

// Smaller tools, each with a few lines of its real output.
export const tools = [
  {
    name: "net-triage",
    href: "https://github.com/LeelaKrishna-R/net-triage",
    summary:
      "Reads a network log or device config and returns a typed diagnosis with the exact evidence lines. An eval harness scores it against 16 labelled Cisco IOS fixtures.",
    term: [
      ["p", "$ npm run eval"],
      ["", "[PASS] bgp-neighbor-as-mismatch  conf 99%"],
      ["", "[PASS] stp-loop-macflap          conf 97%"],
      ["dim", "... 14 more ..."],
      ["ok", "Accuracy: 16/16 (100%)"],
      ["dim", "Total cost: $0.1977"],
    ],
    tags: ["TypeScript", "Claude", "Evals"],
  },
  {
    name: "lazarus",
    href: "https://github.com/LeelaKrishna-R/lazarus",
    summary:
      "Watches hosts from a YAML file, ignores one-off blips, and runs a whitelisted fix over SSH when something stays down. One dependency and a dry-run mode.",
    term: [
      ["p", "$ lazarus run-once --dry-run"],
      ["hi", "opened service_down on friday-nuc"],
      ["", "[dry-run] would run on friday-nuc:"],
      ["", "  systemctl restart friday"],
      ["dim", "host friday-nuc: down    # exit 1"],
    ],
    tags: ["Python", "SSH", "Cron"],
  },
  {
    name: "agent-budget",
    href: "https://www.npmjs.com/package/@leelakrishnaravuri/agent-budget",
    summary:
      "An npm package that meters tokens and dollars for LLM agents and can stop a call before it goes over budget. Zero dependencies; costs are counted in integer microdollars.",
    term: [
      ["", "const budget = new AgentBudget({"],
      ["", "  limitUSD: 0.5,"],
      ["", "  warnAtPercent: 80,"],
      ["", "  guardBefore: true,"],
      ["", "});"],
      ["dim", "budget.on('exceeded', snap => ...)"],
    ],
    tags: ["TypeScript", "npm"],
  },
  {
    name: "homelab-audit",
    href: "https://github.com/LeelaKrishna-R/homelab-audit",
    summary:
      "Lints a docker-compose file for the usual self-hosting mistakes: databases on 0.0.0.0, passwords in environment, the Docker socket mounted, privileged containers.",
    term: [
      ["p", "$ homelab-audit docker-compose.yml"],
      ["hi", "[HIGH] db  port 5432 published to 0.0.0.0"],
      ["hi", "[HIGH] db  hardcoded POSTGRES_PASSWORD"],
      ["", "[LOW ] cache  image uses :latest"],
      ["dim", "3 high, 1 medium, 1 low"],
    ],
    tags: ["TypeScript", "Docker"],
  },
  {
    name: "homelab-harden",
    href: "https://github.com/LeelaKrishna-R/homelab-harden",
    summary:
      "A read-only audit of a Linux server: root SSH, password logins, firewall, automatic updates, fail2ban, services listening everywhere. It never changes the system.",
    term: [
      ["p", "$ sudo homelab-harden"],
      ["hi", "[HIGH] SSH permits direct root login"],
      ["hi", "[HIGH] No active host firewall"],
      ["", "[MED ] fail2ban is not running"],
      ["dim", "4 high, 1 medium, 0 low"],
    ],
    tags: ["Python", "Linux"],
  },
];

export const earlier = [
  {
    name: "Soil nutrient monitor",
    when: "Sep 2021 to Apr 2022",
    summary:
      "I led a team of four that built a sensor array and a microcontroller to read NPK levels in soil, then suggest high-yield crops and fertiliser from the readings.",
    tags: ["IoT", "Embedded", "Sensors"],
  },
];
