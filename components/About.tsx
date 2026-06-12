"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";
import { useCounter } from "@/hooks/useCounter";

const faqs = [
  { q: "Do I need to rebuild my existing systems?",           a: "No. That's our core promise. We integrate AI directly into your existing applications, databases, and workflows. We work with what you have." },
  { q: "How long does it take to see results?",              a: "Most clients see measurable impact within the first 2 weeks of deployment. Full automation pipelines typically go live within 5-10 business days." },
  { q: "What industries do you serve?",                      a: "We work across finance, retail, logistics, healthcare, real estate, and more. AI automation applies to any business with repetitive processes or data." },
  { q: "Is my business data secure?",                        a: "Absolutely. We use enterprise-grade encryption, sign NDAs, and never share your data. Your data stays yours — always." },
  { q: "How do I get started?",                              a: "Book a free consultation via our AI chat, Google Calendar, email, or phone — and we'll map out the best AI services for your business within 24 hours." },
];

const companyStats = [
  { label: "Years of Experience",      value: 5,  suffix: "+" },
  { label: "AI Models Deployed",       value: 200, suffix: "+" },
  { label: "Hours Saved for Clients",  value: 50,  suffix: "K+" },
  { label: "Average ROI",              value: 4,  suffix: ".2×" },
];

function AnimatedStat({ stat, active }: { stat: typeof companyStats[0]; active: boolean }) {
  const count = useCounter(stat.value, 2000, active);
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="p-4 rounded-xl theme-card">
      <div className="text-2xl font-extrabold gradient-text">{count}{stat.suffix}</div>
      <div className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>{stat.label}</div>
    </motion.div>
  );
}

export default function About() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6 theme-badge-cyan">
              About Syberspace
            </div>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              We Bring AI to <span className="gradient-text">Every Business</span>
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Syberspace is a Software-as-a-Service company focused on one mission: making enterprise-grade AI accessible to every business — regardless of size or technical maturity.
            </p>
            <p className="leading-relaxed mb-8" style={{ color: "var(--text-muted)" }}>
              We don't sell generic tools. We sit down with your team, understand your unique challenges, and engineer AI solutions that deliver real, measurable ROI. From Lagos to the world.
            </p>
            <div ref={ref} className="grid grid-cols-2 gap-4">
              {companyStats.map(s => <AnimatedStat key={s.label} stat={s} active={inView} />)}
            </div>
          </motion.div>

          {/* Right — FAQ */}
          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.7 }}>
            <h3 className="text-2xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.details
                  key={i}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="group p-5 rounded-xl cursor-pointer theme-card"
                >
                  <summary className="flex items-center justify-between font-semibold text-sm list-none select-none" style={{ color: "var(--text-primary)" }}>
                    {faq.q}
                    <svg className="w-4 h-4 group-open:rotate-180 transition-transform flex-shrink-0 ml-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: "var(--text-faint)" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{faq.a}</p>
                </motion.details>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
