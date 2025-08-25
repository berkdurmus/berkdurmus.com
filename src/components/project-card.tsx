"use client";

import { motion } from "framer-motion";
import { FiGithub, FiExternalLink } from "react-icons/fi";

interface ProjectCardProps {
  title: string;
  description: string;
  githubUrl: string;
  demoUrl?: string;
  techStack: string[];
  index: number;
}

export function ProjectCard({
  title,
  description,
  githubUrl,
  demoUrl,
  techStack,
  index,
}: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className="group"
    >
      <a href={githubUrl} target="_blank" rel="noopener noreferrer">
        <div className="relative p-6 rounded-2xl transition-all duration-300 hover:bg-gray-50 dark:hover:bg-gray-900/50 border border-transparent hover:border-gray-200 dark:hover:border-gray-800">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 group-hover:text-gray-700 dark:group-hover:text-gray-300 transition-colors">
                {title}
              </h3>

              <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                {description}
              </p>

              <div className="mt-4 flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center gap-3">
                <div className="flex gap-3">
                  <span className="text-gray-500 dark:text-gray-500 flex items-center gap-1">
                    <FiGithub size={14} /> GitHub
                  </span>
                  {demoUrl && (
                    <>
                      <span className="text-gray-300 dark:text-gray-700">
                        •
                      </span>
                      <a
                        href={demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-500 dark:text-gray-500 flex items-center gap-1 hover:text-gray-700 dark:hover:text-gray-300"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <FiExternalLink size={14} /> Demo
                      </a>
                    </>
                  )}
                </div>
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
      </a>
    </motion.article>
  );
}
