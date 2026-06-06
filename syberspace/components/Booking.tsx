"use client";
import { useState } from "react";

const channels = [
  {
    icon: "🤖",
    title: "Chat with AI Consultant",
    description: "Get instant answers and book your consultation through our AI assistant — available 24/7.",
    action: "Start AI Chat",
    onClick: "chat",
    color: "from-cyan-500/20 to-cyan-500/5",
    border: "border-cyan-500/30",
  },
  {
    icon: "📅",
    title: "Book via Calendly",
    description: "Choose a time that suits you. 30-min discovery call with an AI specialist.",
    action: "Open Calendly",
    href: "https://calendly.com/syberspace",
    color: "from-violet-500/20 to-violet-500/5",
    border: "border-violet-500/30",
  },
  {
    icon: "📧",
    title: "Send Us an Email",
    description: "Describe your needs and we'll respond within 24 hours with a tailored proposal.",
    action: "Send Email",
    href: "mailto:hello@syberspace.com.ng",
    color: "from-emerald-500/20 to-emerald-500/5",
    border: "border-emerald-500/30",
  },
  {
    icon: "📞",
    title: "Call Us",
    description: "Prefer a direct conversation? Our team is available Mon–Fri, 9am–6pm WAT.",
    action: "Call Now",
    href: "tel:+2348000000000",
    color: "from-orange-500/20 to-orange-500/5",
    border: "border-orange-500/30",
  },
  {
    icon: "💬",
    title: "WhatsApp",
    description: "Message us on WhatsApp for quick questions or to kick off a conversation.",
    action: "WhatsApp Us",
    href: "https://wa.me/2348000000000",
    color: "from-green-500/20 to-green-500/5",
    border: "border-green-500/30",
  },
  {
    icon: "📱",
    title: "Social Media",
    description: "Follow us on LinkedIn, X (Twitter), and Instagram for updates and tips.",
    action: "Find Us Online",
    onClick: "social",
    color: "from-pink-500/20 to-pink-500/5",
    border: "border-pink-500/30",
  },
];

const socialLinks = [
  { label: "LinkedIn", href: "https://linkedin.com/company/syberspace", icon: "in" },
  { label: "Twitter / X", href: "https://twitter.com/syberspace", icon: "𝕏" },
  { label: "Instagram", href: "https://instagram.com/syberspace", icon: "📸" },
];

export default function Booking({ onOpenChat }: { onOpenChat: () => void }) {
  const [showSocial, setShowSocial] = useState(false);

  const handleAction = (channel: typeof channels[0]) => {
    if (channel.onClick === "chat") {
      onOpenChat();
    } else if (channel.onClick === "social") {
      setShowSocial(true);
    }
  };

  return (
    <section id="booking" className="py-24 bg-white/2 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-sm font-medium mb-4">
            Get In Touch
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Ready to <span className="gradient-text">Get Started?</span>
          </h2>
          <p className="max-w-xl mx-auto text-slate-400 text-lg">
            Choose how you'd like to connect. Every conversation starts with listening to you.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {channels.map((ch) => (
            <div
              key={ch.title}
              className={`p-6 rounded-2xl bg-gradient-to-br ${ch.color} border ${ch.border} card-hover flex flex-col`}
            >
              <div className="text-3xl mb-3">{ch.icon}</div>
              <h3 className="text-white font-bold mb-2">{ch.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed flex-1 mb-4">{ch.description}</p>
              {ch.href ? (
                <a
                  href={ch.href}
                  target={ch.href.startsWith("http") ? "_blank" : undefined}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:gap-2 transition-all"
                >
                  {ch.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              ) : (
                <button
                  onClick={() => handleAction(ch)}
                  className="inline-flex items-center gap-1 text-sm font-semibold text-cyan-400 hover:gap-2 transition-all text-left"
                >
                  {ch.action}
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Social links modal */}
        {showSocial && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShowSocial(false)}>
            <div className="bg-[#0d1526] border border-white/10 rounded-2xl p-8 max-w-sm w-full mx-4" onClick={(e) => e.stopPropagation()}>
              <h3 className="text-xl font-bold text-white mb-6">Follow Syberspace</h3>
              <div className="space-y-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-4 rounded-xl bg-white/3 hover:bg-white/6 border border-white/5 transition-all"
                  >
                    <span className="text-xl w-8 text-center">{s.icon}</span>
                    <span className="text-white font-medium">{s.label}</span>
                    <svg className="w-4 h-4 text-slate-400 ml-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                ))}
              </div>
              <button onClick={() => setShowSocial(false)} className="mt-6 w-full py-2 rounded-xl border border-white/10 text-slate-400 hover:text-white text-sm transition-colors">
                Close
              </button>
            </div>
          </div>
        )}

        {/* Contact form */}
        <div id="contact" className="mt-16 max-w-2xl mx-auto">
          <div className="p-8 rounded-2xl bg-[#0d1526] border border-white/5">
            <h3 className="text-2xl font-bold text-white mb-2">Send a Message</h3>
            <p className="text-slate-400 text-sm mb-6">We'll get back to you within 24 hours.</p>
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 text-xs font-medium mb-1.5">Email Address</label>
                  <input
                    type="email"
                    placeholder="you@company.com"
                    className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors"
                  />
                </div>
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5">Service of Interest</label>
                <select className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 text-white text-sm focus:outline-none focus:border-cyan-500/50 transition-colors appearance-none">
                  <option value="" className="bg-[#0d1526]">Select a service...</option>
                  <option value="automation" className="bg-[#0d1526]">Process Automation</option>
                  <option value="scraping" className="bg-[#0d1526]">Web Scraping</option>
                  <option value="cleaning" className="bg-[#0d1526]">Data Cleaning</option>
                  <option value="bots" className="bg-[#0d1526]">AI Bots</option>
                  <option value="analysis" className="bg-[#0d1526]">Data Analysis</option>
                  <option value="consultation" className="bg-[#0d1526]">AI Consultation</option>
                  <option value="multiple" className="bg-[#0d1526]">Multiple Services</option>
                </select>
              </div>
              <div>
                <label className="block text-slate-400 text-xs font-medium mb-1.5">Message</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about your business and what you're hoping to automate or improve..."
                  className="w-full px-4 py-3 rounded-xl bg-white/3 border border-white/10 text-white placeholder-slate-600 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-600 text-white font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
