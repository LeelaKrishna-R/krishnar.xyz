// Wraps a word in a hand-drawn highlighter stroke that draws itself in when its
// section scrolls into view (see .marker in globals.css).
export default function Marker({ children, thin = true }) {
  return (
    <span className="marker">
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength="1" d="M3 12c40-5 90-7 140-5 20 1 38 2 54 4" />
        {thin ? <path className="thin" pathLength="1" d="M10 19c50-3 110-4 180-1" /> : null}
      </svg>
    </span>
  );
}
