"use client";

import { useEffect, useRef, useState } from "react";

export function PdfViewer() {
  const [loaded, setLoaded] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    // Safety fallback in dev/strict-mode or if onLoad doesn't fire
    timeoutRef.current = window.setTimeout(() => setLoaded(true), 1500);
    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, []);

  return (
    <div className="mt-6 relative rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-800 bg-black/80 dark:bg-black/80 shadow-sm">
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="h-6 w-6 border-2 border-gray-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-xs">Loading PDF…</span>
          </div>
        </div>
      )}
      <iframe
        src="/resume/Berk_Durmus_Resume.pdf"
        className={`w-full h-[75vh] sm:h-[80vh] transition-opacity duration-300 ${
          loaded ? "opacity-100" : "opacity-0"
        }`}
        title="Berk Durmuş Resume"
        onLoad={() => {
          if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
          setLoaded(true);
        }}
      />
    </div>
  );
}
