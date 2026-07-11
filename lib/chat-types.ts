export type ChatMessageRole = "user" | "assistant" | "agent" | "system";

export type ChatSessionStatus = "active" | "needs_agent" | "closed";

export type ChatMessage = {
  id: string;
  role: ChatMessageRole;
  text: string;
  createdAt: string;
  author?: string;
  clientMessageId?: string;
};

export type ChatSession = {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: ChatSessionStatus;
  visitorName?: string;
  visitorContact?: string;
  lastMessage?: string;
  unreadForAgent: number;
  unreadForVisitor: number;
  messages: ChatMessage[];
};
