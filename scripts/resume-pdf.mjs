// Prints the ATS-friendly resume PDF from lib/resume.js, so the PDF, /resume
// and /resume.txt all say the same thing. One column, a standard font, ruled
// standard headings and real selectable text: what applicant tracking systems
// parse cleanly. Needs a local Chrome (set CHROME to its path if it isn't in
// the default place); writes public/resume/Leelakrishna-Ravuri-Resume.pdf.
//
//   node scripts/resume-pdf.mjs
import { execFileSync } from "node:child_process";
import { mkdtempSync, writeFileSync, existsSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { person, summary, skills, experience, projects, certifications, education, pdfPath } from "../lib/resume.js";
import { site, links } from "../lib/site.js";

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const host = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const item = (org, place, role, when, points = [], boldPlace = false) => `
  <div class="item">
    <div class="row"><span class="org">${esc(org)}</span><span>${boldPlace ? `<b>${esc(place)}</b>` : esc(place)}</span></div>
    <div class="row"><span>${esc(role)}</span><span class="when">${esc(when)}</span></div>
    ${points.length ? `<ul>${points.map((p) => `<li>${esc(p)}</li>`).join("")}</ul>` : ""}
  </div>`;

const html = `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${esc(person.name)} - Resume</title>
<style>
  @page { size: Letter; margin: 0.35in 0.5in; }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: "Times New Roman", Times, serif; font-size: 10pt; line-height: 1.11; color: #000; }
  a { color: #0645ad; text-decoration: underline; }
  h1 { margin: 0; text-align: center; font-size: 17pt; letter-spacing: 0.02em; }
  .title { margin: 1pt 0 0; text-align: center; font-size: 13pt; font-weight: bold; }
  .contact { margin: 2pt 0 0; text-align: center; font-size: 10.2pt; }
  h2 { margin: 5pt 0 2pt; padding-bottom: 1pt; border-bottom: 1.2px solid #000; font-size: 10.8pt; color: #4a4a4a; text-transform: uppercase; letter-spacing: 0.02em; }
  p { margin: 0; }
  .summary { text-align: justify; }
  .skills p { margin: 0 0 1pt; }
  .row { display: flex; justify-content: space-between; gap: 12pt; }
  .org { font-weight: bold; text-transform: uppercase; }
  .item { margin-top: 4pt; }
  .item:first-of-type { margin-top: 0; }
  .when { font-weight: bold; white-space: nowrap; }
  ul { margin: 1.5pt 0 0; padding-left: 20pt; }
  li { margin: 0 0 0.5pt; }
</style></head><body>
  <h1>${esc(person.name.toUpperCase())}</h1>
  <p class="title">${esc(person.title)}</p>
  <p class="contact">${esc(person.place)} | <a href="mailto:${site.email}">${esc(site.email)}</a> | <a href="${site.url}">${host(site.url)}</a> | <a href="${links.github}">${host(links.github)}</a> | <a href="${links.linkedin}">${host(links.linkedin)}</a></p>

  <h2>Summary</h2>
  <p class="summary">${esc(summary)}</p>

  <h2>Skills</h2>
  <div class="skills">${skills.map(([k, v]) => `<p><b>${esc(k)}</b>: ${esc(v)}</p>`).join("")}</div>

  <h2>Work Experience</h2>
  ${experience.map((e) => item(e.org, e.place, e.role, e.when, e.points)).join("")}

  <h2>Projects</h2>
  <ul>${projects.map((p) => `<li><b>${esc(p.name)}</b> (${esc(p.tech)}): ${esc(p.text)}</li>`).join("")}</ul>

  <h2>Certifications</h2>
  <p>${certifications.map(esc).join(" | ")}</p>

  <h2>Education</h2>
  ${education.map((e) => item(e.school, e.place, e.degree, e.when, [], true)).join("")}
</body></html>`;

const chrome =
  process.env.CHROME ||
  ["C:/Program Files/Google/Chrome/Application/chrome.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/usr/bin/google-chrome"].find(
    (p) => existsSync(p),
  );
if (!chrome) throw new Error("No Chrome found; set CHROME to its path.");

const dir = mkdtempSync(join(process.env.TMPDIR || process.env.TEMP || tmpdir(), "resume-"));
const page = join(dir, "resume.html");
writeFileSync(page, html);
const out = resolve("public" + pdfPath);
execFileSync(chrome, [
  "--headless=new",
  "--disable-gpu",
  `--user-data-dir=${join(dir, "profile")}`,
  "--no-pdf-header-footer",
  `--print-to-pdf=${out}`,
  pathToFileURL(page).href,
]);
rmSync(dir, { recursive: true, force: true });
console.log("wrote", out);
