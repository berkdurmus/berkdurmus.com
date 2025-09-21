"use client";

import { useEffect, useState } from "react";
import { SocialLinks } from "@/components/social-links";

export function TopBar() {
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

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
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-transform duration-300 ease-out ${
        hidden ? "-translate-y-24" : "translate-y-0"
      }`}
      style={{ top: 16 }}
    >
      <div className="flex justify-center">
        <div className="px-3 py-2 rounded-full backdrop-blur-md bg-white/70 dark:bg-black/40 border border-gray-200/60 dark:border-gray-800/60 shadow-sm">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
