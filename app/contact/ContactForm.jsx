"use client";
// Posts to /api/contact (Resend). The hidden "website" field is a honeypot, and
// "dt" (ms since the form appeared) lets the server drop instant bot submits.
import { useEffect, useRef, useState } from "react";
import { Check } from "../../components/Icons";

export default function ContactForm() {
  const [state, setState] = useState("idle"); // idle | sending | sent
  const [error, setError] = useState("");
  const shownAt = useRef(0);
  useEffect(() => {
    shownAt.current = Date.now();
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    if (state === "sending") return;
    setError("");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = Object.fromEntries(["name", "email", "message", "website"].map((k) => [k, fd.get(k) || ""]));
    payload.dt = shownAt.current ? Date.now() - shownAt.current : 0;
    setState("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || !data.ok) throw new Error(data.error || "That didn't go through. Please email me instead.");
      form.reset();
      setState("sent");
      window.dispatchEvent(new Event("chibi:throw"));
    } catch (err) {
      setError(err.message);
      setState("idle");
    }
  }

  if (state === "sent") {
    return (
      <div className="sticker form form-done" role="status">
        <svg className="plane-fly" viewBox="0 0 64 64" aria-hidden="true">
          <path d="M4 30 L60 6 L44 58 L32 38 Z" />
          <path d="M60 6 L32 38 L30 52 L24 41" fill="none" />
        </svg>
        <Check />
        <div>
          <strong>Message sent.</strong>
          <p className="muted">Thanks. I'll reply to the address you gave.</p>
        </div>
      </div>
    );
  }

  return (
    <form className="sticker form" onSubmit={onSubmit}>
      <input className="hp" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <label className="field">
        <span>Your name</span>
        <input required name="name" autoComplete="name" maxLength={100} />
      </label>
      <label className="field">
        <span>Your email</span>
        <input required type="email" name="email" autoComplete="email" maxLength={200} />
      </label>
      <label className="field">
        <span>Message</span>
        <textarea required name="message" rows={6} maxLength={5000} />
      </label>
      {error ? (
        <p className="error" role="alert">
          {error}
        </p>
      ) : null}
      <div>
        <button className="btn btn-gold" type="submit" disabled={state === "sending"}>
          {state === "sending" ? "Sending…" : "Send message"}
        </button>
      </div>
    </form>
  );
}
