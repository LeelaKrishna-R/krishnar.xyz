"use client";
import { useTheme } from "./ThemeProvider";
import NavBar from "./NavBar";
import { usePathname } from "next/navigation";

export default function BodyWrapper({ children }) {
  const { theme } = useTheme();
  const pathname = usePathname();

  // Hide the NavBar on blog detail pages (they have their own header).
  const isBlogPost = pathname.startsWith("/blog/") && pathname.split("/").length > 2;

  return (
    <body key={theme}>
      {!isBlogPost && <NavBar />}
      {children}
    </body>
  );
}
