import { ogImage, ogSize } from "../../../lib/og";
import { projects, getProject } from "../../../lib/projects";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "A project by Leelakrishna Ravuri";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }) {
  const { slug } = await params;
  const p = getProject(slug);
  return ogImage({ label: "ravuri.dev · work", title: p?.name ?? "Work", line: p?.line ?? "", me: { pose: "cheer", face: "happy" } });
}
