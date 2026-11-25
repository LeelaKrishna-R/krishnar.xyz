import "./globals.css";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollFx from "../components/ScrollFx";
import Party from "../components/Party";
import GpuEgg from "../components/GpuEgg";
import SmoothScroll from "../components/SmoothScroll";
import CardFx from "../components/CardFx";
import { site } from "../lib/site";
import { homeTitle } from "../lib/meta";

// The font files live in the repo (latin subsets from Google Fonts, SIL OFL).
// next/font/google downloads them during the build instead, and Google
// sometimes answers with a file URL next/font can't parse, which failed
// Vercel's production builds.
const display = localFont({ src: "./fonts/bricolage.woff2", weight: "700 800", variable: "--font-display", display: "swap" });
const body = localFont({ src: "./fonts/figtree.woff2", weight: "400 700", variable: "--font-body", display: "swap" });
// only the heading and body fonts are preloaded; the hand-lettering and code
// fonts arrive a moment later without competing with the first paint
const hand = localFont({ src: "./fonts/shantell.woff2", weight: "500", variable: "--font-hand", display: "swap", preload: false });
const mono = localFont({ src: "./fonts/jetbrains-mono.woff2", weight: "500 700", variable: "--font-mono", display: "swap", preload: false });

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: homeTitle,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    locale: "en_US",
    title: homeTitle,
    description: site.description,
  },
  twitter: { card: "summary_large_image", title: homeTitle, description: site.description },
  // Google Search Console's HTML-tag check, only when the token is set in
  // Vercel (the DNS check in Cloudflare needs nothing here).
  ...(process.env.GOOGLE_SITE_VERIFICATION ? { verification: { google: process.env.GOOGLE_SITE_VERIFICATION } } : {}),
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f4f5f1" },
    { media: "(prefers-color-scheme: dark)", color: "#0c1012" },
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
        <Party />
        <GpuEgg />
        <SmoothScroll />
        <CardFx />
        {/* Vercel Web Analytics: page views only, no cookies, nothing personal */}
        <Analytics />
      </body>
    </html>
  );
}
