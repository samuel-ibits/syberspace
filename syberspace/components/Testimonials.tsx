const testimonials = [
  {
    name: "Adaeze Okonkwo",
    role: "CEO, Mbuild Firm",
    avatar: "AO",
    text: "Syberspace automated our entire client onboarding process. What took our team 3 days now takes 2 hours. The ROI was visible in the first month.",
    stars: 5,
  },
  {
    name: "Emeka Nwosu",
    role: "Head of Operations, TradePilot",
    avatar: "EN",
    text: "The data scraping and cleaning service transformed how we track competitor pricing. We now update our price list automatically every morning.",
    stars: 5,
  },
  {
    name: "Fatima Aliyu",
    role: "Founder, HealthTrack NG",
    avatar: "FA",
    text: "Their AI bot handles 80% of our customer enquiries. Our support team now focuses on complex issues only. Game changer.",
    stars: 5,
  },
  {
    name: "Jide Owolabi",
    role: "CTO, LogiFlow",
    avatar: "JO",
    text: "The AI consultation was eye-opening. They identified 4 automation opportunities we hadn't even considered. Now all 4 are live.",
    stars: 5,
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-sm font-medium mb-4">
            Client Stories
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Trusted by <span className="gradient-text">Real Businesses</span>
          </h2>
          <p className="text-slate-400 text-lg">
            See what happens when AI meets business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="p-6 rounded-2xl bg-[#0d1526] border border-white/5 card-hover"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: t.stars }).map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>

              <p className="text-slate-300 leading-relaxed mb-6 italic">"{t.text}"</p>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-violet-600 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                  {t.avatar}
                </div>
                <div>
                  <div className="text-white font-semibold text-sm">{t.name}</div>
                  <div className="text-slate-400 text-xs">{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
