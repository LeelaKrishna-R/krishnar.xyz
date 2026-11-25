import Image from "next/image";
import Link from "next/link";
import { blurs } from "../lib/blurs";

// A plain list of rows: name, year, one line. Used on the home page and /work.
export function Rows({ children, cards = false }) {
  return <ul className={`rows${cards ? " cards" : ""}`}>{children}</ul>;
}

export function ProjectRow({ p, thumb = false }) {
  return (
    <li data-reveal>
      <Link className={`row${thumb && p.media.img ? " thumb" : ""}`} href={`/work/${p.slug}`} data-hue={p.slug}>
        {thumb && p.media.img ? (
          <>
            <span className={`row-img${p.media.contain ? " iris" : ""}`}>
              <Image src={p.media.img} alt="" fill sizes="132px" quality={90} placeholder={blurs[p.media.img] ? "blur" : "empty"} blurDataURL={blurs[p.media.img]} />
            </span>
            <span className="row-text">
              <span className="row-name">
                {p.name}
                {p.status ? (
                  <>
                    {" "}
                    <span className="status-tag">{p.status}</span>
                  </>
                ) : null}
              </span>
              <span className="row-line" style={{ display: "block" }}>
                {p.line}
              </span>
            </span>
            <span className="row-year">{p.year}</span>
          </>
        ) : (
          <>
            <span className="row-name">{p.name}</span>
            <span className="row-year">{p.year}</span>
            <span className="row-line">{p.line}</span>
          </>
        )}
      </Link>
    </li>
  );
}
