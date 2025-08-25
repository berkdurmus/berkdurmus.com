"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      // Here you would add your newsletter subscription API call
      // For example:
      // await fetch('/api/subscribe', {
      //   method: 'POST',
      //   body: JSON.stringify({ email }),
      //   headers: { 'Content-Type': 'application/json' },
      // });

      // Simulate API call for now
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto mb-12"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
        Subscribe to my newsletter
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400 mb-6 text-center">
        Get the latest updates on AI, product engineering, and tech delivered to
        your inbox.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email address"
          required
          className="flex-grow px-4 py-2 rounded-md border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-500"
          disabled={status === "loading"}
        />
        <button
          type="submit"
          disabled={status === "loading" || status === "success"}
          className={`px-4 py-2 rounded-md font-medium transition-colors ${
            status === "success"
              ? "bg-green-500 hover:bg-green-600 text-white"
              : "bg-gray-900 hover:bg-gray-800 dark:bg-gray-100 dark:hover:bg-gray-200 text-white dark:text-gray-900"
          }`}
        >
          {status === "loading"
            ? "Subscribing..."
            : status === "success"
            ? "Subscribed!"
            : "Subscribe"}
        </button>
      </form>

      {status === "error" && (
        <p className="text-sm text-red-500 mt-2 text-center">
          Something went wrong. Please try again.
        </p>
      )}
    </motion.div>
  );
}
