// The nav mark: a small face on a gold sticker with a hard ink shadow, the same
// picture as the site icons (scripts/icons.mjs). It is drawn for small sizes
// (lib/markSvg.js); the full chibi turned to mush at 34 px.
import { MARK_SVG, MARK_VIEWBOX } from "../lib/markSvg";

export default function Mark({ className = "" }) {
  return (
    <span className={`mark-tile ${className}`} aria-hidden="true">
      <svg className="mark-face" viewBox={MARK_VIEWBOX} dangerouslySetInnerHTML={{ __html: MARK_SVG }} />
    </span>
  );
}
