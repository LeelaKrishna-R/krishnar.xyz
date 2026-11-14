"use client";
import Link from "next/link";

export default function ErrorPage({ reset }) {
  return (
    <section className="lost">
      <div className="wrap">
        <div className="code" aria-hidden="true">
          500
        </div>
        <h1>Something broke</h1>
        <p>This page hit an error while loading. Trying again usually fixes it.</p>
        <div className="btns">
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
