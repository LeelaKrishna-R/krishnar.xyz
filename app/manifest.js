// The web app manifest: name, colours and the chibi icons (made by
// scripts/icons.mjs from the head the site itself draws).
import { site } from "../lib/site";

export default function manifest() {
  return {
    name: site.name,
    short_name: "Krishna",
    description: site.description,
    start_url: "/",
    display: "standalone",
    background_color: "#f3ebdc",
    theme_color: "#f3ebdc",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
