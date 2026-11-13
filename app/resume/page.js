import SectionHead from "../../components/SectionHead";
import { Download } from "../../components/Icons";

export const metadata = {
  title: "Resume",
  description: "Leelakrishna Ravuri's resume, to read here or download as PDF or plain text.",
};

const files = [
  { href: "/resume/Leelakrishna-Ravuri-ATS.pdf", label: "PDF", note: "one page, ATS-friendly" },
  { href: "/resume/resume-ats.txt", label: "Plain text", note: "for application forms" },
  { href: "/resume/Leelakrishna_Ravuri_Original.pdf", label: "Long version", note: "PDF, with project details" },
];

export default function ResumePage() {
  return (
    <>
      <header className="page-head wrap">
        <SectionHead as="h1" path="~/resume" before="" mark="Resume" />
      </header>
      <section className="page-section" style={{ paddingTop: 0 }}>
        <div className="wrap resume-grid">
          <div className="direct">
            {files.map((f) => (
              <a key={f.href} className="sticker" href={f.href} download data-reveal>
                <Download />
                <span>
                  {f.label}
                  <small>{f.note}</small>
                </span>
              </a>
            ))}
          </div>
          <div className="sticker resume-frame" data-reveal>
            <iframe src="/resume/Leelakrishna-Ravuri-ATS.pdf#toolbar=0&navpanes=0&view=FitH" title="Resume (PDF)" loading="lazy" />
          </div>
        </div>
      </section>
    </>
  );
}
