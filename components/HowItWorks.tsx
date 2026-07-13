"use client";
import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Book a Consultation",     description: "Chat with our AI consultant, send an email, or book a Google Meet call directly. We'll understand your business and current setup.", icon: "📅" },
  { number: "02", title: "AI Audit & Proposal",     description: "We analyze your workflows, data, and systems. Within 48 hours you receive a tailored AI integration plan with clear ROI estimates.", icon: "🔍" },
  { number: "03", title: "Integration & Deployment",description: "Our team plugs AI into your existing stack. No rebuilding. We handle the tech — you stay focused on your business.", icon: "🔧" },
  { number: "04", title: "Monitor & Scale",          description: "Track performance through your dashboard. We monitor, optimize, and scale your AI services as your needs grow.", icon: "📈" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden"
      style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>

      {/* Center line */}
      <motion.div initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }} viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 bottom-0 w-px origin-top hidden lg:block"
        style={{ background: "linear-gradient(to bottom, transparent, var(--accent-cyan), transparent)", opacity: 0.3 }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 theme-badge-cyan">
            The Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            From Zero to <span className="gradient-text">AI-Powered</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            Simple, fast, and built around your existing systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div key={step.number} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.14, duration: 0.55 }} className="relative">

              {i < steps.length - 1 && (
                <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.14 + 0.3, duration: 0.5 }}
                  className="hidden lg:block absolute top-10 left-full w-full h-px z-10 origin-left"
                  style={{ background: "linear-gradient(to right, var(--accent-cyan), transparent)", opacity: 0.35 }} />
              )}

              <motion.div whileHover={{ y: -6 }} transition={{ duration: 0.22 }}
                className="p-6 rounded-2xl h-full theme-card">
                <motion.div initial={{ scale: 0, rotate: -20 }} whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.14 + 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4"
                  style={{ background: "linear-gradient(135deg, rgba(0,212,255,0.1), rgba(124,58,237,0.1))", border: "1px solid var(--border-strong)" }}>
                  {step.icon}
                </motion.div>
                <div className="text-xs font-bold tracking-widest mb-2" style={{ color: "var(--accent-cyan)" }}>{step.number}</div>
                <h3 className="text-lg font-bold mb-2" style={{ color: "var(--text-primary)" }}>{step.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
