// The link preview for /work (pages under it have their own).
import { ogImage, ogSize } from "../../lib/og";

export const alt = "Work by Leelakrishna Ravuri: Dexter Copilot, Discord bots, Friday, Iris and small tools.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · work",
    title: "What I work on",
    line: "Dexter Copilot, the Dexter AI bots, Friday, Iris, Shero and a few small tools.",
    me: { pose: "cheer", face: "happy" },
  });
}
