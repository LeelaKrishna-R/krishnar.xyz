// The link preview for /contact.
import { ogImage, ogSize } from "../../lib/og";

export const alt = "Contact Krishna at hello@ravuri.dev.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · contact",
    title: "Say hello",
    line: "hello@ravuri.dev, or the form on the page. I read every message.",
    me: { pose: "point", prop: "plane", face: "grin" },
  });
}
