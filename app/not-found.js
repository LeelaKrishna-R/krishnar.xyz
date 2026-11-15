import Link from "next/link";
import Marker from "../components/Marker";
import Chibi from "../components/Chibi";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="lost">
      <div className="wrap">
        <div className="lost-scene" aria-hidden="true">
          <div className="code">404</div>
          <Chibi className="lost-chibi" pose="hold" prop="map" face="o" />
          <span className="lost-q">?</span>
        </div>
        <h1>
          <Marker>Lost the plot</Marker>
        </h1>
        <p>This page doesn&apos;t exist, or it moved when I rebuilt the site.</p>
        <div className="btns">
          <Link className="btn btn-gold" href="/">
            Home
          </Link>
          <Link className="btn" href="/work">
            Work
          </Link>
        </div>
      </div>
    </section>
  );
}
