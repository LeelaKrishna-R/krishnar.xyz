import Marker from "./Marker";

// "~/path" label, a big title with one marked word, and an optional lede or link.
export default function SectionHead({ path, before, mark, after, lede, children, as: H = "h2" }) {
  return (
    <div className="section-head" data-reveal>
      <div>
        <span className="path-label">{path}</span>
        <H>
          {before}
          {mark ? <Marker>{mark}</Marker> : null}
          {after}
        </H>
      </div>
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </div>
  );
}
