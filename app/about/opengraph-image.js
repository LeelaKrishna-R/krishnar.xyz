// The link preview for /about.
import { ogImage, ogSize } from "../../lib/og";

export const alt = "About Leelakrishna Ravuri, from Madurai to Denton, Texas.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · about",
    title: "About Krishna",
    line: "From Madurai to an M.S. in AI at UNT, now on Dexter Copilot and studying for the CCNA.",
    me: { pose: "wave", face: "grin" },
  });
}
