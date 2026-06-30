import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Escape HTML so a sender can't inject markup/scripts into the email we receive.
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Single-line field: strip ALL control chars (incl. newlines) to block header-style injection.
function cleanLine(input, max) {
  return String(input ?? "").replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, max);
}

// Multi-line body: keep tab/newline/carriage-return, strip other control chars.
function cleanText(input, max) {
  return String(input ?? "").replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "").trim().slice(0, max);
}

// Best-effort in-memory throttle. On serverless this only bounds a single warm
// instance; real protection needs a shared store (KV/Redis).
// ponytail: good enough for a portfolio contact form, upgrade to KV if it gets abused.
const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const windowMs = 60_000, max = 5;
  const recent = (hits.get(ip) || []).filter((t) => now - t < windowMs);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear(); // crude memory cap
  return recent.length > max;
}

export async function POST(req) {
  try {
    const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) {
      return NextResponse.json({ ok: false, error: "Too many requests. Please try again in a minute." }, { status: 429 });
    }

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ ok: false, error: "Invalid request" }, { status: 400 });
    }
    const { name, email, message, website } = body || {};

    // Honeypot: bots fill this hidden field. Pretend success and drop it.
    if (website) return NextResponse.json({ ok: true });

    const n = cleanLine(name, 100);
    const e = cleanLine(email, 200);
    const m = cleanText(message, 5000);
    if (!n || !e || !m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) {
      return NextResponse.json({ ok: false, error: "Invalid input" }, { status: 400 });
    }

    const to = process.env.CONTACT_TO_EMAIL;
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";
    if (!to) {
      console.error("Contact API: CONTACT_TO_EMAIL is not set");
      return NextResponse.json({ ok: false, error: "Email is not configured right now." }, { status: 500 });
    }

    const { error } = await resend.emails.send({
      from,
      to,
      subject: `New message from ${n}`.slice(0, 150),
      reply_to: e,
      html: `
        <h2>Portfolio Contact</h2>
        <p><b>Name:</b> ${escapeHtml(n)}</p>
        <p><b>Email:</b> ${escapeHtml(e)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(m)}</pre>
      `,
    });

    if (error) {
      // Log the detail server-side; never return provider internals to the client.
      console.error("Resend error:", error);
      return NextResponse.json({ ok: false, error: "Could not send right now. Please try again later." }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ ok: false, error: "Server error" }, { status: 500 });
  }
}
