"use client";
// Top bar. Transparent at the top of the page, a floating sticker once you
// scroll. A gold pill slides under whichever page you're on.
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import Mark from "./Mark";
import { nav } from "../lib/site";
import { Sun, Moon, MenuIcon, CloseIcon } from "./Icons";

const useIsoLayout = typeof window === "undefined" ? useEffect : useLayoutEffect;

function activeHref(pathname) {
  const hit = nav.find((n) => pathname === n.href || pathname.startsWith(n.href + "/"));
  return hit ? hit.href : null;
}

export default function Nav() {
  const pathname = usePathname() || "/";
  const active = activeHref(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const linksRef = useRef(null);
  const pillRef = useRef(null);
  const placed = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Move the pill under the active link. Transitions only switch on (the
  // "animate" class) after the first placement has painted, so the pill
  // never flies in from the left on load.
  useIsoLayout(() => {
    const place = () => {
      const pill = pillRef.current;
      const box = linksRef.current;
      if (!pill || !box) return;
      const link = active && box.querySelector(`a[href="${active}"]`);
      if (!link) {
        pill.style.opacity = "0";
        return;
      }
      pill.style.width = `${link.offsetWidth}px`;
      pill.style.left = `${link.offsetLeft}px`;
      pill.style.opacity = "1";
      if (!placed.current) {
        placed.current = true;
        // Resolve the pill's style now, so turning transitions on later can't
        // animate it in from width 0 (a background tab may not have painted yet).
        void getComputedStyle(pill).width;
        requestAnimationFrame(() => requestAnimationFrame(() => box.classList.add("animate")));
      }
    };
    place();
    document.fonts?.ready.then(place);
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active]);

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
              krishnar<span>.xyz</span>
            </span>
            <svg className="brand-squiggle" viewBox="0 0 100 8" preserveAspectRatio="none" aria-hidden="true">
              <path pathLength="1" d="M1 5c8-5 14 4 22 0s14-5 22 0 14 4 22 0 14-5 22 0 7 2 10 0" />
            </svg>
          </Link>

          <nav className="nav-links" aria-label="Main" ref={linksRef}>
            <span className="nav-pill" ref={pillRef} aria-hidden="true" />
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="nav-link" aria-current={active === n.href ? "page" : undefined}>
                {n.label}
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
