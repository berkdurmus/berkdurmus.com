import { BlogPost } from "./types";

// Central storage for blog posts metadata
export const blogPosts = [
  {
    title: "Building for Coolest Grandma",
    slug: "building-for-coolest-grandma",
    date: "September 2025",
    readingTime: "Quick to Read" as const,
    description: "Design philosophy for intuitive yet elegant experiences",
  },
  {
    title: "How to Ship Production Features in 24 Hours Without Burning Out",
    slug: "how-to-ship-production-features-in-24-hours-without-burning-out",
    date: "September 2025",
    readingTime: "Quick to Read" as const,
    description: "A 24‑hour playbook that protects quality, safety, and sleep",
  },
  {
    title: "Stimulating Neuroplasticity with Learning Clojure",
    slug: "stimulating-neuroplasticity-with-learning-clojure",
    date: "September 2025",
    readingTime: "Sometime to read" as const,
    description:
      "Why a Lisp changed how I think after a decade of TypeScript/C++",
  },
  {
    title: "Why Error Messages Are Part of UX (And How to Design Them)",
    slug: "error-messages-part-of-ux",
    date: "August 2025",
    readingTime: "Quick to Read" as const,
    description:
      "Design principles, patterns, and a checklist for helpful errors",
  },
  {
    title: "Why Fewer Parameters = Safer Systems",
    slug: "why-fewer-parameters-safer-systems",
    date: "August 2025",
    readingTime: "Quick to Read" as const,
    description: "Reducing knobs to cut risk, complexity, and blast radius",
  },
  // {
  //   title: "Shipping Fast: Team Autonomy Unleashed",
  //   slug: "shipping-fast",
  //   date: "August 2025",
  //   readingTime: "Quick to Read" as const,
  //   description: "Maximizing team velocity through autonomy and ownership",
  // },
  {
    title: "First Principles Thinking",
    slug: "first-principles-thinking",
    date: "July 2025",
    readingTime: "Sometime to read" as const,
    description:
      "A practical case study applying first principles to real constraints",
  },
  {
    title: "Designing LLM Workflows",
    slug: "designing-llm-workflows",
    date: "July 2025",
    readingTime: "Sometime to read" as const,
    description: "Structured Pipelines vs. Autonomous Agents",
  },
  {
    title: "Self-Evolving Layered Structured Memory",
    slug: "self-evolving-structured-memory",
    date: "June 2025",
    readingTime: "Impossible to Read all" as const,
    description: "Turning Chat Fragments into a Living Knowledge System",
  },
];

// Function to get blog post metadata by slug
export function getBlogPostMetadata(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
