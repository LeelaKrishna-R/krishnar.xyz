// /resume.txt: the same resume as /resume, as plain text for application forms.
import { summary, experience, projects, education, skills } from "../../lib/resume";
import { links, site } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const out = [];
  out.push("KRISHNA (LEELAKRISHNA) RAVURI");
  out.push(`Denton, Texas | ${site.email} | ${links.github} | ${links.linkedin}`);
  out.push("", summary, "", "EXPERIENCE");
  for (const e of experience) {
    out.push([e.what, e.when, e.where].filter(Boolean).join(" | "));
    for (const p of e.points) out.push(`- ${p}`);
  }
  out.push("", "PROJECTS");
  for (const [k, v] of projects) out.push(`- ${k}: ${v}`);
  out.push("", "EDUCATION");
  for (const e of education) out.push(`${e.what} | ${e.when}`, e.where, `- ${e.note}`);
  out.push("", "SKILLS");
  for (const [k, v] of skills) out.push(`${k}: ${v}`);
  return new Response(out.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
