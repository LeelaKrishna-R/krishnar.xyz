"use client";
import { useState } from "react";

const inputStyle = {
  width: "100%",
  marginTop: "6px",
  padding: "12px",
  borderRadius: "10px",
  border: "1px solid var(--border)",
  background: "var(--surface-2)",
  color: "var(--text)",
  fontSize: "14px",
};

export default function ContactForm() {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setError("");
    if (submitting) return;

    const formEl = e.currentTarget;
    const fd = new FormData(formEl);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      message: fd.get("message"),
      website: fd.get("website"),
    };

    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error(data.error || "Something went wrong");
      setSent(true);
      formEl.reset();
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  }

  if (sent) {
    return (
      <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
        <svg
          width="22"
          height="22"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--accent)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
          style={{ marginTop: 2, flexShrink: 0 }}
        >
          <path d="M20 6 9 17l-5-5" />
        </svg>
        <div>
          <strong style={{ display: "block", marginBottom: 4 }}>Message sent</strong>
          <span className="small muted">Thanks for reaching out. I'll get back to you soon.</span>
        </div>
      </div>
    );
  }

  return (
    <form id="contact-form" method="post" onSubmit={onSubmit}>
      <div style={{ display: "grid", gap: "16px" }}>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          style={{ position: "absolute", left: "-10000px", opacity: 0 }}
          aria-hidden="true"
        />
        <label>
          <span className="small muted">Your name</span>
          <input required name="name" placeholder="Jane Doe" style={inputStyle} />
        </label>
        <label>
          <span className="small muted">Email</span>
          <input required type="email" name="email" placeholder="you@example.com" style={inputStyle} />
        </label>
        <label>
          <span className="small muted">Message</span>
          <textarea
            required
            name="message"
            rows={6}
            placeholder="What's on your mind?"
            style={{ ...inputStyle, resize: "vertical" }}
          ></textarea>
        </label>
        {error && (
          <div className="small" style={{ color: "#ff9393" }} role="alert">
            {error}
          </div>
        )}
        <button
          className="btn btn-primary"
          type="submit"
          disabled={submitting}
          style={{ justifySelf: "start" }}
        >
          {submitting ? "Sending..." : "Send message"}
        </button>
      </div>
    </form>
  );
}
