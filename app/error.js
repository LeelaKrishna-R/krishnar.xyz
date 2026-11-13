"use client";
import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <section className="lost">
      <div className="wrap">
        <div className="code" aria-hidden="true">
          500
        </div>
        <h1>This page broke</h1>
        <p>Something failed while it was loading. Trying again usually works.</p>
        <div className="cta">
          <button type="button" className="btn btn-gold" onClick={() => reset()}>
            Try again
          </button>
          <Link className="btn" href="/">
            Home
          </Link>
        </div>
      </div>
    </section>
  );
}
