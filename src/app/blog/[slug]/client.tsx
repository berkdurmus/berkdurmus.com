"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeHighlight from "rehype-highlight";
import remarkGfm from "remark-gfm";
import { useEffect, useRef, useState } from "react";
import type { BlogPost } from "@/lib/types";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import javascript from "highlight.js/lib/languages/javascript";
import json from "highlight.js/lib/languages/json";
import bash from "highlight.js/lib/languages/bash";
import http from "highlight.js/lib/languages/http";
import "highlight.js/styles/atom-one-dark.css";

// Register the languages we need
hljs.registerLanguage("typescript", typescript);
hljs.registerLanguage("ts", typescript);
hljs.registerLanguage("javascript", javascript);
hljs.registerLanguage("js", javascript);
hljs.registerLanguage("json", json);
hljs.registerLanguage("bash", bash);
hljs.registerLanguage("shell", bash);
hljs.registerLanguage("http", http);

// Create a Mermaid component that handles the rendering
const MermaidDiagram = ({ content }: { content: string }) => {
  const [svg, setSvg] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const uniqueId = useRef(`mermaid-${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    const renderDiagram = async () => {
      if (typeof window === "undefined") return;

      try {
        // Import mermaid dynamically
        const mermaidModule = await import("mermaid");
        const mermaid = mermaidModule.default;

        // Reset if already initialized to avoid conflicts
        try {
          mermaid.initialize({
            startOnLoad: false,
            theme: "dark",
            securityLevel: "loose",
            fontFamily:
              'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
          });
        } catch (e) {
          // Ignore initialization errors, continue with rendering
        }

        // Ensure container exists
        if (!containerRef.current) return;

        // Use mermaid.render with the container ID
        const { svg: renderedSvg } = await mermaid.render(
          uniqueId.current,
          content
        );

        setSvg(renderedSvg);
        setError(null);
      } catch (err) {
        console.error("Mermaid rendering error:", err);
        setError(
          `Error rendering diagram: ${
            err instanceof Error ? err.message : String(err)
          }`
        );
      }
    };

    // Add a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      renderDiagram();
    }, 100);

    return () => clearTimeout(timer);
  }, [content]);

  if (error) {
    return (
      <div className="text-red-500 border border-red-300 p-4 rounded">
        {error}
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="my-8 mx-auto text-center"
      dangerouslySetInnerHTML={svg ? { __html: svg } : undefined}
    />
  );
};

// Component for syntax highlighted code
const CodeBlock = ({
  language,
  value,
}: {
  language: string;
  value: string;
}) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightElement(codeRef.current);
    }
  }, [value]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative group">
      <div className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={copyToClipboard}
          className="bg-gray-700 hover:bg-gray-600 text-white text-xs px-2 py-1 rounded"
        >
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      {language && (
        <div className="absolute top-0 left-4 bg-gray-700 text-gray-300 px-2 py-1 text-xs rounded-b">
          {language}
        </div>
      )}
      <pre className="mt-6 bg-gray-800 rounded-md overflow-x-auto">
        <code
          ref={codeRef}
          className={`language-${language} block p-4 pt-8 text-sm`}
        >
          {value}
        </code>
      </pre>
    </div>
  );
};

export default function BlogPostClient({ post }: { post: BlogPost }) {
  // Custom component to render Mermaid diagrams
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      if (inline) {
        return (
          <code
            className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm"
            {...props}
          >
            {children}
          </code>
        );
      }

      const match = /language-(\w+)/.exec(className || "");
      const language = match ? match[1] : "";
      const value = String(children).replace(/\n$/, "");

      // Handle Mermaid diagrams
      if (language === "mermaid") {
        return <MermaidDiagram content={value} />;
      }

      // For regular code blocks, use our custom syntax highlighting
      return <CodeBlock language={language} value={value} />;
    },
    // Add better paragraph spacing
    p({ children }: any) {
      return <p className="mb-6">{children}</p>;
    },
    // Improve heading styles
    h1({ children }: any) {
      return <h1 className="text-4xl font-bold mt-12 mb-6">{children}</h1>;
    },
    h2({ children }: any) {
      return <h2 className="text-3xl font-bold mt-10 mb-4">{children}</h2>;
    },
    h3({ children }: any) {
      return <h3 className="text-2xl font-semibold mt-8 mb-4">{children}</h3>;
    },
    h4({ children }: any) {
      return <h4 className="text-xl font-semibold mt-6 mb-3">{children}</h4>;
    },
    // Style block quotes
    blockquote({ children }: any) {
      return (
        <blockquote className="border-l-4 border-gray-300 dark:border-gray-700 pl-4 italic text-gray-700 dark:text-gray-300 my-6">
          {children}
        </blockquote>
      );
    },
    // Better styling for lists
    ul({ children }: any) {
      return (
        <ul className="list-disc list-inside mb-6 space-y-2">{children}</ul>
      );
    },
    ol({ children }: any) {
      return (
        <ol className="list-decimal list-inside mb-6 space-y-2">{children}</ol>
      );
    },
    li({ children }: any) {
      return (
        <li className="text-gray-700 dark:text-gray-300 ml-2">{children}</li>
      );
    },
  };

  return (
    <main className="min-h-screen">
      <article className="max-w-3xl mx-auto px-6 py-20">
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
            <span>Back to home</span>
          </Link>
        </motion.div>

        {/* Article header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
            <time>{post.date}</time>
            <span className="text-gray-300 dark:text-gray-700">•</span>
            <span>{post.readingTime}</span>
          </div>
        </motion.header>

        {/* Article content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="prose prose-lg prose-gray dark:prose-invert max-w-none"
        >
          {post.isMarkdown ? (
            <ReactMarkdown
              rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {post.content.trim()}
            </ReactMarkdown>
          ) : (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          )}
        </motion.div>

        {/* Footer */}
        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-20 pt-12 border-t border-gray-200 dark:border-gray-800"
        >
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to all posts</span>
          </Link>
        </motion.footer>
      </article>

      <style jsx global>{`
        .prose h1 {
          @apply text-3xl font-bold mt-16 mb-6 text-gray-900 dark:text-gray-100;
        }
        .prose h2 {
          @apply text-2xl font-semibold mt-12 mb-4 text-gray-900 dark:text-gray-100;
        }
        .prose h3 {
          @apply text-xl font-semibold mt-10 mb-4 text-gray-900 dark:text-gray-100;
        }
        .prose p {
          @apply text-gray-700 dark:text-gray-300 leading-relaxed mb-6;
        }
        .prose ul {
          @apply my-6 space-y-2;
        }
        .prose li {
          @apply text-gray-700 dark:text-gray-300 ml-6;
        }
        .prose a {
          @apply text-blue-600 dark:text-blue-400 hover:underline;
        }
        .prose blockquote {
          @apply pl-4 border-l-4 border-gray-300 dark:border-gray-700 italic text-gray-700 dark:text-gray-300;
        }
        .prose code {
          @apply bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-1 py-0.5 rounded text-sm;
        }
        .prose pre {
          @apply bg-transparent p-0 rounded-md overflow-x-auto;
        }
        .prose pre code {
          @apply bg-transparent p-0 text-gray-800 dark:text-gray-200;
        }
      `}</style>
    </main>
  );
}
