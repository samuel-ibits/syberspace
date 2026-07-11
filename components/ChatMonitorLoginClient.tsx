"use client";

import { FormEvent, useState } from "react";

export default function ChatMonitorLoginClient() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/chat-monitor-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    setLoading(false);
    if (!res.ok) {
      setError("That password is not correct.");
      return;
    }

    window.location.href = "/chat-monitor";
  }

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--bg-base)", color: "var(--text-primary)" }}>
      <form
        onSubmit={login}
        className="w-full max-w-sm rounded-2xl p-6"
        style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "var(--card-shadow)" }}
      >
        <h1 className="text-2xl font-bold">Chat Monitor</h1>
        <p className="mt-2 text-sm" style={{ color: "var(--text-muted)" }}>
          Enter the monitor password to view and reply to chat sessions.
        </p>

        <label className="mt-6 block text-xs font-medium" style={{ color: "var(--text-muted)" }}>
          Password
        </label>
        <input
          type="password"
          value={password}
          onChange={event => setPassword(event.target.value)}
          autoFocus
          className="mt-2 w-full rounded-xl px-4 py-3 text-sm theme-input"
        />

        {error && <p className="mt-3 text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={loading || !password}
          className="mt-5 w-full rounded-xl py-3 text-sm font-semibold disabled:opacity-50"
          style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}
        >
          {loading ? "Checking..." : "Sign In"}
        </button>
      </form>
    </main>
  );
}
