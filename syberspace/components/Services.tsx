"use client";
import { motion } from "framer-motion";
import { useInView } from "@/hooks/useInView";

const services = [
  {
    icon: "⚙️",
    title: "Process Automation",
    description: "Eliminate repetitive tasks. We automate workflows, approvals, reporting, and internal operations — saving your team hundreds of hours monthly.",
    features: ["Workflow automation", "Scheduled jobs", "API integrations", "Error handling & alerts"],
    color: "from-cyan-500/15 to-cyan-500/3",
    border: "border-cyan-500/20",
    glow: "hover:shadow-cyan-500/15",
    badge: "Most Popular",
  },
  {
    icon: "🕷️",
    title: "Web Scraping",
    description: "Extract structured data from any website at scale. Competitor pricing, lead lists, market data — delivered clean and on schedule.",
    features: ["Scheduled scraping", "Anti-bot bypass", "Structured output", "Real-time monitoring"],
    color: "from-violet-500/15 to-violet-500/3",
    border: "border-violet-500/20",
    glow: "hover:shadow-violet-500/15",
  },
  {
    icon: "🧹",
    title: "Data Cleaning",
    description: "Turn messy, inconsistent data into reliable assets. AI-powered deduplication, formatting, enrichment, and validation pipelines.",
    features: ["Deduplication", "Format standardization", "Data enrichment", "Quality scoring"],
    color: "from-emerald-500/15 to-emerald-500/3",
    border: "border-emerald-500/20",
    glow: "hover:shadow-emerald-500/15",
  },
  {
    icon: "🤖",
    title: "AI Bots",
    description: "Deploy intelligent chatbots trained on your business. Customer support, sales qualification, FAQ — running 24/7.",
    features: ["Custom training", "Multi-channel deploy", "Handoff to human", "Analytics dashboard"],
    color: "from-orange-500/15 to-orange-500/3",
    border: "border-orange-500/20",
    glow: "hover:shadow-orange-500/15",
  },
  {
    icon: "📊",
    title: "Data Analysis",
    description: "Transform raw numbers into actionable intelligence. AI-driven dashboards, trend detection, forecasting, and executive reports.",
    features: ["Interactive dashboards", "Predictive analytics", "Anomaly detection", "Auto-reporting"],
    color: "from-pink-500/15 to-pink-500/3",
    border: "border-pink-500/20",
    glow: "hover:shadow-pink-500/15",
  },
  {
    icon: "🧠",
    title: "AI Consultation",
    description: "Not sure where to start? Our AI experts audit your business, identify high-ROI opportunities, and build your AI roadmap.",
    features: ["AI audit", "ROI assessment", "Implementation roadmap", "Ongoing advisory"],
    color: "from-yellow-500/15 to-yellow-500/3",
    border: "border-yellow-500/20",
    glow: "hover:shadow-yellow-500/15",
  },
];

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Services() {
  const { ref, inView } = useInView();

  return (
    <section id="services" className="py-24 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent via-cyan-500/40 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            AI Services That <span className="gradient-text">Plug Right In</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            We don't ask you to rebuild. We integrate AI into what you already have.
          </p>
        </motion.div>

        {/* Grid */}
        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          transition={{ staggerChildren: 0.1, delayChildren: 0.05 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {services.map((s) => (
            <motion.div
              key={s.title}
              variants={cardVariants}
              transition={{ duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -6, transition: { duration: 0.25 } }}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} cursor-default
                transition-shadow duration-300 hover:shadow-xl ${s.glow}`}
            >
              {s.badge && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5, type: "spring" }}
                  className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                >
                  {s.badge}
                </motion.span>
              )}

              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
                className="text-4xl mb-4 inline-block"
              >
                {s.icon}
              </motion.div>

              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <ul className="space-y-1.5">
                {s.features.map((f, fi) => (
                  <motion.li
                    key={f}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 + fi * 0.05 }}
                    className="flex items-center gap-2 text-slate-300 text-sm"
                  >
                    <motion.span
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2, repeat: Infinity, delay: fi * 0.4 }}
                      className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0"
                    />
                    {f}
                  </motion.li>
                ))}
              </ul>
              <a
                href="#booking"
                className="inline-flex items-center gap-1 mt-5 text-cyan-400 text-sm font-semibold group"
              >
                Get started
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
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
