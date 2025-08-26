export interface ChatMessage {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  messages: ChatMessage[];
  createdAt: number;
  updatedAt: number;
}

export interface BlogPost {
  title: string;
  date: string;
  readingTime: "Sometime to read" | "Quick to Read" | "Impossible to Read all";
  content: string;
  isMarkdown?: boolean;
}
