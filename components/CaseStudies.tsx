"use client";

import { motion } from "framer-motion";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";

const cases = [
  {
    tag: "AI Chatbot + Automation",
    company: "HealthTrack NG",
    industry: "Healthcare",
    challenge: "Their support team was overwhelmed handling 300+ daily patient queries via WhatsApp and email, with average response times exceeding 6 hours.",
    solution: "Deployed an AI-powered WhatsApp chatbot trained on their FAQ database and appointment system, integrated with their booking calendar.",
    results: ["82% of queries handled automatically", "Response time cut from 6hrs to under 2 mins", "Support team workload reduced by 70%", "Patient satisfaction up 40%"],
    color: "#06b6d4",
    icon: "healthcare" as CustomIconName,
  },
  {
    tag: "Data Analytics + Automation",
    company: "TradePilot",
    industry: "E-commerce",
    challenge: "Manual competitor price monitoring across 5 platforms was taking a team member 4 hours daily and was still only updated once per day.",
    solution: "Built a real-time data scraping and analytics pipeline that monitors 5 competitor platforms, auto-updates their pricing, and sends daily insight reports.",
    results: ["Price monitoring automated 100%", "4 hours/day of manual work eliminated", "Pricing decisions now data-driven in real time", "Gross margin improved by 12%"],
    color: "#7c3aed",
    icon: "chart" as CustomIconName,
  },
  {
    tag: "Workflow Automation",
    company: "LogiFlow",
    industry: "Logistics",
    challenge: "Client onboarding required 11 manual steps across 4 departments, taking 3 days average and causing frequent errors in documentation.",
    solution: "Mapped and automated the entire onboarding workflow from contract generation to system provisioning using a custom AI orchestration layer.",
    results: ["Onboarding time cut from 3 days to 2 hours", "Documentation errors eliminated", "Processing capacity increased 5x", "NGN 2.4M/month in operational savings"],
    color: "#06b6d4",
    icon: "truck" as CustomIconName,
  },
];

export default function CaseStudies() {
  return (
    <section id="case-studies" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <div className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "var(--glow-violet)", opacity: 0.3 }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "var(--accent-violet)" }}>
            Case Studies
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            Real businesses, <span className="gradient-text">real results</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            See how we've helped Nigerian companies transform their operations with AI.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {cases.map((c, i) => (
            <motion.div
              key={c.company}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: i * 0.12, duration: 0.55 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl overflow-hidden theme-card flex flex-col"
            >
              <div className="p-6 pb-4" style={{ borderBottom: "1px solid var(--border)" }}>
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl"
                    style={{ background: `${c.color}14`, color: c.color, border: `1px solid ${c.color}24` }}>
                    <CustomIcon name={c.icon} className="h-6 w-6" />
                  </span>
                  <div>
                    <p className="font-bold text-base" style={{ color: "var(--text-primary)" }}>{c.company}</p>
                    <p className="text-xs" style={{ color: "var(--text-faint)" }}>{c.industry}</p>
                  </div>
                </div>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold"
                  style={{ background: `${c.color}18`, color: c.color, border: `1px solid ${c.color}30` }}>
                  {c.tag}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 gap-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-faint)" }}>Challenge</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.challenge}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: "var(--text-faint)" }}>Solution</p>
                  <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{c.solution}</p>
                </div>
                <div className="mt-auto">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "var(--text-faint)" }}>Results</p>
                  <ul className="space-y-1.5">
                    {c.results.map(result => (
                      <li key={result} className="flex items-start gap-2 text-sm">
                        <span className="mt-0.5 flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                          style={{ background: `${c.color}18`, color: c.color }}>
                          <CustomIcon name="check" className="h-3 w-3" />
                        </span>
                        <span style={{ color: "var(--text-primary)" }}>{result}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
