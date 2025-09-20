"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { BlogCard } from "@/components/blog-card";
import { SocialLinks } from "@/components/social-links";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProjectCard } from "@/components/project-card";
import { useEffect, useState } from "react";

// Sample data - you can move these to separate data files later
const projects = [
  {
    title: "AI-Powered Code Assistant",
    description:
      "A VS Code extension that uses OpenAI's GPT models to help developers write and understand code faster.",
    githubUrl: "https://github.com/yourusername/ai-code-assistant",
    demoUrl: "https://ai-code-assistant.demo.com",
    techStack: ["TypeScript", "React", "Node.js", "OpenAI"],
  },
  {
    title: "Personal Portfolio",
    description:
      "A modern, responsive portfolio website built with Next.js and Tailwind CSS.",
    githubUrl: "https://github.com/yourusername/portfolio",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Data Visualization Dashboard",
    description:
      "Interactive dashboard for visualizing complex datasets with customizable charts and filters.",
    githubUrl: "https://github.com/yourusername/data-viz-dashboard",
    demoUrl: "https://data-viz.demo.com",
    techStack: ["React", "D3.js", "Redux", "Firebase"],
  },
  {
    title: "Machine Learning Model Explorer",
    description:
      "A tool for data scientists to explore and explain machine learning models with interpretable visualizations.",
    githubUrl: "https://github.com/yourusername/ml-explorer",
    techStack: ["Python", "PyTorch", "FastAPI", "React"],
  },
];

import { blogPosts } from "@/lib/blog-data";

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-52"
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
            <h2 className="text-4xl md:text-6xl font-bold mb-20">
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

        {/* About Me Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-20 max-w-4xl"
        >
          {/* Left-aligned header */}
          {/* <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-8">
            About
          </h3> */}

          {/* Main content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="space-y-10"
          >
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200">
              I&apos;m a product engineer who writes code by day and debugs
              dreams by night.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              I&apos;ve co-founded 3 startups (because sleep is overrated), with
              pulfy.com reaching 10k+ monthly paying customers in 2021. These
              days at Center Health, I build AI workflows and agents that make
              hundreds of thousands of patients&apos; lives easier - no
              pressure, right?
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              When I&apos;m not crafting clinical agents, voice call agents, or
              MCP servers, I&apos;m probably obsessing over my latest creation:
              Self Evolving Layered Structured Memory or fine-tuning my prompt
              management systems.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mt-8">
              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Current Obsessions
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  Building AI-driven systems including dev tools, copilots,
                  evaluation frameworks, and memory architectures while trying
                  not to create Skynet by accident.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Side Quests
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  Created Berf (my own DSL language, because the world needed
                  one more), Playwright Debug Agent, and OpenTelemetry Agent.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              If you need me, I&apos;ll be somewhere at the intersection of
              product, engineering, and artificial intelligence - probably
              arguing with an LLM about the meaning of life.
            </p>
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
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-18"
          >
            Thoughts{" "}
          </motion.h3>

          <div className="space-y-2">
            {blogPosts.map((post, index) => (
              <BlogCard key={post.slug} {...post} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Projects Section */}
        {/* <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="mb-20 max-w-4xl"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-18"
          >
            Work{" "}
          </motion.h3>

          <div className="space-y-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.section> */}

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
