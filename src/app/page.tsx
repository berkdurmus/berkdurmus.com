"use client";

import { motion } from "framer-motion";
import { AnimatedText } from "@/components/animated-text";
import { BlogCard } from "@/components/blog-card";
import { SocialLinks } from "@/components/social-links";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProjectCard } from "@/components/project-card";

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
              I&apos;m a product engineer with a passion for crafting
              exceptional digital experiences. My work sits at the intersection
              of{" "}
              <span className="font-medium text-gray-900 dark:text-gray-100">
                design
              </span>
              ,
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {" "}
                engineering
              </span>
              , and
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {" "}
                artificial intelligence
              </span>
              .
            </p>

            <div className="grid md:grid-cols-2 gap-10">
              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Currently
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  Building AI-powered tools that make developers more productive
                  and creative.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Focus Areas
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  LLM applications, developer tools, and creating seamless user
                  experiences.
                </p>
              </div>
            </div>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              With experience spanning startups to enterprise, I bring a
              pragmatic approach to building products that scale. I believe in
              writing clean, maintainable code and creating interfaces that feel
              intuitive from the first interaction.
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
