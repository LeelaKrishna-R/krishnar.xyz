import { ogImage, ogSize } from "../lib/og";

export const alt = "Hi, I'm Krishna. Discord bots, small dev tools, and Friday.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "Leelakrishna Ravuri · Denton, TX",
    title: "Hi, I'm Krishna.",
    line: "I make Discord bots and small dev tools, and I'm building Friday, a personal AI.",
  });
}
