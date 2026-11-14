import Link from "next/link";
import Marker from "../components/Marker";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="lost">
      <div className="wrap">
        <div className="code" aria-hidden="true">
          404
        </div>
        <h1>
          <Marker>Nothing here</Marker>
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
