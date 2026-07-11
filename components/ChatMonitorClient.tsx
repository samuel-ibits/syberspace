"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import type { ChatMessage, ChatSession, ChatSessionStatus } from "@/lib/chat-types";

function formatTime(value: string) {
  return new Intl.DateTimeFormat(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(value));
}

function visitorLabel(session: ChatSession) {
  return session.visitorName || session.visitorContact || `Visitor ${session.id.slice(-6)}`;
}

function statusLabel(status: ChatSessionStatus) {
  if (status === "needs_agent") return "Needs Agent";
  if (status === "closed") return "Closed";
  return "Active";
}

export default function ChatMonitorPage() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);

  async function logout() {
    await fetch("/api/chat-monitor-auth", { method: "DELETE" });
    window.location.href = "/chat-monitor/login";
  }

  const selected = useMemo(
    () => sessions.find(session => session.id === selectedId) ?? sessions[0] ?? null,
    [selectedId, sessions],
  );

  const loadSessions = useCallback(async () => {
    try {
      const res = await fetch("/api/chat-sessions", { cache: "no-store" });
      if (!res.ok) return;
      const data = await res.json() as { sessions: ChatSession[] };
      setSessions(data.sessions);
      setSelectedId(current => current || data.sessions[0]?.id || "");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSessions();
    const timer = window.setInterval(loadSessions, 2500);
    return () => window.clearInterval(timer);
  }, [loadSessions]);

  useEffect(() => {
    if (!selectedId) return;
    fetch("/api/chat-sessions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: selectedId, readBy: "agent" }),
    }).catch(() => undefined);
  }, [selectedId]);

  async function sendReply() {
    const text = reply.trim();
    if (!text || !selected || sending) return;

    setSending(true);
    setReply("");
    try {
      await fetch("/api/chat-sessions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          sessionId: selected.id,
          status: "needs_agent",
          message: {
            role: "agent",
            text,
            author: "Syberspace",
          },
        }),
      });
      await loadSessions();
    } finally {
      setSending(false);
    }
  }

  async function setStatus(status: ChatSessionStatus) {
    if (!selected) return;
    await fetch("/api/chat-sessions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessionId: selected.id, status }),
    });
    await loadSessions();
  }

  return (
    <main className="min-h-screen" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col px-4 py-5 sm:px-6 lg:px-8">
        <header className="flex flex-col gap-3 border-b pb-4 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--border)" }}>
          <div>
            <h1 className="text-2xl font-bold">Chat Monitor</h1>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              {loading ? "Loading sessions..." : `${sessions.length} session${sessions.length === 1 ? "" : "s"}`}
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href="/"
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}
            >
              Back to Site
            </a>
            <button
              onClick={logout}
              className="inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold"
              style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", color: "#ef4444" }}
            >
              Log Out
            </button>
          </div>
        </header>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 py-4 lg:grid-cols-[320px_1fr]">
          <aside className="min-h-[220px] overflow-hidden rounded-2xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <div className="border-b px-4 py-3" style={{ borderColor: "var(--border)" }}>
              <h2 className="text-sm font-semibold">Sessions</h2>
            </div>
            <div className="max-h-[36vh] overflow-y-auto lg:max-h-[calc(100vh-160px)]">
              {sessions.length === 0 && (
                <p className="p-4 text-sm" style={{ color: "var(--text-muted)" }}>No chats yet.</p>
              )}
              {sessions.map(session => {
                const active = selected?.id === session.id;
                return (
                  <button
                    key={session.id}
                    onClick={() => setSelectedId(session.id)}
                    className="block w-full border-b px-4 py-3 text-left transition-colors"
                    style={{
                      borderColor: "var(--border)",
                      background: active ? "var(--bg-elevated)" : "transparent",
                      color: "var(--text-primary)",
                    }}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate text-sm font-semibold">{visitorLabel(session)}</span>
                      {session.unreadForAgent > 0 && (
                        <span className="rounded-full px-2 py-0.5 text-xs font-bold" style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}>
                          {session.unreadForAgent}
                        </span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center justify-between gap-3 text-xs" style={{ color: "var(--text-muted)" }}>
                      <span>{statusLabel(session.status)}</span>
                      <span>{formatTime(session.updatedAt)}</span>
                    </div>
                    {session.lastMessage && (
                      <p className="mt-1 truncate text-xs" style={{ color: "var(--text-faint)" }}>{session.lastMessage}</p>
                    )}
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex min-h-[65vh] flex-col overflow-hidden rounded-2xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            {selected ? (
              <>
                <div className="flex flex-col gap-3 border-b px-4 py-3 sm:flex-row sm:items-center sm:justify-between" style={{ borderColor: "var(--border)" }}>
                  <div>
                    <h2 className="text-base font-bold">{visitorLabel(selected)}</h2>
                    <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                      {selected.visitorContact || selected.id}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    {(["active", "needs_agent", "closed"] as ChatSessionStatus[]).map(status => (
                      <button
                        key={status}
                        onClick={() => setStatus(status)}
                        className="rounded-lg px-3 py-1.5 text-xs font-semibold"
                        style={{
                          background: selected.status === status ? "var(--accent-cyan)" : "var(--bg-elevated)",
                          border: "1px solid var(--border)",
                          color: selected.status === status ? "#0a0f1e" : "var(--text-muted)",
                        }}
                      >
                        {statusLabel(status)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-4">
                  <div className="space-y-3">
                    {selected.messages.map(message => (
                      <MessageBubble key={message.id} message={message} />
                    ))}
                  </div>
                </div>

                <div className="border-t p-3" style={{ borderColor: "var(--border)" }}>
                  <div className="flex gap-2">
                    <textarea
                      value={reply}
                      onChange={event => setReply(event.target.value)}
                      onKeyDown={event => {
                        if (event.key === "Enter" && !event.shiftKey) {
                          event.preventDefault();
                          sendReply();
                        }
                      }}
                      rows={2}
                      placeholder="Reply to this visitor..."
                      className="min-h-12 flex-1 resize-none rounded-xl px-4 py-3 text-sm theme-input"
                    />
                    <button
                      onClick={sendReply}
                      disabled={sending || !reply.trim()}
                      className="rounded-xl px-5 text-sm font-semibold disabled:opacity-50"
                      style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
                    >
                      Send
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex flex-1 items-center justify-center p-8 text-center text-sm" style={{ color: "var(--text-muted)" }}>
                Waiting for visitor chats.
              </div>
            )}
          </section>
        </div>
      </div>
    </main>
  );
}

function MessageBubble({ message }: { message: ChatMessage }) {
  const isVisitor = message.role === "user";
  const isAgent = message.role === "agent";
  const label = isVisitor ? "Visitor" : isAgent ? "You" : message.role === "system" ? "System" : "AI";

  return (
    <div className={`flex ${isVisitor ? "justify-start" : "justify-end"}`}>
      <div
        className="max-w-[78%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed"
        style={isVisitor
          ? { background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", borderBottomLeftRadius: 4 }
          : isAgent
            ? { background: "var(--accent-cyan)", color: "#0a0f1e", borderBottomRightRadius: 4 }
            : { background: "rgba(124,58,237,0.10)", border: "1px solid rgba(124,58,237,0.24)", color: "var(--text-primary)", borderBottomRightRadius: 4 }}
      >
        <div className="mb-1 flex items-center justify-between gap-3 text-[10px] font-semibold uppercase tracking-wide" style={{ opacity: 0.75 }}>
          <span>{label}</span>
          <span>{formatTime(message.createdAt)}</span>
        </div>
        <p className="whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
}
