// Real, verifiable work. `featured` is the shipped stuff I lead with;
// `earlier` is genuine older work. Shared by the home page (pinned) and /projects.

export const featuredProjects = [
  {
    title: "net-triage",
    meta: "TypeScript · 18 tests · eval 6/6",
    desc: "An LLM agent that reads a network log or device config and returns a structured, evidence-grounded diagnosis, pointing at the exact lines behind each call.",
    detail:
      "The real work isn't the model call, it's the eval harness that scores accuracy across fixtures, so quality is a measured number instead of a vibe.",
    tags: ["TypeScript", "LLM agent", "Eval harness"],
    links: [{ label: "Repository", href: "https://github.com/LeelaKrishna-R/net-triage" }],
  },
  {
    title: "lazarus",
    meta: "Python · 1 dependency · 42 tests",
    desc: "A self-healing monitor for a homelab. It watches your hosts, shrugs off one-off blips, and restarts a downed service over SSH on its own.",
    detail:
      "Built to stay safe: it only runs whitelisted commands, backs off after a couple of tries, and has a dry-run mode so you can see exactly what it would do first.",
    tags: ["Python", "Homelab", "Self-healing"],
    links: [{ label: "Repository", href: "https://github.com/LeelaKrishna-R/lazarus" }],
  },
  {
    title: "agent-budget",
    meta: "TypeScript · npm · zero dependencies",
    desc: "A published npm package that tracks token usage and cost for LLM agents, so you can set a budget on an agent and actually see what it's spending.",
    detail:
      "Drop-in middleware around your model calls that meters tokens and dollars and keeps an agent from blowing past its budget.",
    tags: ["TypeScript", "npm", "Zero deps"],
    links: [
      { label: "Repository", href: "https://github.com/LeelaKrishna-R/agent-budget" },
      { label: "npm", href: "https://www.npmjs.com/package/@leelakrishnaravuri/agent-budget" },
    ],
  },
  {
    title: "Friday",
    meta: "Multi-agent · self-hosted · code opening soon",
    desc: "A personal AI assistant built as a set of small agents that hand work off to each other, with a self-healing layer that brings things back when they fall over. Runs on my own hardware.",
    detail:
      "It's the system the homelab tooling grew out of. Lives at heyfriday.dev, and the code goes public soon.",
    tags: ["Multi-agent", "Self-hosted", "Homelab"],
    links: [{ label: "heyfriday.dev", href: "https://heyfriday.dev" }],
  },
];

export const earlierProjects = [
  {
    title: "Shero: Discord bot",
    meta: "discord.js · Node.js · Redis",
    desc: "A feature-rich Discord bot built with discord.js: sharded architecture, Redis-backed queues and metrics, and structured logging.",
    detail:
      "Sharded with broadcastEval, Redis for queues and counters, health checks and structured logs. This is the hands-on Node work behind most of what I know.",
    tags: ["discord.js", "Node.js", "Redis"],
    links: [
      { label: "Website", href: "https://www.sherobot.xyz/" },
      { label: "Support server", href: "https://discord.com/invite/7HYGffEPMD" },
    ],
  },
];
