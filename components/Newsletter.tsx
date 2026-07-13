"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";

export default function Newsletter() {
  const [email, setEmail]     = useState("");
  const [status, setStatus]   = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (res.ok) { setStatus("success"); setEmail(""); }
      else setStatus("error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 relative overflow-hidden" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(124,58,237,0.08) 0%, transparent 70%)" }} />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <span className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: "rgba(124,58,237,0.12)", border: "1px solid rgba(124,58,237,0.24)", color: "var(--accent-violet)" }}>
            <CustomIcon name="mail" className="h-8 w-8" />
          </span>
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "var(--accent-violet)" }}>
            Newsletter
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>
            Stay ahead of the <span className="gradient-text">AI curve</span>
          </h2>
          <p className="mb-8 text-base" style={{ color: "var(--text-muted)" }}>
            Get practical AI tips, Nigerian business case studies, and early access to new Syberspace tools — straight to your inbox. No spam, ever.
          </p>

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-4 px-6 rounded-2xl text-sm font-semibold"
                style={{ background: "rgba(5,150,105,0.12)", border: "1px solid rgba(5,150,105,0.3)", color: "#059669" }}
              >
                <span className="inline-flex items-center gap-2">
                  <CustomIcon name="check" className="h-4 w-4" />
                  You&apos;re in! Welcome to the Syberspace community.
                </span>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col sm:flex-row gap-3"
              >
                <input
                  type="email"
                  required
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="flex-1 px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--bg-elevated)",
                    border: "1px solid var(--border)",
                    color: "var(--text-primary)",
                  }}
                  onFocus={e => (e.currentTarget.style.borderColor = "rgba(6,182,212,0.5)")}
                  onBlur={e  => (e.currentTarget.style.borderColor = "var(--border)")}
                />
                <motion.button
                  type="submit"
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-6 py-3 rounded-xl text-sm font-semibold text-white flex-shrink-0 disabled:opacity-60"
                  style={{ background: "#06b6d4", color: "#0a0f1e" }}
                >
                  {status === "loading" ? "Subscribing…" : "Subscribe Free"}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>

          {status === "error" && (
            <p className="mt-3 text-xs" style={{ color: "#ef4444" }}>
              Something went wrong. Please try again or email us directly.
            </p>
          )}

          <p className="mt-4 text-xs" style={{ color: "var(--text-faint)" }}>
            Join 200+ Nigerian business owners already subscribed. Unsubscribe anytime.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
