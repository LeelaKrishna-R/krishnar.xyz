import Link from "next/link";
import Marker from "./Marker";
import Sfx from "./Sfx";

// The title card on every inner page: the title with the hand-drawn
// highlighter (it draws itself in on load), an optional comic burst beside
// it, and an optional "← back" link above. A long title only gets the
// highlighter on its last word, so it can still wrap on a phone.
export default function PageHead({ title, lede, sfx, back, meta, children }) {
  const words = title.split(" ");
  const short = title.length <= 18 || words.length === 1;
  return (
    <header className={`wrap narrow page-head cartoon-head${sfx ? " has-sfx" : ""}`}>
      {back ? (
        <Link href={back.href} className="back">
          ← {back.label}
        </Link>
      ) : null}
      <h1 className="ph-title">
        {short ? (
          <Marker>{title}</Marker>
        ) : (
          <>
            {words.slice(0, -1).join(" ")} <Marker>{words[words.length - 1]}</Marker>
          </>
        )}
        {sfx ? <Sfx delay="0.55s" {...sfx} /> : null}
      </h1>
      {meta ? <p className="meta">{meta}</p> : null}
      {lede ? <p className="lede">{lede}</p> : null}
      {children}
    </header>
  );
}
