"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Settings, ChevronDown, Bot, Save } from "lucide-react";
import { ChatBubble } from "./chat-bubble";
import { ChatInput } from "./chat-input";
import { ChatMessage, ChatSession } from "@/lib/types";
import { v4 as uuidv4 } from "uuid";

interface ChatWindowProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ChatWindow({ isOpen, onClose }: ChatWindowProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [apiKey, setApiKey] = useState<string>("");
  const [showSettings, setShowSettings] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initial welcome message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([
        {
          id: uuidv4(),
          role: "assistant",
          content:
            "Hi there! I'm Berk's AI assistant. How can I help you today?",
          timestamp: Date.now(),
        },
      ]);
    }
  }, [messages.length]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Load API key from localStorage
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai-api-key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const handleSendMessage = async (content: string) => {
    // Add user message
    const userMessage: ChatMessage = {
      id: uuidv4(),
      role: "user",
      content,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      // Call API route
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
          apiKey,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();
      setMessages((prev) => [...prev, data.message]);
    } catch (error) {
      console.error("Error sending message:", error);
      // Add error message
      setMessages((prev) => [
        ...prev,
        {
          id: uuidv4(),
          role: "assistant",
          content: "Sorry, I encountered an error. Please try again.",
          timestamp: Date.now(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const saveApiKey = () => {
    localStorage.setItem("openai-api-key", apiKey);
    setShowSettings(false);
  };

  const clearChat = () => {
    setMessages([
      {
        id: uuidv4(),
        role: "assistant",
        content: "Chat history cleared. How can I help you today?",
        timestamp: Date.now(),
      },
    ]);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 w-80 sm:w-96 h-[500px] bg-white dark:bg-gray-900 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-gray-200 dark:border-gray-800 z-50"
        >
          {/* Chat header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-800">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white">
                <Bot size={18} />
              </div>
              <h3 className="font-medium text-gray-900 dark:text-gray-100">
                Berk&apos;s Assistant
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowSettings(!showSettings)}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <Settings
                  size={16}
                  className="text-gray-600 dark:text-gray-400"
                />
              </button>
              <button
                onClick={onClose}
                className="h-8 w-8 flex items-center justify-center rounded-full hover:bg-gray-100 dark:hover:bg-gray-800"
              >
                <X size={16} className="text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>

          {/* Settings panel */}
          <AnimatePresence>
            {showSettings && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="border-b border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                <div className="p-4 space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      OpenAI API Key
                    </label>
                    <input
                      type="password"
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      placeholder="sk-..."
                      className="w-full px-3 py-2 bg-gray-100 dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-gray-200"
                    />
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your API key is stored locally and never sent to our
                      servers.
                    </p>
                  </div>

                  <div className="flex items-center justify-between">
                    <button
                      onClick={clearChat}
                      className="text-sm text-red-500 hover:text-red-600"
                    >
                      Clear Chat History
                    </button>

                    <button
                      onClick={saveApiKey}
                      className="flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm"
                    >
                      <Save size={14} />
                      <span>Save</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Chat messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <ChatBubble
                key={message.id}
                message={message}
                isLastMessage={index === messages.length - 1}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-800">
            <ChatInput
              onSendMessage={handleSendMessage}
              disabled={loading}
              placeholder={
                !apiKey
                  ? "Add OpenAI API key in settings..."
                  : "Type a message..."
              }
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
