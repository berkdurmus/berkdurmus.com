import { notFound } from "next/navigation";
import { promises as fs } from "fs";
import path from "path";
import type { BlogPost } from "@/lib/types";
import { getBlogPostMetadata } from "@/lib/blog-data";
// @ts-ignore
import BlogPostClient from "./client";

// This function will be used to get blog content from files
async function getBlogContent(slug: string): Promise<BlogPost | null> {
  try {
    // Define the path to the blogs directory
    const blogsDirectory = path.join(process.cwd(), "src/blogs");

    // Check if the file exists
    const filePath = path.join(blogsDirectory, `${slug}.md`);
    let content;

    try {
      content = await fs.readFile(filePath, "utf8");
    } catch (error) {
      // If the specific slug isn't found as a file, check in hardcoded content
      return hardcodedBlogContent[slug] || null;
    }

    // Get metadata from our central blog data store
    const metadata = getBlogPostMetadata(slug);

    if (!metadata) {
      // Fallback to generating title from slug if not in our central data
      return {
        title: slug
          .split("-")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" "),
        date: new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
        }),
        readingTime: "Sometime to read",
        content: content,
        isMarkdown: true,
      };
    }

    // Use metadata from central store
    return {
      ...metadata,
      content: content,
      isMarkdown: true,
    };
  } catch (error) {
    console.error("Error loading blog content:", error);
    return null;
  }
}

// Keep hardcoded content as a fallback
const hardcodedBlogContent: Record<string, BlogPost> = {
  "building-future-with-ai": {
    title: "Building the Future with AI",
    date: "December 2024",
    readingTime: "Quick to Read",
    isMarkdown: true,
    content: `
The intersection of artificial intelligence and product development is creating unprecedented opportunities for builders and innovators. As we stand at the threshold of a new era, the question isn't whether to integrate AI into our products, but how to do it thoughtfully and effectively.

### The New Building Blocks

Large Language Models have fundamentally changed what's possible in product development. What once required teams of engineers can now be prototyped in hours. The democratization of AI capabilities means that builders at every level can create experiences that were previously the domain of tech giants.

## Beyond the Hype

While the excitement around AI is justified, the real value comes from solving genuine user problems. The best AI-powered products don't showcase the technology—they make it invisible, seamlessly enhancing the user experience without friction.

## The Builder's Mindset

Success in this new landscape requires a combination of technical understanding and product intuition. It's not enough to know how to implement AI; you need to understand when and why to use it. The builders who will thrive are those who can bridge the gap between technological capability and human need.

## Looking Forward

As we continue to push the boundaries of what's possible, remember that the fundamentals haven't changed. Great products solve real problems for real people. AI is simply a new tool in our toolkit—powerful, yes, but ultimately just another way to create value for users.
    `,
  },
  "art-of-product-engineering": {
    title: "The Art of Product Engineering",
    date: "November 2024",
    readingTime: "Sometime to read",
    isMarkdown: true,
    content: `
Product engineering is more than just writing code. It's about understanding the delicate balance between technical excellence and user experience, between shipping fast and building for scale, between innovation and reliability.

## The Dual Mindset

Great product engineers think like both builders and users. They can zoom out to see the big picture and zoom in to debug a single line of code. This dual perspective is what separates good engineers from exceptional ones.

## Speed vs. Quality: The False Dichotomy

The age-old debate of speed versus quality misses the point. The best product engineers know how to move fast without breaking things. They understand that technical debt is a tool, not a burden, when used strategically.

## The Iteration Loop

Product engineering is fundamentally about iteration. Ship, learn, improve, repeat. The faster this loop, the better the product becomes. But speed alone isn't enough—each iteration must be informed by real user feedback and data.

## Building for Scale

Every line of code you write today will either enable or constrain your future. Product engineers must balance immediate needs with long-term vision, building systems that can grow with the product.

## The Human Element

At its core, product engineering is about people. The best technical solution means nothing if users can't understand it. The most elegant architecture fails if it doesn't solve real problems. Never lose sight of the human element in your work.
    `,
  },
  "defending-earth-llm-security": {
    title: "Defending Earth: A Technical Analysis of LLM Security",
    date: "October 2024",
    readingTime: "Impossible to Read all",
    isMarkdown: true,
    content: `
As Large Language Models become increasingly powerful and ubiquitous, the question of security becomes paramount. This isn't just about protecting data—it's about ensuring these systems remain aligned with human values as they grow in capability.

## The Attack Surface

LLMs present a unique security challenge. Traditional security models don't fully apply to systems that can generate arbitrary text, understand context, and potentially influence human behavior at scale. The attack surface isn't just technical—it's cognitive and social.

## Prompt Injection: The New SQL Injection

Just as SQL injection dominated web security concerns for decades, prompt injection represents a fundamental vulnerability in LLM-based systems. But unlike SQL injection, which has well-established defenses, prompt injection remains an open problem with no perfect solution.

## The Alignment Problem

Beyond traditional security concerns lies the alignment problem: ensuring AI systems do what we want them to do, not just what we tell them to do. This subtle distinction becomes critical as these systems become more capable and autonomous.

## Defense in Depth

Securing LLM-based systems requires a multi-layered approach:

* Input validation and sanitization
* Output filtering and monitoring
* Rate limiting and anomaly detection
* Human-in-the-loop validation for critical operations
* Regular security audits and red team exercises

## The Governance Challenge

Technical solutions alone won't suffice. We need robust governance frameworks, industry standards, and possibly new regulatory approaches to ensure these powerful systems remain beneficial and safe.

## The Path Forward

As defenders of Earth (only half-joking), we must remain vigilant. The rapid pace of AI development means security considerations often lag behind capabilities. By building security into the foundation of our AI systems, rather than bolting it on afterward, we can create a future where AI enhances rather than threatens human flourishing.

## Conclusion

The security challenges posed by LLMs are real and significant, but not insurmountable. Through careful design, robust testing, and a commitment to safety, we can harness the power of these systems while minimizing their risks. The future depends on getting this right.
    `,
  },
  "idea-to-product-48-hours": {
    title: "From Idea to Product in 48 Hours",
    date: "September 2024",
    readingTime: "Quick to Read",
    isMarkdown: true,
    content: `
The ability to rapidly transform ideas into working products is a superpower in today's fast-moving world. Here's how to go from concept to launch in just 48 hours.

## Hour 0-4: Validation

Before writing a single line of code, validate your idea. Talk to potential users, research existing solutions, and clearly define the problem you're solving. If you can't articulate the problem in one sentence, you're not ready to build.

## Hour 4-8: Design

Sketch the core user flow. Focus on the happy path—the simplest journey from problem to solution. Cut everything that isn't essential. Your MVP should be embarrassingly simple.

## Hour 8-24: Build

This is where the magic happens. Use familiar tools, leverage existing libraries, and don't reinvent the wheel. The goal is a working prototype, not production-ready code.

## Hour 24-32: Polish

Make it usable. Fix critical bugs, improve the UI just enough to not be embarrassing, and ensure the core flow works smoothly. Perfect is the enemy of done.

## Hour 32-40: Deploy

Get it live. Use simple deployment solutions, don't over-engineer the infrastructure. You can always improve it later if the product gains traction.

## Hour 40-48: Launch

Share with the world. Post on social media, reach out to early users, gather feedback. The launch is just the beginning of the journey.

## The Secret

The real secret to rapid product development isn't working faster—it's working smarter. By focusing ruthlessly on the core value proposition and cutting everything else, you can achieve in hours what might otherwise take weeks.
    `,
  },
  "philosophy-clean-code": {
    title: "The Philosophy of Clean Code",
    date: "August 2024",
    readingTime: "Sometime to read",
    isMarkdown: true,
    content: `
Clean code is more than a set of rules—it's a philosophy, a way of thinking about software that prioritizes clarity, maintainability, and respect for future developers (including your future self).

## Code as Communication

We write code for humans, not computers. The computer doesn't care if your variable is named 'x' or 'userAuthenticationToken'. But the developer debugging your code at 3 AM certainly does.

## The Cost of Complexity

Every line of code is a liability. It needs to be understood, maintained, and potentially debugged. The best code is often the code you don't write. Simplicity isn't just elegant—it's economical.

## Names Matter

Naming is one of the hardest problems in computer science because it requires you to truly understand what you're building. A well-named function or variable is worth a thousand comments.

## The Boy Scout Rule

Leave the code better than you found it. Even small improvements—renaming a variable, extracting a function, adding a clarifying comment—compound over time to transform a codebase.

## Testing as Design

Tests aren't just about catching bugs—they're about design. If code is hard to test, it's probably hard to use. Writing tests first forces you to think about interfaces and contracts before implementation.

## The Zen of Refactoring

Refactoring isn't about perfection—it's about continuous improvement. Like tending a garden, small, regular maintenance prevents the need for major overhauls.

## Beyond the Code

Clean code extends beyond syntax and structure. It's about creating systems that are understandable, modifiable, and delightful to work with. It's about respecting the craft and the craftspeople who will come after you.
    `,
  },
};

export default async function BlogPost({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogContent(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClient post={post} />;
}
