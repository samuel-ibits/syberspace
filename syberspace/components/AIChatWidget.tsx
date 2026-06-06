"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Message = { role: "user" | "bot"; text: string };

const botResponses: Record<string, string> = {
  default: "Thanks for reaching out! I'm Syber, your AI consultant. I can help you explore our services or book a consultation. What's your biggest business challenge right now?",
  automation: "Process automation is one of our most impactful services! We've helped clients save 100+ hours per month by automating approvals, reports, and data entry. Would you like to schedule a free audit?",
  scraping: "Our web scraping service extracts and structures data from any website at scale — competitor pricing, leads, market data. We handle anti-bot measures and deliver clean, scheduled outputs. Interested?",
  cleaning: "Data cleaning is often the hidden bottleneck. Our AI pipelines deduplicate, standardize, and enrich your data automatically. Tell me more about your data challenges?",
  bots: "Our AI bots are trained on your business knowledge and can handle 60–80% of customer enquiries, 24/7. We deploy across WhatsApp, website chat, and more. Want to see a demo?",
  analysis: "We turn raw data into executive-ready dashboards with predictive analytics and anomaly detection. What decisions are you hoping data can help you make?",
  consultation: "Our AI consultation starts with a free audit. We identify your top 3 automation opportunities and build a 90-day roadmap. Shall I book a slot for you?",
  pricing: "Our plans start at ₦150,000/month for a single AI service, ₦400,000/month for 3 services (Growth), and custom Enterprise pricing. All plans include a 30-day free trial. Which tier fits?",
  book: "I'd love to set up a consultation! You can book directly on our Calendly link, or I can take your details and have our team reach out within the hour. Which do you prefer?",
  hello: "Hi there! I'm Syber, Syberspace's AI consultant. How can I help your business today?",
  hi: "Hi there! I'm Syber, Syberspace's AI consultant. How can I help your business today?",
};

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("automat")) return botResponses.automation;
  if (lower.includes("scrap")) return botResponses.scraping;
  if (lower.includes("clean")) return botResponses.cleaning;
  if (lower.includes("bot") || lower.includes("chatbot")) return botResponses.bots;
  if (lower.includes("analys") || lower.includes("dashboard")) return botResponses.analysis;
  if (lower.includes("consult") || lower.includes("audit")) return botResponses.consultation;
  if (lower.includes("pric") || lower.includes("cost") || lower.includes("plan")) return botResponses.pricing;
  if (lower.includes("book") || lower.includes("schedule") || lower.includes("meeting")) return botResponses.book;
  if (lower.includes("hello") || lower.includes("hey")) return botResponses.hello;
  if (lower.includes("hi")) return botResponses.hi;
  return "Great question! To give you the most accurate answer, could you tell me a bit more about your business? Or would you prefer to speak with one of our human specialists?";
}

export default function AIChatWidget({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([{ role: "bot", text: botResponses.default }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, typing]);

  const send = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    setMessages(prev => [...prev, { role: "user", text }]);
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(prev => [...prev, { role: "bot", text: getResponse(text) }]);
    }, 900 + Math.random() * 600);
  };

  const quickReplies = ["Pricing", "Book a call", "Process automation", "AI bot"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] flex flex-col rounded-2xl bg-[#0d1526] border border-white/10 shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center gap-3 px-5 py-4 bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border-b border-white/5">
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2 }}
              className="w-9 h-9 rounded-full bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            >
              S
            </motion.div>
            <div>
              <div className="text-white font-semibold text-sm">Syber — AI Consultant</div>
              <div className="flex items-center gap-1.5 text-xs text-emerald-400">
                <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity }} className="w-1.5 h-1.5 rounded-full bg-emerald-400 block" />
                Online
              </div>
            </div>
            <motion.button onClick={onClose} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="ml-auto text-slate-400 hover:text-white transition-colors">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </motion.button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-80">
            <AnimatePresence initial={false}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                    msg.role === "user"
                      ? "bg-gradient-to-br from-cyan-500 to-violet-600 text-white rounded-br-sm"
                      : "bg-white/5 border border-white/5 text-slate-200 rounded-bl-sm"
                  }`}>
                    {msg.text}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl rounded-bl-sm bg-white/5 border border-white/5">
                  <div className="flex gap-1">
                    {[0, 1, 2].map(i => (
                      <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-slate-400"
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
            {quickReplies.map(q => (
              <motion.button
                key={q}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  setInput(q);
                  setTimeout(() => {
                    const text = q;
                    setInput("");
                    setMessages(prev => [...prev, { role: "user", text }]);
                    setTyping(true);
                    setTimeout(() => {
                      setTyping(false);
                      setMessages(prev => [...prev, { role: "bot", text: getResponse(text) }]);
                    }, 900);
                  }, 50);
                }}
                className="text-xs px-3 py-1 rounded-full border border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 transition-colors"
              >
                {q}
              </motion.button>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 border-t border-white/5 flex gap-2">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask anything..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/40 transition-colors"
            />
            <motion.button onClick={send} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white flex-shrink-0">
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
