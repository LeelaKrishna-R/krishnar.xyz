// The link preview for /blog (pages under it have their own).
import { ogImage, ogSize } from "../../lib/og";

export const alt = "Krishna's writing: short posts about why he made things and how he tests them.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · writing",
    title: "Writing",
    line: "Short posts about why I made things, and how I check they work.",
    me: { pose: "raise", prop: "pencil" },
  });
}
