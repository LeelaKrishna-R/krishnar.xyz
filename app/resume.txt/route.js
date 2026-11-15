// /resume.txt: the same resume as /resume and the PDF, as plain text for
// application forms that want it pasted in.
import { person, summary, experience, projects, certifications, education, skills } from "../../lib/resume";
import { links, site } from "../../lib/site";

export const dynamic = "force-static";

export function GET() {
  const out = [];
  out.push(person.name.toUpperCase(), person.title);
  out.push(`${person.place} | ${site.email} | ${site.url.replace("https://www.", "")} | ${links.github} | ${links.linkedin}`);
  out.push("", "SUMMARY", summary, "", "SKILLS");
  for (const [k, v] of skills) out.push(`${k}: ${v}`);
  out.push("", "WORK EXPERIENCE");
  for (const e of experience) {
    out.push(`${e.org.toUpperCase()} | ${e.place}`, `${e.role} | ${e.when}`);
    for (const p of e.points) out.push(`- ${p}`);
    out.push("");
  }
  out.push("PROJECTS");
  for (const p of projects) out.push(`- ${p.name} (${p.tech}): ${p.text}`);
  out.push("", "CERTIFICATIONS");
  for (const c of certifications) out.push(`- ${c}`);
  out.push("", "EDUCATION");
  for (const e of education) out.push(`${e.school.toUpperCase()} | ${e.place}`, `${e.degree} | ${e.when}`);
  return new Response(out.join("\n") + "\n", {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
