"use client";
// Opens the print dialog, where "Save as PDF" gives an up-to-date PDF of the page.
export default function PrintButton({ children }) {
  return (
    <button type="button" className="btn" onClick={() => window.print()}>
      {children}
    </button>
  );
}
