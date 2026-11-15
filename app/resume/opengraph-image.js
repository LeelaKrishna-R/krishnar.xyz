// The link preview for /resume.
import { ogImage, ogSize } from "../../lib/og";

export const alt = "Leelakrishna Ravuri's resume.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · resume",
    title: "Leelakrishna Ravuri",
    line: "Software developer, AI and infrastructure. Open to work in infrastructure, networking or dev tooling.",
    me: { pose: "hold", prop: "paper" },
  });
}
