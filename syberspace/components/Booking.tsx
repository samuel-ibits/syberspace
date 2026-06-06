"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const channels = [
  { icon: "🤖", title: "Chat with AI Consultant", description: "Get instant answers and book your consultation through our AI assistant — available 24/7.", action: "Start AI Chat", onClick: "chat", accentRgb: "0,212,255" },
  { icon: "📅", title: "Book via Calendly",        description: "Choose a time that suits you. 30-min discovery call with an AI specialist.",                 action: "Open Calendly", href: "https://calendly.com/syberspace",    accentRgb: "124,58,237" },
  { icon: "📧", title: "Send Us an Email",          description: "Describe your needs and we'll respond within 24 hours with a tailored proposal.",            action: "Send Email",    href: "mailto:hello@syberspace.com.ng",   accentRgb: "16,185,129" },
  { icon: "📞", title: "Call Us",                  description: "Prefer a direct conversation? Our team is available Mon–Fri, 9am–6pm WAT.",                  action: "Call Now",      href: "tel:+2348000000000",               accentRgb: "249,115,22" },
  { icon: "💬", title: "WhatsApp",                  description: "Message us on WhatsApp for quick questions or to kick off a conversation.",                  action: "WhatsApp Us",   href: "https://wa.me/2348000000000",      accentRgb: "34,197,94"  },
  { icon: "📱", title: "Social Media",              description: "Follow us on LinkedIn, X (Twitter), and Instagram for updates and tips.",                   action: "Find Us Online", onClick: "social",                        accentRgb: "236,72,153" },
];

const socialLinks = [
  { label: "LinkedIn",    href: "https://linkedin.com/company/syberspace", icon: "in" },
  { label: "Twitter / X", href: "https://twitter.com/syberspace",          icon: "𝕏"  },
  { label: "Instagram",   href: "https://instagram.com/syberspace",        icon: "📸" },
];

export default function Booking({ onOpenChat }: { onOpenChat: () => void }) {
  const [showSocial, setShowSocial] = useState(false);
  const [submitted, setSubmitted]   = useState(false);

  return (
    <section id="booking" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)" }}>
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] rounded-full blur-3xl pointer-events-none" style={{ background: "var(--glow-cyan)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(0,212,255,0.08)", border: "1px solid rgba(0,212,255,0.2)", color: "var(--accent-cyan)" }}>
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            Choose how you'd like to connect. Every conversation starts with listening to you.
          </p>
        </motion.div>

        {/* Channels */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {channels.map((ch, i) => (
            <motion.div
              key={ch.title}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5, boxShadow: `0 20px 60px rgba(${ch.accentRgb},0.10)`, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl flex flex-col"
              style={{
                background: `linear-gradient(135deg, rgba(${ch.accentRgb},0.07) 0%, var(--bg-surface) 100%)`,
                border: `1px solid rgba(${ch.accentRgb},0.18)`,
              }}
            >
              <motion.div whileHover={{ scale: 1.2, rotate: 10 }} transition={{ type: "spring", stiffness: 300 }} className="text-3xl mb-3 inline-block">{ch.icon}</motion.div>
              <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{ch.title}</h3>
              <p className="text-sm leading-relaxed flex-1 mb-4" style={{ color: "var(--text-muted)" }}>{ch.description}</p>
              {ch.href ? (
                <a href={ch.href} target={ch.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: "var(--accent-cyan)" }}>
                  {ch.action}
                  <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </motion.svg>
                </a>
              ) : (
                <button onClick={() => ch.onClick === "chat" ? onOpenChat() : setShowSocial(true)} className="inline-flex items-center gap-1 text-sm font-semibold text-left" style={{ color: "var(--accent-cyan)" }}>
                  {ch.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                </button>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social modal */}
        <AnimatePresence>
          {showSocial && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: "rgba(0,0,0,0.5)", backdropFilter: "blur(8px)" }} onClick={() => setShowSocial(false)}>
              <motion.div initial={{ scale: 0.8, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.8, opacity: 0, y: 20 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-2xl p-8 max-w-sm w-full mx-4" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }} onClick={e => e.stopPropagation()}>
                <h3 className="text-xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Follow Syberspace</h3>
                <div className="space-y-3">
                  {socialLinks.map((s, i) => (
                    <motion.a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }} whileHover={{ x: 4 }}
                      className="flex items-center gap-3 p-4 rounded-xl transition-colors" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                      <span className="text-xl w-8 text-center">{s.icon}</span>
                      <span className="font-medium" style={{ color: "var(--text-primary)" }}>{s.label}</span>
                      <svg className="w-4 h-4 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--text-faint)" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </motion.a>
                  ))}
                </div>
                <button onClick={() => setShowSocial(false)} className="mt-6 w-full py-2 rounded-xl text-sm transition-colors" style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}>Close</button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact form */}
        <motion.div id="contact" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }} className="max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
            <h3 className="text-2xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Send a Message</h3>
            <p className="text-sm mb-6" style={{ color: "var(--text-muted)" }}>We'll get back to you within 24 hours.</p>

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 260, damping: 20 }}
                    className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl mx-auto mb-4"
                    style={{ background: "linear-gradient(135deg, #06b6d4, #7c3aed)" }}>✓</motion.div>
                  <h4 className="text-xl font-bold mb-2" style={{ color: "var(--text-primary)" }}>Message Sent!</h4>
                  <p style={{ color: "var(--text-muted)" }}>We'll be in touch within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.form key="form" exit={{ opacity: 0 }} className="space-y-4" onSubmit={e => { e.preventDefault(); setSubmitted(true); }}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[{ label: "Full Name", type: "text", placeholder: "John Doe" }, { label: "Email Address", type: "email", placeholder: "you@company.com" }].map(f => (
                      <div key={f.label}>
                        <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>{f.label}</label>
                        <input type={f.type} placeholder={f.placeholder} required className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors"
                          style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Service of Interest</label>
                    <select className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors appearance-none"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }}>
                      <option value="">Select a service...</option>
                      {["Process Automation","Web Scraping","Data Cleaning","AI Bots","Data Analysis","AI Consultation","Multiple Services"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Message</label>
                    <textarea rows={4} placeholder="Tell us about your business and what you're hoping to automate or improve..."
                      className="w-full px-4 py-3 rounded-xl text-sm focus:outline-none transition-colors resize-none"
                      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-primary)" }} />
                  </div>
                  <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm"
                    style={{ background: "linear-gradient(to right, #06b6d4, #7c3aed)" }}>
                    Send Message
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
