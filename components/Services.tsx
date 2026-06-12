"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const services = [
  { icon: "⚙️", title: "Process Automation", description: "Eliminate repetitive tasks. We automate workflows, approvals, reporting, and internal operations — saving your team hundreds of hours monthly.", features: ["Workflow automation", "Scheduled jobs", "API integrations", "Error handling & alerts"], accentDark: "0,212,255",  accentLight: "0,153,187",  badge: "Most Popular" },
  { icon: "🕷️", title: "Web Scraping",        description: "Extract structured data from any website at scale. Competitor pricing, lead lists, market data — delivered clean and on schedule.",          features: ["Scheduled scraping", "Anti-bot bypass", "Structured output", "Real-time monitoring"], accentDark: "124,58,237",  accentLight: "109,40,217" },
  { icon: "🧹", title: "Data Cleaning",        description: "Turn messy, inconsistent data into reliable assets. AI-powered deduplication, formatting, enrichment, and validation pipelines.",           features: ["Deduplication", "Format standardization", "Data enrichment", "Quality scoring"], accentDark: "16,185,129",  accentLight: "5,150,105"  },
  { icon: "🤖", title: "AI Bots",              description: "Deploy intelligent chatbots trained on your business. Customer support, sales qualification, FAQ — running 24/7.",                           features: ["Custom training", "Multi-channel deploy", "Handoff to human", "Analytics dashboard"], accentDark: "249,115,22",  accentLight: "234,88,12"  },
  { icon: "📊", title: "Data Analysis",        description: "Transform raw numbers into actionable intelligence. AI-driven dashboards, trend detection, forecasting, and executive reports.",             features: ["Interactive dashboards", "Predictive analytics", "Anomaly detection", "Auto-reporting"], accentDark: "236,72,153",  accentLight: "219,39,119" },
  { icon: "🧠", title: "AI Consultation",      description: "Not sure where to start? Our AI experts audit your business, identify high-ROI opportunities, and build your AI roadmap.",                   features: ["AI audit", "ROI assessment", "Implementation roadmap", "Ongoing advisory"], accentDark: "234,179,8",   accentLight: "202,138,4"  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 40, scale: 0.97 },
  visible: { opacity: 1, y: 0,  scale: 1    },
};

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="py-24 relative overflow-hidden" style={{ background: "var(--bg-base)" }}>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24"
        style={{ background: "linear-gradient(to bottom, transparent, var(--accent-cyan), transparent)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }} transition={{ duration: 0.6 }} className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-4"
            style={{ background: "rgba(109,40,217,0.08)", border: "1px solid rgba(109,40,217,0.18)", color: "var(--accent-violet)" }}>
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{ color: "var(--text-primary)" }}>
            AI Services That <span className="gradient-text">Plug Right In</span>
          </h2>
          <p className="max-w-xl mx-auto text-lg" style={{ color: "var(--text-muted)" }}>
            We don't ask you to rebuild. We integrate AI into what you already have.
          </p>
        </motion.div>

        <motion.div ref={ref} initial="hidden" animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map(s => (
            <ServiceCard key={s.title} s={s} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

function ServiceCard({ s }: { s: typeof services[0] }) {
  const isDark = typeof document !== "undefined" && document.documentElement.getAttribute("data-theme") !== "light";

  return (
    <motion.div
      variants={cardVariants}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      className="relative p-6 rounded-2xl flex flex-col theme-card"
      style={{
        background: `linear-gradient(145deg, rgba(${s.accentDark},0.07) 0%, var(--bg-surface) 50%)`,
        borderColor: `rgba(${s.accentDark},0.15)`,
      }}
    >
      {/* Light-mode override via CSS var trick */}
      <style>{`
        [data-theme="light"] .card-${s.title.replace(/\s+/g, "")} {
          background: linear-gradient(145deg, rgba(${s.accentLight},0.06) 0%, #ffffff 50%) !important;
          border-color: rgba(${s.accentLight},0.18) !important;
        }
      `}</style>
      <div className={`card-${s.title.replace(/\s+/g, "")}`} />

      {s.badge && (
        <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full theme-badge-cyan">
          {s.badge}
        </span>
      )}

      <motion.div whileHover={{ scale: 1.15, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}
        className="text-4xl mb-4 inline-block select-none">{s.icon}</motion.div>

      <h3 className="text-xl font-bold mb-3" style={{ color: "var(--text-primary)" }}>{s.title}</h3>
      <p className="text-sm leading-relaxed mb-4" style={{ color: "var(--text-muted)" }}>{s.description}</p>

      <ul className="space-y-2 flex-1">
        {s.features.map((f, fi) => (
          <motion.li key={f} initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }} transition={{ delay: 0.08 + fi * 0.05 }}
            className="flex items-center gap-2 text-sm" style={{ color: "var(--text-muted)" }}>
            <motion.span animate={{ scale: [1, 1.3, 1] }} transition={{ duration: 2.5, repeat: Infinity, delay: fi * 0.5 }}
              className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "var(--accent-cyan)" }} />
            {f}
          </motion.li>
        ))}
      </ul>

      <a href="#booking" className="inline-flex items-center gap-1 mt-5 text-sm font-semibold"
        style={{ color: "var(--accent-cyan)" }}>
        Get started
        <motion.svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"
          animate={{ x: [0, 3, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </motion.svg>
      </a>
    </motion.div>
  );
}
