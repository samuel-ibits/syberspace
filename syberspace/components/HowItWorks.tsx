"use client";
import { motion } from "framer-motion";

const steps = [
  { number: "01", title: "Book a Consultation", description: "Speak with our AI consultant, send an email, or book directly via Calendly. We'll understand your business and current setup.", icon: "📅" },
  { number: "02", title: "AI Audit & Proposal", description: "We analyze your workflows, data, and systems. Within 48 hours you receive a tailored AI integration plan with clear ROI estimates.", icon: "🔍" },
  { number: "03", title: "Integration & Deployment", description: "Our team plugs AI into your existing stack. No rebuilding. We handle the tech — you stay focused on your business.", icon: "🔧" },
  { number: "04", title: "Monitor & Scale", description: "Track performance through your dashboard. We monitor, optimize, and scale your AI services as your needs grow.", icon: "📈" },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 bg-white/2 border-y border-white/5 relative overflow-hidden">
      {/* Animated background line */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
        className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent origin-top"
      />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            The Process
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            From Zero to <span className="gradient-text">AI-Powered</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Simple, fast, and built around your existing systems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: i * 0.15, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              {/* Connector */}
              {i < steps.length - 1 && (
                <motion.div
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.3, duration: 0.5 }}
                  className="hidden lg:block absolute top-10 left-full w-full h-px bg-gradient-to-r from-cyan-500/40 to-transparent z-10 origin-left"
                />
              )}

              <motion.div
                whileHover={{ y: -6, boxShadow: "0 20px 60px rgba(0,212,255,0.12)" }}
                transition={{ duration: 0.25 }}
                className="p-6 rounded-2xl bg-[#0d1526] border border-white/5 h-full"
              >
                <motion.div
                  initial={{ scale: 0, rotate: -20 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.2, type: "spring", stiffness: 260, damping: 20 }}
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 border border-cyan-500/20 flex items-center justify-center text-2xl mb-4"
                >
                  {step.icon}
                </motion.div>

                <div className="text-xs font-bold text-cyan-400 tracking-widest mb-2">{step.number}</div>
                <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{step.description}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
