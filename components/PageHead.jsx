import Marker from "./Marker";
import Sfx from "./Sfx";

// The title card on inner pages: a short title with the hand-drawn
// highlighter (it draws itself in on load) and a comic burst beside it.
export default function PageHead({ title, lede, sfx, children }) {
  return (
    <header className="wrap narrow page-head cartoon-head">
      <h1 className="ph-title">
        <Marker>{title}</Marker>
        {sfx ? <Sfx delay="0.55s" {...sfx} style={{ left: "calc(100% + 18px)", top: "-18%", ...(sfx.style || {}) }} /> : null}
      </h1>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </header>
  );
}
