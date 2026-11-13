import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

// The link preview: the same paper, ink and gold as the site.
export const alt = "Leelakrishna Ravuri: Discord bots, a personal AI, and a homelab";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#231c15";
const GOLD = "#e9a934";
const CORAL = "#d9603f";

export default async function Image() {
  const font = (f) => readFile(path.join(process.cwd(), "assets", f));
  const [display, body, mono] = await Promise.all([
    font("BricolageGrotesque-ExtraBold.ttf"),
    font("Figtree-Medium.ttf"),
    font("JetBrainsMono-SemiBold.ttf"),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "#f3ebdc",
          backgroundImage: "radial-gradient(rgba(35,28,21,.16) 1.4px, transparent 1.6px)",
          backgroundSize: "26px 26px",
          padding: 56,
          fontFamily: "Figtree",
          color: INK,
        }}
      >
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#fffaf0",
            border: `4px solid ${INK}`,
            borderRadius: 30,
            boxShadow: `10px 10px 0 ${INK}`,
            padding: "52px 60px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <div
              style={{
                display: "flex",
                padding: "8px 16px",
                border: `3px solid ${INK}`,
                borderRadius: 12,
                fontFamily: "JetBrains Mono",
                fontSize: 26,
                color: "#8d5a00",
                transform: "rotate(-2deg)",
              }}
            >
              krishnar.xyz
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontFamily: "Bricolage", fontSize: 104, lineHeight: 0.95, letterSpacing: -3 }}>Leelakrishna</div>
            <div style={{ display: "flex", position: "relative", marginTop: 4 }}>
              <div
                style={{
                  position: "absolute",
                  left: -10,
                  bottom: 8,
                  width: 370,
                  height: 34,
                  background: GOLD,
                  borderRadius: 20,
                  transform: "rotate(-1.5deg)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: 6,
                  bottom: -2,
                  width: 330,
                  height: 5,
                  background: CORAL,
                  borderRadius: 4,
                }}
              />
              <div style={{ fontFamily: "Bricolage", fontSize: 104, lineHeight: 0.95, letterSpacing: -3 }}>Ravuri</div>
            </div>
          </div>
          <div style={{ display: "flex", fontSize: 34, color: "#64574a", maxWidth: 900 }}>
            Discord bots, a personal AI called Friday, and a homelab in Denton, Texas.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Bricolage", data: display, weight: 800 },
        { name: "Figtree", data: body, weight: 500 },
        { name: "JetBrains Mono", data: mono, weight: 600 },
      ],
    },
  );
}
