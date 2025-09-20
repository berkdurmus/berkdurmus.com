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
          className="mb-16 max-w-4xl"
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
            <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-200 mt-[-100px]">
              I&apos;m a software engineer passionate about healthcare.
            </p>

            {/* <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              I’ve shipped end-to-end clinical telephony agents, EHR
              automations, human-in-the-loop workflows, an AI diabetes coach, a
              self-evolving layered LLM memory system, a clinical workflow
              engine, a reinforcement-learning notification system, LLM
              observability, CGM/device integrations, healthcare MCP servers,
              and lots of other healthcare solutions.
            </p> */}

            {/* <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              I co-founded pulfy.com, a travel recommendation engine startup —
              nowadays I&apos;m focused on solving healthcare problems.
            </p> */}

            <div className="grid md:grid-cols-2 gap-10 mt-8">
              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Current Obsessions
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  Recommendation engines, Reinforcement Learning, LLM Memory,
                  LLM Observability & Guardrails, Automations and
                  Human-in-the-loop workflows.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Side Quests
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  OpenTelemetry, Playwright, OpenSource Healthcare, SQS, Kafka
                  and more.
                </p>
              </div>
            </div>

            {/* <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              I&apos;m focused on building reliable, measurable software for
              care teams and patients.
            </p> */}
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
          className="pt-12 max-w-4xl"
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
