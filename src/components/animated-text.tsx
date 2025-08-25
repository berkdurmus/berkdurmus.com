"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const titles = [
  "Builder",
  "Product Engineer",
  "Protector of Earth from LLM Invasion",
  "Code Whisperer",
  "Keyboard Warrior",
  "Semicolon Forgetter",
  "Merge Conflict Resolver",
  "Stack Overflow Contributor",
  "Coffee to Code Converter",
  "Height-Adjustable Desk Grandmaster",
  "Infinite Loop Survivor",
  "Git Blame Enthusiast",
  "Dark Mode Philosopher",
  "Deadline Negotiator",
  "Tab vs Space Diplomat",
  "Runtime Error Collector",
  "PR Comment Philosopher",
  "Tech Debt Collector",
  "Product + AI",
  "Debugger of the Lost Variables",
  "Refactor Renaissance Man",
  "Prompt Injection Survivor",
  "AI Prompt Summoner",
  "Dark Mode Visionary",
  "Unit Test Philosopher",
  "Snack-to-Commit Ratio Champion",
  "Keyboard-to-BMI Converter",
  "Legacy Code Archaeologist",
];

export function AnimatedText() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-[40px] relative">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
          className="absolute inset-0 text-2xl md:text-3xl font-medium text-gray-600 dark:text-gray-400"
        >
          {titles[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
