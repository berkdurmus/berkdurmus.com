import { BlogPost } from "./types";

// Central storage for blog posts metadata
export const blogPosts = [
  {
    title: "Shipping Fast: Team Autonomy Unleashed",
    slug: "shipping-fast",
    date: "August 2025",
    readingTime: "Quick to Read" as const,
    description: "Maximizing team velocity through autonomy and ownership",
  },
  {
    title: "Building for Coolest Grandma",
    slug: "building-for-coolest-grandma",
    date: "August 2025",
    readingTime: "Quick to Read" as const,
    description: "Design philosophy for intuitive yet elegant experiences",
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
