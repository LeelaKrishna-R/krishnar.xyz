import { site } from "../lib/site";

// Search engines and link previews (Google, Bing, LinkedIn, Slack, Discord, X)
// stay welcome: recruiters find the site through them. Crawlers that collect
// pages to train AI models or resell scraped data are asked to stay out. This
// is only a request; the Vercel firewall's bot rules are what enforce it.
const blocked = [
  "GPTBot",
  "ClaudeBot",
  "anthropic-ai",
  "Google-Extended",
  "Applebot-Extended",
  "CCBot",
  "Bytespider",
  "Meta-ExternalAgent",
  "meta-externalfetcher",
  "FacebookBot",
  "cohere-ai",
  "cohere-training-data-crawler",
  "Diffbot",
  "AI2Bot",
  "Ai2Bot-Dolma",
  "Omgilibot",
  "Omgili",
  "Timpibot",
  "ImagesiftBot",
  "PanguBot",
  "Kangaroo Bot",
  "img2dataset",
  "Scrapy",
];

export default function robots() {
  return {
    rules: [
      { userAgent: blocked, disallow: "/" },
      { userAgent: "*", allow: "/", disallow: "/api/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
