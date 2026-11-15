import { NextResponse } from "next/server";
import { Resend } from "resend";

// The contact form's only way out. Hardened after the 2026-11-15 audit:
// - only this site's own pages may post (Origin / Sec-Fetch-Site), and only as
//   application/json, so another site can't make its visitors send mail;
// - small bodies only, strict types, no invisible/bidi characters;
// - honeypot + a minimum fill time drop bots without telling them;
// - a fixed subject (a sender can't write a phishing-looking subject line);
// - replyTo set correctly, so replying goes to the visitor, not via my inbox.
// Rate limiting here is per warm instance only; the Vercel firewall rule is the
// real limit (see README "Security").

let resend; // built on first use, so a missing key fails one request, not the build

const SITE_ORIGINS = new Set(["https://www.ravuri.dev", "https://ravuri.dev"]);
const MAX_BODY = 16 * 1024;
const MIN_FILL_MS = 2500;

const deny = (status, error) => NextResponse.json({ ok: false, error }, { status, headers: { "Cache-Control": "no-store" } });
const accept = () => NextResponse.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });

function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// zero-width and direction-override characters, used to spoof names and addresses
const INVISIBLE = /[​-‏‪-‮⁠-⁩﻿]/g;

// single line: no control characters at all (no header-style injection)
const cleanLine = (s, max) => s.replace(INVISIBLE, "").replace(/[\x00-\x1f\x7f]/g, " ").trim().slice(0, max);
// message: keep tabs and newlines, drop other control characters
const cleanText = (s, max) =>
  s
    .replace(INVISIBLE, "")
    .replace(/[\x00-\x08\x0b\x0c\x0e-\x1f\x7f]/g, "")
    .trim()
    .slice(0, max);

function allowedOrigin(req) {
  const origin = req.headers.get("origin");
  const site = req.headers.get("sec-fetch-site");
  if (site && site !== "same-origin") return false;
  if (!origin) return true; // non-browser clients; the other checks still apply
  if (SITE_ORIGINS.has(origin)) return true;
  // preview deployments and local runs post to themselves: same host as the request
  if (process.env.VERCEL_ENV === "production") return false;
  try {
    return new URL(origin).host === (req.headers.get("x-forwarded-host") || req.headers.get("host"));
  } catch {
    return false;
  }
}

const hits = new Map();
function rateLimited(ip) {
  const now = Date.now();
  const recent = (hits.get(ip) || []).filter((t) => now - t < 10 * 60_000);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.delete(hits.keys().next().value); // drop the oldest, not everyone
  return recent.length > 5;
}

export async function POST(req) {
  try {
    if (!allowedOrigin(req)) return deny(403, "Forbidden");
    if (!(req.headers.get("content-type") || "").toLowerCase().startsWith("application/json")) {
      return deny(415, "Unsupported Media Type");
    }
    if (Number(req.headers.get("content-length") || 0) > MAX_BODY) return deny(413, "Too large");

    const ip = req.headers.get("x-real-ip") || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
    if (rateLimited(ip)) return deny(429, "Too many messages. Please try again later, or email me.");

    const raw = await req.text();
    if (raw.length > MAX_BODY) return deny(413, "Too large");
    let body;
    try {
      body = JSON.parse(raw);
    } catch {
      return deny(400, "Invalid request");
    }
    const { name, email, message, website, dt } = body || {};

    // Bots: filled the hidden field, or submitted faster than a person can type.
    // Pretend it worked so they don't adapt.
    if (website || !(Number(dt) >= MIN_FILL_MS)) return accept();

    if (typeof name !== "string" || typeof email !== "string" || typeof message !== "string") {
      return deny(400, "Invalid input");
    }
    const n = cleanLine(name, 100);
    const e = cleanLine(email, 200);
    const m = cleanText(message, 5000);
    if (!n || !e || !m || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)) return deny(400, "Invalid input");

    const to = process.env.CONTACT_TO_EMAIL;
    if (!process.env.RESEND_API_KEY || !to) {
      console.error("Contact API: RESEND_API_KEY or CONTACT_TO_EMAIL is not set");
      return deny(500, "Email is not configured right now.");
    }
    resend ??= new Resend(process.env.RESEND_API_KEY);
    const from = process.env.CONTACT_FROM_EMAIL || "onboarding@resend.dev";

    const { error } = await resend.emails.send({
      from,
      to,
      subject: "Portfolio contact",
      replyTo: e,
      text: `Name: ${n}\nEmail: ${e}\n\n${m}`,
      html: `
        <h2>Portfolio contact</h2>
        <p><b>Name:</b> ${escapeHtml(n)}</p>
        <p><b>Email:</b> ${escapeHtml(e)}</p>
        <p><b>Message:</b></p>
        <pre style="white-space:pre-wrap;font-family:inherit">${escapeHtml(m)}</pre>
      `,
    });
    if (error) {
      console.error("Resend error:", error); // details stay in the logs
      return deny(502, "Could not send right now. Please try again later.");
    }
    return accept();
  } catch (err) {
    console.error("Contact API error:", err);
    return deny(500, "Server error");
  }
}
