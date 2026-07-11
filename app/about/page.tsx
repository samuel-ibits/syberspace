import type { Metadata } from "next";
import Link from "next/link";
import { SITE_URL } from "@/lib/service-pages";

export const metadata: Metadata = {
  title: "About Syberspace AI Automation Company",
  description: "Syberspace is Nigeria's leading AI-as-a-Service company. We make enterprise-grade AI accessible to every business — from Lagos to the world.",
};

metadata.description =
  "Learn about Syberspace, a Nigerian AI automation company helping business and website owners add AI chatbots, workflow automation, data tools, and analytics.";
metadata.alternates = {
  canonical: `${SITE_URL}/about`,
};
metadata.openGraph = {
  title: "About Syberspace AI Automation Company",
  description:
    "Syberspace helps business and website owners in Nigeria and across Africa adopt AI automation, chatbots, and data systems without rebuilding.",
  url: `${SITE_URL}/about`,
  type: "website",
};

const values = [
  { icon: "🎯", title: "Results First",        desc: "Every engagement is measured by real business outcomes — time saved, costs reduced, revenue grown. We don't count outputs, we count impact." },
  { icon: "🤝", title: "True Partnership",      desc: "We sit inside your team, not outside it. Your challenges become ours. We don't disappear after delivery — we stay." },
  { icon: "🔒", title: "Trust & Security",      desc: "Enterprise-grade encryption, signed NDAs, and zero data sharing. Your business data stays yours — always." },
  { icon: "🌍", title: "Global Standards",      desc: "Built for Nigeria, calibrated to global standards. Our solutions integrate with international platforms and follow global best practices." },
  { icon: "⚡", title: "Speed to Value",        desc: "Most clients see measurable ROI within 2–4 weeks. We move fast, ship iteratively, and optimise continuously." },
  { icon: "🧠", title: "Continuous Learning",   desc: "AI evolves weekly. So do we. Our team stays at the frontier so your business benefits from the latest breakthroughs automatically." },
];

const team = [
  { name: "Samuel Ibitoye",  role: "Founder & CEO",          initials: "SI", bio: "AI engineer and entrepreneur with a passion for making cutting-edge technology accessible to African businesses." },
  { name: "Operations Team", role: "Project Delivery",        initials: "OT", bio: "A cross-functional team of engineers, data scientists, and automation specialists delivering results across every engagement." },
  { name: "Client Success",  role: "Support & Growth",        initials: "CS", bio: "Dedicated to ensuring every client sees measurable ROI and has a clear path to scaling their AI investment." },
];

const timeline = [
  { year: "2021", title: "Founded",             desc: "Syberspace launched with a single mission: make enterprise AI accessible to Nigerian businesses of every size." },
  { year: "2022", title: "First 10 Clients",    desc: "Delivered AI automation for our first 10 clients across healthcare, logistics, and e-commerce sectors." },
  { year: "2023", title: "Product Expansion",   desc: "Expanded from automation-only to a full suite: web scraping, data analytics, AI bots, and consultation." },
  { year: "2024", title: "50+ Businesses",       desc: "Crossed 50 active clients and launched our AI chatbot platform, now powering dozens of Nigerian businesses." },
  { year: "2025", title: "AI-as-a-Service",      desc: "Relaunched as a full AaaS platform — AI solutions delivered as a service, with ongoing support and dedicated account management." },
];

export default function AboutPage() {
  return (
    <main style={{ background: "var(--bg-base)", color: "var(--text-primary)", minHeight: "100vh" }}>
      {/* Nav back */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link href="/" className="inline-flex items-center gap-2 text-sm transition-colors hover:text-cyan-400" style={{ color: "var(--text-muted)" }}>
          ← Back to Home
        </Link>
      </div>

      {/* Hero */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
            style={{ background: "rgba(6,182,212,0.08)", border: "1px solid rgba(6,182,212,0.18)", color: "#06b6d4" }}>
            About Syberspace
          </span>
          <h1 className="text-5xl sm:text-6xl font-extrabold mb-6 leading-tight">
            We bring AI to{" "}
            <span style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              every business
            </span>
          </h1>
          <p className="text-xl leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
            Syberspace is Nigeria&apos;s leading AI-as-a-Service company. We make enterprise-grade artificial intelligence accessible to businesses of every size — from ambitious startups in Abuja to established enterprises in Lagos.
          </p>
          <p className="text-lg leading-relaxed" style={{ color: "var(--text-muted)" }}>
            We don&apos;t sell generic tools or templates. We sit with your team, understand your unique challenges, and engineer AI solutions that deliver measurable ROI. From Lagos and Abuja to clients across Africa and beyond — we&apos;re building the AI infrastructure for African business growth.
          </p>
        </div>
      </section>

      {/* Global reach banner */}
      <section className="py-16" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              { icon: "🇳🇬", label: "Headquartered in Nigeria", sub: "Abuja & Lagos" },
              { icon: "🌍", label: "Serving clients across Africa", sub: "Nigeria · Ghana · Kenya · South Africa" },
              { icon: "🌐", label: "Global integrations", sub: "Compatible with 100+ worldwide platforms" },
            ].map(item => (
              <div key={item.label} className="flex flex-col items-center gap-2">
                <span className="text-4xl">{item.icon}</span>
                <p className="font-semibold" style={{ color: "var(--text-primary)" }}>{item.label}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Post-project support */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block px-4 py-1 rounded-full text-sm font-medium mb-6"
              style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(124,58,237,0.2)", color: "#7c3aed" }}>
              We Don&apos;t Just Deliver & Leave
            </span>
            <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
              Ongoing support, long after launch
            </h2>
            <p className="leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              Most agencies disappear once the project is delivered. We do the opposite. Every Syberspace engagement includes structured post-project support — because AI solutions need tuning, monitoring, and evolving as your business grows.
            </p>
            <div className="space-y-4">
              {[
                { icon: "📊", title: "Monthly performance reviews",       desc: "We track KPIs and share monthly reports on automation performance, cost savings, and opportunities for improvement." },
                { icon: "🔧", title: "Continuous optimisation",           desc: "Your AI solutions are updated as models improve and your business needs evolve. No extra charge on Growth+ plans." },
                { icon: "🎓", title: "Team training & documentation",     desc: "We train your team to use and manage AI tools confidently, with written runbooks for every deployment." },
                { icon: "📞", title: "Dedicated account management",      desc: "Growth and Enterprise clients get a named account manager reachable by phone, WhatsApp, or email." },
              ].map(item => (
                <div key={item.title} className="flex gap-4 p-4 rounded-xl" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                  <span className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</span>
                  <div>
                    <p className="font-semibold text-sm mb-1" style={{ color: "var(--text-primary)" }}>{item.title}</p>
                    <p className="text-sm" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-8 rounded-2xl text-center" style={{ background: "linear-gradient(135deg, rgba(6,182,212,0.06), rgba(124,58,237,0.06))", border: "1px solid var(--border)" }}>
            <p className="text-6xl font-extrabold mb-2" style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>98%</p>
            <p className="font-bold text-xl mb-4" style={{ color: "var(--text-primary)" }}>Client Retention Rate</p>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Our clients don&apos;t just use us once. 98% continue working with Syberspace after their first project — because our ongoing support makes the difference between an AI tool that fades and one that compounds value over time.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Our values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map(v => (
              <div key={v.title} className="p-6 rounded-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <span className="text-3xl block mb-3">{v.icon}</span>
                <h3 className="font-bold mb-2" style={{ color: "var(--text-primary)" }}>{v.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>Our journey</h2>
        </div>
        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px" style={{ background: "var(--border)" }} />
          <div className="space-y-12">
            {timeline.map((t, i) => (
              <div key={t.year} className={`relative flex gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
                <div className="flex-1 md:text-right pl-12 md:pl-0">
                  {i % 2 === 0 && (
                    <div className="p-5 rounded-2xl inline-block text-left" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                      <span className="text-xs font-bold" style={{ color: "#06b6d4" }}>{t.year}</span>
                      <h3 className="font-bold mt-1 mb-1" style={{ color: "var(--text-primary)" }}>{t.title}</h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
                    </div>
                  )}
                </div>
                <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-5 w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white z-10"
                  style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)" }}>
                  {t.year.slice(2)}
                </div>
                <div className="flex-1 pl-12 md:pl-8">
                  {i % 2 !== 0 && (
                    <div className="p-5 rounded-2xl inline-block" style={{ background: "var(--bg-surface)", border: "1px solid var(--border)" }}>
                      <span className="text-xs font-bold" style={{ color: "#06b6d4" }}>{t.year}</span>
                      <h3 className="font-bold mt-1 mb-1" style={{ color: "var(--text-primary)" }}>{t.title}</h3>
                      <p className="text-sm" style={{ color: "var(--text-muted)" }}>{t.desc}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20" style={{ background: "var(--bg-surface)", borderTop: "1px solid var(--border)" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold" style={{ color: "var(--text-primary)" }}>The team behind Syberspace</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {team.map(member => (
              <div key={member.name} className="text-center p-6 rounded-2xl" style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)" }}>
                <div className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-xl font-bold"
                  style={{ background: "linear-gradient(135deg,#06b6d4,#7c3aed)" }}>
                  {member.initials}
                </div>
                <h3 className="font-bold mb-0.5" style={{ color: "var(--text-primary)" }}>{member.name}</h3>
                <p className="text-xs mb-3" style={{ color: "#06b6d4" }}>{member.role}</p>
                <p className="text-sm" style={{ color: "var(--text-muted)" }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold mb-6" style={{ color: "var(--text-primary)" }}>
          Ready to work with us?
        </h2>
        <p className="text-lg mb-8 max-w-xl mx-auto" style={{ color: "var(--text-muted)" }}>
          Book a free 30-minute AI audit and we&apos;ll map out exactly where AI can save your business time and money.
        </p>
        <Link href="/#booking"
          className="inline-block px-8 py-4 rounded-xl font-semibold transition-transform hover:scale-105"
          style={{ background: "var(--accent-cyan)", color: "#0a0f1e" }}>
          Book Free AI Audit →
        </Link>
      </section>
    </main>
  );
}
