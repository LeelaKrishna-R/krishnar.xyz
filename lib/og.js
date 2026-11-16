// One template for every link preview: a paper card with a small label, a big
// title, a line under it, and the cartoon me acting out the page on the right.
// Used by the opengraph-image routes. The chibi goes in as plain SVG; the
// image renderer draws it in its resting pose (no animation in a picture).
import { ImageResponse } from "next/og";
import { Fragment, cloneElement, isValidElement } from "react";
import Chibi from "../components/Chibi";
import { MARK_SVG, MARK_VIEWBOX } from "./markSvg";

// the nav mark (the small face), as an image the renderer can draw
const MARK_SRC = `data:image/svg+xml;utf8,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="${MARK_VIEWBOX}">${MARK_SVG}</svg>`)}`;

// The image renderer only takes plain elements inside <svg>, so expand the
// chibi's little components and fragments first (they're plain functions).
function intrinsic(node) {
  if (Array.isArray(node)) return node.flatMap(intrinsic);
  if (!isValidElement(node)) return node === null || node === undefined || node === false ? [] : [node];
  if (node.type === Fragment) return intrinsic(node.props.children);
  if (typeof node.type === "function") return intrinsic(node.type(node.props));
  const { children, className, ...rest } = node.props;
  const kids = children === undefined ? [] : intrinsic(children);
  return [cloneElement(node, { ...rest, className: undefined, key: undefined }, ...kids)];
}
import { readFile } from "node:fs/promises";
import path from "node:path";

export const ogSize = { width: 1200, height: 630 };

const INK = "#12161a";

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

export async function ogImage({ label, title, line, me = { pose: "wave", face: "grin" } }) {
  const big = title.length > 22 ? 64 : title.length > 14 ? 80 : 100;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#f4f5f1", padding: 56, color: INK, fontFamily: "Figtree" }}>
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            background: "#ffffff",
            border: `4px solid ${INK}`,
            borderRadius: 30,
            boxShadow: `10px 10px 0 ${INK}`,
            padding: "52px 60px",
            position: "relative",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 46,
                height: 46,
                borderRadius: 12,
                background: "#22b88f",
                border: `3px solid ${INK}`,
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img src={MARK_SRC} width={40} height={40} alt="" />
            </div>
            <div style={{ display: "flex", fontFamily: "JetBrains Mono", fontSize: 24, color: "#58626a" }}>{label}</div>
          </div>
          <div style={{ display: "flex", fontFamily: "Bricolage", fontSize: big, lineHeight: 1.02, letterSpacing: -3, maxWidth: 700 }}>
            {title}
          </div>
          <div style={{ display: "flex", fontSize: 30, lineHeight: 1.3, color: "#58626a", maxWidth: 680 }}>{line}</div>
          <div style={{ display: "flex", position: "absolute", right: 46, bottom: 30, width: 252, height: 407 }}>
            {intrinsic(<Chibi {...me} style={{ width: 252, height: 407 }} />)}
          </div>
        </div>
      </div>
    ),
    { ...ogSize, fonts: await fonts() },
  );
}
