"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const socialLinks = [
  {
    name: "GitHub",
    href: "https://github.com/berkdurmus",
    icon: Github,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/berkdurmus",
    icon: Linkedin,
  },
  {
    name: "Email",
    href: "mailto:hello@berkdurmus.com",
    icon: Mail,
  },
];

export function SocialLinks() {
  return (
    <div className="flex items-center justify-center gap-6">
      {socialLinks.map((link, index) => (
        <motion.a
          key={link.name}
          href={link.href}
          target={link.name !== "Email" ? "_blank" : undefined}
          rel={link.name !== "Email" ? "noopener noreferrer" : undefined}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.5 }}
          className="group relative"
          aria-label={link.name}
        >
          <div className="relative p-3 rounded-2xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800">
            <link.icon className="w-5 h-5 text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100 transition-colors" />
          </div>
          <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
            {link.name}
          </span>
        </motion.a>
      ))}
    </div>
  );
}
