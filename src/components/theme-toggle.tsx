"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches;
    const initialTheme = savedTheme || (prefersDark ? "dark" : "light");

    setTheme(initialTheme);
    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    localStorage.setItem("theme", newTheme);
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="fixed top-6 right-6 md:top-8 md:right-8 z-50">
        <div className="w-12 h-12 rounded-full" />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5, duration: 0.3 }}
      className="fixed top-6 right-6 md:top-8 md:right-8 z-50"
    >
      <motion.button
        onClick={toggleTheme}
        className="relative group p-3 rounded-full bg-white/10 dark:bg-black/10 backdrop-blur-xl border border-gray-200/20 dark:border-gray-700/20 hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
      >
        <div className="relative w-6 h-6">
          {/* Sun icon */}
          <motion.div
            initial={false}
            animate={{
              scale: theme === "light" ? 1 : 0,
              opacity: theme === "light" ? 1 : 0,
              rotate: theme === "light" ? 0 : 180,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Sun className="w-6 h-6 text-yellow-500 dark:text-yellow-400" />
          </motion.div>

          {/* Moon icon */}
          <motion.div
            initial={false}
            animate={{
              scale: theme === "dark" ? 1 : 0,
              opacity: theme === "dark" ? 1 : 0,
              rotate: theme === "dark" ? 0 : -180,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Moon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
          </motion.div>
        </div>

        {/* Glow effect on hover */}
        <motion.div
          className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background:
              theme === "light"
                ? "radial-gradient(circle, rgba(251, 191, 36, 0.1) 0%, transparent 70%)"
                : "radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%)",
            filter: "blur(10px)",
          }}
        />

        {/* Pulse animation */}
        <motion.div
          className="absolute inset-0 rounded-full border border-current opacity-0 group-hover:opacity-30"
          initial={{ scale: 1 }}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeOut",
          }}
          style={{
            borderColor: theme === "light" ? "#fbbf24" : "#3b82f6",
          }}
        />

        {/* Tooltip */}
        <div className="absolute -bottom-10 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs px-2 py-1 rounded">
            {theme === "light" ? "Dark mode" : "Light mode"}
          </div>
        </div>
      </motion.button>
    </motion.div>
  );
}
