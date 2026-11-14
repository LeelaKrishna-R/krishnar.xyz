# krishnar.xyz

My personal site: the Discord bots I build, Friday, Iris, my homelab, and a few blog posts.

Live at [krishnar.xyz](https://krishnar.xyz).

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) and React 19
- Plain CSS in `app/globals.css`, with every colour as a token and a dark theme that only swaps the tokens
- Fonts in `app/fonts` (Bricolage Grotesque, Figtree, Shantell Sans, JetBrains Mono), loaded with `next/font/local`
- [Resend](https://resend.com/) for the contact form
- Deployed on [Vercel](https://vercel.com/), which builds every push to `main`

No UI framework, no icon library, no animation library. The story animations are CSS, triggered by one small observer (`components/ScrollFx.jsx`), and every scene shows finished with reduced motion or without JavaScript.

## Pages

- **Home**: a scroll story, one animated scene per chapter (2019 bots, Shero, Madurai to Texas, the Dexter bots, the homelab and the AI side projects, now), ending on what I'm looking for. Scenes are in `components/story/Story.jsx`.
- **Work** (`/work`): everything, with a page per project at `/work/<slug>`.
- **Homelab**: the two nodes, what runs on them, and what broke.
- **Writing** (`/blog`): Markdown posts in `app/blog/posts/`.
- **About**: bio, timeline, a year of GitHub contributions.
- **Resume**: an HTML page and `/resume.txt`, both from `lib/resume.js`.
- **Contact**.

## Live numbers

Fetched on the server and cached (`lib/live.js`), so they're in the HTML rather than loading in:

- GitHub profile and contribution data: `api.github.com` and `github-contributions-api.jogruber.de`, refreshed hourly.
- Dexter AI community member and online counts: Discord's public invite endpoint, refreshed every ten minutes.

If a source is down, that number is left out instead of showing zero.

## Where the content lives

| What | File |
|---|---|
| Name, email, links, nav | `lib/site.js` |
| Projects (list rows and their pages) | `lib/projects.js` |
| Timeline | `lib/timeline.js` |
| Homelab machines, what runs, what broke | `lib/lab.js` |
| Blog posts | `app/blog/posts/*.md` (frontmatter: `title`, `date`) |
| Project screenshots | `public/work/` |

## Local development

```bash
git clone https://github.com/LeelaKrishna-R/krishnar.xyz.git
cd krishnar.xyz
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Only the contact form needs them. Create `.env.local`:

```env
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev

# Optional: a token raises the GitHub API rate limit
GITHUB_TOKEN=your_github_token
```

Without `RESEND_API_KEY` the site still builds; the form just reports that email isn't configured.

## License

MIT.
