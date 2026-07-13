"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CustomIcon from "@/components/CustomIcon";

const plans = [
  {
    name: "Starter", price: { monthly: "₦150,000", annual: "₦1,500,000" }, period: { monthly: "/month", annual: "/year" },
    description: "Perfect for small businesses exploring AI automation.",
    features: ["1 AI service of your choice", "Up to 10,000 automations/month", "Basic analytics dashboard", "Email support", "Monthly performance report"],
    cta: "Get Started", highlight: false,
  },
  {
    name: "Growth", price: { monthly: "₦400,000", annual: "₦3,800,000" }, period: { monthly: "/month", annual: "/year" },
    description: "For businesses ready to scale with multiple AI integrations.",
    features: ["3 AI services", "Unlimited automations", "Advanced analytics & forecasting", "Priority support (24hr response)", "Weekly reports", "Custom AI bot training", "Dedicated account manager"],
    cta: "Get Started", highlight: true, badge: "Most Popular",
  },
  {
    name: "Enterprise", price: { monthly: "Custom", annual: "Custom" }, period: { monthly: "", annual: "" },
    description: "Full AI transformation for large organizations.",
    features: ["All 6 AI services", "Unlimited everything", "Custom integrations", "SLA guarantees", "On-site consultation", "White-label options", "24/7 dedicated support", "AI roadmap advisory"],
    cta: "Contact Sales", highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-violet)" }} />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-12">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(109,40,217,0.08)", border: "1px solid rgba(109,40,217,0.18)", color: "var(--accent-violet)" }}>
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg mb-8" style={{ color: "var(--text-muted)" }}>
            Whatever your budget, there's a plan to get your business AI-powered.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className="text-sm font-medium" style={{ color: annual ? "var(--text-faint)" : "var(--text-primary)" }}>Monthly</span>
            <motion.button onClick={() => setAnnual(!annual)}
              className="relative w-12 h-6 rounded-full transition-colors duration-300"
              style={{ background: annual ? "var(--accent-cyan)" : "var(--bg-elevated)", border: "1px solid var(--border)" }}>
              <motion.span animate={{ x: annual ? 24 : 0 }} transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white shadow-sm" />
            </motion.button>
            <span className="text-sm font-medium" style={{ color: annual ? "var(--text-primary)" : "var(--text-faint)" }}>
              Annual <span style={{ color: "#059669" }} className="font-semibold">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div key={plan.name}
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }} transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -6, transition: { duration: 0.22 } }}
              className="relative p-8 rounded-2xl flex flex-col theme-card"
              style={plan.highlight ? {
                background: "linear-gradient(to bottom, rgba(6,182,212,0.06), var(--bg-surface))",
                borderColor: "rgba(6,182,212,0.35)",
                boxShadow: "0 0 0 1px rgba(6,182,212,0.15), var(--card-shadow-lg)",
              } : {}}>

              {plan.badge && (
                <motion.span initial={{ scale: 0, y: -10 }} whileInView={{ scale: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: 0.4, type: "spring", stiffness: 260 }}
                  className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-white text-xs font-bold whitespace-nowrap"
                  style={{ background: "linear-gradient(to right, #06b6d4, #7c3aed)", boxShadow: "0 4px 12px rgba(6,182,212,0.3)" }}>
                  {plan.badge}
                </motion.span>
              )}

              <h3 className="text-xl font-bold mb-1" style={{ color: "var(--text-primary)" }}>{plan.name}</h3>
              <p className="text-sm mb-5" style={{ color: "var(--text-muted)" }}>{plan.description}</p>

              <AnimatePresence mode="wait">
                <motion.div key={annual ? "a" : "m"} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.18 }} className="mb-6">
                  <span className="text-3xl font-extrabold" style={{ color: "var(--text-primary)" }}>
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-sm ml-1" style={{ color: "var(--text-muted)" }}>
                    {annual ? plan.period.annual : plan.period.monthly}
                  </span>
                </motion.div>
              </AnimatePresence>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <motion.li key={f} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.12 + fi * 0.05 }}
                    className="flex items-start gap-2.5 text-sm" style={{ color: "var(--text-muted)" }}>
                    <CustomIcon name="check" className="h-4 w-4 flex-shrink-0 mt-0.5" style={{ color: "var(--accent-cyan)" }} />
                    {f}
                  </motion.li>
                ))}
              </ul>

              <motion.a href="#booking" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="block w-full text-center py-3 rounded-full font-semibold text-sm transition-all"
                style={plan.highlight ? {
                  background: "var(--accent-cyan)",
                  color: "#0a0f1e",
                  boxShadow: "0 4px 16px rgba(6,182,212,0.25)",
                } : {
                  border: "1.5px solid var(--border-strong)",
                  color: "var(--text-primary)",
                }}>
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
          transition={{ delay: 0.4 }} className="text-center text-sm mt-8" style={{ color: "var(--text-faint)" }}>
          All plans include a free 30-day trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
