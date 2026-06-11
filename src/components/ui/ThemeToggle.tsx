"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/Button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="glass !rounded-2xl h-12 w-12 hover:border-primary/40 transition-all"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {/* Show Light/Sun icon when in Dark mode, Moon icon when in Light mode */}
      <Sun className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all dark:scale-100 dark:rotate-0 hidden dark:block text-primary drop-shadow-glow" />
      <Moon className="h-[1.5rem] w-[1.5rem] rotate-0 scale-100 transition-all block dark:hidden text-probix-text" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
