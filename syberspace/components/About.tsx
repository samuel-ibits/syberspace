const faqs = [
  {
    q: "Do I need to rebuild my existing systems?",
    a: "No. That's our core promise. We integrate AI directly into your existing applications, databases, and workflows. We work with what you have.",
  },
  {
    q: "How long does it take to see results?",
    a: "Most clients see measurable impact within the first 2 weeks of deployment. Full automation pipelines typically go live within 5-10 business days.",
  },
  {
    q: "What industries do you serve?",
    a: "We work across finance, retail, logistics, healthcare, real estate, and more. AI automation applies to any business with repetitive processes or data.",
  },
  {
    q: "Is my business data secure?",
    a: "Absolutely. We use enterprise-grade encryption, sign NDAs, and never share your data. Your data stays yours — always.",
  },
  {
    q: "How do I get started?",
    a: "Book a free consultation (Calendly, AI chat, email, or call) and we'll map out the best AI services for your business within 24 hours.",
  },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white/2 border-y border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-6">
              About Syberspace
            </div>
            <h2 className="text-4xl font-bold text-white mb-6">
              We Bring AI to <span className="gradient-text">Every Business</span>
            </h2>
            <p className="text-slate-400 leading-relaxed mb-6">
              Syberspace is a Software-as-a-Service company focused on one mission: making enterprise-grade AI accessible to every business — regardless of size or technical maturity.
            </p>
            <p className="text-slate-400 leading-relaxed mb-8">
              We don't sell generic tools. We sit down with your team, understand your unique challenges, and engineer AI solutions that deliver real, measurable ROI. From Lagos to the world.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { label: "Years of Experience", value: "5+" },
                { label: "AI Models Deployed", value: "200+" },
                { label: "Hours Saved for Clients", value: "50K+" },
                { label: "Average ROI", value: "4.2×" },
              ].map((s) => (
                <div key={s.label} className="p-4 rounded-xl bg-[#0d1526] border border-white/5">
                  <div className="text-2xl font-extrabold gradient-text">{s.value}</div>
                  <div className="text-slate-400 text-xs mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — FAQ */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-6">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-5 rounded-xl bg-[#0d1526] border border-white/5 cursor-pointer"
                >
                  <summary className="flex items-center justify-between text-white font-semibold text-sm list-none select-none">
                    {faq.q}
                    <svg
                      className="w-4 h-4 text-slate-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <p className="mt-3 text-slate-400 text-sm leading-relaxed">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
