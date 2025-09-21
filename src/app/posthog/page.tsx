"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Sparkles,
  Zap,
  Rocket,
  Brain,
  Code,
  Heart,
} from "lucide-react";

// PostHog-themed rotating titles
const PostHogTitles = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const titles = [
    "AI Product Engineer",
    "Agent Whisperer",
    "LLM Wrangler",
    "Bug Creator & Destroyer",
    "Hedgehog Enthusiast 🦔",
    "Shipping Machine",
    "Async Communication Ninja",
    "10x Engineer (with AI it's 100x)",
    "Professional Weird Person",
    "Max AI's Best Friend",
    "SQL Query Poet",
    "Session Recording Detective",
    "Your Next Teammate?",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % titles.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [titles.length]);

  return (
    <div className="h-[40px] relative">
      <motion.span
        key={currentIndex}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute inset-0 text-2xl md:text-3xl font-medium bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent"
      >
        {titles[currentIndex]}
      </motion.span>
    </div>
  );
};

// Fake AI conversation component
const AIConversation = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [currentMessage, setCurrentMessage] = useState(0);

  useEffect(() => {
    const conversation = [
      "🤖 Max AI: Hey Berk, ready to make PostHog even more awesome?",
      "👨‍💻 Berk: Already built 3 agents while you were typing that",
      "🤖 Max AI: Show off. But can they write SQL queries?",
      "👨‍💻 Berk: They write SQL, optimize it, then explain it in haikus",
      "🤖 Max AI: ...You're hired",
      "👨‍💻 Berk: Wait, you can't make hiring decisions",
      "🤖 Max AI: I can dream, can't I?",
      "🦔 PostHog: *hedgehog noises of approval*",
    ];

    if (currentMessage < conversation.length) {
      const timer = setTimeout(() => {
        setMessages((prev) => [...prev, conversation[currentMessage]]);
        setCurrentMessage((prev) => prev + 1);
      }, 2000);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentMessage]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 0.8 }}
      className="mt-12 p-6 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
    >
      <h3 className="text-sm font-mono text-gray-500 dark:text-gray-400 mb-4">
        {"// Live AI Agent Negotiation"}
      </h3>
      <div className="space-y-3 font-mono text-sm">
        {messages.map((msg, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            className="text-gray-700 dark:text-gray-300"
          >
            {msg}
          </motion.div>
        ))}
        {currentMessage < 8 && (
          <span className="inline-block animate-pulse text-gray-400">▊</span>
        )}
      </div>
    </motion.div>
  );
};

// Feature cards with PostHog culture references
const FeatureCard = ({ icon: Icon, title, description, delay }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.5 }}
    className="p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-orange-500 dark:hover:border-orange-500 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
  >
    <Icon className="w-8 h-8 text-orange-500 mb-4" />
    <h3 className="text-lg font-semibold mb-2 text-gray-900 dark:text-gray-100">
      {title}
    </h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </motion.div>
);

export default function PostHogPage() {
  const [hedgehogCount, setHedgehogCount] = useState(0);

  return (
    <main className="min-h-screen">
      <div className="max-w-6xl mx-auto px-6 py-20 md:py-32">
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to normal reality</span>
          </Link>
        </motion.div>

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
              Hey PostHog!
              <motion.span
                className="inline-block ml-4 cursor-pointer"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                onClick={() => setHedgehogCount((prev) => prev + 1)}
              >
                🦔
              </motion.span>
            </h1>
            {hedgehogCount > 0 && (
              <motion.p
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs text-gray-500 dark:text-gray-400"
              >
                Hedgehog clicks: {hedgehogCount}{" "}
                {hedgehogCount > 10 && "(You found the easter egg!)"}
              </motion.p>
            )}
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
              <span className="bg-gradient-to-r from-orange-500 to-red-600 bg-clip-text text-transparent">
                Berk
              </span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            <PostHogTitles />
          </motion.div>
        </motion.section>

        {/* The Pitch */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="mb-16"
        >
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <h3 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
              Why I&apos;m Perfect for PostHog (Besides My Hedgehog Collection)
            </h3>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              className="space-y-4 text-gray-700 dark:text-gray-300"
            >
              <p>
                <strong>I ship fast.</strong> This entire page? Built it in one
                session while my coffee was still warm. By the time you finish
                reading this, I&apos;ve probably shipped three more features.
              </p>

              <p>
                <strong>I&apos;m weird (in the best way).</strong> I once built
                an AI that writes SQL queries in iambic pentameter. It
                wasn&apos;t useful, but it was beautiful. Just like redesigning
                your website for the 5th time - sometimes you do things because
                they&apos;re fun.
              </p>

              <p>
                <strong>I think in products, not features.</strong> While others
                debate prompts, I&apos;m building autonomous agents that
                actually solve problems. I don&apos;t just hit APIs - I
                architect systems that make LLMs actually useful.
              </p>

              <p>
                <strong>I&apos;m already building what you need.</strong> Agents
                that understand context, workflow automation that doesn&apos;t
                suck, and AI that enhances rather than replaces human
                intelligence. Plus, I can make them explain themselves in
                haikus.
              </p>
            </motion.div>
          </div>
        </motion.section>

        {/* Interactive AI Demo */}
        <AIConversation />

        {/* Skills Grid */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="my-20"
        >
          <h3 className="text-2xl font-bold mb-8 text-gray-900 dark:text-gray-100">
            What I Bring to the Table (Besides Snacks)
          </h3>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Brain}
              title="AI That Actually Works"
              description="I build agents that solve real problems, not demos. They understand context, learn from feedback, and occasionally tell jokes."
              delay={1.2}
            />
            <FeatureCard
              icon={Zap}
              title="Ship It Yesterday"
              description="Why wait? I ship MVPs to production, iterate with real users, and improve based on actual feedback. Meetings optional."
              delay={1.3}
            />
            <FeatureCard
              icon={Code}
              title="Full-Stack Everything"
              description="From LLM orchestration to pixel-perfect UIs. Python, TypeScript, React, and whatever else needs doing. I learn fast."
              delay={1.4}
            />
            <FeatureCard
              icon={Rocket}
              title="Product Mindset"
              description="I don't just code - I talk to users, own pricing, write docs, and do support. Because great products need more than great code."
              delay={1.5}
            />
            <FeatureCard
              icon={Sparkles}
              title="Weird & Wonderful"
              description="I embrace the weird. Like building this custom page instead of sending a boring resume. Or teaching AI to be funny."
              delay={1.6}
            />
            <FeatureCard
              icon={Heart}
              title="Open Source Soul"
              description="I believe in building in public, sharing knowledge, and making the web a weirder, more wonderful place."
              delay={1.7}
            />
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="my-20 text-center p-12 rounded-3xl bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200 dark:border-orange-800"
        >
          <h3 className="text-3xl font-bold mb-4 text-gray-900 dark:text-gray-100">
            Let&apos;s Build Something Weird Together
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            I&apos;m ready to help PostHog become the operating system for every
            software company. Let&apos;s ship AI agents that actually matter,
            build products users love, and have way too much fun doing it.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <motion.a
              href="mailto:hello@berkdurmus.com"
              className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-full hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Let&apos;s Chat! 🚀
            </motion.a>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2 }}
              className="text-sm text-gray-500 dark:text-gray-400"
            >
              P.S. I can start immediately and work in any timezone 🌍
            </motion.p>
          </div>
        </motion.section>

        {/* Fun Facts */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="my-20 p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/50 border border-gray-200 dark:border-gray-800"
        >
          <h4 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100">
            Random Facts That May or May Not Be Relevant:
          </h4>
          <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
            <li>
              • I&apos;ve read your entire handbook (yes, even the weird parts)
            </li>
            <li>
              • I believe Tuesday and Thursday should always be meeting-free
            </li>
            <li>• I once debugged production at 3 AM and enjoyed it</li>
            <li>
              • My code commits have been described as &quot;aggressive&quot;
              and &quot;relentless&quot;
            </li>
            <li>• I think hedgehogs are underrated as company mascots</li>
            <li>• I&apos;m already planning my first 10 PRs for PostHog</li>
            <li>
              • This page has{" "}
              {hedgehogCount > 0
                ? `${hedgehogCount} hidden hedgehogs`
                : "hidden hedgehogs (try clicking things)"}
            </li>
          </ul>
        </motion.section>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 0.8 }}
          className="border-t border-gray-200 dark:border-gray-800 pt-12"
        >
          <motion.p className="text-center mt-12 text-sm text-gray-500 dark:text-gray-500">
            Built with ☕, 🎵, and an unhealthy amount of enthusiasm for PostHog
          </motion.p>
          <motion.p className="text-center mt-2 text-xs text-gray-400 dark:text-gray-600">
            No hedgehogs were harmed in the making of this page
          </motion.p>
        </motion.footer>
      </div>
    </main>
  );
}
