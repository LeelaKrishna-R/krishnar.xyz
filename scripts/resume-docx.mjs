// Writes the Word version of the resume from lib/resume.js, in the same
// layout as the PDF (scripts/resume-pdf.mjs): one column, Times New Roman,
// ruled standard headings, org/place and role/dates on shared lines. Some job
// portals only take .docx; this keeps it saying exactly what the PDF says.
//
//   node scripts/resume-docx.mjs     -> public/resume/Leelakrishna-Ravuri-Resume.docx
import { writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  AlignmentType,
  BorderStyle,
  Document,
  ExternalHyperlink,
  LevelFormat,
  Packer,
  Paragraph,
  Tab,
  TabStopType,
  TextRun,
} from "docx";
import { person, summary, skills, experience, projects, certifications, education, docxPath } from "../lib/resume.js";
import { site, links } from "../lib/site.js";

const FONT = "Times New Roman";
const PT = (n) => Math.round(n * 2); // docx sizes are half-points
const SP = (n) => Math.round(n * 20); // spacing in twentieths of a point
const WIDTH = 12240 - 2 * 720; // Letter, 0.5in side margins
const host = (u) => u.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const run = (text, o = {}) => new TextRun({ text, font: FONT, size: PT(10), ...o });
// a real Word tab (<w:tab/>) then the text; the right tab stop pushes it to the edge
const rightRun = (text, o = {}) => new TextRun({ children: [new Tab(), text], font: FONT, size: PT(10), ...o });
const link = (text, href) =>
  new ExternalHyperlink({
    link: href,
    children: [run(text, { color: "0645AD", underline: {} })],
  });

const heading = (text) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: SP(5), after: SP(2) },
    border: {
      bottom: { style: BorderStyle.SINGLE, size: 8, color: "000000", space: 1 },
    },
    children: [run(text.toUpperCase(), { bold: true, size: PT(10.8), color: "4A4A4A" })],
  });

// left text, right text on one line (right tab at the text edge)
const row = (left, right, { first = false, leftBold = false, rightBold = false, upper = false } = {}) =>
  new Paragraph({
    keepNext: true,
    spacing: { before: first ? 0 : SP(4), after: 0 },
    tabStops: [{ type: TabStopType.RIGHT, position: WIDTH }],
    children: [run(upper ? left.toUpperCase() : left, { bold: leftBold }), rightRun(right, { bold: rightBold })],
  });

const bullet = (children) =>
  new Paragraph({
    numbering: { reference: "dots", level: 0 },
    spacing: { before: SP(1.5), after: 0 },
    children,
  });

const item = (org, place, role, when, points = [], boldPlace = false) => [
  row(org, place, { leftBold: true, upper: true, rightBold: boldPlace }),
  new Paragraph({
    keepNext: points.length > 0,
    tabStops: [{ type: TabStopType.RIGHT, position: WIDTH }],
    children: [run(role), rightRun(when, { bold: true })],
  }),
  ...points.map((p) => bullet([run(p)])),
];

const contact = [
  run(`${person.place} | `),
  link(site.email, `mailto:${site.email}`),
  run(" | "),
  link(host(site.url), site.url),
  run(" | "),
  link(host(links.github), links.github),
  run(" | "),
  link(host(links.linkedin), links.linkedin),
];

const doc = new Document({
  creator: person.name,
  title: `${person.name} - Resume`,
  styles: {
    default: {
      document: {
        run: { font: FONT, size: PT(10) },
        paragraph: { spacing: { line: 266 } },
      },
    },
  },
  numbering: {
    config: [
      {
        reference: "dots",
        levels: [
          {
            level: 0,
            format: LevelFormat.BULLET,
            text: "•",
            alignment: AlignmentType.LEFT,
            style: { paragraph: { indent: { left: 400, hanging: 220 } } },
          },
        ],
      },
    ],
  },
  sections: [
    {
      properties: {
        page: {
          size: { width: 12240, height: 15840 },
          margin: { top: 504, bottom: 504, left: 720, right: 720 },
        },
      },
      children: [
        new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [run(person.name.toUpperCase(), { bold: true, size: PT(17) })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: SP(1) },
          children: [run(person.title, { bold: true, size: PT(13) })],
        }),
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: SP(2) },
          children: contact,
        }),

        heading("Summary"),
        new Paragraph({
          alignment: AlignmentType.JUSTIFIED,
          children: [run(summary)],
        }),

        heading("Skills"),
        ...skills.map(
          ([k, v]) =>
            new Paragraph({
              spacing: { after: SP(1) },
              children: [run(k, { bold: true }), run(`: ${v}`)],
            }),
        ),

        heading("Work Experience"),
        ...experience.flatMap((e) => item(e.org, e.place, e.role, e.when, e.points)),

        heading("Projects"),
        ...projects.map((p) => bullet([run(p.name, { bold: true }), run(` (${p.tech}): ${p.text}`)])),

        heading("Certifications"),
        new Paragraph({ children: [run(certifications.join(" | "))] }),

        heading("Education"),
        ...education.flatMap((e) => item(e.school, e.place, e.degree, e.when, [], true)),
      ],
    },
  ],
});

const out = resolve("public" + docxPath);
writeFileSync(out, await Packer.toBuffer(doc));
console.log("wrote", out);
