// One template for every link preview: a paper card with a small label, a big
// title and a line under it. Used by the opengraph-image routes.
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

const INK = "#231c15";

async function fonts() {
  const read = (f) => readFile(path.join(process.cwd(), "assets", f));
  const [display, body, mono] = await Promise.all([
    read("BricolageGrotesque-ExtraBold.ttf"),
    read("Figtree-Medium.ttf"),
    read("JetBrainsMono-SemiBold.ttf"),
  ]);
  return [
    { name: "Bricolage", data: display, weight: 800 },
    { name: "Figtree", data: body, weight: 500 },
    { name: "JetBrains Mono", data: mono, weight: 600 },
  ];
}

export async function ogImage({ label, title, line }) {
  const big = title.length > 16 ? 76 : 104;
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f3ebdc", padding: 56, color: INK, fontFamily: "Figtree" }}>
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
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#e9a934",
                border: `3px solid ${INK}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "Bricolage",
                fontSize: 22,
              }}
            >
              LR
            </div>
            <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 24, color: "#6a5d4f" }}>{label}</div>
          </div>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: big, lineHeight: 1, letterSpacing: -3, maxWidth: 1000 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#6a5d4f", maxWidth: 960 }}>{line}</div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
