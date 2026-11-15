// The link preview for /homelab.
import { ogImage, ogSize } from "../../lib/og";

export const alt = "Krishna's homelab: two Dell OptiPlex micro PCs running Proxmox, and what broke.";
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return ogImage({
    label: "ravuri.dev · homelab",
    title: "The homelab",
    line: "Two little Dell PCs running Proxmox, what runs on them, and everything that broke.",
    me: { pose: "raise", prop: "wrench", face: "grin" },
  });
}
