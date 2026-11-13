// The LR monogram: a gold sticker with a hard ink shadow. app/icon.svg is the
// same drawing with fixed colours.
export default function Mark({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" aria-hidden="true">
      <rect x="9" y="9" width="50" height="50" rx="13" fill="var(--shadow)" />
      <rect x="5" y="5" width="50" height="50" rx="13" fill="var(--gold)" stroke="var(--line)" strokeWidth="3.5" />
      <g fill="none" stroke="#231c15" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 17v24h10" />
        <path d="M33 41V17h6.5a6.5 6.5 0 0 1 0 13H33M39.5 30l7 11" />
      </g>
    </svg>
  );
}
