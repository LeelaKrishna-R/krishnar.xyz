import "./globals.css";
import { Bricolage_Grotesque, Figtree, Shantell_Sans, JetBrains_Mono } from "next/font/google";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import ScrollFx from "../components/ScrollFx";
import { site } from "../lib/site";

// Self-hosted at build time by next/font, so they load on every OS.
const display = Bricolage_Grotesque({ subsets: ["latin"], weight: ["700", "800"], variable: "--font-display", display: "swap" });
const body = Figtree({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body", display: "swap" });
const hand = Shantell_Sans({ subsets: ["latin"], weight: ["500"], variable: "--font-hand", display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["500", "600", "700"], variable: "--font-mono", display: "swap" });

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
// stays hidden.
const boot = `(function(){var d=document.documentElement;try{var t=localStorage.getItem("theme");if(t!=="light"&&t!=="dark")t=matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";d.dataset.theme=t}catch(e){d.dataset.theme="light"}d.classList.add("js");setTimeout(function(){if(!window.__fx)d.classList.remove("js")},3000)})();`;

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
