"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { ChatWindow } from "./chat-window";

export function ChatButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 h-14 w-14 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl transition-all duration-300"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isOpen ? <X size={22} /> : <MessageCircle size={22} />}
      </motion.button>

      <ChatWindow isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
