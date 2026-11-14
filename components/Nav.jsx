"use client";
// Top bar. Transparent at the top of the page, a floating sticker once you
// scroll. Each link has the same hand-drawn highlighter as the name on the
// home page: it draws in on hover and stays drawn under the current page.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Mark from "./Mark";
import { nav } from "../lib/site";
import { Sun, Moon, MenuIcon, CloseIcon } from "./Icons";

function activeHref(pathname) {
  const hit = nav.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"));
  return hit ? hit.href : null;
}

function Ink() {
  return (
    <svg className="nav-ink" viewBox="0 0 100 14" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M3 9 C 25 5, 55 4, 97 7" />
      <path className="thin" pathLength="1" d="M8 13 C 40 11, 70 11, 94 12" />
    </svg>
  );
}

export default function Nav() {
  const pathname = usePathname() || "/";
  const active = activeHref(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let last = null;
    const onScroll = () => {
      const y = window.scrollY > 40;
      if (y === last) return;
      last = y;
      setScrolled(y);
      document.documentElement.classList.toggle("is-scrolled", y);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    // Keep the page still behind the open menu.
    const root = document.documentElement;
    const prev = root.style.overflow;
    root.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      root.style.overflow = prev;
    };
  }, [open]);

  const toggleTheme = () => {
    const root = document.documentElement;
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <header className={`nav${scrolled ? " scrolled" : ""}${open ? " open" : ""}`}>
      <div className="wrap">
        <div className="nav-bar">
          <Link href="/" className="brand">
            <Mark className="brand-mark" />
            <span className="brand-name">
              Krishna<span> Ravuri</span>
            </span>
            <svg className="brand-squiggle" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M1 5c8-5 14 4 22 0s14-5 22 0 14 4 22 0 14-5 22 0 7 2 10 0" />
            </svg>
          </Link>

          <nav className="nav-links" aria-label="Main">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={active === n.href ? "page" : undefined}>
                {n.label}
                <Ink />
              </Link>
            ))}
          </nav>

          <div className="nav-tools">
            <button type="button" className="icon-btn theme-btn" onClick={toggleTheme} aria-label="Switch light or dark theme">
              <Moon className="moon" />
              <Sun className="sun" />
            </button>
            <button
              type="button"
              className="icon-btn menu-btn"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
            >
              {open ? <CloseIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>

        {open ? <div className="menu-backdrop" onClick={() => setOpen(false)} aria-hidden="true" /> : null}
        <nav id="mobile-menu" className="mobile-menu sticker" aria-label="Main" hidden={!open}>
          <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
            Home
          </Link>
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={active === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
