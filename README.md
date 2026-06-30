# krishnar.xyz

My personal portfolio. It covers what I work on (infrastructure, networking, and the tooling I build), my projects, my homelab, and a small blog.

Live at [krishnar.xyz](https://krishnar.xyz).

## Stack

- [Next.js 15](https://nextjs.org/) (App Router) with React 19
- Plain CSS with theme variables (clean dark + light)
- [react-github-calendar](https://github.com/grubersjoe/react-github-calendar) for the contribution graph
- [Resend](https://resend.com/) for the contact form
- [lucide-react](https://lucide.dev/) for icons
- Deployed on [Vercel](https://vercel.com/)

## Pages

- **Home** — intro, an honest "what I actually work with" section, pinned projects, and a live GitHub section (public repos, followers, contributions in the last year, current and longest streak, and the contribution graph). The stats come from GitHub's public API, so no token is required.
- **Projects** — shipped work and earlier projects, each with a short write-up and links.
- **Homelab** — the infrastructure I actually run at home.
- **Blog** — Markdown posts under `app/blog/posts/`. Drop in a `.md` file with frontmatter and it renders.
- **Contact** — a form wired to Resend, with HTML escaping, input validation, and basic rate limiting.

## Project structure

```
app/
  blog/posts/      Markdown blog posts
  projects/        Projects page
  homelab/         Homelab page
  contact/         Contact form + page
  api/             Server routes (contact, github, log)
  layout.js        Root layout + metadata
  opengraph-image.js  Generated link-preview image
  globals.css      Theme tokens, layout, components
components/         UI components
lib/               Shared project data and blog helpers
public/            Static assets (logo, images)
```

## Local development

```bash
git clone https://github.com/LeelaKrishna-R/krishnar.xyz.git
cd krishnar.xyz
npm install
npm run dev
```

Open http://localhost:3000.

## Environment variables

Only needed for the contact form (and the optional expanded GitHub view). Create `.env.local`:

```env
# Contact form (Resend)
RESEND_API_KEY=your_resend_key
CONTACT_TO_EMAIL=you@example.com
CONTACT_FROM_EMAIL=onboarding@resend.dev

# Optional: higher GitHub API rate limits
GITHUB_TOKEN=your_github_token
```

The home page GitHub stats and contribution graph use public APIs and work without any token.

## Deployment

Hosted on Vercel with automatic builds on push to `main`. Set the environment variables in the Vercel project settings.

## License

MIT.
