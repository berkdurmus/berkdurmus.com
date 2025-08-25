"use server";

import { ChatMessage } from "./types";
import { v4 as uuidv4 } from "uuid";

// For now, we're using these as constants, but they would normally come from env vars
const API_URL = "https://api.openai.com/v1/chat/completions";
const MODEL = "gpt-3.5-turbo";
const MAX_TOKENS = 1000;

export async function getAIResponse(
  messages: ChatMessage[],
  apiKey?: string
): Promise<ChatMessage> {
  try {
    // If we don't have an API key, return a message informing the user
    if (!apiKey) {
      return {
        id: uuidv4(),
        role: "assistant",
        content:
          "I need an API key to function. Please provide your OpenAI API key in the chat settings.",
        timestamp: Date.now(),
      };
    }

    // Format messages for OpenAI API
    const formattedMessages = messages.map(({ role, content }) => ({
      role,
      content,
    }));

    // Add system message if none exists
    if (!formattedMessages.some((msg) => msg.role === "system")) {
      formattedMessages.unshift({
        role: "system",
        content:
          "You are a helpful assistant on Berk's personal website. You can provide information about Berk's background, skills, and projects. Be friendly, concise, and helpful. If you don't know something specific about Berk, you can say so and provide general advice instead.",
      });
    }

    // Call OpenAI API
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: MODEL,
        messages: formattedMessages,
        max_tokens: MAX_TOKENS,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("OpenAI API error:", error);
      throw new Error(`API error: ${error.error?.message || "Unknown error"}`);
    }

    const data = await response.json();
    const reply = data.choices[0]?.message?.content?.trim();

    if (!reply) {
      throw new Error("No reply from OpenAI");
    }

    // Return formatted message
    return {
      id: uuidv4(),
      role: "assistant",
      content: reply,
      timestamp: Date.now(),
    };
  } catch (error) {
    console.error("Error getting AI response:", error);
    return {
      id: uuidv4(),
      role: "assistant",
      content: "Sorry, I encountered an error. Please try again later.",
      timestamp: Date.now(),
    };
  }
}
