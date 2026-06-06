"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const plans = [
  {
    name: "Starter",
    price: { monthly: "₦150,000", annual: "₦1,500,000" },
    period: { monthly: "/month", annual: "/year" },
    description: "Perfect for small businesses exploring AI automation.",
    features: ["1 AI service of your choice", "Up to 10,000 automations/month", "Basic analytics dashboard", "Email support", "Monthly performance report"],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Growth",
    price: { monthly: "₦400,000", annual: "₦3,800,000" },
    period: { monthly: "/month", annual: "/year" },
    description: "For businesses ready to scale with multiple AI integrations.",
    features: ["3 AI services", "Unlimited automations", "Advanced analytics & forecasting", "Priority support (24hr response)", "Weekly reports", "Custom AI bot training", "Dedicated account manager"],
    cta: "Get Started",
    highlight: true,
    badge: "Most Popular",
  },
  {
    name: "Enterprise",
    price: { monthly: "Custom", annual: "Custom" },
    period: { monthly: "", annual: "" },
    description: "Full AI transformation for large organizations.",
    features: ["All 6 AI services", "Unlimited everything", "Custom integrations", "SLA guarantees", "On-site consultation", "White-label options", "24/7 dedicated support", "AI roadmap advisory"],
    cta: "Contact Sales",
    highlight: false,
  },
];

export default function Pricing() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-violet-600/5 blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            Pricing
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Simple, <span className="gradient-text">Transparent Pricing</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg mb-8">
            Whatever your budget, there's a plan to get your business AI-powered.
          </p>

          {/* Toggle */}
          <div className="flex items-center justify-center gap-3">
            <span className={`text-sm font-medium ${!annual ? "text-white" : "text-slate-500"}`}>Monthly</span>
            <motion.button
              onClick={() => setAnnual(!annual)}
              className={`relative w-12 h-6 rounded-full transition-colors duration-300 ${annual ? "bg-gradient-to-r from-cyan-500 to-violet-600" : "bg-white/10"}`}
            >
              <motion.span
                animate={{ x: annual ? 24 : 0 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
                className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white"
              />
            </motion.button>
            <span className={`text-sm font-medium ${annual ? "text-white" : "text-slate-500"}`}>
              Annual <span className="text-emerald-400 font-semibold">(Save 20%)</span>
            </span>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`relative p-8 rounded-2xl border flex flex-col ${
                plan.highlight
                  ? "bg-gradient-to-b from-cyan-500/10 to-violet-500/10 border-cyan-500/40 shadow-xl shadow-cyan-500/10"
                  : "bg-[#0d1526] border-white/5"
              }`}
            >
              {plan.badge && (
                <motion.span
                  initial={{ scale: 0, y: -10 }}
                  whileInView={{ scale: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4, type: "spring", stiffness: 260 }}
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-gradient-to-r from-cyan-500 to-violet-600 text-white text-xs font-bold whitespace-nowrap"
                >
                  {plan.badge}
                </motion.span>
              )}

              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <p className="text-slate-400 text-sm mb-5">{plan.description}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={annual ? "annual" : "monthly"}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.2 }}
                  className="mb-6"
                >
                  <span className="text-3xl font-extrabold text-white">
                    {annual ? plan.price.annual : plan.price.monthly}
                  </span>
                  <span className="text-slate-400 text-sm ml-1">
                    {annual ? plan.period.annual : plan.period.monthly}
                  </span>
                </motion.div>
              </AnimatePresence>

              <ul className="space-y-3 mb-8 flex-1">
                {plan.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.12 + fi * 0.05 }}
                    className="flex items-start gap-2 text-slate-300 text-sm"
                  >
                    <motion.svg
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.12 + fi * 0.05 + 0.1, type: "spring" }}
                      className="w-4 h-4 text-cyan-400 flex-shrink-0 mt-0.5"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </motion.svg>
                    {f}
                  </motion.li>
                ))}
              </ul>

              <motion.a
                href="#booking"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className={`block w-full text-center py-3 rounded-full font-semibold transition-all text-sm ${
                  plan.highlight
                    ? "bg-gradient-to-r from-cyan-500 to-violet-600 text-white hover:shadow-lg hover:shadow-cyan-500/25"
                    : "border border-white/10 text-white hover:bg-white/5 hover:border-white/20"
                }`}
              >
                {plan.cta}
              </motion.a>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate-500 text-sm mt-8"
        >
          All plans include a free 30-day trial · No credit card required · Cancel anytime
        </motion.p>
      </div>
    </section>
  );
}
