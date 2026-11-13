import Link from "next/link";

export const metadata = { title: "Not found" };

export default function NotFound() {
  return (
    <section className="lost">
      <div className="wrap">
        <div className="code" aria-hidden="true">
          404
        </div>
        <h1>Nothing lives at this address</h1>
        <p>The page may have moved when the site was rebuilt. Everything that exists is linked from the home page.</p>
        <div className="cta">
          <Link className="btn btn-gold" href="/">
            Home
          </Link>
          <Link className="btn" href="/projects">
            Work
          </Link>
        </div>
      </div>
    </section>
  );
}
