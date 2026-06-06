const services = [
  {
    icon: "⚙️",
    title: "Process Automation",
    description:
      "Eliminate repetitive tasks. We automate workflows, approvals, reporting, and internal operations — saving your team hundreds of hours monthly.",
    features: ["Workflow automation", "Scheduled jobs", "API integrations", "Error handling & alerts"],
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/20",
    badge: "Most Popular",
  },
  {
    icon: "🕷️",
    title: "Web Scraping",
    description:
      "Extract structured data from any website at scale. Competitor pricing, lead lists, market data — delivered clean and on schedule.",
    features: ["Scheduled scraping", "Anti-bot bypass", "Structured output", "Real-time monitoring"],
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/20",
  },
  {
    icon: "🧹",
    title: "Data Cleaning",
    description:
      "Turn messy, inconsistent data into reliable assets. AI-powered deduplication, formatting, enrichment, and validation pipelines.",
    features: ["Deduplication", "Format standardization", "Data enrichment", "Quality scoring"],
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/20",
  },
  {
    icon: "🤖",
    title: "AI Bots",
    description:
      "Deploy intelligent chatbots and assistants trained on your business. Customer support, sales qualification, FAQ — running 24/7.",
    features: ["Custom training", "Multi-channel deploy", "Handoff to human", "Analytics dashboard"],
    color: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/20",
  },
  {
    icon: "📊",
    title: "Data Analysis",
    description:
      "Transform raw numbers into actionable intelligence. AI-driven dashboards, trend detection, forecasting, and executive reports.",
    features: ["Interactive dashboards", "Predictive analytics", "Anomaly detection", "Auto-reporting"],
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/20",
  },
  {
    icon: "🧠",
    title: "AI Consultation",
    description:
      "Not sure where to start? Our AI experts audit your business, identify high-ROI opportunities, and build your AI roadmap.",
    features: ["AI audit", "ROI assessment", "Implementation roadmap", "Ongoing advisory"],
    color: "from-yellow-500/20 to-yellow-500/5",
    border: "border-yellow-500/20",
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            What We Do
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            AI Services That <span className="gradient-text">Plug Right In</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            We don't ask you to rebuild. We integrate AI into what you already have.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((s) => (
            <div
              key={s.title}
              className={`relative p-6 rounded-2xl bg-gradient-to-br ${s.color} border ${s.border} card-hover cursor-default`}
            >
              {s.badge && (
                <span className="absolute top-4 right-4 text-xs font-semibold px-2 py-1 rounded-full bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  {s.badge}
                </span>
              )}
              <div className="text-4xl mb-4">{s.icon}</div>
              <h3 className="text-xl font-bold text-white mb-3">{s.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">{s.description}</p>
              <ul className="space-y-1.5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-slate-300 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 flex-shrink-0" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#booking"
                className="inline-flex items-center gap-1 mt-5 text-cyan-400 text-sm font-semibold hover:gap-2 transition-all"
              >
                Get started
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
