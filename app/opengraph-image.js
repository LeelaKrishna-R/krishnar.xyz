import { ImageResponse } from "next/og";

export const alt = "Leelakrishna Ravuri — Systems integration & infrastructure";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#0d1117",
          color: "#e7edf3",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 22, marginBottom: 44 }}>
          <div
            style={{
              width: 66,
              height: 66,
              borderRadius: 16,
              background: "#1f6feb",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
              color: "#ffffff",
            }}
          >
            LR
          </div>
          <div style={{ fontSize: 30, fontWeight: 600 }}>Leelakrishna Ravuri</div>
        </div>
        <div style={{ display: "flex", fontSize: 62, fontWeight: 700, lineHeight: 1.1, maxWidth: 940 }}>
          Infrastructure, networking, and the tools that keep systems alive.
        </div>
        <div style={{ display: "flex", marginTop: 40, fontSize: 28, color: "#9198a4" }}>
          krishnar.xyz
        </div>
      </div>
    ),
    { ...size }
  );
}
