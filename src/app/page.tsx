"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { BlogCard } from "@/components/blog-card";
import { SocialLinks } from "@/components/social-links";
import { NewsletterForm } from "@/components/newsletter-form";

// Sample blog data - you can move this to a separate data file later
const blogPosts = [
  {
    title: "Building the Future with AI",
    slug: "building-future-with-ai",
    date: "December 2024",
    readingTime: "Quick to Read" as const,
    description:
      "Exploring how AI is transforming the way we build products and experiences.",
  },
  {
    title: "The Art of Product Engineering",
    slug: "art-of-product-engineering",
    date: "November 2024",
    readingTime: "Sometime to read" as const,
    description:
      "Deep dive into the principles and practices of modern product engineering.",
  },
  {
    title: "Defending Earth: A Technical Analysis of LLM Security",
    slug: "defending-earth-llm-security",
    date: "October 2024",
    readingTime: "Impossible to Read all" as const,
    description:
      "A comprehensive guide to understanding and mitigating risks in Large Language Models.",
  },
  {
    title: "From Idea to Product in 48 Hours",
    slug: "idea-to-product-48-hours",
    date: "September 2024",
    readingTime: "Quick to Read" as const,
    description:
      "How to rapidly prototype and launch products that users love.",
  },
  {
    title: "The Philosophy of Clean Code",
    slug: "philosophy-clean-code",
    date: "August 2024",
    readingTime: "Sometime to read" as const,
    description:
      "Why writing maintainable code is an art form worth mastering.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-2">
              Hey!
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="text-gray-900 dark:text-gray-100">
                I&apos;m{" "}
              </span>
              <span className="gradient-text">Berk</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            {/* <AnimatedText /> */}
          </motion.div>
        </motion.section>

        {/* Blog Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-20 max-w-4xl"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-8"
          >
            Thoughts
          </motion.h3>

          <div className="space-y-2">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} {...post} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Footer with Social Links */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="border-t border-gray-200 dark:border-gray-800 pt-12 max-w-4xl"
        >
          <SocialLinks />

          {/* Newsletter Subscription */}
          <div className="mt-12 mb-12">
            <NewsletterForm />
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="text-center mt-12 text-sm text-gray-500 dark:text-gray-500"
          >
            © {new Date().getFullYear()} Berk Durmuş. Crafted with precision and
            a dash of chaos.
          </motion.p>
        </motion.footer>
      </div>
    </main>
  );
}
