"use client";
import { motion, type Variants } from "framer-motion";
import Logo from "./Logo";

const services = ["Process Automation", "Web Scraping", "Data Cleaning", "AI Bots", "Data Analysis", "AI Consultation"];
const company  = [
  { label: "About Us",      href: "#about"       },
  { label: "Pricing",       href: "#pricing"      },
  { label: "How It Works",  href: "#how-it-works" },
  { label: "Testimonials",  href: "#testimonials" },
];

const containerVariants: Variants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants: Variants = {
  hidden:  { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0  },
};

export default function Footer() {
  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={containerVariants}
      className="relative overflow-hidden"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg-surface)" }}
    >
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-3xl pointer-events-none" style={{ background: "var(--glow-cyan)" }} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <motion.div variants={itemVariants} className="lg:col-span-1">
            <a href="#home" className="block mb-4">
              <Logo width={160} height={36} />
            </a>
            <p className="text-sm leading-relaxed mb-6" style={{ color: "var(--text-muted)" }}>
              We plug cutting-edge AI into your existing business. No rebuilding required — just results.
            </p>
            <div className="flex gap-3">
              <motion.a href="https://web.facebook.com/syberspacenetwork" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                f
              </motion.a>
              <motion.a href="https://www.instagram.com/syberspace_solutions" target="_blank" rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border)", color: "var(--text-muted)" }}>
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Services */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Services</h4>
            <ul className="space-y-2.5">
              {services.map(s => (
                <li key={s}>
                  <motion.a href="#services" whileHover={{ x: 4 }} className="text-sm block transition-colors" style={{ color: "var(--text-muted)" }}>{s}</motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Company */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Company</h4>
            <ul className="space-y-2.5">
              {company.map(l => (
                <li key={l.label}>
                  <motion.a href={l.href} whileHover={{ x: 4 }} className="text-sm block transition-colors" style={{ color: "var(--text-muted)" }}>{l.label}</motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={itemVariants}>
            <h4 className="font-semibold text-sm mb-4" style={{ color: "var(--text-primary)" }}>Contact</h4>
            <ul className="space-y-3">
              {[
                { icon: "📧", label: "syberspace247@gmail.com", href: "mailto:syberspace247@gmail.com" },
                { icon: "📞", label: "+234 815 151 9625",        href: "tel:+2348151519625"              },
                { icon: "💬", label: "WhatsApp",                 href: "https://wa.me/2348151519625?text=Hi%20Syberspace%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20AI%20services." },
              ].map(c => (
                <li key={c.label}>
                  <motion.a href={c.href} whileHover={{ x: 4 }} className="flex items-center gap-2 text-sm transition-colors" style={{ color: "var(--text-muted)" }}>
                    <span className="text-base">{c.icon}</span>{c.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <motion.div variants={itemVariants} className="mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: "1px solid var(--border)" }}>
          <p className="text-sm" style={{ color: "var(--text-faint)" }}>
            © {new Date().getFullYear()} Syberspace. All rights reserved.
          </p>
          <div className="flex items-center gap-5 text-sm flex-wrap justify-center">
            <motion.a href="/privacy" whileHover={{ color: "var(--accent-cyan)" }} className="transition-colors" style={{ color: "var(--text-faint)" }}>Privacy Policy</motion.a>
            <motion.a href="/terms"   whileHover={{ color: "var(--accent-cyan)" }} className="transition-colors" style={{ color: "var(--text-faint)" }}>Terms of Service</motion.a>
            <span style={{ color: "var(--text-faint)" }}>Built in Nigeria 🇳🇬</span>
          </div>
        </motion.div>
      </div>
    </motion.footer>
  );
}
