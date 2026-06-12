"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const channels = [
  { icon: "🤖", title: "Chat with AI Consultant", description: "Get instant answers and book your consultation through our AI assistant — available 24/7.", action: "Start AI Chat", onClick: "chat", accentRgb: "0,212,255" },
  { icon: "📅", title: "Book via Google Calendar",  description: "Pick a time that works for you. 30-min discovery call on Google Meet with an AI specialist.", action: "Open Google Calendar", href: "https://calendar.app.google/syberspace", accentRgb: "124,58,237" },
  { icon: "📧", title: "Send Us an Email",          description: "Describe your needs and we'll respond within 24 hours with a tailored proposal.",            action: "Send Email",    href: "mailto:syberspace247@gmail.com",         accentRgb: "16,185,129" },
  { icon: "📞", title: "Call Us",                  description: "Prefer a direct conversation? Our team is available Mon–Fri, 9am–6pm WAT.",                  action: "Call Now",      href: "tel:+2348151519625",                       accentRgb: "249,115,22" },
  { icon: "💬", title: "WhatsApp",                  description: "Message us on WhatsApp for quick questions or to kick off a conversation.",                  action: "WhatsApp Us",   href: "https://wa.me/2348151519625?text=Hi%20Syberspace%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20AI%20services.", accentRgb: "34,197,94"  },
  { icon: "📱", title: "Social Media",              description: "Follow us on Facebook and Instagram and stay up to date with our latest updates.",            action: "Find Us Online", onClick: "social",                                accentRgb: "236,72,153" },
];

const socialLinks = [
  {
    label: "Facebook",
    href: "https://web.facebook.com/syberspacenetwork",
    svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.41c0-3.025 1.792-4.697 4.533-4.697 1.312 0 2.686.236 2.686.236v2.97h-1.513c-1.491 0-1.956.93-1.956 1.886v2.268h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z"/></svg>,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/syberspace_solutions",
    svg: <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>,
  },
];

export default function Booking({ onOpenChat }: { onOpenChat: () => void }) {
  const [showSocial, setShowSocial] = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [sending, setSending]       = useState(false);
  const [sendError, setSendError]   = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSending(true);
    setSendError("");
    const form = e.currentTarget;
    const data = {
      name:    (form.elements.namedItem("name")    as HTMLInputElement).value,
      email:   (form.elements.namedItem("email")   as HTMLInputElement).value,
      service: (form.elements.namedItem("service") as HTMLSelectElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };
    try {
      const res = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) });
      if (!res.ok) throw new Error("Failed to send");
      setSubmitted(true);
    } catch {
      setSendError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };

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
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl flex flex-col theme-card"
              style={{
                background: `linear-gradient(135deg, rgba(${ch.accentRgb},0.07) 0%, var(--bg-surface) 100%)`,
                borderColor: `rgba(${ch.accentRgb},0.18)`,
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
                      <span className="w-8 flex items-center justify-center" style={{ color: "var(--text-muted)" }}>{s.svg}</span>
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
          <div className="p-8 rounded-2xl theme-card">
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
                <motion.form key="form" exit={{ opacity: 0 }} className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Full Name</label>
                      <input name="name" type="text" placeholder="John Doe" required className="w-full px-4 py-3 rounded-xl text-sm theme-input" />
                    </div>
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Email Address</label>
                      <input name="email" type="email" placeholder="you@company.com" required className="w-full px-4 py-3 rounded-xl text-sm theme-input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Service of Interest</label>
                    <select name="service" className="w-full px-4 py-3 rounded-xl text-sm appearance-none theme-input">
                      <option value="">Select a service...</option>
                      {["Process Automation","Web Scraping","Data Cleaning","AI Bots","Data Analysis","AI Consultation","Multiple Services"].map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-medium mb-1.5" style={{ color: "var(--text-muted)" }}>Message</label>
                    <textarea name="message" rows={4} placeholder="Tell us about your business and what you're hoping to automate or improve..."
                      className="w-full px-4 py-3 rounded-xl text-sm resize-none theme-input" />
                  </div>
                  {sendError && <p className="text-sm text-red-500">{sendError}</p>}
                  <motion.button type="submit" disabled={sending} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="w-full py-3 rounded-xl text-white font-semibold text-sm disabled:opacity-60"
                    style={{ background: "linear-gradient(to right, #06b6d4, #7c3aed)" }}>
                    {sending ? "Sending…" : "Send Message"}
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
