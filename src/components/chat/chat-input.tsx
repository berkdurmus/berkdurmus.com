"use client";

import { useState, FormEvent, useRef, useEffect } from "react";
import { Send, Mic, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function ChatInput({
  onSendMessage,
  disabled,
  placeholder = "Type a message...",
}: ChatInputProps) {
  const [message, setMessage] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(
        inputRef.current.scrollHeight,
        150
      )}px`;
    }
  }, [message]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const trimmedMessage = message.trim();
    if (trimmedMessage && !disabled) {
      onSendMessage(trimmedMessage);
      setMessage("");

      // Reset height after sending
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Submit on Enter without Shift
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      onSubmit={handleSubmit}
      className={`relative flex items-end gap-2 bg-white dark:bg-gray-900 rounded-xl p-2 ${
        isFocused
          ? "ring-2 ring-blue-500 dark:ring-blue-400"
          : "ring-1 ring-gray-200 dark:ring-gray-700"
      }`}
    >
      <textarea
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        disabled={disabled}
        rows={1}
        className="flex-1 max-h-[150px] px-3 py-2 bg-transparent border-0 focus:ring-0 resize-none text-gray-800 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 outline-none"
      />

      <div className="flex-shrink-0 flex items-center">
        <motion.button
          whileTap={{ scale: 0.9 }}
          type="submit"
          disabled={!message.trim() || disabled}
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            message.trim() && !disabled
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-200 dark:bg-gray-800 text-gray-400 cursor-not-allowed"
          }`}
        >
          {disabled ? (
            <Loader2 size={18} className="animate-spin" />
          ) : (
            <Send size={18} />
          )}
        </motion.button>
      </div>
    </motion.form>
  );
}
