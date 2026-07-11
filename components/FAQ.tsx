"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "What exactly does Syberspace do?",
    a: "Syberspace builds and deploys AI-powered tools for Nigerian businesses — including AI chatbots, workflow automation, data analytics, web development, and custom AI integrations. We handle everything from strategy to implementation so you don't need an in-house tech team.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most clients see measurable improvements within 2–4 weeks of deployment. For example, AI chatbots typically handle 60–80% of customer queries from day one, reducing your team's workload immediately.",
  },
  {
    q: "Do I need any technical knowledge?",
    a: "None at all. We handle all the technical setup, integration, and maintenance. You interact with a simple dashboard and our team handles the rest. We also provide training for your staff.",
  },
  {
    q: "How much does it cost?",
    a: "Our plans start from ₦150,000/month for the Starter tier. Enterprise pricing is custom based on scope. We offer a free 30-minute AI audit to identify exactly which services would give you the best ROI before you commit.",
  },
  {
    q: "Can you integrate with tools we already use?",
    a: "Yes. We integrate with WhatsApp Business, Instagram, your website, CRMs, ERPs, Google Workspace, Shopify, Paystack, Flutterwave, and most popular business tools. Custom integrations are available on Growth and Enterprise plans.",
  },
  {
    q: "Can Syberspace help website owners get more leads?",
    a: "Yes. We can add AI chatbots, lead capture flows, booking assistants, WhatsApp handoff, and analytics to your website so visitors can become qualified leads instead of bouncing.",
  },
  {
    q: "Is my business data safe?",
    a: "Absolutely. We follow industry-standard data security practices. Your data is encrypted in transit and at rest, never sold or shared with third parties, and you retain full ownership of all your data at all times.",
  },
  {
    q: "Do you work with small businesses or only large companies?",
    a: "We work with businesses of all sizes — from solo founders to enterprise organisations. Our Starter plan is specifically designed to give small businesses access to enterprise-grade AI at an affordable price point.",
  },
  {
    q: "What happens after the project is delivered?",
    a: "All plans include ongoing support and maintenance. We monitor performance, push updates, and are available to make adjustments as your business grows. Growth and Enterprise clients get a dedicated account manager.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="faq" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-cyan)", opacity: 0.4 }} />

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "var(--accent-cyan)" }}>
            FAQ
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Common <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg" style={{ color: "var(--text-muted)" }}>
            Everything you need to know before getting started.
          </p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.05, duration: 0.45 }}
              className="rounded-2xl overflow-hidden theme-card"
              style={{ border: open === i ? "1px solid rgba(6,182,212,0.35)" : "1px solid var(--border)" }}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
              >
                <span className="font-semibold text-sm sm:text-base" style={{ color: "var(--text-primary)" }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: open === i ? 45 : 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-lg font-light"
                  style={{ background: open === i ? "var(--accent-cyan)" : "var(--bg-elevated)", color: open === i ? "#0a0f1e" : "var(--text-muted)" }}
                >
                  +
                </motion.span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    style={{ overflow: "hidden" }}
                  >
                    <p className="px-6 pb-5 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center mt-10 text-sm"
          style={{ color: "var(--text-faint)" }}
        >
          Still have questions?{" "}
          <a href="mailto:syberspace247@gmail.com" className="font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
            Email us
          </a>{" "}
          or{" "}
          <a href={`https://wa.me/2348086269431?text=${encodeURIComponent("Hi Syberspace, I have a question about your services.")}`} target="_blank" rel="noopener noreferrer" className="font-semibold hover:underline" style={{ color: "var(--accent-cyan)" }}>
            chat on WhatsApp
          </a>
        </motion.p>
      </div>
    </section>
  );
}
