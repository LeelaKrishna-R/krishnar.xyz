// The nav mark: the chibi head on a gold sticker with a hard ink shadow, the
// same picture as the site icon (app/icon.svg, scripts/icons.mjs). It's a real
// chibi, so it blinks and its eyes follow the pointer like the others.
import Chibi from "./Chibi";

export default function Mark({ className = "" }) {
  return (
    <span className={`mark-tile ${className}`} aria-hidden="true">
      <Chibi head face="happy" />
    </span>
  );
}
