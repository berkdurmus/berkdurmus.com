"use client";

import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/social-links";
import { CommandPalette } from "@/components/command-palette";
import { Search } from "lucide-react";

export function TopBar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);
  const [paletteOpen, setPaletteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const delta = Math.abs(y - lastY);
      // Avoid jitter on tiny scrolls
      if (delta < 8) return;

      if (y > lastY && y > 60) {
        // Scrolling down past header area → hide
        setHidden(true);
      } else {
        // Scrolling up or near top → show
        setHidden(false);
      }
      setLastY(y);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    const onKey = (e: KeyboardEvent) => {
      const isCmdK = (e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k";
      if (isCmdK) {
        e.preventDefault();
        setPaletteOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [lastY]);

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-24" : "translate-y-0"
      }`}
      style={{ top: 16 }}
    >
      <div className="flex justify-center">
        <div className="flex items-center gap-1 px-3 py-2 rounded-full backdrop-blur-md bg-white/70 dark:bg-black/40 border border-gray-200/60 dark:border-gray-800/60 shadow-sm">
          <SocialLinks />
          <div className="mx-1 h-6 w-px bg-gray-200 dark:bg-gray-800" />
          <button
            aria-label="Search (Cmd/Ctrl+K)"
            onClick={() => setPaletteOpen(true)}
            className="group relative p-3 rounded-2xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Search className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" />
          </button>
        </div>
      </div>
      <CommandPalette
        isOpen={paletteOpen}
        onClose={() => setPaletteOpen(false)}
      />
    </div>
  );
}
