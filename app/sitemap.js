import { site } from "../lib/site";
import { getAllPosts } from "../lib/posts";

export default async function sitemap() {
  const pages = ["", "/projects", "/homelab", "/blog", "/contact", "/resume"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  const posts = (await getAllPosts()).map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date }));
  return [...pages, ...posts];
}
