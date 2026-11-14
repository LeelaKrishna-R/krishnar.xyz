export const metadata = {
  title: "Resume",
  description: "Krishna's resume as a PDF or plain text.",
};

export default function ResumePage() {
  return (
    <>
      <header className="wrap narrow page-head">
        <h1>Resume</h1>
        <div className="btns" style={{ marginTop: 20 }}>
          <a className="btn btn-gold" href="/resume/Leelakrishna-Ravuri-ATS.pdf" download>
            Download PDF
          </a>
          <a className="btn" href="/resume/resume-ats.txt" download>
            Plain text
          </a>
        </div>
      </header>
      <div className="wrap narrow">
        <div className="sticker resume-frame">
          <iframe src="/resume/Leelakrishna-Ravuri-ATS.pdf#toolbar=0&navpanes=0&view=FitH" title="Resume (PDF)" loading="lazy" />
        </div>
      </div>
    </>
  );
}
