"use client";

import { useEffect, useState } from "react";

export function ReadingProgress({
  targetRef,
}: {
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = targetRef.current;
      if (!el) return;

      const start = el.offsetTop;
      const end = start + el.scrollHeight - window.innerHeight;
      const current = window.scrollY;
      const raw = (current - start) / Math.max(end - start, 1);
      const clamped = Math.min(1, Math.max(0, raw));
      setProgress(clamped);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetRef]);

  return (
    <div className="fixed top-0 left-0 right-0 z-30">
      <div className="h-[3px] w-full bg-transparent">
        <div
          className="h-full bg-gray-900 dark:bg-gray-100 transition-[width] duration-100 ease-out"
          style={{ width: `${progress * 100}%` }}
          aria-hidden
        />
      </div>
    </div>
  );
}
