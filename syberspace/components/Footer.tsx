const services = [
  "Process Automation",
  "Web Scraping",
  "Data Cleaning",
  "AI Bots",
  "Data Analysis",
  "AI Consultation",
];

const company = [
  { label: "About Us", href: "#about" },
  { label: "Pricing", href: "#pricing" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
];

const legal = [
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
  { label: "Data Processing Agreement", href: "#" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#030912]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <a href="#home" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-400 to-violet-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">S</span>
              </div>
              <span className="text-white font-bold text-xl tracking-tight">
                Syber<span className="gradient-text">space</span>
              </span>
            </a>
            <p className="text-slate-400 text-sm leading-relaxed mb-6">
              We plug cutting-edge AI into your existing business. No rebuilding required — just results.
            </p>
            <div className="flex gap-3">
              {["in", "𝕏", "ig"].map((icon) => (
                <div
                  key={icon}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all cursor-pointer text-xs font-bold"
                >
                  {icon}
                </div>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Services</h4>
            <ul className="space-y-2.5">
              {services.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-slate-400 text-sm hover:text-white transition-colors">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Company</h4>
            <ul className="space-y-2.5">
              {company.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-slate-400 text-sm hover:text-white transition-colors">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a href="mailto:hello@syberspace.com.ng" className="flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors">
                  <span className="text-base">📧</span> hello@syberspace.com.ng
                </a>
              </li>
              <li>
                <a href="tel:+2348000000000" className="flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors">
                  <span className="text-base">📞</span> +234 800 000 0000
                </a>
              </li>
              <li>
                <a href="https://wa.me/2348000000000" className="flex items-center gap-2 text-slate-400 text-sm hover:text-white transition-colors">
                  <span className="text-base">💬</span> WhatsApp
                </a>
              </li>
            </ul>
            <div className="mt-6">
              <ul className="space-y-2">
                {legal.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-slate-500 text-xs hover:text-slate-300 transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} Syberspace. All rights reserved.
          </p>
          <p className="text-slate-500 text-sm">
            Built in Nigeria 🇳🇬 · Serving businesses worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
