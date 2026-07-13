"use client";
import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ChatSessionStatus } from "@/lib/chat-types";
import CustomIcon from "@/components/CustomIcon";

type Message = { id: string; role: "user" | "assistant" | "agent" | "system"; text: string; createdAt: string; streaming?: boolean };
type FlowStep = "idle" | "book_name" | "book_email" | "book_service" | "book_time" | "human_name" | "human_contact" | "human_issue";

const QUICK_REPLIES_DEFAULT = ["Our services", "Pricing", "Free AI Audit", "Book consultation", "Talk to a human"];
const CHAT_SESSION_KEY = "syberspace_chat_session_id";
const CHAT_MESSAGES_KEY = "syberspace_chat_messages";
const CHAT_AGENT_MODE_KEY = "syberspace_chat_agent_mode";
const LOCAL_STORAGE_ENCODING_PREFIX = "encoded:v1:";

const SERVICES_MAP: Record<string, string> = {
  "1": "Process Automation", "2": "Web Scraping", "3": "Data Cleaning",
  "4": "AI Bots", "5": "Data Analysis", "6": "AI Consultation", "7": "Not sure yet",
};

const HUMAN_AGENT_WHATSAPP = "2348151519625";

function isValidEmail(v: string) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

function createId(prefix: string) {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID()
    : `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  return `${prefix}-${random}`;
}

function createMessage(role: Message["role"], text: string, id = createId(role)): Message {
  return { id, role, text, createdAt: new Date().toISOString() };
}

function encodeLocalStorageValue(value: string) {
  try {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    bytes.forEach(byte => {
      binary += String.fromCharCode(byte);
    });
    return `${LOCAL_STORAGE_ENCODING_PREFIX}${btoa(binary)}`;
  } catch {
    return value;
  }
}

function decodeLocalStorageValue(value: string) {
  if (!value.startsWith(LOCAL_STORAGE_ENCODING_PREFIX)) return value;

  try {
    const binary = atob(value.slice(LOCAL_STORAGE_ENCODING_PREFIX.length));
    const bytes = Uint8Array.from(binary, char => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  } catch {
    return "";
  }
}

function getLocalStorageValue(key: string) {
  const value = window.localStorage.getItem(key);
  return value ? decodeLocalStorageValue(value) : null;
}

function setLocalStorageValue(key: string, value: string) {
  window.localStorage.setItem(key, encodeLocalStorageValue(value));
}

const INITIAL_MESSAGE = createMessage(
  "assistant",
  "Hey there! 👋 I'm **Syber**, Syberspace's AI consultant.\n\nI can answer questions about our services and pricing, help you book a consultation, or connect you with a human agent.\n\nWhat can I help you with today?",
  "welcome",
);

function buildHumanHandoffUrl(data: Record<string, string>) {
  const text = [
    "Hi Syberspace, I need to speak with a human agent.",
    "",
    `Name: ${data.name ?? ""}`,
    `Contact: ${data.contact ?? ""}`,
    `Issue: ${data.issue ?? ""}`,
  ].join("\n");

  return `https://wa.me/${HUMAN_AGENT_WHATSAPP}?text=${encodeURIComponent(text)}`;
}

/* ── Markdown renderer — links become buttons ───── */
function BotMessage({ text }: { text: string }) {
  // Split into blocks: button lines (👉 or standalone markdown link) vs normal text
  const lines = text.split("\n");

  return (
    <span className="flex flex-col gap-1.5">
      {lines.map((line, i) => {
        // Standalone markdown link on its own line → button
        const soloLink = line.trim().match(/^(?:👉\s*)?\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
        if (soloLink) {
          return (
            <a key={i} href={soloLink[2]} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white self-start"
              style={{ background: "#06b6d4", boxShadow: "0 2px 8px rgba(6,182,212,0.3)" }}>
              {soloLink[1]}
              <CustomIcon name="external" className="h-3 w-3 flex-shrink-0" />
            </a>
          );
        }

        // Bare URL on its own line → button
        const bareUrl = line.trim().match(/^(?:👉\s*)?(https?:\/\/\S+)$/);
        if (bareUrl) {
          const url = bareUrl[1];
          const label = url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");
          return (
            <a key={i} href={url} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white self-start"
              style={{ background: "#06b6d4", boxShadow: "0 2px 8px rgba(6,182,212,0.3)" }}>
              {label}
              <CustomIcon name="external" className="h-3 w-3 flex-shrink-0" />
            </a>
          );
        }

        // Normal line — render bold + inline links
        const parts = line.split(/(\*\*[^*]+\*\*|\[[^\]]+\]\(https?:\/\/[^)]+\))/g).map((p, j) => {
          if (p.startsWith("**") && p.endsWith("**"))
            return <strong key={j}>{p.slice(2, -2)}</strong>;
          const lm = p.match(/^\[([^\]]+)\]\((https?:\/\/[^)]+)\)$/);
          if (lm) return <a key={j} href={lm[2]} target="_blank" rel="noopener noreferrer"
            className="underline opacity-80 hover:opacity-100">{lm[1]}</a>;
          return p;
        });

        return (
          <span key={i}>
            {parts}
            {i < lines.length - 1 && line.trim() !== "" && <br />}
          </span>
        );
      })}
    </span>
  );
}

/* ── Structured flow prompts ────────────────────── */
const FLOW_PROMPT: Record<FlowStep, string> = {
  idle:           "",
  book_name:      "I'd love to book a **free 30-minute consultation** for you.\n\nWhat's your **full name**?",
  book_email:     "Thanks! What's the best **email address** to reach you at?",
  book_service:   "Which service are you most interested in?\n\n1. Process Automation\n2. Web Scraping\n3. Data Cleaning\n4. AI Bots\n5. Data Analysis\n6. AI Consultation\n7. Not sure yet\n\nType the number or name.",
  book_time:      "What **day and time** works best? (e.g. 'Tuesday afternoon', 'Monday 10am')\n\nWe'll create a **Google Meet** link and send you a calendar invite.",
  human_name:     "I'll connect you with one of our human consultants right away.\n\nWhat's your **full name**?",
  human_contact:  "What's the best **phone number or email** to reach you?",
  human_issue:    "Briefly, what do you need help with?",
};

const FLOW_PLACEHOLDER: Record<FlowStep, string> = {
  idle:           "Ask me anything…",
  book_name:      "Your full name…",
  book_email:     "Your email address…",
  book_service:   "Type 1–7 or service name…",
  book_time:      "Preferred day/time or 'flexible'…",
  human_name:     "Your full name…",
  human_contact:  "Phone number or email…",
  human_issue:    "Briefly describe your issue…",
};

export default function AIChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput]       = useState("");
  const [flow, setFlow]         = useState<FlowStep>("idle");
  const [booking, setBooking]   = useState<Record<string, string>>({});
  const [human, setHuman]       = useState<Record<string, string>>({});
  const [qr, setQR]             = useState<string[]>(QUICK_REPLIES_DEFAULT);
  const [agentMode, setAgentMode] = useState(false);
  const [busy, setBusy]         = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);
  const abortRef                = useRef<AbortController | null>(null);
  const syncedMessageIdsRef     = useRef<Set<string>>(new Set(["welcome"]));

  useEffect(() => {
    if (typeof window === "undefined") return;

    let storedSessionId = getLocalStorageValue(CHAT_SESSION_KEY);
    if (!storedSessionId) {
      storedSessionId = createId("session");
    }
    setLocalStorageValue(CHAT_SESSION_KEY, storedSessionId);

    setSessionId(storedSessionId);
    setAgentMode(getLocalStorageValue(CHAT_AGENT_MODE_KEY) === "1");

    const storedMessages = getLocalStorageValue(CHAT_MESSAGES_KEY);
    if (!storedMessages) return;

    try {
      const parsed = JSON.parse(storedMessages) as Message[];
      const restored = parsed
        .filter(message => message && message.text && message.role)
        .map(message => ({
          ...message,
          id: message.id ?? createId(message.role),
          createdAt: message.createdAt ?? new Date().toISOString(),
        }));

      if (restored.length > 0) {
        restored.forEach(message => syncedMessageIdsRef.current.add(message.id));
        setMessages(restored);
        setLocalStorageValue(CHAT_MESSAGES_KEY, JSON.stringify(restored));
      }
    } catch { /* ignore corrupt local chat cache */ }
  }, []);

  useEffect(() => {
    if (!sessionId || typeof window === "undefined") return;
    const stableMessages = messages.filter(message => !message.streaming);
    setLocalStorageValue(CHAT_MESSAGES_KEY, JSON.stringify(stableMessages));
  }, [messages, sessionId]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    setLocalStorageValue(CHAT_AGENT_MODE_KEY, agentMode ? "1" : "0");
  }, [agentMode]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const syncChatMessage = useCallback(async (
    message: Message,
    options?: { visitorName?: string; visitorContact?: string; status?: ChatSessionStatus },
  ) => {
    if (!sessionId || message.streaming || syncedMessageIdsRef.current.has(message.id)) return;

    syncedMessageIdsRef.current.add(message.id);
    try {
      await fetch("/api/chat-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId,
          visitorName: options?.visitorName,
          visitorContact: options?.visitorContact,
          status: options?.status,
          message: {
            id: message.id,
            clientMessageId: message.id,
            role: message.role,
            text: message.text,
            createdAt: message.createdAt,
          },
        }),
      });
    } catch {
      syncedMessageIdsRef.current.delete(message.id);
    }
  }, [sessionId]);

  const updateRemoteSession = useCallback(async (patch: {
    visitorName?: string;
    visitorContact?: string;
    status?: ChatSessionStatus;
    readBy?: "agent" | "visitor";
  }) => {
    if (!sessionId) return;

    try {
      await fetch("/api/chat-sessions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId, ...patch }),
      });
    } catch { /* local monitor sync is best-effort */ }
  }, [sessionId]);

  useEffect(() => {
    if (!sessionId) return;
    let active = true;

    async function pollAgentMessages() {
      try {
        const res = await fetch(`/api/chat-sessions?sessionId=${encodeURIComponent(sessionId)}`, { cache: "no-store" });
        if (!res.ok) return;

        const { session } = await res.json();
        if (!active || !session) return;

        if (session.status === "closed") setAgentMode(false);

        let hadIncoming = false;
        setMessages(prev => {
          const existingIds = new Set(prev.map(message => message.id));
          const incoming = session.messages
            .filter((message: Message) => (message.role === "agent" || message.role === "system") && !existingIds.has(message.id))
            .map((message: Message) => ({
              id: message.id,
              role: message.role,
              text: message.text,
              createdAt: message.createdAt,
            }));

          if (incoming.length === 0) return prev;
          hadIncoming = true;
          incoming.forEach((message: Message) => syncedMessageIdsRef.current.add(message.id));
          return [...prev, ...incoming];
        });

        if (hadIncoming) updateRemoteSession({ readBy: "visitor" });
      } catch { /* polling should never break the chat UI */ }
    }

    pollAgentMessages();
    const timer = window.setInterval(pollAgentMessages, 3000);
    return () => {
      active = false;
      window.clearInterval(timer);
    };
  }, [sessionId, updateRemoteSession]);

  /* ── Add bot message (optionally streaming) ── */
  const addBot = useCallback((text: string, newQR?: string[]) => {
    const message = createMessage("assistant", text);
    setMessages(p => [...p, message]);
    syncChatMessage(message);
    if (newQR !== undefined) setQR(newQR);
  }, [syncChatMessage]);

  /* ── Submit consultation booking → /api/book (Google Calendar + Meet) ── */
  const submitBooking = useCallback(async (
    data: Record<string, string>,
    onResult: (meetLink: string | null) => void,
  ) => {
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: data.name, email: data.email, service: data.service, time: data.time }),
      });
      const json = await res.json();
      onResult(json.meetLink ?? null);
    } catch { onResult(null); }
  }, []);

  /* ── Submit human-agent request → /api/contact ── */
  const submitHumanRequest = useCallback(async (data: Record<string, string>) => {
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          contact: data.contact,
          email: isValidEmail(data.contact) ? data.contact : "",
          service: "Human Agent Request",
          message: `HUMAN AGENT REQUEST\nContact: ${data.contact}\nIssue: ${data.issue}`,
        }),
      });
    } catch { /* silent */ }
  }, []);

  /* ── Cancel any active flow ── */
  const cancelFlow = useCallback(() => {
    setFlow("idle");
    setBooking({});
    setHuman({});
    addBot("No problem! Booking cancelled. 😊 Is there anything else I can help you with?", QUICK_REPLIES_DEFAULT);
  }, [addBot]);

  /* ── Handle structured flow steps ── */
  function handleFlow(msg: string): boolean {
    const t = msg.trim();

    // Allow cancellation at any step
    if (/^(cancel|stop|exit|quit|no|back|nevermind|never mind|forget it)$/i.test(t)) {
      cancelFlow(); return true;
    }

    if (flow === "book_name") {
      const updated = { ...booking, name: t };
      setBooking(updated); setFlow("book_email");
      addBot(FLOW_PROMPT.book_email, []); return true;
    }
    if (flow === "book_email") {
      if (!isValidEmail(t)) { addBot("That doesn't look like a valid email — could you double-check it? 🙏", []); return true; }
      const updated = { ...booking, email: t };
      setBooking(updated); setFlow("book_service");
      addBot(FLOW_PROMPT.book_service, ["1", "2", "3", "4", "5", "6", "7"]); return true;
    }
    if (flow === "book_service") {
      const svc = SERVICES_MAP[t.toLowerCase()] ?? SERVICES_MAP[t] ?? t;
      const updated = { ...booking, service: svc };
      setBooking(updated); setFlow("book_time");
      addBot(FLOW_PROMPT.book_time, ["Flexible", "This week", "Monday morning", "Friday afternoon"]); return true;
    }
    if (flow === "book_time") {
      const time = t;
      const final = { ...booking, time } as Record<string, string>;
      const { name = "", email = "", service = "" } = final;
      setFlow("idle"); setBooking({});
      addBot("⏳ Creating your Google Calendar event and Meet link…", []);
      submitBooking(final, (meetLink) => {
        const meetLine = meetLink
          ? `\n\n📹 Your Google Meet link:\n[Join Google Meet](${meetLink})`
          : "";
        addBot(
          `**Booking confirmed!**\n\n**Name:** ${name}\n**Email:** ${email}\n**Service:** ${service}\n**Preferred time:** ${time}${meetLine}\n\nA calendar invite has been sent to **${email}**. Our consultant will confirm and reschedule to your exact preferred time if needed.\n\nIs there anything else I can help with?`,
          QUICK_REPLIES_DEFAULT
        );
      });
      return true;
    }
    if (flow === "human_name") {
      const updated = { ...human, name: t };
      setHuman(updated); setFlow("human_contact");
      addBot(FLOW_PROMPT.human_contact, []); return true;
    }
    if (flow === "human_contact") {
      const updated = { ...human, contact: t };
      setHuman(updated); setFlow("human_issue");
      addBot(FLOW_PROMPT.human_issue, ["General enquiry", "Pricing question", "Technical issue", "Partnership"]); return true;
    }
    if (flow === "human_issue") {
      const final = { ...human, issue: t } as Record<string, string>;
      const { name = "", contact = "" } = final;
      setFlow("idle"); setHuman({});
      setAgentMode(true);
      submitHumanRequest(final);
      updateRemoteSession({ visitorName: name, visitorContact: contact, status: "needs_agent" });
      const handoffUrl = buildHumanHandoffUrl(final);
      addBot(
        `**Got it.** I can connect you directly with a human agent on WhatsApp now.

**Name:** ${name}
**Contact:** ${contact}
**Issue:** ${t}

[Open WhatsApp chat](${handoffUrl})

This opens a chat with **+234 815 151 9625** and includes your details in the first message.

I've also sent an email notification to our team with this request.`,
        []
      ); return true;
    }
    return false;
  }

  /* ── Detect if message should trigger a local flow ── */
  function detectLocalIntent(t: string): FlowStep | null {
    const l = t.toLowerCase();
    if (/\b(book|schedule|appointment|consultation|calendly|book\s*a\s*call)\b/.test(l)) return "book_name";
    if (/\b(human|real\s*person|agent|speak\s*(to|with)|talk\s*(to|with)|representative|rep|staff|support)\b/.test(l)) return "human_name";
    return null;
  }

  /* ── Stream from OpenRouter ── */
  const streamAI = useCallback(async (history: Message[], userMsg: string) => {
    setBusy(true);
    abortRef.current = new AbortController();

    // Insert streaming placeholder
    const streamingMessage = createMessage("assistant", "");
    setMessages(p => [...p, { ...streamingMessage, streaming: true }]);

    try {
      const apiMessages = [
        ...history
          .filter(m => !m.streaming)
          .map(m => ({ role: m.role === "user" ? "user" : "assistant", content: m.text })),
        { role: "user", content: userMsg },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
        signal: abortRef.current.signal,
      });

      if (!res.ok || !res.body) throw new Error("API error");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        const lines = chunk.split("\n").filter(l => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") break;
          try {
            const json = JSON.parse(data);
            const delta = json.choices?.[0]?.delta?.content ?? "";
            if (delta) {
              accumulated += delta;
              setMessages(p => {
                const copy = [...p];
                copy[copy.length - 1] = { ...streamingMessage, text: accumulated, streaming: true };
                return copy;
              });
            }
          } catch { /* partial JSON chunk — skip */ }
        }
      }

      // Finalise (remove streaming flag)
      setMessages(p => {
        const copy = [...p];
        copy[copy.length - 1] = { ...streamingMessage, text: accumulated };
        return copy;
      });
      syncChatMessage({ ...streamingMessage, text: accumulated });

      // Pick context-aware quick replies
      const l = accumulated.toLowerCase();
      if (l.includes("starter") || l.includes("growth") || l.includes("enterprise") || l.includes("₦")) {
        setQR(["Book consultation", "Tell me more", "Talk to a human"]);
      } else if (l.includes("automat") || l.includes("scrap") || l.includes("bot") || l.includes("analys")) {
        setQR(["Pricing for this", "Book consultation", "Other services"]);
      } else if (l.includes("book") || l.includes("consult") || l.includes("meet")) {
        setQR(["Book consultation", "Talk to a human", "Our services"]);
      } else {
        setQR(QUICK_REPLIES_DEFAULT);
      }
    } catch (e: unknown) {
      if (e instanceof Error && e.name === "AbortError") return;
      setMessages(p => {
        const copy = [...p];
        const fallback = "Sorry, I hit a snag. Please try again or reach us at **syberspace247@gmail.com**, or use WhatsApp human-agent handoff at **+234 815 151 9625**.";
        copy[copy.length - 1] = { ...streamingMessage, text: fallback };
        syncChatMessage({ ...streamingMessage, text: fallback });
        return copy;
      });
      setQR(["Try again", "Talk to a human", "Book consultation"]);
    } finally {
      setBusy(false);
    }
  }, [syncChatMessage]);

  /* ── Main send handler ── */
  const send = useCallback((text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg || busy) return;
    setInput("");
    const userMessage = createMessage("user", msg);
    const newMessages: Message[] = [...messages, userMessage];
    setMessages(newMessages);
    syncChatMessage(userMessage, agentMode ? { status: "needs_agent" } : undefined);
    setQR([]);

    // Active flow takes priority
    if (flow !== "idle") { setTimeout(() => handleFlow(msg), 400); return; }

    if (agentMode) {
      updateRemoteSession({ status: "needs_agent" });
      return;
    }

    // Check for local intent triggers
    const localFlow = detectLocalIntent(msg);
    if (localFlow) {
      setFlow(localFlow);
      setTimeout(() => addBot(FLOW_PROMPT[localFlow], []), 400);
      return;
    }

    // Everything else → AI
    setTimeout(() => streamAI(newMessages, msg), 0);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input, busy, flow, messages, booking, human, agentMode, streamAI, addBot, syncChatMessage, updateRemoteSession]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden theme-card"
          style={{ boxShadow: "var(--card-shadow-lg)", maxHeight: "min(620px, calc(100vh - 100px))" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 flex-shrink-0"
            style={{ background: "linear-gradient(to right, rgba(0,212,255,0.08), rgba(124,58,237,0.08))", borderBottom: "1px solid var(--border)" }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "#06b6d4" }}>S</motion.div>
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Syber — AI Consultant</div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#10b981" }}>
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" />
                {agentMode ? "Connected to human agent" : busy ? "Typing…" : "Online · replies instantly"}
              </div>
            </div>
            <motion.button onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
              className="ml-auto" style={{ color: "var(--text-muted)" }}>
              <CustomIcon name="x" className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3" style={{ minHeight: 0 }}>
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[85%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={msg.role === "user"
                      ? { background: "#06b6d4", color: "#0a0f1e", borderBottomRightRadius: 4 }
                      : msg.role === "agent"
                        ? { background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.24)", color: "var(--text-primary)", borderBottomLeftRadius: 4 }
                        : { background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", borderBottomLeftRadius: 4 }}>
                    {msg.role === "agent" && (
                      <span className="block text-[10px] font-semibold mb-1 uppercase tracking-wide" style={{ color: "var(--accent-cyan)" }}>
                        Human agent
                      </span>
                    )}
                    {msg.role !== "user" ? <BotMessage text={msg.text} /> : msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <AnimatePresence>
            {(qr.length > 0 || flow !== "idle") && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="px-4 pt-2 pb-1 flex gap-1.5 flex-wrap flex-shrink-0"
                style={{ borderTop: "1px solid var(--border)" }}>
                {qr.map(q => (
                  <motion.button key={q} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => send(q)} disabled={busy}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full mb-1 disabled:opacity-40"
                    style={{ border: "1px solid var(--border-strong)", color: "var(--accent-cyan)", background: "var(--badge-bg)" }}>
                    {q}
                  </motion.button>
                ))}
                {flow !== "idle" && (
                  <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={cancelFlow} disabled={busy}
                    className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full mb-1 disabled:opacity-40"
                    style={{ border: "1px solid #ef4444", color: "#ef4444", background: "rgba(239,68,68,0.08)" }}>
                    <CustomIcon name="x" className="h-3 w-3" />
                    Cancel
                  </motion.button>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Input */}
          <div className="p-3 flex gap-2 flex-shrink-0" style={{ borderTop: qr.length === 0 ? "1px solid var(--border)" : "none" }}>
            <input type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && !e.shiftKey && send()}
              placeholder={agentMode ? "Message the human agent..." : FLOW_PLACEHOLDER[flow]}
              disabled={busy && flow === "idle"}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm theme-input disabled:opacity-60" />
            <motion.button onClick={() => send()} disabled={busy && flow === "idle"}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0 disabled:opacity-50"
              style={{ background: "#06b6d4" }}>
              <CustomIcon name="send" className="h-4 w-4 text-[#0a0f1e]" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
