"use client";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const toggle = () => setTheme(theme === "dark" ? "light" : "dark");

  return (
    <button
      className={`theme-toggle ${theme}`}
      onClick={toggle}
      role="switch"
      aria-checked={theme === "dark"}
      aria-label="Toggle dark mode"
    >
      <span className="knob">
        {theme === "dark" ? (
          <Moon size={12} strokeWidth={2.5} />
        ) : (
          <Sun size={12} strokeWidth={2.5} />
        )}
      </span>
    </button>
  );
}
