import { ogImage, ogSize } from "../lib/og";

export const alt = "Hi, I'm Krishna. I work on Dexter Copilot, train models at home and run a homelab.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · Denton, TX",
    title: "Hi, I'm Krishna.",
    line: "I work on Dexter Copilot, train models at home and run a two-node homelab.",
    me: { pose: "wave", face: "grin" },
  });
}
