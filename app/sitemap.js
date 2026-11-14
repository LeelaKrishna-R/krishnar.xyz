import { site } from "../lib/site";
import { getAllPosts } from "../lib/posts";
import { projects } from "../lib/projects";

export default async function sitemap() {
  const pages = ["", "/work", "/homelab", "/blog", "/about", "/contact", "/resume"].map((p) => ({
    url: `${site.url}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : 0.7,
  }));
  const posts = (await getAllPosts()).map((p) => ({ url: `${site.url}/blog/${p.slug}`, lastModified: p.date }));
  const work = projects.map((p) => ({ url: `${site.url}/work/${p.slug}` }));
  return [...pages, ...work, ...posts];
}
