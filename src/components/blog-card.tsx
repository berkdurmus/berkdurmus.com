"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlogCardProps {
  title: string;
  slug: string;
  date: string;
  readingTime: "Sometime to read" | "Quick to Read" | "Impossible to Read all";
  description?: string;
  index: number;
}

const readingTimeColors = {
  "Sometime to read":
    "bg-blue-100 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400",
  "Quick to Read":
    "bg-green-100 text-green-700 dark:bg-green-900/20 dark:text-green-400",
  "Impossible to Read all":
    "bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-400",
};

export function BlogCard({
  title,
  slug,
  date,
  readingTime,
  description,
  index,
}: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <Link href={`/blog/${slug}`}>
        <div className="relative p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {title}
              </h3>
              {description && (
                <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                  {description}
                </p>
              )}
              <div className="mt-4 flex items-center gap-3">
                <time className="text-sm text-gray-500 dark:text-gray-500">
                  {date}
                </time>
                <span className="text-gray-300 dark:text-gray-700">•</span>
                <span
                  className={cn(
                    "text-xs px-2.5 py-1 rounded-full font-medium",
                    readingTimeColors[readingTime]
                  )}
                >
                  {readingTime}
                </span>
              </div>
            </div>
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-gray-400 dark:text-gray-600 transform group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}
