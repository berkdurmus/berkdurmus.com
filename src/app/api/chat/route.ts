import { NextRequest, NextResponse } from "next/server";
import { getAIResponse } from "@/lib/chat-service";
import { ChatMessage } from "@/lib/types";

export async function POST(req: NextRequest) {
  try {
    const { messages, apiKey } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { status: 400 }
      );
    }

    const response = await getAIResponse(messages as ChatMessage[], apiKey);

    return NextResponse.json({ message: response });
  } catch (error) {
    console.error("Chat API error:", error);
    return NextResponse.json(
      { error: "Failed to get response" },
      { status: 500 }
    );
  }
}

