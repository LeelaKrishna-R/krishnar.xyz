"use client";
// Last resort when the root layout itself fails, so it can't rely on globals.css.
export default function GlobalError({ reset }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#f4f5f1",
          color: "#12161a",
          fontFamily: "system-ui, sans-serif",
          textAlign: "center",
          padding: 24,
        }}
      >
        <div>
          <h1 style={{ fontSize: 36, margin: 0 }}>The site failed to load</h1>
          <p style={{ color: "#56606a" }}>Try again, or email hello@ravuri.dev if it keeps happening.</p>
          <button
            type="button"
            onClick={() => reset()}
            style={{
              marginTop: 12,
              padding: "10px 18px",
              border: "2px solid #12161a",
              borderRadius: 999,
              background: "#22b88f",
              fontWeight: 700,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
