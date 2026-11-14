// Everything I've made. The home page and /work list them; each one also gets
// its own page at /work/<slug>. Facts come from the repos and the live sites.

export const projects = [
  {
    slug: "dexter",
    name: "Dexter AI bots",
    kind: "big",
    year: "2026",
    line: "Six bots that run the Discord server for Dexter AI.",
    lede: "Dexter is a voice AI cohost for Twitch streamers. I write and run the bots for its Discord community.",
    body: [
      "There are four main bots and each one has its own job. Spark does the fun stuff like levels, an economy, games and giveaways. Warden is the moderator. Sentinel handles automod, verification and the server logs. Steward runs tickets and modmail. Then there are two music bots, Clarity and Cadence.",
      "Spark doesn't keep a connection to Discord open at all. Its commands come in over HTTP, and Warden watches the server and passes it the work.",
      "They all share one SQLite database, which is up to 236 migrations now. I rewrote the whole thing in discord.js in May and it's past 2,500 commits since. It runs on a VM in my homelab.",
    ],
    media: { img: "/work/cover-dexter.webp", alt: "The dexterai.dev home page" },
    tags: ["discord.js", "Node.js", "SQLite", "Lavalink"],
    live: "discord",
    links: [
      { label: "dexterai.dev", href: "https://dexterai.dev" },
      { label: "Join the server", href: "https://discord.gg/dexterai" },
    ],
  },
  {
    slug: "friday",
    name: "Friday",
    kind: "big",
    year: "2026",
    line: "My personal AI. Mail, calendar, bills, the homelab.",
    lede: "Friday is the assistant I built for myself. She runs on a Mac at home.",
    body: [
      "She sends me a short brief every morning and evening. She reads my mail, so when a bill shows up she sets a reminder two days before it's due and ticks it off once the payment confirmation arrives. There's no bank connected. It's all from email.",
      "She keeps an eye on the homelab too. I can ask her if there are any alerts, and if I tell her to stop or update a machine she checks with me first.",
      "When I ask how she knows something, she tells me which email or page it came from.",
    ],
    media: { img: "/work/cover-friday.webp", alt: "The heyfriday.dev home page" },
    tags: ["Agents", "Self-hosted", "macOS"],
    links: [{ label: "heyfriday.dev", href: "https://heyfriday.dev" }],
  },
  {
    slug: "iris",
    name: "Iris",
    kind: "big",
    year: "2026",
    line: "A little character on your Mac that talks for your AI agent.",
    lede: "Iris lives on your Mac desktop. Any AI agent can use her as its face.",
    body: [
      "Hook her up to Claude Code, Codex, Cursor or Gemini CLI. She reads the replies out loud and looks up when a task is done. If the agent wants permission for something, she shows you an Allow / Deny card.",
      "She has 194 animations. She can't click or type anything, and that's on purpose.",
    ],
    media: { img: "/work/iris.webp", alt: "Iris, a small anime-style character in a cream hoodie", contain: true },
    tags: ["Swift", "Python", "MCP"],
    links: [{ label: "GitHub", href: "https://github.com/LeelaKrishna-R/iris" }],
  },
  {
    slug: "shero",
    name: "Shero",
    kind: "big",
    year: "2021",
    line: "A Discord bot I started in 2021. It's in 13,000+ servers.",
    lede: "Shero is the Discord bot I started back in April 2021.",
    body: [
      "It began as a way for servers to advertise each other, built in Node.js with MongoDB and Redis.",
      "These days it's mostly about permissions. It checks a server for risky roles and channel settings, keeps checking every day, and tells the staff when something new turns up. There's an AI side as well, so admins can just ask it to do things.",
      "It's in more than 13,000 servers.",
    ],
    media: { img: "/work/cover-shero.webp", alt: "The sherobot.xyz home page" },
    tags: ["Node.js", "MongoDB", "Redis"],
    links: [{ label: "sherobot.xyz", href: "https://www.sherobot.xyz" }],
  },
  {
    slug: "net-triage",
    try: ["git clone https://github.com/LeelaKrishna-R/net-triage && cd net-triage","npm install","export ANTHROPIC_API_KEY=sk-ant-...","node src/cli.ts fixtures/ospf-adjacency/input.txt"],
    name: "net-triage",
    kind: "tool",
    year: "2026",
    line: "Reads a router log and tells you what broke.",
    lede: "Give it a network log or a device config and it tells you what's probably wrong, and which lines gave it away.",
    body: [
      "Most of the work went into the test set: 16 real Cisco IOS cases where I already know the answer. It gets all 16 right at the moment, for about 20 cents a run.",
    ],
    media: {
      term: [
        ["p", "$ npm run eval"],
        ["", "[PASS] bgp-neighbor-as-mismatch: bgp_neighbor_down (exp bgp_neighbor_down, conf 99%)"],
        ["", "[PASS] stp-loop-macflap: stp_loop (exp stp_loop, conf 97%)"],
        ["dim", "... 14 more ..."],
        ["ok", "Accuracy: 16/16 (100%)"],
        ["dim", "Total cost: $0.1977"],
      ],
    },
    tags: ["TypeScript", "Claude"],
    post: "eval-harness-matters",
    links: [{ label: "GitHub", href: "https://github.com/LeelaKrishna-R/net-triage" }],
  },
  {
    slug: "lazarus",
    try: ["git clone https://github.com/LeelaKrishna-R/lazarus && cd lazarus","pip install -e .","lazarus run-once --config examples/config.yaml --dry-run"],
    name: "lazarus",
    kind: "tool",
    year: "2026",
    line: "Restarts things in my homelab when they fall over.",
    lede: "A monitor for my homelab that also fixes things.",
    body: [
      "When a service goes down it waits a moment to make sure it's not just a blip, then restarts it over SSH. It only runs commands I've allowed, and it gives up after a few tries instead of hammering a broken box. There's a dry-run mode too.",
      "Python, one dependency.",
    ],
    media: {
      term: [
        ["p", "$ lazarus run-once --dry-run"],
        ["hi", "opened service_down on friday-nuc"],
        ["", "[dry-run] would run on friday-nuc: systemctl restart friday"],
        ["dim", "host friday-nuc: down  # exit code 1"],
      ],
    },
    tags: ["Python", "SSH"],
    post: "building-lazarus",
    links: [{ label: "GitHub", href: "https://github.com/LeelaKrishna-R/lazarus" }],
  },
  {
    slug: "agent-budget",
    try: ["npm install @leelakrishnaravuri/agent-budget"],
    name: "agent-budget",
    kind: "tool",
    year: "2026",
    line: "Stops AI agents from spending too much.",
    lede: "Wrap it around your LLM calls and it counts tokens and dollars. Once an agent hits its budget, new calls get refused.",
    body: ["No dependencies. It's on npm."],
    media: {
      term: [
        ["", "const budget = new AgentBudget({"],
        ["", "  limitUSD: 0.50,"],
        ["", "  warnAtPercent: 80,"],
        ["", "  guardBefore: true,  // block calls when already exceeded"],
        ["", "});"],
      ],
    },
    tags: ["TypeScript", "npm"],
    links: [
      { label: "npm", href: "https://www.npmjs.com/package/@leelakrishnaravuri/agent-budget" },
      { label: "GitHub", href: "https://github.com/LeelaKrishna-R/agent-budget" },
    ],
  },
  {
    slug: "homelab-audit",
    try: ["git clone https://github.com/LeelaKrishna-R/homelab-audit && cd homelab-audit","npm install","npm run audit fixtures/insecure.yml"],
    name: "homelab-audit",
    kind: "tool",
    year: "2026",
    line: "Finds the usual mistakes in a docker-compose file.",
    lede: "Point it at a docker-compose file and it lists the usual mistakes, like a database open on 0.0.0.0 or a password pasted straight into the file.",
    body: ["It only reads the file. No Docker needed, no network. It runs on Node 24 without a build step."],
    media: {
      term: [
        ["p", "$ homelab-audit docker-compose.yml"],
        ["hi", "[HIGH] db     PostgreSQL port 5432 is published to all interfaces (0.0.0.0)"],
        ["hi", "[HIGH] db     Hardcoded secret in environment: POSTGRES_PASSWORD"],
        ["dim", "  ..."],
        ["dim", "3 high, 1 medium, 1 low"],
      ],
    },
    tags: ["TypeScript", "Docker"],
    links: [{ label: "GitHub", href: "https://github.com/LeelaKrishna-R/homelab-audit" }],
  },
  {
    slug: "homelab-harden",
    try: ["git clone https://github.com/LeelaKrishna-R/homelab-harden && cd homelab-harden","python3 -m homelab_harden --demo"],
    name: "homelab-harden",
    kind: "tool",
    year: "2026",
    line: "Checks a Linux server for the usual security holes.",
    lede: "Run it on a Linux server and it checks the things people forget, like root login over SSH or not having a firewall.",
    body: ["It only looks. It won't change anything on the box."],
    media: {
      term: [
        ["p", "$ sudo homelab-harden"],
        ["hi", "[HIGH] SSH permits direct root login (PermitRootLogin yes)"],
        ["hi", "[HIGH] SSH allows password authentication"],
        ["dim", "  ..."],
        ["dim", "4 high, 1 medium, 0 low"],
      ],
    },
    tags: ["Python", "Linux"],
    links: [{ label: "GitHub", href: "https://github.com/LeelaKrishna-R/homelab-harden" }],
  },
];

export const older = [
  {
    name: "Soil sensor",
    year: "2021",
    line: "Led a team of four on an NPK soil sensor that suggested crops and fertilizer.",
  },
];

export const bigProjects = projects.filter((p) => p.kind === "big");
export const tools = projects.filter((p) => p.kind === "tool");
export const getProject = (slug) => projects.find((p) => p.slug === slug);
