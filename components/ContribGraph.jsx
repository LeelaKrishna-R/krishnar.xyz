"use client";
import GitHubCalendar from "react-github-calendar";
import { useTheme } from "./ThemeProvider";

// Blue ramp (empty -> busiest) to match the site accent.
const theme = {
  light: ["#ebedf0", "#cfe5ff", "#80bdff", "#3b82f6", "#0969da"],
  dark: ["#161b22", "#0d2d4f", "#15539e", "#1f6feb", "#58a6ff"],
};

export default function ContribGraph() {
  const { theme: mode } = useTheme();
  return (
    <div className="contrib-graph">
      <GitHubCalendar
        username="LeelaKrishna-R"
        colorScheme={mode === "light" ? "light" : "dark"}
        theme={theme}
        blockSize={12}
        blockMargin={4}
        fontSize={13}
        hideTotalCount
        style={{ width: "100%" }}
      />
    </div>
  );
}
