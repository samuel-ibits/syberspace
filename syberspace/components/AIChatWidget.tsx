"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "bot"; text: string };

const botResponses: Record<string, string> = {
  default:      "Thanks for reaching out! I'm Syber, your AI consultant. What's your biggest business challenge right now?",
  automation:   "Process automation is one of our most impactful services! We've helped clients save 100+ hours per month. Would you like a free audit?",
  scraping:     "Our web scraping service extracts and structures data from any website at scale. We handle anti-bot measures and deliver clean, scheduled outputs.",
  cleaning:     "Data cleaning is often the hidden bottleneck. Our AI pipelines deduplicate, standardize, and enrich your data automatically.",
  bots:         "Our AI bots handle 60–80% of customer enquiries, 24/7. Deployed across WhatsApp, website chat, and more.",
  analysis:     "We turn raw data into executive-ready dashboards with predictive analytics. What decisions do you need data for?",
  consultation: "Our AI consultation starts with a free audit and a 90-day roadmap. Shall I book a slot for you?",
  pricing:      "Plans start at ₦150,000/month (Starter), ₦400,000/month (Growth), and custom (Enterprise). All include a 30-day free trial.",
  book:         "I can take your details and have our team reach out within the hour, or you can book directly on Calendly. Which do you prefer?",
  hello:        "Hi there! I'm Syber, Syberspace's AI consultant. How can I help your business today?",
  hi:           "Hi there! I'm Syber, Syberspace's AI consultant. How can I help your business today?",
};

function getResponse(input: string): string {
  const l = input.toLowerCase();
  if (l.includes("automat"))                           return botResponses.automation;
  if (l.includes("scrap"))                             return botResponses.scraping;
  if (l.includes("clean"))                             return botResponses.cleaning;
  if (l.includes("bot") || l.includes("chatbot"))     return botResponses.bots;
  if (l.includes("analys") || l.includes("dashboard")) return botResponses.analysis;
  if (l.includes("consult") || l.includes("audit"))   return botResponses.consultation;
  if (l.includes("pric") || l.includes("cost"))       return botResponses.pricing;
  if (l.includes("book") || l.includes("schedule"))   return botResponses.book;
  if (l.includes("hello") || l.includes("hey"))       return botResponses.hello;
  if (l.includes("hi"))                               return botResponses.hi;
  return "Great question! Could you tell me a bit more about your business? Or would you prefer to speak with one of our human specialists?";
}

export default function AIChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: botResponses.default }]);
  const [input, setInput]       = useState("");
  const [typing, setTyping]     = useState(false);
  const bottomRef               = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = (text?: string) => {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setInput("");
    setMessages(p => [...p, { role: "user", text: msg }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(p => [...p, { role: "bot", text: getResponse(msg) }]);
    }, 900 + Math.random() * 500);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl overflow-hidden shadow-2xl"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)", boxShadow: "0 25px 80px rgba(0,0,0,0.4)" }}
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4" style={{ background: "linear-gradient(to right, rgba(0,212,255,0.08), rgba(124,58,237,0.08))", borderBottom: "1px solid var(--border)" }}>
            <motion.div animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}>S</motion.div>
            <div>
              <div className="font-semibold text-sm" style={{ color: "var(--text-primary)" }}>Syber — AI Consultant</div>
              <div className="flex items-center gap-1.5 text-xs" style={{ color: "#10b981" }}>
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" />Online
              </div>
            </div>
            <motion.button onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="ml-auto transition-colors" style={{ color: "var(--text-muted)" }}>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} transition={{ duration: 0.25 }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div className="max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed"
                    style={msg.role === "user"
                      ? { background: "linear-gradient(135deg, #06b6d4, #7c3aed)", color: "white", borderBottomRightRadius: 4 }
                      : { background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)", borderBottomLeftRadius: 4 }}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", borderBottomLeftRadius: 4 }}>
                  <div className="flex gap-1">
                    {[0,1,2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--text-faint)" }}
                        animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Quick replies */}
          <div className="px-4 pb-2 flex gap-2 flex-wrap">
            {["Pricing", "Book a call", "Process automation", "AI bot"].map(q => (
              <motion.button key={q} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => send(q)}
                className="text-xs px-3 py-1 rounded-full transition-colors"
                style={{ border: "1px solid rgba(0,212,255,0.3)", color: "var(--accent-cyan)" }}>
                {q}
              </motion.button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 flex gap-2" style={{ borderTop: "1px solid var(--border)" }}>
            <input type="text" value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2.5 rounded-xl text-sm focus:outline-none transition-colors"
              style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
            <motion.button onClick={() => send()} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </motion.button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
