"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  actualTheme: Theme;
  setTheme: (theme: Theme, triggerElement?: HTMLElement) => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  actualTheme: "dark",
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "ui-theme",
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  const [actualTheme, setActualTheme] = useState<Theme>("dark");
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem(storageKey) as Theme;
    if (storedTheme) {
      setTheme(storedTheme);
    }
  }, [storageKey]);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove("light", "dark");

    let resolvedTheme: Theme;
    if (theme === "system") {
      resolvedTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
        ? "dark"
        : "light";
    } else {
      resolvedTheme = theme;
    }

    root.classList.add(resolvedTheme);
    setActualTheme(resolvedTheme);
  }, [theme]);

  const animateThemeChange = (
    triggerElement?: HTMLElement,
    newTheme?: Theme
  ) => {
    if (!triggerElement || isAnimating) return;

    setIsAnimating(true);
    const rect = triggerElement.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    // Calculate the maximum distance to cover the entire screen
    const maxDistance = Math.sqrt(
      Math.pow(Math.max(centerX, window.innerWidth - centerX), 2) +
        Math.pow(Math.max(centerY, window.innerHeight - centerY), 2)
    );

    // Create animation overlay
    const overlay = document.createElement("div");
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.pointerEvents = "none";
    overlay.style.zIndex = "-9999";
    overlay.style.background = newTheme === "dark" ? "#020618" : "#ffffff";
    overlay.style.clipPath = `circle(0px at ${centerX}px ${centerY}px)`;
    overlay.style.transition = "clip-path 0.6s cubic-bezier(0.4, 0, 0.2, 1)";

    document.body.appendChild(overlay);

    // Start the animation
    requestAnimationFrame(() => {
      overlay.style.clipPath = `circle(${maxDistance}px at ${centerX}px ${centerY}px)`;
    });

    // Apply theme change halfway through animation for smooth transition
    setTimeout(() => {
      const root = window.document.documentElement;
      root.classList.remove("light", "dark");
      root.classList.add(newTheme || "dark");
      setActualTheme(newTheme || "dark");
    }, 400);

    // Complete the animation and cleanup
    setTimeout(() => {
      document.body.removeChild(overlay);
      setIsAnimating(false);
    }, 800);
  };

  const value = {
    theme,
    actualTheme,
    setTheme: (newTheme: Theme, triggerElement?: HTMLElement) => {
      // Determine the new actual theme
      let actualNewTheme = newTheme;
      if (newTheme === "system") {
        actualNewTheme = window.matchMedia("(prefers-color-scheme: dark)")
          .matches
          ? "dark"
          : "light";
      }

      // Get current actual theme
      const currentTheme = actualTheme;

      // Store theme immediately but don't update state until animation
      localStorage.setItem(storageKey, newTheme);

      // Only animate if theme actually changes and trigger element exists
      if (actualNewTheme !== currentTheme && triggerElement) {
        animateThemeChange(triggerElement, actualNewTheme);
        // Update theme state after animation completes
        setTimeout(() => {
          setTheme(newTheme);
        }, 300);
      } else {
        // If no animation, apply changes immediately
        setTheme(newTheme);
        setActualTheme(actualNewTheme);
      }
    },
  };

  return (
    <ThemeProviderContext.Provider value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
