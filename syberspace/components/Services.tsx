"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const services = [
  { icon: "⚙️", title: "Process Automation", description: "Eliminate repetitive tasks. We automate workflows, approvals, reporting, and internal operations — saving your team hundreds of hours monthly.", features: ["Workflow automation", "Scheduled jobs", "API integrations", "Error handling & alerts"], accentRgb: "0,212,255", badge: "Most Popular" },
  { icon: "🕷️", title: "Web Scraping",        description: "Extract structured data from any website at scale. Competitor pricing, lead lists, market data — delivered clean and on schedule.",          features: ["Scheduled scraping", "Anti-bot bypass", "Structured output", "Real-time monitoring"], accentRgb: "124,58,237" },
  { icon: "🧹", title: "Data Cleaning",        description: "Turn messy, inconsistent data into reliable assets. AI-powered deduplication, formatting, enrichment, and validation pipelines.",           features: ["Deduplication", "Format standardization", "Data enrichment", "Quality scoring"], accentRgb: "16,185,129" },
  { icon: "🤖", title: "AI Bots",              description: "Deploy intelligent chatbots trained on your business. Customer support, sales qualification, FAQ — running 24/7.",                           features: ["Custom training", "Multi-channel deploy", "Handoff to human", "Analytics dashboard"], accentRgb: "249,115,22" },
  { icon: "📊", title: "Data Analysis",        description: "Transform raw numbers into actionable intelligence. AI-driven dashboards, trend detection, forecasting, and executive reports.",             features: ["Interactive dashboards", "Predictive analytics", "Anomaly detection", "Auto-reporting"], accentRgb: "236,72,153" },
  { icon: "🧠", title: "AI Consultation",      description: "Not sure where to start? Our AI experts audit your business, identify high-ROI opportunities, and build your AI roadmap.",                   features: ["AI audit", "ROI assessment", "Implementation roadmap", "Ongoing advisory"], accentRgb: "234,179,8" },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0,  scale: 1    },
};

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24" style={{ background: "linear-gradient(to bottom, transparent, rgba(0,212,255,0.4), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4" style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "var(--accent-violet)" }}>
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            AI Services That <span className="gradient-text">Plug Right In</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            We don't ask you to rebuild. We integrate AI into what you already have.
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map(s => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, boxShadow: `0 20px 60px rgba(${s.accentRgb},0.12)`, transition: { duration: 0.25 } }}
              className="relative p-6 rounded-2xl flex flex-col"
              style={{
                background: `linear-gradient(135deg, rgba(${s.accentRgb},0.08) 0%, var(--bg-surface) 100%)`,
                border: `1px solid rgba(${s.accentRgb},0.18)`,
                transition: "box-shadow 0.3s ease",
              }}
            >
              {s.badge && (
                <motion.span
                  initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full"
                  style={{ background: "rgba(0,212,255,0.15)", color: "var(--accent-cyan)", border: "1px solid rgba(0,212,255,0.3)" }}
                >
                  {s.badge}
                </motion.span>
              )}

              <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }} className="text-4xl mb-4 inline-block">
                {s.icon}
              </motion.div>

              <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
              <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{s.description}</p>

              <ul className="space-y-1.5 flex-1">
                {s.features.map((f, fi) => (
                  <motion.li key={f} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 + fi * 0.05 }} className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
                    <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2, repeat: Infinity, delay: fi * 0.4 }} className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-cyan)" }} />
                    {f}
                  </motion.li>
                ))}
              </ul>

              <a href="#booking" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold" style={{ color: "var(--accent-cyan)" }}>
                Get started
                <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </motion.svg>
              </a>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
