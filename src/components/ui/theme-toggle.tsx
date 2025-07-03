"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/theme";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

export function ThemeToggle() {
  const { actualTheme, setTheme } = useTheme();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const toggleTheme = () => {
    const newTheme = actualTheme === "light" ? "dark" : "light";
    setTheme(newTheme, buttonRef.current || undefined);
  };

  return (
    <Button
      ref={buttonRef}
      variant="ghost"
      size="sm"
      className="h-10 w-10 rounded-full p-0"
      onClick={toggleTheme}
    >
      {actualTheme === "light" ? (
        <Moon className="size-4" />
      ) : (
        <Sun className="size-4" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
