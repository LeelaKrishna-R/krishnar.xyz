"use client";
// Quick jump: Ctrl K / Cmd K (or "/") opens a search over every page,
// project and post, plus a few actions (theme, copy the email, the resume,
// the 3D GPU). The list comes from the layout on the server, so nothing is
// fetched when it opens. It's a combobox: arrows move, Enter goes, Escape
// closes and hands focus back to whatever opened it. The nav has a button for
// it too, so it works without a keyboard.
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";

const GROUPS = {
  page: "Pages",
  project: "Work",
  post: "Writing",
  action: "Actions",
};

function score(item, words) {
  const name = item.name.toLowerCase();
  const hay = `${name} ${(item.hint || "").toLowerCase()} ${(item.keys || "").toLowerCase()}`;
  let s = 0;
  for (const w of words) {
    if (!hay.includes(w)) return -1;
    if (name.startsWith(w)) s += 6;
    else if (name.split(/\s+/).some((p) => p.startsWith(w))) s += 4;
    else if (name.includes(w)) s += 2;
    else s += 1;
  }
  return s;
}

export default function QuickJump({ items }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [at, setAt] = useState(0);
  const [note, setNote] = useState("");
  const input = useRef(null);
  const list = useRef(null);
  const opener = useRef(null);

  const show = useCallback((from) => {
    opener.current = from || document.activeElement;
    setQ("");
    setAt(0);
    setNote("");
    setOpen(true);
  }, []);

  const close = useCallback(() => {
    setOpen(false);
    const back = opener.current;
    if (back && back.focus) requestAnimationFrame(() => back.focus());
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey) && !e.altKey) {
        e.preventDefault();
        setOpen((v) => {
          if (!v) {
            opener.current = document.activeElement;
            setQ("");
            setAt(0);
            setNote("");
          }
          return !v;
        });
        return;
      }
      if (e.key !== "/" || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      const tag = (t.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea" || tag === "select" || t.isContentEditable) return;
      if (document.documentElement.classList.contains("gpu-open")) return;
      e.preventDefault();
      show();
    };
    const onOpen = (e) => show(e.detail?.from);
    document.addEventListener("keydown", onKey);
    window.addEventListener("quickjump:open", onOpen);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("quickjump:open", onOpen);
    };
  }, [show]);

  // while open: page stays still (and smooth scroll pauses), input focused
  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    root.classList.add("qj-open");
    input.current?.focus();
    return () => root.classList.remove("qj-open");
  }, [open]);

  const shown = useMemo(() => {
    const words = q.trim().toLowerCase().split(/\s+/).filter(Boolean);
    if (!words.length) return items;
    // best group first, then best match inside it, so each heading shows once
    const hits = items.map((it, i) => ({ it, s: score(it, words), i })).filter((x) => x.s >= 0);
    const best = {};
    for (const h of hits) best[h.it.group] = Math.max(best[h.it.group] ?? -1, h.s);
    return hits
      .sort(
        (a, b) =>
          best[b.it.group] - best[a.it.group] ||
          (a.it.group < b.it.group ? -1 : a.it.group > b.it.group ? 1 : 0) ||
          b.s - a.s ||
          a.i - b.i,
      )
      .map((x) => x.it);
  }, [items, q]);

  useEffect(() => setAt(0), [q]);

  useEffect(() => {
    if (!open) return;
    list.current?.querySelector(`[data-i="${at}"]`)?.scrollIntoView({ block: "nearest" });
  }, [at, open]);

  const run = async (it) => {
    if (!it) return;
    if (it.href) {
      setOpen(false);
      if (/^https?:|^mailto:|\.(pdf|docx|txt)$/.test(it.href)) {
        window.location.href = it.href;
      } else {
        router.push(it.href);
      }
      return;
    }
    if (it.act === "theme") {
      const root = document.documentElement;
      const next = root.dataset.theme === "dark" ? "light" : "dark";
      root.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
      close();
    } else if (it.act === "copy") {
      try {
        await navigator.clipboard.writeText(it.value);
        setNote(`Copied ${it.value}`);
      } catch {
        setNote(it.value);
      }
      setTimeout(close, 900);
    } else if (it.act === "gpu") {
      // give focus back first, so the GPU view returns it there (not to this input) when it closes
      setOpen(false);
      requestAnimationFrame(() => {
        opener.current?.focus?.();
        window.dispatchEvent(new CustomEvent("gpu-egg:open"));
      });
    }
  };

  const onKeyDown = (e) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setAt((a) => (shown.length ? (a + 1) % shown.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setAt((a) => (shown.length ? (a - 1 + shown.length) % shown.length : 0));
    } else if (e.key === "Home") {
      e.preventDefault();
      setAt(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setAt(Math.max(0, shown.length - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      run(shown[at]);
    } else if (e.key === "Tab") {
      // the dialog has one stop: keep focus in the box
      e.preventDefault();
    }
  };

  if (!open) return null;

  let last = null;
  return (
    <div className="qj" role="dialog" aria-modal="true" aria-label="Quick jump">
      <div className="qj-backdrop" onClick={close} aria-hidden="true" />
      <div className="qj-box sticker">
        <div className="qj-field">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="qj-glass">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={input}
            className="qj-input"
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Jump to a page, project or post"
            role="combobox"
            aria-expanded="true"
            aria-controls="qj-list"
            aria-activedescendant={shown[at] ? `qj-${at}` : undefined}
            aria-autocomplete="list"
            autoComplete="off"
            spellCheck="false"
          />
          <kbd className="qj-esc">esc</kbd>
        </div>
        <ul className="qj-list" id="qj-list" role="listbox" aria-label="Results" ref={list}>
          {shown.map((it, i) => {
            const head = it.group !== last ? GROUPS[it.group] : null;
            last = it.group;
            return (
              <li key={it.id} role="presentation">
                {head ? (
                  <span className="qj-group" aria-hidden="true">
                    {head}
                  </span>
                ) : null}
                <div
                  id={`qj-${i}`}
                  data-i={i}
                  role="option"
                  aria-selected={i === at}
                  className="qj-opt"
                  data-hue={it.hue || undefined}
                  onMouseMove={() => i !== at && setAt(i)}
                  onClick={() => run(it)}
                >
                  <span className="qj-name">{it.name}</span>
                  {it.hint ? <span className="qj-hint">{it.hint}</span> : null}
                </div>
              </li>
            );
          })}
        </ul>
        {!shown.length ? (
          <p className="qj-empty">Nothing matches &ldquo;{q}&rdquo;. Try &ldquo;homelab&rdquo; or &ldquo;bots&rdquo;.</p>
        ) : null}
        <p className={note ? "qj-foot" : "qj-foot qj-foot-keys"} aria-live="polite">
          {note || (
            <span className="qj-keys">
              <kbd>↑</kbd> <kbd>↓</kbd> to move · <kbd>enter</kbd> to go · <kbd>esc</kbd> to close
            </span>
          )}
        </p>
      </div>
    </div>
  );
}
