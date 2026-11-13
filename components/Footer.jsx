import Link from "next/link";
import { links, nav, site } from "../lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-grid">
          <div>
            <h2>{site.name}</h2>
            <p>Discord bots, a personal AI, and a homelab in Denton, Texas.</p>
          </div>
          <div>
            <h3>pages</h3>
            <ul>
              <li>
                <Link href="/">Home</Link>
              </li>
              {nav.map((n) => (
                <li key={n.href}>
                  <Link href={n.href}>{n.label}</Link>
                </li>
              ))}
              <li>
                <Link href="/resume">Resume</Link>
              </li>
            </ul>
          </div>
          <div>
            <h3>elsewhere</h3>
            <ul>
              <li>
                <a href={links.github}>GitHub</a>
              </li>
              <li>
                <a href={links.linkedin}>LinkedIn</a>
              </li>
              <li>
                <a href={links.x}>X</a>
              </li>
              <li>
                <a href={`mailto:${site.email}`}>{site.email}</a>
              </li>
            </ul>
          </div>
        </div>
        <div className="footer-base">
          <span>© {new Date().getFullYear()} {site.name}</span>
          <span>
            Set in Bricolage Grotesque, Figtree and Shantell Sans. <a href={links.source}>Source on GitHub</a>
          </span>
        </div>
      </div>
    </footer>
  );
}
