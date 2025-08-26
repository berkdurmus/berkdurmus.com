"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChatMessage } from "@/lib/types";
import { User, Bot } from "lucide-react";

interface ChatBubbleProps {
  message: ChatMessage;
  isLastMessage: boolean;
}

export function ChatBubble({ message, isLastMessage }: ChatBubbleProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  // Don't show system messages
  if (isSystem) return null;

  const bubbleVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
  };

  const shouldTruncate = message.content.length > 300 && !isExpanded;
  const displayContent = shouldTruncate
    ? `${message.content.slice(0, 300)}...`
    : message.content;

  return (
    <motion.div
      className={`flex items-start gap-2 ${
        isUser ? "justify-end" : "justify-start"
      }`}
      variants={bubbleVariants}
      initial="initial"
      animate="animate"
      transition={{ duration: 0.3 }}
    >
      {!isUser && (
        <div className="mt-1 flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
            <Bot size={18} />
          </div>
        </div>
      )}

      <div
        className={`relative max-w-[80%] py-3 px-4 rounded-2xl ${
          isUser
            ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white"
            : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200"
        } ${isLastMessage ? "animate-pulse-once" : ""}`}
      >
        <div className="whitespace-pre-wrap">{displayContent}</div>

        {shouldTruncate && (
          <button
            onClick={() => setIsExpanded(true)}
            className="text-xs mt-2 opacity-70 hover:opacity-100 transition-opacity underline"
          >
            Read more
          </button>
        )}

        <div className="text-right mt-1">
          <span className="text-xs opacity-50">
            {new Date(message.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>

      {isUser && (
        <div className="mt-1 flex-shrink-0">
          <div className="h-8 w-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white">
            <User size={18} />
          </div>
        </div>
      )}
    </motion.div>
  );
}

