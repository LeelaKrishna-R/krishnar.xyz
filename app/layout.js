import "./globals.css";
import { ThemeProvider } from "../components/ThemeProvider";
import BodyWrapper from "../components/BodyWrapper";
import Link from "next/link";

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://www.krishnar.xyz"),
  title: "Leelakrishna Ravuri: Systems integration & infrastructure",
  description: "Systems integration, moving into infrastructure and networking. Homelab tooling, AI agents, and real shipped projects.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  openGraph: {
    title: "Leelakrishna Ravuri: Systems integration & infrastructure",
    description: "Systems integration, moving into infrastructure and networking. Homelab tooling, AI agents, and real shipped projects.",
    url: "https://www.krishnar.xyz/",
    siteName: "Leelakrishna Ravuri",
  },
  twitter: {
    card: "summary_large_image",
    title: "Leelakrishna Ravuri: Systems integration & infrastructure",
    description: "Systems integration, moving into infrastructure and networking.",
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0f0f10" },
    { media: "(prefers-color-scheme: light)", color: "#f7f7f8" }
  ]
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Fonts & Devicon */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Space+Grotesk:wght@400;600;700&display=swap"
          rel="stylesheet"
        />
        <noscript>
          <style
            dangerouslySetInnerHTML={{
              __html: ".reveal-up{opacity:1!important;transform:none!important}",
            }}
          />
        </noscript>
      </head>
      <ThemeProvider>
        <BodyWrapper>
          <main className="main-content">
            {children}
          </main>

          <footer className="site-footer">
            <div className="container footer-inner">
              <div className="footer-top">
                <div className="footer-brand">
                  <strong>Leelakrishna Ravuri</strong>
                  <p>Systems integration, moving into infrastructure and networking.</p>
                </div>
                <nav className="footer-nav" aria-label="Footer">
                  <Link href="/">Home</Link>
                  <Link href="/projects">Projects</Link>
                  <Link href="/homelab">Homelab</Link>
                  <Link href="/blog">Blog</Link>
                  <Link href="/contact">Contact</Link>
                </nav>
                <div className="footer-social">
                  <a href="https://github.com/LeelaKrishna-R" target="_blank" rel="noopener noreferrer">GitHub</a>
                  <a href="https://www.linkedin.com/in/leelakrishnaravuri/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                  <a href="mailto:email@krishnar.xyz">Email</a>
                </div>
              </div>
              <div className="footer-bottom">
                <p>
                  © {new Date().getFullYear()} Leelakrishna Ravuri.{" "}
                  <Link
                    href="https://github.com/LeelaKrishna-R/krishnar.xyz/blob/main/LICENSE"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    MIT License
                  </Link>
                </p>
              </div>
            </div>
          </footer>
        </BodyWrapper>
      </ThemeProvider>
    </html>
  );
}
