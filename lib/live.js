// Live numbers, fetched on the server and cached so the page renders with real
// values instead of loading placeholders. Each fetch fails soft: a missing
// number is left out rather than shown as zero.

const GH_USER = "LeelaKrishna-R";
const DISCORD_INVITE = "dexterai";

async function getJson(url, revalidate, headers = {}) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "krishnar.xyz", ...headers },
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
