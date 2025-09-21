"use client";

import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Home as HomeIcon,
} from "lucide-react";
import { usePathname } from "next/navigation";

type SocialLink = {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  newTab?: boolean;
};

const socialLinks: SocialLink[] = [
  {
    name: "Home",
    href: "/",
    icon: HomeIcon,
    newTab: false,
  },
  {
    name: "GitHub",
    href: "https://github.com/berkdurmus",
    icon: Github,
    newTab: true,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/berkdurmus",
    icon: Linkedin,
    newTab: true,
  },
  {
    name: "Email",
    href: "mailto:hello@berkdurmus.com",
    icon: Mail,
    newTab: false,
  },
  {
    name: "Resume",
    href: "/resume",
    icon: FileText,
    newTab: false,
  },
];

export function SocialLinks() {
  const pathname = usePathname();
  return (
    <div className="flex items-center justify-center gap-6">
      {socialLinks.map((link, index) => {
        const isExternal =
          link.href.startsWith("http") || link.href.startsWith("mailto:");
        const isActive =
          !isExternal &&
          ((link.href === "/" && pathname === "/") ||
            (link.href !== "/" && pathname.startsWith(link.href)));
        return (
          <motion.a
            key={link.name}
            href={link.href}
            target={link.newTab ? "_blank" : undefined}
            rel={link.newTab ? "noopener noreferrer" : undefined}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            className="group relative"
            aria-label={link.name}
          >
            <div
              className={`relative p-3 rounded-2xl transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-800 ${
                isActive
                  ? "bg-gray-100 dark:bg-gray-800 ring-1 ring-gray-200 dark:ring-gray-700"
                  : ""
              }`}
            >
              <link.icon
                className={`w-5 h-5 transition-colors ${
                  isActive
                    ? "text-gray-900 dark:text-gray-100"
                    : "text-gray-600 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-gray-100"
                }`}
              />
            </div>
            <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-xs text-gray-500 dark:text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {link.name}
            </span>
          </motion.a>
        );
      })}
    </div>
  );
}
