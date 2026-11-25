// The skills list on /about. The names come from the resume (lib/resume.js),
// so the two never disagree; this file only adds where each one shows up in
// my own work, so a reader can go and look instead of taking the word for it.
import { skills } from "./resume";

// skill (as the resume spells it, or the start of it) -> where it's used
const proof = {
  JavaScript: { href: "/work/dexter", hue: "dexter", where: "Dexter AI bots" },
  TypeScript: { href: "/work/net-triage", hue: "net-triage", where: "net-triage" },
  Python: { href: "/work/lazarus", hue: "lazarus", where: "lazarus" },
  SQL: { href: "/work/dexter", hue: "dexter", where: "Dexter AI bots" },
  "Node.js": { href: "/work/dexter", hue: "dexter", where: "Dexter AI bots" },
  "discord.js": { href: "/work/dexter", hue: "dexter", where: "Dexter AI bots" },
  "Next.js": { href: "https://github.com/LeelaKrishna-R/krishnar.xyz", where: "this site" },
  React: { href: "https://github.com/LeelaKrishna-R/krishnar.xyz", where: "this site" },
  SQLite: { href: "/work/dexter", hue: "dexter", where: "Dexter AI bots" },
  MongoDB: { href: "/work/shero", hue: "shero", where: "Shero" },
  Redis: { href: "/work/shero", hue: "shero", where: "Shero" },
  Linux: { href: "/work/homelab-harden", hue: "homelab-harden", where: "homelab-harden" },
  "Proxmox VE": { href: "/homelab", where: "my homelab" },
  "Proxmox Backup Server": { href: "/homelab", where: "my homelab" },
  Docker: { href: "/work/homelab-audit", hue: "homelab-audit", where: "homelab-audit" },
  "Cloudflare Tunnel": { href: "/homelab", where: "my homelab" },
  Caddy: { href: "/homelab", where: "my homelab" },
  Authelia: { href: "/homelab", where: "my homelab" },
  PM2: { href: "/work/dexter", hue: "dexter", where: "Dexter AI bots" },
  systemd: { href: "/work/lazarus", hue: "lazarus", where: "lazarus" },
  SSH: { href: "/work/lazarus", hue: "lazarus", where: "lazarus" },
  Prometheus: { href: "/homelab", where: "my homelab" },
  Grafana: { href: "/homelab", where: "my homelab" },
  DNS: { href: "/homelab", where: "my homelab" },
  "reverse proxies": { href: "/homelab", where: "my homelab" },
  "Cisco IOS": { href: "/work/net-triage", hue: "net-triage", where: "net-triage" },
  "LLM agents": { href: "/work/friday", hue: "friday", where: "Friday" },
  "evaluation sets": { href: "/blog/eval-harness-matters", hue: "net-triage", where: "how I test net-triage" },
  "structured outputs": { href: "/work/net-triage", hue: "net-triage", where: "net-triage" },
  "Anthropic SDK": { href: "/work/net-triage", hue: "net-triage", where: "net-triage" },
  "Model Context Protocol": { href: "/work/iris", hue: "iris", where: "Iris" },
};

// split on commas that aren't inside parentheses
function split(s) {
  const out = [];
  let depth = 0;
  let cur = "";
  for (const ch of s) {
    if (ch === "(") depth++;
    if (ch === ")") depth--;
    if (ch === "," && depth === 0) {
      out.push(cur.trim());
      cur = "";
    } else cur += ch;
  }
  if (cur.trim()) out.push(cur.trim());
  return out;
}

const find = (name) => {
  if (proof[name]) return proof[name];
  const key = Object.keys(proof).find((k) => name.startsWith(k));
  return key ? proof[key] : null;
};

export const skillGroups = skills.map(([group, list]) => ({
  group,
  items: split(list).map((name) => ({ name, ...(find(name) || {}) })),
}));
