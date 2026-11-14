import "./globals.css";
import localFont from "next/font/local";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollFx from "../components/ScrollFx";
import { site } from "../lib/site";

// The font files live in the repo (latin subsets from Google Fonts, SIL OFL).
// next/font/google downloads them during the build instead, and Google
// sometimes answers with a file URL next/font can't parse, which failed
// Vercel's production builds.
const display = localFont({ src: "./fonts/bricolage.woff2", weight: "700 800", variable: "--font-display", display: "swap" });
const body = localFont({ src: "./fonts/figtree.woff2", weight: "400 700", variable: "--font-body", display: "swap" });
const hand = localFont({ src: "./fonts/shantell.woff2", weight: "500", variable: "--font-hand", display: "swap" });
const mono = localFont({ src: "./fonts/jetbrains-mono.woff2", weight: "500 700", variable: "--font-mono", display: "swap" });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}: Discord bots, a personal AI, and a homelab`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: site.name,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: site.name, description: site.description },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f3ebdc" },
    { media: "(prefers-color-scheme: dark)", color: "#18150f" },
  ],
};

// Runs before first paint: picks the saved or system theme and marks that
// scripts work, which turns on the scroll-in animations. If the app's own
// script never starts, the animations switch back off after 3 s so nothing
// stays hidden. The opening sequence plays once per visit (no-intro after).
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t}catch(e){d.dataset.theme="light"}d.classList.add("js");try{if(sessionStorage.getItem("intro"))d.classList.add("no-intro");else{sessionStorage.setItem("intro","1");setTimeout(function(){d.classList.add("no-intro")},2600)}}catch(e){}setTimeout(function(){if(!window.__fx)d.classList.remove("js")},3000)})();`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      data-theme="light"
      className={`${display.variable} ${body.variable} ${hand.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: boot }} />
      </head>
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <ScrollFx />
      </body>
    </html>
  );
}
