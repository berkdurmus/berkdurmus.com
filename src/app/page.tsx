"use client";

import { motion } from "framer-motion";
import { BlogCard } from "@/components/blog-card";
import { NewsletterForm } from "@/components/newsletter-form";
import { ProjectCard } from "@/components/project-card";

const projects = [
  {
    title: "Openmation — Browser Recording & Replay",
    description:
      "Open source Chrome extension that records browser sessions, replays them with AI-assisted element matching, and generates shareable links.",
    githubUrl: "https://github.com/openmation/openmation",
    demoUrl: "https://openmation.dev",
    techStack: ["TypeScript", "Chrome APIs", "LLMs", "Monitoring"],
  },
  {
    title: "TraceStation — Playwright Test Debugger",
    description:
      "Feeds Playwright traces into an LLM to explain failed tests and highlight where to look in the codebase.",
    githubUrl: "https://github.com/berkdurmus/trace-station",
    techStack: ["Playwright", "LLMs", "TypeScript"],
  },
  {
    title: "OTelMatic — AI-Powered Observability",
    description:
      "Hooks into OpenTelemetry traces to perform automated root cause analysis and anomaly detection.",
    githubUrl: "https://github.com/berkdurmus/otelmatic",
    techStack: ["OpenTelemetry", "AI", "Observability"],
  },
  {
    title: "PromptTuner — Self-Optimizing Prompt Agent",
    description:
      "Agent that writes prompts, tests them against eval sets, and iterates until metrics improve.",
    githubUrl: "https://github.com/berkdurmus/promptuner",
    techStack: ["LLMs", "Evaluation", "Automation"],
  },
  {
    title: "Scapture — Screenshot-to-Notes Extension",
    description:
      "Chrome extension that turns screenshots into organized, searchable notes with AI.",
    githubUrl: "https://github.com/berkdurmus/scapture",
    techStack: ["Chrome Extension", "AI", "Productivity"],
  },
];

import { blogPosts } from "@/lib/blog-data";

const experiences = [
  {
    company: "Center Health",
    location: "Remote, US",
    title: "Senior Product Engineer, AI",
    dates: "Oct 2022 – Present",
    bullets: [
      "Delivered a Freestyle Libre CGM integration in 24 hours with validation, feature flags, monitoring, and rollback tooling.",
      "Set up Playwright tests across patient and clinic apps for synthetic monitoring; production bugs dropped by half.",
      "Own the AI stack: LLM agents, RAG for medical context, code generation tools, and human-in-the-loop checkpoints.",
      "Built a memory system for LLM agents across 10K+ conversations with 90% retrieval accuracy.",
      "Reworked the signup funnel as the company scaled from 2K to 18K monthly paying customers; MRR up 20% in 3 months.",
    ],
  },
  {
    company: "Pulfy.com",
    location: "Turkey",
    title: "Co-founder & CTO",
    dates: "Jul 2021 – Oct 2022",
    bullets: [
      "Built the product from scratch with two technical co-founders across backend, frontend, infra, and support.",
      "Shipped a data pipeline scraping 10K+ destinations for events, prices, weather, visas, and flight costs.",
      "Grew to 7,000 paying users and built a recommender combining collaborative filtering with content signals under 200ms.",
    ],
  },
  {
    company: "Turing",
    location: "Remote, US and EU",
    title: "Software Engineer",
    dates: "Jan 2019 – Oct 2021",
    bullets: [
      "Built data crawlers, ML image classifiers, recommendation systems, streaming pipelines, and i18n infrastructure.",
    ],
  },
  {
    company: "Turing",
    location: "Remote, US and EU",
    title: "Machine Learning Engineer",
    dates: "Aug 2017 – Jan 2019",
    bullets: [
      "Built NLP pipelines for document classification and entity extraction with 94% accuracy on 50K+ legal docs.",
      "Trained CNN models for e-commerce image recognition, handling occlusions and varied lighting.",
      "Built RNN sequence models for time-series forecasting and sentiment analysis in production.",
    ],
  },
];

const skills = [
  "TypeScript",
  "React",
  "Redux",
  "MobX",
  "Node.js",
  "GraphQL",
  "PostgreSQL",
  "Redis",
  "MongoDB",
  "Chrome Extension Development",
  "LLM Agents",
  "RAG",
  "Embeddings",
  "Prompt Engineering",
  "LangChain",
  "Playwright",
  "Cloudflare Workers",
  "AWS",
  "Docker",
];

const education = [
  {
    school: "Vienna University of Technology",
    degree: "MS Informatics, Machine Learning focus",
    dates: "2017–2019",
  },
  {
    school: "Bilkent University",
    degree: "BS Electrical & Electronics Engineering",
    dates: "2013–2017",
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
            <p className="text-base md:text-lg text-gray-600 dark:text-gray-300 -mt-12">
              Istanbul, Turkey · Senior Product Engineer, AI
            </p>
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
              I take ideas from zero to production. Right now I&apos;m building
              AI features at a health tech company: LLM agents, Playwright-based
              monitoring, and RAG pipelines. Before that, I co-founded a travel
              startup and grew it to 7K paying users.
            </p>

            <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed">
              I spend weekends building browser extensions and open source dev
              tools. MS in Machine Learning from TU Wien.
            </p>

            <div className="grid md:grid-cols-2 gap-10 mt-8">
              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Current Focus
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  LLM agents, RAG pipelines, Playwright monitoring, and
                  AI-assisted clinical workflows.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="text-base font-medium text-gray-900 dark:text-gray-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-500 rounded-full" />
                  Weekend Builds
                </h4>
                <p className="text-base text-gray-700 dark:text-gray-300 pl-4">
                  Browser extensions, open source dev tools, and AI-powered
                  observability experiments.
                </p>
              </div>
            </div>

            {/* <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed mt-6">
              I&apos;m focused on building reliable, measurable software for
              care teams and patients.
            </p> */}
          </motion.div>
        </motion.section>

        {/* Projects Section */}
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
            Projects{" "}
          </motion.h3>

          <div className="space-y-2">
            {projects.map((project, index) => (
              <ProjectCard key={project.title} {...project} index={index} />
            ))}
          </div>
        </motion.section>

        {/* Experience Section */}
        <motion.section
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
            Experience{" "}
          </motion.h3>

          <div className="space-y-6">
            {experiences.map((role) => (
              <div
                key={`${role.company}-${role.title}-${role.dates}`}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 p-6 transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/40"
              >
                <div className="flex flex-col gap-2 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      {role.company}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {role.title} · {role.location}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {role.dates}
                  </span>
                </div>
                <ul className="mt-4 list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-400">
                  {role.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Skills Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="mb-20 max-w-4xl"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.0, duration: 0.5 }}
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
          >
            Skills{" "}
          </motion.h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill}
                className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-700 dark:bg-gray-800/50 dark:text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        </motion.section>

        {/* Education Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="mb-20 max-w-4xl"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.1, duration: 0.5 }}
            className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6"
          >
            Education{" "}
          </motion.h3>
          <div className="space-y-4">
            {education.map((entry) => (
              <div
                key={`${entry.school}-${entry.degree}`}
                className="rounded-2xl border border-gray-100 dark:border-gray-800 p-5"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                  <div>
                    <h4 className="text-base font-semibold text-gray-900 dark:text-gray-100">
                      {entry.school}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {entry.degree}
                    </p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-500">
                    {entry.dates}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Blog Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="mb-20 max-w-4xl"
        >
          <motion.h3
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
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

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="pt-12 max-w-4xl"
        >
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
