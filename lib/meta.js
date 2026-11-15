// Page metadata in one shape: title, description, the canonical URL, and the
// Open Graph / X cards that point at THIS page (Next doesn't merge a page's
// openGraph with the layout's, so without this every share card claimed to be
// the home page). Share images come from the opengraph-image files.
import { site } from "./site";

export const homeTitle = `${site.name}: Dexter Copilot, Discord bots and a homelab`;

export function meta({ title, description = site.description, path = "/", type = "website", publishedTime, noindex = false }) {
  const full = title ? `${title} · ${site.name}` : homeTitle;
  return {
    ...(title ? { title } : {}),
    description,
    ...(path ? { alternates: { canonical: path } } : {}),
    openGraph: {
      type,
      ...(path ? { url: path } : {}),
      siteName: site.name,
      locale: "en_US",
      title: full,
      description,
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: { card: "summary_large_image", title: full, description },
    ...(noindex ? { robots: { index: false, follow: true } } : {}),
  };
}
