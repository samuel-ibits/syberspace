"use client";

import { motion } from "framer-motion";
import CustomIcon, { type CustomIconName } from "@/components/CustomIcon";

const bestFor = [
  {
    title: "African SMEs",
    text: "For teams that need AI customer support and automation without hiring an internal AI team.",
    icon: "building" as CustomIconName,
  },
  {
    title: "Omni-platform teams",
    text: "For companies that support customers across website chat, WhatsApp, Instagram, Messenger, email, SMS, and forms.",
    icon: "social" as CustomIconName,
  },
  {
    title: "Website owners who need leads",
    text: "For websites that should qualify visitors, collect contact details, and route serious buyers.",
    icon: "target" as CustomIconName,
  },
  {
    title: "Teams that want it done-for-you",
    text: "For business owners who want setup, training, monitoring, and ongoing improvement handled.",
    icon: "tools" as CustomIconName,
  },
];

const monitorFeatures = [
  "AI chatbot for first-line answers",
  "Human takeover dashboard",
  "Saved encoded chat sessions",
  "Omni-channel escalation",
  "Lead capture and service-interest tracking",
  "Local setup for African business workflows",
];

export default function Positioning() {
  return (
    <section className="py-24 relative overflow-hidden" style={{ background: "var(--bg-elevated)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="text-center mb-14"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4 theme-badge-cyan">
            Best fit
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold" style={{ color: "var(--text-primary)" }}>
            Built for African businesses that want <span className="gradient-text">outcomes, not software complexity</span>
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg" style={{ color: "var(--text-muted)" }}>
            Syberspace is strongest when a business needs AI support, omni-platform automation, lead capture, and workflow automation implemented around existing tools.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
          {bestFor.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ delay: index * 0.08, duration: 0.45 }}
              className="rounded-2xl p-6 theme-card"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-xl"
                style={{ background: "var(--badge-bg)", border: "1px solid var(--badge-border)", color: "var(--accent-cyan)" }}>
                <CustomIcon name={item.icon} className="h-6 w-6" />
              </span>
              <h3 className="mt-5 text-lg font-bold" style={{ color: "var(--text-primary)" }}>{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.text}</p>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="mt-8 grid grid-cols-1 gap-6 rounded-2xl p-6 lg:grid-cols-[1fr_1.15fr] lg:p-8"
          style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}
        >
          <div>
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl"
              style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.24)", color: "var(--accent-cyan)" }}>
              <CustomIcon name="message" className="h-7 w-7" />
            </div>
            <h3 className="mt-5 text-2xl font-bold" style={{ color: "var(--text-primary)" }}>
              Productized AI chat monitor
            </h3>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Syberspace can give your chatbot a human-supervised monitor: customers keep chatting from your website or messaging channels, while your team sees sessions, replies as an agent, and follows up through the best channel.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {monitorFeatures.map(feature => (
              <div key={feature} className="flex gap-3 rounded-xl p-4" style={{ background: "var(--bg-base)", border: "1px solid var(--border)" }}>
                <CustomIcon name="check" className="mt-0.5 h-4 w-4 flex-shrink-0" style={{ color: "var(--accent-cyan)" }} />
                <span className="text-sm" style={{ color: "var(--text-muted)" }}>{feature}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
