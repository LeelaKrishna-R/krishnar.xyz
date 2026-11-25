// Live numbers, fetched on the server and cached so the page renders with real
// values instead of loading placeholders. Each fetch fails soft: a missing
// number is left out rather than shown as zero.

const GH_USER = "LeelaKrishna-R";
const DISCORD_INVITE = "dexterai";

async function getJson(url, revalidate, headers = {}) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "ravuri.dev", ...headers },
      next: { revalidate },
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

// Longest and current run of days with at least one contribution.
function streaks(days) {
  let longest = 0;
  let run = 0;
  for (const d of days) {
    run = d.count > 0 ? run + 1 : 0;
    if (run > longest) longest = run;
  }
  let current = 0;
  for (let i = days.length - 1; i >= 0; i--) {
    if (days[i].count > 0) current++;
    else if (i === days.length - 1) continue; // today may not have a commit yet
    else break;
  }
  return { longest, current };
}

export async function getGithub() {
  const auth = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  const [user, contrib] = await Promise.all([
    getJson(`https://api.github.com/users/${GH_USER}`, 3600, auth),
    getJson(`https://github-contributions-api.jogruber.de/v4/${GH_USER}?y=last`, 3600),
  ]);
  const days = Array.isArray(contrib?.contributions)
    ? [...contrib.contributions].sort((a, b) => (a.date < b.date ? -1 : 1))
    : null;
  return {
    repos: typeof user?.public_repos === "number" ? user.public_repos : null,
    followers: typeof user?.followers === "number" ? user.followers : null,
    lastYear: typeof contrib?.total?.lastYear === "number" ? contrib.total.lastYear : null,
    days,
    ...(days ? streaks(days) : { longest: null, current: null }),
  };
}

export async function getCommunity() {
  const j = await getJson(`https://discord.com/api/v10/invites/${DISCORD_INVITE}?with_counts=true`, 600);
  if (!j || typeof j.approximate_member_count !== "number") return null;
  return { members: j.approximate_member_count, online: j.approximate_presence_count ?? null };
}

// The homelab's public health summary (a small read-only service on the lab,
// published at LAB_STATUS_URL). Only the expected numbers are kept, so nothing
// else the endpoint might send ever reaches the page. Unset or down: null, and
// the homelab page simply leaves the badge out.
export async function getLab() {
  const url = process.env.LAB_STATUS_URL;
  if (!url) return null;
  const j = await getJson(url, 60);
  const n = (v) => (Number.isInteger(v) && v >= 0 ? v : null);
  if (!j || !j.checks || n(j.checks.up) === null || !n(j.checks.total)) return null;
  const backup = j.lastBackup ? Date.parse(j.lastBackup) : NaN;
  return {
    up: j.checks.up,
    total: j.checks.total,
    nodes: { node1: j.nodes?.node1 === true, node2: j.nodes?.node2 === true },
    lastBackup: Number.isFinite(backup) ? backup : null,
  };
}

// The newest commit across my public repos (the profile README repo and forks
// left out), for the home page's "Latest" line. Cached for 10 minutes; any
// failure just hides the line.
export async function getLatestCommit() {
  const auth = process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {};
  const repos = await getJson(`https://api.github.com/users/${GH_USER}/repos?sort=pushed&per_page=8`, 600, auth);
  // this site's own repo is left out: its commits are notes about the site, not my projects
  const repo = Array.isArray(repos) ? repos.find((r) => !r.fork && r.name !== GH_USER && r.name !== "krishnar.xyz") : null;
  if (!repo) return null;
  const commits = await getJson(`https://api.github.com/repos/${GH_USER}/${repo.name}/commits?per_page=1`, 600, auth);
  const c = Array.isArray(commits) ? commits[0] : null;
  const message = typeof c?.commit?.message === "string" ? c.commit.message.split("\n")[0].trim() : "";
  const at = c?.commit?.committer?.date || c?.commit?.author?.date;
  if (!message || !at) return null;
  return {
    repo: repo.name,
    message: message.length > 90 ? message.slice(0, 87).trimEnd() + "…" : message,
    url: typeof c.html_url === "string" && c.html_url.startsWith("https://github.com/") ? c.html_url : repo.html_url,
    at,
  };
}
