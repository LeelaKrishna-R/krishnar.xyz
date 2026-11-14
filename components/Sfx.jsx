// A comic sound-effect burst ("BEEP!", "WHOOSH!"): a spiky star with the word
// on top. Purely decorative. It pops in with squash and stretch when its scene
// plays (or when the page loads, in a page header).
const POINTS = (() => {
  const pts = [];
  const n = 12;
  for (let i = 0; i < n * 2; i++) {
    const r = i % 2 ? 0.62 : 1;
    const a = (Math.PI * i) / n - Math.PI / 2;
    pts.push(`${(50 + Math.cos(a) * 48 * r).toFixed(1)},${(50 + Math.sin(a) * 40 * r).toFixed(1)}`);
  }
  return pts.join(" ");
})();

export default function Sfx({ text, color = "#f2c76b", rotate = -8, style, delay = "0.6s", size = 1 }) {
  return (
    <span
      className="sfx"
      aria-hidden="true"
      style={{ "--r": `${rotate}deg`, "--d": delay, "--s": size, "--len": text.length, ...style }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="none">
        <polygon points={POINTS} fill={color} />
      </svg>
      <b>{text}</b>
    </span>
  );
}
