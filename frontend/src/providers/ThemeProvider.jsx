"use client";

import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ThemeProvider({ children }) {
  const theme = useSelector((state) => state.theme.theme);

  useEffect(() => {
    // Apply theme to HTML element
    const root = document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
      root.style.colorScheme = "dark";
    } else {
      root.classList.remove("dark");
      root.style.colorScheme = "light";
    }

    root.setAttribute("data-theme", theme);

    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#1a1a1a" : "#e50914",
      );
    }
  }, [theme]);

  return children;
}
