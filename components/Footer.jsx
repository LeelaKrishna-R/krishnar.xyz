import Link from "next/link";
import { links, site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-row">
        <nav aria-label="Footer">
          <a href={`mailto:${site.email}`}>Email</a>
          <a href={links.github}>GitHub</a>
          <a href={links.linkedin}>LinkedIn</a>
          <a href={links.x}>X</a>
          <Link href="/resume">Resume</Link>
        </nav>
        <small>
          © {new Date().getFullYear()} {site.name} ·{" "}
          <a href={links.source} style={{ fontWeight: 500 }}>
            source
          </a>
        </small>
      </div>
    </footer>
  );
}
