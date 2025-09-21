"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { blogPosts } from "@/lib/blog-data";

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return blogPosts;
    return blogPosts
      .map((p) => {
        const hay = `${p.title} ${p.description} ${p.slug}`.toLowerCase();
        const idx = hay.indexOf(q);
        const score = idx === -1 ? Infinity : idx; // simple rank: earlier match better
        return { ...p, score } as any;
      })
      .filter((p: any) => p.score !== Infinity)
      .sort((a: any, b: any) => a.score - b.score)
      .slice(0, 8);
  }, [query]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 0);
    } else {
      setQuery("");
      setActiveIndex(0);
    }
  }, [isOpen]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setActiveIndex((i) => Math.min(i + 1, results.length - 1));
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        setActiveIndex((i) => Math.max(i - 1, 0));
      }
      if (e.key === "Enter") {
        e.preventDefault();
        const target = results[activeIndex];
        if (target) {
          onClose();
          router.push(`/blog/${target.slug}`);
        }
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isOpen, activeIndex, results, onClose, router]);

  // Close when clicking outside the panel (extra safety besides backdrop)
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      if (panelRef.current && !panelRef.current.contains(target)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[60]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
            aria-hidden
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.15 }}
            className="relative mx-auto mt-24 w-[90%] max-w-xl rounded-2xl border border-gray-200/60 dark:border-gray-800/60 bg-white/85 dark:bg-black/60 backdrop-blur-xl shadow-2xl overflow-hidden"
            ref={panelRef}
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200/60 dark:border-gray-800/60">
              <Search className="w-5 h-5 text-gray-500 dark:text-gray-400" />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search posts..."
                className="w-full bg-transparent outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400"
              />
              <kbd className="hidden sm:inline-block text-[10px] px-1.5 py-0.5 rounded border border-gray-300 dark:border-gray-700 text-gray-500 dark:text-gray-400">
                Enter
              </kbd>
            </div>

            <ul className="max-h-96 overflow-auto py-1">
              {results.length === 0 && (
                <li className="px-4 py-6 text-sm text-gray-500 dark:text-gray-400">
                  No results
                </li>
              )}
              {results.map((p, i) => (
                <li key={p.slug}>
                  <button
                    onClick={() => {
                      onClose();
                      router.push(`/blog/${p.slug}`);
                    }}
                    className={`w-full text-left px-4 py-3 transition-colors ${
                      i === activeIndex
                        ? "bg-gray-100/70 dark:bg-gray-800/70"
                        : "hover:bg-gray-100/60 dark:hover:bg-gray-800/60"
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900 dark:text-gray-100">
                      {p.title}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {p.description}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
